// Oxira client sites: one Cloudflare Worker serves every website built in Oxira Studio.
// Bundled to public/cloudflare/sites-worker.js (npm run build:worker); n8n uploads it to Cloudflare.
// KV namespace bound as SITES stores each site's spec (JSON), not HTML, so design fixes reach every site:
//   "host:<hostname>"  for custom domains and subdomains (e.g. host:alrayyan.oxira.sa)
//   "slug:<slug>"      for https://<slug>.oxira.sa/ and https://<worker-domain>/<slug>/
import { renderSite, type SiteAddons, type AddonSettings } from './render';
import { renderMenuPage, renderReviewPage, renderChatPage, renderTicketPage, renderSuspendedPage, type TicketData } from './addons-render';
import { renderBlogIndex, renderPost, blogWord, postPath, INDEXNOW_KEY, type SeoData, type Post } from './seo-render';
import { mergeSpec, sampleSpec, templateIds, siteLangs, imageIdPattern, type Spec, type TemplateId, type SiteLang } from './spec';

interface Env {
  SITES: { get(key: string): Promise<string | null>; get(key: string, type: 'arrayBuffer'): Promise<ArrayBuffer | null> };
}

const FONT_ORIGIN = 'https://oxira.sa/builder/fonts/';

const page = (status: number, title: string, body: string) =>
  new Response(
    `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><body style="font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;background:#F5F7F9;color:#0A253E;text-align:center"><div><h1 style="margin:0 0 8px">${title}</h1><p style="margin:0;color:#556779">${body}</p></div></body></html>`,
    { status, headers: { 'content-type': 'text/html; charset=utf-8' } },
  );

const N8N = 'https://ibrasalato.app.n8n.cloud/webhook';
const FORM_ACTION = `${N8N}/oxira-site-contact`;
const BOOKING_ACTION = `${N8N}/oxira-site-booking`;
const TICKET_ACTION = `${N8N}/oxira-ticket-buy`;
const REVIEW_ACTION = `${N8N}/oxira-site-review`;
const CHAT_API = `${N8N}/oxira-site-chat`;

/** Paid add-ons for a site, written by n8n to "feat:o<order id>" whenever a subscription or setting changes. */
interface Features { suspended?: boolean; features?: string[]; settings?: AddonSettings }

function parseSpec(raw: string): Spec | null {
  try {
    const data = JSON.parse(raw);
    const t = (templateIds as string[]).includes(data?.template) ? (data.template as TemplateId) : 'corporate';
    const l = (siteLangs as string[]).includes(data?.lang) ? (data.lang as SiteLang) : 'ar';
    return mergeSpec(sampleSpec(t, l), data);
  } catch {
    return null;
  }
}

function build(raw: string, siteUrl: string, preview = false, addons?: SiteAddons): string | null {
  try {
    const data = JSON.parse(raw);
    const order = Number(data?._order) || 0;
    const t = (templateIds as string[]).includes(data?.template) ? (data.template as TemplateId) : 'corporate';
    const l = (siteLangs as string[]).includes(data?.lang) ? (data.lang as SiteLang) : 'ar';
    const spec: Spec = mergeSpec(sampleSpec(t, l), data);
    let html = renderSite(spec, { fontBase: '/_fonts', siteUrl, formAction: FORM_ACTION, siteId: order ? String(order) : '', addons });
    if (preview) {
      html = html
        .replace('<head>', '<head><meta name="robots" content="noindex,nofollow">')
        .replace(/<form class="cform"[\s\S]*?<\/form>/, '');
    }
    return html;
  } catch {
    return null;
  }
}

const attr = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Approved title/description from the SEO add-on, and a footer link to the blog when it has posts. */
function applySeo(html: string, seo: SeoData, lang: SiteLang, base: string): string {
  const t = String(seo.meta?.title || '').slice(0, 90);
  const d = String(seo.meta?.description || '').slice(0, 200);
  if (t) html = html.replace(/<title>[^<]*<\/title>/, `<title>${attr(t)}</title>`).replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${attr(t)}">`);
  if (d) html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${attr(d)}">`).replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${attr(d)}">`);
  if (seo.posts?.length) html = html.replace('<small>©', `<a class="rate-link" href="${base}/blog">${blogWord(lang)}</a><small>©`);
  return html;
}

const securityHeaders = {
  'content-type': 'text/html; charset=utf-8',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'content-security-policy': `default-src 'none'; style-src 'unsafe-inline'; font-src 'self'; img-src 'self' data:; base-uri 'none'; form-action ${N8N}/; frame-ancestors 'self' https://oxira.sa https://www.oxira.sa https://ibrasalato.github.io`,
};

