// Oxira client sites: one Cloudflare Worker serves every website built in Oxira Studio.
// Bundled to public/cloudflare/sites-worker.js (npm run build:worker); n8n uploads it to Cloudflare.
// KV namespace bound as SITES stores each site's spec (JSON), not HTML, so design fixes reach every site:
//   "host:<hostname>"  for custom domains and subdomains (e.g. host:alrayyan.oxira.sa)
//   "slug:<slug>"      for https://<worker-domain>/<slug>/
import { renderSite } from './render';
import { mergeSpec, sampleSpec, templateIds, siteLangs, type Spec, type TemplateId, type SiteLang } from './spec';

interface Env { SITES: { get(key: string): Promise<string | null> } }

const FONT_ORIGIN = 'https://ibrasalato.github.io/oxira-web/builder/fonts/';

const page = (status: number, title: string, body: string) =>
  new Response(
    `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><body style="font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;background:#F5F7F9;color:#0A253E;text-align:center"><div><h1 style="margin:0 0 8px">${title}</h1><p style="margin:0;color:#556779">${body}</p></div></body></html>`,
    { status, headers: { 'content-type': 'text/html; charset=utf-8' } },
  );

function build(raw: string): string | null {
  try {
    const data = JSON.parse(raw);
    const t = (templateIds as string[]).includes(data?.template) ? (data.template as TemplateId) : 'corporate';
    const l = (siteLangs as string[]).includes(data?.lang) ? (data.lang as SiteLang) : 'ar';
    const spec: Spec = mergeSpec(sampleSpec(t, l), data);
    return renderSite(spec, { fontBase: '/_fonts' });
  } catch {
    return null;
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: { waitUntil(p: Promise<unknown>): void }) {
    const url = new URL(request.url);
    if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('Method not allowed', { status: 405 });

    if (url.pathname.startsWith('/_fonts/')) {
      const file = url.pathname.slice(8).replace(/[^a-z0-9.-]/gi, '');
      const cache = (caches as unknown as { default: Cache }).default;
      const hit = await cache.match(request);
      if (hit) return hit;
      const upstream = await fetch(FONT_ORIGIN + file);
      if (!upstream.ok) return new Response('Not found', { status: 404 });
      const res = new Response(upstream.body, {
        headers: { 'content-type': 'font/woff2', 'cache-control': 'public, max-age=31536000, immutable', 'access-control-allow-origin': '*' },
      });
      ctx.waitUntil(cache.put(request, res.clone()));
      return res;
    }

    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    let raw = await env.SITES.get(`host:${host}`);
    if (!raw) {
      const parts = url.pathname.split('/').filter(Boolean);
      const slug = parts[0];
      if (slug && /^[a-z0-9-]{2,63}$/.test(slug)) {
        if (parts.length === 1 && !url.pathname.endsWith('/')) return Response.redirect(`${url.origin}/${slug}/`, 301);
        raw = await env.SITES.get(`slug:${slug}`);
      }
    }
    if (!raw) return page(404, 'الموقع غير موجود', 'Site not found · <a href="https://oxira.sa" style="color:#007DB4">oxira.sa</a>');
    const html = build(raw);
    if (!html) return page(500, 'حدث خطأ', 'Something went wrong');
    return new Response(html, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=60',
        'x-content-type-options': 'nosniff',
        'referrer-policy': 'strict-origin-when-cross-origin',
        'content-security-policy': "default-src 'none'; style-src 'unsafe-inline'; font-src 'self'; img-src 'self' data:; base-uri 'none'; form-action 'none'",
      },
    });
  },
};
