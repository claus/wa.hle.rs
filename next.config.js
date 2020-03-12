const withPlugins = require('next-compose-plugins');
const withSourceMaps = require('@zeit/next-source-maps')();
const withMDX = require('@next/mdx')({ extension: /\.(md|mdx)$/ });

module.exports = withPlugins(
    [
        // MDX
        [withMDX],
        // Deploy source maps in production
        [withSourceMaps],
    ],
    {
        target: 'serverless',
        pageExtensions: ['js', 'md', 'mdx'],
        poweredByHeader: false,
        env: {
            XKCD_BOT_USERNAME: process.env.XKCD_BOT_USERNAME,
            XKCD_BOT_PASSWORD: process.env.XKCD_BOT_PASSWORD,
            XKCD_BOT_MASTODON_ACCOUNT_ID: process.env.XKCD_BOT_MASTODON_ACCOUNT_ID,
            XKCD_BOT_MASTODON_TOKEN: process.env.XKCD_BOT_MASTODON_TOKEN,
        },
    }
);