export default {
  async fetch(request: Request, env: Env, ctx: { waitUntil(p: Promise<unknown>): void }) {
    const url = new URL(request.url);
    const isPost = request.method === 'POST';
    if (request.method !== 'GET' && request.method !== 'HEAD' && !isPost) return new Response('Method not allowed', { status: 405 });

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

    // Uploaded images (logo, photos): key "img:<id>", id ends in _j (jpeg) or _p (png).
    if (url.pathname.startsWith('/_img/')) {
      const id = url.pathname.slice(6);
      if (!imageIdPattern.test(id)) return new Response('Not found', { status: 404 });
      const data = await env.SITES.get(`img:${id}`, 'arrayBuffer');
      if (!data) return new Response('Not found', { status: 404 });
      return new Response(data, {
        headers: {
          'content-type': id.endsWith('_p') ? 'image/png' : 'image/jpeg',
          'cache-control': 'public, max-age=31536000, immutable',
          'access-control-allow-origin': '*',
          'x-content-type-options': 'nosniff',
        },
      });
    }

    // Shareable previews from Oxira Studio: /p/<id>/ (not indexed by search engines).
    if (url.pathname.startsWith('/p/')) {
      const id = url.pathname.split('/')[2] || '';
      if (!/^d_[a-f0-9]{20,40}$/.test(id)) return page(404, 'الصفحة غير موجودة', 'Not found');
      if (!url.pathname.endsWith('/') && url.pathname.split('/').filter(Boolean).length === 2) return Response.redirect(`${url.origin}/p/${id}/`, 301);
      const draft = await env.SITES.get(`draft:${id}`);
      const html = draft && build(draft, `${url.origin}/p/${id}/`, true);
      if (!html) return page(404, 'المعاينة غير متاحة', 'Preview not available');
      return new Response(html, { headers: { ...securityHeaders, 'x-robots-tag': 'noindex', 'cache-control': 'no-store' } });
    }

    if (url.hostname === 'www.oxira.sa') return Response.redirect(`https://oxira.sa${url.pathname}${url.search}`, 301);
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    let siteUrl = `${url.origin}/`;
    let base = '';
    let rest = url.pathname;
    let raw = await env.SITES.get(`host:${host}`);
    // Free subdomains: https://<slug>.oxira.sa/
    const sub = /^([a-z0-9-]{2,63})\.oxira\.sa$/.exec(host)?.[1];
    if (!raw && sub && sub !== 'www') raw = await env.SITES.get(`slug:${sub}`);
    if (!raw && !sub) {
      const parts = url.pathname.split('/').filter(Boolean);
      const slug = parts[0];
      if (slug && /^[a-z0-9-]{2,63}$/.test(slug)) {
        if (parts.length === 1 && !url.pathname.endsWith('/')) return Response.redirect(`${url.origin}/${slug}/`, 301);
        raw = await env.SITES.get(`slug:${slug}`);
        siteUrl = `${url.origin}/${slug}/`;
        base = `/${slug}`;
        rest = url.pathname.slice(base.length) || '/';
      }
    }
    if (!raw) return page(404, 'الموقع غير موجود', 'Site not found · <a href="https://oxira.sa" style="color:#007DB4">oxira.sa</a>');
    const spec = parseSpec(raw);
    if (!spec) return page(500, 'حدث خطأ', 'Something went wrong');
    const order = Number((JSON.parse(raw) as { _order?: number })._order) || 0;
    let feat: Features = {};
    if (order) {
      try { feat = JSON.parse((await env.SITES.get(`feat:o${order}`)) || '{}'); } catch { feat = {}; }
    }
    if (feat.suspended) return new Response(renderSuspendedPage(spec.lang), { status: 503, headers: { ...securityHeaders, 'cache-control': 'no-store' } });
    const has = (id: string) => !!feat.features?.includes(id);
    const settings = feat.settings ?? {};
    const pageOpts = { fontBase: '/_fonts', base };
    const html = (body: string, extra: Record<string, string> = {}) =>
      new Response(body, { headers: { ...securityHeaders, 'cache-control': 'public, max-age=60', ...extra } });
    rest = rest.replace(/\/+$/, '') || '/';

    // SEO add-on: approved meta overrides and blog / local pages.
    let seo: SeoData = {};
    if (order) {
      try { seo = JSON.parse((await env.SITES.get(`seo:o${order}`)) || '{}'); } catch { seo = {}; }
    }
    const posts = Array.isArray(seo.posts) ? seo.posts : [];
    if (!base && rest === `/${INDEXNOW_KEY}.txt`) return new Response(INDEXNOW_KEY, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
    const seoOpts = { fontBase: '/_fonts', base, siteUrl };
    if (rest === '/blog' && posts.length) return html(renderBlogIndex(spec, seoOpts, posts), { 'cache-control': 'public, max-age=300' });
    const pm = /^\/(blog|services)\/([a-z0-9-]{2,90})$/.exec(rest);
    if (pm && order) {
      const meta = posts.find((p) => p.slug === pm[2] && postPath(p) === rest);
      let post: Post | null = null;
      if (meta) { try { post = JSON.parse((await env.SITES.get(`post:o${order}:${meta.slug}`)) || 'null'); } catch { post = null; } }
      if (!post) return page(404, 'الصفحة غير موجودة', 'Not found');
      return html(renderPost(spec, seoOpts, { ...meta, body: String(post.body || '') }), { 'cache-control': 'public, max-age=300' });
    }
    // Search engines: every client site gets robots.txt and a sitemap on its own address.
    if (!base && rest === '/robots.txt') {
      return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteUrl}sitemap.xml\n`, { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
    }
    if (!base && rest === '/sitemap.xml') {
      const pages = [siteUrl, ...(has('menu') ? [`${siteUrl}menu`] : []), ...(posts.length ? [`${siteUrl}blog`] : []), ...posts.map((p) => `${siteUrl}${postPath(p).slice(1)}`)];
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${p}</loc></url>`).join('\n')}\n</urlset>\n`;
      return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
    }
    if (rest === '/menu' && has('menu')) return html(renderMenuPage(spec, pageOpts));
    if (rest === '/review' && has('reviews')) return html(renderReviewPage(spec, pageOpts, REVIEW_ACTION, String(order)));
    if (rest === '/chat' && has('chat')) {
      const nonce = crypto.randomUUID().replace(/-/g, '');
      return html(renderChatPage(spec, { ...pageOpts, nonce }), {
        'content-security-policy': securityHeaders['content-security-policy'] + `; script-src 'nonce-${nonce}'; connect-src 'self'`,
        'cache-control': 'no-store',
      });
    }
    if (rest === '/api/chat' && isPost && has('chat')) {
      let body: { sessionId?: string; message?: string } = {};
      try { body = await request.json(); } catch { /* empty */ }
      const message = String(body.message || '').slice(0, 1000);
      if (!message.trim()) return Response.json({ reply: '' }, { status: 400 });
      try {
        const res = await fetch(CHAT_API, {
          method: 'POST',
          body: new URLSearchParams({ site: String(order), sessionId: String(body.sessionId || '').slice(0, 64), message, lang: spec.lang }),
        });
        const data = (await res.json()) as { reply?: string };
        return Response.json({ reply: String(data.reply || '') }, { headers: { 'cache-control': 'no-store' } });
      } catch {
        return Response.json({ reply: '' }, { status: 502 });
      }
    }
    const tk = /^\/ticket\/([A-Z0-9]{6,16})$/.exec(rest)?.[1];
    if (tk && has('tickets')) {
      let t: TicketData | null = null;
      try { t = JSON.parse((await env.SITES.get(`ticket:${tk}`)) || 'null'); } catch { t = null; }
      if (!t) return page(404, 'التذكرة غير موجودة', 'Ticket not found');
      return html(renderTicketPage(spec, pageOpts, t), { 'cache-control': 'no-store' });
    }
    if (rest !== '/' || isPost) return page(404, 'الصفحة غير موجودة', 'Not found');

    const out = build(raw, siteUrl, false, {
      features: feat.features ?? [],
      settings,
      base,
      bookingAction: BOOKING_ACTION,
      ticketAction: TICKET_ACTION,
    });
    if (!out) return page(500, 'حدث خطأ', 'Something went wrong');
    return html(applySeo(out, seo, spec.lang, base));
  },
};
