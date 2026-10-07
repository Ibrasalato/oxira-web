// Turns a site spec into one self-contained HTML page (no scripts).
// Used for the live preview in the studio, the template gallery, and later for publishing.
import type { Spec, TemplateId, FontId, SiteLang } from './spec';

const esc = (s: string) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Readable text colour on top of a background colour. */
function onColor(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.38 ? '#111418' : '#FFFFFF';
}

const words: Record<SiteLang, { rights: string; phone: string; whatsapp: string; email: string; address: string; hours: string; menu: string }> = {
  ar: { rights: 'جميع الحقوق محفوظة', phone: 'الهاتف', whatsapp: 'واتساب', email: 'البريد', address: 'العنوان', hours: 'أوقات العمل', menu: 'القائمة' },
  en: { rights: 'All rights reserved', phone: 'Phone', whatsapp: 'WhatsApp', email: 'Email', address: 'Address', hours: 'Hours', menu: 'Menu' },
  de: { rights: 'Alle Rechte vorbehalten', phone: 'Telefon', whatsapp: 'WhatsApp', email: 'E-Mail', address: 'Adresse', hours: 'Öffnungszeiten', menu: 'Menü' },
  fr: { rights: 'Tous droits réservés', phone: 'Téléphone', whatsapp: 'WhatsApp', email: 'E-mail', address: 'Adresse', hours: 'Horaires', menu: 'Menu' },
  ru: { rights: 'Все права защищены', phone: 'Телефон', whatsapp: 'WhatsApp', email: 'Почта', address: 'Адрес', hours: 'Часы работы', menu: 'Меню' },
};

const fonts: Record<FontId, { head: string; body: string; faces: [string, string][] }> = {
  modern: {
    head: "'IBM Plex Sans','Plex Cyr','Cairo',system-ui,sans-serif",
    body: "'IBM Plex Sans','Plex Cyr','Cairo',system-ui,sans-serif",
    faces: [['IBM Plex Sans', 'ibm-plex-sans-latin'], ['Cairo', 'cairo-arabic']],
  },
  elegant: {
    head: "'Playfair Display','Plex Cyr','El Messiri',Georgia,serif",
    body: "'IBM Plex Sans','Plex Cyr','Cairo',system-ui,sans-serif",
    faces: [['Playfair Display', 'playfair-display-latin'], ['El Messiri', 'el-messiri-arabic'], ['IBM Plex Sans', 'ibm-plex-sans-latin'], ['Cairo', 'cairo-arabic']],
  },
  friendly: {
    head: "'Poppins','Plex Cyr','Tajawal',system-ui,sans-serif",
    body: "'Poppins','Plex Cyr','Tajawal',system-ui,sans-serif",
    faces: [['Poppins', 'poppins-latin'], ['Tajawal', 'tajawal-arabic']],
  },
};

const fontCss = (font: FontId, base: string) =>
  [...fonts[font].faces, ['Plex Cyr', 'ibm-plex-sans-cyrillic'] as [string, string]]
    .flatMap(([family, file]) => [400, 700].map((w) =>
      `@font-face{font-family:'${family}';font-weight:${w};font-display:swap;src:url(${base}/${file}-${w}-normal.woff2) format('woff2')}`))
    .join('');

