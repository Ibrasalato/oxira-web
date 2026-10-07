// All page copy lives here, one object per language.
// Text follows the Oxira company profile. Edit here; the layout picks it up in both languages.

export type Lang = 'ar' | 'en';

export const contact = {
  phone: '+966 59 669 4021',
  phoneHref: 'tel:+966596694021',
  whatsappHref: 'https://wa.me/966596694021',
  email: 'info@oxira.sa',
  web: 'www.oxira.sa',
};

// Client logos in /public/clients, in the order shown in the profile.
export const clientLogos = [
  { file: 'aramco.png', ar: 'أرامكو السعودية', en: 'Saudi Aramco' },
  { file: 'gea.png', ar: 'الهيئة العامة للترفيه', en: 'General Entertainment Authority' },
  { file: 'riyadh-season.png', ar: 'موسم الرياض', en: 'Riyadh Season' },
  { file: 'stc.png', ar: 'stc', en: 'stc' },
  { file: 'rcrc.png', ar: 'الهيئة الملكية لمدينة الرياض', en: 'Royal Commission for Riyadh City' },
  { file: 'blvd-world.png', ar: 'بوليفارد وورلد', en: 'BLVD World' },
  { file: 'jockey-club.png', ar: 'نادي سباقات الخيل', en: 'Jockey Club of Saudi Arabia' },
  { file: 'kafd.png', ar: 'مركز الملك عبدالله المالي', en: 'KAFD' },
  { file: 'holiday-inn.png', ar: 'هوليداي إن', en: 'Holiday Inn' },
  { file: 'red-sea.png', ar: 'البحر الأحمر', en: 'The Red Sea' },
  { file: 'alhokair.png', ar: 'مجموعة الحكير', en: 'Al Hokair Group' },
  { file: 'roshn.png', ar: 'مجموعة روشن', en: 'Roshn Group' },
  { file: 'almajdiah.png', ar: 'المجدية ريزدنس', en: 'Almajdiah Residence' },
];

export type ServiceIcon = 'transform' | 'software' | 'infra' | 'home' | 'ai';

