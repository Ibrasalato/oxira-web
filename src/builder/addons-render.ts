// Extra pages of a client site that come with paid add-ons: phone menu (/menu), review page (/review),
// AI chat (/chat) and event tickets (/ticket/<code>). Same look as the site, no external scripts.
import qrcode from 'qrcode-generator';
import { esc, onColor, fonts, fontCss } from './render';
import type { Spec, SiteLang } from './spec';

type PW = { back: string; menu: string; howWas: string; rateBody: string; comment: string; yourName: string; send: string; chatTitle: string; chatHello: string; chatPh: string; chatError: string; ticket: string; ticketFor: string; qty: string; code: string; paid: string; used: string; pending: string; show: string; suspendedTitle: string; suspendedBody: string; poweredBy: string };
const pw: Record<SiteLang, PW> = {
  ar: { back: 'العودة للموقع', menu: 'القائمة', howWas: 'كيف كانت تجربتك؟', rateBody: 'رأيك يهمنا ويساعدنا نقدّم الأفضل.', comment: 'أخبرنا أكثر (اختياري)', yourName: 'اسمك (اختياري)', send: 'إرسال', chatTitle: 'اسأل', chatHello: 'أهلاً بك! كيف أقدر أساعدك؟', chatPh: 'اكتب سؤالك…', chatError: 'تعذر الرد الآن. تواصل معنا عبر الهاتف أو واتساب.', ticket: 'تذكرة', ticketFor: 'باسم', qty: 'العدد', code: 'رمز التذكرة', paid: 'تذكرة صالحة', used: 'تم استخدامها', pending: 'بانتظار الدفع', show: 'اعرض رمز QR عند الدخول.', suspendedTitle: 'الموقع متوقف مؤقتاً', suspendedBody: 'سيعود الموقع قريباً.', poweredBy: 'صُمم مع أوكسيرا' },
  en: { back: 'Back to the website', menu: 'Menu', howWas: 'How was your visit?', rateBody: 'Your opinion helps us do better.', comment: 'Tell us more (optional)', yourName: 'Your name (optional)', send: 'Send', chatTitle: 'Ask', chatHello: 'Hello! How can I help you?', chatPh: 'Type your question…', chatError: 'We could not reply right now. Please call or message us on WhatsApp.', ticket: 'Ticket', ticketFor: 'Name', qty: 'Quantity', code: 'Ticket code', paid: 'Valid ticket', used: 'Already used', pending: 'Awaiting payment', show: 'Show this QR code at the entrance.', suspendedTitle: 'This website is temporarily unavailable', suspendedBody: 'It will be back soon.', poweredBy: 'Made with Oxira' },
  de: { back: 'Zur Website', menu: 'Menü', howWas: 'Wie war Ihr Besuch?', rateBody: 'Ihre Meinung hilft uns, besser zu werden.', comment: 'Mehr erzählen (optional)', yourName: 'Ihr Name (optional)', send: 'Senden', chatTitle: 'Fragen an', chatHello: 'Hallo! Wie kann ich helfen?', chatPh: 'Ihre Frage…', chatError: 'Gerade keine Antwort möglich. Bitte rufen Sie an oder schreiben Sie per WhatsApp.', ticket: 'Ticket', ticketFor: 'Name', qty: 'Anzahl', code: 'Ticketcode', paid: 'Gültiges Ticket', used: 'Bereits verwendet', pending: 'Zahlung ausstehend', show: 'Zeigen Sie diesen QR-Code am Eingang.', suspendedTitle: 'Website vorübergehend nicht verfügbar', suspendedBody: 'Sie ist bald wieder da.', poweredBy: 'Erstellt mit Oxira' },
  fr: { back: 'Retour au site', menu: 'Menu', howWas: 'Comment s’est passée votre visite ?', rateBody: 'Votre avis nous aide à progresser.', comment: 'Dites-nous en plus (facultatif)', yourName: 'Votre nom (facultatif)', send: 'Envoyer', chatTitle: 'Demander à', chatHello: 'Bonjour ! Comment puis-je vous aider ?', chatPh: 'Votre question…', chatError: 'Réponse impossible pour le moment. Appelez-nous ou écrivez sur WhatsApp.', ticket: 'Billet', ticketFor: 'Nom', qty: 'Quantité', code: 'Code du billet', paid: 'Billet valide', used: 'Déjà utilisé', pending: 'Paiement en attente', show: 'Présentez ce QR code à l’entrée.', suspendedTitle: 'Site temporairement indisponible', suspendedBody: 'Il sera bientôt de retour.', poweredBy: 'Réalisé avec Oxira' },
  ru: { back: 'Вернуться на сайт', menu: 'Меню', howWas: 'Как прошёл ваш визит?', rateBody: 'Ваше мнение помогает нам стать лучше.', comment: 'Расскажите подробнее (необязательно)', yourName: 'Ваше имя (необязательно)', send: 'Отправить', chatTitle: 'Спросить', chatHello: 'Здравствуйте! Чем помочь?', chatPh: 'Ваш вопрос…', chatError: 'Сейчас не можем ответить. Позвоните или напишите в WhatsApp.', ticket: 'Билет', ticketFor: 'Имя', qty: 'Количество', code: 'Код билета', paid: 'Билет действителен', used: 'Уже использован', pending: 'Ожидает оплаты', show: 'Покажите QR-код на входе.', suspendedTitle: 'Сайт временно недоступен', suspendedBody: 'Скоро он снова заработает.', poweredBy: 'Сделано в Oxira' },
};

