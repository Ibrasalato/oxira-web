// Turns a site spec into one self-contained HTML page (no scripts).
// Used for the live preview in the studio, the template gallery, and later for publishing.
import { emptyMedia, imageIdPattern, layoutOf, type Spec, type TemplateId, type FontId, type SiteLang } from './spec';

const esc = (s: string) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Readable text colour on top of a background colour. */
function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Page colours when the client picks their own background. */
function backgroundCss(bg: string) {
  const dark = luminance(bg) < 0.2;
  const ink = dark ? '#F4F6FA' : '#14171C';
  return `body.has-bg{--bg:${bg};--ink:${ink};--muted:color-mix(in srgb,${ink} 68%,${bg});--line:color-mix(in srgb,${ink} 14%,${bg});--soft:color-mix(in srgb,var(--p) 10%,${bg});--soft-a:color-mix(in srgb,var(--a) 18%,${bg});--card:color-mix(in srgb,${dark ? '#fff 6%' : '#fff 55%'},${bg})}
body.has-bg .card,body.has-bg .contact-grid>*,body.has-bg .btn-ghost{background:var(--card)}body.has-bg .top{background:color-mix(in srgb,var(--bg) 92%,transparent)}
${dark ? 'body.has-bg .stats{color:var(--on-p)}body.has-bg .eyebrow{color:var(--a)}' : ''}`;
}

function onColor(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.38 ? '#111418' : '#FFFFFF';
}

