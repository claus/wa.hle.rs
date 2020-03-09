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
    }
);