interface PageOpts { fontBase: string; base: string; imageBase?: string; nonce?: string }

function shell(s: Spec, o: PageOpts, title: string, body: string, css = '', script = '') {
  const p = s.colors.primary, a = s.colors.accent, f = fonts[s.font];
  const rtl = s.lang === 'ar';
  return `<!doctype html><html lang="${s.lang}" dir="${rtl ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>${esc(title)}</title><meta name="theme-color" content="${p}">
<style>${fontCss(s.font, o.fontBase)}
:root{--p:${p};--a:${a};--on-p:${onColor(p)};--on-a:${onColor(a)};--ink:#14171C;--muted:#5B6472;--line:#E5E7EB;--bg:#F7F8FA;--soft:color-mix(in srgb,var(--p) 8%,#fff)}
*{box-sizing:border-box}body{margin:0;font-family:${f.body};color:var(--ink);background:var(--bg);line-height:1.6;-webkit-font-smoothing:antialiased}h1,h2,h3{font-family:${f.head};margin:0;line-height:1.3}p{margin:0}a{color:inherit}
.bar{position:sticky;top:0;z-index:5;background:var(--p);color:var(--on-p);padding:14px 18px;display:flex;align-items:center;gap:12px}.bar h1{font-size:1.1rem;flex:1}.bar a{font-size:.88rem;opacity:.85;text-decoration:none}
.box{max-width:640px;margin:0 auto;padding:20px 16px 48px}.btn{display:inline-flex;justify-content:center;align-items:center;padding:13px 22px;border-radius:12px;border:0;font:700 1rem ${f.body};background:var(--p);color:var(--on-p);cursor:pointer;text-decoration:none}
.foot{text-align:center;color:var(--muted);font-size:.8rem;padding:24px 0}${css}</style></head>
<body>${body}</body>${script ? `<script nonce="${o.nonce ?? ''}">${script}</script>` : ''}</html>`;
}

/** Phone-friendly menu for QR codes on tables. */
export function renderMenuPage(s: Spec, o: PageOpts) {
  const w = pw[s.lang] ?? pw.en;
  const cats = s.menu?.categories ?? [];
  const body = `<header class="bar"><h1>${esc(s.name)}</h1><a href="${o.base}/">${w.back}</a></header>
<nav class="tabs">${cats.map((c, i) => `<a href="#c${i}">${esc(c.name)}</a>`).join('')}</nav>
<main class="box">${s.menu?.note ? `<p class="note">${esc(s.menu.note)}</p>` : ''}${cats.map((c, i) => `<section id="c${i}"><h2>${esc(c.name)}</h2>${c.items.map((it) => `<div class="item"><div><b>${esc(it.name)}</b>${it.desc ? `<small>${esc(it.desc)}</small>` : ''}</div>${it.price ? `<span>${esc(it.price)}</span>` : ''}</div>`).join('')}</section>`).join('')}
<p class="foot">${w.poweredBy}</p></main>`;
  const css = `.tabs{position:sticky;top:52px;z-index:4;display:flex;gap:8px;overflow-x:auto;padding:10px 16px;background:#fff;border-bottom:1px solid var(--line);scrollbar-width:none}.tabs a{flex:none;padding:7px 14px;border-radius:999px;background:var(--soft);color:var(--p);font-weight:700;font-size:.9rem;text-decoration:none}
section{scroll-margin-top:110px;margin-top:22px}section h2{font-size:1.2rem;color:var(--p);margin-bottom:8px}.note{color:var(--muted);font-size:.9rem}
.item{display:flex;justify-content:space-between;gap:14px;padding:14px;background:#fff;border-radius:14px;margin-bottom:8px;box-shadow:0 1px 0 var(--line)}.item div{display:grid}.item small{color:var(--muted)}.item span{font-weight:700;color:var(--p);white-space:nowrap}`;
  return shell(s, o, `${s.menu?.title || w.menu} | ${s.name}`, body, css);
}