type Words = { rights: string; phone: string; whatsapp: string; email: string; address: string; hours: string; menu: string; gallery: string; map: string; formTitle: string; formName: string; formPhone: string; formMessage: string; formSend: string; chat: string };
const words: Record<SiteLang, Words> = {
  ar: { map: 'افتح الموقع على الخريطة', formTitle: 'أرسل لنا رسالة', formName: 'الاسم', formPhone: 'رقم الجوال', formMessage: 'رسالتك', formSend: 'إرسال', chat: 'تواصل عبر واتساب', gallery: 'معرض الصور', rights: 'جميع الحقوق محفوظة', phone: 'الهاتف', whatsapp: 'واتساب', email: 'البريد', address: 'العنوان', hours: 'أوقات العمل', menu: 'القائمة' },
  en: { map: 'Open in Google Maps', formTitle: 'Send us a message', formName: 'Name', formPhone: 'Mobile number', formMessage: 'Your message', formSend: 'Send', chat: 'Chat on WhatsApp', gallery: 'Gallery', rights: 'All rights reserved', phone: 'Phone', whatsapp: 'WhatsApp', email: 'Email', address: 'Address', hours: 'Hours', menu: 'Menu' },
  de: { map: 'In Google Maps öffnen', formTitle: 'Schreiben Sie uns', formName: 'Name', formPhone: 'Telefonnummer', formMessage: 'Ihre Nachricht', formSend: 'Senden', chat: 'Auf WhatsApp schreiben', gallery: 'Galerie', rights: 'Alle Rechte vorbehalten', phone: 'Telefon', whatsapp: 'WhatsApp', email: 'E-Mail', address: 'Adresse', hours: 'Öffnungszeiten', menu: 'Menü' },
  fr: { map: 'Ouvrir dans Google Maps', formTitle: 'Écrivez-nous', formName: 'Nom', formPhone: 'Téléphone', formMessage: 'Votre message', formSend: 'Envoyer', chat: 'Écrire sur WhatsApp', gallery: 'Galerie', rights: 'Tous droits réservés', phone: 'Téléphone', whatsapp: 'WhatsApp', email: 'E-mail', address: 'Adresse', hours: 'Horaires', menu: 'Menu' },
  ru: { map: 'Открыть в Google Maps', formTitle: 'Напишите нам', formName: 'Имя', formPhone: 'Телефон', formMessage: 'Ваше сообщение', formSend: 'Отправить', chat: 'Написать в WhatsApp', gallery: 'Галерея', rights: 'Все права защищены', phone: 'Телефон', whatsapp: 'WhatsApp', email: 'Почта', address: 'Адрес', hours: 'Часы работы', menu: 'Меню' },
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
    case 'law':
      return `<svg class="art" viewBox="0 0 480 420" aria-hidden="true">
        <rect x="60" y="40" width="360" height="340" rx="28" fill="var(--soft)"/>
        <path d="M240 90 L380 150 L100 150 Z" fill="var(--p)"/>
        <rect x="120" y="165" width="26" height="140" rx="6" fill="var(--p)"/><rect x="190" y="165" width="26" height="140" rx="6" fill="var(--p)"/>
        <rect x="264" y="165" width="26" height="140" rx="6" fill="var(--p)"/><rect x="334" y="165" width="26" height="140" rx="6" fill="var(--p)"/>
        <rect x="96" y="312" width="288" height="22" rx="6" fill="var(--a)"/><circle cx="240" cy="128" r="10" fill="var(--a)"/>
      </svg>`;
    case 'realestate':
      return `<svg class="art" viewBox="0 0 480 420" aria-hidden="true">
        <rect x="40" y="370" width="400" height="10" rx="5" fill="var(--line)"/>
        <rect x="70" y="190" width="100" height="180" rx="10" fill="var(--soft)"/><rect x="180" y="90" width="120" height="280" rx="12" fill="var(--p)"/>
        <rect x="310" y="150" width="100" height="220" rx="10" fill="var(--soft)"/>
        <g fill="var(--on-p)" fill-opacity=".55"><rect x="202" y="120" width="28" height="22" rx="4"/><rect x="250" y="120" width="28" height="22" rx="4"/><rect x="202" y="162" width="28" height="22" rx="4"/><rect x="250" y="162" width="28" height="22" rx="4"/><rect x="202" y="204" width="28" height="22" rx="4"/><rect x="250" y="204" width="28" height="22" rx="4"/></g>
        <rect x="222" y="300" width="36" height="70" rx="6" fill="var(--a)"/>
        <circle cx="390" cy="80" r="34" fill="var(--a)"/><circle cx="390" cy="80" r="12" fill="var(--bg)"/><rect x="384" y="108" width="12" height="44" rx="4" fill="var(--a)"/>
      </svg>`;
    case 'beauty':
      return `<svg class="art" viewBox="0 0 480 420" aria-hidden="true">
        <circle cx="250" cy="210" r="170" fill="var(--soft-a)"/>
        <ellipse cx="250" cy="150" rx="46" ry="90" fill="var(--p)"/><ellipse cx="250" cy="150" rx="46" ry="90" fill="var(--p)" transform="rotate(60 250 220)"/>
        <ellipse cx="250" cy="150" rx="46" ry="90" fill="var(--a)" transform="rotate(-60 250 220)"/><circle cx="250" cy="220" r="26" fill="var(--bg)"/>
        <circle cx="96" cy="330" r="14" fill="var(--a)"/><circle cx="410" cy="90" r="9" fill="var(--p)"/>
      </svg>`;
    case 'construction':
      return `<svg class="art" viewBox="0 0 480 420" aria-hidden="true">
        <g stroke="var(--p)" stroke-width="5" fill="none"><path d="M150 370 V90 M182 370 V90 M150 330 L182 300 M150 290 L182 260 M150 250 L182 220 M150 210 L182 180 M150 170 L182 140 M150 130 L182 100"/></g>
        <path d="M120 90 L166 40 L212 90 Z" fill="var(--p)"/><rect x="40" y="86" width="380" height="14" rx="3" fill="var(--p)"/>
        <rect x="48" y="100" width="56" height="44" rx="6" fill="var(--a)"/><rect x="352" y="100" width="3" height="96" fill="var(--p)"/>
        <rect x="326" y="196" width="56" height="34" rx="5" fill="var(--a)"/>
        <rect x="236" y="262" width="184" height="108" rx="8" fill="var(--soft)"/><rect x="262" y="234" width="132" height="28" rx="6" fill="var(--a)"/>
        <g fill="var(--p)" fill-opacity=".8"><rect x="256" y="282" width="38" height="28" rx="4"/><rect x="310" y="282" width="38" height="28" rx="4"/><rect x="364" y="282" width="38" height="28" rx="4"/></g>
        <rect x="40" y="370" width="400" height="12" rx="6" fill="var(--a)"/>
      </svg>`;
    case 'education':
      return `<svg class="art" viewBox="0 0 480 420" aria-hidden="true">
        <circle cx="240" cy="220" r="170" fill="var(--soft)"/>
        <path d="M100 250 Q170 215 240 250 L240 360 Q170 325 100 360 Z" fill="var(--p)"/><path d="M380 250 Q310 215 240 250 L240 360 Q310 325 380 360 Z" fill="var(--a)"/>
        <path d="M240 70 L380 130 L240 190 L100 130 Z" fill="var(--p)"/><rect x="190" y="150" width="100" height="44" rx="10" fill="var(--p)"/>
        <rect x="364" y="132" width="8" height="70" rx="4" fill="var(--a)"/><circle cx="368" cy="208" r="12" fill="var(--a)"/>
      </svg>`;
    case 'fitness':
      return `<svg class="art" viewBox="0 0 480 420" aria-hidden="true">
        <rect x="120" y="190" width="240" height="36" rx="18" fill="#fff" fill-opacity=".9"/>
        <rect x="70" y="140" width="40" height="136" rx="12" fill="var(--a)"/><rect x="30" y="165" width="34" height="86" rx="10" fill="var(--a)" fill-opacity=".7"/>
        <rect x="370" y="140" width="40" height="136" rx="12" fill="var(--a)"/><rect x="416" y="165" width="34" height="86" rx="10" fill="var(--a)" fill-opacity=".7"/>
        <path d="M60 340 L170 300 L250 330 L420 270" stroke="var(--a)" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="420" cy="270" r="14" fill="#fff"/>
      </svg>`;
  }
  return '';
}

