import { parse, print } from 'graphql';
import { wait } from 'utils';

const API = 'https://graphql.contentful.com/content/v1/spaces';

const isPreview = process.env.CONTENTFUL_PREVIEW == 1;

const TOKEN = isPreview
    ? process.env.CONTENTFUL_TOKEN_PREVIEW
    : process.env.CONTENTFUL_TOKEN;

export const PREVIEW = `preview: ${isPreview ? 'true' : 'false'}`;

export const getPreviewArg = override =>
    typeof override !== 'undefined'
        ? `preview: ${override ? 'true' : 'false'}`
        : PREVIEW;

// Higher order getStaticProps function
// - fetches globals
// - handles errors
// Usage example:
//   export const getStaticProps = getStaticPropsHOF(async () => {
//       const props = await fetchPage('/', QUERY);
//       return getStaticPropsResponse(props);
//   });
export const getStaticPropsHOF = getStaticProps => ctx => {
    return getStaticProps(ctx).then((resultPageProps = {}) => {
        const pageProps = resultPageProps.props ?? {};
        if (resultPageProps.notFound) {
            return resultPageProps;
        }
        return {
            ...resultPageProps,
            props: {
                ...pageProps,
            },
        };
    });
};

// Helper function to return props in getStaticProps
export const getStaticPropsResponse = props => {
    return {
        props,
        revalidate: Number(process.env.REVALIDATE),
    };
};

// Helper function to return a 404 in getStaticProps
export const getStaticPropsNotFoundResponse = () => {
    return {
        props: {},
        notFound: true,
        revalidate: Number(process.env.REVALIDATE),
    };
};

// Logs critical errors to stderr (production only)
function logErrors(requestType, errors) {
    if (process.env.NODE_ENV === 'production') {
        console.error(`\nError in data request for ${requestType}:`);
        errors.forEach(error => console.error(error));
    }
}

function resolveErrors(json) {
    const { errors, ...rest } = json;
    if (errors?.length > 0) {
        const filteredErrors = errors.filter(error => {
            return error.extensions?.contentful?.code !== 'UNRESOLVABLE_LINK';
        });
        if (filteredErrors.length > 0) {
            return {
                ...rest,
                errors: filteredErrors,
            };
        }
    }
    return rest;
}

// Main function for any GraphQL requests
export async function fetchGraphQL(requestType, query) {
    // Makes a request to Contentful's GraphQL API endpoint
    function doFetch() {
        return fetch(`${API}/${process.env.CONTENTFUL_SPACE_ID}`, {
            method: 'POST',
            body: JSON.stringify({ query }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`,
            },
        });
    }

    try {
        // Format GraphQL query
        // Errors are ignored here, they are handled by the Contentful API
        query = print(parse(query));
    } catch (e) {}

    let triesRemaining = 5;
    try {
        do {
            const response = await doFetch();
            const { status, headers } = response;
            if (status === 429) {
                // Rate limit exceeded.
                // Contentful sets the X-Contentful-RateLimit-Reset header
                // with the number of seconds we have to wait, which we do.
                // Retry the request (up to 5 times).
                const seconds = +headers.get('X-Contentful-RateLimit-Reset');
                await wait(seconds * 1000 + 300);
            } else {
                // Any other status:
                // Parse the json response and resolve errors
                const result = resolveErrors(await response.json());
                // Check if we got errors in the response
                if (result?.errors?.length > 0) {
                    // If we have, log and return an error prop
                    logErrors(requestType, result.errors);
                    const {
                        message,
                        locations = null,
                        path = null,
                    } = result.errors[0];
                    return {
                        error: {
                            requestType,
                            query,
                            message,
                            locations,
                            path,
                        },
                    };
                } else {
                    // No errors, yay, return the result
                    return result;
                }
            }
        } while (--triesRemaining > 0);
    } catch (error) {
        // Something really bad has happened
        logErrors(requestType, [error]);
        return { error: { requestType, query, message: error.message } };
    }

    // If even after 5 tries we still exceed the rate limit, give up.
    const message = `Contentful API Error: Rate limit exceeded (tried 5 times)`;
    logErrors(requestType, [message]);
    return { error: { requestType, query, message } };
}
