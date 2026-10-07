import { defineConfig } from 'astro/config';

// On GitHub Pages without a custom domain the site lives at /<repo-name>/.
// The deploy workflow sets BASE_PATH for that case; with a custom domain
// (public/CNAME present) it stays at the root.
const base = process.env.BASE_PATH || '/';
const site = process.env.SITE_URL || 'https://oxira.sa';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  i18n: {
    locales: ['ar', 'en', 'de', 'fr', 'ru'],
    defaultLocale: 'ar',
    routing: { prefixDefaultLocale: false },
  },
});
