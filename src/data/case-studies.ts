// Case studies: one page per entry at /work/<slug>/ (Arabic) and /en/work/<slug>/ (English).
// Pages are generated only for entries in this list, and the Work page shows "Read the case study"
// only for projects that have one (match `slug` to the project slug in src/i18n/content.ts → work.projects).
// Use real, client-approved facts only: no invented numbers, quotes or results.
// See README: "Filling in case studies, team and registration".

type L = { ar: string; en: string };

export interface CaseStudy {
  /** URL part, lowercase with dashes. Same as the Work project slug to link it from the Work page. */
  slug: string;
  client: L;
  sector: L;
  year?: number;
  /** What the client needed (one short paragraph). Also used as the page description. */
  challenge: L;
  /** What Oxira built and how (one or two short paragraphs; separate paragraphs with a blank line). */
  solution: L;
  /** Measured, client-confirmed outcomes, e.g. { label: { ar: 'مدة الإطلاق', en: 'Time to launch' }, value: '3 weeks' }. */
  results: { label: L; value: string }[];
  /** Paths under public/, e.g. 'work/perfect-choice.webp'. The first image is the cover. */
  images: { src: string; alt: L }[];
  /** Only a real quote the client approved for publishing. */
  quote?: { text: L; name: string; role: L };
  /** Services used, e.g. { ar: 'تصميم المواقع', en: 'Web design' }. */
  services: L[];
  /** Live links, e.g. the client's website. */
  links: { label: L; href: string }[];
}

export const caseStudies: CaseStudy[] = [
  // Example (keep commented until the client approves the content):
  // {
  //   slug: 'perfect-choice',
  //   client: { ar: 'Perfect Choice', en: 'Perfect Choice' },
  //   sector: { ar: 'فعاليات', en: 'Events' },
  //   year: 2025,
  //   challenge: { ar: '…', en: '…' },
  //   solution: { ar: '…', en: '…' },
  //   results: [{ label: { ar: '…', en: '…' }, value: '…' }],
  //   images: [{ src: 'work/perfect-choice.webp', alt: { ar: 'الصفحة الرئيسية لموقع Perfect Choice', en: 'Perfect Choice website home page' } }],
  //   quote: { text: { ar: '…', en: '…' }, name: '…', role: { ar: '…', en: '…' } },
  //   services: [{ ar: 'تصميم المواقع', en: 'Web design' }],
  //   links: [{ label: { ar: 'زيارة الموقع', en: 'Visit the website' }, href: 'https://…' }],
  // },
];
