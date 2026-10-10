// Copy for the company pages that exist in Arabic and English only:
// /status/ (service status), /careers/ (join the team), /press/ (press and brand kit) and /work/<slug>/ (case studies).
// Only facts already stated elsewhere on the site. No invented openings, numbers or claims.
import type { Lang } from './content';

export type CpLang = 'ar' | 'en';
export const cpLangs: Lang[] = ['ar', 'en'];
export const cpPaths = ['/status/', '/careers/', '/press/'] as const;
/** For links from pages in any language: these pages exist only in Arabic and English. */
export const cpLang = (lang: Lang): CpLang | null => (lang === 'ar' || lang === 'en' ? lang : null);

export const STATUS_ENDPOINT = 'https://api.oxira.sa/oxira-status';
export const statusKeys = ['web', 'events', 'design', 'api', 'automation'] as const;
export type StatusKey = (typeof statusKeys)[number];

export const footerText = {
  ar: { careers: 'الوظائف', press: 'الصحافة والهوية', status: 'حالة الخدمات' },
  en: { careers: 'Careers', press: 'Press & brand', status: 'Status' },
};

export const statusText = {
  ar: {
    title: 'حالة خدمات أوكسيرا | أوكسيرا',
    description: 'حالة خدمات أوكسيرا لحظة بلحظة: موقع oxira.sa وOxira Events وOxira Design وواجهة الخدمات والأتمتة، مع نسبة التوفر آخر 24 ساعة.',
    kicker: 'حالة الخدمات',
    h1: 'حالة خدمات أوكسيرا',
    lead: 'نفحص خدماتنا كل بضع دقائق تلقائياً. هذه الصفحة تعرض نتيجة آخر فحص وسجل آخر 8 ساعات، وتتحدّث وحدها كل دقيقة.',
    loading: 'جارٍ التحقق من حالة الخدمات…',
    allOk: 'كل الخدمات تعمل بشكل طبيعي',
    someDown: 'بعض الخدمات تواجه مشكلة الآن',
    someDownBody: 'إن كان الأمر عاجلاً، تواصل معنا على واتساب أو اطلب دعماً فنياً.',
    errorTitle: 'تعذّر تحميل حالة الخدمات الآن',
    errorBody: 'لم نتمكن من الوصول لخدمة المراقبة. قد تكون المشكلة في اتصالك أو في واجهة الخدمات نفسها. سنعيد المحاولة تلقائياً.',
    retry: 'إعادة المحاولة',
    lastChecked: 'آخر فحص: {ago}',
    justNow: 'الآن',
    autoRefresh: 'تتحدّث تلقائياً كل دقيقة',
    ok: 'تعمل',
    down: 'متوقفة',
    unknown: 'لا توجد بيانات',
    uptime: 'التوفر آخر 24 ساعة',
    noUptime: 'لا تتوفر بيانات كافية بعد',
    since: 'منذ {time}',
    stripLabel: 'نتائج الفحص في آخر 8 ساعات',
    stripStart: 'قبل 8 ساعات',
    stripEnd: 'الآن',
    legendOk: 'تعمل',
    legendDown: 'متوقفة',
    legendNone: 'لا توجد بيانات',
    reportTitle: 'تواجه مشكلة لا تظهر هنا؟',
    reportBody: 'أخبرنا بما حدث ومتى، وسنتابع معك.',
    reportCta: 'اطلب دعماً فنياً',
    services: {
      web: { name: 'موقع أوكسيرا', host: 'oxira.sa' },
      events: { name: 'Oxira Events', host: 'events.oxira.sa' },
      design: { name: 'Oxira Design', host: 'design.oxira.sa' },
      api: { name: 'واجهة الخدمات والنماذج', host: 'api.oxira.sa' },
      automation: { name: 'الأتمتة ووكلاء الذكاء الاصطناعي', host: '' },
    } as Record<StatusKey, { name: string; host: string }>,
  },
  en: {
    title: 'Oxira service status | Oxira',
    description: 'Live status of Oxira services: the oxira.sa website, Oxira Events, Oxira Design, the services API and automation, with 24-hour uptime.',
    kicker: 'Service status',
    h1: 'Oxira service status',
    lead: 'We check our services automatically every few minutes. This page shows the latest check and the last 8 hours, and refreshes on its own every minute.',
    loading: 'Checking service status…',
    allOk: 'All services are operational',
    someDown: 'Some services are having issues',
    someDownBody: 'If it is urgent, message us on WhatsApp or request technical support.',
    errorTitle: 'We could not load the service status',
    errorBody: 'The monitoring service could not be reached. The problem may be your connection or the services API itself. We will retry automatically.',
    retry: 'Try again',
    lastChecked: 'Last checked {ago}',
    justNow: 'just now',
    autoRefresh: 'Refreshes automatically every minute',
    ok: 'Operational',
    down: 'Down',
    unknown: 'No data',
    uptime: '24-hour uptime',
    noUptime: 'Not enough data yet',
    since: 'since {time}',
    stripLabel: 'Check results over the last 8 hours',
    stripStart: '8 hours ago',
    stripEnd: 'Now',
    legendOk: 'Operational',
    legendDown: 'Down',
    legendNone: 'No data',
    reportTitle: 'Having a problem that isn’t shown here?',
    reportBody: 'Tell us what happened and when, and we will follow up.',
    reportCta: 'Request technical support',
    services: {
      web: { name: 'Oxira website', host: 'oxira.sa' },
      events: { name: 'Oxira Events', host: 'events.oxira.sa' },
      design: { name: 'Oxira Design', host: 'design.oxira.sa' },
      api: { name: 'Services & forms API', host: 'api.oxira.sa' },
      automation: { name: 'Automation & AI agents', host: '' },
    } as Record<StatusKey, { name: string; host: string }>,
  },
};

