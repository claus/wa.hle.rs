const withPlugins = require('next-compose-plugins');
const withSASS = require('@zeit/next-sass');
const withSourceMaps = require('@zeit/next-source-maps')();
const withMDX = require('@next/mdx')({ extension: /\.(md|mdx)$/ });

module.exports = withPlugins(
    [
        // MDX
        [withMDX],
        // SASS, CSS Modules
        [withSASS, {
            cssModules: true,
            cssLoaderOptions: {
                localIdentName: '[name]_[local]___[hash:base64:5]',
            },
        }],
        // Deploy source maps in production
        [withSourceMaps],
    ],
    {
        target: 'serverless',
        pageExtensions: ['js', 'md', 'mdx'],
    }
);