export interface RenderOptions {
  /** Absolute or relative URL of the folder with the font files. */
  fontBase: string;
  /** URL prefix for uploaded images; the image id is appended. Default '/_img/' (same origin as the site). */
  imageBase?: string;
  year?: number;
  /** Studio preview: mark editable texts with data-f="path" so they can be edited in place. */
  editable?: boolean;
  /** Published address of the site, for canonical and share tags. */
  siteUrl?: string;
  /** Where the contact form posts, and the id that tells the server which site it came from. */
  formAction?: string;
  siteId?: string;
}

export function renderSite(s: Spec, opt: RenderOptions): string {
  const t = s.template;
  const layout = layoutOf[t] ?? 'corporate';
  const ed = (path: string) => (opt.editable ? ` data-f="${path}"` : '');
  const rtl = s.lang === 'ar';
  const w = words[s.lang] ?? words.en;
  const f = fonts[s.font];
  const initial = (s.name.trim()[0] || 'O').toUpperCase();
  const tel = (v: string) => v.replace(/[^\d+]/g, '');
  const wa = (v: string) => `https://wa.me/${v.replace(/\D/g, '')}`;
  const has = (id: string) => s.sections.includes(id as never);
  const m = s.media ?? emptyMedia();
  const src = (id: string) => (imageIdPattern.test(id) ? esc((opt.imageBase ?? '/_img/') + id) : '');
  const mark = m.logo
    ? `<img class="logo-img" src="${src(m.logo)}" alt="${esc(s.name)}">`
    : `<span class="mark">${esc(initial)}</span>`;
  const heroVisual = m.hero
    ? `<div class="hero-photo"><img src="${src(m.hero)}" alt="" loading="eager"></div>`
    : art(t, initial);

  const nav = [
    has('about') && `<a href="#about">${esc(s.about.title)}</a>`,
    has('services') && `<a href="#services">${esc(s.services.title)}</a>`,
    has('contact') && `<a href="#contact">${esc(s.contact.title)}</a>`,
  ].filter(Boolean).join('');

  const sections: Record<string, string> = {
    about: `<section class="about" id="about"><div class="wrap about-in${m.about ? ' has-img' : ''}">
      <h2${ed('about.title')}>${esc(s.about.title)}</h2><p${ed('about.text')}>${esc(s.about.text)}</p>${m.about ? `<img class="about-img" src="${src(m.about)}" alt="" loading="lazy">` : ''}</div></section>`,
    gallery: m.gallery.length ? `<section class="gallery" id="gallery"><div class="wrap">
      <h2>${esc(m.galleryTitle || w.gallery)}</h2>
      <div class="gal">${m.gallery.map((id) => `<img src="${src(id)}" alt="" loading="lazy">`).join('')}</div></div></section>` : '',
    services: s.services.items.length ? `<section class="services" id="services"><div class="wrap">
      <h2${ed('services.title')}>${esc(s.services.title)}</h2>
      <div class="cards">${s.services.items.map((it, i) => `<article class="card">
        <span class="ic">${layout === 'personal' || layout === 'restaurant' ? String(i + 1).padStart(2, '0') : icon(i)}</span>
        <h3${ed(`services.items.${i}.title`)}>${esc(it.title)}</h3><p${ed(`services.items.${i}.text`)}>${esc(it.text)}</p></article>`).join('')}</div></div></section>` : '',
    testimonials: s.testimonials.items.length ? `<section class="quotes" id="testimonials"><div class="wrap">
      <h2${ed('testimonials.title')}>${esc(s.testimonials.title)}</h2>
      <div class="quotes-in">${s.testimonials.items.map((q, i) => `<figure class="quote">
        <blockquote${ed(`testimonials.items.${i}.quote`)}>${esc(q.quote)}</blockquote>
        <figcaption><b${ed(`testimonials.items.${i}.name`)}>${esc(q.name)}</b>${q.role ? `<span${ed(`testimonials.items.${i}.role`)}>${esc(q.role)}</span>` : ''}</figcaption></figure>`).join('')}</div></div></section>` : '',
    faq: s.faq.items.length ? `<section class="faq" id="faq"><div class="wrap faq-in">
      <h2${ed('faq.title')}>${esc(s.faq.title)}</h2>
      <div class="faq-list">${s.faq.items.map((x, i) => `<details${i === 0 ? ' open' : ''}><summary${ed(`faq.items.${i}.q`)}>${esc(x.q)}</summary><p${ed(`faq.items.${i}.a`)}>${esc(x.a)}</p></details>`).join('')}</div></div></section>` : '',
    stats: s.stats.length ? `<section class="stats"><div class="wrap stats-in">${s.stats.map((x, i) =>
      `<div><b${ed(`stats.${i}.value`)}>${esc(x.value)}</b><span${ed(`stats.${i}.label`)}>${esc(x.label)}</span></div>`).join('')}</div></section>` : '',
    cta: `<section class="cta"><div class="wrap"><div class="cta-in">
      <div><h2${ed('ctaBand.title')}>${esc(s.ctaBand.title)}</h2><p${ed('ctaBand.text')}>${esc(s.ctaBand.text)}</p></div>
      <a class="btn btn-a" href="#contact"><span${ed('ctaBand.button')}>${esc(s.ctaBand.button)}</span></a></div></div></section>`,
    contact: `<section class="contact" id="contact"><div class="wrap">
      <h2${ed('contact.title')}>${esc(s.contact.title)}</h2>
      <div class="contact-grid">
        ${s.contact.phone ? `<a href="tel:${esc(tel(s.contact.phone))}"><small>${w.phone}</small><span dir="ltr">${esc(s.contact.phone)}</span></a>` : ''}
        ${s.contact.whatsapp ? `<a href="${esc(wa(s.contact.whatsapp))}"><small>${w.whatsapp}</small><span dir="ltr">${esc(s.contact.whatsapp)}</span></a>` : ''}
        ${s.contact.email ? `<a href="mailto:${esc(s.contact.email)}"><small>${w.email}</small><span dir="ltr">${esc(s.contact.email)}</span></a>` : ''}
        ${s.contact.address ? `<div><small>${w.address}</small><span>${esc(s.contact.address)}</span></div>` : ''}
        ${s.contact.hours ? `<div><small>${w.hours}</small><span>${esc(s.contact.hours)}</span></div>` : ''}
        ${s.extras.mapUrl ? `<a href="${esc(s.extras.mapUrl)}" rel="noopener" target="_blank"><small>${w.address}</small><span>${w.map} ↗</span></a>` : ''}
      </div>
      ${s.extras.contactForm ? `<form class="cform" method="post" action="${esc(opt.formAction || '#')}">
        <h3>${w.formTitle}</h3>
        <input type="hidden" name="site" value="${esc(opt.siteId || '')}">
        <input type="hidden" name="lang" value="${s.lang}">
        <label>${w.formName}<input name="name" required maxlength="120"></label>
        <label>${w.formPhone}<input name="phone" type="tel" dir="ltr" required maxlength="30"></label>
        <label class="wide">${w.formMessage}<textarea name="message" rows="4" required maxlength="2000"></textarea></label>
        <input class="hp" name="company_website" tabindex="-1" autocomplete="off" aria-hidden="true">
        <button class="btn btn-p" type="submit">${w.formSend}</button>
      </form>` : ''}
      </div></section>`,
  };

  const body = `
<header class="top"><div class="wrap top-in">
  <a class="brand" href="#">${mark}<span${ed('name')}>${esc(s.name)}</span></a>
  <nav>${nav}</nav>
  <a class="btn btn-p small" href="#contact">${esc(s.hero.cta)}</a>
</div></header>
<section class="hero"><div class="wrap hero-in">
  <div class="hero-copy">
    <p class="eyebrow"${ed('tagline')}>${esc(s.tagline)}</p>
    <h1${ed('hero.title')}>${esc(s.hero.title)}</h1>
    <p class="sub"${ed('hero.subtitle')}>${esc(s.hero.subtitle)}</p>
    <div class="actions"><a class="btn btn-a" href="#contact"><span${ed('hero.cta')}>${esc(s.hero.cta)}</span></a>${has('services') ? `<a class="btn btn-ghost" href="#services">${esc(s.services.title)}</a>` : ''}</div>
  </div>
  <div class="hero-art">${heroVisual}</div>
</div></section>
${s.sections.map((id) => sections[id] ?? '').join('\n')}
${s.extras.whatsappButton && s.contact.whatsapp ? `<a class="wa-float" href="${esc(wa(s.contact.whatsapp))}" target="_blank" rel="noopener" aria-label="${w.chat}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" fill="#fff"/><path d="M9.2 7.8c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.6 1 1.4 1.8 2.5 2.4.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.4.2.4.4 0 .6-.3 1.4-1.1 1.8-.7.3-1.6.4-3.4-.4-2.1-1-3.6-3.1-3.8-3.4-.3-.4-.9-1.3-.9-2.4 0-1 .5-1.5.7-1.7z" fill="#25D366"/></svg></a>` : ''}
<footer class="foot"><div class="wrap foot-in"><span class="brand">${mark}<span>${esc(s.name)}</span></span><small>© ${opt.year ?? new Date().getFullYear()} ${esc(s.name)}. ${w.rights}.</small></div></footer>`;

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
.logo-img{height:40px;width:auto;max-width:150px;object-fit:contain;display:block}.foot .logo-img{height:32px}
.hero-photo{border-radius:calc(var(--r) * 1.5);overflow:hidden;aspect-ratio:4/3;box-shadow:0 30px 60px -30px rgba(0,0,0,.45)}.hero-photo img{width:100%;height:100%;object-fit:cover;display:block}
.about-in.has-img{grid-template-columns:1fr 1.3fr 1fr;align-items:center}.about-img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:var(--r);display:block}
.quotes{padding:88px 0;background:var(--soft)}.quotes-in{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px}
.quote{margin:0;padding:28px;border-radius:var(--r);background:var(--card,#fff);border:1px solid var(--line);display:grid;gap:18px;align-content:space-between}
.quote blockquote{margin:0;font-size:1.08rem;line-height:1.75}.quote blockquote::before{content:'“';display:block;font-family:var(--head);font-size:3rem;line-height:.6;color:var(--a);margin-bottom:10px}
.quote figcaption{display:grid}.quote figcaption span{color:var(--muted);font-size:.92rem}
.faq{padding:88px 0}.faq-in{display:grid;grid-template-columns:1fr 2fr;gap:40px;align-items:start}.faq-in h2{margin:0}
.faq-list{display:grid;gap:10px}.faq details{border:1px solid var(--line);border-radius:var(--r);background:var(--card,#fff)}
.faq summary{cursor:pointer;padding:18px 22px;font-weight:700;list-style:none;display:flex;justify-content:space-between;gap:16px}.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:'+';color:var(--p);font-size:1.3rem;line-height:1}.faq details[open] summary::after{content:'−'}.faq details p{padding:0 22px 18px;color:var(--muted)}
.cform{margin-top:20px;display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:28px;border-radius:var(--r);border:1px solid var(--line);background:var(--card,#fff)}
.cform h3{grid-column:1/-1;font-size:1.25rem}.cform label{display:grid;gap:6px;font-weight:600;font-size:.92rem}.cform .wide{grid-column:1/-1}
.cform input,.cform textarea{font:inherit;color:var(--ink);background:var(--bg);border:1.5px solid var(--line);border-radius:10px;padding:12px 14px;width:100%}
.cform input:focus,.cform textarea:focus{outline:none;border-color:var(--p)}.cform .btn{justify-self:start;cursor:pointer}.cform .hp{position:absolute;width:1px;height:1px;opacity:0;overflow:hidden;clip:rect(0 0 0 0)}
.wa-float{position:fixed;bottom:22px;inset-inline-end:22px;width:58px;height:58px;border-radius:50%;background:#25D366;display:grid;place-items:center;box-shadow:0 12px 28px -8px rgba(0,0,0,.4);z-index:20}.wa-float svg{width:30px;height:30px}
.tt-law h1,.tt-law h2{letter-spacing:0}.tt-law .eyebrow{color:var(--a);text-transform:uppercase;letter-spacing:.08em}
.tt-construction .btn{border-radius:6px}.tt-construction .card{border-top:4px solid var(--a)}
.tt-beauty{--bg:#FFF9FB}.tt-beauty .btn{border-radius:999px}
.tt-education .card{border-top:4px solid var(--p)}
.tt-fitness h1{text-transform:uppercase;letter-spacing:.02em}.tt-fitness .btn{border-radius:6px}
.gallery{padding:88px 0}.gal{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.gal img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:var(--r);display:block}
.t-personal .hero-photo{width:220px;aspect-ratio:1;border-radius:50%;box-shadow:0 0 0 10px var(--soft-a)}
.t-restaurant .hero-photo{border-radius:999px 999px 0 0;aspect-ratio:4/5;max-width:420px;margin-inline-start:auto;box-shadow:none}
.t-restaurant .about-in.has-img{grid-template-columns:1fr;max-width:46rem}.t-restaurant .about-img{aspect-ratio:16/9}
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
  .hero-art{max-width:420px}.faq-in{grid-template-columns:1fr}.cform{grid-template-columns:1fr}.quotes,.faq{padding:64px 0}.about-in.has-img{grid-template-columns:1fr}.gal{grid-template-columns:1fr 1fr}.gallery{padding:64px 0}.t-restaurant .hero-copy{padding-bottom:0}.t-restaurant .cards{grid-template-columns:1fr}
  .t-personal .card{grid-template-columns:48px 1fr;}.t-personal .card p{grid-column:2}.cta-in{padding:32px}
  .services,.about,.cta{padding:64px 0}
}
@media (max-width:560px){.top .btn{display:none}.brand{font-size:1.05rem}h1{font-size:2.2rem}.wrap{padding:0 20px}}`;

  const title = `${s.name}${s.tagline ? ' | ' + s.tagline : ''}`;
  const abs = (id: string) => (opt.siteUrl && id ? new URL((opt.imageBase ?? '/_img/') + id, opt.siteUrl).href : '');
  const shareImg = abs(m.hero || m.about || m.gallery[0] || '');
  const favicon = m.logo
    ? src(m.logo)
    : `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${p}"/><text x="32" y="44" font-size="34" text-anchor="middle" fill="${onColor(p)}" font-family="Arial,sans-serif" font-weight="700">${initial.replace(/[<&"]/g, '')}</text></svg>`)}`;
  const ld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: s.name,
    description: s.hero.subtitle,
    ...(opt.siteUrl ? { url: opt.siteUrl } : {}),
    ...(s.contact.phone ? { telephone: s.contact.phone } : {}),
    ...(s.contact.email ? { email: s.contact.email } : {}),
    ...(s.contact.address ? { address: s.contact.address } : {}),
    ...(shareImg ? { image: shareImg } : {}),
    ...(m.logo && opt.siteUrl ? { logo: abs(m.logo) } : {}),
  }).replace(/</g, '\\u003c');
  return `<!doctype html><html lang="${s.lang}" dir="${rtl ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(s.hero.subtitle)}">
<meta name="theme-color" content="${p}"><link rel="icon" href="${esc(favicon)}">
${opt.siteUrl ? `<link rel="canonical" href="${esc(opt.siteUrl)}"><meta property="og:url" content="${esc(opt.siteUrl)}">` : ''}
<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(s.hero.subtitle)}"><meta property="og:site_name" content="${esc(s.name)}">
${shareImg ? `<meta property="og:image" content="${esc(shareImg)}"><meta name="twitter:card" content="summary_large_image">` : '<meta name="twitter:card" content="summary">'}
<script type="application/ld+json">${ld}</script>
<style>${css}${s.colors.background ? backgroundCss(s.colors.background) : ''}</style></head><body class="t-${layout} tt-${t}${s.colors.background ? ' has-bg' : ''}">${body}</body></html>`;
}
