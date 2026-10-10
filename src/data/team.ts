// Leadership shown on the About page. The "Leadership" section appears only when this list has entries.
// Add real people only, with their approval. Photos go in public/team/ (square, at least 400×400, .webp or .jpg).
// See README: "Filling in case studies, team and registration".

export interface TeamMember {
  name: { ar: string; en: string };
  role: { ar: string; en: string };
  /** Path under public/, e.g. 'team/jane-doe.webp'. Leave out to show initials. */
  photo?: string;
  /** Full LinkedIn profile URL. */
  linkedin?: string;
  /** One or two sentences. */
  bio?: { ar: string; en: string };
}

export const team: TeamMember[] = [
  // Example (keep commented until you have real, approved details):
  // {
  //   name: { ar: 'الاسم', en: 'Full Name' },
  //   role: { ar: 'المؤسس والرئيس التنفيذي', en: 'Founder & CEO' },
  //   photo: 'team/full-name.webp',
  //   linkedin: 'https://www.linkedin.com/in/username/',
  //   bio: { ar: 'نبذة قصيرة.', en: 'A short bio.' },
  // },
];
