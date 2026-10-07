import extra from './samples-extra.json';
import more from './samples-more.json';
import { catalog, templateById, categoryOf, type FontId as CatFont, type Layout } from './catalog';

// Site spec: everything a client's website is made of. The studio edits it (by form or by
// chatting with the AI), render.ts turns it into a full HTML page.

/** A design from the catalog, e.g. "cafe" or "cafe-2". */
export type TemplateId = string;
export type SiteLang = 'ar' | 'en' | 'de' | 'fr' | 'ru';
export type FontId = CatFont;
export type SectionId = 'about' | 'services' | 'menu' | 'gallery' | 'testimonials' | 'faq' | 'stats' | 'cta' | 'contact';

export interface Spec {
  template: TemplateId;
  lang: SiteLang;
  name: string;
  tagline: string;
  /** background: optional page background (#RRGGBB); empty = the template's own. */
  colors: { primary: string; accent: string; background?: string };
  font: FontId;
  hero: { title: string; subtitle: string; cta: string };
  about: { title: string; text: string };
  services: { title: string; items: { title: string; text: string }[] };
  stats: { value: string; label: string }[];
  ctaBand: { title: string; text: string; button: string };
  contact: { title: string; phone: string; whatsapp: string; email: string; address: string; hours: string };
  sections: SectionId[];
  /** Only real quotes the client provides; never generated. */
  testimonials: { title: string; items: { quote: string; name: string; role: string }[] };
  faq: { title: string; items: { q: string; a: string }[] };
  /** Menu or price list: restaurants, cafés, salons… Prices are text ("25", "from 120"). */
  menu: { title: string; note: string; categories: { name: string; items: { name: string; desc: string; price: string }[] }[] };
  /** whatsappButton: floating chat button; contactForm: a form that emails the site owner; mapUrl: Google Maps link. */
  extras: { whatsappButton: boolean; contactForm: boolean; mapUrl: string };
  /** Uploaded images, as ids like "i_3f9a…_j" (j = jpeg, p = png). Empty string = none. */
  media: { logo: string; hero: string; about: string; gallery: string[]; galleryTitle: string };
}

export const imageIdPattern = /^i_[a-f0-9]{20,40}_[jp]$/;
export const emptyMedia = () => ({ logo: '', hero: '', about: '', gallery: [] as string[], galleryTitle: '' });

export const templateIds: TemplateId[] = catalog.map((t) => t.id);
export const sectionIds: SectionId[] = ['about', 'services', 'menu', 'gallery', 'testimonials', 'faq', 'stats', 'cta', 'contact'];
export const fontIds: FontId[] = ['modern', 'elegant', 'friendly'];
export const siteLangs: SiteLang[] = ['ar', 'en', 'de', 'fr', 'ru'];

/** Look of each template (not the words). */
export const looks: Record<TemplateId, { primary: string; accent: string; font: FontId }> = Object.fromEntries(
  catalog.map((t) => [t.id, { primary: t.primary, accent: t.accent, font: t.font }]));

/** Which base layout each template uses; its category then adds artwork and style touches. */
export const layoutOf: Record<TemplateId, Layout> = Object.fromEntries(catalog.map((t) => [t.id, t.layout]));

type Copy = Omit<Spec, 'template' | 'lang' | 'colors' | 'font' | 'sections' | 'media'>;

const C = (name: string, tagline: string, hero: [string, string, string], about: [string, string],
  servicesTitle: string, items: [string, string][], stats: [string, string][], cta: [string, string, string],
  contactTitle: string, address: string, hours: string): BaseCopy => ({
  name, tagline,
  hero: { title: hero[0], subtitle: hero[1], cta: hero[2] },
  about: { title: about[0], text: about[1] },
  services: { title: servicesTitle, items: items.map(([title, text]) => ({ title, text })) },
  stats: stats.map(([value, label]) => ({ value, label })),
  ctaBand: { title: cta[0], text: cta[1], button: cta[2] },
  contact: { title: contactTitle, phone: '+966 50 000 0000', whatsapp: '+966 50 000 0000', email: 'hello@example.com', address, hours },
});

