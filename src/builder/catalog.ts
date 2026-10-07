// Template catalog: every design in the builder is a business category plus a design variant.
// A variant picks one of the six base layouts, its own colours and font; the category gives the
// sample words, the hero artwork and small style touches.

export type Layout = 'corporate' | 'personal' | 'restaurant' | 'clinic' | 'store' | 'events';
export type FontId = 'modern' | 'elegant' | 'friendly';

export const categoryIds = [
  'corporate', 'restaurant', 'cafe', 'clinic', 'dental', 'beauty', 'barber', 'store', 'perfume',
  'realestate', 'construction', 'law', 'accounting', 'tech', 'agency', 'education', 'fitness',
  'hotel', 'cars', 'photography', 'bakery', 'florist', 'cleaning', 'events', 'venue', 'charity', 'personal',
] as const;
export type CategoryId = (typeof categoryIds)[number];

type V = [Layout, string, string, FontId];
/** Three designs per category: [layout, primary, accent, font]. The first keeps the category id. */
const variants: Record<CategoryId, V[]> = {
  corporate: [['corporate', '#1D3A8A', '#F2A900', 'modern'], ['clinic', '#0F766E', '#F59E0B', 'friendly'], ['events', '#0B1120', '#38BDF8', 'modern']],
  restaurant: [['restaurant', '#6B2310', '#E0A526', 'elegant'], ['events', '#111827', '#F97316', 'modern'], ['personal', '#3F2A1E', '#B45309', 'elegant']],
  cafe: [['restaurant', '#3B2416', '#D4A373', 'elegant'], ['personal', '#2F3E2C', '#C08552', 'elegant'], ['events', '#1C1410', '#E9C46A', 'modern']],
  clinic: [['clinic', '#0E7490', '#22A06B', 'friendly'], ['corporate', '#1E3A5F', '#14B8A6', 'modern'], ['personal', '#155E75', '#F59E0B', 'elegant']],
  dental: [['clinic', '#0369A1', '#38BDF8', 'friendly'], ['corporate', '#134E4A', '#2DD4BF', 'modern'], ['store', '#1E40AF', '#F472B6', 'friendly']],
  beauty: [['clinic', '#7A2E55', '#E8A5B9', 'elegant'], ['personal', '#3D2B3D', '#C9A27E', 'elegant'], ['restaurant', '#831843', '#F9A8D4', 'elegant']],
  barber: [['events', '#111111', '#C9A227', 'modern'], ['restaurant', '#1F2937', '#B91C1C', 'elegant'], ['personal', '#27272A', '#D97706', 'elegant']],
  store: [['store', '#5B21B6', '#F97316', 'friendly'], ['clinic', '#0F766E', '#FB7185', 'friendly'], ['events', '#0B1120', '#FACC15', 'modern']],
  perfume: [['personal', '#2B1B17', '#C9A227', 'elegant'], ['events', '#120D0B', '#D4AF37', 'elegant'], ['store', '#4A1D3F', '#E0B354', 'elegant']],
  realestate: [['corporate', '#14532D', '#D4A017', 'modern'], ['restaurant', '#1E293B', '#C8A24A', 'elegant'], ['events', '#0B1120', '#34D399', 'modern']],
  construction: [['corporate', '#1F2937', '#F59E0B', 'modern'], ['events', '#111111', '#FACC15', 'modern'], ['store', '#7C2D12', '#FB923C', 'modern']],
  law: [['corporate', '#1F2A44', '#B08D57', 'elegant'], ['personal', '#1C1917', '#A16207', 'elegant'], ['events', '#0F172A', '#C8A24A', 'elegant']],
  accounting: [['corporate', '#0C4A6E', '#22C55E', 'modern'], ['clinic', '#1E3A8A', '#06B6D4', 'friendly'], ['personal', '#14532D', '#CA8A04', 'elegant']],
  tech: [['events', '#0B1120', '#8B5CF6', 'modern'], ['corporate', '#312E81', '#22D3EE', 'modern'], ['clinic', '#4338CA', '#F472B6', 'friendly']],
  agency: [['events', '#0A0A0A', '#FF5A36', 'modern'], ['personal', '#18181B', '#E11D48', 'elegant'], ['corporate', '#7C3AED', '#FDE047', 'friendly']],
  education: [['clinic', '#1E40AF', '#F97316', 'friendly'], ['corporate', '#0F766E', '#FBBF24', 'friendly'], ['store', '#6D28D9', '#22C55E', 'friendly']],
  fitness: [['events', '#111111', '#EF4444', 'modern'], ['restaurant', '#0F172A', '#84CC16', 'modern'], ['corporate', '#1E1B4B', '#F97316', 'modern']],
  hotel: [['restaurant', '#1C3D5A', '#C9A227', 'elegant'], ['personal', '#2D2A26', '#B8935A', 'elegant'], ['corporate', '#134E4A', '#E6B655', 'elegant']],
  cars: [['events', '#0B0F14', '#EF4444', 'modern'], ['corporate', '#111827', '#3B82F6', 'modern'], ['store', '#1E293B', '#F59E0B', 'modern']],
  photography: [['personal', '#111111', '#E4B363', 'elegant'], ['events', '#0A0A0A', '#F5F5F4', 'elegant'], ['restaurant', '#292524', '#D6A266', 'elegant']],
  bakery: [['restaurant', '#7C2D12', '#F4C095', 'friendly'], ['store', '#9D174D', '#FBBF24', 'friendly'], ['clinic', '#92400E', '#F9A8D4', 'friendly']],
  florist: [['store', '#9F1239', '#86EFAC', 'elegant'], ['personal', '#3F6212', '#F472B6', 'elegant'], ['clinic', '#BE185D', '#A3E635', 'friendly']],
  cleaning: [['clinic', '#0284C7', '#4ADE80', 'friendly'], ['corporate', '#075985', '#FACC15', 'friendly'], ['store', '#0E7490', '#A3E635', 'friendly']],
  events: [['events', '#0B1120', '#B7F34B', 'modern'], ['restaurant', '#4C1D95', '#FBBF24', 'modern'], ['corporate', '#9A3412', '#F59E0B', 'modern']],
  venue: [['restaurant', '#3B0764', '#E9C46A', 'elegant'], ['events', '#120C1C', '#D8B4FE', 'elegant'], ['personal', '#4A3728', '#CDA35F', 'elegant']],
  charity: [['clinic', '#166534', '#F59E0B', 'friendly'], ['corporate', '#1E3A8A', '#10B981', 'friendly'], ['restaurant', '#0F4C5C', '#E9C46A', 'friendly']],
  personal: [['personal', '#1C1917', '#C2410C', 'elegant'], ['corporate', '#0F172A', '#6366F1', 'modern'], ['events', '#0A0A0A', '#F472B6', 'modern']],
};

