import React from 'react';
import PropTypes from 'prop-types';
import fetchGists from 'utils/fetchGists';

import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

const Article = ({ gist }) => {
    return (
        <main>
            <Header />
            <article>
                <h1>{gist.description}</h1>
            </article>
            <Footer />
        </main>
    );
};

Article.propTypes = {
    gist: PropTypes.object,
};

export async function getStaticPaths() {
    const gists = await fetchGists();
    return {
        fallback: false,
        paths: gists.map(gist => ({
            params: { slug: gist.slug },
        })),
    };
}

export async function getStaticProps(ctx) {
    const { slug } = ctx.params;
    const gists = await fetchGists();
    const gist = gists.find(gist => gist.slug === slug);
    console.log(`${gist.description} generated`);
    return {
        props: {
            gist,
        },
    };
}

export default Article;