/** Sample words for each template, so every template looks complete before the client writes anything. */
type BaseCopy = Omit<Copy, 'testimonials' | 'faq' | 'extras' | 'menu'>;
const sample: Record<string, { ar: BaseCopy; en: BaseCopy }> = {
  corporate: {
    ar: C('نكسس للاستشارات', 'استشارات أعمال وتطوير مؤسسي',
      ['نساعد شركتك على النمو بثقة', 'استشارات استراتيجية وتشغيلية تحوّل أهدافك إلى نتائج قابلة للقياس.', 'احجز استشارة'],
      ['من نحن', 'فريق من المستشارين بخبرة طويلة في السوق السعودي، نعمل مع الشركات الناشئة والمتوسطة لبناء استراتيجيات واضحة وتحسين الأداء.'],
      'خدماتنا', [['الاستراتيجية', 'خطط نمو واقعية مبنية على تحليل السوق والمنافسين.'], ['تحسين العمليات', 'نراجع إجراءاتك ونرفع كفاءتها ونخفض التكاليف.'], ['التحول الرقمي', 'نختار معك الأنظمة المناسبة ونقود تطبيقها.']],
      [['+120', 'عميل'], ['12', 'سنة خبرة'], ['98%', 'رضا العملاء']],
      ['جاهز للخطوة التالية؟', 'تحدث مع مستشار اليوم واحصل على تقييم مبدئي مجاناً.', 'تواصل معنا'],
      'تواصل معنا', 'الرياض، المملكة العربية السعودية', 'الأحد - الخميس، 9 ص - 5 م'),
    en: C('Nexus Consulting', 'Business and organisational consulting',
      ['Helping your business grow with confidence', 'Strategy and operations consulting that turns your goals into measurable results.', 'Book a consultation'],
      ['About us', 'A team of consultants with long experience in the Saudi market, working with startups and mid-size companies to build clear strategies and better performance.'],
      'Our services', [['Strategy', 'Realistic growth plans built on market and competitor analysis.'], ['Operations', 'We review your processes, raise efficiency and cut costs.'], ['Digital transformation', 'We pick the right systems with you and lead the rollout.']],
      [['120+', 'Clients'], ['12', 'Years of experience'], ['98%', 'Client satisfaction']],
      ['Ready for the next step?', 'Talk to a consultant today and get a free initial assessment.', 'Contact us'],
      'Contact us', 'Riyadh, Saudi Arabia', 'Sun - Thu, 9 am - 5 pm'),
  },
  personal: {
    ar: C('سارة العتيبي', 'مصممة هوية بصرية',
      ['أصمم هويات تُروى قصتها', 'مصممة مستقلة أساعد العلامات التجارية على الظهور بشكل واضح ومميز.', 'شاهد أعمالي'],
      ['نبذة عني', 'أعمل في تصميم الهويات البصرية منذ ثماني سنوات، مع علامات في الضيافة والتقنية والتجزئة. أؤمن أن التصميم الجيد يبدأ بالاستماع.'],
      'ماذا أقدم', [['الهوية البصرية', 'شعار ونظام ألوان وخطوط متكامل.'], ['تصميم المطبوعات', 'بطاقات ومطويات وتغليف.'], ['محتوى التواصل', 'قوالب منشورات متناسقة مع هويتك.']],
      [['+60', 'مشروع'], ['8', 'سنوات'], ['14', 'جائزة ومشاركة']],
      ['لنصنع شيئاً جميلاً معاً', 'أخبرني عن مشروعك وسأرد عليك خلال يوم عمل.', 'راسلني'],
      'لنتحدث', 'جدة', 'متاحة لمشاريع جديدة'),
    en: C('Sarah Alotaibi', 'Brand identity designer',
      ['I design identities that tell a story', 'An independent designer helping brands show up clearly and memorably.', 'See my work'],
      ['About me', 'I have designed brand identities for eight years, for hospitality, tech and retail brands. I believe good design starts with listening.'],
      'What I do', [['Brand identity', 'Logo, colour system and type, all working together.'], ['Print design', 'Cards, brochures and packaging.'], ['Social content', 'Post templates that match your identity.']],
      [['60+', 'Projects'], ['8', 'Years'], ['14', 'Awards and features']],
      ["Let's make something good together", "Tell me about your project and I'll reply within one working day.", 'Get in touch'],
      "Let's talk", 'Jeddah', 'Available for new projects'),
  },
  restaurant: {
    ar: C('مطعم زعفران', 'مطبخ عربي معاصر',
      ['نكهات البيت بلمسة جديدة', 'أطباق عربية نحضّرها يومياً من مكونات طازجة، في أجواء دافئة تجمع العائلة والأصدقاء.', 'احجز طاولتك'],
      ['حكايتنا', 'بدأنا من وصفات الجدة، وطوّرناها بعناية لتناسب ذائقة اليوم. كل طبق عندنا يُحضّر بحب واهتمام بالتفاصيل.'],
      'من قائمتنا', [['مندي اللحم', 'لحم طري مطهو ببطء على أرز بخاري.'], ['مشاوي مشكلة', 'تشكيلة من الكباب والشيش طاووق.'], ['أم علي', 'حلى دافئ بالمكسرات والقشطة.']],
      [['4.8', 'تقييم الزوار'], ['+40', 'طبق'], ['2015', 'منذ']],
      ['ننتظرك على العشاء', 'احجز طاولتك الآن أو اطلب عبر واتساب.', 'احجز الآن'],
      'زورونا', 'حي الملقا، الرياض', 'يومياً، 1 م - 12 ص'),
    en: C('Saffron Kitchen', 'Modern Arabic cuisine',
      ['Home flavours, a fresh touch', 'Arabic dishes made fresh every day, in a warm setting for family and friends.', 'Book a table'],
      ['Our story', "We started from grandmother's recipes and refined them for today's taste. Every dish is made with care and attention to detail."],
      'From our menu', [['Lamb mandi', 'Slow-cooked tender lamb on fragrant rice.'], ['Mixed grill', 'A selection of kebab and shish tawook.'], ['Om Ali', 'Warm dessert with nuts and cream.']],
      [['4.8', 'Guest rating'], ['40+', 'Dishes'], ['2015', 'Since']],
      ['Join us for dinner', 'Book your table now or order on WhatsApp.', 'Book now'],
      'Visit us', 'Al Malqa, Riyadh', 'Daily, 1 pm - 12 am'),
  },
  clinic: {
    ar: C('عيادات رِفق', 'رعاية طبية للأسرة',
      ['رعاية تبدأ بالاهتمام', 'فريق طبي متخصص يقدّم لك ولعائلتك رعاية شاملة في مكان واحد.', 'احجز موعداً'],
      ['عن العيادة', 'نقدّم خدمات طبية متكاملة بأحدث الأجهزة وفريق من الاستشاريين، مع حجز سهل ومتابعة مستمرة بعد الزيارة.'],
      'التخصصات', [['طب الأسرة', 'فحوصات دورية ومتابعة الحالات المزمنة.'], ['طب الأسنان', 'تنظيف وتقويم وتجميل الأسنان.'], ['الجلدية', 'علاج المشكلات الجلدية والعناية بالبشرة.']],
      [['+15', 'طبيباً'], ['+20 ألف', 'مراجع'], ['7', 'أيام في الأسبوع']],
      ['صحتك أولويتنا', 'احجز موعدك في دقيقة واحدة عبر واتساب.', 'احجز الآن'],
      'تواصل معنا', 'حي النرجس، الرياض', 'يومياً، 9 ص - 10 م'),
    en: C('Rifq Clinics', 'Family medical care',
      ['Care that starts with attention', 'A specialist medical team caring for you and your family, all in one place.', 'Book an appointment'],
      ['About the clinic', 'Complete medical services with modern equipment and consultant doctors, easy booking and follow-up after every visit.'],
      'Specialties', [['Family medicine', 'Check-ups and chronic care follow-up.'], ['Dentistry', 'Cleaning, orthodontics and cosmetic dentistry.'], ['Dermatology', 'Skin treatment and skincare.']],
      [['15+', 'Doctors'], ['20k+', 'Patients'], ['7', 'Days a week']],
      ['Your health comes first', 'Book your appointment in a minute on WhatsApp.', 'Book now'],
      'Contact us', 'Al Narjis, Riyadh', 'Daily, 9 am - 10 pm'),
  },
  store: {
    ar: C('متجر لمسة', 'منتجات منزلية مختارة',
      ['لمسة جميلة لكل ركن في بيتك', 'منتجات منزلية مختارة بعناية، بجودة عالية وتوصيل سريع لكل مدن المملكة.', 'تسوّق الآن'],
      ['من نحن', 'متجر سعودي نختار منتجاتنا بأنفسنا من أفضل المصنعين، ونهتم بالتغليف والتوصيل حتى تصلك كما تحب.'],
      'الأقسام', [['المطبخ', 'أدوات وأواني عملية وأنيقة.'], ['الديكور', 'قطع تضيف الدفء لمساحتك.'], ['الهدايا', 'تشكيلات جاهزة لكل مناسبة.']],
      [['+5000', 'طلب'], ['48 ساعة', 'توصيل'], ['14 يوماً', 'استرجاع']],
      ['شحن مجاني فوق 300 ريال', 'اطلب الآن ووصّلناه لباب بيتك.', 'ابدأ التسوق'],
      'خدمة العملاء', 'الدمام', 'يومياً، 10 ص - 11 م'),
    en: C('Lamsa Store', 'Curated home goods',
      ['A beautiful touch for every corner', 'Carefully chosen home goods, high quality and fast delivery across Saudi Arabia.', 'Shop now'],
      ['About us', 'A Saudi store that hand-picks products from the best makers, with care for packaging and delivery so they arrive just right.'],
      'Categories', [['Kitchen', 'Practical, elegant tools and cookware.'], ['Decor', 'Pieces that bring warmth to your space.'], ['Gifts', 'Ready gift sets for every occasion.']],
      [['5000+', 'Orders'], ['48h', 'Delivery'], ['14 days', 'Returns']],
      ['Free shipping over SAR 300', 'Order now and we deliver to your door.', 'Start shopping'],
      'Customer care', 'Dammam', 'Daily, 10 am - 11 pm'),
  },
  events: {
    ar: C('ملتقى نبض', 'ملتقى التقنية والإبداع',
      ['يومان من الأفكار التي تصنع المستقبل', 'متحدثون وورش عمل ومعرض للشركات الناشئة، في أكبر تجمع للمبدعين في المنطقة.', 'سجّل الآن'],
      ['عن الملتقى', 'ملتقى سنوي يجمع رواد الأعمال والمطورين والمستثمرين لتبادل الخبرات وبناء الشراكات.'],
      'البرنامج', [['الجلسات الرئيسية', 'متحدثون من كبرى الشركات المحلية والعالمية.'], ['ورش العمل', 'تدريب عملي في الذكاء الاصطناعي والتصميم.'], ['المعرض', 'أكثر من 80 شركة ناشئة تعرض منتجاتها.']],
      [['+40', 'متحدثاً'], ['+3000', 'زائر'], ['2', 'يومان']],
      ['المقاعد محدودة', 'احجز تذكرتك الآن واحصل على سعر التسجيل المبكر.', 'احجز تذكرتك'],
      'المكان والتواصل', 'مركز الرياض الدولي للمؤتمرات', '14 - 15 ديسمبر، 10 ص - 8 م'),
    en: C('Pulse Summit', 'Tech and creativity summit',
      ['Two days of ideas that shape the future', 'Talks, workshops and a startup expo at the region’s biggest gathering of makers.', 'Register now'],
      ['About the summit', 'An annual summit bringing founders, developers and investors together to share expertise and build partnerships.'],
      'Programme', [['Keynotes', 'Speakers from leading local and global companies.'], ['Workshops', 'Hands-on training in AI and design.'], ['Expo', '80+ startups showing their products.']],
      [['40+', 'Speakers'], ['3000+', 'Visitors'], ['2', 'Days']],
      ['Seats are limited', 'Book your ticket now at the early-bird price.', 'Get your ticket'],
      'Venue and contact', 'Riyadh International Convention Center', 'Dec 14 - 15, 10 am - 8 pm'),
  },
};

