// Oxira backend client.
//
// The pages call the Oxira backend with URLs like https://api.oxira.sa/<slug> (the n8n webhooks).
// When the site is built with PUBLIC_API_URL (e.g. https://api.oxira.sa), oxFetch() sends every one of those calls
// to the ASP.NET Core API instead (repo Ibrasalato/oxira-web-api): it maps <slug> + action to a REST route, sends JSON,
// and keeps the unified Oxira account session (JWT access token + rotating refresh token, renewed silently).
// Without PUBLIC_API_URL, oxFetch() is a plain fetch(), so today's n8n behaviour is unchanged.
//
// The API answers with the same shapes the pages already read ({success, reason, …}), so the pages stay as they are.

export const API_URL = String(import.meta.env.PUBLIC_API_URL || '').replace(/\/$/, '');
export const useApi = API_URL !== '';
export const N8N = 'https://api.oxira.sa';

/** Where uploaded images are served (logo, photos, avatars, ticket screenshots). */
export const imageBase = useApi ? `${API_URL}/api/images/` : 'https://oxira-sites.oxira-sa.workers.dev/_img/';

// ───── session (JWT) ─────
const SESSION_KEY = 'oxira-session';
const PORTAL_KEY = 'oxira-portal-k';
interface Session { token: string; expiresAt: number; refreshToken: string }
interface AuthResult { token: string; expiresAt: string; refreshToken: string; refreshExpiresAt: string }

const read = (): Session | null => {
  try { const raw = localStorage.getItem(SESSION_KEY); return raw ? (JSON.parse(raw) as Session) : null; } catch { return null; }
};
let session: Session | null = typeof window === 'undefined' ? null : read();

function saveSession(r: AuthResult | null) {
  session = r ? { token: r.token, expiresAt: Date.parse(r.expiresAt), refreshToken: r.refreshToken } : null;
  try {
    if (session) { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); localStorage.setItem(PORTAL_KEY, session.token); }
    else localStorage.removeItem(SESSION_KEY);
  } catch { /* storage blocked */ }
}

if (typeof window !== 'undefined') window.addEventListener('storage', (e) => { if (e.key === SESSION_KEY) session = read(); });

/** Signed in with the API (an access or refresh token is kept). */
export const hasSession = () => !!(useApi && session);
export const signOutLocal = () => saveSession(null);