// Work areas, taken from the services and products already on the site.
const areaIcons = ['software', 'globe', 'agent', 'infra', 'transform', 'design', 'events'] as const;

export const careersText = {
  ar: {
    title: 'الوظائف: انضم لفريق أوكسيرا | أوكسيرا',
    description: 'انضم لفريق أوكسيرا، شركة تقنية سعودية في الرياض: البرمجيات والمواقع ووكلاء الذكاء الاصطناعي والبنية التحتية والتحول الرقمي. أرسل سيرتك الذاتية.',
    kicker: 'الوظائف',
    h1: 'انضم لفريق أوكسيرا',
    lead: 'أوكسيرا شركة تقنية سعودية تنمو في الرياض. نبني برمجيات ومواقع ووكلاء ذكاء اصطناعي وحلول بنية تحتية لجهات حكومية وشركات وأعمال صغيرة، ونرحّب دائماً بمن يحب بناء تقنية تعمل فعلاً.',
    noOpenTitle: 'لا توجد وظائف معلنة حالياً',
    noOpenBody: 'لكننا نستقبل الطلبات في أي وقت، ونحتفظ بها لدينا ونتواصل معك عندما تفتح فرصة تناسب خبرتك.',
    applyNow: 'أرسل سيرتك الذاتية',
    areasTitle: 'المجالات التي نعمل فيها',
    areasBody: 'اختر المجال الأقرب لخبرتك عند التقديم.',
    areas: [
      { key: 'software', name: 'تطوير البرمجيات', text: 'أنظمة مخصصة ومنصات ويب وتطبيقات جوال وربط الأنظمة ببعض.' },
      { key: 'web', name: 'المواقع والمتاجر الإلكترونية', text: 'مواقع الشركات والمتاجر، ومنصة أوكسيرا لبناء المواقع وإضافاتها الشهرية.' },
      { key: 'ai', name: 'وكلاء الذكاء الاصطناعي والأتمتة', text: 'وكلاء على واتساب والمواقع، وأتمتة المهام والتقارير وقراءة المستندات.' },
      { key: 'infra', name: 'البنية التحتية وأمن المعلومات', text: 'الحوسبة السحابية والشبكات وأمن المعلومات ودعم أنظمة تقنية المعلومات.' },
      { key: 'transform', name: 'التحول الرقمي', text: 'تقييم الوضع الحالي وخرائط الطريق وتنفيذ المشاريع الرقمية للجهات والشركات.' },
      { key: 'design', name: 'التصميم', text: 'تصميم واجهات المواقع والتطبيقات، وتصاميم المحتوى للسوشيال ميديا.' },
      { key: 'events', name: 'تقنيات الفعاليات والمعارض', text: 'تذاكر الفعاليات، ووكلاء المعلومات والبلاغات الميدانية للمعارض والمهرجانات.' },
    ].map((a, i) => ({ ...a, icon: areaIcons[i] })),
    valuesTitle: 'ما الذي نقدّره',
    values: [
      { name: 'نفهم قبل أن نبني', text: 'نبدأ بفهم المشكلة الحقيقية، ثم نختار الحل المناسب لها.' },
      { name: 'الجودة والوضوح', text: 'عمل نظيف ومختبر، ومراحل واضحة يعرفها العميل والفريق.' },
      { name: 'أمان البيانات', text: 'نتعامل مع بيانات عملائنا بمسؤولية، ونطبق ممارسات الأمان من البداية.' },
      { name: 'التعلم المستمر', text: 'التقنية تتغير بسرعة، ونحب من يتعلم ويجرّب ويشارك ما تعلّمه.' },
      { name: 'نبقى بعد الإطلاق', text: 'نتابع ونطوّر وندعم ما نبنيه، ولا نكتفي بالتسليم.' },
    ],
    applyTitle: 'كيف تتقدم',
    steps: [
      { name: 'جهّز ملفك', text: 'سيرتك الذاتية (PDF)، ورابط أعمالك أو ملفك على LinkedIn أو GitHub.' },
      { name: 'أرسله بالبريد', text: 'إلى info@oxira.sa بعنوان: وظيفة - المجال. مثال: وظيفة - تطوير البرمجيات.' },
      { name: 'نحتفظ بطلبك', text: 'نراجع كل طلب، ونتواصل معك عندما تتوفر فرصة تناسبك.' },
    ],
    subjectPrefix: 'وظيفة - ',
    emailCta: 'التقديم عبر البريد',
    pickArea: 'أو قدّم مباشرة على مجال:',
    whatsappCta: 'تواصل عبر واتساب',
    whatsappText: 'السلام عليكم، أرغب في التقديم على وظيفة في أوكسيرا في مجال: ',
    emailBody: 'الاسم:\nالمجال:\nرابط الأعمال أو LinkedIn:\n\n(أرفق سيرتك الذاتية)',
    onFile: 'نحتفظ بالطلبات لدينا ونستخدمها فقط للتواصل معك بخصوص فرص العمل في أوكسيرا. لحذف طلبك راسلنا على info@oxira.sa.',
    partnersTitle: 'مستقل أو وكالة؟',
    partnersBody: 'إن كنت مسوّقاً أو مستقلاً أو وكالة، انضم لبرنامج شركاء أوكسيرا واربح من كل موقع يُطلب عن طريق رابطك.',
    partnersCta: 'برنامج الشركاء',
  },
  en: {
    title: 'Careers: join the Oxira team | Oxira',
    description: 'Join Oxira, a Saudi tech company in Riyadh working in software, websites, AI agents, infrastructure and digital transformation. Send us your CV.',
    kicker: 'Careers',
    h1: 'Join the Oxira team',
    lead: 'Oxira is a growing Saudi technology company in Riyadh. We build software, websites, AI agents and infrastructure for government bodies, companies and small businesses, and we are always glad to hear from people who like building technology that actually works.',
    noOpenTitle: 'No open positions are listed right now',
    noOpenBody: 'We still welcome applications at any time. We keep them on file and contact you when an opportunity that fits your experience opens.',
    applyNow: 'Send your CV',
    areasTitle: 'Areas we work in',
    areasBody: 'Pick the area closest to your experience when you apply.',
    areas: [
      { key: 'software', name: 'Software development', text: 'Custom systems, web platforms, mobile apps and system integrations.' },
      { key: 'web', name: 'Websites & e-commerce', text: 'Company websites and online stores, plus the Oxira website builder and its monthly add-ons.' },
      { key: 'ai', name: 'AI agents & automation', text: 'Agents on WhatsApp and websites, task automation, reports and document reading.' },
      { key: 'infra', name: 'Infrastructure & security', text: 'Cloud computing, networks, information security and IT systems support.' },
      { key: 'transform', name: 'Digital transformation', text: 'Assessments, roadmaps and delivery of digital projects for organisations and companies.' },
      { key: 'design', name: 'Design', text: 'Website and app interfaces, and social media content design.' },
      { key: 'events', name: 'Events & exhibitions tech', text: 'Event tickets, and information and field-reporting agents for exhibitions and festivals.' },
    ].map((a, i) => ({ ...a, icon: areaIcons[i] })),
    valuesTitle: 'What we value',
    values: [
      { name: 'Understand before building', text: 'We start from the real problem, then choose the solution that fits it.' },
      { name: 'Quality and clarity', text: 'Clean, tested work and clear stages that the client and the team both know.' },
      { name: 'Data security', text: 'We handle client data responsibly and build security in from the start.' },
      { name: 'Keep learning', text: 'Technology moves fast. We like people who learn, experiment and share what they learn.' },
      { name: 'Stay after launch', text: 'We run, improve and support what we build, not just hand it over.' },
    ],
    applyTitle: 'How to apply',
    steps: [
      { name: 'Prepare your file', text: 'Your CV (PDF), plus a link to your portfolio, LinkedIn or GitHub.' },
      { name: 'Email it', text: 'To info@oxira.sa with the subject "وظيفة - Area", for example: وظيفة - Software development.' },
      { name: 'We keep it on file', text: 'We review every application and contact you when a fitting opportunity opens.' },
    ],
    subjectPrefix: 'وظيفة - ',
    emailCta: 'Apply by email',
    pickArea: 'Or apply straight to an area:',
    whatsappCta: 'Message us on WhatsApp',
    whatsappText: 'Hello, I would like to apply for a job at Oxira in: ',
    emailBody: 'Name:\nArea:\nPortfolio or LinkedIn:\n\n(Please attach your CV)',
    onFile: 'We keep applications on file and use them only to contact you about work at Oxira. To have yours deleted, email info@oxira.sa.',
    partnersTitle: 'Freelancer or agency?',
    partnersBody: 'If you are a marketer, freelancer or agency, join the Oxira partner program and earn from every website ordered through your link.',
    partnersCta: 'Partner program',
  },
};

