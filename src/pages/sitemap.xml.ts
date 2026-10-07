import type { APIRoute } from 'astro';
import { langCodes, type Lang } from '../i18n/content';

const paths = ['/', '/website-builder/', '/studio/', '/services/', '/ai-agents/', '/classti/', '/work/', '/about/', '/contact/', '/privacy/'];

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const url = (lang: Lang, p: string) => new URL(`${base}${lang === 'ar' ? '' : '/' + lang}${p}`, site).href;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${paths.flatMap((p) => langCodes.map((lang) => `  <url>
    <loc>${url(lang, p)}</loc>
${langCodes.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(l, p)}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${url('ar', p)}"/>
  </url>`)).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
