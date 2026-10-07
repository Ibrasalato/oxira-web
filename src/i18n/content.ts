// All page copy lives here, one object per language.
// Edit text in this file; the page layout picks it up in both languages.

export type Lang = 'ar' | 'en';

export const contact = {
  phone: '+966 59 669 4021',
  phoneHref: 'tel:+966596694021',
  email: 'info@oxira.sa',
};

// The four layers of the stack, listed bottom (foundation) to top.
const layersAr = [
  {
    id: 'infra',
    name: 'البنية التحتية',
    lead: 'الشبكات والسحابة وأمن المعلومات التي تقوم عليها كل خدمة رقمية.',
    items: [
      'تصميم وتنفيذ شبكات الاتصالات ومراكز البيانات',
      'الحوسبة السحابية والنسخ الاحتياطي واستمرارية الأعمال',
      'أمن المعلومات والامتثال للمعايير الوطنية',
      'دعم وإدارة أنظمة تقنية المعلومات',
    ],
  },
  {
    id: 'buildings',
    name: 'الأنظمة الذكية',
    lead: 'مبانٍ ومنازل تُدار من شاشة واحدة: الإضاءة والتكييف والأمان.',
    items: [
      'أنظمة المنازل والمباني الذكية المتكاملة',
      'كاميرات المراقبة والتحكم بالدخول',
      'الإضاءة والتكييف الذكي والتحكم عن بُعد',
    ],
  },
  {
    id: 'software',
    name: 'البرمجيات',
    lead: 'مواقع وتطبيقات وأنظمة إدارية مبنية على طريقة عمل الجهة، لا العكس.',
    items: [
      'برمجيات وأنظمة إدارية مخصصة',
      'تطبيقات الجوال ومنصات الويب',
      'المتاجر الإلكترونية وبوابات الخدمات',
      'تكامل الأنظمة وربطها عبر واجهات API',
    ],
  },
  {
    id: 'ai',
    name: 'الذكاء الاصطناعي',
    lead: 'أتمتة العمل المتكرر وتحويل البيانات المتراكمة إلى قرارات.',
    items: [
      'وكلاء ذكيون للرد على العملاء وخدمة الموظفين',
      'تحليل البيانات ولوحات المؤشرات',
      'أتمتة سير العمل بين الأنظمة',
      'نماذج التنبؤ والتعرف على الأنماط',
    ],
  },
];

const layersEn = [
  {
    id: 'infra',
    name: 'Infrastructure',
    lead: 'The networks, cloud and security every digital service stands on.',
    items: [
      'Network and data-centre design and build',
      'Cloud, backup and business continuity',
      'Information security and national-standard compliance',
      'IT operations and managed support',
    ],
  },
  {
    id: 'buildings',
    name: 'Smart systems',
    lead: 'Buildings and homes run from one screen: lighting, climate and security.',
    items: [
      'Integrated smart home and building systems',
      'CCTV and access control',
      'Smart lighting, climate and remote control',
    ],
  },
  {
    id: 'software',
    name: 'Software',
    lead: 'Websites, apps and management systems shaped around how you work.',
    items: [
      'Custom business and management systems',
      'Mobile apps and web platforms',
      'E-commerce stores and service portals',
      'System integration over APIs',
    ],
  },
  {
    id: 'ai',
    name: 'Artificial intelligence',
    lead: 'Automate repetitive work and turn the data you already hold into decisions.',
    items: [
      'AI agents for customer and employee service',
      'Data analysis and KPI dashboards',
      'Workflow automation across systems',
      'Forecasting and pattern recognition',
    ],
  },
];