export const pressText = {
  ar: {
    title: 'الصحافة والهوية البصرية | أوكسيرا',
    description: 'ملف أوكسيرا الصحفي: نبذة رسمية عن الشركة، وشعار أوكسيرا للتحميل، وألوان الهوية والخطوط وإرشادات الاستخدام، وبريد التواصل الإعلامي.',
    kicker: 'الصحافة والهوية',
    h1: 'ملف أوكسيرا الصحفي',
    lead: 'كل ما تحتاجه للكتابة عن أوكسيرا: نبذة رسمية جاهزة، والشعار بصيغ جاهزة للتحميل، والألوان والخطوط وإرشادات الاستخدام.',
    contactCta: 'تواصل إعلامي',
    aboutTitle: 'نبذة عن أوكسيرا',
    aboutBody: 'استخدم هذه النبذة كما هي عند الكتابة عن أوكسيرا.',
    short: 'نبذة قصيرة',
    long: 'نبذة مفصّلة',
    copy: 'نسخ',
    copied: 'تم النسخ',
    factsTitle: 'معلومات أساسية',
    facts: { name: 'الاسم', nameValue: 'أوكسيرا (Oxira)', hq: 'المقر', hqValue: 'الرياض، المملكة العربية السعودية', web: 'الموقع', email: 'البريد', cr: 'السجل التجاري' },
    assetsTitle: 'الشعار',
    assetsBody: 'ملفات SVG متجهة تصلح للطباعة والشاشات بأي مقاس.',
    assets: [
      { file: 'brand/oxira-logo-navy.svg', name: 'الشعار الكامل، كحلي', use: 'للخلفيات الفاتحة', tone: 'light' },
      { file: 'brand/oxira-logo-white.svg', name: 'الشعار الكامل، أبيض', use: 'للخلفيات الداكنة', tone: 'dark' },
      { file: 'favicon.svg', name: 'رمز أوكسيرا', use: 'أيقونة مربعة للتطبيقات والملفات الشخصية', tone: 'light' },
    ],
    download: 'تحميل SVG',
    downloadLogo: 'تحميل الشعار',
    colorsTitle: 'ألوان الهوية',
    colors: [
      { name: 'كحلي أوكسيرا', hex: '#0A253E', use: 'اللون الأساسي للنصوص والخلفيات الداكنة' },
      { name: 'أزرق أوكسيرا', hex: '#007DB4', use: 'لون مساند للروابط والعناصر التفاعلية' },
      { name: 'ذهبي أوكسيرا', hex: '#F5A800', use: 'لون التمييز للأزرار والإبراز، بقدر محدود' },
    ],
    fontsTitle: 'الخطوط',
    fonts: [
      { name: 'Tajawal', use: 'للنصوص العربية', href: 'https://fonts.google.com/specimen/Tajawal' },
      { name: 'IBM Plex Sans', use: 'للنصوص اللاتينية والروسية', href: 'https://fonts.google.com/specimen/IBM+Plex+Sans' },
    ],
    fontsNote: 'كلمة Oxira في الشعار مرسومة وليست خطاً، فاستخدم ملف الشعار دائماً ولا تكتبها بخط.',
    usageTitle: 'إرشادات الاستخدام',
    doTitle: 'افعل',
    dont: 'لا تفعل',
    dos: ['اترك مساحة فارغة حول الشعار لا تقل عن عرض القطعة الذهبية', 'استخدم الشعار الكحلي على الخلفيات الفاتحة، والأبيض على الداكنة', 'اكتب الاسم "أوكسيرا" بالعربية و"Oxira" بالإنجليزية'],
    donts: ['لا تغيّر ألوان الشعار أو نسبه', 'لا تضف ظلالاً أو تأثيرات أو إطارات', 'لا تضع الشعار على صور مزدحمة تُضعف وضوحه'],
    mediaTitle: 'التواصل الإعلامي',
    mediaBody: 'لطلبات المقابلات والمعلومات الإضافية والصور، راسلنا وسنرد عليك في أقرب وقت.',
    mediaSubject: 'استفسار إعلامي',
  },
  en: {
    title: 'Press & brand kit | Oxira',
    description: 'Oxira press kit: official company boilerplate, downloadable Oxira logos, brand colors and fonts, usage guidelines and the media contact email.',
    kicker: 'Press & brand',
    h1: 'Oxira press kit',
    lead: 'Everything you need to write about Oxira: an official boilerplate, logo files ready to download, and our colors, fonts and usage guidelines.',
    contactCta: 'Media contact',
    aboutTitle: 'About Oxira',
    aboutBody: 'Please use this boilerplate as written when describing Oxira.',
    short: 'Short version',
    long: 'Full version',
    copy: 'Copy',
    copied: 'Copied',
    factsTitle: 'Key facts',
    facts: { name: 'Name', nameValue: 'Oxira (أوكسيرا)', hq: 'Headquarters', hqValue: 'Riyadh, Saudi Arabia', web: 'Website', email: 'Email', cr: 'Commercial registration' },
    assetsTitle: 'Logo',
    assetsBody: 'Vector SVG files that work for print and screens at any size.',
    assets: [
      { file: 'brand/oxira-logo-navy.svg', name: 'Full logo, navy', use: 'For light backgrounds', tone: 'light' },
      { file: 'brand/oxira-logo-white.svg', name: 'Full logo, white', use: 'For dark backgrounds', tone: 'dark' },
      { file: 'favicon.svg', name: 'Oxira symbol', use: 'Square icon for apps and profiles', tone: 'light' },
    ],
    download: 'Download SVG',
    downloadLogo: 'Download the logo',
    colorsTitle: 'Brand colors',
    colors: [
      { name: 'Oxira navy', hex: '#0A253E', use: 'Primary color for text and dark backgrounds' },
      { name: 'Oxira blue', hex: '#007DB4', use: 'Supporting color for links and interactive elements' },
      { name: 'Oxira gold', hex: '#F5A800', use: 'Accent for buttons and highlights, used sparingly' },
    ],
    fontsTitle: 'Fonts',
    fonts: [
      { name: 'IBM Plex Sans', use: 'Latin and Cyrillic text', href: 'https://fonts.google.com/specimen/IBM+Plex+Sans' },
      { name: 'Tajawal', use: 'Arabic text', href: 'https://fonts.google.com/specimen/Tajawal' },
    ],
    fontsNote: 'The word Oxira in the logo is custom-drawn, not a font. Always use the logo file rather than typing it.',
    usageTitle: 'Usage guidelines',
    doTitle: 'Do',
    dont: 'Don’t',
    dos: ['Leave clear space around the logo at least as wide as the gold piece', 'Use the navy logo on light backgrounds and the white logo on dark ones', 'Write the name as "Oxira" in English and "أوكسيرا" in Arabic'],
    donts: ['Don’t change the logo’s colors or proportions', 'Don’t add shadows, effects or outlines', 'Don’t place the logo on busy photos that reduce its legibility'],
    mediaTitle: 'Media contact',
    mediaBody: 'For interviews, further information or images, email us and we will get back to you as soon as we can.',
    mediaSubject: 'Media enquiry',
  },
};

