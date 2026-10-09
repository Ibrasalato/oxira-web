// api.oxira.sa: forwards website/app requests to the automation backend (n8n webhooks).
// Moving the backend later only needs ORIGIN changed here; the website and partners keep using api.oxira.sa.
const ORIGIN = 'https://ibrasalato.app.n8n.cloud/webhook/';
const MAX_BODY = 6 * 1024 * 1024;

export default {
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname.replace(/^\/+|\/+$/g, '');
    if (!path) return new Response('Oxira API', { status: 200, headers: { 'content-type': 'text/plain; charset=utf-8' } });
    if (!/^[a-z0-9][a-z0-9-]{1,80}$/.test(path)) return new Response('Not found', { status: 404 });
    if (!['GET', 'POST', 'OPTIONS', 'HEAD'].includes(req.method)) return new Response('Method not allowed', { status: 405 });
    if (Number(req.headers.get('content-length') || 0) > MAX_BODY) return new Response('Payload too large', { status: 413 });

    const headers = new Headers(req.headers);
    const ip = req.headers.get('cf-connecting-ip') || '';
    headers.set('x-oxira-ip', ip);
    headers.set('x-forwarded-for', ip);
    headers.set('x-real-ip', ip);
    headers.delete('host');

    const res = await fetch(ORIGIN + path + url.search, {
      method: req.method,
      headers,
      body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req.body,
      redirect: 'manual',
    });
    const out = new Response(res.body, res);
    out.headers.set('x-served-by', 'oxira-api');
    return out;
  },
};
