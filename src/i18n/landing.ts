// Service and location landing pages (/services/<slug>/ and /locations/<slug>/), Arabic and English only.
// Each page targets one search intent so pages do not compete with each other:
//   web-design             → تصميم مواقع الشركات / انشاء موقع شركة
//   ecommerce-store        → تصميم متجر الكتروني
//   software-development   → شركة برمجة في السعودية
//   mobile-app-development → تطوير تطبيقات الجوال
//   digital-transformation → شركة تحول رقمي
//   business-automation    → أتمتة الأعمال
//   locations/riyadh       → شركة تصميم مواقع في الرياض
//   locations/gulf         → الإمارات وقطر والكويت والبحرين وعُمان
//   locations/egypt        → مصر
// In paragraphs and list items, [label](/path/) becomes an internal link in the page's language.
// Only facts that appear elsewhere on the site: no invented clients, numbers, prices or guarantees.
import type { Lang, ServiceIcon } from './content';

export type LandingLang = 'ar' | 'en';
export const landingLangs: Lang[] = ['ar', 'en'];

type Section = { h: string; p?: string[]; list?: string[]; cards?: { t: string; d: string }[]; after?: string[] };
export type LandingCopy = {
  title: string;
  description: string;
  name: string;        // short name for breadcrumbs, cards and Service schema
  kicker: string;
  h1: string;
  lead: string;
  sections: Section[];
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaBody: string;
  related: { path: string; label: string }[];
};
export type Landing = {
  slug: string;
  kind: 'service' | 'location';
  icon: ServiceIcon;          // service area on /services/ (also preselects the contact form)
  area: { type: 'Country' | 'City' | 'Place'; name: string }[];
  /** Offer the self-serve studio as the main button (small-business websites). */
  studio?: boolean;
  ar: LandingCopy;
  en: LandingCopy;
};

export const landingPath = (l: Landing) => `/${l.kind === 'service' ? 'services' : 'locations'}/${l.slug}/`;

const KSA = [{ type: 'Country' as const, name: 'Saudi Arabia' }];

