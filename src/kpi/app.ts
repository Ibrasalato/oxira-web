// Oxira KPI web app (vanilla TS). Talks to n8n "KPI 1 — API" through oxFetch (form field p = JSON).
import { oxFetch } from '../lib/api';

type Any = any;
type Cfg = { lang: 'ar' | 'en'; api: string; t: Any; lib: Any[]; links: { book: string; contact: string; home: string; product: string } };

const TOKEN_KEY = 'oxkpi-token';
const store = {
  get: () => { try { return localStorage.getItem(TOKEN_KEY) || ''; } catch { return ''; } },
  set: (v: string) => { try { v ? localStorage.setItem(TOKEN_KEY, v) : localStorage.removeItem(TOKEN_KEY); } catch { /* blocked */ } },
};
const h = (s: unknown) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function boot(root: HTMLElement) {
  const C: Cfg = JSON.parse(root.dataset.cfg!);
  const T = C.t;
  const ar = C.lang === 'ar';
  const nf = new Intl.NumberFormat(ar ? 'ar-SA-u-nu-latn' : 'en-US', { maximumFractionDigits: 1 });
  const fmt = (n: Any) => (n == null || n === '' || isNaN(+n) ? '—' : nf.format(+n));
  const S: Any = { token: store.get(), me: null, tenant: null, period: null, history: {}, view: '', busy: false, filter: { q: '', dept: '', status: '' }, auth: { step: 'email', email: '', choose: null, tab: 'in' } };

  // ───────── API ─────────
  async function api(action: string, data: Any = {}, retry = true): Promise<Any> {
    const body = new URLSearchParams();
    const base: Any = { action, token: S.token, lang: C.lang };
    // Mutations load the current period too, so open periods pick up new employees and KPIs.
    if (S.period && S.period.status !== 'none' && data.period === undefined && action !== 'load') base.period = S.period.key;
    body.set('p', JSON.stringify(Object.assign(base, data)));
    let out: Any;
    try {
      const res = await oxFetch(C.api, { method: 'POST', body });
      out = await res.json();
    } catch { out = { success: false, reason: 'network' }; }
    if (out && out.success === false && out.reason === 'conflict' && retry) return api(action, data, false);
    if (out && out.success === false && out.reason === 'session' && action !== 'login_verify') { S.token = ''; store.set(''); toast(T.errors.session, true); render(); }
    return out || { success: false, reason: 'network' };
  }
  const errText = (r: Any) => (r && T.errors[r.reason]) || T.errors.network;

  // ───────── UI helpers ─────────
  let toastTimer = 0;
  function toast(msg: string, bad = false) {
    let el = document.getElementById('kx-toast');
    if (!el) { el = document.createElement('div'); el.id = 'kx-toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.textContent = msg; el.className = 'kx-toast show' + (bad ? ' bad' : '');
    clearTimeout(toastTimer); toastTimer = window.setTimeout(() => el!.classList.remove('show'), 3500);
  }
  function busy(btn: HTMLButtonElement | null, on: boolean) { if (!btn) return; btn.disabled = on; btn.classList.toggle('is-busy', on); }
  const scoreClass = (v: Any) => (v == null ? '' : v >= 90 ? 's-hi' : v >= 70 ? 's-mid' : 's-lo');
  const pill = (st: string) => `<span class="kx-pill st-${h(st)}">${h(T.status[st] || st)}</span>`;
  const byId = (list: Any[], id: string) => (list || []).find((x: Any) => x.id === id);
  const isAdmin = () => S.me && (S.me.role === 'admin' || S.me.role === 'hr');
  const isMgr = () => S.me && (isAdmin() || S.me.role === 'manager');
  const writable = () => S.tenant && ['trial', 'active'].includes(S.tenant.plan.state);
  const periodLabel = (k: string) => {
    if (!k) return '';
    const q = /^(\d{4})-Q([1-4])$/.exec(k);
    if (q) return `${T.quarter}${q[2]} ${q[1]}`;
    const m = /^(\d{4})-(\d{2})$/.exec(k);
    return m ? `${T.months[+m[2] - 1]} ${m[1]}` : k;
  };

  function modal(html: string, wide = false): HTMLDialogElement {
    const d = document.createElement('dialog');
    d.className = 'kx-modal' + (wide ? ' wide' : '');
    d.innerHTML = `<button class="kx-x" type="button" aria-label="${h(T.entry.close)}">×</button>${html}`;
    document.body.appendChild(d);
    d.querySelector('.kx-x')!.addEventListener('click', () => d.close());
    d.addEventListener('close', () => d.remove());
    d.addEventListener('click', (e) => { if (e.target === d) d.close(); });
    d.showModal();
    return d;
  }

  // CSV: tolerant parser (comma, semicolon or tab; quotes; BOM) and Excel-friendly export.
  function parseCsv(text: string): string[][] {
    text = text.replace(/^﻿/, '');
    const first = text.split(/\r?\n/)[0] || '';
    const sep = (first.match(/;/g) || []).length > (first.match(/,/g) || []).length ? ';' : first.includes('\t') ? '\t' : ',';
    const rows: string[][] = []; let row: string[] = []; let cur = ''; let q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) { if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
      else if (c === '"') q = true;
      else if (c === sep) { row.push(cur); cur = ''; }
      else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cur); rows.push(row); row = []; cur = ''; }
      else cur += c;
    }
    if (cur || row.length) { row.push(cur); rows.push(row); }
    return rows.filter((r) => r.some((x) => x.trim()));
  }
  function downloadCsv(name: string, rows: Any[][]) {
    const csv = '﻿' + rows.map((r) => r.map((v) => { const s = String(v == null ? '' : v); return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; }).join(',')).join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function pickFile(cb: (text: string) => void) {
    const inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.csv,text/csv,.txt';
    inp.addEventListener('change', () => { const f = inp.files && inp.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => cb(String(r.result || '')); r.readAsText(f, 'utf-8'); });
    inp.click();
  }

  // ───────── data ─────────
  function apply(r: Any) {
    if (r.tenant) S.tenant = r.tenant;
    if (r.period) S.period = r.period;
    if (r.me) S.me = r.me;
    if (r.history) S.history = r.history;
  }
  async function load(period?: string) {
    const r = await api('load', period ? { period } : {});
    if (!r.success) { if (r.reason !== 'session') root.innerHTML = `<div class="kx-center"><p>${h(errText(r))}</p><button class="btn btn-navy" type="button" id="kx-retry">${h(T.loading.replace('…', ''))} ↻</button></div>`; document.getElementById('kx-retry')?.addEventListener('click', () => load(period)); return false; }
    apply(r);
    if (!S.view) S.view = isMgr() ? 'dash' : 'me';
    render();
    return true;
  }

  // ───────── auth screens ─────────
  function renderAuth() {
    const A = S.auth;
    const tabs = `<div class="kx-tabs" role="tablist"><button type="button" role="tab" aria-selected="${A.tab === 'in'}" data-tab="in">${h(T.signIn)}</button><button type="button" role="tab" aria-selected="${A.tab === 'up'}" data-tab="up">${h(T.startTrial)}</button></div>`;
    let body = '';
    if (A.tab === 'up') {
      body = `<form class="kx-form" id="kx-signup">
        <label>${h(T.company)}<input name="company" required maxlength="120" autocomplete="organization"></label>
        <label>${h(T.yourName)}<input name="name" required maxlength="80" autocomplete="name"></label>
        <label>${h(T.email)}<input name="email" type="email" required dir="ltr" autocomplete="email"></label>
        <label>${h(T.phone)}<input name="phone" type="tel" required dir="ltr" placeholder="+966 5x xxx xxxx" autocomplete="tel"></label>
        <div class="kx-row2"><label>${h(T.sector)}<input name="sector" maxlength="80"></label>
        <label>${h(T.size)}<select name="size"><option>1-10</option><option selected>11-50</option><option>51-200</option><option>201-500</option><option>500+</option></select></label></div>
        <button class="btn btn-amber" type="submit">${h(T.createAccount)}</button>
        <p class="kx-muted">${h(T.trialNote)}</p></form>`;
    } else if (A.step === 'email') {
      body = `<form class="kx-form" id="kx-email"><label>${h(T.email)}<input name="email" type="email" required dir="ltr" autocomplete="email" value="${h(A.email)}"></label><button class="btn btn-navy" type="submit">${h(T.sendCode)}</button></form>`;
    } else if (A.step === 'code') {
      body = `<form class="kx-form" id="kx-code"><p class="kx-muted">${h(T.codeSent)}</p><p dir="ltr" class="kx-email">${h(A.email)}</p>
        <label>${h(T.code)}<input name="code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" required dir="ltr" class="kx-code"></label>
        <button class="btn btn-navy" type="submit">${h(T.verify)}</button><button class="kx-link" type="button" id="kx-back">${h(T.changeEmail)}</button></form>`;
    } else if (A.step === 'choose') {
      body = `<div class="kx-form"><p>${h(T.chooseCompany)}</p>${A.choose.map((c: Any) => `<button class="btn btn-ghost kx-choose" type="button" data-t="${h(c.tenant_id)}">${h(c.company)}</button>`).join('')}</div>`;
    }
    root.innerHTML = `<div class="kx-auth"><div class="kx-auth-card"><p class="kx-logo">${h(T.brand)}</p><p class="kx-auth-lead">${h(T.authLead)}</p>${tabs}${body}<p class="kx-err" id="kx-err" role="alert"></p></div></div>`;
    const err = (m: string) => { const e = document.getElementById('kx-err'); if (e) e.textContent = m; };
    root.querySelectorAll<HTMLButtonElement>('[data-tab]').forEach((b) => b.addEventListener('click', () => { A.tab = b.dataset.tab; A.step = 'email'; renderAuth(); }));
    document.getElementById('kx-email')?.addEventListener('submit', async (e) => {
      e.preventDefault(); const f = e.target as HTMLFormElement; const btn = f.querySelector('button') as HTMLButtonElement;
      A.email = String(new FormData(f).get('email') || '').trim().toLowerCase();
      busy(btn, true); const r = await api('login_start', { email: A.email }); busy(btn, false);
      if (!r.success) return err(errText(r));
      A.step = 'code'; renderAuth(); (root.querySelector('.kx-code') as HTMLInputElement)?.focus();
    });
    const verify = async (code: string, tenant_id = '') => {
      const r = await api('login_verify', { email: A.email, code, tenant_id });
      if (!r.success) return err(errText(r));
      if (r.choose) { A.step = 'choose'; A.choose = r.choose; A.code = code; renderAuth(); return; }
      S.token = r.token; store.set(r.token); A.step = 'email'; root.innerHTML = `<div class="kx-center">${h(T.loading)}</div>`; await load();
    };
    document.getElementById('kx-code')?.addEventListener('submit', async (e) => {
      e.preventDefault(); const f = e.target as HTMLFormElement; const btn = f.querySelector('button[type=submit]') as HTMLButtonElement;
      busy(btn, true); await verify(String(new FormData(f).get('code') || '').trim()); busy(btn, false);
    });
    document.getElementById('kx-back')?.addEventListener('click', () => { A.step = 'email'; renderAuth(); });
    root.querySelectorAll<HTMLButtonElement>('.kx-choose').forEach((b) => b.addEventListener('click', () => verify(A.code, b.dataset.t!)));
    document.getElementById('kx-signup')?.addEventListener('submit', async (e) => {
      e.preventDefault(); const f = e.target as HTMLFormElement; const btn = f.querySelector('button') as HTMLButtonElement;
      const d = Object.fromEntries(new FormData(f) as Any);
      busy(btn, true); const r = await api('signup', d); busy(btn, false);
      if (!r.success) return err(errText(r));
      S.token = r.token; store.set(r.token); S.view = 'jobs';
      try { (window as Any).gtag && (window as Any).gtag('event', 'sign_up', { lead_source: 'oxira_kpi' }); } catch { /* ignore */ }
      root.innerHTML = `<div class="kx-center">${h(T.loading)}</div>`; await load();
    });
  }

  // ───────── shell ─────────
  function render() {
    if (!S.token) return renderAuth();
    if (!S.tenant) { root.innerHTML = `<div class="kx-center">${h(T.loading)}</div>`; load(); return; }
    const nav: [string, string][] = [];
    if (isMgr()) nav.push(['dash', T.nav.dash], ['review', T.nav.review]);
    nav.push(['me', T.nav.me]);
    if (isAdmin()) nav.push(['people', T.nav.people], ['jobs', T.nav.jobs], ['settings', T.nav.settings]);
    if (!nav.some((n) => n[0] === S.view)) S.view = nav[0][0];
    const pl = S.tenant.plan; const st = pl.state;
    const days = Math.max(0, Math.ceil((Date.parse(pl.trial_ends) - Date.now()) / 86400000));
    const banner = st === 'trial' ? `<div class="kx-banner">${h(T.plan.trial.replace('{n}', String(days)))} · <a href="${h(C.links.book)}">${h(T.plan.contact)}</a></div>`
      : st === 'expired' || st === 'suspended' ? `<div class="kx-banner bad">${h(T.plan[st])} <a href="${h(C.links.contact)}">${h(T.plan.contact)}</a></div>` : '';
    const idx = (S.tenant.periods_index || []).slice().sort((a: Any, b: Any) => (a.key < b.key ? 1 : -1));
    const pk = S.period ? S.period.key : '';
    const popts = idx.map((p: Any) => `<option value="${h(p.key)}" ${p.key === pk ? 'selected' : ''}>${h(periodLabel(p.key))} · ${h(T.status[p.status])}</option>`).join('')
      || `<option>${h(periodLabel(pk))}</option>`;
    root.innerHTML = `${banner}<div class="kx-shell">
      <aside class="kx-side"><p class="kx-logo">${h(T.brand)}</p><p class="kx-co">${h(S.tenant.company.name)}</p>
        <nav>${nav.map(([k, l]) => `<button type="button" class="kx-nav ${S.view === k ? 'on' : ''}" data-v="${k}">${h(l)}</button>`).join('')}</nav>
        <div class="kx-user"><b>${h(S.me.name)}</b><small>${h(T.roles[S.me.role])}</small><button type="button" class="kx-link" id="kx-out">${h(T.logout)}</button></div></aside>
      <main class="kx-main"><header class="kx-top"><label class="kx-period">${h(T.period)} <select id="kx-period">${popts}</select></label>
        ${isAdmin() && writable() ? `<span class="kx-top-act">${S.period && S.period.status === 'open' ? `<button type="button" class="btn btn-ghost kx-sm" id="kx-close">${h(T.closePeriod)}</button>` : S.period && S.period.status === 'closed' ? `<button type="button" class="btn btn-ghost kx-sm" id="kx-reopen">${h(T.reopenPeriod)}</button>` : ''}<button type="button" class="btn btn-navy kx-sm" id="kx-open">${h(T.openPeriod)}</button></span>` : ''}</header>
        <section id="kx-view" class="kx-view"></section></main></div>`;
    root.querySelectorAll<HTMLButtonElement>('.kx-nav').forEach((b) => b.addEventListener('click', () => { S.view = b.dataset.v; render(); }));
    document.getElementById('kx-out')!.addEventListener('click', async () => { await api('logout'); S.token = ''; store.set(''); S.tenant = null; S.me = null; S.view = ''; render(); });
    document.getElementById('kx-period')!.addEventListener('change', (e) => load((e.target as HTMLSelectElement).value));
    document.getElementById('kx-open')?.addEventListener('click', openPeriodDialog);
    document.getElementById('kx-close')?.addEventListener('click', async () => { if (!confirm(T.confirmClose)) return; const r = await api('close_period', { period: S.period.key }); if (!r.success) return toast(errText(r), true); apply(r); render(); });
    document.getElementById('kx-reopen')?.addEventListener('click', async () => { const r = await api('reopen_period', { period: S.period.key }); if (!r.success) return toast(errText(r), true); apply(r); render(); });
    const v = document.getElementById('kx-view')!;
    ({ dash: viewDash, review: viewReview, me: viewMe, people: viewPeople, jobs: viewJobs, settings: viewSettings } as Any)[S.view](v);
  }

  function openPeriodDialog() {
    const freq = S.tenant.settings.freq;
    const now = new Date(); const opts: string[] = [];
    for (let i = -2; i <= 3; i++) {
      if (freq === 'quarterly') { const d = new Date(now.getFullYear(), now.getMonth() + i * 3, 1); opts.push(`${d.getFullYear()}-Q${Math.floor(d.getMonth() / 3) + 1}`); }
      else { const d = new Date(now.getFullYear(), now.getMonth() + i, 1); opts.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`); }
    }
    const uniq = [...new Set(opts)];
    const cur = freq === 'quarterly' ? `${now.getFullYear()}-Q${Math.floor(now.getMonth() / 3) + 1}` : `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const d = modal(`<h2>${h(T.openPeriod)}</h2><form class="kx-form" id="kx-op"><label>${h(T.periodPrompt)}<select name="period">${uniq.map((k) => `<option value="${k}" ${k === cur ? 'selected' : ''}>${h(periodLabel(k))}</option>`).join('')}</select></label><button class="btn btn-navy" type="submit">${h(T.openPeriod)}</button></form>`);
    d.querySelector('form')!.addEventListener('submit', async (e) => {
      e.preventDefault(); const btn = d.querySelector('button[type=submit]') as HTMLButtonElement; busy(btn, true);
      const r = await api('open_period', { period: String(new FormData(e.target as HTMLFormElement).get('period')) }); busy(btn, false);
      if (!r.success) return toast(errText(r), true);
      d.close(); apply(r); S.view = 'review'; render();
    });
  }

  // ───────── dashboard ─────────
  function items(): [string, Any][] { return Object.entries((S.period && S.period.items) || {}) as [string, Any][]; }
  function emp(id: string) { return byId(S.tenant.employees, id) || { name: '?', id }; }
  function noPeriodBox(v: HTMLElement) {
    v.innerHTML = `<div class="kx-empty"><p>${h(T.noPeriod)}</p>${isAdmin() ? `<p class="kx-muted">${h(T.noPeriodAdmin)}</p><button type="button" class="btn btn-navy" id="kx-op2">${h(T.openPeriod)}</button>` : ''}</div>`;
    document.getElementById('kx-op2')?.addEventListener('click', openPeriodDialog);
  }
  function viewDash(v: HTMLElement) {
    if (!S.period || S.period.status === 'none') return noPeriodBox(v);
    const list = items().filter(([id]) => id !== S.me.id || isAdmin());
    const scored = list.filter(([, it]) => it.score && it.score.final != null);
    const avg = scored.length ? scored.reduce((a, [, it]) => a + it.score.final, 0) / scored.length : null;
    const done = list.filter(([, it]) => it.status !== 'draft').length;
    const appr = list.filter(([, it]) => it.status === 'approved').length;
    const bands = (S.tenant.settings.bands || []).slice().sort((a: Any, b: Any) => b.min - a.min);
    const gcount = bands.map((b: Any) => ({ name: b.name, n: scored.filter(([, it]) => it.score.grade === b.name).length }));
    const gmax = Math.max(1, ...gcount.map((g: Any) => g.n));
    const depts: Record<string, number[]> = {};
    scored.forEach(([id, it]) => { const d = byId(S.tenant.depts, emp(id).dept_id); const k = d ? d.name : '—'; (depts[k] = depts[k] || []).push(it.score.final); });
    const sorted = scored.slice().sort((a, b) => b[1].score.final - a[1].score.final);
    const keys = Object.keys(S.history || {}).concat([S.period.key]).sort().slice(-6);
    const trend = keys.map((k) => {
      if (k === S.period.key) return { k, v: avg };
      const vals = Object.values(S.history[k] || {}).filter((x) => x != null) as number[];
      return { k, v: vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null };
    });
    const row = ([id, it]: [string, Any]) => `<li><button type="button" class="kx-link" data-open="${h(id)}">${h(emp(id).name)}</button><span class="kx-score ${scoreClass(it.score.final)}">${fmt(it.score.final)}%</span></li>`;
    v.innerHTML = `<h1 class="kx-h1">${h(T.nav.dash)} · ${h(periodLabel(S.period.key))} ${pill(S.period.status)}</h1>
      <div class="kx-cards">
        <div class="kx-card"><small>${h(T.dash.employees)}</small><b>${fmt(list.length)}</b></div>
        <div class="kx-card"><small>${h(T.dash.avg)}</small><b class="${scoreClass(avg)}">${avg == null ? '—' : fmt(avg) + '%'}</b></div>
        <div class="kx-card"><small>${h(T.dash.completion)}</small><b>${list.length ? fmt((done / list.length) * 100) : 0}%</b><i class="kx-bar"><i style="width:${list.length ? (done / list.length) * 100 : 0}%"></i></i></div>
        <div class="kx-card"><small>${h(T.dash.approved)}</small><b>${fmt(appr)}</b></div>
      </div>
      ${scored.length ? `<div class="kx-grid2">
        <div class="kx-panel"><h2>${h(T.dash.grades)}</h2><ul class="kx-hbars">${gcount.map((g: Any) => `<li><span>${h(g.name)}</span><i><i style="width:${(g.n / gmax) * 100}%"></i></i><b>${fmt(g.n)}</b></li>`).join('')}</ul></div>
        <div class="kx-panel"><h2>${h(T.dash.byDept)}</h2><table class="kx-table"><thead><tr><th>${h(T.dash.dept)}</th><th>${h(T.dash.count)}</th><th>${h(T.dash.score)}</th></tr></thead><tbody>${Object.entries(depts).sort((a, b) => b[1].reduce((x, y) => x + y, 0) / b[1].length - a[1].reduce((x, y) => x + y, 0) / a[1].length).map(([d, arr]) => { const a = arr.reduce((x, y) => x + y, 0) / arr.length; return `<tr><td>${h(d)}</td><td>${fmt(arr.length)}</td><td><span class="kx-score ${scoreClass(a)}">${fmt(a)}%</span></td></tr>`; }).join('')}</tbody></table></div>
        <div class="kx-panel"><h2>${h(T.dash.top)}</h2><ol class="kx-rank">${sorted.slice(0, 5).map(row).join('')}</ol></div>
        <div class="kx-panel"><h2>${h(T.dash.low)}</h2><ol class="kx-rank">${sorted.slice(-5).reverse().filter(([, it]) => it.score.final < 70).map(row).join('') || '<li class="kx-muted">—</li>'}</ol></div>
        <div class="kx-panel kx-span2"><h2>${h(T.dash.trend)}</h2><div class="kx-cols">${trend.map((t) => `<div><i style="height:${t.v == null ? 0 : Math.min(100, t.v)}%" class="${scoreClass(t.v)}"></i><b>${t.v == null ? '—' : fmt(t.v)}</b><small>${h(periodLabel(t.k))}</small></div>`).join('')}</div></div>
      </div>` : `<div class="kx-empty"><p>${h(T.dash.none)}</p><button type="button" class="btn btn-navy" data-go="review">${h(T.nav.review)}</button></div>`}`;
    v.querySelectorAll<HTMLButtonElement>('[data-open]').forEach((b) => b.addEventListener('click', () => openEntry(b.dataset.open!)));
    v.querySelector<HTMLButtonElement>('[data-go]')?.addEventListener('click', () => { S.view = 'review'; render(); });
  }

  // ───────── reviews ─────────
  function viewReview(v: HTMLElement) {
    if (!S.period || S.period.status === 'none') return noPeriodBox(v);
    const F = S.filter;
    const list = items().filter(([id]) => id !== S.me.id || isAdmin()).map(([id, it]) => ({ id, it, e: emp(id) }))
      .filter((x) => (!F.q || x.e.name.toLowerCase().includes(F.q.toLowerCase())) && (!F.dept || x.e.dept_id === F.dept) && (!F.status || x.it.status === F.status))
      .sort((a, b) => a.e.name.localeCompare(b.e.name, C.lang));
    const dopts = (S.tenant.depts || []).map((d: Any) => `<option value="${h(d.id)}" ${F.dept === d.id ? 'selected' : ''}>${h(d.name)}</option>`).join('');
    const open = S.period.status === 'open' && writable();
    v.innerHTML = `<h1 class="kx-h1">${h(T.nav.review)} · ${h(periodLabel(S.period.key))} ${pill(S.period.status)}</h1>
      <div class="kx-tools"><input type="search" id="kx-q" placeholder="${h(T.review.search)}" value="${h(F.q)}">
        <select id="kx-fd"><option value="">${h(T.review.allDepts)}</option>${dopts}</select>
        <select id="kx-fs"><option value="">${h(T.review.allStatus)}</option>${['draft', 'submitted', 'approved'].map((s) => `<option value="${s}" ${F.status === s ? 'selected' : ''}>${h(T.status[s])}</option>`).join('')}</select>
        <span class="kx-grow"></span>
        ${open ? `<button type="button" class="btn btn-ghost kx-sm" id="kx-imp">${h(T.review.importActuals)}</button>` : ''}
        ${open && isAdmin() ? `<button type="button" class="btn btn-ghost kx-sm" id="kx-appr">${h(T.review.approveSelected)}</button>` : ''}
        <button type="button" class="btn btn-ghost kx-sm" id="kx-exp">${h(T.review.exportCsv)}</button></div>
      ${list.length ? `<div class="kx-scroll"><table class="kx-table kx-rows"><thead><tr><th>${h(T.review.name)}</th><th>${h(T.review.dept)}</th><th>${h(T.review.job)}</th><th>${h(T.review.kpi)}</th><th>${h(T.review.comp)}</th><th>${h(T.review.final)}</th><th>${h(T.review.grade)}</th><th>${h(T.review.status)}</th></tr></thead><tbody>
        ${list.map(({ id, it, e }) => `<tr data-open="${h(id)}" tabindex="0"><td><b>${h(e.name)}</b></td><td>${h((byId(S.tenant.depts, e.dept_id) || {}).name || '—')}</td><td>${h((byId(S.tenant.positions, e.position_id) || {}).name || '—')}</td>
          <td>${it.score && it.score.kpi != null ? fmt(it.score.kpi) + '%' : '—'}</td><td>${it.score && it.score.comp != null ? fmt(it.score.comp) + '%' : '—'}</td>
          <td>${it.score && it.score.final != null ? `<span class="kx-score ${scoreClass(it.score.final)}">${fmt(it.score.final)}%</span>` : '—'}</td><td>${h((it.score && it.score.grade) || '—')}</td><td>${pill(it.status)}</td></tr>`).join('')}
      </tbody></table></div>` : `<div class="kx-empty"><p>${h(T.review.empty)}</p></div>`}`;
    const re = () => viewReview(v);
    const q = document.getElementById('kx-q') as HTMLInputElement;
    q.addEventListener('input', () => { F.q = q.value; const pos = q.selectionStart; re(); const n = document.getElementById('kx-q') as HTMLInputElement; n.focus(); n.setSelectionRange(pos, pos); });
    document.getElementById('kx-fd')!.addEventListener('change', (e) => { F.dept = (e.target as HTMLSelectElement).value; re(); });
    document.getElementById('kx-fs')!.addEventListener('change', (e) => { F.status = (e.target as HTMLSelectElement).value; re(); });
    v.querySelectorAll<HTMLElement>('tr[data-open]').forEach((tr) => { const go = () => openEntry(tr.dataset.open!); tr.addEventListener('click', go); tr.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); }); });
    document.getElementById('kx-exp')!.addEventListener('click', exportPeriod);
    document.getElementById('kx-imp')?.addEventListener('click', importActuals);
    document.getElementById('kx-appr')?.addEventListener('click', async () => {
      const ids = items().filter(([, it]) => it.status === 'submitted').map(([id]) => id);
      if (!ids.length) return toast(T.status.submitted + ': 0');
      const r = await api('approve', { period: S.period.key, emp_ids: ids }); if (!r.success) return toast(errText(r), true);
      apply(r); toast(`${T.entry.approve} ✓ ${r.approved}`); render();
    });
  }
  function exportPeriod() {
    const comps = S.tenant.competencies || [];
    const head = [T.review.name, T.people.email, T.people.empNo, T.review.dept, T.review.job, T.entry.kpiName, T.entry.target, T.entry.actual, T.entry.weight, T.entry.pct, T.review.kpi, T.review.comp, T.review.final, T.review.grade, T.review.status, ...comps.map((c: Any) => c.name), T.entry.mgrNote];
    const rows: Any[][] = [head];
    items().forEach(([id, it]) => {
      const e = emp(id); const base = [e.name, e.email, e.emp_no, (byId(S.tenant.depts, e.dept_id) || {}).name || '', (byId(S.tenant.positions, e.position_id) || {}).name || ''];
      const tail = [it.score ? it.score.kpi : '', it.score ? it.score.comp : '', it.score ? it.score.final : '', it.score ? it.score.grade : '', T.status[it.status], ...comps.map((c: Any) => (it.comps || {})[c.id] ?? ''), it.mgr_note || ''];
      if (!(it.kpis || []).length) rows.push([...base, '', '', '', '', '', ...tail]);
      (it.kpis || []).forEach((k: Any) => rows.push([...base, k.name, k.target, k.actual, k.weight, k.pct, ...tail]));
    });
    downloadCsv(`oxira-kpi-${S.period.key}.csv`, rows);
  }
  function importActuals() {
    const d = modal(`<h2>${h(T.review.importActuals)}</h2><p class="kx-muted">${h(T.importActualsHelp)}</p><button type="button" class="btn btn-ghost kx-sm" id="kx-tpl">${h(T.people.template)}</button> <button type="button" class="btn btn-navy" id="kx-pick">${h(T.review.importActuals)}</button><div id="kx-ires"></div>`);
    d.querySelector('#kx-tpl')!.addEventListener('click', () => {
      const rows: Any[][] = [['employee', 'kpi', 'actual']];
      items().slice(0, 50).forEach(([id, it]) => (it.kpis || []).forEach((k: Any) => rows.push([emp(id).email || emp(id).emp_no || emp(id).name, k.name, ''])));
      downloadCsv(`oxira-kpi-results-${S.period.key}.csv`, rows);
    });
    d.querySelector('#kx-pick')!.addEventListener('click', () => pickFile(async (text) => {
      const rows = parseCsv(text); const body = rows.slice(1).map((r) => ({ employee: r[0], kpi: r[1], actual: r[2] }));
      const r = await api('import_actuals', { period: S.period.key, rows: body });
      if (!r.success) return toast(errText(r), true);
      apply(r); d.querySelector('#kx-ires')!.innerHTML = `<p>✓ ${fmt(r.imported)}</p>${r.errors.length ? `<p class="kx-err">${h(T.people.importErrors.replace('{n}', r.errors.map((x: Any) => x.row).join(', ')))}</p>` : ''}`;
      render();
    }));
  }

  // Review editor (manager/admin) — also used read-only.
  function openEntry(id: string) {
    const it = S.period.items[id]; if (!it) return;
    const e = emp(id); const scale = S.tenant.settings.scale || 5;
    const canEdit = isMgr() && S.period.status === 'open' && writable() && (it.status !== 'approved' || isAdmin()) && (id !== S.me.id || isAdmin());
    const dis = canEdit ? '' : 'disabled';
    const comps = S.tenant.competencies || [];
    const rateSel = (cid: string, val: Any) => `<select data-comp="${h(cid)}" ${dis}><option value="">—</option>${Array.from({ length: scale * 2 - 1 }, (_, i) => 1 + i / 2).map((x) => `<option value="${x}" ${+val === x ? 'selected' : ''}>${fmt(x)}</option>`).join('')}</select>`;
    const selfC = (it.self && it.self.comps) || {};
    const d = modal(`<div class="kx-entry" id="kx-print">
      <header><div><h2>${h(e.name)}</h2><p class="kx-muted">${h((byId(S.tenant.positions, e.position_id) || {}).name || '')} · ${h((byId(S.tenant.depts, e.dept_id) || {}).name || '')} · ${h(periodLabel(S.period.key))}</p></div>
        <div class="kx-big ${scoreClass(it.score && it.score.final)}" id="kx-fin">${it.score && it.score.final != null ? fmt(it.score.final) + '%' : '—'}<small>${h((it.score && it.score.grade) || '')}</small></div></header>
      ${id === S.me.id && !isAdmin() ? `<p class="kx-note">${h(T.entry.selfOwn)}</p>` : ''}
      <h3>${h(T.entry.kpis)}</h3>
      ${(it.kpis || []).length ? `<div class="kx-scroll"><table class="kx-table"><thead><tr><th>${h(T.entry.kpiName)}</th><th>${h(T.entry.target)}</th><th>${h(T.entry.weight)}</th><th>${h(T.entry.actual)}</th><th>${h(T.entry.pct)}</th><th>${h(T.entry.note)}</th></tr></thead><tbody>
        ${it.kpis.map((k: Any) => `<tr data-k="${h(k.kpi_id)}"><td><b>${h(k.name)}</b>${k.dir === 'down' ? `<small class="kx-muted"> · ${h(T.entry.lower)}</small>` : ''}</td>
          <td>${isAdmin() && canEdit ? `<input class="kx-num" data-f="target" value="${h(k.target ?? '')}" inputmode="decimal">` : `${fmt(k.target)} ${h(k.unit)}`}</td><td>${fmt(k.weight)}%</td>
          <td><input class="kx-num" data-f="actual" value="${h(k.actual ?? '')}" inputmode="decimal" ${dis}> <small>${h(k.unit)}</small></td>
          <td><span class="kx-score ${scoreClass(k.pct)}" data-pct>${k.pct == null ? '—' : fmt(k.pct) + '%'}</span></td>
          <td><input data-f="note" value="${h(k.note || '')}" maxlength="300" ${dis}></td></tr>`).join('')}</tbody></table></div>` : `<p class="kx-muted">${h(T.entry.noKpis)}</p>`}
      <h3>${h(T.entry.comps)}</h3>
      <div class="kx-comps">${comps.map((c: Any) => `<label><span>${h(c.name)}${selfC[c.id] ? `<small class="kx-muted"> · ${h(T.entry.self)}: ${fmt(selfC[c.id])}</small>` : ''}</span>${rateSel(c.id, (it.comps || {})[c.id])}</label>`).join('')}</div>
      <h3>${h(T.entry.self)}</h3>${it.self ? `<div class="kx-self">${it.self.achievements ? `<p><b>${h(T.entry.achievements)}:</b> ${h(it.self.achievements)}</p>` : ''}${it.self.note ? `<p>${h(it.self.note)}</p>` : ''}</div>` : `<p class="kx-muted">${h(T.entry.selfNone)}</p>`}
      <label class="kx-block">${h(T.entry.mgrNote)}<textarea id="kx-mn" rows="3" maxlength="1500" ${dis}>${h(it.mgr_note || '')}</textarea></label>
      <label class="kx-block">${h(T.entry.goals)}<textarea id="kx-goals" rows="2" maxlength="1500" ${dis}>${h(it.goals || '')}</textarea></label>
      <p class="kx-muted">${pill(it.status)} ${it.by ? `${h(T.entry.by)}: ${h(it.by)}` : ''}</p></div>
      <div class="kx-actions">${canEdit ? `<button type="button" class="btn btn-ghost" data-act="draft">${h(T.entry.saveDraft)}</button><button type="button" class="btn btn-navy" data-act="submit">${h(T.entry.submit)}</button>${isAdmin() ? `<button type="button" class="btn btn-amber" data-act="approve">${h(T.entry.approve)}</button>` : ''}` : ''}<button type="button" class="btn btn-ghost" data-act="print">${h(T.entry.print)}</button></div>`, true);
    // live preview of KPI achievement
    const settings = S.tenant.settings;
    const preview = () => {
      d.querySelectorAll<HTMLTableRowElement>('tr[data-k]').forEach((tr) => {
        const k = it.kpis.find((x: Any) => x.kpi_id === tr.dataset.k);
        const t = Number((tr.querySelector('[data-f=target]') as HTMLInputElement)?.value ?? k.target);
        const raw = (tr.querySelector('[data-f=actual]') as HTMLInputElement).value.replace(/,/g, '');
        const a = raw === '' ? NaN : Number(raw); let p: number | null = null;
        if (!isNaN(a) && !isNaN(t)) { p = k.dir === 'down' ? (t === 0 ? (a <= 0 ? 100 : 0) : a <= 0 ? settings.cap : (t / a) * 100) : t === 0 ? 100 : (a / t) * 100; p = Math.max(0, Math.min(settings.cap, p)); }
        const el = tr.querySelector('[data-pct]') as HTMLElement; el.textContent = p == null ? '—' : fmt(p) + '%'; el.className = 'kx-score ' + scoreClass(p);
      });
    };
    d.querySelectorAll('input[data-f]').forEach((i) => i.addEventListener('input', preview));
    d.querySelectorAll<HTMLButtonElement>('[data-act]').forEach((b) => b.addEventListener('click', async () => {
      const act = b.dataset.act;
      if (act === 'print') { document.body.classList.add('kx-printing'); window.print(); document.body.classList.remove('kx-printing'); return; }
      const kpis = Array.from(d.querySelectorAll<HTMLTableRowElement>('tr[data-k]')).map((tr) => {
        const o: Any = { kpi_id: tr.dataset.k, actual: (tr.querySelector('[data-f=actual]') as HTMLInputElement).value, note: (tr.querySelector('[data-f=note]') as HTMLInputElement).value };
        const tg = tr.querySelector('[data-f=target]') as HTMLInputElement | null; if (tg) o.target = tg.value; return o;
      });
      const comps: Any = {}; d.querySelectorAll<HTMLSelectElement>('[data-comp]').forEach((s) => { if (s.value) comps[s.dataset.comp!] = +s.value; });
      busy(b, true);
      const r = await api('save_entry', { period: S.period.key, emp_id: id, kpis, comps, mgr_note: (d.querySelector('#kx-mn') as HTMLTextAreaElement).value, goals: (d.querySelector('#kx-goals') as HTMLTextAreaElement).value, submit: act === 'submit' || act === 'approve', approve: act === 'approve' });
      busy(b, false);
      if (!r.success) return toast(errText(r), true);
      S.period.items[id] = r.item; toast(T.entry.saved); d.close(); render();
    }));
  }

  // ───────── my scorecard ─────────
  function viewMe(v: HTMLElement) {
    if (!S.period || S.period.status === 'none') return noPeriodBox(v);
    const it = S.period.items[S.me.id];
    const comps = S.tenant.competencies || [];
    const scale = S.tenant.settings.scale || 5;
    const self = (it && it.self) || { comps: {} };
    const open = S.period.status === 'open' && writable();
    const shown = it && it.score;
    const hist = Object.keys(S.history || {}).sort().slice(-5).map((k) => ({ k, v: (S.history[k] || {})[S.me.id] })).filter((x) => x.v != null);
    v.innerHTML = `<h1 class="kx-h1">${h(T.me.title)} · ${h(periodLabel(S.period.key))}</h1>
      ${!it ? `<div class="kx-empty"><p>${h(T.review.empty)}</p></div>` : `
      <div class="kx-grid2">
        <div class="kx-panel"><div class="kx-big ${scoreClass(shown && it.score.final)}">${shown && it.score.final != null ? fmt(it.score.final) + '%' : '—'}<small>${h((shown && it.score.grade) || '')}</small></div>
          ${shown ? '' : `<p class="kx-muted">${h(T.me.pending)}</p>`}
          <ul class="kx-kpilist">${(it.kpis || []).map((k: Any) => `<li><span>${h(k.name)}</span><small>${h(T.entry.target)}: ${fmt(k.target)} ${h(k.unit)} · ${h(T.entry.weight)} ${fmt(k.weight)}%</small>${k.actual != null ? `<b class="kx-score ${scoreClass(k.pct)}">${fmt(k.actual)} ${h(k.unit)} · ${fmt(k.pct)}%</b>` : ''}</li>`).join('')}</ul>
          ${it.mgr_note ? `<h3>${h(T.entry.mgrNote)}</h3><p>${h(it.mgr_note)}</p>` : ''}${it.goals ? `<h3>${h(T.entry.goals)}</h3><p>${h(it.goals)}</p>` : ''}
          ${hist.length ? `<h3>${h(T.dash.trend)}</h3><div class="kx-cols small">${hist.map((x) => `<div><i style="height:${Math.min(100, x.v)}%" class="${scoreClass(x.v)}"></i><b>${fmt(x.v)}</b><small>${h(periodLabel(x.k))}</small></div>`).join('')}</div>` : ''}
        </div>
        <div class="kx-panel"><h2>${h(T.me.selfTitle)}</h2>${!S.tenant.settings.self ? `<p class="kx-muted">${h(T.me.noSelf)}</p>` : `<p class="kx-muted">${h(T.me.selfHelp)}</p>
          <form class="kx-form" id="kx-self">${comps.map((c: Any) => `<label>${h(c.name)}<select name="c_${h(c.id)}" ${open ? '' : 'disabled'}><option value="">—</option>${Array.from({ length: scale * 2 - 1 }, (_, i) => 1 + i / 2).map((x) => `<option value="${x}" ${+self.comps[c.id] === x ? 'selected' : ''}>${fmt(x)}</option>`).join('')}</select></label>`).join('')}
            <label>${h(T.entry.achievements)}<textarea name="achievements" rows="3" maxlength="1500" ${open ? '' : 'disabled'}>${h(self.achievements || '')}</textarea></label>
            <label>${h(T.me.note)}<textarea name="note" rows="2" maxlength="1500" ${open ? '' : 'disabled'}>${h(self.note || '')}</textarea></label>
            ${open ? `<button class="btn btn-navy" type="submit">${h(T.me.save)}</button>` : `<p class="kx-muted">${h(T.me.closed)}</p>`}</form>`}</div>
      </div>`}`;
    document.getElementById('kx-self')?.addEventListener('submit', async (e) => {
      e.preventDefault(); const f = e.target as HTMLFormElement; const fd = new FormData(f); const c: Any = {};
      comps.forEach((cp: Any) => { const x = fd.get('c_' + cp.id); if (x) c[cp.id] = +x; });
      const btn = f.querySelector('button') as HTMLButtonElement; busy(btn, true);
      const r = await api('save_self', { period: S.period.key, comps: c, achievements: fd.get('achievements'), note: fd.get('note') }); busy(btn, false);
      if (!r.success) return toast(errText(r), true);
      S.period.items[S.me.id] = r.item; toast(T.entry.saved);
    });
  }

  // ───────── employees ─────────
  function viewPeople(v: HTMLElement) {
    const emps = (S.tenant.employees || []).slice().sort((a: Any, b: Any) => (a.status === b.status ? a.name.localeCompare(b.name, C.lang) : a.status === 'inactive' ? 1 : -1));
    const active = emps.filter((e: Any) => e.status !== 'inactive').length;
    v.innerHTML = `<h1 class="kx-h1">${h(T.nav.people)} <small class="kx-muted">${h(T.people.count.replace('{n}', fmt(active)))}</small></h1>
      <div class="kx-tools"><button type="button" class="btn btn-navy kx-sm" id="kx-add" ${writable() ? '' : 'disabled'}>${h(T.people.add)}</button><button type="button" class="btn btn-ghost kx-sm" id="kx-pimp" ${writable() ? '' : 'disabled'}>${h(T.people.import)}</button><button type="button" class="btn btn-ghost kx-sm" id="kx-ptpl">${h(T.people.template)}</button></div>
      <div class="kx-scroll"><table class="kx-table kx-rows"><thead><tr><th>${h(T.people.name)}</th><th>${h(T.people.email)}</th><th>${h(T.people.dept)}</th><th>${h(T.people.job)}</th><th>${h(T.people.manager)}</th><th>${h(T.people.role)}</th><th>${h(T.people.status)}</th></tr></thead><tbody>
      ${emps.map((e: Any) => `<tr data-e="${h(e.id)}" tabindex="0" class="${e.status === 'inactive' ? 'off' : ''}"><td><b>${h(e.name)}</b>${e.emp_no ? `<small class="kx-muted"> #${h(e.emp_no)}</small>` : ''}</td><td dir="ltr">${h(e.email)}</td><td>${h((byId(S.tenant.depts, e.dept_id) || {}).name || '—')}</td><td>${h((byId(S.tenant.positions, e.position_id) || {}).name || '—')}</td><td>${h((byId(S.tenant.employees, e.manager_id) || {}).name || '—')}</td><td>${h(T.roles[e.role])}</td><td>${h(e.status === 'inactive' ? T.people.inactive : T.people.active)}</td></tr>`).join('')}
      </tbody></table></div>`;
    document.getElementById('kx-add')!.addEventListener('click', () => editEmployee(null));
    v.querySelectorAll<HTMLElement>('tr[data-e]').forEach((tr) => { const go = () => editEmployee(byId(S.tenant.employees, tr.dataset.e!)); tr.addEventListener('click', go); tr.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); }); });
    document.getElementById('kx-ptpl')!.addEventListener('click', () => downloadCsv('oxira-kpi-employees.csv', [['name', 'email', 'phone', 'emp_no', 'dept', 'position', 'manager', 'role'], ar ? ['سارة أحمد', 'sara@company.sa', '+9665xxxxxxxx', '101', 'المبيعات', 'مندوب مبيعات', 'manager@company.sa', 'employee'] : ['Sara Ahmed', 'sara@company.sa', '+9665xxxxxxxx', '101', 'Sales', 'Sales representative', 'manager@company.sa', 'employee']]));
    document.getElementById('kx-pimp')!.addEventListener('click', () => {
      const d = modal(`<h2>${h(T.people.import)}</h2><p class="kx-muted">${h(T.importPeopleHelp)}</p><button type="button" class="btn btn-navy" id="kx-pk">${h(T.people.import)}</button><div id="kx-pres"></div>`);
      d.querySelector('#kx-pk')!.addEventListener('click', () => pickFile(async (text) => {
        const rows = parseCsv(text).slice(1).map((r) => ({ name: r[0], email: r[1], phone: r[2], emp_no: r[3], dept: r[4], position: r[5], manager: r[6], role: (r[7] || '').trim().toLowerCase() }));
        const r = await api('import_employees', { rows });
        if (!r.success) return toast(errText(r), true);
        apply(r); d.querySelector('#kx-pres')!.innerHTML = `<p>✓ ${h(T.people.imported.replace('{a}', fmt(r.added)).replace('{u}', fmt(r.updated)))}</p>${r.errors.length ? `<p class="kx-err">${h(T.people.importErrors.replace('{n}', r.errors.map((x: Any) => `${x.row} (${T.errors[x.reason] || x.reason})`).join('، ')))}</p>` : ''}`;
        render();
      }));
    });
  }
  function editEmployee(e: Any) {
    e = e || { role: 'employee', status: 'active' };
    const opt = (list: Any[], sel: string, skip?: string) => `<option value="">${h(T.people.none)}</option>` + list.filter((x: Any) => x.id !== skip && x.status !== 'inactive').map((x: Any) => `<option value="${h(x.id)}" ${x.id === sel ? 'selected' : ''}>${h(x.name)}</option>`).join('');
    const d = modal(`<h2>${h(e.id ? T.people.edit : T.people.add)}</h2><form class="kx-form" id="kx-emp">
      <label>${h(T.people.name)}<input name="name" required maxlength="80" value="${h(e.name || '')}"></label>
      <label>${h(T.people.email)}<input name="email" type="email" dir="ltr" value="${h(e.email || '')}"><small class="kx-muted">${h(T.people.emailHelp)}</small></label>
      <div class="kx-row2"><label>${h(T.people.phone)}<input name="phone" type="tel" dir="ltr" value="${h(e.phone || '')}"></label><label>${h(T.people.empNo)}<input name="emp_no" maxlength="30" value="${h(e.emp_no || '')}"></label></div>
      <div class="kx-row2"><label>${h(T.people.dept)}<select name="dept_id">${opt(S.tenant.depts || [], e.dept_id)}</select></label><label>${h(T.people.job)}<select name="position_id">${opt(S.tenant.positions || [], e.position_id)}</select></label></div>
      <div class="kx-row2"><label>${h(T.people.manager)}<select name="manager_id">${opt(S.tenant.employees || [], e.manager_id, e.id)}</select></label>
        <label>${h(T.people.role)}<select name="role">${['employee', 'manager', 'hr', 'admin'].map((r) => `<option value="${r}" ${e.role === r ? 'selected' : ''}>${h(T.roles[r])}</option>`).join('')}</select></label></div>
      ${e.id ? `<label>${h(T.people.status)}<select name="status"><option value="active" ${e.status !== 'inactive' ? 'selected' : ''}>${h(T.people.active)}</option><option value="inactive" ${e.status === 'inactive' ? 'selected' : ''}>${h(T.people.inactive)}</option></select></label>` : ''}
      <div class="kx-actions"><button class="btn btn-navy" type="submit" ${writable() ? '' : 'disabled'}>${h(T.people.save)}</button></div></form>`);
    d.querySelector('form')!.addEventListener('submit', async (ev) => {
      ev.preventDefault(); const f = ev.target as HTMLFormElement; const data: Any = Object.fromEntries(new FormData(f) as Any); if (e.id) data.id = e.id;
      const btn = f.querySelector('button[type=submit]') as HTMLButtonElement; busy(btn, true);
      const r = await api('save_employee', { employee: data }); busy(btn, false);
      if (!r.success) return toast(errText(r), true);
      apply(r); d.close(); toast(T.entry.saved); await load(S.period && S.period.status !== 'none' ? S.period.key : undefined);
    });
  }

  // ───────── jobs & KPIs ─────────
  function viewJobs(v: HTMLElement) {
    const depts = S.tenant.depts || []; const pos = S.tenant.positions || [];
    const count = (pid: string) => (S.tenant.employees || []).filter((e: Any) => e.position_id === pid && e.status !== 'inactive').length;
    v.innerHTML = `<h1 class="kx-h1">${h(T.nav.jobs)}</h1>
      <div class="kx-grid2 kx-jobs">
        <div class="kx-panel"><h2>${h(T.jobs.depts)}</h2><ul class="kx-list">${depts.map((d: Any) => `<li><span>${h(d.name)}</span><span><button type="button" class="kx-link" data-rd="${h(d.id)}">${h(T.jobs.rename)}</button> <button type="button" class="kx-link danger" data-dd="${h(d.id)}">${h(T.jobs.del)}</button></span></li>`).join('')}</ul>
          <form class="kx-inline" id="kx-dadd"><input name="name" placeholder="${h(T.jobs.deptName)}" required maxlength="80"><button class="btn btn-ghost kx-sm" type="submit" ${writable() ? '' : 'disabled'}>${h(T.jobs.addDept)}</button></form></div>
        <div class="kx-panel"><h2>${h(T.jobs.jobs)}</h2>${pos.length ? `<ul class="kx-list">${pos.map((p: Any) => { const w = (p.kpis || []).reduce((a: number, k: Any) => a + (+k.weight || 0), 0); return `<li><button type="button" class="kx-link" data-p="${h(p.id)}"><b>${h(p.name)}</b></button><small class="kx-muted">${h((byId(depts, p.dept_id) || {}).name || '')} · ${fmt((p.kpis || []).length)} KPI · ${h(T.jobs.employees.replace('{n}', fmt(count(p.id))))}${w && w !== 100 ? ` · <span class="kx-warn">${h(T.jobs.weights.replace('{n}', fmt(w)))}</span>` : ''}</small></li>`; }).join('')}</ul>` : `<p class="kx-muted">${h(T.jobs.noJobs)}</p>`}
          <button type="button" class="btn btn-navy kx-sm" id="kx-padd" ${writable() ? '' : 'disabled'}>${h(T.jobs.addJob)}</button></div>
      </div>`;
    v.querySelector('#kx-dadd')!.addEventListener('submit', async (e) => { e.preventDefault(); const f = e.target as HTMLFormElement; const r = await api('save_dept', { name: new FormData(f).get('name') }); if (!r.success) return toast(errText(r), true); apply(r); render(); });
    v.querySelectorAll<HTMLButtonElement>('[data-rd]').forEach((b) => b.addEventListener('click', async () => { const d = byId(depts, b.dataset.rd!); const n = prompt(T.jobs.deptName, d.name); if (!n) return; const r = await api('save_dept', { id: d.id, name: n }); if (!r.success) return toast(errText(r), true); apply(r); render(); }));
    v.querySelectorAll<HTMLButtonElement>('[data-dd]').forEach((b) => b.addEventListener('click', async () => { const r = await api('delete_dept', { id: b.dataset.dd }); if (!r.success) return toast(errText(r), true); apply(r); render(); }));
    v.querySelectorAll<HTMLButtonElement>('[data-p]').forEach((b) => b.addEventListener('click', () => editPosition(byId(pos, b.dataset.p!))));
    document.getElementById('kx-padd')!.addEventListener('click', () => editPosition(null));
  }
  function editPosition(p: Any) {
    p = p ? JSON.parse(JSON.stringify(p)) : { name: '', dept_id: '', kpis: [] };
    const d = modal('', true);
    const draw = () => {
      const w = p.kpis.reduce((a: number, k: Any) => a + (+k.weight || 0), 0);
      d.innerHTML = `<button class="kx-x" type="button" aria-label="${h(T.entry.close)}">×</button><h2>${h(p.id ? p.name : T.jobs.addJob)}</h2>
        <div class="kx-form"><div class="kx-row2"><label>${h(T.jobs.jobName)}<input id="kx-pn" required maxlength="100" value="${h(p.name)}"></label>
          <label>${h(T.people.dept)}<select id="kx-pd"><option value="">${h(T.people.none)}</option>${(S.tenant.depts || []).map((x: Any) => `<option value="${h(x.id)}" ${x.id === p.dept_id ? 'selected' : ''}>${h(x.name)}</option>`).join('')}</select></label></div></div>
        <h3>${h(T.jobs.kpis)} <small class="${w === 100 ? 'kx-ok' : 'kx-warn'}">${h(w === 100 ? T.jobs.weightsOk : T.jobs.weights.replace('{n}', fmt(w)))}</small></h3>
        <div class="kx-scroll"><table class="kx-table kx-kpiedit"><thead><tr><th>${h(T.entry.kpiName)}</th><th>${h(T.jobs.unit)}</th><th>${h(T.jobs.dir)}</th><th>${h(T.jobs.target)}</th><th>${h(T.jobs.weight)}</th><th></th></tr></thead><tbody>
          ${p.kpis.map((k: Any, i: number) => `<tr data-i="${i}"><td><input data-f="name" value="${h(k.name)}" maxlength="120"></td><td><input data-f="unit" value="${h(k.unit || '')}" maxlength="20" class="kx-short"></td>
            <td><select data-f="dir"><option value="up" ${k.dir !== 'down' ? 'selected' : ''}>${h(T.jobs.up)}</option><option value="down" ${k.dir === 'down' ? 'selected' : ''}>${h(T.jobs.down)}</option></select></td>
            <td><input data-f="target" value="${h(k.target ?? '')}" inputmode="decimal" class="kx-num"></td><td><input data-f="weight" value="${h(k.weight ?? '')}" inputmode="decimal" class="kx-num"></td>
            <td><button type="button" class="kx-link danger" data-del="${i}">${h(T.jobs.del)}</button></td></tr>`).join('')}</tbody></table></div>
        <div class="kx-tools"><button type="button" class="btn btn-ghost kx-sm" id="kx-ka">${h(T.jobs.addKpi)}</button>
          <select id="kx-lib"><option value="">${h(T.jobs.fromLib)}…</option>${C.lib.map((f: Any) => `<option value="${h(f.key)}">${h(ar ? f.ar : f.en)}</option>`).join('')}</select></div>
        <div class="kx-actions">${p.id ? `<button type="button" class="btn btn-ghost danger" id="kx-pdel">${h(T.jobs.del)}</button>` : ''}<button type="button" class="btn btn-navy" id="kx-psave" ${writable() ? '' : 'disabled'}>${h(T.jobs.save)}</button></div>`;
      d.querySelector('.kx-x')!.addEventListener('click', () => d.close());
      const sync = () => { p.name = (d.querySelector('#kx-pn') as HTMLInputElement).value; p.dept_id = (d.querySelector('#kx-pd') as HTMLSelectElement).value; d.querySelectorAll<HTMLTableRowElement>('tr[data-i]').forEach((tr) => { const k = p.kpis[+tr.dataset.i!]; tr.querySelectorAll<HTMLInputElement>('[data-f]').forEach((i) => { k[i.dataset.f!] = i.value; }); }); };
      d.querySelectorAll('[data-f=weight]').forEach((i) => i.addEventListener('change', () => { sync(); draw(); }));
      d.querySelectorAll<HTMLButtonElement>('[data-del]').forEach((b) => b.addEventListener('click', () => { sync(); p.kpis.splice(+b.dataset.del!, 1); draw(); }));
      d.querySelector('#kx-ka')!.addEventListener('click', () => { sync(); p.kpis.push({ name: '', unit: '%', dir: 'up', target: '', weight: '' }); draw(); });
      d.querySelector('#kx-lib')!.addEventListener('change', (e) => {
        sync(); const f = C.lib.find((x: Any) => x.key === (e.target as HTMLSelectElement).value); if (!f) return;
        if (!p.name) p.name = ar ? f.ar : f.en;
        f.kpis.forEach((k: Any) => { const name = ar ? k.ar : k.en; if (!p.kpis.some((x: Any) => x.name === name)) p.kpis.push({ name, unit: ar ? k.unitAr : k.unitEn, dir: k.dir, target: '', weight: k.weight }); });
        draw();
      });
      d.querySelector('#kx-pdel')?.addEventListener('click', async () => { const r = await api('delete_position', { id: p.id }); if (!r.success) return toast(errText(r), true); apply(r); d.close(); render(); });
      d.querySelector('#kx-psave')!.addEventListener('click', async (ev) => {
        sync(); if (!p.name.trim()) return (d.querySelector('#kx-pn') as HTMLInputElement).focus();
        const btn = ev.currentTarget as HTMLButtonElement; busy(btn, true);
        const r = await api('save_position', { id: p.id, name: p.name, dept_id: p.dept_id, kpis: p.kpis, period: S.period && S.period.status === 'open' ? S.period.key : undefined }); busy(btn, false);
        if (!r.success) return toast(errText(r), true);
        apply(r); d.close(); toast(T.entry.saved); render();
      });
    };
    draw();
  }

  // ───────── settings ─────────
  function viewSettings(v: HTMLElement) {
    const t = S.tenant; const s = t.settings;
    v.innerHTML = `<h1 class="kx-h1">${h(T.nav.settings)}</h1><div class="kx-grid2">
      <form class="kx-panel kx-form" id="kx-set"><h2>${h(T.settings.company)}</h2>
        <label>${h(T.settings.name)}<input name="name" value="${h(t.company.name)}" maxlength="120"></label>
        <div class="kx-row2"><label>${h(T.settings.sector)}<input name="sector" value="${h(t.company.sector || '')}" maxlength="80"></label>
        <label>${h(T.settings.lang)}<select name="lang"><option value="ar" ${t.company.lang !== 'en' ? 'selected' : ''}>العربية</option><option value="en" ${t.company.lang === 'en' ? 'selected' : ''}>English</option></select></label></div>
        <h2>${h(T.settings.review)}</h2>
        <div class="kx-row2"><label>${h(T.settings.freq)}<select name="freq"><option value="monthly" ${s.freq !== 'quarterly' ? 'selected' : ''}>${h(T.settings.monthly)}</option><option value="quarterly" ${s.freq === 'quarterly' ? 'selected' : ''}>${h(T.settings.quarterly)}</option></select></label>
        <label>${h(T.settings.scale)}<select name="scale">${[3, 4, 5, 10].map((x) => `<option ${s.scale === x ? 'selected' : ''}>${x}</option>`).join('')}</select></label></div>
        <label>${h(T.settings.wKpi)}: <b id="kx-wv">${fmt(s.w_kpi)}% / ${h(T.settings.wComp)} ${fmt(100 - s.w_kpi)}%</b><input type="range" name="w_kpi" min="0" max="100" step="5" value="${s.w_kpi}"></label>
        <div class="kx-row2"><label>${h(T.settings.cap)}<select name="cap">${[100, 110, 120, 150].map((x) => `<option value="${x}" ${s.cap === x ? 'selected' : ''}>${x}%</option>`).join('')}</select></label>
        <label class="kx-check"><input type="checkbox" name="self" ${s.self ? 'checked' : ''}> ${h(T.settings.self)}</label></div>
        <h2>${h(T.settings.bands)}</h2><div id="kx-bands">${(s.bands || []).map((b: Any) => `<div class="kx-row2 kx-band"><label>${h(T.settings.bandMin)}<input data-b="min" inputmode="decimal" value="${h(b.min)}"></label><label>${h(T.settings.bandName)}<input data-b="name" value="${h(b.name)}" maxlength="40"></label></div>`).join('')}</div>
        <button class="btn btn-navy" type="submit" ${writable() ? '' : 'disabled'}>${h(T.settings.save)}</button></form>
      <div><form class="kx-panel kx-form" id="kx-comps"><h2>${h(T.settings.comps)}</h2><div id="kx-cl">${(t.competencies || []).map((c: Any) => `<div class="kx-inline" data-c="${h(c.id)}"><input value="${h(c.name)}" maxlength="80"><button type="button" class="kx-link danger" data-cd>${h(T.jobs.del)}</button></div>`).join('')}</div>
          <button type="button" class="btn btn-ghost kx-sm" id="kx-cadd">${h(T.settings.addComp)}</button><button class="btn btn-navy" type="submit" ${writable() ? '' : 'disabled'}>${h(T.settings.saveComps)}</button></form>
        <div class="kx-panel"><h2>${h(T.settings.planTitle)}</h2><p>${h(t.plan.state === 'active' ? T.plan.active : t.plan.state === 'trial' ? T.plan.trial.replace('{n}', String(Math.max(0, Math.ceil((Date.parse(t.plan.trial_ends) - Date.now()) / 86400000)))) : T.plan[t.plan.state])}</p><p class="kx-muted">${h(T.settings.planId)}: <span dir="ltr">${h(t.id)}</span></p><a class="btn btn-ghost kx-sm" href="${h(C.links.book)}">${h(T.plan.contact)}</a></div>
        ${t.log ? `<div class="kx-panel"><h2>${h(T.settings.log)}</h2><ul class="kx-log">${t.log.slice(0, 30).map((l: Any) => `<li><small dir="ltr">${h(new Date(l.t).toLocaleString(ar ? 'ar-SA-u-nu-latn-ca-gregory' : 'en-GB'))}</small> ${h(l.u)} · ${h(l.a)} ${h(l.x || '')}</li>`).join('')}</ul></div>` : ''}</div></div>`;
    const f = document.getElementById('kx-set') as HTMLFormElement;
    f.querySelector('[name=w_kpi]')!.addEventListener('input', (e) => { const x = +(e.target as HTMLInputElement).value; document.getElementById('kx-wv')!.textContent = `${fmt(x)}% / ${T.settings.wComp} ${fmt(100 - x)}%`; });
    f.addEventListener('submit', async (e) => {
      e.preventDefault(); const fd = new FormData(f);
      const bands = Array.from(f.querySelectorAll('.kx-band')).map((b) => ({ min: (b.querySelector('[data-b=min]') as HTMLInputElement).value, name: (b.querySelector('[data-b=name]') as HTMLInputElement).value }));
      const r = await api('save_settings', { company: { name: fd.get('name'), sector: fd.get('sector'), lang: fd.get('lang') }, settings: { freq: fd.get('freq'), scale: +fd.get('scale')!, w_kpi: +fd.get('w_kpi')!, cap: +fd.get('cap')!, self: !!fd.get('self'), bands } });
      if (!r.success) return toast(errText(r), true); apply(r); toast(T.entry.saved); render();
    });
    const cl = document.getElementById('kx-cl')!;
    const bindDel = () => cl.querySelectorAll<HTMLButtonElement>('[data-cd]').forEach((b) => { b.onclick = () => b.parentElement!.remove(); });
    bindDel();
    document.getElementById('kx-cadd')!.addEventListener('click', () => { const div = document.createElement('div'); div.className = 'kx-inline'; div.dataset.c = ''; div.innerHTML = `<input maxlength="80"><button type="button" class="kx-link danger" data-cd>${h(T.jobs.del)}</button>`; cl.appendChild(div); bindDel(); (div.querySelector('input') as HTMLInputElement).focus(); });
    document.getElementById('kx-comps')!.addEventListener('submit', async (e) => {
      e.preventDefault();
      const list = Array.from(cl.querySelectorAll<HTMLElement>('[data-c]')).map((x) => ({ id: x.dataset.c, name: (x.querySelector('input') as HTMLInputElement).value })).filter((x) => x.name.trim());
      const r = await api('save_competencies', { list }); if (!r.success) return toast(errText(r), true); apply(r); toast(T.entry.saved); render();
    });
  }

  // ───────── start ─────────
  const qs = new URLSearchParams(location.search);
  if (qs.get('signup') === '1') S.auth.tab = 'up';
  render();
}
