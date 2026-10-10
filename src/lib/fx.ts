// Local currency hint for SAR prices (shared, loaded once per page by components/Fx.astro and FxNote.astro).
// The visitor's currency is picked in <head> by the inline script in layouts/Base.astro (timezone, or a saved choice)
// and stored on <html data-fx="EGP">. Saudi visitors get no attribute, so nothing changes for them.
// Each price has an empty <span class="fx" data-fx-sar="399">; CSS reserves its line, so filling it causes no layout shift.

import { FX_CURRENCIES } from './fx-currencies';
const STORE_KEY = 'oxira-cur';
const RATES_KEY = 'oxira-fx-rates';
const RATES_URL = 'https://open.er-api.com/v6/latest/SAR';

// Fallback: units of each currency per 1 SAR, used until (or if) live rates load.
// Written 2026-10-10. GCC rates follow the US dollar pegs and barely move; EUR, GBP and EGP are rough
// approximations and should be refreshed now and then (live rates replace them whenever the fetch works).
const FALLBACK: Record<string, number> = {
  SAR: 1, USD: 0.2667, EUR: 0.229, GBP: 0.199, AED: 0.9793, EGP: 12.9, QAR: 0.9707, KWD: 0.0819, BHD: 0.1003, OMR: 0.1025,
};

let rates: Record<string, number> = FALLBACK;
const html = document.documentElement;
const locale = html.lang === 'ar' ? 'ar-SA-u-nu-latn' : html.lang || 'en';

const current = () => html.getAttribute('data-fx');

function fill() {
  const cur = current();
  if (!cur || cur === 'SAR') return;
  const rate = rates[cur];
  document.querySelectorAll<HTMLElement>('[data-fx-sar]').forEach((el) => {
    if (!rate) { el.textContent = ''; return; }
    const v = Number(el.dataset.fxSar) * rate;
    const nf = new Intl.NumberFormat(locale, { maximumFractionDigits: v < 100 ? 1 : 0 });
    // Isolate so "≈ 1,234 EGP" reads correctly inside Arabic text.
    el.textContent = `⁦≈ ${nf.format(v)} ${cur}⁩`;
  });
  document.querySelectorAll<HTMLSelectElement>('select.fx-pick').forEach((s) => { s.value = cur; });
}

function syncPickers() {
  const cur = current();
  if (cur) document.querySelectorAll<HTMLSelectElement>('select.fx-pick').forEach((s) => { s.value = cur; });
}

/** Live rates fetched earlier in this session, if any. */
function cachedRates(): boolean {
  try {
    const cached = sessionStorage.getItem(RATES_KEY);
    if (cached) { rates = { ...FALLBACK, ...JSON.parse(cached) }; return true; }
  } catch { /* storage blocked or bad data */ }
  return false;
}

async function loadRates() {
  try {
    const res = await fetch(RATES_URL);
    const d = await res.json();
    if (d && d.result === 'success' && d.rates) {
      const picked: Record<string, number> = {};
      FX_CURRENCIES.forEach((c) => { if (typeof d.rates[c] === 'number' && d.rates[c] > 0) picked[c] = d.rates[c]; });
      rates = { ...FALLBACK, ...picked };
      try { sessionStorage.setItem(RATES_KEY, JSON.stringify(picked)); } catch { /* ignore */ }
    }
  } catch { /* offline or blocked: keep the fallback table */ }
}

document.addEventListener('change', (e) => {
  const s = e.target as HTMLSelectElement;
  if (!s.matches?.('select.fx-pick')) return;
  html.setAttribute('data-fx', s.value);
  try { localStorage.setItem(STORE_KEY, s.value); } catch { /* ignore */ }
  fill();
});

if (current()) {
  const cached = cachedRates();
  syncPickers();
  fill();                              // immediately, with this session's rates or the fallback table
  if (!cached) loadRates().then(fill); // then once with live rates
}
