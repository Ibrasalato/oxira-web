// Static preview of every template in every language, used by the template galleries
// (each card loads its preview lazily instead of embedding the whole page).
import type { APIRoute } from 'astro';
import { renderSite } from '../../../builder/render';
import { sampleSpec, templateIds, siteLangs, type SiteLang } from '../../../builder/spec';
import { asset } from '../../../lib/routes';

export function getStaticPaths() {
  return siteLangs.flatMap((lang) => templateIds.map((id) => ({ params: { lang, id } })));
}

export const GET: APIRoute = ({ params }) => {
  const html = renderSite(sampleSpec(params.id!, params.lang as SiteLang), { fontBase: asset('builder/fonts'), year: 2026 })
    .replace('<head>', '<head><meta name="robots" content="noindex">');
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
};