let refreshing: Promise<boolean> | null = null;
/** One refresh at a time; another tab may already have rotated the token. */
function refresh(): Promise<boolean> {
  if (!session) return Promise.resolve(false);
  const used = session.refreshToken;
  refreshing ??= (async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/refresh`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ refreshToken: used }) });
      if (res.ok) { saveSession(await res.json()); return true; }
      session = read();
      if (session && session.refreshToken !== used) return true;
      if (res.status === 401) saveSession(null);
      return false;
    } catch { return false; } finally { refreshing = null; }
  })();
  return refreshing;
}

/** A valid access token (renewed a minute before it ends), or null. */
export async function accessToken(): Promise<string | null> {
  if (!session) return null;
  if (session.expiresAt - Date.now() < 60_000) await refresh();
  return session?.token ?? null;
}

// ───── routes: n8n slug (+ action) → REST ─────
type Data = Record<string, unknown>;
interface Route { method: 'GET' | 'POST' | 'PUT' | 'DELETE'; path: string; auth?: boolean; send?: boolean }
const P = (path: string, auth = false): Route => ({ method: 'POST', path, auth, send: true });
const G = (path: string, auth = false): Route => ({ method: 'GET', path, auth });

const simple: Record<string, Route> = {
  'oxira-website-contact': P('/api/contact'),
  'oxira-partner-signup': P('/api/partners'),
  'oxira-testimonial': P('/api/testimonials'),
  'oxira-site-audit': P('/api/audit'),
  'oxira-bundle-order': P('/api/orders/bundle'),
  'oxira-website-chat': P('/api/chat'),
  'oxira-agent-try': P('/api/agent/demos'),
  'oxira-agent-chat': P('/api/agent/chat'),
  'oxira-agent-subscribe': P('/api/agent/subscriptions'),
  'oxira-site-builder': P('/api/studio/builder'),
  'oxira-studio-upload': P('/api/studio/uploads'),
  'oxira-studio-share': P('/api/studio/share'),
  'oxira-site-order': P('/api/orders/site'),
  'oxira-site-checkout': P('/api/orders/checkout'),
  'oxira-site-payment-status': P('/api/orders/payment-status'),
  'oxira-status': G('/api/status'),
  'oxira-proof': G('/api/proof'),
};

const id = (d: Data, k = 'id') => encodeURIComponent(String(d[k] ?? ''));

function route(slug: string, d: Data): Route | null {
  if (slug === 'oxira-agent-demo') return G(`/api/agent/demos/${id(d, 'd')}`);
  if (simple[slug]) return simple[slug];
  const a = String(d.action || '');
  switch (slug) {
    case 'oxira-auth':
      return ({
        signup: P('/api/auth/signup'), verify: P('/api/auth/verify'), login: P('/api/auth/login'), resend: P('/api/auth/resend'),
        forgot: P('/api/auth/forgot'), reset: P('/api/auth/reset'), me: G('/api/auth/me', true),
        profile: { method: 'PUT', path: '/api/auth/profile', auth: true, send: true }, password: P('/api/auth/password', true),
        switch: P('/api/auth/switch', true), sessions: G('/api/auth/sessions', true), revoke: P(`/api/auth/sessions/${id(d)}/revoke`, true),
        revoke_all: P('/api/auth/sessions/revoke-all', true), twofa: P('/api/auth/twofa', true), logout: P('/api/auth/signout', true),
      } as Record<string, Route>)[a] ?? null;
    case 'oxira-portal':
      return a === 'load' ? G('/api/portal', true) : ['subscribe', 'cancel', 'booking', 'menu', 'settings', 'checkin'].includes(a) ? P(`/api/portal/${a}`, true) : null;
    case 'oxira-account':
      if (['notifications', 'invoices', 'tickets', 'team', 'partner'].includes(a)) return G(`/api/account/${a}`, true);
      if (a === 'ticket_new') return P('/api/account/tickets', true);
      if (a === 'ticket_reply') return P(`/api/account/tickets/${id(d)}/reply`, true);
      if (['ticket_read', 'ticket_close', 'ticket_reopen'].includes(a)) return P(`/api/account/tickets/${id(d)}/${a.slice(7)}`, true);
      if (a === 'team_invite') return P('/api/account/team', true);
      if (a === 'team_role') return { method: 'PUT', path: `/api/account/team/${id(d)}`, auth: true, send: true };
      if (a === 'team_remove') return { method: 'DELETE', path: `/api/account/team/${id(d)}`, auth: true };
      return null;
    case 'oxira-site-ext':
      return a === 'add' ? P('/api/sites/external', true) : a === 'check' ? P(`/api/sites/external/${id(d, 'order_id')}/check`, true) : null;
    case 'oxira-seo':
      return a === 'list' ? G(`/api/seo/${id(d, 'order_id')}`, true) : a === 'publish' || a === 'reject' ? P(`/api/seo/${a}`, true) : null;
    case 'oxira-seo-settings':
      return ({ save: P('/api/seo/settings', true), wp_connect: P('/api/seo/wordpress', true), wp_disconnect: P('/api/seo/wordpress/disconnect', true) } as Record<string, Route>)[a] ?? null;
    case 'oxira-social':
      return a === 'list' ? G(`/api/social/${id(d, 'order_id')}`, true)
        : ({ meta_start: P('/api/social/meta/start', true), meta_disconnect: P('/api/social/meta/disconnect', true), meta_select: P('/api/social/meta/select', true),
          save_brief: P('/api/social/brief', true), approve: P('/api/social/approve', true), reject: P('/api/social/reject', true) } as Record<string, Route>)[a] ?? null;
  }
  return null;
}

/** URLSearchParams / JSON text → one object; a "data" field holding JSON (the account page's format) is merged in. */
function toData(body: BodyInit | null | undefined, query: URLSearchParams): Data {
  const out: Data = {};
  query.forEach((v, k) => { out[k] = v; });
  if (body instanceof URLSearchParams) {
    for (const k of new Set(body.keys())) { const all = body.getAll(k); out[k] = all.length > 1 ? all : all[0]; }
  } else if (typeof body === 'string' && body.trim().startsWith('{')) {
    try { Object.assign(out, JSON.parse(body)); } catch { /* not JSON */ }
  }
  if (typeof out.data === 'string' && out.data.trim().startsWith('{')) {
    try { Object.assign(out, JSON.parse(out.data as string)); delete out.data; } catch { /* keep */ }
  }
  return out;
}

const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
const EXPIRED_REASON: Record<string, string> = { 'oxira-seo': 'expired', 'oxira-seo-settings': 'expired', 'oxira-social': 'expired', 'oxira-site-ext': 'expired' };

/** A magic link from the API (?k=<40 hex>) becomes a session the first time the account page uses it. */
async function completeMagicLink(code: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/api/auth/magic-link/complete`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) });
    if (!res.ok) return false;
    saveSession(await res.json());
    return true;
  } catch { return false; }
}

/**
 * fetch() for Oxira backend calls. Pass the same URL and body the page always used (https://api.oxira.sa/<slug>, URLSearchParams, JSON or FormData).
 */