const icons = [
  '<path d="M4 19V9l8-5 8 5v10"/><path d="M9 19v-5h6v5"/>',
  '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  '<path d="M5 12l4 4 10-10"/>',
  '<path d="M12 3l2.6 5.6L20 9.4l-4.2 4 1 5.8L12 16.6 7.2 19.2l1-5.8L4 9.4l5.4-.8z"/>',
  '<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 10h16"/>',
  '<path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z"/>',
];
const icon = (i: number) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[i % icons.length]}</svg>`;

/** Decorative artwork for each template's hero, drawn from the brand colours. */
function art(t: TemplateId, initial: string) {
  switch (t) {
    case 'corporate':
      return `<svg class="art" viewBox="0 0 480 420" aria-hidden="true">
        <rect x="40" y="30" width="300" height="300" rx="36" fill="var(--p)"/>
        <rect x="190" y="150" width="250" height="230" rx="36" fill="var(--soft)"/>
        <rect x="230" y="270" width="34" height="70" rx="8" fill="var(--p)"/><rect x="280" y="230" width="34" height="110" rx="8" fill="var(--p)"/><rect x="330" y="190" width="34" height="150" rx="8" fill="var(--a)"/>
        <circle cx="96" cy="86" r="22" fill="var(--a)"/>
        <path d="M80 250 L150 190 L200 220 L280 120" stroke="var(--on-p)" stroke-opacity=".55" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
    case 'personal':
      return `<div class="mono" aria-hidden="true"><span>${esc(initial)}</span></div>`;
    case 'restaurant':
      return `<svg class="art" viewBox="0 0 480 420" aria-hidden="true">
        <path d="M60 420 V200 a120 120 0 0 1 240 0 V420 Z" fill="var(--a)"/>
        <path d="M200 420 V180 a110 110 0 0 1 220 0 V420" fill="none" stroke="var(--on-p)" stroke-opacity=".5" stroke-width="3"/>
        <circle cx="180" cy="250" r="70" fill="var(--p)"/><circle cx="180" cy="250" r="50" fill="none" stroke="var(--a)" stroke-width="3"/>
        <circle cx="390" cy="70" r="14" fill="var(--a)"/><circle cx="430" cy="110" r="7" fill="var(--on-p)" fill-opacity=".6"/>
      </svg>`;
    case 'clinic':
      return `<svg class="art" viewBox="0 0 480 420" aria-hidden="true">
        <circle cx="250" cy="210" r="180" fill="var(--soft)"/>
        <circle cx="250" cy="210" r="120" fill="var(--p)"/>
        <rect x="226" y="150" width="48" height="120" rx="12" fill="var(--on-p)"/><rect x="190" y="186" width="120" height="48" rx="12" fill="var(--on-p)"/>
        <rect x="40" y="290" width="150" height="70" rx="20" fill="#fff" stroke="var(--line)"/><circle cx="76" cy="325" r="16" fill="var(--a)"/><rect x="104" y="312" width="66" height="10" rx="5" fill="var(--line)"/><rect x="104" y="330" width="44" height="10" rx="5" fill="var(--line)"/>
        <circle cx="420" cy="80" r="26" fill="var(--a)" fill-opacity=".9"/>
      </svg>`;
    case 'store':
      return `<div class="tiles" aria-hidden="true">
        <div><svg viewBox="0 0 100 100"><circle cx="50" cy="56" r="28" fill="var(--p)"/><rect x="40" y="14" width="20" height="16" rx="4" fill="var(--a)"/></svg></div>
        <div><svg viewBox="0 0 100 100"><rect x="26" y="22" width="48" height="60" rx="10" fill="var(--a)"/><rect x="34" y="34" width="32" height="6" rx="3" fill="#fff" fill-opacity=".7"/></svg></div>
        <div><svg viewBox="0 0 100 100"><path d="M20 78 L50 20 L80 78 Z" fill="var(--a)"/></svg></div>
        <div><svg viewBox="0 0 100 100"><ellipse cx="50" cy="74" rx="30" ry="8" fill="var(--p)" fill-opacity=".25"/><rect x="30" y="30" width="40" height="44" rx="20" fill="var(--p)"/></svg></div>
      </div>`;
    case 'events':
      return `<svg class="art" viewBox="0 0 480 420" aria-hidden="true">
        <circle cx="240" cy="210" r="190" fill="none" stroke="var(--a)" stroke-opacity=".35" stroke-width="2"/>
        <circle cx="240" cy="210" r="130" fill="none" stroke="var(--a)" stroke-opacity=".6" stroke-width="2"/>
        <circle cx="240" cy="210" r="70" fill="var(--a)"/>
        <circle cx="404" cy="115" r="12" fill="var(--a)"/><circle cx="110" cy="330" r="8" fill="#fff"/>
      </svg>`;
  }
}

