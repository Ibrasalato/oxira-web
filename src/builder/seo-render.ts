// Blog and local landing pages of a client site (SEO add-on). Content is written by n8n to KV after the
// owner approves it in "My account":
//   "seo:o<order>"          { meta?: { title?, description? }, posts?: PostMeta[] }  (list, no bodies)
//   "post:o<order>:<slug>"  Post (one article or local page, body in a small Markdown subset)
import { esc, onColor, fonts, fontCss } from './render';
import type { Spec, SiteLang } from './spec';

export interface PostMeta { slug: string; kind: 'article' | 'local'; title: string; description: string; date: string; lang?: SiteLang }
export interface Post extends PostMeta { body: string }
export interface SeoData { meta?: { title?: string; description?: string }; posts?: PostMeta[] }

/** IndexNow key (public by design: search engines fetch /<key>.txt to confirm we own the site). */
export const INDEXNOW_KEY = 'ox7c2f9a41d85e4b6f93a0c1d27e5b8f46';

export const postPath = (p: Pick<PostMeta, 'kind' | 'slug'>) => (p.kind === 'local' ? `/services/${p.slug}` : `/blog/${p.slug}`);

const sw: Record<SiteLang, { blog: string; back: string; read: string; services: string; poweredBy: string }> = {
  ar: { blog: 'المدونة', back: 'العودة للموقع', read: 'اقرأ المزيد', services: 'خدماتنا', poweredBy: 'صُمم مع أوكسيرا' },
  en: { blog: 'Blog', back: 'Back to the website', read: 'Read more', services: 'Our services', poweredBy: 'Made with Oxira' },
  de: { blog: 'Blog', back: 'Zur Website', read: 'Weiterlesen', services: 'Unsere Leistungen', poweredBy: 'Erstellt mit Oxira' },
  fr: { blog: 'Blog', back: 'Retour au site', read: 'Lire la suite', services: 'Nos services', poweredBy: 'Réalisé avec Oxira' },
  ru: { blog: 'Блог', back: 'Вернуться на сайт', read: 'Читать далее', services: 'Наши услуги', poweredBy: 'Сделано в Oxira' },
};
export const blogWord = (l: SiteLang) => (sw[l] ?? sw.en).blog;

