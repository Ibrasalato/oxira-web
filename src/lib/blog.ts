import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/content';

// The blog exists in Arabic (/blog/) and English (/en/blog/). An English article uses the same slug
// (file name) as its Arabic original, so each page can point to its translation.
export type BlogLang = 'ar' | 'en';
export type Post = CollectionEntry<'blog'> | CollectionEntry<'blogEn'>;
export const blogLangs: BlogLang[] = ['ar', 'en'];
export const isBlogLang = (l: Lang): l is BlogLang => l === 'ar' || l === 'en';

/** Articles in one language, newest first. */
export async function getPosts(lang: BlogLang): Promise<Post[]> {
  const posts: Post[] = lang === 'ar' ? await getCollection('blog') : await getCollection('blogEn');
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Languages an article exists in. */
export async function postLangs(slug: string): Promise<BlogLang[]> {
  const out: BlogLang[] = [];
  for (const l of blogLangs) if ((await getPosts(l)).some((p) => p.id === slug)) out.push(l);
  return out;
}

/** Heading without the brand suffix used in the <title>. */
export const postHeading = (title: string) => title.replace(/ \| (أوكسيرا|Oxira)$/, '');

export const blogText = {
  ar: {
    dir: 'rtl', dateLocale: 'ar-SA-u-nu-latn-ca-gregory', home: 'الرئيسية', blog: 'المدونة', crumbs: 'مسار الصفحة', team: 'فريق أوكسيرا',
    tocLabel: 'محتويات المقال', toc: 'في هذا المقال', more: 'مقالات أخرى', read: 'اقرأ المقال', chatbot: 'الشات بوت للموقع',
    indexTitle: 'مدونة أوكسيرا: أدلة عملية للمواقع والتسويق الرقمي',
    indexDescription: 'مقالات عملية لأصحاب الأعمال في السعودية: تصميم المواقع والمتاجر، وكلاء واتساب الذكية، أتمتة الأعمال، أنظمة الحجز، المنيو الإلكتروني وتقييمات قوقل.',
    blogName: 'مدونة أوكسيرا',
    h1: 'أدلة عملية لنمو نشاطك على الإنترنت',
    lead: 'مقالات واضحة لأصحاب الأعمال: كيف تختار موقعك وأدواتك، وكيف تجذب عملاء أكثر من قوقل.',
  },
  en: {
    dir: 'ltr', dateLocale: 'en-GB', home: 'Home', blog: 'Blog', crumbs: 'Breadcrumb', team: 'Oxira team',
    tocLabel: 'Article contents', toc: 'In this article', more: 'More articles', read: 'Read article', chatbot: 'Website chatbot',
    indexTitle: 'Oxira Blog: Practical Guides for Websites and Growth',
    indexDescription: 'Practical guides for business owners in Saudi Arabia: websites and online stores, AI WhatsApp agents, automation, booking, digital menus and Google reviews.',
    blogName: 'Oxira Blog',
    h1: 'Practical guides to grow your business online',
    lead: 'Clear articles for business owners: how to choose your website and tools, and how to win more customers from Google.',
  },
} as const;