export interface RenderOptions {
  /** Absolute or relative URL of the folder with the font files. */
  fontBase: string;
  year?: number;
}

export function renderSite(s: Spec, opt: RenderOptions): string {
  const t = s.template;
  const rtl = s.lang === 'ar';
  const w = words[s.lang] ?? words.en;
  const f = fonts[s.font];
  const initial = (s.name.trim()[0] || 'O').toUpperCase();
  const tel = (v: string) => v.replace(/[^\d+]/g, '');
  const wa = (v: string) => `https://wa.me/${v.replace(/\D/g, '')}`;
  const has = (id: string) => s.sections.includes(id as never);

  const nav = [
    has('about') && `<a href="#about">${esc(s.about.title)}</a>`,
    has('services') && `<a href="#services">${esc(s.services.title)}</a>`,
    has('contact') && `<a href="#contact">${esc(s.contact.title)}</a>`,
  ].filter(Boolean).join('');

  const sections: Record<string, string> = {
    about: `<section class="about" id="about"><div class="wrap about-in">
      <h2>${esc(s.about.title)}</h2><p>${esc(s.about.text)}</p></div></section>`,
    services: s.services.items.length ? `<section class="services" id="services"><div class="wrap">
      <h2>${esc(s.services.title)}</h2>
      <div class="cards">${s.services.items.map((it, i) => `<article class="card">
        <span class="ic">${t === 'personal' || t === 'restaurant' ? String(i + 1).padStart(2, '0') : icon(i)}</span>
        <h3>${esc(it.title)}</h3><p>${esc(it.text)}</p></article>`).join('')}</div></div></section>` : '',
    stats: s.stats.length ? `<section class="stats"><div class="wrap stats-in">${s.stats.map((x) =>
      `<div><b>${esc(x.value)}</b><span>${esc(x.label)}</span></div>`).join('')}</div></section>` : '',
    cta: `<section class="cta"><div class="wrap"><div class="cta-in">
      <div><h2>${esc(s.ctaBand.title)}</h2><p>${esc(s.ctaBand.text)}</p></div>
      <a class="btn btn-a" href="#contact">${esc(s.ctaBand.button)}</a></div></div></section>`,
    contact: `<section class="contact" id="contact"><div class="wrap">
      <h2>${esc(s.contact.title)}</h2>
      <div class="contact-grid">
        ${s.contact.phone ? `<a href="tel:${esc(tel(s.contact.phone))}"><small>${w.phone}</small><span dir="ltr">${esc(s.contact.phone)}</span></a>` : ''}
        ${s.contact.whatsapp ? `<a href="${esc(wa(s.contact.whatsapp))}"><small>${w.whatsapp}</small><span dir="ltr">${esc(s.contact.whatsapp)}</span></a>` : ''}
        ${s.contact.email ? `<a href="mailto:${esc(s.contact.email)}"><small>${w.email}</small><span dir="ltr">${esc(s.contact.email)}</span></a>` : ''}
        ${s.contact.address ? `<div><small>${w.address}</small><span>${esc(s.contact.address)}</span></div>` : ''}
        ${s.contact.hours ? `<div><small>${w.hours}</small><span>${esc(s.contact.hours)}</span></div>` : ''}
      </div></div></section>`,
  };

  const body = `
<header class="top"><div class="wrap top-in">
  <a class="brand" href="#"><span class="mark">${esc(initial)}</span><span>${esc(s.name)}</span></a>
  <nav>${nav}</nav>
  <a class="btn btn-p small" href="#contact">${esc(s.hero.cta)}</a>
</div></header>
<section class="hero"><div class="wrap hero-in">
  <div class="hero-copy">
    <p class="eyebrow">${esc(s.tagline)}</p>
    <h1>${esc(s.hero.title)}</h1>
    <p class="sub">${esc(s.hero.subtitle)}</p>
    <div class="actions"><a class="btn btn-a" href="#contact">${esc(s.hero.cta)}</a>${has('services') ? `<a class="btn btn-ghost" href="#services">${esc(s.services.title)}</a>` : ''}</div>
  </div>
  <div class="hero-art">${art(t, initial)}</div>
</div></section>
${s.sections.map((id) => sections[id] ?? '').join('\n')}
<footer class="foot"><div class="wrap foot-in"><span class="brand"><span class="mark">${esc(initial)}</span><span>${esc(s.name)}</span></span><small>© ${opt.year ?? new Date().getFullYear()} ${esc(s.name)}. ${w.rights}.</small></div></footer>`;

  const p = s.colors.primary, a = s.colors.accent;
  const css = `${fontCss(s.font, opt.fontBase)}
:root{--p:${p};--a:${a};--on-p:${onColor(p)};--on-a:${onColor(a)};--ink:#14171C;--muted:#5B6472;--line:#E5E7EB;--bg:#fff;
--soft:color-mix(in srgb,var(--p) 9%,#fff);--soft-a:color-mix(in srgb,var(--a) 16%,#fff);--r:16px;--head:${f.head};--body:${f.body}}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:var(--body);color:var(--ink);background:var(--bg);line-height:1.7;-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:var(--head);margin:0;line-height:1.2;font-weight:700}p{margin:0}a{color:inherit;text-decoration:none}svg{display:block}
.wrap{max-width:1120px;margin:0 auto;padding:0 24px}
.top{position:sticky;top:0;z-index:5;background:color-mix(in srgb,var(--bg) 92%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.top-in{display:flex;align-items:center;gap:28px;min-height:72px}.top nav{display:flex;gap:24px;flex:1;font-weight:600;color:var(--muted);font-size:.95rem}.top nav a:hover{color:var(--ink)}
.brand{display:inline-flex;align-items:center;gap:10px;font-family:var(--head);font-weight:700;font-size:1.15rem}
.mark{width:36px;height:36px;border-radius:10px;display:grid;place-items:center;background:var(--p);color:var(--on-p);font-size:1.05rem;font-family:var(--head)}
.btn{display:inline-flex;align-items:center;justify-content:center;padding:14px 24px;border-radius:12px;font-weight:700;font-size:1rem;border:1.5px solid transparent;transition:transform .15s,filter .15s}.btn:hover{filter:brightness(1.05);transform:translateY(-1px)}
.btn.small{padding:10px 18px;font-size:.92rem}.btn-p{background:var(--p);color:var(--on-p)}.btn-a{background:var(--a);color:var(--on-a)}.btn-ghost{border-color:var(--line);color:var(--ink);background:#fff}
.hero{padding:88px 0 72px}.hero-in{display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center}
.eyebrow{font-weight:700;color:var(--p);margin-bottom:14px;font-size:.98rem}h1{font-size:clamp(2.3rem,5vw,3.9rem);letter-spacing:-.01em}
.sub{font-size:1.18rem;color:var(--muted);margin-top:20px;max-width:34rem}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}
.art{width:100%;height:auto}
section h2{font-size:clamp(1.8rem,3.4vw,2.6rem);margin-bottom:28px}
.about{padding:88px 0;background:var(--soft)}.about-in{display:grid;grid-template-columns:1fr 1.6fr;gap:48px}.about-in h2{margin:0}.about p{font-size:1.15rem;color:var(--ink)}
.services{padding:96px 0}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px}
.card{border:1px solid var(--line);border-radius:var(--r);padding:28px;background:#fff}.card h3{font-size:1.2rem;margin:18px 0 8px}.card p{color:var(--muted)}
.ic{width:48px;height:48px;border-radius:12px;display:grid;place-items:center;background:var(--soft-a);color:var(--p);font-weight:700;font-family:var(--head)}.ic svg{width:24px;height:24px}
.stats{background:var(--p);color:var(--on-p);padding:64px 0}.stats-in{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:24px;text-align:center}
.stats b{display:block;font-family:var(--head);font-size:clamp(2rem,4vw,3rem);line-height:1.1;color:var(--a)}.stats span{opacity:.85}
.cta{padding:88px 0}.cta-in{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:28px;padding:48px;border-radius:calc(var(--r) * 1.5);background:var(--soft-a)}
.cta h2{margin-bottom:10px;font-size:clamp(1.6rem,3vw,2.2rem)}.cta p{color:var(--muted);font-size:1.08rem}
.contact{padding:24px 0 96px}.contact-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px}
.contact-grid>*{display:grid;gap:4px;padding:22px 24px;border:1px solid var(--line);border-radius:var(--r);background:#fff}.contact-grid small{color:var(--muted);font-weight:600}.contact-grid span{font-weight:700;font-size:1.05rem}
a.contact-grid>*:hover,.contact-grid a:hover{border-color:var(--p)}
.foot{border-top:1px solid var(--line);padding:28px 0;color:var(--muted)}.foot-in{display:flex;flex-wrap:wrap;gap:16px;justify-content:space-between;align-items:center}.foot .brand{color:var(--ink);font-size:1rem}.foot .mark{width:30px;height:30px;font-size:.9rem}
html[dir=rtl] h1,html[dir=rtl] h2,html[dir=rtl] h3{line-height:1.4;letter-spacing:0}html[dir=rtl] body{line-height:1.85}

/* personal: editorial, centred, big monogram */
.t-personal{--r:4px}.t-personal .hero-in{grid-template-columns:1fr;text-align:center;justify-items:center}.t-personal .hero-art{order:-1}
.t-personal .mono{width:132px;height:132px;border-radius:50%;background:var(--p);color:var(--on-p);display:grid;place-items:center;font-family:var(--head);font-size:3.6rem;box-shadow:0 0 0 10px var(--soft-a)}
.t-personal h1{font-size:clamp(2.6rem,6vw,4.6rem);max-width:16ch}.t-personal .sub{margin-inline:auto}.t-personal .actions{justify-content:center}.t-personal .eyebrow{color:var(--a);letter-spacing:.06em}
.t-personal .about{background:#fff;border-top:1px solid var(--line)}.t-personal .cards{grid-template-columns:1fr;gap:0}.t-personal .card{border:0;border-bottom:1px solid var(--line);border-radius:0;display:grid;grid-template-columns:64px 1fr 1.4fr;gap:24px;align-items:baseline;padding:28px 0}
.t-personal .card h3{margin:0}.t-personal .ic{background:none;width:auto;height:auto;color:var(--a);font-size:1.1rem}.t-personal .stats{background:var(--soft)}.t-personal .stats{color:var(--ink)}.t-personal .stats b{color:var(--p)}
.t-personal .cta-in{background:var(--p);color:var(--on-p)}.t-personal .cta p{color:inherit;opacity:.8}

/* restaurant: warm full-colour hero, menu list */
.t-restaurant{--bg:#FFFBF5}.t-restaurant .hero{background:var(--p);color:var(--on-p);padding-bottom:0}.t-restaurant .hero-in{align-items:end}.t-restaurant .hero-copy{padding-bottom:72px}
.t-restaurant .eyebrow{color:var(--a)}.t-restaurant .sub{color:inherit;opacity:.82}.t-restaurant .btn-ghost{background:transparent;color:inherit;border-color:color-mix(in srgb,var(--on-p) 40%,transparent)}
.t-restaurant .about{background:var(--bg);text-align:center}.t-restaurant .about-in{grid-template-columns:1fr;max-width:46rem;margin:0 auto}
.t-restaurant .cards{grid-template-columns:1fr 1fr;gap:0 48px}.t-restaurant .card{border:0;border-bottom:1px dashed color-mix(in srgb,var(--p) 30%,transparent);border-radius:0;background:none;padding:24px 0;display:grid;grid-template-columns:auto 1fr;gap:4px 18px}
.t-restaurant .card .ic{grid-row:span 2;background:none;color:var(--a);width:auto;height:auto;font-size:1.3rem}.t-restaurant .card h3{margin:0;color:var(--p)}
.t-restaurant .services h2,.t-restaurant .contact h2{text-align:center}.t-restaurant .cta-in{background:var(--a);color:var(--on-a)}.t-restaurant .cta p{color:inherit;opacity:.85}.t-restaurant .cta .btn-a{background:var(--p);color:var(--on-p)}

/* clinic: soft and rounded */
.t-clinic{--r:22px;--bg:#fff}.t-clinic .hero{background:linear-gradient(180deg,var(--soft),#fff)}.t-clinic .btn{border-radius:999px}.t-clinic .btn-a{background:var(--p);color:var(--on-p)}
.t-clinic .card{box-shadow:0 10px 30px -18px rgba(15,40,60,.35);border-color:transparent}.t-clinic .ic{border-radius:50%;background:var(--soft);color:var(--p)}
.t-clinic .stats{background:#fff;color:var(--ink)}.t-clinic .stats-in{background:var(--soft);border-radius:var(--r);padding:40px}.t-clinic .stats b{color:var(--p)}
.t-clinic .cta-in{background:var(--p);color:var(--on-p)}.t-clinic .cta p{color:inherit;opacity:.85}.t-clinic .cta .btn-a{background:var(--a);color:var(--on-a)}

/* store: product tiles */
.t-store{--r:18px}.t-store .tiles{display:grid;grid-template-columns:1fr 1fr;gap:16px}.t-store .tiles div{aspect-ratio:1;border-radius:var(--r);background:var(--soft);display:grid;place-items:center}
.t-store .tiles div:nth-child(2),.t-store .tiles div:nth-child(3){background:var(--soft-a)}.t-store .tiles svg{width:62%}
.t-store .card{background:var(--soft);border:0;text-align:center}.t-store .ic{margin:0 auto;background:#fff}.t-store .stats{background:var(--a);color:var(--on-a)}.t-store .stats b{color:inherit}

/* events: dark, bold */
.t-events{--bg:#0B1120;--ink:#F4F6FA;--muted:#9AA6B8;--line:rgba(255,255,255,.12);--soft:rgba(255,255,255,.05);--soft-a:color-mix(in srgb,var(--a) 14%,transparent)}
.t-events .top{background:rgba(11,17,32,.85)}.t-events .mark{background:var(--a);color:var(--on-a)}.t-events .btn-p{background:var(--a);color:var(--on-a)}.t-events .btn-ghost{background:transparent;color:var(--ink)}
.t-events h1{font-size:clamp(2.6rem,6vw,4.8rem);text-transform:none}.t-events .eyebrow{color:var(--a)}.t-events .card,.t-events .contact-grid>*{background:var(--soft)}
.t-events .stats{background:var(--soft);color:var(--ink);border-block:1px solid var(--line)}.t-events .ic{color:var(--a)}.t-events .cta-in{background:var(--a);color:var(--on-a)}.t-events .cta p{color:inherit;opacity:.8}.t-events .cta .btn-a{background:#0B1120;color:#fff}

@media (max-width:860px){
  .top nav{display:none}.top-in{justify-content:space-between}.hero{padding:56px 0}.hero-in,.about-in{grid-template-columns:1fr;gap:36px}
  .hero-art{max-width:420px}.t-restaurant .hero-copy{padding-bottom:0}.t-restaurant .cards{grid-template-columns:1fr}
  .t-personal .card{grid-template-columns:48px 1fr;}.t-personal .card p{grid-column:2}.cta-in{padding:32px}
  .services,.about,.cta{padding:64px 0}
}
@media (max-width:560px){.top .btn{display:none}.brand{font-size:1.05rem}h1{font-size:2.2rem}.wrap{padding:0 20px}}`;

  return `<!doctype html><html lang="${s.lang}" dir="${rtl ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(s.name)}${s.tagline ? ' | ' + esc(s.tagline) : ''}</title><meta name="description" content="${esc(s.hero.subtitle)}">
<style>${css}</style></head><body class="t-${t}">${body}</body></html>`;
}