/** Small, safe Markdown: ## / ### headings, paragraphs, "- " lists, **bold**, [text](https://… or /path). Everything is escaped first. */
export function md(src: string): string {
  const inline = (t: string) => esc(t)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(((?:https:\/\/|\/)[^\s)"]*)\)/g, (_m, txt: string, href: string) => `<a href="${href}"${href.startsWith('/') ? '' : ' rel="noopener" target="_blank"'}>${txt}</a>`);
  const out: string[] = [];
  let list: string[] = [];
  let para: string[] = [];
  const flush = () => {
    if (para.length) { out.push(`<p>${inline(para.join(' '))}</p>`); para = []; }
    if (list.length) { out.push(`<ul>${list.map((x) => `<li>${inline(x)}</li>`).join('')}</ul>`); list = []; }
  };
  for (const raw of String(src || '').replace(/\r/g, '').split('\n')) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    const h = /^(#{2,3})\s+(.+)$/.exec(line);
    if (h) { flush(); out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); continue; }
    const li = /^[-*•]\s+(.+)$/.exec(line);
    if (li) { if (para.length) { out.push(`<p>${inline(para.join(' '))}</p>`); para = []; } list.push(li[1]); continue; }
    if (list.length) flush();
    para.push(line.replace(/^#\s+/, ''));
  }
  flush();
  return out.join('\n');
}

interface Opts { fontBase: string; base: string; siteUrl: string }

function shell(s: Spec, o: Opts, title: string, description: string, canonical: string, body: string, ld: unknown, lang: SiteLang = s.lang) {
  const p = s.colors.primary, a = s.colors.accent, f = fonts[s.font];
  const rtl = lang === 'ar';
  return `<!doctype html><html lang="${lang}" dir="${rtl ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:site_name" content="${esc(s.name)}"><meta name="theme-color" content="${p}">
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>
<style>${fontCss(s.font, o.fontBase)}
:root{--p:${p};--a:${a};--on-p:${onColor(p)};--ink:#14171C;--muted:#5B6472;--line:#E5E7EB;--soft:color-mix(in srgb,var(--p) 7%,#fff)}
*{box-sizing:border-box}body{margin:0;font-family:${f.body};color:var(--ink);background:#fff;line-height:1.8;-webkit-font-smoothing:antialiased}h1,h2,h3{font-family:${f.head};line-height:1.35;margin:0}a{color:var(--p)}
.bar{background:var(--p);color:var(--on-p);padding:14px 20px;display:flex;align-items:center;gap:12px}.bar b{flex:1;font-family:${f.head}}.bar a{color:inherit;opacity:.85;text-decoration:none;font-size:.9rem}
.wrap{max-width:760px;margin:0 auto;padding:32px 20px 56px}.crumb{font-size:.88rem;color:var(--muted);margin-bottom:18px}.crumb a{color:var(--muted);text-decoration:none}
h1{font-size:clamp(1.8rem,4.5vw,2.6rem);margin-bottom:12px}.lead{font-size:1.15rem;color:var(--muted);margin-bottom:8px}.date{color:var(--muted);font-size:.9rem;margin-bottom:28px}
.body h2{font-size:1.45rem;margin:32px 0 10px}.body h3{font-size:1.18rem;margin:24px 0 8px}.body p{margin:0 0 14px}.body ul{margin:0 0 16px;padding-inline-start:22px}.body li{margin-bottom:6px}
.cta{margin-top:36px;padding:22px;border-radius:16px;background:var(--soft);display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between}.btn{display:inline-flex;padding:12px 20px;border-radius:12px;background:var(--p);color:var(--on-p);font-weight:700;text-decoration:none}
.list{list-style:none;padding:0;margin:0;display:grid;gap:14px}.list a{display:block;padding:18px 20px;border:1px solid var(--line);border-radius:16px;text-decoration:none;color:inherit}.list a:hover{border-color:var(--p)}.list b{display:block;font-size:1.12rem;font-family:${f.head};margin-bottom:4px}.list span{color:var(--muted)}
.foot{text-align:center;color:var(--muted);font-size:.8rem;padding:10px 0 30px}</style></head>
<body><header class="bar"><b>${esc(s.name)}</b><a href="${o.base}/">${(sw[lang] ?? sw.en).back}</a></header>${body}<p class="foot">${(sw[lang] ?? sw.en).poweredBy}</p></body></html>`;
}

const fmtDate = (d: string, l: SiteLang) => {
  try { return new Intl.DateTimeFormat(l === 'ar' ? 'ar-SA-u-nu-latn-ca-gregory' : l, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(d)); } catch { return d; }
};

export function renderBlogIndex(s: Spec, o: Opts, posts: PostMeta[]) {
  const w = sw[s.lang] ?? sw.en;
  const url = `${o.siteUrl}blog`;
  const items = posts.filter((p) => p.kind === 'article');
  const local = posts.filter((p) => p.kind === 'local');
  const row = (p: PostMeta) => { const pl = p.lang && p.lang !== s.lang ? ` lang="${p.lang}" dir="${p.lang === 'ar' ? 'rtl' : 'ltr'}"` : ''; return `<li${pl}><a href="${o.base}${postPath(p)}"><b>${esc(p.title)}</b><span>${esc(p.description)}</span></a></li>`; };
  const body = `<main class="wrap"><h1>${w.blog} · ${esc(s.name)}</h1>
${items.length ? `<ul class="list">${items.map(row).join('')}</ul>` : ''}
${local.length ? `<h2 style="margin:36px 0 14px;font-size:1.4rem">${w.services}</h2><ul class="list">${local.map(row).join('')}</ul>` : ''}</main>`;
  const ld = { '@context': 'https://schema.org', '@type': 'Blog', name: `${w.blog} · ${s.name}`, url, blogPost: items.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${o.siteUrl}${postPath(p).slice(1)}`, datePublished: p.date })) };
  return shell(s, o, `${w.blog} | ${s.name}`, `${w.blog} · ${s.name}`, url, body, ld);
}

export function renderPost(s: Spec, o: Opts, p: Post) {
  const lang: SiteLang = p.lang && sw[p.lang] ? p.lang : s.lang;
  const w = sw[lang] ?? sw.en;
  const url = `${o.siteUrl}${postPath(p).slice(1)}`;
  const body = `<main class="wrap"><nav class="crumb"><a href="${o.base}/">${esc(s.name)}</a> / <a href="${o.base}/blog">${p.kind === 'local' ? w.services : w.blog}</a></nav>
<h1>${esc(p.title.replace(new RegExp(`\\s*[|\\-–]\\s*${s.name.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}$`), ''))}</h1><p class="lead">${esc(p.description)}</p>${p.kind === 'article' ? `<p class="date">${esc(fmtDate(p.date, lang))}</p>` : '<div style="height:20px"></div>'}
<article class="body">${md(p.body)}</article>
<div class="cta"><b>${esc(s.name)}</b><a class="btn" href="${o.base}/#contact">${esc(s.hero.cta || w.read)}</a></div></main>`;
  const ld = p.kind === 'article'
    ? { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.description, datePublished: p.date, url, inLanguage: lang, author: { '@type': 'Organization', name: s.name }, publisher: { '@type': 'Organization', name: s.name } }
    : { '@context': 'https://schema.org', '@type': 'Service', name: p.title, description: p.description, url, provider: { '@type': 'LocalBusiness', name: s.name, ...(s.contact.address ? { address: s.contact.address } : {}), ...(s.contact.phone ? { telephone: s.contact.phone } : {}) } };
  const docTitle = p.title.includes(s.name) ? p.title : `${p.title} | ${s.name}`;
  return shell(s, o, docTitle, p.description, url, body, ld, lang);
}

/** /llms.txt: a plain summary of the business for AI assistants and AI search (llmstxt.org format). */
export function renderLlms(s: Spec, siteUrl: string, posts: PostMeta[]) {
  const line = (v: string) => String(v || '').replace(/\s+/g, ' ').trim();
  const out: string[] = [`# ${line(s.name)}`, '', `> ${line(s.hero.subtitle || s.tagline || '')}`, ''];
  if (s.about?.text) out.push(line(s.about.text), '');
  const services = (s.services?.items || []).filter((x) => x.title);
  if (services.length) { out.push('## Services', ''); for (const x of services) out.push(`- ${line(x.title)}${x.text ? ': ' + line(x.text) : ''}`); out.push(''); }
  const c = s.contact || ({} as Spec['contact']);
  const contact = [c.phone && `- Phone: ${c.phone}`, c.whatsapp && `- WhatsApp: ${c.whatsapp}`, c.email && `- Email: ${c.email}`, c.address && `- Address: ${line(c.address)}`, c.hours && `- Hours: ${line(c.hours)}`, `- Website: ${siteUrl}`].filter(Boolean) as string[];
  out.push('## Contact', '', ...contact, '');
  const faq = s.sections.includes('faq') ? (s.faq?.items || []) : [];
  if (faq.length) { out.push('## FAQ', ''); for (const x of faq.slice(0, 20)) out.push(`- ${line(x.q)}: ${line(x.a)}`); out.push(''); }
  if (posts.length) { out.push('## Articles and pages', ''); for (const p of posts.slice(0, 60)) out.push(`- [${line(p.title)}](${siteUrl}${postPath(p).slice(1)}): ${line(p.description)}`); out.push(''); }
  return out.join('\n');
}
