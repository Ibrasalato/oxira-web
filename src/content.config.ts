import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Arabic articles for the blog (/blog/). One Markdown file per article.
const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    product: z.enum(['builder', 'booking', 'menu', 'reviews', 'chat', 'content', 'tickets', 'seo', 'social', 'ads']).optional(),
    /** Path of a service page (or /ai-agents/) for the call to action, e.g. '/services/web-design/'. Takes priority over product. */
    service: z.string().optional(),
  }),
});

export const collections = { blog };
