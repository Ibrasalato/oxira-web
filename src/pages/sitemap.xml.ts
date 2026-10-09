import type { APIRoute } from 'astro';
import { langCodes, type Lang } from '../i18n/content';
import { productSlugs } from '../i18n/products';
import { getCollection } from 'astro:content';
import { landingPaths, landingLangs } from '../i18n/landing';
import { waPath } from '../i18n/waAgent';

const paths = ['/', '/website-builder/', '/studio/', '/partners/', '/products/', ...Object.values(productSlugs).map((s) => `/products/${s}/`), '/services/', '/ai-agents/', '/classti/', '/work/', '/about/', '/contact/', '/website-audit/', '/online-in-a-day/', '/help/', '/trust/', '/privacy/', '/terms/'];

export const GET: APIRoute = async ({ site }) => {
  // Service and location pages and the AI WhatsApp employee page exist in Arabic and English only.
  // (Its demo page, /whatsapp-agent/demo/, is noindex and left out.)
  const arEn = [...landingPaths, waPath];
  // Arabic-only pages (the blog): no language alternates.
  const arOnly = ['/blog/', ...(await getCollection('blog')).map((p) => `/blog/${p.id}/`)];
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const url = (lang: Lang, p: string) => new URL(`${base}${lang === 'ar' ? '' : '/' + lang}${p}`, site).href;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${paths.flatMap((p) => langCodes.map((lang) => `  <url>
    <loc>${url(lang, p)}</loc>
${langCodes.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(l, p)}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${url('ar', p)}"/>
  </url>`)).join('\n')}
${arEn.flatMap((p) => landingLangs.map((lang) => `  <url>
    <loc>${url(lang, p)}</loc>
${landingLangs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(l, p)}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${url('ar', p)}"/>
  </url>`)).join('\n')}
${arOnly.map((p) => `  <url>\n    <loc>${url('ar', p)}</loc>\n  </url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