const M = (name: string, items: [string, string, string][]) => ({ name, items: items.map(([n, d, p]) => ({ name: n, desc: d, price: p })) });
/** Sample menus so food designs look complete; other businesses start with an empty price list. */
const sampleMenus: Record<string, { ar: Copy['menu']; en: Copy['menu'] }> = {
  restaurant: {
    ar: { title: 'قائمة الطعام', note: 'الأسعار بالريال وتشمل الضريبة.', categories: [M('الأطباق الرئيسية', [['مندي لحم', 'لحم مطهو ببطء على أرز بخاري', '68'], ['مشاوي مشكلة', 'كباب وشيش طاووق وريش', '75'], ['دجاج مضغوط', 'نصف دجاج بالأرز والصلصة الحارة', '38']]), M('الحلى', [['أم علي', 'بالمكسرات والقشطة', '22'], ['كنافة', 'بالجبن، تقدم ساخنة', '25']])] },
    en: { title: 'Our menu', note: 'Prices in SAR, VAT included.', categories: [M('Mains', [['Lamb mandi', 'Slow-cooked lamb on fragrant rice', '68'], ['Mixed grill', 'Kebab, shish tawook and lamb chops', '75'], ['Pressure-cooked chicken', 'Half chicken with rice and hot sauce', '38']]), M('Desserts', [['Om Ali', 'With nuts and cream', '22'], ['Kunafa', 'With cheese, served hot', '25']])] },
  },
  cafe: {
    ar: { title: 'المنيو', note: 'الأسعار بالريال وتشمل الضريبة.', categories: [M('القهوة', [['إسبريسو', 'محصول اليوم', '12'], ['لاتيه', 'حليب طازج ورغوة ناعمة', '18'], ['V60', 'تقطير يدوي لمحاصيل مختارة', '22']]), M('الحلى', [['كرواسون زبدة', 'يخبز يومياً', '12'], ['تشيز كيك', 'بصوص التوت', '24']])] },
    en: { title: 'Menu', note: 'Prices in SAR, VAT included.', categories: [M('Coffee', [['Espresso', 'Today’s roast', '12'], ['Latte', 'Fresh milk, silky foam', '18'], ['V60', 'Hand-brewed single origin', '22']]), M('Sweets', [['Butter croissant', 'Baked every morning', '12'], ['Cheesecake', 'With berry sauce', '24']])] },
  },
  bakery: {
    ar: { title: 'منتجاتنا', note: 'الأسعار بالريال. الطلبات الخاصة قبل يومين.', categories: [M('الكيك', [['كيكة شوكولاتة', 'تكفي 10 أشخاص', '120'], ['كيكة الفانيلا والتوت', 'تكفي 8 أشخاص', '110']]), M('المعجنات', [['كرواسون', 'زبدة فرنسية', '8'], ['فطائر مشكلة', 'جبن وزعتر وسبانخ، 12 حبة', '30']])] },
    en: { title: 'Our bakes', note: 'Prices in SAR. Custom orders two days ahead.', categories: [M('Cakes', [['Chocolate cake', 'Serves 10', '120'], ['Vanilla berry cake', 'Serves 8', '110']]), M('Pastries', [['Croissant', 'French butter', '8'], ['Mixed pies', 'Cheese, zaatar and spinach, 12 pieces', '30']])] },
  },
};
const priceListTitle: Record<SiteLang, string> = { ar: 'الأسعار', en: 'Prices', de: 'Preise', fr: 'Tarifs', ru: 'Цены' };