export interface TemplateDef { id: string; cat: CategoryId; layout: Layout; primary: string; accent: string; font: FontId; n: number }

export const catalog: TemplateDef[] = categoryIds.flatMap((cat) =>
  variants[cat].map(([layout, primary, accent, font], i) => ({ id: i === 0 ? cat : `${cat}-${i + 1}`, cat, layout, primary, accent, font, n: i + 1 })));

export const templateById: Record<string, TemplateDef> = Object.fromEntries(catalog.map((t) => [t.id, t]));
export const categoryOf = (id: string): CategoryId => templateById[id]?.cat ?? 'corporate';

/** Words people type when describing their business, for the quick start and the search box. */
export const categoryKeywords: Record<CategoryId, RegExp> = {
  dental: /أسنان|اسنان|تقويم|dental|dentist|teeth|zahn|dentaire|стоматолог|зуб/i,
  clinic: /عياد|طبي|طبيب|مستشفى|مستوصف|صيدلي|علاج طبيعي|clinic|medical|doctor|hospital|physio|klinik|arzt|clinique|médic|клиник|врач/i,
  cafe: /مقهى|كافيه|كافي|كوفي|قهوة|coffee|caf[eé]|espresso|kaffee|кофе|кафе/i,
  bakery: /مخبز|حلويات|حلا|كيك|معجنات|bakery|cake|pastr|dessert|sweets|bäckerei|pâtisserie|пекарн|кондитер/i,
  restaurant: /مطعم|مطاعم|مأكولات|مشويات|بيتزا|برجر|restaurant|food|grill|pizza|burger|kitchen|essen|ресторан|еда/i,
  barber: /حلاق|حلاقة|باربر|barber|grooming|friseur|barbier|барбер/i,
  beauty: /صالون|تجميل|سبا|مكياج|أظافر|اظافر|ليزر|beauty|salon|spa|makeup|nails|kosmetik|beauté|красот|салон/i,
  perfume: /عطر|عطور|عود|بخور|perfume|fragrance|oud|parfum|духи|парфюм/i,
  florist: /ورد|ورود|زهور|هدايا|flower|florist|bouquet|blumen|fleur|цвет/i,
  store: /متجر|محل|بيع|منتجات|ملابس|أزياء|ازياء|اكسسوار|store|shop|boutique|fashion|products|laden|magasin|магазин/i,
  realestate: /عقار|شقق|فلل|أراضي|اراضي|تطوير عقاري|real ?estate|property|realtor|immobil|недвижим/i,
  construction: /مقاول|مقاولات|بناء|إنشاء|انشاء|ترميم|تشطيب|construction|contractor|building|renovat|bau|btp|строител/i,
  law: /محام|محاماة|قانون|قانونية|law|lawyer|legal|attorney|anwalt|kanzlei|avocat|juridique|юрист|адвокат/i,
  accounting: /محاسب|محاسبة|ضريبة|زكاة|مراجعة|تدقيق|account|bookkeep|\btax\b|audit|steuer|comptab|бухгалтер|налог/i,
  tech: /تقني|برمج|برمجيات|تطبيق|سوفتوير|ذكاء اصطناعي|\btech|software|saas|\bapps?\b|startup|it services|digital|программ|техн/i,
  agency: /تسويق|إعلان|اعلان|دعاية|سوشيال|براندينج|marketing|advertis|agency|branding|social media|werbe|agence|маркетинг|реклам/i,
  education: /تعليم|مدرسة|معهد|أكاديمي|اكاديمي|دورات|تدريب|حضانة|روضة|education|school|academy|institute|course|training|tutor|nursery|schule|école|formation|образован|школ|курс/i,
  fitness: /نادي|جيم|لياقة|رياضة|كروس فت|يوغا|gym|fitness|workout|crossfit|yoga|sport|фитнес|спортзал/i,
  hotel: /فندق|فنادق|منتجع|شاليه|نزل|سياحة|hotel|resort|chalet|tourism|travel|hôtel|отель|гостиниц/i,
  cars: /سيار|ورشة|صيانة سيارات|غسيل سيارات|تأجير|\bcars?\b|\bauto\b|garage|workshop|car rental|werkstatt|voiture|авто|машин/i,
  photography: /تصوير|مصور|استوديو|فوتوغراف|photo|camera|studio|video|fotograf|фото/i,
  cleaning: /تنظيف|نظافة|مكافحة حشرات|غسيل|cleaning|cleaners|maid|pest|reinigung|nettoyage|уборк|клининг/i,
  venue: /قاعة|قاعات|أفراح|افراح|زفاف|حفلات|wedding|venue|hall|ballroom|hochzeit|mariage|свадьб|банкет/i,
  events: /فعالي|مؤتمر|معرض|ملتقى|مهرجان|event|conference|expo|summit|festival|veranstalt|événement|конференц|мероприят/i,
  charity: /جمعية|خيري|خيرية|تطوع|وقف|charity|nonprofit|ngo|foundation|volunteer|verein|association|благотвор|фонд/i,
  corporate: /شركة|شركات|استشار|مؤسسة|company|corporate|consult|business|firm|unternehmen|entreprise|компания/i,
  personal: /مصمم|مستقل|كاتب|فنان|مدرب شخصي|بورتفوليو|سيرة|freelanc|designer|portfolio|artist|writer|coach|resume|дизайнер/i,
};

/** Best category for a free-text description of a business. */
export function guessCategory(text: string): CategoryId {
  for (const id of Object.keys(categoryKeywords) as CategoryId[]) if (categoryKeywords[id].test(text)) return id;
  return 'corporate';
}
