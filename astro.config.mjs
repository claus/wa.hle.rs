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
    integrations: [sitemap(), mdx()],
    output: 'static',
    adapter,
});