const testimonialsTitle: Record<SiteLang, string> = { ar: 'آراء عملائنا', en: 'What our clients say', de: 'Was unsere Kunden sagen', fr: 'Ce que disent nos clients', ru: 'Отзывы клиентов' };

export function sampleSpec(template: TemplateId, lang: SiteLang): Spec {
  const l = lang === 'ar' ? 'ar' : 'en';
  if (!templateById[template]) template = 'corporate';
  const cat = categoryOf(template);
  const words = { ...extra.templates, ...more.templates } as Record<string, { ar: BaseCopy; en: BaseCopy }>;
  const faqs = { ...extra.faq, ...more.faq } as Record<string, { ar: Copy['faq']; en: Copy['faq'] }>;
  const base = sample[cat]?.[l] ?? words[cat]?.[l] ?? sample.corporate[l];
  const faq = faqs[cat]?.[l] ?? { title: '', items: [] };
  const copy: Copy = {
    ...base,
    testimonials: { title: testimonialsTitle[lang] ?? testimonialsTitle.en, items: [] },
    faq,
    menu: sampleMenus[cat]?.[l] ?? { title: priceListTitle[lang] ?? priceListTitle.en, note: '', categories: [] },
    extras: { whatsappButton: true, contactForm: false, mapUrl: '' },
  };
  const look = looks[template];
  return {
    template, lang,
    colors: { primary: look.primary, accent: look.accent },
    font: look.font,
    sections: [...sectionIds],
    media: emptyMedia(),
    ...structuredClone(copy),
  };
}

