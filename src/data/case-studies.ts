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
  /** Paths under public/, e.g. 'work/perfect-choice.webp'. The first image is the cover. {lang} becomes 'ar' or 'en'. */
  images: { src: string; alt: L; w?: number; h?: number }[];
  /** Only a real quote the client approved for publishing. */
  quote?: { text: L; name: string; role: L };
  /** Services used, e.g. { ar: 'تصميم المواقع', en: 'Web design' }. */
  services: L[];
  /** Live links, e.g. the client's website. */
  links: { label: L; href: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    // Oxira's own product: facts from classti.com, no client metrics.
    slug: 'classti',
    client: { ar: 'Classti', en: 'Classti' },
    sector: { ar: 'التعليم · منتج من أوكسيرا', en: 'Education · an Oxira product' },
    challenge: {
      ar: 'المدارس الأهلية تدير يومها بين أنظمة وجداول وملفات ورسائل متفرقة: القبول في مكان، والرسوم في مكان، والحضور والجداول في مكان ثالث، وولي الأمر لا يرى إلا جزءاً من الصورة. وأي نظام في السعودية يجب أن يتوافق مع الفوترة الإلكترونية (ZATCA) ونفاذ ونظام حماية البيانات الشخصية.',
      en: "Private schools run their day across scattered systems, spreadsheets and messages: admissions in one place, fees in another, attendance and timetables in a third, and parents only see part of the picture. In Saudi Arabia, any school system also has to work with ZATCA e-invoicing, Nafath and the Personal Data Protection Law.",
    },
    solution: {
      ar: 'صممت أوكسيرا Classti وطوّرته وتشغّله كمنتج خاص بها: منصة ويب واحدة لقيادة المدرسة (المهام ومسارات الاعتماد، الجداول التلقائية وحصص الانتظار، المالية والتحصيل وفواتير ZATCA، القبول الإلكتروني، تقييم المعلمين، رادار الطلاب والحصص المباشرة)، ولوحة للمالك تجمع كل الفروع في شاشة واحدة.\n\nوبجانب المنصة ثلاثة تطبيقات جوال: تطبيق Classti لأولياء الأمور والطلاب، وتطبيق المعلمين، وتطبيق الحضانات. البنية متعددة المدارس بعزل بيانات كل مدرسة وصلاحيات دقيقة لكل دور وتحقق بخطوتين وسجل تدقيق، مع تكاملات ZATCA ونفاذ وبوابات الدفع وGoogle Classroom وMicrosoft Teams، وواجهة عربية وإنجليزية كاملة، وإمكانية نشر المنصة والتطبيقات باسم المدرسة وشعارها.',
      en: "Oxira designed, built and runs Classti as its own product: one web platform to lead the school (tasks and approval paths, automatic timetables and cover lessons, finance and collections with ZATCA invoices, online admissions, teacher evaluation, student radar and live classes), plus an owner dashboard that puts every branch on one screen.\n\nAround the platform sit three mobile apps: the Classti app for parents and students, the teacher app and the nursery app. The platform is multi-school, with per-school data isolation, granular role permissions, two-step verification and an audit log, integrations with ZATCA, Nafath, payment gateways, Google Classroom and Microsoft Teams, a full Arabic and English interface, and the option to publish the platform and apps under the school's own name and logo.",
    },
    results: [
      { label: { ar: 'تطبيقات منشورة على Google Play', en: 'Apps live on Google Play' }, value: '3' },
      { label: { ar: 'تطبيقات منشورة على App Store', en: 'Apps live on the App Store' }, value: '2' },
      { label: { ar: 'تكاملات حكومية', en: 'Government integrations' }, value: 'ZATCA · Nafath' },
      { label: { ar: 'المراحل', en: 'Stages covered' }, value: 'KG – 12' },
    ],
    images: [
      { src: 'products/classti/dashboard-{lang}.webp', w: 960, h: 600, alt: { ar: 'لوحة تحكم Classti: ما يحتاج انتباهك اليوم، الحضور والتحصيل وجدول اليوم', en: "Classti dashboard: what needs attention today, attendance, collections and today's schedule" } },
      { src: 'products/classti/owner-{lang}.webp', w: 800, h: 500, alt: { ar: 'لوحة مالك المدرسة: مؤشرات كل الفروع (بيانات تجريبية)', en: 'School owner dashboard: KPIs of every branch (sample data)' } },
      { src: 'products/classti/timetable-{lang}.webp', w: 720, h: 498, alt: { ar: 'توليد الجدول تلقائياً', en: 'Automatic timetable generation' } },
      { src: 'products/classti/radar-{lang}.webp', w: 720, h: 498, alt: { ar: 'رادار الطلاب', en: 'Student radar' } },
      { src: 'products/classti/t-home-{lang}.webp', w: 560, h: 1214, alt: { ar: 'تطبيق المعلم: جدول اليوم والمهام', en: "Teacher app: today's timetable and tasks" } },
      { src: 'products/classti/nu-timeline-{lang}.webp', w: 560, h: 1214, alt: { ar: 'تطبيق الحضانة: ملخص يوم الطفل', en: "Nursery app: the child's daily summary" } },
    ],
    services: [
      { ar: 'تطوير المنصات', en: 'Platform development' },
      { ar: 'تطبيقات الجوال', en: 'Mobile apps' },
      { ar: 'التكامل مع ZATCA ونفاذ', en: 'ZATCA & Nafath integration' },
      { ar: 'تصميم تجربة المستخدم', en: 'UX design' },
    ],
    links: [
      { label: { ar: 'موقع Classti', en: 'Classti website' }, href: 'https://classti.com/' },
      { label: { ar: 'احجز عرضاً مجانياً', en: 'Book a free demo' }, href: 'https://classti.com/demo' },
      { label: { ar: 'تطبيق Classti على Google Play', en: 'Classti app on Google Play' }, href: 'https://play.google.com/store/apps/details?id=com.classti.student' },
      { label: { ar: 'تطبيق المعلم على App Store', en: 'Teacher app on the App Store' }, href: 'https://apps.apple.com/app/id6781750858' },
    ],
  },
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
