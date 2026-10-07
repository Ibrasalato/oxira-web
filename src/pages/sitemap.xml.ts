import type { APIRoute } from 'astro';

const paths = ['/', '/services/', '/ai-agents/', '/classti/', '/work/', '/about/', '/contact/', '/privacy/'];

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const url = (lang: 'ar' | 'en', p: string) => new URL(`${base}${lang === 'en' ? '/en' : ''}${p}`, site).href;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${paths.flatMap((p) => (['ar', 'en'] as const).map((lang) => `  <url>
    <loc>${url(lang, p)}</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="${url('ar', p)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${url('en', p)}"/>
  </url>`)).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