/** Review page: happy guests are sent on to Google, others reach the owner privately. */
export function renderReviewPage(s: Spec, o: PageOpts, action: string, siteId: string) {
  const w = pw[s.lang] ?? pw.en;
  const stars = [5, 4, 3, 2, 1].map((n) => `<input type="radio" name="rating" id="r${n}" value="${n}" required><label for="r${n}" title="${n}">★</label>`).join('');
  const body = `<header class="bar"><h1>${esc(s.name)}</h1><a href="${o.base}/">${w.back}</a></header>
<main class="box"><form class="card" method="post" action="${esc(action)}">
<h2>${w.howWas}</h2><p class="muted">${w.rateBody}</p>
<div class="stars" dir="ltr">${stars}</div>
<input type="hidden" name="site" value="${esc(siteId)}"><input type="hidden" name="lang" value="${s.lang}">
<label>${w.comment}<textarea name="comment" rows="4" maxlength="1500"></textarea></label>
<label>${w.yourName}<input name="name" maxlength="80"></label>
<input class="hp" name="company_website" tabindex="-1" autocomplete="off" aria-hidden="true">
<button class="btn" type="submit">${w.send}</button></form><p class="foot">${w.poweredBy}</p></main>`;
  const css = `.card{display:grid;gap:14px;background:#fff;border-radius:18px;padding:24px;margin-top:12px;box-shadow:0 10px 30px -20px rgba(0,0,0,.35)}.muted{color:var(--muted)}
.stars{display:flex;flex-direction:row-reverse;justify-content:center;gap:6px}.stars input{position:absolute;opacity:0;width:1px;height:1px}.stars label{font-size:2.6rem;color:#D5D9DF;cursor:pointer;line-height:1}
.stars input:checked~label,.stars label:hover,.stars label:hover~label{color:#F5B301}.stars input:focus-visible+label{outline:2px solid var(--p);border-radius:6px}
label{display:grid;gap:6px;font-weight:600;font-size:.92rem}textarea,input{font:inherit;border:1.5px solid var(--line);border-radius:10px;padding:12px;width:100%}.hp{position:absolute;opacity:0;width:1px;height:1px;overflow:hidden}`;
  return shell(s, o, `${w.howWas} | ${s.name}`, body, css);
}