export async function oxFetch(input: string, init: RequestInit = {}): Promise<Response> {
  if (!useApi || !input.startsWith(N8N + '/')) return fetch(input, init);
  const url = new URL(input);
  const slug = url.pathname.replace(/^\/+|\/+$/g, '');
  const isForm = typeof FormData !== 'undefined' && init.body instanceof FormData;
  const data = isForm ? {} : toData(init.body as BodyInit | null | undefined, url.searchParams);
  const r = route(slug, data);
  if (!r) return json({ success: false, reason: 'bad_request', error: 'bad_request' }, 400);

  const k = typeof data.k === 'string' ? data.k : '';
  if (!session && /^[a-f0-9]{40}$/.test(k)) await completeMagicLink(k);
  delete data.k;
  delete data.action;
  if (r.path === '/api/auth/signout') data.refreshToken = session?.refreshToken ?? '';

  const send = async (retried = false): Promise<Response> => {
    const headers: Record<string, string> = { Accept: 'application/json' };
    const token = await accessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    let body: BodyInit | undefined;
    if (r.send) {
      if (isForm) body = init.body as FormData;
      else { headers['Content-Type'] = 'application/json'; body = JSON.stringify(data); }
    }
    const res = await fetch(API_URL + r.path, { method: r.method, headers, body, signal: init.signal, keepalive: init.keepalive });
    if (res.status === 401 && token && !retried && (await refresh())) return send(true);
    return res;
  };

  let res: Response;
  try { res = await send(); } catch (e) { if ((e as Error)?.name === 'AbortError') throw e; return json({ success: false, reason: 'network', error: 'network' }, 503); }
  if (r.path === '/api/auth/signout') signOutLocal();
  const text = await res.text();
  let out: any = null;
  try { out = text ? JSON.parse(text) : {}; } catch { out = { success: false, reason: 'server', error: 'server' }; }
  if (res.status === 401 && r.auth) {
    signOutLocal();
    return json({ ...out, success: false, reason: EXPIRED_REASON[slug] ?? 'session' }, 401);
  }
  if (out && typeof out === 'object' && typeof out.token === 'string' && typeof out.refreshToken === 'string') {
    saveSession(out);
    out.k = out.token; // the account page keeps "k" as its signed-in marker
  }
  return json(out, res.status);
}

// ───── live updates (SignalR JSON protocol over WebSockets, no extra library) ─────
const RS = '\u001e';
/**
 * Listens to a SignalR hub of the API: /hubs/account (signed in: "notification", "ticket", "payment") or /hubs/orders ("payment").
 * invoke: hub methods to call once connected, e.g. [['WatchOrder', 1234]]. Returns a function that closes the connection.
 */
export function live(hub: 'account' | 'orders', on: Record<string, (payload: any) => void>, invoke: [string, ...unknown[]][] = []): () => void {
  if (!useApi || typeof WebSocket === 'undefined') return () => undefined;
  let ws: WebSocket | null = null;
  let closed = false;
  let ping = 0;
  let retry = 0;
  const open = async () => {
    try {
      const token = hub === 'account' ? await accessToken() : null;
      if (hub === 'account' && !token) return;
      const q = token ? `&access_token=${encodeURIComponent(token)}` : '';
      const neg = await fetch(`${API_URL}/hubs/${hub}/negotiate?negotiateVersion=1${q}`, { method: 'POST' });
      if (!neg.ok) throw new Error('negotiate');
      const { connectionToken } = await neg.json();
      ws = new WebSocket(`${API_URL.replace(/^http/, 'ws')}/hubs/${hub}?id=${encodeURIComponent(connectionToken)}${q}`);
      ws.onopen = () => {
        ws!.send(JSON.stringify({ protocol: 'json', version: 1 }) + RS);
        for (const [target, ...args] of invoke) ws!.send(JSON.stringify({ type: 1, target, arguments: args }) + RS);
        ping = window.setInterval(() => { try { ws?.send(JSON.stringify({ type: 6 }) + RS); } catch { /* reconnects */ } }, 15000);
        retry = 0;
      };
      ws.onmessage = (e) => {
        for (const part of String(e.data).split(RS)) {
          if (!part) continue;
          try { const m = JSON.parse(part); if (m.type === 1 && on[m.target]) on[m.target](m.arguments?.[0]); } catch { /* ignore */ }
        }
      };
      ws.onclose = () => { clearInterval(ping); if (!closed) setTimeout(open, Math.min(30000, 2000 * 2 ** retry++)); };
    } catch {
      if (!closed) setTimeout(open, Math.min(30000, 2000 * 2 ** retry++));
    }
  };
  open();
  return () => { closed = true; clearInterval(ping); ws?.close(); };
}
