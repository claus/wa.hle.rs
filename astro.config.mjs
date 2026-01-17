import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import node from '@astrojs/node';

const isNodeAdapter = process.argv.includes('--node');
const adapter = isNodeAdapter ? node({ mode: 'standalone' }) : vercel();

// https://astro.build/config
export default defineConfig({
    site: 'https://wa.hle.rs',
    devToolbar: { enabled: false },
    integrations: [sitemap(), mdx()],
    output: 'static',
    adapter,
    vite: {
        build: {
            rollupOptions: {
                onwarn(warning, warn) {
                    // Suppress warning from @astrojs/vercel beta - the entrypoint.js
                    // doesn't have a default export but Astro tries to re-export it.
                    // TODO: Remove once @astrojs/vercel is updated to fix this
                    if (
                        warning.code === 'MISSING_EXPORT' &&
                        warning.id?.includes('virtual:astro:adapter-entrypoint') &&
                        warning.binding === 'default'
                    ) {
                        return;
                    }
                    warn(warning);
                },
            },
        },
    },
    experimental: {
        fonts: [
            {
                provider: 'local',
                name: 'Hel',
                cssVariable: '--font-hel',
                fallbacks: ['Arial', 'sans-serif'],
                variants: [
                    {
                        weight: '400',
                        style: 'normal',
                        src: ['./src/assets/fonts/HelVF.woff2'],
                    },
                ],
            },
        ],
    },
});
