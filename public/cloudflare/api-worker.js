// api.oxira.sa: one public address for the Oxira backend.
// - /api/*, /hubs/*, /health, /swagger, /openapi/* → the Oxira API (ASP.NET Core on IIS, repo oxira-web-api), when API_ORIGIN is set.
// - /<slug> (the n8n webhooks the site used before) → n8n, unchanged, so old pages and partners keep working during the switch.
// Set API_ORIGIN to the IIS server's address (for example https://origin-api.oxira.sa) and deploy this worker on api.oxira.sa.
const ORIGIN = 'https://n8n.oxira.sa/webhook/';
const API_ORIGIN = '';
const MAX_BODY = 6 * 1024 * 1024;
const API_MAX_BODY = 20 * 1024 * 1024;

const isApiPath = (p) => p === 'health' || p === 'swagger' || /^(api|hubs|swagger|openapi)\//.test(p);

function forwardHeaders(req) {
  const headers = new Headers(req.headers);
  const ip = req.headers.get('cf-connecting-ip') || '';
  headers.set('x-oxira-ip', ip);
  headers.set('x-forwarded-for', ip);
  headers.set('x-real-ip', ip);
  headers.delete('host');
  return headers;
}

export default {
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname.replace(/^\/+|\/+$/g, '');
    if (!path) return new Response('Oxira API', { status: 200, headers: { 'content-type': 'text/plain; charset=utf-8' } });

    if (API_ORIGIN && isApiPath(path)) {
      if (Number(req.headers.get('content-length') || 0) > API_MAX_BODY) return new Response('Payload too large', { status: 413 });
      const target = API_ORIGIN.replace(/\/$/, '') + url.pathname + url.search;
      // SignalR WebSockets pass straight through
      if ((req.headers.get('upgrade') || '').toLowerCase() === 'websocket') return fetch(target, req);
      const res = await fetch(target, {
        method: req.method,
        headers: forwardHeaders(req),
        body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req.body,
        redirect: 'manual',
      });
      const out = new Response(res.body, res);
      out.headers.set('x-served-by', 'oxira-api');
      return out;
    }

    if (!/^[a-z0-9][a-z0-9-]{1,80}$/.test(path)) return new Response('Not found', { status: 404 });
    if (!['GET', 'POST', 'OPTIONS', 'HEAD'].includes(req.method)) return new Response('Method not allowed', { status: 405 });
    if (Number(req.headers.get('content-length') || 0) > MAX_BODY) return new Response('Payload too large', { status: 413 });

    const res = await fetch(ORIGIN + path + url.search, {
      method: req.method,
      headers: forwardHeaders(req),
      body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req.body,
      redirect: 'manual',
    });
    const out = new Response(res.body, res);
    out.headers.set('x-served-by', 'oxira-api');
    return out;
  },
};
