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
