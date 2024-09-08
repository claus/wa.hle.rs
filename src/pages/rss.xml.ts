import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

import rss from '@astrojs/rss';

export const GET: APIRoute = async context => {
    const blog = await getCollection('blog');
    return rss({
        title: 'wa.hle.rs',
        description: 'This is my blog',
        site: context.site ?? 'https://example.com',
        trailingSlash: false,
        items: blog.map(post => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.publishDate,
            link: `/blog/${post.slug}`,
        })),
    });
};
