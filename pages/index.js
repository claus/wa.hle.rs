import { fetchGraphQL, getStaticPropsResponse } from 'utils/contentful';

const QUERY = `
    query {
        pageCollection(where: { slug: "/" }, limit: 1) {
            items {
                title
                slug
                content {
                    ... on PageContentHomepage {
                        headline { json }
                        description { json }
                        stuffHeadline { json }
                        contactHeadline { json }
                        contactContent { json }
                    }
                }
            }
        }
    }
`;

export const getStaticProps = async () => {
    const result = await fetchGraphQL('/', QUERY);
    if (result.error) return { props: result };
    const page = result?.data?.pageCollection?.items?.[0];
    return getStaticPropsResponse(page);
};

export { default } from 'components/pages/Homepage';