export const t = {
  ar: {
    dir: 'rtl',
    meta: {
      title: 'أوكسيرا | للتحول الرقمي وتقنية المعلومات',
      description: 'أوكسيرا شركة سعودية متخصصة في حلول تقنية متكاملة: تطوير البرمجيات، البنية التحتية، التحول الرقمي، أنظمة المنزل الذكي وحلول الذكاء الاصطناعي.',
    },
    nav: { about: 'من نحن', services: 'خدماتنا', clients: 'عملاؤنا', work: 'أعمالنا', contact: 'تواصل معنا' },
    switchLabel: 'English',
    hero: {
      kicker: 'شركة سعودية للحلول التقنية المتكاملة',
      title: 'أوكسيرا للتحول الرقمي وتقنية المعلومات',
      body: 'حلول تقنية متكاملة في تطوير البرمجيات والبنية التحتية والذكاء الاصطناعي، لجهات حكومية وشركات خاصة في أنحاء المملكة.',
      cta: 'احجز استشارة مجانية',
      secondary: 'استعرض خدماتنا',
    },
    about: {
      introTitle: 'مقدمة',
      introEn: 'Introduction',
      intro: 'شركة أوكسيرا متخصصة في تقديم حلول تقنية متكاملة تشمل تطوير البرمجيات، والبنية التحتية، والتحول الرقمي. يهدف فريقنا إلى دعم نمو الأعمال والابتكار في مجال التقنية، ونلتزم بتقديم قيمة مضافة لقطاع التقنية من خلال التخطيط الاستراتيجي الذكي والالتزام بمعايير الجودة العالمية.',
      visionTitle: 'رؤيتنا',
      visionEn: 'Our Vision',
      vision: 'أن نكون من بين رواد قطاع التقنية والتحول الرقمي، مع تحقيق معايير استدامة عالية، وتوفير حلول مبتكرة تلبي تطلعات السوق وتواكب التطورات العالمية في المجال التقني.',
      missionTitle: 'رسالتنا',
      missionEn: 'Our Mission',
      mission: 'تقديم حلول تقنية استراتيجية قائمة على دراسات سوقية متعمقة، وحلول رقمية تحقق أعلى العوائد لعملائنا وشركائنا، مع ضمان جودة وأمان البيانات وتحقيق تجربة مستخدم مثالية.',
    },
    services: {
      title: 'خدماتنا',
      body: 'خمسة مجالات يغطيها فريق واحد، من الاستشارة حتى التشغيل.',
      list: [
        { icon: 'transform', name: 'التحول الرقمي', en: 'Digital Transformation', items: ['استشارات التحول الرقمي للشركات والمؤسسات', 'تحليل وتطوير الاستراتيجيات الرقمية وتحسين الأداء', 'تنفيذ مشاريع رقمية متكاملة لتحقيق الكفاءة التشغيلية', 'تطوير منصات إدارة المحتوى والحلول الرقمية الحديثة'] },
        { icon: 'software', name: 'تطوير البرمجيات', en: 'Software Development', items: ['تصميم وتطوير البرمجيات المخصصة وفق أعلى المعايير', 'تطوير تطبيقات الهاتف المحمول وحلول الويب', 'تطبيق أحدث تقنيات الذكاء الاصطناعي والتحليل البياني', 'برمجيات الأنظمة الإدارية والتجارية والمتاجر الإلكترونية'] },
        { icon: 'infra', name: 'تطوير التقنية للبنية التحتية', en: 'Technology Infrastructure', items: ['توفير حلول الحوسبة السحابية وأمن المعلومات', 'تنفيذ شبكات الاتصالات والبنية التحتية الرقمية', 'دعم وإدارة أنظمة تقنية المعلومات', 'حلول الشبكات المنزلية والتجارية الحديثة'] },
        { icon: 'home', name: 'أنظمة المنزل الذكي', en: 'Smart Home Systems', items: ['تنفيذ أنظمة المنازل الذكية المتكاملة', 'التحكم بالأجهزة وأنظمة المنزل عن بُعد', 'تركيب أنظمة الأمان والمراقبة الحديثة', 'توفير حلول الإضاءة والتكييف الذكي'] },
        { icon: 'ai', name: 'حلول الذكاء الاصطناعي', en: 'AI Solutions', items: ['تطوير أنظمة الذكاء الاصطناعي وتحليل البيانات الكبيرة', 'حلول متقدمة لتحليل البيانات واتخاذ القرار الذكي', 'تحسين العمليات باستخدام الأتمتة وتقنيات التعلم العميق', 'تطوير حلول التعرف على الأنماط والتوقعات الذكية للأعمال'] },
      ] as { icon: ServiceIcon; name: string; en: string; items: string[] }[],
    },
    advantages: {
      title: 'مزايا أوكسيرا',
      sub: 'للحلول التقنية',
      list: [
        { name: 'خبرة متميزة', text: 'فريق عمل متخصص يمتلك خبرات واسعة في القطاع التقني.' },
        { name: 'تقنيات حديثة', text: 'اعتماد أحدث تقنيات التحول الرقمي والذكاء الاصطناعي.' },
        { name: 'التزام بالجودة', text: 'تنفيذ مشاريع بمعايير عالمية لضمان رضا العملاء والشركاء.' },
        { name: 'شراكات استراتيجية', text: 'تعاون مع جهات حكومية وخاصة لتحقيق مشاريع تقنية مستدامة.' },
        { name: 'أمان البيانات', text: 'حلول قوية لحماية المعلومات وضمان الامتثال للمعايير الأمنية العالمية.' },
        { name: 'إبداع وابتكار', text: 'حلول تقنية متطورة تتناسب مع التغيرات السريعة في الأسواق الرقمية.' },
      ],
    },
    clients: {
      title: 'عملاء سابقون',
      body: 'نفخر بتعاوننا مع نخبة من الجهات الحكومية والخاصة، بالإضافة إلى شركات تقنية واستشارية عالمية.',
    },
    work: {
      title: 'من أعمالنا',
      body: 'نماذج من المواقع والمنصات التي صممناها ونفذناها لعملائنا.',
      projects: [
        { slug: 'makkah', name: 'إمارة منطقة مكة المكرمة', sector: 'جهة حكومية', text: 'تصميم الموقع الرسمي لمحافظة الطائف بأسلوب احترافي شامل يضم أحدث الأخبار والخدمات الإلكترونية لتسهيل تواصل الأفراد والمؤسسات.' },
        { slug: 'perfect-choice', name: 'Perfect Choice', sector: 'فعاليات', text: 'شركة سعودية رائدة في تنظيم وصناعة الفعاليات الحكومية والرياضية والترفيهية، صممنا حضورها الرقمي بما يعكس جودة أعمالها.' },
        { slug: 'imtenan', name: 'شركة الامتنان المحدودة', sector: 'إنشاءات', text: 'شركة سعودية رائدة في الحلول الإنشائية تأسست عام 1992 في جدة، صممنا موقعها ليعرض مشاريعها وخبرتها.' },
        { slug: 'cordoba', name: 'عين قرطبة', sector: 'تجارة', text: 'شركة رائدة إقليمياً في منتجات السيراميك والبورسلان والتراكوتا، صممنا لها موقعاً احترافياً يعكس قوتها الرقمية ويعزز ثقة عملائها.' },
      ],
    },
    cta: {
      title: 'صمّم موقعك أو تطبيقك باحتراف',
      body: 'مواقع وتطبيقات موبايل وصفحات هبوط، مع استشارة مجانية قبل التنفيذ.',
      button: 'احجز استشارتك الآن',
    },
    contact: {
      title: 'لنبدأ مشروعك القادم',
      body: 'سواء كنت تبحث عن تطوير منصة رقمية، أو استشارة في التحول الرقمي، أو بناء حلول ذكاء اصطناعي مخصصة، فريقنا جاهز للاستماع إليك.',
      address: '426 السليمانية، طريق العروبة، الرياض، المملكة العربية السعودية',
      labels: { phone: 'الجوال', email: 'البريد', web: 'الموقع', address: 'العنوان', whatsapp: 'واتساب' },
      form: {
        title: 'أرسل لنا رسالة',
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الجوال',
        service: 'الخدمة المطلوبة',
        serviceAny: 'اختر الخدمة',
        other: 'أخرى',
        details: 'تفاصيل المشروع',
        submit: 'إرسال الرسالة',
        sending: 'جارٍ الإرسال…',
        sent: 'وصلتنا رسالتك، وسنتواصل معك قريباً.',
        failed: 'لم تُرسل الرسالة. تحقق من اتصالك وأعد المحاولة، أو راسلنا على info@oxira.sa.',
        required: 'أكمل الحقول المطلوبة: الاسم، والبريد أو الجوال، وتفاصيل المشروع.',
      },
    },
    footer: { rights: 'أوكسيرا. جميع الحقوق محفوظة.' },
  },
  en: {
    dir: 'ltr',
    meta: {
      title: 'Oxira | Digital Transformation & IT',
      description: 'Oxira is a Saudi company delivering integrated technology solutions: software development, infrastructure, digital transformation, smart home systems and AI.',
    },
    nav: { about: 'About', services: 'Services', clients: 'Clients', work: 'Work', contact: 'Contact us' },
    switchLabel: 'العربية',
    hero: {
      kicker: 'A Saudi integrated technology company',
      title: 'Oxira for Digital Transformation & IT',
      body: 'Integrated solutions in software development, infrastructure and artificial intelligence, for government bodies and private companies across Saudi Arabia.',
      cta: 'Book a free consultation',
      secondary: 'Explore our services',
    },
    about: {
      introTitle: 'Introduction',
      introEn: 'مقدمة',
      intro: 'Oxira delivers integrated technology solutions spanning software development, infrastructure and digital transformation. Our team supports business growth and innovation in technology, and we add value to the sector through smart strategic planning and a commitment to international quality standards.',
      visionTitle: 'Our Vision',
      visionEn: 'رؤيتنا',
      vision: 'To be among the leaders of the technology and digital transformation sector, meeting high sustainability standards and providing innovative solutions that answer market needs and keep pace with global developments.',
      missionTitle: 'Our Mission',
      missionEn: 'رسالتنا',
      mission: 'To deliver strategic technology solutions grounded in in-depth market research, and digital solutions that bring the highest returns to our clients and partners, while ensuring data quality and security and an excellent user experience.',
    },
    services: {
      title: 'Our Services',
      body: 'Five areas covered by one team, from consultation to operation.',
      list: [
        { icon: 'transform', name: 'Digital Transformation', en: 'التحول الرقمي', items: ['Digital transformation consulting for companies and institutions', 'Digital strategy analysis, development and performance improvement', 'End-to-end digital projects for operational efficiency', 'Content management platforms and modern digital solutions'] },
        { icon: 'software', name: 'Software Development', en: 'تطوير البرمجيات', items: ['Custom software designed and built to the highest standards', 'Mobile apps and web solutions', 'Applied AI and data analytics', 'Management, business and e-commerce systems'] },
        { icon: 'infra', name: 'Technology Infrastructure', en: 'تطوير التقنية للبنية التحتية', items: ['Cloud computing and information security', 'Communication networks and digital infrastructure', 'IT systems support and management', 'Modern home and commercial networks'] },
        { icon: 'home', name: 'Smart Home Systems', en: 'أنظمة المنزل الذكي', items: ['Integrated smart home systems', 'Remote control of devices and home systems', 'Modern security and surveillance systems', 'Smart lighting and climate control'] },
        { icon: 'ai', name: 'AI Solutions', en: 'حلول الذكاء الاصطناعي', items: ['AI systems and big data analytics', 'Advanced analytics for smart decision-making', 'Process improvement with automation and deep learning', 'Pattern recognition and smart business forecasting'] },
      ] as { icon: ServiceIcon; name: string; en: string; items: string[] }[],
    },
    advantages: {
      title: 'Why Oxira',
      sub: 'for technology solutions',
      list: [
        { name: 'Proven expertise', text: 'A specialised team with broad experience in the technology sector.' },
        { name: 'Modern technology', text: 'We adopt the latest in digital transformation and artificial intelligence.' },
        { name: 'Commitment to quality', text: 'Projects delivered to international standards for client and partner satisfaction.' },
        { name: 'Strategic partnerships', text: 'Working with government and private bodies on sustainable technology projects.' },
        { name: 'Data security', text: 'Strong protection for information and compliance with international security standards.' },
        { name: 'Creativity & innovation', text: 'Advanced solutions that keep pace with fast-changing digital markets.' },
      ],
    },
    clients: {
      title: 'Our Clients',
      body: 'We are proud to work with leading government and private organisations, alongside international technology and consulting firms.',
    },
    work: {
      title: 'Our Work',
      body: 'A selection of websites and platforms we designed and built for our clients.',
      projects: [
        { slug: 'makkah', name: 'Makkah Region Principality', sector: 'Government', text: 'The official website of Taif Governorate: a complete, professional site with the latest news and e-services connecting residents and organisations.' },
        { slug: 'perfect-choice', name: 'Perfect Choice', sector: 'Events', text: 'A leading Saudi organiser of government, sports and entertainment events. We designed a digital presence that reflects the quality of their work.' },
        { slug: 'imtenan', name: 'Imtenan Limited Company', sector: 'Construction', text: 'A leading Saudi construction company founded in Jeddah in 1992. We designed a website that presents its projects and expertise.' },
        { slug: 'cordoba', name: 'Cordoba Eye', sector: 'Trade', text: 'A regional leader in ceramics, porcelain and terracotta. We built a professional website that strengthens its digital presence and customer trust.' },
      ],
    },
    cta: {
      title: 'Get your website or app designed professionally',
      body: 'Websites, mobile apps and landing pages, with a free consultation before we start.',
      button: 'Book your consultation',
    },
    contact: {
      title: "Let's start your next project",
      body: 'Whether you need a digital platform, digital transformation advice, or custom AI solutions, our team is ready to listen.',
      address: '426 Al Sulaymaniyah, Al Urubah Rd., Riyadh, Kingdom of Saudi Arabia',
      labels: { phone: 'Phone', email: 'Email', web: 'Website', address: 'Address', whatsapp: 'WhatsApp' },
      form: {
        title: 'Send us a message',
        name: 'Full name',
        email: 'Email',
        phone: 'Mobile number',
        service: 'Service needed',
        serviceAny: 'Choose a service',
        other: 'Other',
        details: 'Project details',
        submit: 'Send message',
        sending: 'Sending…',
        sent: 'Message received. We will be in touch soon.',
        failed: 'The message was not sent. Check your connection and try again, or email info@oxira.sa.',
        required: 'Fill in the required fields: name, email or mobile, and project details.',
      },
    },
    footer: { rights: 'Oxira. All rights reserved.' },
  },
} as const;