/** Official boilerplate, built only from what the site already says about Oxira. Both languages appear on both pages. */
export const boilerplate = {
  ar: {
    short: 'أوكسيرا شركة سعودية للتحول الرقمي وتقنية المعلومات مقرها الرياض، تقدم حلولاً تقنية متكاملة في تطوير البرمجيات والبنية التحتية والذكاء الاصطناعي لجهات حكومية وشركات خاصة في أنحاء المملكة.',
    long: 'أوكسيرا شركة سعودية للتحول الرقمي وتقنية المعلومات مقرها الرياض. تقدم حلولاً تقنية متكاملة تشمل استشارات التحول الرقمي، وتطوير البرمجيات وتطبيقات الجوال، والبنية التحتية التقنية وأمن المعلومات، وأنظمة المنزل الذكي، وحلول الذكاء الاصطناعي ووكلاء الأتمتة على واتساب والمواقع. وتطوّر أوكسيرا منتجاتها الرقمية الخاصة، ومنها منظومة Classti لإدارة المدارس الأهلية والدولية، ومنصة لبناء المواقع للأعمال الصغيرة مع إضافات شهرية للتسويق والحجوزات. تعمل أوكسيرا مع جهات حكومية وشركات خاصة في أنحاء المملكة. لمزيد من المعلومات: oxira.sa',
  },
  en: {
    short: 'Oxira is a Saudi digital transformation and IT company based in Riyadh, delivering integrated technology solutions in software development, infrastructure and artificial intelligence for government bodies and private companies across Saudi Arabia.',
    long: 'Oxira is a Saudi digital transformation and IT company based in Riyadh. It delivers integrated technology solutions spanning digital transformation consulting, software and mobile app development, technology infrastructure and information security, smart home systems, and AI solutions including AI agents on WhatsApp and websites. Oxira also builds its own digital products, including Classti, a school management suite for private and international schools, and a website builder for small businesses with monthly add-ons for marketing and bookings. Oxira works with government bodies and private companies across Saudi Arabia. More at oxira.sa',
  },
};

export const caseText = {
  ar: { crumbsWork: 'أعمالنا', home: 'الرئيسية', challenge: 'التحدي', solution: 'الحل', results: 'النتائج', services: 'الخدمات', links: 'روابط', readCase: 'اقرأ دراسة الحالة', titleSuffix: 'دراسة حالة | أوكسيرا', caseLabel: 'دراسة حالة' },
  en: { crumbsWork: 'Work', home: 'Home', challenge: 'The challenge', solution: 'What we built', results: 'Results', services: 'Services', links: 'Links', readCase: 'Read the case study', titleSuffix: 'Case study | Oxira', caseLabel: 'Case study' },
};

/** "Leadership" heading on the About page (all languages; names and roles fall back to English outside Arabic). */
export const leadershipTitle: Record<Lang, string> = { ar: 'القيادة', en: 'Leadership', de: 'Geschäftsleitung', fr: 'Direction', ru: 'Руководство' };