/** AI assistant that answers from the site's own content. Talks to ${base}/api/chat on the same origin. */
export function renderChatPage(s: Spec, o: PageOpts) {
  const w = pw[s.lang] ?? pw.en;
  const body = `<header class="bar"><h1>${w.chatTitle} ${esc(s.name)}</h1><a href="${o.base}/">${w.back}</a></header>
<main class="chat"><div id="log" class="log" aria-live="polite"><p class="m ai">${w.chatHello}</p></div>
<form id="f" class="ask"><textarea id="q" rows="1" maxlength="1000" placeholder="${w.chatPh}" dir="auto" required></textarea><button class="btn" type="submit" aria-label="${w.send}">➤</button></form></main>`;
  const css = `body{display:flex;flex-direction:column;height:100dvh}.chat{flex:1;display:flex;flex-direction:column;max-width:720px;width:100%;margin:0 auto;min-height:0}
.log{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}.m{max-width:85%;padding:10px 14px;border-radius:16px;white-space:pre-line}.ai{background:#fff;align-self:flex-start;box-shadow:0 1px 0 var(--line)}.me{background:var(--p);color:var(--on-p);align-self:flex-end}.typing{opacity:.6}
.ask{display:flex;gap:8px;padding:12px;background:#fff;border-top:1px solid var(--line)}.ask textarea{flex:1;font:inherit;border:1.5px solid var(--line);border-radius:12px;padding:10px 12px;resize:none}.ask .btn{padding:0 18px}html[dir=rtl] .ask .btn{transform:scaleX(-1)}`;
  const script = `(()=>{const log=document.getElementById('log'),f=document.getElementById('f'),q=document.getElementById('q');let sid='';try{sid=sessionStorage.getItem('oxchat')||'';}catch(e){}if(!sid){sid=Math.random().toString(36).slice(2)+Date.now().toString(36);try{sessionStorage.setItem('oxchat',sid);}catch(e){}}
const add=(t,c)=>{const p=document.createElement('p');p.className='m '+c;p.dir='auto';p.textContent=t;log.append(p);log.scrollTop=log.scrollHeight;return p;};
q.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();f.requestSubmit();}});
f.addEventListener('submit',async e=>{e.preventDefault();const t=q.value.trim();if(!t)return;q.value='';add(t,'me');const wait=add('…','ai typing');
try{const r=await fetch(${JSON.stringify(o.base + '/api/chat')},{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({sessionId:sid,message:t})});const d=await r.json();wait.remove();add(d&&d.reply?d.reply:${JSON.stringify(w.chatError)},'ai');}catch(err){wait.remove();add(${JSON.stringify(w.chatError)},'ai');}});})();`;
  return shell(s, o, `${w.chatTitle} ${s.name}`, body, css, script);
}

export interface TicketData { code: string; type: string; name: string; qty: number; status: 'paid' | 'used' | 'pending'; event?: string }

/** A QR code as an SVG string. */
export function qrSvg(text: string, size = 240) {
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();
  const n = qr.getModuleCount();
  let d = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c + 4} ${r + 4}h1v1h-1z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n + 8} ${n + 8}" width="${size}" height="${size}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="${d}" fill="#000"/></svg>`;
}

export function renderTicketPage(s: Spec, o: PageOpts, t: TicketData) {
  const w = pw[s.lang] ?? pw.en;
  const state = t.status === 'paid' ? w.paid : t.status === 'used' ? w.used : w.pending;
  const body = `<header class="bar"><h1>${esc(s.name)}</h1><a href="${o.base}/">${w.back}</a></header>
<main class="box"><div class="tk"><p class="kind">${w.ticket} · ${esc(t.type)}</p><h2>${esc(t.event || s.hero.title)}</h2>
<div class="qr">${t.status === 'pending' ? '' : qrSvg(t.code)}</div>
<p class="state s-${t.status}">${state}</p>
<dl><dt>${w.ticketFor}</dt><dd>${esc(t.name)}</dd><dt>${w.qty}</dt><dd>${t.qty}</dd><dt>${w.code}</dt><dd dir="ltr">${esc(t.code)}</dd></dl>
<p class="muted">${w.show}</p></div><p class="foot">${w.poweredBy}</p></main>`;
  const css = `.tk{background:#fff;border-radius:20px;padding:24px;text-align:center;box-shadow:0 10px 30px -20px rgba(0,0,0,.35);margin-top:12px;display:grid;gap:12px;justify-items:center}.kind{color:var(--p);font-weight:700}
.qr svg{width:240px;height:240px;display:block}.state{font-weight:700;padding:6px 14px;border-radius:999px}.s-paid{background:#E7F6EC;color:#1E8E4E}.s-used{background:#FEF3F2;color:#B42318}.s-pending{background:#FFF4E5;color:#B54708}
dl{display:grid;grid-template-columns:auto 1fr;gap:6px 14px;text-align:start;margin:0}dt{color:var(--muted)}dd{margin:0;font-weight:700}.muted{color:var(--muted);font-size:.9rem}`;
  return shell(s, o, `${w.ticket} | ${s.name}`, body, css);
}

export function renderSuspendedPage(lang: SiteLang) {
  const w = pw[lang] ?? pw.ar;
  return `<!doctype html><html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${w.suspendedTitle}</title><body style="font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;background:#F5F7F9;color:#0A253E;text-align:center"><div style="padding:24px"><h1 style="margin:0 0 8px;font-size:1.5rem">${w.suspendedTitle}</h1><p style="margin:0;color:#556779">${w.suspendedBody}</p></div></body></html>`;
}
