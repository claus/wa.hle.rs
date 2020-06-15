import React from 'react';
import PropTypes from 'prop-types';
import fetchGists from 'utils/fetchGists';

import Link from 'next/link';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

const Articles = ({ gists }) => {
    return (
        <main>
            <Header />
            <section>
                <h1>Articles</h1>
                <ol>
                    {gists.map(gist => (
                        <li key={gist.id}>
                            <Link href={`/articles/${gist.slug}`}>
                                <a>{gist.description}</a>
                            </Link>
                        </li>
                    ))}
                </ol>
            </section>
            <Footer />
        </main>
    );
};

Articles.propTypes = {
    gists: PropTypes.array,
};

export async function getStaticProps() {
    const gists = await fetchGists();
    return {
        props: {
            gists,
        },
    };
}

export default Articles;