// ---- Cleaning a spec that came from the AI or from storage ----

const str = (v: unknown, max: number, fallback = '') =>
  typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').slice(0, max) : fallback;
const color = (v: unknown, fallback: string) =>
  typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v.trim()) ? v.trim() : fallback;
const mapUrl = (v: unknown, fallback: string) =>
  v === '' ? '' : typeof v === 'string' && /^https:\/\/(maps\.app\.goo\.gl|goo\.gl\/maps|www\.google\.com\/maps|maps\.google\.com)\/[^\s"<>]{0,300}$/.test(v.trim()) ? v.trim() : fallback;
const bool = (v: unknown, fallback: boolean) => (typeof v === 'boolean' ? v : fallback);
const img = (v: unknown, fallback: string) =>
  v === '' ? '' : typeof v === 'string' && imageIdPattern.test(v) ? v : fallback;
const pick = <T extends string>(v: unknown, list: readonly T[], fallback: T): T =>
  list.includes(v as T) ? (v as T) : fallback;

/** Merge an untrusted (partial) spec onto a base spec, keeping only valid fields. */
export function mergeSpec(base: Spec, raw: unknown): Spec {
  if (!raw || typeof raw !== 'object') return base;
  const r = raw as Record<string, any>;
  const o = (k: string) => (r[k] && typeof r[k] === 'object' ? r[k] : {});
  const items = Array.isArray(o('services').items) ? o('services').items : null;
  const stats = Array.isArray(r.stats) ? r.stats : null;
  const sections = Array.isArray(r.sections) ? r.sections.filter((s: unknown) => sectionIds.includes(s as SectionId)) : null;
  return {
    template: pick(r.template, templateIds, base.template),
    lang: pick(r.lang, siteLangs, base.lang),
    name: str(r.name, 60, base.name),
    tagline: str(r.tagline, 90, base.tagline),
    colors: {
      primary: color(o('colors').primary, base.colors.primary),
      accent: color(o('colors').accent, base.colors.accent),
      background: o('colors').background === '' ? '' : color(o('colors').background, base.colors.background ?? ''),
    },
    font: pick(r.font, fontIds, base.font),
    hero: {
      title: str(o('hero').title, 120, base.hero.title),
      subtitle: str(o('hero').subtitle, 300, base.hero.subtitle),
      cta: str(o('hero').cta, 40, base.hero.cta),
    },
    about: { title: str(o('about').title, 60, base.about.title), text: str(o('about').text, 900, base.about.text) },
    services: {
      title: str(o('services').title, 60, base.services.title),
      items: items
        ? items.slice(0, 6).map((it: any, i: number) => ({
            title: str(it?.title, 60, base.services.items[i]?.title ?? ''),
            text: str(it?.text, 220, base.services.items[i]?.text ?? ''),
          })).filter((it: { title: string }) => it.title)
        : base.services.items,
    },
    stats: stats
      ? stats.slice(0, 4).map((s: any, i: number) => ({
          value: str(s?.value, 16, base.stats[i]?.value ?? ''),
          label: str(s?.label, 40, base.stats[i]?.label ?? ''),
        })).filter((s: { value: string }) => s.value)
      : base.stats,
    ctaBand: {
      title: str(o('ctaBand').title, 100, base.ctaBand.title),
      text: str(o('ctaBand').text, 240, base.ctaBand.text),
      button: str(o('ctaBand').button, 40, base.ctaBand.button),
    },
    contact: {
      title: str(o('contact').title, 60, base.contact.title),
      phone: str(o('contact').phone, 30, base.contact.phone),
      whatsapp: str(o('contact').whatsapp, 30, base.contact.whatsapp),
      email: str(o('contact').email, 80, base.contact.email),
      address: str(o('contact').address, 160, base.contact.address),
      hours: str(o('contact').hours, 100, base.contact.hours),
    },
    sections: sections ?? base.sections,
    testimonials: (() => {
      const t = o('testimonials');
      const bt = base.testimonials ?? { title: '', items: [] };
      return {
        title: str(t.title, 60, bt.title),
        items: Array.isArray(t.items)
          ? t.items.slice(0, 6).map((it: any) => ({ quote: str(it?.quote, 400), name: str(it?.name, 60), role: str(it?.role, 60) })).filter((it: { quote: string; name: string }) => it.quote && it.name)
          : bt.items,
      };
    })(),
    faq: (() => {
      const f = o('faq');
      const bf = base.faq ?? { title: '', items: [] };
      return {
        title: str(f.title, 60, bf.title),
        items: Array.isArray(f.items)
          ? f.items.slice(0, 8).map((it: any) => ({ q: str(it?.q, 160), a: str(it?.a, 500) })).filter((it: { q: string; a: string }) => it.q && it.a)
          : bf.items,
      };
    })(),
    menu: (() => {
      const mm = o('menu');
      const bm = base.menu ?? { title: '', note: '', categories: [] };
      return {
        title: str(mm.title, 60, bm.title),
        note: str(mm.note, 200, bm.note),
        categories: Array.isArray(mm.categories)
          ? mm.categories.slice(0, 12).map((c: any) => ({
              name: str(c?.name, 60),
              items: Array.isArray(c?.items)
                ? c.items.slice(0, 40).map((it: any) => ({ name: str(it?.name, 80), desc: str(it?.desc, 200), price: str(it?.price, 24) })).filter((it: { name: string }) => it.name)
                : [],
            })).filter((c: { items: unknown[] }) => c.items.length)
          : bm.categories,
      };
    })(),
    extras: (() => {
      const e = o('extras');
      const be = base.extras ?? { whatsappButton: true, contactForm: false, mapUrl: '' };
      return { whatsappButton: bool(e.whatsappButton, be.whatsappButton), contactForm: bool(e.contactForm, be.contactForm), mapUrl: mapUrl(e.mapUrl, be.mapUrl) };
    })(),
    media: (() => {
      const m = o('media');
      const bm = base.media ?? emptyMedia();
      return {
        logo: img(m.logo, bm.logo),
        hero: img(m.hero, bm.hero),
        about: img(m.about, bm.about),
        gallery: Array.isArray(m.gallery)
          ? m.gallery.filter((x: unknown) => typeof x === 'string' && imageIdPattern.test(x)).slice(0, 9)
          : bm.gallery,
        galleryTitle: str(m.galleryTitle, 60, bm.galleryTitle),
      };
    })(),
  };
}
