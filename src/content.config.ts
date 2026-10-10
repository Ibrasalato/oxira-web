import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog articles. One Markdown file per article; the English translation (/en/blog/<slug>/)
// lives in src/content/blog-en/ under the same file name as the Arabic original (/blog/<slug>/).
const schema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  product: z.enum(['builder', 'booking', 'menu', 'reviews', 'chat', 'content', 'tickets', 'seo', 'social', 'ads']).optional(),
  /** Path of a service page (or /ai-agents/) for the call to action, e.g. '/services/web-design/'. Takes priority over product. */
  service: z.string().optional(),
});
const blog = defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/blog' }), schema });
const blogEn = defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/blog-en' }), schema });

export const collections = { blog, blogEn };