const projectsAr = [
  { name: 'إمارة منطقة مكة المكرمة', sector: 'حكومي', text: 'الموقع الرسمي لمحافظة الطائف، يجمع الأخبار والخدمات الإلكترونية للأفراد والمؤسسات.' },
  { name: 'MacSoft: FieldCheck و LOC', sector: 'برمجيات', text: 'منصات مؤسسية تربط العمليات الميدانية بالبيانات على نطاق واسع.' },
  { name: 'منصة تعليمية للمدارس', sector: 'تعليم', text: 'نظام واحد يدير دورة التعليم في المدارس الخاصة والدولية ويربط المدرسة بولي الأمر والطالب.' },
  { name: 'Perfect Choice', sector: 'فعاليات', text: 'الحضور الرقمي لشركة تنظم فعاليات حكومية ورياضية وترفيهية.' },
  { name: 'شركة الامتنان المحدودة', sector: 'إنشاءات', text: 'موقع شركة مقاولات تأسست في جدة عام 1992.' },
  { name: 'عين قرطبة', sector: 'تجارة', text: 'موقع لشركة سيراميك وبورسلان وتراكوتا يعرض منتجاتها ويعزز ثقة عملائها.' },
];

const projectsEn = [
  { name: 'Makkah Region Principality', sector: 'Government', text: 'The official website of Taif Governorate, bringing news and e-services together for residents and organisations.' },
  { name: 'MacSoft: FieldCheck & LOC', sector: 'Software', text: 'Enterprise platforms connecting field operations to data at scale.' },
  { name: 'School education platform', sector: 'Education', text: 'One system that runs the school cycle for private and international schools, linking school, parents and students.' },
  { name: 'Perfect Choice', sector: 'Events', text: 'Digital presence for an organiser of government, sports and entertainment events.' },
  { name: 'Al Imtinan Co.', sector: 'Construction', text: 'Website for a Jeddah contractor founded in 1992.' },
  { name: 'Ain Qurtuba', sector: 'Trade', text: 'Website for a ceramics, porcelain and terracotta company, presenting its range to buyers.' },
];

const clientsAr = [
  'أرامكو السعودية', 'stc', 'الهيئة العامة للترفيه', 'الهيئة الملكية لمدينة الرياض',
  'موسم الرياض', 'مركز الملك عبدالله المالي', 'البحر الأحمر', 'روشن',
  'بوليفارد وورلد', 'نادي سباقات الخيل', 'مجموعة الحكير', 'هوليداي إن',
  'ماك سوفت', 'المجدية ريزيدنس',
];

const clientsEn = [
  'Saudi Aramco', 'stc', 'General Entertainment Authority', 'Royal Commission for Riyadh City',
  'Riyadh Season', 'KAFD', 'The Red Sea', 'Roshn',
  'BLVD World', 'Jockey Club of Saudi Arabia', 'Al Hokair Group', 'Holiday Inn',
  'MacSoft', 'Almajdiah Residence',
];

