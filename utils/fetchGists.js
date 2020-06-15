import bent from 'bent';
import cache from './cache';
import { slugify } from './index';

const gh = bent('https://api.github.com/', 'json', {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    'User-Agent': '@claus',
});

const fetchGist = async id =>
    cache.has(id)
        ? Promise.resolve(cache.get(id)).then(gist => {
              console.log(`cache hit ${id}`);
              return gist;
          })
        : gh(`gists/${id}`).then(gist => {
              console.log(`cache miss ${id}`);
              cache.set(id, gist);
              return gist;
          });

export default async function fetchGists() {
    const indexGist = await fetchGist('5731eb7620e6f3ab5b26cba993c68d2d');
    const postGistIds = JSON.parse(indexGist.files['index.json'].content);
    const postGistReqs = postGistIds.map(fetchGist);
    return Promise.all(postGistReqs).then(gists =>
        gists.map(gist => ({
            ...gist,
            slug: slugify(gist.description),
        }))
    );
}