export const landings: Landing[] = [
  // ───────────────────────────── Web design ─────────────────────────────
  {
    slug: 'web-design', kind: 'service', icon: 'software', area: KSA, studio: true,
    ar: {
      title: 'تصميم مواقع الشركات وإنشاء موقع شركة | أوكسيرا',
      description: 'تصميم مواقع إلكترونية للشركات في السعودية بالعربي والإنجليزي: موقع سريع ومتجاوب مع الجوال وجاهز لجوجل، من الموقع التعريفي إلى المنصات المخصصة.',
      name: 'تصميم مواقع الشركات',
      kicker: 'تصميم وتطوير المواقع',
      h1: 'تصميم مواقع الشركات وإنشاء موقع شركتك باحتراف',
      lead: 'موقعك هو أول ما يراه العميل قبل أن يتصل بك. نصمم مواقع للشركات والمؤسسات في السعودية بالعربية والإنجليزية: سريعة، متجاوبة مع الجوال، مكتوبة بلغة عملائك، ومبنية لتظهر في جوجل وتجلب لك طلبات فعلية.',
      sections: [
        {
          h: 'ماذا يشمل تصميم موقع الشركة؟',
          p: ['لا نسلّمك صفحات جميلة فقط، بل موقعاً يؤدي وظيفة واضحة: أن يفهم الزائر ما تقدمه خلال ثوانٍ، ثم يتواصل معك. لذلك يمر كل مشروع على هذه العناصر:'],
          list: [
            'هيكلة الصفحات حسب خدماتك وعملائك: الرئيسية، من نحن، صفحة لكل خدمة، الأعمال، وتواصل معنا.',
            'تصميم بهوية شركتك وألوانها، باتجاه صحيح من اليمين لليسار للعربية ومن اليسار لليمين للإنجليزية.',
            'كتابة أو تحرير المحتوى بلغة واضحة تناسب السوق السعودي، مع عناوين ووصف مهيأ لمحركات البحث.',
            'نماذج تواصل وزر واتساب وربط الموقع بملف نشاطك على خرائط جوجل.',
            'استضافة سريعة وشهادة أمان SSL ونطاق باسم شركتك.',
            'أساسيات SEO التقنية: سرعة التحميل، روابط نظيفة، خريطة موقع، وبيانات منظمة تساعد جوجل على فهم صفحاتك.',
          ],
        },
        {
          h: 'مساران حسب حجم مشروعك',
          cards: [
            { t: 'موقع جاهز خلال يوم', d: 'للمنشآت الصغيرة والمتوسطة التي تريد الانطلاق بسرعة: تختار تصميماً من [استوديو أوكسيرا](/website-builder/) وتعدّله بمساعد ذكي، أو نتولى كل شيء عنك في [باقة نشاطك أونلاين في يوم](/online-in-a-day/).' },
            { t: 'موقع أو منصة مخصصة', d: 'للشركات والجهات التي تحتاج تصميماً خاصاً أو بوابة عملاء أو ربطاً مع أنظمتها الداخلية. نبدأ بجلسة نفهم فيها المتطلبات، ثم نقترح الحل والخطة قبل التنفيذ ضمن خدمات [تطوير البرمجيات](/services/software-development/).' },
          ],
        },
        {
          h: 'لماذا يختار أصحاب الأعمال أوكسيرا لتصميم مواقعهم؟',
          list: [
            'فريق سعودي في الرياض يفهم السوق المحلي ولغة العميل، ويتعامل معك مباشرة دون وسطاء.',
            'نماذج حقيقية من أعمالنا تجدها في صفحة [أعمالنا](/work/)، منها مواقع لشركات في الفعاليات والإنشاءات والتجارة.',
            'الموقع ليس نهاية الطريق: يمكنك لاحقاً إضافة [نظام حجز المواعيد](/products/booking-system/) أو [الشات بوت](/products/ai-chatbot/) أو [خدمة الظهور في جوجل](/products/google-seo/) بدون إعادة بناء الموقع.',
            'استشارة مجانية قبل التنفيذ، وعرض سعر مكتوب يوضح ما يشمله المشروع وما لا يشمله.',
          ],
        },
        {
          h: 'كيف نعمل على مشروع موقعك',
          list: [
            'نفهم: جلسة قصيرة عن نشاطك وعملائك وأهدافك من الموقع.',
            'نصمم: هيكل الصفحات والمحتوى ونموذج التصميم لتراجعه قبل البرمجة.',
            'ننفذ: نبني الموقع ونختبره على الجوال والكمبيوتر وبمتصفحات مختلفة.',
            'نطلق وندعم: نربط النطاق ونسلّمك لوحة التحكم، ونبقى معك للتحديثات والدعم الفني.',
          ],
        },
        {
          h: 'نصائح قبل أن تطلب عرض سعر',
          p: [
            'جهّز قائمة بخدماتك وصور أعمالك وشعارك، وحدد هل تحتاج لغة ثانية. اطلب من أي شركة تصميم أن توضح من يملك النطاق والمحتوى، وما تكلفة الاستضافة والتجديد السنوي، ومن يحدّث الموقع بعد الإطلاق. فصّلنا ذلك في مقال [كيف تختار شركة تصميم مواقع](/blog/choose-web-design-company/) ومقال [كم تكلفة تصميم موقع إلكتروني في السعودية](/blog/website-cost-saudi/).',
          ],
        },
      ],
      faq: [
        { q: 'كم يستغرق تصميم موقع شركة؟', a: 'الموقع الجاهز من استوديو أوكسيرا يمكن إطلاقه في نفس اليوم، وباقة "نشاطك أونلاين في يوم" تُسلَّم خلال يوم عمل بعد استلام المعلومات. أما المواقع المخصصة فتختلف مدتها حسب عدد الصفحات والتكاملات، ونحددها في عرض السعر.' },
        { q: 'هل يكون الموقع بالعربي والإنجليزي؟', a: 'نعم، نصمم المواقع بالعربية والإنجليزية مع مراعاة اتجاه كل لغة وتحسين ظهور كل نسخة في جوجل.' },
        { q: 'هل أستطيع تعديل محتوى الموقع بنفسي؟', a: 'نعم، تحصل على لوحة تحكم لتعديل النصوص والصور والخدمات، ويمكنك طلب التحديثات من فريق الدعم متى احتجت.' },
        { q: 'هل يظهر موقعي في جوجل بعد الإطلاق؟', a: 'نبني الموقع بأساسيات SEO التقنية ونربطه بملف نشاطك على جوجل، لكن ترتيب النتائج يعتمد على المنافسة والمحتوى ولا يمكن لأحد أن يضمن مركزاً محدداً. لتحسين مستمر يمكنك إضافة خدمة الظهور في جوجل.' },
        { q: 'كم تكلفة تصميم موقع الشركة؟', a: 'تعتمد على نوع الموقع وعدد الصفحات واللغات والتكاملات. للمواقع الجاهزة أسعار باقات معلنة في صفحة بناء المواقع، وللمشاريع المخصصة نرسل عرض سعر بعد جلسة استشارة مجانية.' },
      ],
      ctaTitle: 'ابدأ موقع شركتك اليوم',
      ctaBody: 'ابنِ موقعك بنفسك في دقائق، أو احجز استشارة مجانية ونقترح لك الحل المناسب.',
      related: [
        { path: '/services/ecommerce-store/', label: 'تصميم متجر إلكتروني' },
        { path: '/locations/riyadh/', label: 'تصميم مواقع في الرياض' },
        { path: '/products/google-seo/', label: 'تحسين محركات البحث SEO' },
        { path: '/work/', label: 'أعمالنا' },
      ],
    },
    en: {
      title: 'Company Website Design in Saudi Arabia | Oxira',
      description: 'Bilingual Arabic and English website design for companies in Saudi Arabia: fast, mobile-friendly and built for Google, from simple sites to custom platforms.',
      name: 'Company website design',
      kicker: 'Website design & development',
      h1: 'Professional website design for your company',
      lead: 'Your website is the first thing a customer sees before they call you. We design websites for companies and organisations in Saudi Arabia in Arabic and English: fast, mobile-friendly, written in your customers\' language and built to be found on Google.',
      sections: [
        {
          h: 'What a company website includes',
          p: ['We do not just hand over nice-looking pages. Every website has one job: help visitors understand what you offer within seconds, then contact you. Every project covers:'],
          list: [
            'Page structure built around your services: home, about, one page per service, work and contact.',
            'Design in your brand colours, with correct right-to-left Arabic and left-to-right English layouts.',
            'Clear copy for the Saudi market, with titles and descriptions prepared for search engines.',
            'Contact forms, a WhatsApp button and a link to your Google Maps business profile.',
            'Fast hosting, an SSL certificate and a domain in your company name.',
            'Technical SEO basics: fast loading, clean URLs, a sitemap and structured data.',
          ],
        },
        {
          h: 'Two paths, depending on your project',
          cards: [
            { t: 'A ready website in a day', d: 'For small and medium businesses that want to launch fast: pick a design in [Oxira Studio](/website-builder/) and edit it with an AI designer, or let us do everything with [Online in a day](/online-in-a-day/).' },
            { t: 'A custom website or platform', d: 'For companies that need a bespoke design, a customer portal or integration with internal systems. We start with a discovery session, then propose the solution and plan as part of our [software development](/services/software-development/) service.' },
          ],
        },
        {
          h: 'Why businesses choose Oxira',
          list: [
            'A Saudi team in Riyadh that understands the local market and works with you directly.',
            'Real examples in [our work](/work/), including websites for events, construction and trading companies.',
            'Add [online booking](/products/booking-system/), an [AI chatbot](/products/ai-chatbot/) or [Google SEO](/products/google-seo/) later without rebuilding the site.',
            'A free consultation before we start, and a written quote that states what is and is not included.',
          ],
        },
        {
          h: 'Before you ask for a quote',
          p: ['Prepare a list of your services, photos of your work and your logo, and decide whether you need a second language. Ask any web design company who owns the domain and content, what hosting and renewal cost each year, and who updates the site after launch.'],
        },
      ],
      faq: [
        { q: 'How long does a company website take?', a: 'A ready website from Oxira Studio can go live the same day, and the "Online in a day" bundle is delivered within one working day after we receive your details. Custom websites depend on pages and integrations; we state the timeline in the quote.' },
        { q: 'Will the website be in Arabic and English?', a: 'Yes. We design bilingual websites with the right direction for each language and search optimisation for both versions.' },
        { q: 'Can I edit the content myself?', a: 'Yes. You get a dashboard to edit text, images and services, and our support team can make updates for you.' },
        { q: 'Will my website appear on Google?', a: 'We build every site with technical SEO basics and connect it to your Google business profile. Rankings depend on competition and content, so nobody can guarantee a position; our Google SEO add-on keeps improving it monthly.' },
      ],
      ctaTitle: 'Start your company website today',
      ctaBody: 'Build your site yourself in minutes, or book a free consultation and we will suggest the right path.',
      related: [
        { path: '/services/ecommerce-store/', label: 'E-commerce store design' },
        { path: '/locations/riyadh/', label: 'Web design in Riyadh' },
        { path: '/products/google-seo/', label: 'Google SEO' },
        { path: '/work/', label: 'Our work' },
      ],
    },
  },

  // ───────────────────────────── E-commerce ─────────────────────────────
  {
    slug: 'ecommerce-store', kind: 'service', icon: 'software', area: KSA,
    ar: {
      title: 'تصميم متجر إلكتروني احترافي في السعودية | أوكسيرا',
      description: 'تصميم متجر إلكتروني يبيع فعلاً: صفحات منتجات واضحة، دفع إلكتروني، شحن، وربط بواتساب ووكيل ذكي يتابع الطلبات. استشارة مجانية قبل التنفيذ.',
      name: 'تصميم متجر إلكتروني',
      kicker: 'المتاجر الإلكترونية',
      h1: 'تصميم متجر إلكتروني يحوّل الزوار إلى مشترين',
      lead: 'المتجر الإلكتروني ليس صفحة منتجات فقط؛ هو تجربة شراء كاملة من أول زيارة حتى وصول الطلب. نصمم ونطوّر متاجر إلكترونية للشركات في السعودية، ونربطها بالدفع والشحن وخدمة العملاء على واتساب.',
      sections: [
        {
          h: 'ما الذي نبنيه في متجرك',
          list: [
            'واجهة متجر بهويتك، سريعة على الجوال حيث يتم أغلب الشراء.',
            'صفحات منتجات واضحة: صور، مقاسات أو خيارات، أسعار، وتوفر المخزون.',
            'سلة وخطوات دفع قصيرة، وربط بوابة دفع مرخّصة تدعم وسائل الدفع الشائعة في المملكة.',
            'إعداد طرق الشحن والتوصيل وسياسات الاستبدال والاسترجاع.',
            'لوحة تحكم لإدارة المنتجات والطلبات والعملاء.',
            'أساسيات الظهور في جوجل لكل صفحة منتج وتصنيف.',
          ],
        },
        {
          h: 'متجر على منصة جاهزة أم متجر مخصص؟',
          p: [
            'كثير من المتاجر تبدأ على منصات جاهزة مثل سلة أو زد أو Shopify، وهذا خيار ممتاز للبداية. وتحتاج متجراً مخصصاً عندما تكون لديك متطلبات لا تغطيها المنصة: تسعير خاص لعملاء الجملة، أو ربط مع نظام محاسبي أو مخزون داخلي، أو تجربة شراء مختلفة.',
            'في الحالتين نساعدك: نبني المتجر المخصص ضمن خدمات [تطوير البرمجيات](/services/software-development/)، وإذا كان متجرك على سلة أو زد أو Shopify نربط به [وكيل ذكاء اصطناعي](/ai-agents/) يرد على أسئلة العملاء عن حالة الطلبات ويذكّر بالسلات المتروكة.',
          ],
        },
        {
          h: 'ما بعد الإطلاق: كيف يأتي العملاء؟',
          p: ['المتجر بدون زوار لا يبيع. لذلك يمكن ربطه بخدمات النمو الشهرية لدينا:'],
          list: [
            '[إدارة الحملات الإعلانية](/products/ads-management/) على إنستغرام وفيسبوك بخطة لا تنطلق إلا بعد موافقتك.',
            '[إدارة السوشيال ميديا](/products/social-media-management/) بمنشورات بتصاميم هويتك.',
            '[تحسين الظهور في جوجل](/products/google-seo/) لصفحات المنتجات والتصنيفات.',
            '[وكيل واتساب ذكي](/ai-agents/) يرد على استفسارات المنتجات والطلبات على مدار الساعة.',
          ],
        },
        {
          h: 'ماذا تجهّز قبل أن نبدأ؟',
          list: [
            'قائمة المنتجات وتصنيفاتها وأسعارها، ولو مبدئياً في جدول.',
            'صور المنتجات، أو خطة لتصويرها بخلفية موحدة.',
            'طريقة التوصيل التي تفضلها، والمدن التي ستغطيها.',
            'بيانات نشاطك النظامية وسياسة الاستبدال والاسترجاع.',
          ],
        },
        {
          h: 'أخطاء شائعة تجعل المتجر لا يبيع',
          list: [
            'خطوات دفع طويلة تطلب من العميل إنشاء حساب قبل الشراء.',
            'صور منتجات صغيرة أو غير واضحة على شاشة الجوال.',
            'رسوم شحن تظهر للعميل في آخر خطوة فقط، فيترك السلة.',
            'عدم وضوح سياسة الاستبدال والاسترجاع، وهي من أول ما يبحث عنه المشتري الجديد.',
            'عدم وجود طريقة سريعة لسؤال المتجر قبل الشراء، مثل واتساب أو محادثة مباشرة.',
            'متجر بطيء التحميل؛ كل ثانية تأخير تعني زواراً يغادرون قبل أن يروا منتجاتك.',
          ],
          after: ['نراجع هذه النقاط في كل متجر نبنيه، ونختبر رحلة الشراء كاملة من الجوال قبل الإطلاق.'],
        },
        {
          h: 'متطلبات نظامية يجب أن تعرفها',
          p: [
            'قبل البيع أونلاين في المملكة، تأكد من توثيق متجرك عبر منصة الأعمال التابعة لوزارة التجارة بسجل تجاري أو وثيقة عمل حر، ومن عرض بيانات التواصل وسياسات الاستبدال والاسترجاع بوضوح. وإذا كنت مسجلاً في ضريبة القيمة المضافة فأنت ملزم بإصدار فواتير إلكترونية وفق متطلبات هيئة الزكاة والضريبة والجمارك. هذه المتطلبات قد تتحدث، فراجعها دائماً من مصادرها الرسمية. شرحنا الخطوات في مقال [كيف تنشئ متجراً إلكترونياً في السعودية](/blog/start-online-store-saudi/).',
          ],
        },
      ],
      faq: [
        { q: 'هل تصممون المتجر على سلة أو زد؟', a: 'نبني المتاجر المخصصة، ونربط وكلاء الذكاء الاصطناعي بالمتاجر القائمة على سلة وزد وShopify لمتابعة الطلبات والرد على العملاء. نساعدك في الجلسة الاستشارية على اختيار الأنسب لحجم نشاطك.' },
        { q: 'هل يدعم المتجر الدفع بمدى وApple Pay؟', a: 'نربط المتجر ببوابة دفع مرخّصة في المملكة، ووسائل الدفع المتاحة مثل مدى وApple Pay والبطاقات الائتمانية تعتمد على البوابة التي تتعاقد معها.' },
        { q: 'كم يستغرق تصميم متجر إلكتروني؟', a: 'يعتمد على عدد المنتجات والتكاملات المطلوبة مثل الشحن والمخزون والمحاسبة. نحدد المدة والمراحل في عرض السعر بعد فهم احتياجك.' },
        { q: 'هل أحتاج سجلاً تجارياً لفتح متجر إلكتروني؟', a: 'يتطلب توثيق المتجر في المملكة سجلاً تجارياً أو وثيقة عمل حر حسب نوع نشاطك. راجع المتطلبات المحدثة عبر منصة الأعمال التابعة لوزارة التجارة.' },
        { q: 'هل أستطيع إدارة المنتجات والأسعار بنفسي؟', a: 'نعم، تحصل على لوحة تحكم لإضافة المنتجات وتعديل الأسعار والمخزون ومتابعة الطلبات.' },
      ],
      ctaTitle: 'جاهز تبيع أونلاين؟',
      ctaBody: 'أخبرنا عن منتجاتك وطريقة بيعك الحالية، ونقترح لك المسار الأنسب لمتجرك.',
      related: [
        { path: '/services/web-design/', label: 'تصميم مواقع الشركات' },
        { path: '/products/ads-management/', label: 'إدارة الحملات الإعلانية' },
        { path: '/ai-agents/', label: 'وكيل ذكاء اصطناعي على واتساب' },
        { path: '/whatsapp-agent/', label: 'جرّب موظف واتساب ذكي مجاناً' },
        { path: '/blog/start-online-store-saudi/', label: 'دليل إنشاء متجر إلكتروني' },
      ],
    },
    en: {
      title: 'E-commerce Store Design in Saudi Arabia | Oxira',
      description: 'Online store design that sells: clear product pages, online payments, shipping, and an AI WhatsApp agent that follows up on orders. Free consultation.',
      name: 'E-commerce store design',
      kicker: 'Online stores',
      h1: 'E-commerce store design that turns visitors into buyers',
      lead: 'An online store is more than product pages; it is the whole buying journey from the first visit to delivery. We design and build online stores for businesses in Saudi Arabia and connect them to payments, shipping and WhatsApp customer service.',
      sections: [
        {
          h: 'What we build into your store',
          list: [
            'A storefront in your brand, fast on mobile where most purchases happen.',
            'Clear product pages with photos, options, prices and stock.',
            'A short checkout connected to a licensed payment gateway that supports common payment methods in the Kingdom.',
            'Shipping and delivery options, plus exchange and return policies.',
            'A dashboard to manage products, orders and customers.',
            'Search basics for every product and category page.',
          ],
        },
        {
          h: 'Ready-made platform or custom store?',
          p: [
            'Many stores start on platforms such as Salla, Zid or Shopify, which is a good way to begin. A custom store makes sense when you need what the platform cannot do: wholesale pricing, integration with your accounting or inventory system, or a different buying experience.',
            'We help either way: we build custom stores as part of [software development](/services/software-development/), and for stores on Salla, Zid or Shopify we connect an [AI agent](/ai-agents/) that answers order questions and reminds shoppers about abandoned carts.',
          ],
        },
        {
          h: 'After launch: bringing in customers',
          list: [
            '[Ads management](/products/ads-management/) on Instagram and Facebook, with plans that run only after you approve them.',
            '[Social media management](/products/social-media-management/) with posts in your brand design.',
            '[Google SEO](/products/google-seo/) for product and category pages.',
          ],
        },
        {
          h: 'Rules to know in Saudi Arabia',
          p: ['Before selling online in the Kingdom, register your store through the Ministry of Commerce Business Platform with a commercial registration or a freelance document, and show your contact details and return policy clearly. VAT-registered businesses must also issue e-invoices under ZATCA requirements. Always check the current rules with the official sources.'],
        },
      ],
      faq: [
        { q: 'Do you build stores on Salla or Zid?', a: 'We build custom stores, and we connect AI agents to existing stores on Salla, Zid and Shopify to follow up on orders and answer customers. In the consultation we help you choose what fits your size.' },
        { q: 'Will the store accept mada and Apple Pay?', a: 'We connect the store to a licensed payment gateway in the Kingdom. Available methods such as mada, Apple Pay and cards depend on the gateway you contract with.' },
        { q: 'How long does an online store take?', a: 'It depends on the number of products and integrations such as shipping, inventory and accounting. We set the timeline and milestones in the quote.' },
        { q: 'Can I manage products and prices myself?', a: 'Yes. You get a dashboard to add products, change prices and stock, and track orders.' },
      ],
      ctaTitle: 'Ready to sell online?',
      ctaBody: 'Tell us about your products and how you sell today, and we will suggest the right path for your store.',
      related: [
        { path: '/services/web-design/', label: 'Company website design' },
        { path: '/products/ads-management/', label: 'Ads management' },
        { path: '/ai-agents/', label: 'AI agent on WhatsApp' },
        { path: '/whatsapp-agent/', label: 'Try an AI WhatsApp employee free' },
      ],
    },
  },

  // ───────────────────────────── Software development ─────────────────────────────
  {
    slug: 'software-development', kind: 'service', icon: 'software', area: KSA,
    ar: {
      title: 'شركة برمجة وتطوير أنظمة في السعودية | أوكسيرا',
      description: 'أوكسيرا شركة برمجة سعودية في الرياض: تطوير برمجيات وأنظمة إدارية مخصصة، منصات ويب، تطبيقات جوال وربط الأنظمة، من تحليل المتطلبات حتى التشغيل والدعم.',
      name: 'تطوير البرمجيات والأنظمة',
      kicker: 'تطوير البرمجيات',
      h1: 'شركة برمجة سعودية لتطوير الأنظمة والمنصات المخصصة',
      lead: 'عندما لا تكفيك البرامج الجاهزة، تحتاج نظاماً مبنياً على طريقة عملك. نطوّر في أوكسيرا برمجيات مخصصة للشركات والجهات في المملكة: أنظمة إدارية وتجارية، منصات ويب، تطبيقات جوال، وتكاملات بين الأنظمة، مع فريق واحد من التحليل حتى التشغيل والدعم.',
      sections: [
        {
          h: 'ما الذي نطوّره',
          cards: [
            { t: 'أنظمة إدارية وتجارية', d: 'أنظمة طلبات ومخزون ومبيعات وموارد بشرية، ولوحات تحكم وتقارير مصممة على إجراءات شركتك.' },
            { t: 'منصات وبوابات ويب', d: 'بوابات عملاء وموردين، منصات حجز وتسجيل، ومواقع بمحتوى ديناميكي مرتبط بقواعد بيانات.' },
            { t: 'تطبيقات الجوال', d: 'تطبيقات iOS وأندرويد للعملاء أو للموظفين الميدانيين. تفاصيلها في صفحة [تطوير تطبيقات الجوال](/services/mobile-app-development/).' },
            { t: 'التكاملات والأتمتة', d: 'ربط الأنظمة ببعضها عبر واجهات API، ونقل البيانات وتوحيد التقارير. اقرأ عن [أتمتة الأعمال](/services/business-automation/).' },
            { t: 'المتاجر الإلكترونية', d: 'متاجر مخصصة بربط الدفع والشحن والمخزون، كما في صفحة [تصميم متجر إلكتروني](/services/ecommerce-store/).' },
            { t: 'حلول الذكاء الاصطناعي', d: 'تحليل البيانات، وقراءة المستندات واستخراج بياناتها، و[وكلاء ذكاء اصطناعي](/ai-agents/) يخدمون عملاءك وفريقك.' },
          ],
        },
        {
          h: 'متى تحتاج نظاماً مخصصاً؟',
          p: ['ليست كل مشكلة تحتاج برمجة من الصفر. لكن النظام المخصص يصبح الخيار الأوفر على المدى البعيد في حالات مثل:'],
          list: [
            'فريقك يستخدم جداول Excel متعددة ومتضاربة لإدارة العمل اليومي.',
            'تدفع اشتراكات في عدة برامج جاهزة لا يتواصل أي منها مع الآخر.',
            'إجراءاتك مختلفة عن السوق، والبرامج الجاهزة تفرض عليك طريقة لا تناسبك.',
            'تحتاج بوابة لعملائك أو مورديك تعرض بياناتهم وطلباتهم من نظامك مباشرة.',
            'حجم العمليات كبر ولم تعد الحلول المؤقتة تتحمله.',
          ],
        },
        {
          h: 'خبرة نبنيها في منتجاتنا أيضاً',
          p: [
            'لسنا شركة تنفّذ للعملاء فقط؛ نطوّر ونشغّل منتجاتنا بأنفسنا. أبرزها [منظومة Classti لإدارة المدارس](/classti/) التي تضم منصة إدارة المدرسة وتطبيقات للطالب والمعلم وولي الأمر والسائق، و[استوديو أوكسيرا](/website-builder/) لبناء المواقع بالذكاء الاصطناعي. هذه الخبرة في تشغيل أنظمة حقيقية يومياً تنعكس على المشاريع التي ننفذها لعملائنا.',
          ],
        },
        {
          h: 'كيف ندير مشروعك البرمجي',
          list: [
            'تحليل المتطلبات: نجلس مع أصحاب العلاقة ونوثّق ما يجب أن يقوم به النظام ومن سيستخدمه.',
            'التصميم: نماذج للواجهات وتصور لقاعدة البيانات والتكاملات قبل كتابة أي سطر برمجي.',
            'التطوير على مراحل: نسلّم أجزاء قابلة للتجربة على فترات واضحة لتراجعها مبكراً.',
            'الاختبار والإطلاق: اختبار الوظائف والأداء والصلاحيات، ثم نقل البيانات والتدريب.',
            'التشغيل والدعم: متابعة بعد الإطلاق وتطوير مستمر حسب احتياجك.',
          ],
        },
        {
          h: 'أسئلة اطرحها على أي شركة برمجة قبل التعاقد',
          list: [
            'من يملك الكود المصدري وقاعدة البيانات بعد التسليم؟ ويجب أن يكون الجواب مكتوباً في العقد.',
            'كيف ستراجع العمل أثناء التطوير؟ الأفضل نسخ تجريبية على مراحل لا عرض واحد في النهاية.',
            'أين سيُستضاف النظام، ومن يتحمل تكلفة الاستضافة والخدمات الخارجية؟',
            'ما الذي يشمله الدعم بعد الإطلاق، ولكم مدة؟',
            'كيف تُحمى البيانات، ومن يستطيع الوصول إليها؟',
          ],
          after: ['نجيب عن هذه الأسئلة كتابياً في عرض السعر قبل أن تلتزم بأي شيء.'],
        },
        {
          h: 'أمان البيانات والامتثال',
          p: [
            'نصمم الأنظمة بصلاحيات واضحة لكل مستخدم، واتصالات مشفرة، ونأخذ في الاعتبار متطلبات نظام حماية البيانات الشخصية في المملكة عند جمع البيانات ومعالجتها. ونناقش معك خيارات الاستضافة المناسبة لطبيعة بياناتك. تعرّف أكثر على ممارساتنا في صفحة [الثقة والأمان](/trust/).',
          ],
        },
      ],
      faq: [
        { q: 'ما الفرق بين نظام مخصص وبرنامج جاهز؟', a: 'البرنامج الجاهز أسرع وأقل تكلفة في البداية لكنه يفرض عليك طريقة عمله. النظام المخصص يُبنى على إجراءاتك ويتكامل مع أنظمتك الحالية، ويستحق الاستثمار عندما تكون إجراءاتك مختلفة أو حجم العمل كبيراً.' },
        { q: 'هل تطوّرون للجهات الحكومية والشركات الكبيرة؟', a: 'نعم، نعمل مع جهات حكومية وشركات خاصة، ويمكنك الاطلاع على قائمة عملائنا السابقين في صفحة أعمالنا.' },
        { q: 'من يملك الكود المصدري بعد التسليم؟', a: 'تُحدَّد ملكية الكود والحقوق في العقد قبل البدء، ونوضحها لك بشكل مكتوب في عرض السعر.' },
        { q: 'هل تقدمون دعماً بعد الإطلاق؟', a: 'نعم، نبقى معك بعد الإطلاق للتشغيل والمتابعة والتطوير والدعم الفني، حسب الاتفاق.' },
        { q: 'كيف أحصل على عرض سعر لمشروع برمجي؟', a: 'تواصل معنا وصف فكرتك باختصار، ونحدد جلسة استشارة مجانية لفهم المتطلبات، ثم نرسل عرضاً يوضح النطاق والمراحل والمدة والتكلفة.' },
      ],
      ctaTitle: 'لديك فكرة نظام أو منصة؟',
      ctaBody: 'احجز استشارة مجانية مع فريقنا، ونساعدك على تحويل الفكرة إلى نطاق عمل واضح.',
      related: [
        { path: '/services/mobile-app-development/', label: 'تطوير تطبيقات الجوال' },
        { path: '/services/digital-transformation/', label: 'التحول الرقمي' },
        { path: '/services/business-automation/', label: 'أتمتة الأعمال' },
        { path: '/locations/riyadh/', label: 'شركة برمجة في الرياض' },
      ],
    },
    en: {
      title: 'Software Development Company in Saudi Arabia | Oxira',
      description: 'Oxira is a Saudi software company in Riyadh: custom business systems, web platforms, mobile apps and integrations, from requirements to support.',
      name: 'Software development',
      kicker: 'Software development',
      h1: 'A Saudi software company for custom systems and platforms',
      lead: 'When off-the-shelf software does not fit, you need a system built around how you work. Oxira develops custom software for companies and public entities in the Kingdom: business systems, web platforms, mobile apps and integrations, with one team from analysis to operation and support.',
      sections: [
        {
          h: 'What we build',
          cards: [
            { t: 'Business systems', d: 'Orders, inventory, sales and HR systems, with dashboards and reports designed around your processes.' },
            { t: 'Web platforms and portals', d: 'Customer and supplier portals, booking and registration platforms, and data-driven websites.' },
            { t: 'Mobile apps', d: 'iOS and Android apps for customers or field teams. See [mobile app development](/services/mobile-app-development/).' },
            { t: 'Integration and automation', d: 'Connecting systems through APIs and unifying reports. Read about [business automation](/services/business-automation/).' },
          ],
        },
        {
          h: 'Experience from running our own products',
          p: ['We also build and operate our own products, such as the [Classti school management suite](/classti/), with a school platform and apps for students, teachers, parents and drivers, and the AI-powered [Oxira Studio](/website-builder/) website builder.'],
        },
        {
          h: 'How we run your project',
          list: [
            'Requirements: we document what the system must do and who will use it.',
            'Design: interface mock-ups, data model and integrations before coding.',
            'Development in stages: testable releases at clear intervals.',
            'Testing and launch: functional, performance and permission testing, data migration and training.',
            'Operation and support after launch.',
          ],
        },
        {
          h: 'Data security',
          p: ['We design systems with clear user permissions and encrypted connections, and take the Saudi Personal Data Protection Law into account. See [Trust & security](/trust/).'],
        },
      ],
      faq: [
        { q: 'Custom system or ready-made software?', a: 'Ready-made software is faster and cheaper to start but makes you follow its way of working. A custom system fits your processes and integrates with what you already use.' },
        { q: 'Who owns the source code?', a: 'Code ownership and rights are agreed in the contract before we start and stated in writing in the quote.' },
        { q: 'Do you provide support after launch?', a: 'Yes. We stay with you for operation, monitoring, improvements and technical support, as agreed.' },
        { q: 'How do I get a quote?', a: 'Contact us with a short description. We book a free consultation, then send a quote with scope, milestones, timeline and cost.' },
      ],
      ctaTitle: 'Have an idea for a system or platform?',
      ctaBody: 'Book a free consultation and we will help you turn it into a clear scope of work.',
      related: [
        { path: '/services/mobile-app-development/', label: 'Mobile app development' },
        { path: '/services/digital-transformation/', label: 'Digital transformation' },
        { path: '/services/business-automation/', label: 'Business automation' },
      ],
    },
  },

  // ───────────────────────────── Mobile apps ─────────────────────────────
  {
    slug: 'mobile-app-development', kind: 'service', icon: 'software', area: KSA,
    ar: {
      title: 'تطوير تطبيقات الجوال iOS وأندرويد | أوكسيرا',
      description: 'تطوير تطبيقات جوال للشركات في السعودية على iOS وأندرويد: من الفكرة وتصميم الواجهات إلى النشر في المتاجر والدعم، بالعربية والإنجليزية ولوحة تحكم.',
      name: 'تطوير تطبيقات الجوال',
      kicker: 'تطبيقات الجوال',
      h1: 'تطوير تطبيقات الجوال لأعمالك على iOS وأندرويد',
      lead: 'التطبيق الناجح يحل مشكلة يومية لعملائك أو لفريقك. نطوّر في أوكسيرا تطبيقات جوال للشركات والجهات في المملكة، بواجهات عربية وإنجليزية، ولوحة تحكم لإدارة المحتوى والمستخدمين، ونرافقك حتى النشر في App Store وGoogle Play وما بعده.',
      sections: [
        {
          h: 'متى تحتاج تطبيقاً وليس موقعاً فقط؟',
          p: ['الموقع الإلكتروني يكفي أغلب الأنشطة للتعريف واستقبال الطلبات. أما التطبيق فيستحق الاستثمار عندما:'],
          list: [
            'يستخدم عملاؤك خدمتك بشكل متكرر، مثل الطلب أو الحجز أو متابعة حساب.',
            'تحتاج إشعارات فورية تصل للمستخدم على جواله.',
            'تعتمد الخدمة على ميزات الجهاز مثل الموقع الجغرافي أو الكاميرا أو العمل بدون إنترنت.',
            'لديك فريق ميداني يحتاج أداة عمل يومية: تسجيل زيارات، بلاغات، أو تحضير.',
          ],
          },
        {
          h: 'من الفكرة إلى المتجر',
          list: [
            'ورشة فهم: نحدد المستخدمين والمهام الأساسية، ونختار ما يدخل في الإصدار الأول.',
            'تصميم الواجهات: نماذج قابلة للتجربة باللغتين قبل البرمجة.',
            'التطوير: التطبيق ولوحة التحكم والواجهات البرمجية التي تربطه بأنظمتك.',
            'الاختبار: على أجهزة وأحجام شاشات مختلفة، مع اختبار الصلاحيات والأداء.',
            'النشر: تجهيز صفحات التطبيق ومتطلبات المراجعة في App Store وGoogle Play.',
            'التطوير المستمر: تحديثات وإصلاحات وميزات جديدة بناءً على استخدام حقيقي.',
          ],
        },
        {
          h: 'تطبيقات طوّرناها لمنتجاتنا',
          p: [
            'منظومة [Classti لإدارة المدارس](/classti/) التي نطوّرها ونشغّلها في أوكسيرا تضم تطبيقاً للطالب يعرض الحصص والواجبات والدرجات وتتبع الحافلة، وتطبيقاً للمعلم للتحضير ورصد الدرجات والتواصل مع أولياء الأمور، إضافة إلى تطبيقي ولي الأمر والسائق. هذه التجربة في بناء تطبيقات يستخدمها أشخاص مختلفون في نظام واحد هي ما نقدمه لمشروعك.',
          ],
        },
        {
          h: 'أخطاء شائعة في مشاريع التطبيقات',
          list: [
            'إصدار أول مزدحم بكل الأفكار، فيتأخر الإطلاق شهوراً قبل أن يجربه مستخدم حقيقي.',
            'تطبيق بلا خطة لجذب المستخدمين؛ النشر في المتجر لا يعني أن الناس سيجدونه.',
            'نسيان لوحة التحكم، فيضطر صاحب النشاط للرجوع للمبرمج في كل تعديل بسيط.',
            'تسجيل حساب المطوّر باسم شخص بدل الشركة، ما يعقّد نقل الملكية لاحقاً.',
            'إهمال التحديثات بعد الإطلاق حتى يتوقف التطبيق عن العمل مع إصدارات الجوال الجديدة.',
          ],
        },
        {
          h: 'ما الذي تستلمه في نهاية المشروع',
          list: [
            'التطبيق منشوراً في App Store وGoogle Play باسم شركتك.',
            'لوحة تحكم ويب لإدارة المحتوى والمستخدمين والطلبات والإشعارات.',
            'الواجهات البرمجية التي تربط التطبيق بأنظمتك، مع توثيق يساعد أي فريق تقني لاحقاً.',
            'جلسة تدريب لفريقك على لوحة التحكم.',
            'خطة دعم وتحديثات متفق عليها، لأن أنظمة iOS وأندرويد تتحدث كل عام.',
          ],
          after: ['ونحرص على تجربة عربية سليمة: خطوط واضحة، واتجاه صحيح من اليمين لليسار، ونصوص مكتوبة بلغة المستخدم لا مترجمة حرفياً.'],
        },
        {
          h: 'ما الذي يحدد تكلفة تطوير التطبيق؟',
          list: [
            'عدد الشاشات والمهام، وهل يحتاج التطبيق أكثر من نوع مستخدم.',
            'التكاملات: الدفع، الخرائط، أنظمة الشركة الداخلية.',
            'لوحة التحكم والتقارير المطلوبة.',
            'دعم اللغتين، والتشغيل على iOS وأندرويد معاً.',
            'خطة الدعم والتطوير بعد الإطلاق.',
          ],
          after: ['نرسل عرض سعر مفصلاً بعد جلسة الاستشارة. وإذا كنت محتاراً بين الموقع والتطبيق، اقرأ مقال [تطبيق جوال أم موقع إلكتروني؟](/blog/app-or-website/).'],
        },
      ],
      faq: [
        { q: 'هل تطوّرون التطبيق على iOS وأندرويد معاً؟', a: 'نعم، نطوّر التطبيق ليعمل على النظامين، ونختار طريقة التطوير المناسبة حسب متطلبات المشروع.' },
        { q: 'هل تتولون نشر التطبيق في المتاجر؟', a: 'نعم، نجهز متطلبات النشر ونرافقك في مراجعة App Store وGoogle Play. يكون حساب المطوّر باسم شركتك لتبقى ملكية التطبيق لك.' },
        { q: 'هل يمكن ربط التطبيق بنظامنا الحالي؟', a: 'نعم، نربط التطبيق بالأنظمة القائمة عبر واجهات برمجية API بعد دراسة النظام الحالي.' },
        { q: 'هل تحتاج التطبيقات إلى صيانة بعد الإطلاق؟', a: 'نعم، تصدر أنظمة iOS وأندرويد تحديثات سنوية، وقد تتغير متطلبات المتاجر، لذلك نتفق معك على خطة دعم وتحديثات تحافظ على عمل التطبيق.' },
        { q: 'هل التطبيق بالعربية والإنجليزية؟', a: 'نعم، نصمم واجهات التطبيق باللغتين مع اتجاه صحيح لكل لغة، ويمكن للمستخدم اختيار لغته أو أن يتبع التطبيق لغة جواله.' },
        { q: 'كم يستغرق تطوير تطبيق؟', a: 'تعتمد المدة على حجم الإصدار الأول وعدد التكاملات. ننصح بإصدار أول مركّز على المهام الأساسية لتطلقه أسرع ثم تطوّره.' },
      ],
      ctaTitle: 'لديك فكرة تطبيق؟',
      ctaBody: 'شاركنا الفكرة في رسالة قصيرة، ونحدد معك جلسة استشارة مجانية.',
      related: [
        { path: '/services/software-development/', label: 'تطوير البرمجيات' },
        { path: '/classti/', label: 'منظومة Classti' },
        { path: '/services/web-design/', label: 'تصميم مواقع الشركات' },
      ],
    },
    en: {
      title: 'Mobile App Development, iOS and Android | Oxira',
      description: 'Mobile app development for businesses in Saudi Arabia on iOS and Android: from idea and UI design to store release and support, in Arabic and English.',
      name: 'Mobile app development',
      kicker: 'Mobile apps',
      h1: 'Mobile app development for iOS and Android',
      lead: 'A successful app solves an everyday problem for your customers or your team. We build mobile apps for companies in the Kingdom with Arabic and English interfaces and a dashboard to manage content and users, and we stay with you through App Store and Google Play release and beyond.',
      sections: [
        {
          h: 'When you need an app, not just a website',
          list: [
            'Customers use your service repeatedly: ordering, booking or tracking an account.',
            'You need push notifications.',
            'The service relies on device features such as location, camera or offline use.',
            'A field team needs a daily work tool for visits, reports or attendance.',
          ],
        },
        {
          h: 'From idea to store',
          list: [
            'Discovery: users, core tasks and the scope of the first release.',
            'UI design: clickable mock-ups in both languages before coding.',
            'Development: the app, the dashboard and the APIs that connect it to your systems.',
            'Testing on different devices, plus permissions and performance.',
            'Release on the App Store and Google Play, then ongoing improvements.',
          ],
        },
        {
          h: 'Apps we built for our own products',
          p: ['Our [Classti school suite](/classti/) includes a student app (classes, homework, grades, bus tracking), a teacher app (attendance, grading, parent messages), and parent and driver apps.'],
        },
      ],
      faq: [
        { q: 'Do you build for both iOS and Android?', a: 'Yes, and we choose the development approach that suits the project requirements.' },
        { q: 'Do you publish the app to the stores?', a: 'Yes. We prepare the release and guide you through App Store and Google Play review. The developer account is in your company name, so you own the app.' },
        { q: 'Can the app connect to our current system?', a: 'Yes, through APIs after we study the existing system.' },
      ],
      ctaTitle: 'Have an app idea?',
      ctaBody: 'Send us a short message and we will book a free consultation.',
      related: [
        { path: '/services/software-development/', label: 'Software development' },
        { path: '/classti/', label: 'Classti' },
      ],
    },
  },

  // ───────────────────────────── Digital transformation ─────────────────────────────
  {
    slug: 'digital-transformation', kind: 'service', icon: 'transform', area: KSA,
    ar: {
      title: 'شركة تحول رقمي في السعودية | أوكسيرا',
      description: 'أوكسيرا شركة تحول رقمي سعودية: استشارات وتقييم للوضع الحالي، خارطة طريق، أتمتة الإجراءات وتطوير الأنظمة والبنية التحتية، لجهات حكومية وشركات خاصة.',
      name: 'التحول الرقمي',
      kicker: 'التحول الرقمي',
      h1: 'شركة تحول رقمي تنقل جهتك من الورق إلى الأنظمة',
      lead: 'التحول الرقمي ليس شراء برنامج جديد؛ هو إعادة التفكير في طريقة عمل جهتك بحيث تصبح الإجراءات أسرع والبيانات أوضح وخدمة العملاء أفضل. نرافق الجهات الحكومية والشركات في المملكة من التقييم والاستراتيجية حتى التنفيذ والتشغيل.',
      sections: [
        {
          h: 'خدمات التحول الرقمي لدينا',
          cards: [
            { t: 'تقييم الوضع الحالي', d: 'نحصر الإجراءات والأنظمة والبيانات الحالية، ونحدد أين يضيع الوقت وأين تتكرر الأعمال يدوياً.' },
            { t: 'الاستراتيجية وخارطة الطريق', d: 'خطة مرحلية بأولويات واضحة، تبدأ بما يحقق أثراً سريعاً وتبني عليه.' },
            { t: 'تنفيذ المشاريع الرقمية', d: 'تطوير الأنظمة والمنصات وربطها، ضمن خدمات [تطوير البرمجيات](/services/software-development/).' },
            { t: 'أتمتة الإجراءات', d: 'تحويل المهام المتكررة إلى مسارات تلقائية مع [أتمتة الأعمال](/services/business-automation/) و[وكلاء الذكاء الاصطناعي](/ai-agents/).' },
            { t: 'البنية التحتية والأمن', d: 'حلول الحوسبة السحابية والشبكات وأمن المعلومات ودعم أنظمة تقنية المعلومات.' },
            { t: 'إدارة المحتوى والمنصات', d: 'تطوير منصات إدارة المحتوى والمواقع الرسمية والبوابات الإلكترونية.' },
          ],
        },
        {
          h: 'كيف تبدأ رحلة التحول الرقمي؟',
          list: [
            'حدد هدفاً قابلاً للقياس: تقليل وقت إنجاز طلب، أو رفع رضا العملاء، أو توحيد البيانات في مصدر واحد.',
            'ابدأ بإجراء واحد مؤلم ومتكرر، وأثبت الفائدة قبل التوسع.',
            'اجعل المستخدمين جزءاً من التصميم؛ أفضل نظام يفشل إذا لم يستخدمه الفريق.',
            'خطط للبيانات من البداية: من يدخلها، ومن يراها، وكيف تُحمى.',
            'قِس النتائج بعد الإطلاق وطوّر بشكل مستمر.',
          ],
        },
        {
          h: 'علامات أن جهتك تحتاج تحولاً رقمياً',
          list: [
            'المعاملات تنتقل بين الإدارات ورقياً أو بالإيميل، ولا يعرف أحد أين توقفت.',
            'كل إدارة تحتفظ ببياناتها في ملف مختلف، والتقرير الشهري يحتاج أياماً لتجميعه.',
            'العملاء يتصلون للسؤال عن حالة طلباتهم لأنهم لا يستطيعون معرفتها بأنفسهم.',
            'أنظمة قديمة لا تتكامل مع بعضها، وكل تعديل عليها مكلف وبطيء.',
            'الإدارة تتخذ القرارات دون أرقام محدثة.',
          ],
          after: ['إذا انطبقت عليك نقطتان أو أكثر، فالخطوة الأولى ليست شراء نظام، بل تقييم سريع يحدد أين تبدأ.'],
        },
        {
          h: 'التحول الرقمي في سياق رؤية المملكة',
          p: [
            'تتجه الجهات في المملكة إلى تقديم خدماتها رقمياً ورفع كفاءتها التشغيلية، ومعها ترتفع توقعات العملاء والمراجعين لخدمة سريعة على مدار الساعة. ونأخذ في الاعتبار عند التصميم متطلبات نظام حماية البيانات الشخصية وأفضل ممارسات أمن المعلومات. نفهم هذا السياق من عملنا مع جهات حكومية وشركات خاصة تجد بعضها في قائمة [عملائنا السابقين](/work/).',
          ],
        },
        {
          h: 'ماذا تحصل عليه من مرحلة التقييم؟',
          list: [
            'صورة واضحة للإجراءات والأنظمة الحالية ونقاط التأخير والتكرار فيها.',
            'قائمة بالفرص مرتبة حسب الأثر المتوقع وسهولة التنفيذ.',
            'خارطة طريق مرحلية: ما الذي نبدأ به، وما الذي يأتي لاحقاً، وما المتطلبات المسبقة لكل مرحلة.',
            'مقاييس نجاح متفق عليها لكل مرحلة، حتى يكون التقدم قابلاً للقياس.',
          ],
          after: ['ويمكنك تنفيذ خارطة الطريق معنا أو مع أي فريق آخر؛ الهدف أن تعرف جهتك بوضوح إلى أين تتجه.'],
        },
        {
          h: 'أمثلة لما يمكن تحويله رقمياً',
          list: [
            'استقبال طلبات العملاء والمراجعين وتتبع حالتها بدل البريد والهاتف.',
            'تقارير يومية وأسبوعية تُجمع تلقائياً من أكثر من نظام.',
            'بلاغات ميدانية من فرق التشغيل تصل للمسؤول فوراً وتُتابع حتى الإغلاق.',
            'خدمة عملاء على واتساب ترد على الأسئلة المتكررة وتسجل الطلبات.',
            'إدارة متكاملة للمدارس عبر [منظومة Classti](/classti/).',
          ],
        },
      ],
      faq: [
        { q: 'ما الفرق بين التحول الرقمي والأتمتة؟', a: 'الأتمتة جزء من التحول الرقمي: تحويل مهمة متكررة إلى عملية تلقائية. أما التحول الرقمي فيشمل الاستراتيجية والإجراءات والأنظمة والبيانات والأشخاص معاً.' },
        { q: 'هل تعملون مع الجهات الحكومية؟', a: 'نعم، نعمل مع جهات حكومية وشركات خاصة في أنحاء المملكة.' },
        { q: 'من أين نبدأ إذا كانت ميزانيتنا محدودة؟', a: 'نبدأ بتقييم سريع ونختار إجراءً واحداً يحقق أثراً واضحاً، ثم نبني عليه على مراحل بدل مشروع ضخم دفعة واحدة.' },
        { q: 'هل تقدمون التشغيل والدعم بعد التنفيذ؟', a: 'نعم، نبقى معك بعد الإطلاق للتشغيل والمتابعة والتطوير والدعم الفني.' },
        { q: 'كيف نضمن أن يستخدم الموظفون الأنظمة الجديدة؟', a: 'نشرك المستخدمين في تصميم الإجراء من البداية، ونطلق على مراحل مع تدريب عملي، ونتابع الاستخدام بعد الإطلاق ونعدّل ما يعيق الفريق.' },
      ],
      ctaTitle: 'ابدأ التحول الرقمي بخطوة واضحة',
      ctaBody: 'احجز استشارة مجانية نراجع فيها وضعك الحالي ونقترح أول خطوة عملية.',
      related: [
        { path: '/services/business-automation/', label: 'أتمتة الأعمال' },
        { path: '/services/software-development/', label: 'تطوير البرمجيات' },
        { path: '/services/', label: 'كل الخدمات' },
      ],
    },
    en: {
      title: 'Digital Transformation Company in Saudi Arabia | Oxira',
      description: 'Saudi digital transformation company: assessment, roadmap, process automation, systems and infrastructure for public entities and companies.',
      name: 'Digital transformation',
      kicker: 'Digital transformation',
      h1: 'A digital transformation partner from paper to systems',
      lead: 'Digital transformation is not buying new software; it is rethinking how your organisation works so processes are faster, data is clearer and customers are served better. We support public entities and companies in the Kingdom from assessment and strategy to delivery and operation.',
      sections: [
        {
          h: 'Our digital transformation services',
          cards: [
            { t: 'Current-state assessment', d: 'We map processes, systems and data, and find where time is lost to manual, repeated work.' },
            { t: 'Strategy and roadmap', d: 'A phased plan with clear priorities, starting with quick, visible wins.' },
            { t: 'Delivery', d: 'Systems and platforms built and connected through our [software development](/services/software-development/) service.' },
            { t: 'Process automation', d: 'Repeated tasks turned into automatic flows with [business automation](/services/business-automation/) and [AI agents](/ai-agents/).' },
          ],
        },
        {
          h: 'How to start',
          list: [
            'Set a measurable goal, such as faster request handling or one source of truth for data.',
            'Start with one painful, repeated process and prove the value before scaling.',
            'Involve users in the design.',
            'Plan data ownership and protection from day one.',
            'Measure after launch and keep improving.',
          ],
        },
      ],
      faq: [
        { q: 'What is the difference between transformation and automation?', a: 'Automation turns a repeated task into an automatic process. Digital transformation covers strategy, processes, systems, data and people together.' },
        { q: 'Do you work with public entities?', a: 'Yes, we work with public entities and private companies across the Kingdom.' },
        { q: 'Where do we start on a limited budget?', a: 'With a quick assessment and one process that delivers a clear result, then we build on it in stages.' },
      ],
      ctaTitle: 'Start with one clear step',
      ctaBody: 'Book a free consultation to review where you are and agree a practical first step.',
      related: [
        { path: '/services/business-automation/', label: 'Business automation' },
        { path: '/services/software-development/', label: 'Software development' },
        { path: '/services/', label: 'All services' },
      ],
    },
  },

  // ───────────────────────────── Business automation ─────────────────────────────
  {
    slug: 'business-automation', kind: 'service', icon: 'agent', area: KSA,
    ar: {
      title: 'أتمتة الأعمال وربط الأنظمة للشركات | أوكسيرا',
      description: 'أتمتة الأعمال للشركات في السعودية: ربط الأنظمة ببعض، تقارير تلقائية، قراءة المستندات واستخراج بياناتها، وتنبيهات فورية لفريقك، مع الذكاء الاصطناعي.',
      name: 'أتمتة الأعمال',
      kicker: 'أتمتة العمليات',
      h1: 'أتمتة الأعمال: دع الأنظمة تقوم بالمهام المتكررة',
      lead: 'كم ساعة يقضيها فريقك أسبوعياً في نسخ بيانات من نظام لآخر، أو تجميع تقرير، أو متابعة طلب عبر الإيميل؟ نصمم في أوكسيرا مسارات أتمتة تربط أنظمتك ببعضها وتنجز هذه المهام تلقائياً، ليتفرغ فريقك للعمل الذي يحتاج إنساناً.',
      sections: [
        {
          h: 'ماذا يمكن أن نؤتمت لك؟',
          cards: [
            { t: 'ربط الأنظمة', d: 'طلب جديد في الموقع يُسجَّل في نظام المبيعات وجدول المتابعة ويصل تنبيه للمسؤول، بدون إدخال يدوي.' },
            { t: 'التقارير التلقائية', d: 'تقارير يومية أو أسبوعية تُجمع من أكثر من مصدر وتصل لبريدك أو واتساب في موعدها.' },
            { t: 'قراءة المستندات', d: 'استخراج البيانات من الفواتير والنماذج والمستندات بالذكاء الاصطناعي وإدخالها في النظام بعد المراجعة.' },
            { t: 'البلاغات والطلبات الداخلية', d: 'استقبال البلاغات الميدانية وتوجيهها للفريق المختص وتصعيدها إذا تأخرت.' },
            { t: 'متابعة العملاء', d: 'رسائل تذكير بالمواعيد، ومتابعة العملاء المحتملين، وتنبيه فريق المبيعات فوراً.' },
            { t: 'خدمة العملاء', d: '[وكيل ذكاء اصطناعي على واتساب](/ai-agents/) يرد على العملاء ويسجل طلباتهم في نظامك مباشرة.' },
          ],
        },
        {
          h: 'أمثلة حسب القطاع',
          cards: [
            { t: 'العيادات والمراكز الطبية', d: 'تأكيد الحجوزات والتذكير بها، وإرسال ملخص يومي بالمواعيد لكل طبيب.' },
            { t: 'المتاجر الإلكترونية', d: 'تقارير مبيعات يومية وأسبوعية، وتذكير السلات المتروكة، وتنبيه عند نفاد المخزون.' },
            { t: 'المعارض والفعاليات', d: 'تسجيل بلاغات فرق التشغيل الميدانية برقم، وتوجيهها للفريق المختص، وتصعيد المتأخر منها.' },
            { t: 'المدارس', d: 'توجيه طلبات أولياء الأمور للقسم المختص، ومتابعة طلبات القبول والتسجيل.' },
            { t: 'العقار والمبيعات', d: 'استقبال العملاء المحتملين من الإعلانات والموقع، وتوزيعهم على فريق المبيعات فوراً.' },
            { t: 'الإدارة والمالية', d: 'قراءة الفواتير الواردة، وتجميع أرقام الأقسام في تقرير واحد للإدارة.' },
          ],
        },
        {
          h: 'كيف نعمل على مشروع الأتمتة',
          list: [
            'نرسم الإجراء الحالي خطوة بخطوة ونحدد أين يتكرر العمل اليدوي.',
            'نختار الأتمتة الأعلى أثراً والأقل تعقيداً لتكون البداية.',
            'نبني المسار ونربطه بأنظمتك عبر واجهاتها البرمجية، مع سجل لكل عملية.',
            'نضع نقاط مراجعة بشرية حيث يلزم، خاصة في القرارات المالية أو الحساسة.',
            'نراقب الأداء بعد التشغيل ونطوّر المسار حسب ملاحظات فريقك.',
          ],
        },
        {
          h: 'جهّز هذا للاجتماع الأول',
          list: [
            'وصفاً مختصراً لإجراء واحد يستهلك وقت فريقك: من يبدأه، وما خطواته، وأين ينتهي.',
            'أسماء الأنظمة والأدوات المستخدمة فيه: البريد، الجداول، نظام المبيعات أو المحاسبة.',
            'تقديراً تقريبياً لعدد مرات تكراره أسبوعياً والوقت الذي يستغرقه.',
            'ما الذي يحدث عندما يتأخر أو يُنسى: عميل ينتظر، أو تقرير ناقص، أو خطأ مالي.',
          ],
          after: ['بهذه المعلومات نستطيع في جلسة واحدة أن نقترح شكل الأتمتة المناسبة وما تحتاجه من أنظمتك.'],
        },
        {
          h: 'الأتمتة والذكاء الاصطناعي',
          p: [
            'الأتمتة التقليدية ممتازة للمهام ذات القواعد الثابتة. والذكاء الاصطناعي يضيف القدرة على فهم النصوص والرسائل الصوتية والمستندات غير المنظمة. نجمع بين الاثنين: قواعد واضحة حيث يجب الدقة، وذكاء اصطناعي حيث يحتاج الأمر فهماً للغة، مع إبقاء القرار النهائي لفريقك عند الحاجة.',
            'إذا كانت أتمتة الأعمال جزءاً من خطة أوسع لتطوير جهتك، فاطّلع على خدمة [التحول الرقمي](/services/digital-transformation/). ولمعرفة من أين تبدأ، اقرأ مقال [أتمتة الأعمال للشركات الصغيرة والمتوسطة](/blog/business-automation-guide/).',
          ],
        },
      ],
      faq: [
        { q: 'هل تحتاج الأتمتة إلى تغيير أنظمتنا الحالية؟', a: 'غالباً لا. نربط الأنظمة القائمة ببعضها عبر واجهاتها البرمجية أو طرق التصدير المتاحة، ونقترح التغيير فقط إذا كان النظام لا يسمح بالربط.' },
        { q: 'ما الفرق بين أتمتة الأعمال ووكيل الذكاء الاصطناعي؟', a: 'وكيل الذكاء الاصطناعي يتحدث مع العملاء على واتساب أو الموقع. أتمتة الأعمال تشمل كل ما يحدث خلف الكواليس: ربط الأنظمة والتقارير والمستندات والتنبيهات. وغالباً يعمل الاثنان معاً.' },
        { q: 'هل بياناتنا آمنة؟', a: 'نصمم المسارات بأقل صلاحيات لازمة، ونستخدم اتصالات مشفرة، ونناقش معك أين تُعالج البيانات وفق نظام حماية البيانات الشخصية.' },
        { q: 'ماذا يحدث إذا توقف أحد الأنظمة المرتبطة؟', a: 'نصمم كل مسار بحيث يسجل العمليات الفاشلة وينبّه المسؤول، فلا يضيع طلب بصمت، ويمكن إعادة تشغيل العملية بعد عودة النظام.' },
        { q: 'كيف تُسعَّر خدمة الأتمتة؟', a: 'حسب عدد المسارات والأنظمة المرتبطة وحجم الاستخدام، كإعداد لمرة واحدة أو اشتراك يشمل التشغيل والمتابعة. نرسل العرض بعد فهم احتياجك.' },
      ],
      ctaTitle: 'ما المهمة التي تريد التخلص منها؟',
      ctaBody: 'صف لنا إجراءً واحداً متكرراً في عملك، ونقترح عليك كيف نؤتمته.',
      related: [
        { path: '/ai-agents/', label: 'وكيل ذكاء اصطناعي على واتساب' },
        { path: '/whatsapp-agent/', label: 'جرّب موظف واتساب ذكي مجاناً' },
        { path: '/services/digital-transformation/', label: 'التحول الرقمي' },
        { path: '/services/software-development/', label: 'تطوير البرمجيات' },
      ],
    },
    en: {
      title: 'Business Process Automation for Companies | Oxira',
      description: 'Business automation for companies in Saudi Arabia: connect your systems, automatic reports, AI document reading and instant alerts for your team.',
      name: 'Business automation',
      kicker: 'Process automation',
      h1: 'Business automation: let systems do the repetitive work',
      lead: 'How many hours does your team spend each week copying data between systems, compiling reports or chasing requests by email? We design automations that connect your systems and do this work automatically, so your people can focus on work that needs a human.',
      sections: [
        {
          h: 'What we can automate',
          cards: [
            { t: 'System integration', d: 'A new website request is logged in your sales system and tracking sheet, and the right person is alerted, with no manual entry.' },
            { t: 'Automatic reports', d: 'Daily or weekly reports compiled from several sources and sent to email or WhatsApp on time.' },
            { t: 'Document reading', d: 'AI extracts data from invoices, forms and documents and enters it after review.' },
            { t: 'Customer service', d: 'An [AI agent on WhatsApp](/ai-agents/) answers customers and logs their requests in your system.' },
          ],
        },
        {
          h: 'How we work',
          list: [
            'Map the current process and find the manual, repeated steps.',
            'Start with the highest-impact, lowest-complexity automation.',
            'Build and connect it through your systems\' APIs, with a log of every run.',
            'Keep human review where needed, especially for financial or sensitive decisions.',
            'Monitor after launch and improve with your team\'s feedback.',
          ],
        },
      ],
      faq: [
        { q: 'Do we need to replace our systems?', a: 'Usually not. We connect existing systems through their APIs or available exports, and only suggest a change if a system cannot be connected.' },
        { q: 'Automation or AI agent?', a: 'The AI agent talks to customers on WhatsApp or your website. Business automation covers what happens behind the scenes. They often work together.' },
        { q: 'How is it priced?', a: 'By the number of flows, connected systems and usage, as a one-off setup or a subscription that includes operation. We quote after understanding your needs.' },
      ],
      ctaTitle: 'Which task do you want to get rid of?',
      ctaBody: 'Describe one repeated process and we will suggest how to automate it.',
      related: [
        { path: '/ai-agents/', label: 'AI agents' },
        { path: '/whatsapp-agent/', label: 'Try an AI WhatsApp employee free' },
        { path: '/services/digital-transformation/', label: 'Digital transformation' },
      ],
    },
  },

  // ───────────────────────────── Riyadh ─────────────────────────────
  {
    slug: 'riyadh', kind: 'location', icon: 'software', area: [{ type: 'City', name: 'Riyadh' }], studio: true,
    ar: {
      title: 'شركة تصميم مواقع وبرمجة في الرياض | أوكسيرا',
      description: 'أوكسيرا شركة سعودية مقرها الرياض على طريق العروبة: تصميم مواقع وتطوير أنظمة وتطبيقات ووكلاء ذكاء اصطناعي للشركات والجهات في الرياض، مع اجتماعات حضورية.',
      name: 'أوكسيرا في الرياض',
      kicker: 'الرياض',
      h1: 'شركة تصميم مواقع وبرمجة في قلب الرياض',
      lead: 'مقر أوكسيرا في حي السليمانية على طريق العروبة بالرياض. نعمل مع الشركات والجهات في العاصمة على تصميم المواقع وتطوير الأنظمة والتطبيقات ووكلاء الذكاء الاصطناعي، ونلتقي بك حضورياً متى احتاج المشروع ذلك.',
      sections: [
        {
          h: 'لماذا تختار شركة في الرياض؟',
          p: [
            'المشاريع التقنية تنجح بالتواصل الواضح. وجودنا في الرياض يعني أن ورش فهم المتطلبات وعروض النماذج والتدريب على الأنظمة يمكن أن تتم وجهاً لوجه في مكتبك أو مكتبنا، وأن فريقك يتعامل مع أشخاص يعرفهم بالاسم، بنفس ساعات العمل ونفس المواسم.',
          ],
        },
        {
          h: 'خدماتنا لأعمال الرياض',
          cards: [
            { t: 'تصميم مواقع الشركات', d: 'مواقع بالعربي والإنجليزي للشركات والمكاتب والعيادات والمطاعم. تفاصيل الخدمة في [تصميم مواقع الشركات](/services/web-design/).' },
            { t: 'تطوير الأنظمة والمنصات', d: 'أنظمة إدارية وبوابات وتكاملات للشركات والجهات. اقرأ عن [تطوير البرمجيات](/services/software-development/).' },
            { t: 'وكلاء الذكاء الاصطناعي', d: '[وكيل على واتساب](/ai-agents/) يرد على عملائك بلهجتهم ويسجل الطلبات والحجوزات.' },
            { t: 'الظهور في جوجل وخرائطه', d: 'منافسة الرياض عالية في البحث المحلي. خدمة [الظهور في جوجل](/products/google-seo/) و[تقييمات قوقل](/products/google-reviews/) تساعدك على الظهور لمن يبحث بالقرب منك.' },
          ],
        },
        {
          h: 'خبرة مع جهات الفعاليات والمواسم',
          p: [
            'الرياض مدينة المواسم والمعارض والفعاليات الكبرى، وهذه المشاريع لها طبيعة خاصة: مواعيد إطلاق لا تتأخر، وأعداد زوار كبيرة، وفرق تشغيل ميدانية تحتاج أدوات سريعة. تضم قائمة عملائنا السابقين جهات في العاصمة مثل موسم الرياض والهيئة الملكية لمدينة الرياض ومركز الملك عبدالله المالي، ونقدم للمعارض والفعاليات حلولاً مثل [بيع التذاكر](/products/event-tickets/) ووكلاء ذكيين يستقبلون أسئلة الزوار وبلاغات التشغيل الميدانية.',
          ],
        },
        {
          h: 'قطاعات نعمل معها في الرياض',
          list: [
            'الجهات الحكومية وشبه الحكومية: منصات ومواقع رسمية وتحول رقمي للإجراءات.',
            'الفعاليات والمعارض والمواسم: مواقع الفعاليات، بيع التذاكر، ووكلاء للزوار وفرق التشغيل.',
            'العيادات والمجمعات الطبية: مواقع بحجز مواعيد ووكلاء واتساب للاستقبال.',
            'المطاعم والكافيهات: مواقع ومنيو إلكتروني QR وإدارة السوشيال ميديا والإعلانات.',
            'المدارس الأهلية والدولية: [منظومة Classti](/classti/) لإدارة المدرسة وتطبيقاتها.',
            'الشركات والمكاتب المهنية: مواقع تعريفية وأنظمة داخلية وأتمتة للتقارير والطلبات.',
          ],
        },
        {
          h: 'الظهور لمن يبحث بالقرب منك',
          p: [
            'عندما يبحث شخص في الرياض عن "عيادة أسنان قريبة" أو "مطعم بالقرب مني"، تعرض له جوجل الخريطة أولاً ثم المواقع. لذلك لا يكفي موقع جميل؛ تحتاج ملف نشاط على خرائط جوجل مكتملاً بالعنوان وساعات العمل والصور، وتقييمات حقيقية من عملائك، وصفحات في موقعك تذكر حيّك وخدماتك بوضوح.',
            'نساعدك في الثلاثة: نربط موقعك بملف نشاطك، ونوفر طريقة منظمة لدعوة عملائك للتقييم بعد الزيارة، ونحسّن صفحاتك شهرياً باقتراحات توافق عليها قبل نشرها. شرحنا الطرق الصحيحة لزيادة التقييمات في مقال [كيف تزيد تقييمات قوقل لنشاطك](/blog/google-reviews/).',
          ],
        },
        {
          h: 'للمنشآت الصغيرة في الرياض',
          p: [
            'إذا كان لديك مطعم في شمال الرياض أو عيادة في الشرق أو صالون في الغرب، فلا تحتاج مشروعاً طويلاً لتبدأ. مع [باقة نشاطك أونلاين في يوم](/online-in-a-day/) نطلق موقعك ووكيل واتساب وملفك على خرائط جوجل خلال يوم عمل، ويمكنك إضافة [المنيو الإلكتروني QR](/products/digital-menu-qr/) أو [نظام الحجوزات](/products/booking-system/) حسب نشاطك.',
          ],
        },
        {
          h: 'زُرنا أو تواصل معنا',
          list: [
            'العنوان: 426 السليمانية، طريق العروبة، الرياض.',
            'البريد: info@oxira.sa',
            'الاجتماعات الحضورية بموعد مسبق، ويمكن أن تكون في مكتبك داخل الرياض.',
          ],
        },
      ],
      faq: [
        { q: 'هل يمكن أن نلتقي حضورياً في الرياض؟', a: 'نعم، مقرنا في السليمانية على طريق العروبة، ونرتب الاجتماعات الحضورية بموعد مسبق في مكتبنا أو مكتبك.' },
        { q: 'هل تخدمون أحياء الرياض كلها؟', a: 'نعم، نخدم الشركات والمنشآت في كل أحياء الرياض، وأغلب العمل يتم عن بُعد مع لقاءات حضورية عند الحاجة.' },
        { q: 'هل تعملون خارج الرياض؟', a: 'نعم، نخدم العملاء في أنحاء المملكة ودول الخليج ومصر عن بُعد.' },
        { q: 'كيف أبدأ؟', a: 'احجز استشارة مجانية من صفحة التواصل، أو ابدأ موقعك بنفسك من استوديو أوكسيرا.' },
        { q: 'هل تساعدون في ظهور نشاطي في خرائط جوجل بالرياض؟', a: 'نعم، ننشئ ملف نشاطك على خرائط جوجل أو نحسّنه ضمن باقة "نشاطك أونلاين في يوم"، ونربطه بموقعك. وترتيب الظهور في الخرائط يعتمد على عوامل منها القرب والتقييمات واكتمال الملف، ولا يمكن لأحد ضمانه.' },
      ],
      ctaTitle: 'نحن قريبون منك في الرياض',
      ctaBody: 'احجز استشارة مجانية، حضورياً أو عن بُعد.',
      related: [
        { path: '/services/web-design/', label: 'تصميم مواقع الشركات' },
        { path: '/services/software-development/', label: 'شركة برمجة في السعودية' },
        { path: '/locations/gulf/', label: 'خدماتنا في الخليج' },
        { path: '/contact/', label: 'تواصل معنا' },
      ],
    },
    en: {
      title: 'Web Design & Software Company in Riyadh | Oxira',
      description: 'Oxira is based in Riyadh on Al Urubah Road: website design, systems, mobile apps and AI agents for Riyadh businesses, with in-person meetings.',
      name: 'Oxira in Riyadh',
      kicker: 'Riyadh',
      h1: 'A web design and software company in the heart of Riyadh',
      lead: 'Oxira is based in Al Sulaymaniyah on Al Urubah Road, Riyadh. We work with companies and public entities in the capital on websites, systems, apps and AI agents, and meet you in person when the project needs it.',
      sections: [
        {
          h: 'Why work with a Riyadh company',
          p: ['Technology projects succeed with clear communication. Being in Riyadh means requirement workshops, demos and training can happen face to face, with a team that works the same hours and the same seasons as you.'],
        },
        {
          h: 'Our services for Riyadh businesses',
          cards: [
            { t: 'Company websites', d: 'Bilingual websites for companies, offices, clinics and restaurants. See [website design](/services/web-design/).' },
            { t: 'Systems and platforms', d: 'Business systems, portals and integrations. See [software development](/services/software-development/).' },
            { t: 'AI agents', d: 'An [AI agent on WhatsApp](/ai-agents/) that answers customers and logs requests.' },
            { t: 'Local search', d: 'Riyadh is competitive in local search. [Google SEO](/products/google-seo/) and [Google reviews](/products/google-reviews/) help nearby customers find you.' },
          ],
        },
        {
          h: 'Events and seasons',
          p: ['Riyadh is a city of seasons, exhibitions and major events. Our past clients include Riyadh entities such as Riyadh Season, the Royal Commission for Riyadh City and KAFD, and we offer [event ticketing](/products/event-tickets/) and AI agents that handle visitor questions and field reports.'],
        },
        {
          h: 'Visit or contact us',
          list: ['Address: 426 Al Sulaymaniyah, Al Urubah Rd., Riyadh.', 'Email: info@oxira.sa', 'In-person meetings by appointment.'],
        },
      ],
      faq: [
        { q: 'Can we meet in person in Riyadh?', a: 'Yes. Our office is in Al Sulaymaniyah on Al Urubah Road, and we arrange meetings by appointment at our office or yours.' },
        { q: 'Do you work outside Riyadh?', a: 'Yes, we serve clients across the Kingdom, the Gulf and Egypt remotely.' },
      ],
      ctaTitle: 'We are close to you in Riyadh',
      ctaBody: 'Book a free consultation, in person or online.',
      related: [
        { path: '/services/web-design/', label: 'Company website design' },
        { path: '/services/software-development/', label: 'Software development' },
        { path: '/contact/', label: 'Contact us' },
      ],
    },
  },

  // ───────────────────────────── Gulf ─────────────────────────────
  {
    slug: 'gulf', kind: 'location', icon: 'agent',
    area: [{ type: 'Country', name: 'United Arab Emirates' }, { type: 'Country', name: 'Qatar' }, { type: 'Country', name: 'Kuwait' }, { type: 'Country', name: 'Bahrain' }, { type: 'Country', name: 'Oman' }],
    ar: {
      title: 'تصميم مواقع ووكلاء ذكاء اصطناعي في الخليج | أوكسيرا',
      description: 'خدمات أوكسيرا لأعمال الإمارات وقطر والكويت والبحرين وعُمان: مواقع ثنائية اللغة، وكيل واتساب ذكي، تطوير أنظمة وأتمتة، بتنفيذ عن بُعد من فريق في الرياض.',
      name: 'خدماتنا في دول الخليج',
      kicker: 'الإمارات · قطر · الكويت · البحرين · عُمان',
      h1: 'مواقع ووكلاء ذكاء اصطناعي لأعمال الخليج',
      lead: 'أسواق الخليج متقاربة في اللغة والعادات التجارية، ومختلفة في التفاصيل. من مقرنا في الرياض نخدم الشركات في الإمارات وقطر والكويت والبحرين وعُمان عن بُعد: مواقع بالعربية والإنجليزية، ووكلاء ذكاء اصطناعي على واتساب، وأنظمة وأتمتة للأعمال.',
      sections: [
        {
          h: 'ما يميز العمل مع أسواق الخليج',
          list: [
            'جمهور متعدد اللغات: في الإمارات وقطر خصوصاً، يكون جزء كبير من العملاء غير ناطقين بالعربية، لذلك نبني المواقع والوكلاء بالعربية والإنجليزية من البداية، لا كترجمة لاحقة.',
            'واتساب من أكثر القنوات التي يستخدمها العملاء في المنطقة للتواصل مع الأنشطة التجارية، وهو ما يجعل [وكيل واتساب الذكي](/ai-agents/) من أسرع الحلول أثراً.',
            'فارق التوقيت بسيط: قطر والكويت والبحرين على نفس توقيت الرياض، والإمارات وعُمان تسبقها بساعة، فتسير الاجتماعات والمتابعة في ساعات العمل نفسها.',
            'عطلات ومواسم متقاربة مثل رمضان والأعياد، فنخطط الإطلاقات والحملات بما يناسبها.',
          ],
        },
        {
          h: 'خدماتنا لأعمال الخليج',
          cards: [
            { t: 'مواقع ثنائية اللغة', d: 'مواقع للشركات والمتاجر بالعربية والإنجليزية، باتجاه صحيح لكل لغة. تفاصيل في [تصميم مواقع الشركات](/services/web-design/) و[تصميم متجر إلكتروني](/services/ecommerce-store/).' },
            { t: 'وكيل ذكاء اصطناعي على واتساب', d: 'يرد على العملاء بالعربية والإنجليزية على مدار الساعة، يفهم الرسائل الصوتية، ويسجل الطلبات ويحوّل لموظف عند الحاجة.' },
            { t: 'أنظمة وأتمتة', d: 'أنظمة مخصصة وربط بين الأنظمة وتقارير تلقائية. اقرأ عن [أتمتة الأعمال](/services/business-automation/) و[تطوير البرمجيات](/services/software-development/).' },
            { t: 'الشات بوت للموقع', d: '[مساعد ذكي على موقعك](/products/ai-chatbot/) يجيب الزوار من محتوى موقعك.' },
          ],
        },
        {
          h: 'أمثلة لما ينفذه أصحاب الأعمال في الخليج',
          cards: [
            { t: 'العيادات والمراكز الطبية', d: 'وكيل يستقبل طلبات الحجز بالعربية والإنجليزية، ويذكّر المرضى بمواعيدهم، ويحوّل الحالات الخاصة للاستقبال.' },
            { t: 'المتاجر الإلكترونية', d: 'متابعة حالة الطلبات والرد على أسئلة المقاسات والتوفر، وتذكير العملاء بالسلات المتروكة.' },
            { t: 'العقار', d: 'استقبال العملاء المحتملين من الإعلانات، وسؤالهم عن الميزانية والمنطقة، وتنبيه فريق المبيعات بالجادّين منهم.' },
            { t: 'المطاعم والكافيهات', d: '[منيو إلكتروني QR](/products/digital-menu-qr/) بلغتين، وموقع يعرض الفروع وساعات العمل.' },
          ],
        },
        {
          h: 'المحتوى بلغتين، لا ترجمة حرفية',
          p: [
            'العميل في دبي أو الدوحة قد يبحث عن خدمتك بالإنجليزية، ثم يسأل على واتساب بالعربية، أو العكس. لذلك نكتب محتوى كل لغة لقارئها: عناوين وكلمات يبحث بها الناس فعلاً في جوجل بكل لغة، ونصوص قصيرة واضحة، وتصميم يعمل بالاتجاهين دون أن يختل.',
            'وينطبق ذلك على الوكيل الذكي: نغذّيه بمعلومات نشاطك باللغتين، ونحدد له متى يرد بأي لغة، ومتى يحوّل المحادثة لموظف يتحدث لغة العميل.',
          ],
        },
        {
          h: 'كيف نعمل عن بُعد',
          list: [
            'اجتماع فيديو للتعرف على نشاطك وأهدافك.',
            'عرض مكتوب يوضح النطاق والمراحل والتكلفة والعملة المتفق عليها.',
            'مراجعات دورية على نسخة تجريبية تراها من أي مكان.',
            'إطلاق وتدريب عن بُعد، ثم دعم فني عبر البريد وواتساب.',
          ],
        },
        {
          h: 'قبل أن تبدأ',
          p: [
            'لكل دولة خليجية أنظمتها الخاصة في الترخيص التجاري والدفع الإلكتروني والضرائب وحماية البيانات. نبني الحلول التقنية ونناقش معك هذه المتطلبات، لكن التحقق النظامي يبقى مسؤولية نشاطك مع الجهات المختصة في دولتك. ونحرص على اختيار بوابة الدفع ومزودي الخدمات المتاحين في بلدك.',
          ],
        },
      ],
      faq: [
        { q: 'هل تخدمون العملاء في الإمارات وقطر والكويت؟', a: 'نعم، نخدم الأعمال في دول الخليج عن بُعد من مقرنا في الرياض، مع اجتماعات فيديو ومراجعات دورية.' },
        { q: 'هل يتحدث وكيل الواتساب بالإنجليزية؟', a: 'نعم، يرد الوكيل بالعربية والإنجليزية حسب لغة العميل.' },
        { q: 'بأي عملة تكون الأسعار؟', a: 'أسعار باقاتنا المعلنة بالريال السعودي، وللمشاريع خارج المملكة نوضح العملة وطريقة الدفع في عرض السعر.' },
        { q: 'هل تتعاملون مع أنظمة الدفع في بلدنا؟', a: 'نربط الحلول بمزود الدفع الذي يعمل في بلدك ويختاره نشاطك، ونحدد ذلك في مرحلة التخطيط.' },
        { q: 'هل تحتاجون زيارة مقرنا لتنفيذ المشروع؟', a: 'لا، أغلب مشاريع المواقع والوكلاء الذكية والأتمتة تُنفذ بالكامل عن بُعد عبر اجتماعات الفيديو والنسخ التجريبية، ونتفق على أي زيارة إن تطلبها المشروع.' },
        { q: 'هل يمكن أن يكون الموقع بنطاق دولتنا؟', a: 'نعم، يمكن ربط الموقع بالنطاق الذي يملكه نشاطك، سواء كان نطاقاً دولياً مثل .com أو نطاق دولتك، وفق شروط تسجيل كل نطاق.' },
      ],
      ctaTitle: 'نشاطك في الخليج؟ لنتحدث',
      ctaBody: 'احجز اجتماع فيديو مجاني، أو جرّب مساعدنا الذكي الآن.',
      related: [
        { path: '/ai-agents/', label: 'وكلاء الذكاء الاصطناعي' },
        { path: '/whatsapp-agent/', label: 'جرّب موظف واتساب ذكي مجاناً' },
        { path: '/services/web-design/', label: 'تصميم مواقع الشركات' },
        { path: '/locations/egypt/', label: 'خدماتنا في مصر' },
        { path: '/locations/riyadh/', label: 'مقرنا في الرياض' },
      ],
    },
    en: {
      title: 'Web Design & AI Agents in the UAE and Gulf | Oxira',
      description: 'Bilingual websites, AI WhatsApp agents, systems and automation for businesses in the UAE, Qatar, Kuwait, Bahrain and Oman, delivered remotely.',
      name: 'Oxira in the Gulf',
      kicker: 'UAE · Qatar · Kuwait · Bahrain · Oman',
      h1: 'Websites and AI agents for Gulf businesses',
      lead: 'Gulf markets share a language and business habits but differ in the details. From our base in Riyadh we serve companies in the UAE, Qatar, Kuwait, Bahrain and Oman remotely: bilingual websites, AI agents on WhatsApp, and business systems and automation.',
      sections: [
        {
          h: 'What is different about Gulf markets',
          list: [
            'Multilingual audiences: especially in the UAE and Qatar, many customers do not speak Arabic, so we build websites and agents in Arabic and English from day one.',
            'WhatsApp is one of the channels customers use most to reach businesses, which makes an [AI WhatsApp agent](/ai-agents/) one of the fastest wins.',
            'Small time difference: Qatar, Kuwait and Bahrain share Riyadh time, and the UAE and Oman are one hour ahead.',
            'Shared seasons such as Ramadan and Eid, which we plan launches and campaigns around.',
          ],
        },
        {
          h: 'Our services for Gulf businesses',
          cards: [
            { t: 'Bilingual websites', d: 'Company websites and online stores in Arabic and English. See [website design](/services/web-design/).' },
            { t: 'AI agent on WhatsApp', d: 'Answers customers in Arabic and English 24/7, understands voice notes, logs requests and hands over to staff.' },
            { t: 'Systems and automation', d: 'Custom systems, integrations and automatic reports. See [business automation](/services/business-automation/).' },
          ],
        },
        {
          h: 'Before you start',
          p: ['Each Gulf country has its own rules for trade licences, online payments, tax and data protection. We build the technology and discuss these requirements with you, but regulatory checks remain your business\'s responsibility with the authorities in your country.'],
        },
      ],
      faq: [
        { q: 'Do you serve clients in the UAE, Qatar and Kuwait?', a: 'Yes, remotely from our office in Riyadh, with video meetings and regular reviews.' },
        { q: 'Does the WhatsApp agent speak English?', a: 'Yes, it replies in Arabic or English depending on the customer.' },
        { q: 'Which currency are prices in?', a: 'Our published package prices are in Saudi riyals. For projects outside the Kingdom we state the currency and payment method in the quote.' },
      ],
      ctaTitle: 'Based in the Gulf? Let\'s talk',
      ctaBody: 'Book a free video call, or try our AI assistant now.',
      related: [
        { path: '/ai-agents/', label: 'AI agents' },
        { path: '/whatsapp-agent/', label: 'Try an AI WhatsApp employee free' },
        { path: '/services/web-design/', label: 'Website design' },
        { path: '/locations/egypt/', label: 'Oxira in Egypt' },
      ],
    },
  },

  // ───────────────────────────── Egypt ─────────────────────────────
  {
    slug: 'egypt', kind: 'location', icon: 'agent', area: [{ type: 'Country', name: 'Egypt' }],
    ar: {
      title: 'تصميم مواقع وشات بوت واتساب للشركات في مصر | أوكسيرا',
      description: 'خدمات أوكسيرا للشركات في مصر: وكيل ذكاء اصطناعي على واتساب يرد باللهجة المصرية ويفهم الرسائل الصوتية، وتصميم مواقع ومتاجر وأتمتة الأعمال عن بُعد.',
      name: 'خدماتنا في مصر',
      kicker: 'مصر',
      h1: 'شات بوت واتساب ومواقع للشركات في مصر',
      lead: 'في مصر، يسأل كثير من العملاء عن السعر والتوفر والمواعيد على واتساب، وغالباً برسالة صوتية. نبني للشركات المصرية وكلاء ذكاء اصطناعي يردون باللهجة المصرية على مدار الساعة، ومواقع ومتاجر وأنظمة أتمتة، بتنفيذ عن بُعد من فريقنا.',
      sections: [
        {
          h: 'وكيل واتساب يتكلم مصري',
          p: [
            'أهم ما يميز [وكيل الذكاء الاصطناعي من أوكسيرا](/ai-agents/) للسوق المصري أنه يرد باللهجة المصرية بشكل طبيعي، ويفهم الرسائل الصوتية ويحوّلها لنص ويرد عليها، وهذا مهم في سوق يعتمد فيه كثير من العملاء على الفويس بدل الكتابة.',
          ],
          list: [
            'يرد على الأسئلة المتكررة عن الأسعار والمنتجات والمواعيد والفروع من معلوماتك المعتمدة.',
            'يستقبل الطلبات والحجوزات ويسجلها لفريقك في جدول أو نظام.',
            'يتابع حالة الطلبات للمتاجر الإلكترونية ويذكّر بالسلات المتروكة.',
            'يحوّل المحادثة لموظف عندما يحتاج العميل إنساناً.',
          ],
        },
        {
          h: 'الفرق بين الوكيل الذكي والرد الآلي التقليدي',
          p: [
            'الرد الآلي التقليدي على واتساب يعتمد على قوائم ثابتة: "اكتب 1 للأسعار، 2 للفروع". إذا كتب العميل سؤاله بطريقته، أو أرسل فويس، لا يفهمه النظام ويضطر للانتظار حتى يرد موظف.',
            'أما الوكيل الذكي فيفهم السؤال كما كتبه العميل، بالعامية المصرية أو بالفصحى أو بالإنجليزية، ويبحث عن الإجابة في معلومات نشاطك المعتمدة فقط، ثم ينفذ المطلوب: يسجل حجزاً، أو يفتح طلباً، أو يحوّل لموظف. والنتيجة محادثة طبيعية أقرب لما يتوقعه العميل من موظف خدمة عملاء.',
          ],
        },
        {
          h: 'قطاعات تستفيد أكثر في مصر',
          cards: [
            { t: 'العيادات والمراكز الطبية', d: 'حجز المواعيد وتعديلها والتذكير بها، والرد على أسئلة الخدمات والأطباء.' },
            { t: 'المتاجر الإلكترونية', d: 'أسئلة المقاسات والتوفر وحالة الشحن. وللمتجر نفسه راجع [تصميم متجر إلكتروني](/services/ecommerce-store/).' },
            { t: 'العقارات', d: 'استقبال العملاء من الإعلانات وتأهيلهم بأسئلة ذكية وتنبيه فريق المبيعات فوراً.' },
            { t: 'المدارس ومراكز التدريب', d: 'استفسارات القبول والمصروفات والمواعيد، وتوجيه أولياء الأمور للقسم المختص.' },
          ],
        },
        {
          h: 'مواقع وأتمتة للشركات المصرية',
          p: [
            'إلى جانب الوكيل الذكي، نصمم [مواقع الشركات](/services/web-design/) بالعربية والإنجليزية، ونطوّر [أنظمة مخصصة](/services/software-development/) و[مسارات أتمتة](/services/business-automation/) تربط واتساب والموقع وجداول المتابعة ببعض، بحيث يصل كل طلب جديد لفريقك في مكانه الصحيح.',
          ],
        },
        {
          h: 'جهّز هذه المعلومات قبل التشغيل',
          p: ['جودة ردود الوكيل من جودة المعلومات التي نغذّيه بها. قبل اجتماع البداية، جهّز:'],
          list: [
            'قائمة بالأسئلة التي يتلقاها فريقك يومياً، وإجاباتها المعتمدة.',
            'الخدمات أو المنتجات وأسعارها، وما يتغير منها باستمرار.',
            'العناوين والفروع ومواعيد العمل وطرق الدفع والتوصيل.',
            'الحالات التي يجب أن يحوّلها الوكيل لموظف فوراً، مثل الشكاوى والطلبات الكبيرة.',
            'أسلوب الرد المفضل لديكم: رسمي، أو ودود باللهجة المصرية.',
          ],
          after: ['ولمعرفة المزيد عن فوائد الوكيل وحدوده، اقرأ مقال [فوائد وكيل الذكاء الاصطناعي على واتساب للشركات](/blog/whatsapp-ai-agent-benefits/).'],
        },
        {
          h: 'كيف نعمل مع العملاء في مصر',
          list: [
            'اجتماع فيديو نفهم فيه نشاطك والأسئلة التي يتلقاها فريقك يومياً.',
            'نغذّي الوكيل بخدماتك وأسعارك وأسلوب ردكم، ونجربه معك قبل التشغيل.',
            'نربطه برقم واتساب نشاطك عبر واجهة واتساب للأعمال.',
            'نتابع المحادثات ونطوّر الردود، ولوحة تتيح لك تعديل المعلومات بنفسك.',
          ],
        },
      ],
      faq: [
        { q: 'هل يرد الوكيل باللهجة المصرية فعلاً؟', a: 'نعم، يرد الوكيل بالعربية باللهجة المصرية أو السعودية، وبالإنجليزية، حسب طريقة كتابة العميل وإعدادات نشاطك.' },
        { q: 'هل يفهم الرسائل الصوتية؟', a: 'نعم، يحوّل الرسالة الصوتية إلى نص ويفهم المقصود ويرد عليها.' },
        { q: 'هل تخدمون الشركات في مصر رغم أن مقركم في الرياض؟', a: 'نعم، نعمل عن بُعد عبر اجتماعات الفيديو وواتساب والبريد، ونوضح في عرض السعر العملة وطريقة الدفع.' },
        { q: 'هل يمكن استخدام رقم الواتساب الحالي للنشاط؟', a: 'في الغالب نعم، ونراجع معك متطلبات ربط الرقم بواجهة واتساب للأعمال قبل البدء.' },
        { q: 'هل يمكن أن يخطئ الوكيل في الرد؟', a: 'وارد مع أي نظام ذكاء اصطناعي، لذلك نجعله يجيب من معلوماتك المعتمدة فقط، ونراجع المحادثات في الأسابيع الأولى، ونحدد الحالات التي يحوّلها لموظف بدل أن يجتهد فيها.' },
        { q: 'هل يناسب الوكيل الشركات الصغيرة في مصر؟', a: 'نعم، فالشركات الصغيرة غالباً ليس لديها موظف متفرغ للرد على واتساب طوال اليوم، والوكيل يغطي الأسئلة المتكررة ويرسل لك الطلبات الجاهزة فقط.' },
      ],
      ctaTitle: 'جرّب الوكيل الذكي لنشاطك',
      ctaBody: 'احجز اجتماع فيديو مجاني، أو كلّم مساعدنا الذكي الآن وشوف بنفسك.',
      related: [
        { path: '/ai-agents/', label: 'وكلاء الذكاء الاصطناعي' },
        { path: '/whatsapp-agent/', label: 'جرّب موظف واتساب ذكي مجاناً' },
        { path: '/blog/whatsapp-ai-agent-benefits/', label: 'فوائد وكيل واتساب الذكي' },
        { path: '/locations/gulf/', label: 'خدماتنا في الخليج' },
        { path: '/products/ai-chatbot/', label: 'شات بوت للموقع' },
      ],
    },
    en: {
      title: 'WhatsApp AI Agents & Websites in Egypt | Oxira',
      description: 'An AI WhatsApp agent that replies in Egyptian Arabic and understands voice notes, plus websites, online stores and automation for businesses in Egypt.',
      name: 'Oxira in Egypt',
      kicker: 'Egypt',
      h1: 'WhatsApp AI agents and websites for businesses in Egypt',
      lead: 'In Egypt, many customers ask about prices, stock and appointments on WhatsApp, often by voice note. We build AI agents that reply in Egyptian Arabic around the clock, plus websites, online stores and automation, delivered remotely by our team.',
      sections: [
        {
          h: 'A WhatsApp agent that speaks Egyptian',
          p: ['Our [AI agent](/ai-agents/) replies naturally in Egyptian Arabic and understands voice notes, which matters in a market where many customers speak rather than type.'],
          list: [
            'Answers repeated questions about prices, products, hours and branches from your approved information.',
            'Takes orders and bookings and logs them for your team.',
            'Follows up on online orders and abandoned carts.',
            'Hands the chat to a person when needed.',
          ],
        },
        {
          h: 'Sectors that benefit most',
          cards: [
            { t: 'Clinics', d: 'Booking, changes and reminders, plus questions about services and doctors.' },
            { t: 'Online stores', d: 'Sizes, stock and shipping status. See [e-commerce store design](/services/ecommerce-store/).' },
            { t: 'Real estate', d: 'Leads from ads qualified with smart questions, with instant alerts to sales.' },
          ],
        },
        {
          h: 'How we work with clients in Egypt',
          list: [
            'A video call to understand your business and daily customer questions.',
            'We train the agent on your services, prices and tone, and test it with you.',
            'We connect it to your business WhatsApp number through the WhatsApp Business Platform.',
            'We monitor conversations and improve replies; you can edit the information yourself.',
          ],
        },
      ],
      faq: [
        { q: 'Does the agent really reply in Egyptian Arabic?', a: 'Yes. It replies in Egyptian or Saudi Arabic, or in English, depending on the customer and your settings.' },
        { q: 'Do you serve companies in Egypt from Riyadh?', a: 'Yes, remotely through video calls, WhatsApp and email. The quote states the currency and payment method.' },
      ],
      ctaTitle: 'Try an AI agent for your business',
      ctaBody: 'Book a free video call, or chat with our AI assistant now.',
      related: [
        { path: '/ai-agents/', label: 'AI agents' },
        { path: '/whatsapp-agent/', label: 'Try an AI WhatsApp employee free' },
        { path: '/locations/gulf/', label: 'Oxira in the Gulf' },
        { path: '/products/ai-chatbot/', label: 'Website chatbot' },
      ],
    },
  },
];

/** Pages linked from each service area on /services/ (Arabic and English only). */
export const landingsByIcon = (icon: ServiceIcon) => landings.filter((l) => l.kind === 'service' && l.icon === icon);
export const serviceLandings = landings.filter((l) => l.kind === 'service');
export const locationLandings = landings.filter((l) => l.kind === 'location');
export const landingPaths = landings.map(landingPath);
