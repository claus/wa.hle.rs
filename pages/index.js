import fetchGists from 'utils/fetchGists';

export { default } from 'components/pages/Landing';

export async function getStaticProps() {
    const gists = await fetchGists();
    return {
        props: {
            gists,
        },
    };
}