export const t = {
  ar: {
    dir: 'rtl',
    meta: {
      title: 'أوكسيرا | البنية التحتية والبرمجيات والذكاء الاصطناعي',
      description: 'أوكسيرا شركة سعودية تنفّذ المشروع الرقمي كاملاً: البنية التحتية، الأنظمة الذكية، البرمجيات والذكاء الاصطناعي، لجهات حكومية وخاصة.',
    },
    brand: 'أوكسيرا',
    nav: { services: 'الخدمات', work: 'الأعمال', clients: 'العملاء', contact: 'تواصل معنا' },
    switchLabel: 'English',
    hero: {
      title: 'نبني التقنية طبقةً فوق طبقة',
      body: 'من الشبكات والسحابة إلى البرمجيات والذكاء الاصطناعي، تتولى أوكسيرا المشروع الرقمي من أساسه حتى آخر طبقة، لجهات حكومية وخاصة في المملكة.',
      cta: 'احجز استشارة مجانية',
      secondary: 'تصفّح الخدمات',
      stackLabel: 'طبقات الخدمات',
    },
    services: {
      title: 'أربع طبقات، فريق واحد',
      body: 'كل طبقة تعتمد على التي تحتها. لهذا نخطط المشروع كاملاً قبل أن نبدأ أي جزء منه، ونسمّي ذلك التحول الرقمي.',
      layerWord: 'الطبقة',
      layers: layersAr,
    },
    work: {
      title: 'مشاريع نفّذناها',
      body: 'نماذج من أعمال لجهات حكومية وخاصة في المملكة.',
      projects: projectsAr,
    },
    clients: {
      title: 'عملنا مع',
      body: 'جهات حكومية وشركات كبرى ومشغّلو فعاليات في أنحاء المملكة.',
      list: clientsAr,
    },
    contact: {
      title: 'حدّثنا عن مشروعك',
      body: 'أرسل لنا وصفاً مختصراً وسنعود إليك خلال يوم عمل لتحديد موعد الاستشارة. الاستشارة الأولى مجانية.',
      address: 'السليمانية، طريق العروبة، الرياض',
      form: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الجوال',
        layer: 'الطبقة التي تهمك',
        layerAny: 'غير متأكد بعد',
        details: 'وصف المشروع',
        detailsHint: 'ماذا تريد أن تبني، ولمن، ومتى؟',
        submit: 'أرسل الطلب',
        sending: 'جارٍ الإرسال…',
        sent: 'وصلنا طلبك. سنتواصل معك خلال يوم عمل.',
        failed: 'لم يُرسل الطلب. تحقق من اتصالك وأعد المحاولة، أو راسلنا مباشرة على info@oxira.sa.',
        required: 'أكمل الحقول المطلوبة: الاسم، والبريد أو الجوال، ووصف المشروع.',
      },
    },
    footer: {
      rights: 'أوكسيرا. جميع الحقوق محفوظة.',
      tagline: 'شركة سعودية للتحول الرقمي وتقنية المعلومات.',
    },
  },
  en: {
    dir: 'ltr',
    meta: {
      title: 'Oxira | Infrastructure, software and AI',
      description: 'Oxira is a Saudi technology company that delivers the whole digital project: infrastructure, smart systems, software and AI, for government and private clients.',
    },
    brand: 'Oxira',
    nav: { services: 'Services', work: 'Work', clients: 'Clients', contact: 'Contact us' },
    switchLabel: 'العربية',
    hero: {
      title: 'We build technology layer by layer',
      body: 'From networks and cloud to software and AI, Oxira takes the digital project from its foundation to its final layer, for government and private clients across Saudi Arabia.',
      cta: 'Book a free consultation',
      secondary: 'See services',
      stackLabel: 'Service layers',
    },
    services: {
      title: 'Four layers, one team',
      body: 'Each layer depends on the one beneath it. So we plan the whole project before building any part of it. That planning is what we call digital transformation.',
      layerWord: 'Layer',
      layers: layersEn,
    },
    work: {
      title: 'Projects we have delivered',
      body: 'A selection of work for government and private clients in Saudi Arabia.',
      projects: projectsEn,
    },
    clients: {
      title: 'We have worked with',
      body: 'Government bodies, major companies and event operators across the Kingdom.',
      list: clientsEn,
    },
    contact: {
      title: 'Tell us about your project',
      body: 'Send a short description and we will get back to you within one working day to set up the consultation. The first consultation is free.',
      address: 'Al Sulimaniyah, Al Urubah Road, Riyadh',
      form: {
        name: 'Full name',
        email: 'Email',
        phone: 'Mobile number',
        layer: 'Layer you are interested in',
        layerAny: 'Not sure yet',
        details: 'Project description',
        detailsHint: 'What do you want to build, for whom, and by when?',
        submit: 'Send request',
        sending: 'Sending…',
        sent: 'Request received. We will contact you within one working day.',
        failed: 'The request was not sent. Check your connection and try again, or email us at info@oxira.sa.',
        required: 'Fill in the required fields: name, email or mobile, and project description.',
      },
    },
    footer: {
      rights: 'Oxira. All rights reserved.',
      tagline: 'A Saudi digital transformation and IT company.',
    },
  },
} as const;
