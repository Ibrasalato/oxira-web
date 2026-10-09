// "Your business online in a day" bundle. Price in SAR before 15% VAT.
// Keep in sync with the "Check order" node of the n8n workflow "Oxira 19 — Online in a day".
import type { Lang } from './content';

export const BUNDLE = { price: 3999, vat: 0.15 };

type Copy = {
  nav: string; navDesc: string; title: string; description: string;
  kicker: string; h1: string; lead: string;
  includedTitle: string; included: { t: string; d: string }[];
  stepsTitle: string; steps: string[];
  priceLabel: string; priceNote: string; sar: string; vat: string;
  formTitle: string; name: string; business: string; activity: string; activityPh: string; city: string; phone: string; whatsapp: string; email: string; notes: string;
  submit: string; sending: string; ok: (id: string) => string; payDown: string; err: string; missing: string; privacy: string;
  faqTitle: string; faq: { q: string; a: string }[];
};

const ar: Copy = {
  nav: 'نشاطك أونلاين في يوم', navDesc: 'موقع + واتساب ذكي + جوجل',
  title: 'نشاطك أونلاين في يوم: موقع ووكيل واتساب ذكي | أوكسيرا',
  description: 'باقة واحدة تطلق نشاطك على الإنترنت خلال يوم عمل: موقع احترافي بنطاق واستضافة، وكيل ذكاء اصطناعي يرد على عملائك في واتساب، وملف نشاطك على خرائط جوجل.',
  kicker: 'باقة الإطلاق السريع',
  h1: 'نشاطك أونلاين في يوم واحد',
  lead: 'أرسل لنا اسم نشاطك وشعارك وصورك، ونسلّمك خلال يوم عمل موقعاً احترافياً، ووكيلاً ذكياً يرد على عملائك في واتساب على مدار الساعة، وملف نشاطك على خرائط جوجل.',
  includedTitle: 'وش تشمل الباقة',
  included: [
    { t: 'موقع احترافي (باقة Pro)', d: 'تصميم متجاوب بالعربي والإنجليزي، نطاق .com أو .sa لسنة، استضافة سريعة وشهادة أمان، ومساعد محادثة ذكي في الموقع.' },
    { t: 'وكيل واتساب بالذكاء الاصطناعي', d: 'يرد على أسئلة العملاء عن خدماتك وأسعارك ومواعيدك، ويسجل الطلبات والحجوزات ويرسلها لك. أول شهر مشمول.' },
    { t: 'ملف نشاطك على جوجل', d: 'إنشاء أو تحسين ملف Google Business: العنوان، ساعات العمل، الصور، الرابط والواتساب، عشان يلقاك العملاء في الخرائط.' },
    { t: 'إطلاق ومتابعة', d: 'نربط كل شيء ببعض، ونختبره معك، وندربك على لوحة التحكم في مكالمة قصيرة.' },
  ],
  stepsTitle: 'كيف تمشي',
  steps: ['اطلب الباقة وادفع أونلاين', 'نرسل لك قائمة قصيرة بالمحتوى (الشعار، الصور، الخدمات والأسعار)', 'خلال يوم عمل من استلام المحتوى نطلق الموقع والواتساب وملف جوجل'],
  priceLabel: 'سعر الباقة', priceNote: 'دفعة واحدة. بعد السنة الأولى: تجديد الاستضافة والنطاق، واشتراك وكيل الواتساب الشهري من الشهر الثاني.', sar: 'ر.س', vat: 'قبل ضريبة القيمة المضافة',
  formTitle: 'اطلب الباقة', name: 'الاسم', business: 'اسم النشاط', activity: 'نوع النشاط', activityPh: 'مثلاً: مطعم، عيادة، صالون، متجر', city: 'المدينة', phone: 'رقم الجوال', whatsapp: 'رقم واتساب النشاط (إن كان مختلفاً)', email: 'البريد الإلكتروني', notes: 'ملاحظات (اختياري)',
  submit: 'اطلب وادفع', sending: 'جارٍ إنشاء الطلب…', ok: (id) => `تم تسجيل طلبك رقم ${id}. بنتواصل معك اليوم لاستلام المحتوى.`, payDown: 'الدفع الإلكتروني غير متاح حالياً، وسجلنا طلبك وبنتواصل معك لإتمام الدفع.', err: 'تعذر إرسال الطلب. حاول مرة ثانية أو راسلنا على واتساب.', missing: 'اكتب الاسم واسم النشاط ورقم جوال وبريداً صحيحاً.', privacy: 'نستخدم بياناتك لتنفيذ الطلب فقط.',
  faqTitle: 'أسئلة شائعة',
  faq: [
    { q: 'هل يكون جاهزاً فعلاً خلال يوم؟', a: 'نعم خلال يوم عمل من استلام المحتوى كاملاً. ربط واتساب قد يحتاج تحقق من Meta يأخذ أحياناً يوماً إضافياً.' },
    { q: 'هل أحتاج رقم واتساب جديد؟', a: 'الأفضل رقم مخصص للنشاط على واتساب بزنس. نساعدك في تجهيزه إذا ما عندك.' },
    { q: 'أقدر أعدل الموقع بعدين؟', a: 'نعم، من لوحة التحكم في حسابك، أو نعدله لك.' },
  ],
};

const en: Copy = {
  nav: 'Online in a day', navDesc: 'Website + AI WhatsApp + Google',
  title: 'Online in a day: website, WhatsApp AI agent | Oxira',
  description: 'Launch your business online within one working day: a website with domain and hosting, an AI agent that answers on WhatsApp, and your Google Maps profile.',
  kicker: 'Fast launch bundle',
  h1: 'Your business online in one day',
  lead: 'Send us your business name, logo and photos. Within one working day we hand you a professional website, an AI agent that answers your customers on WhatsApp around the clock, and your business profile on Google Maps.',
  includedTitle: 'What is included',
  included: [
    { t: 'Professional website (Pro plan)', d: 'Responsive design in Arabic and English, a .com or .sa domain for a year, fast hosting with SSL, and an AI chat assistant on the site.' },
    { t: 'AI WhatsApp agent', d: 'Answers questions about your services, prices and hours, and records orders and bookings for you. First month included.' },
    { t: 'Google business profile', d: 'We create or improve your Google Business profile: address, hours, photos, website and WhatsApp, so customers find you on Maps.' },
    { t: 'Launch and handover', d: 'We connect everything, test it with you, and walk you through the dashboard in a short call.' },
  ],
  stepsTitle: 'How it works',
  steps: ['Order the bundle and pay online', 'We send a short content checklist (logo, photos, services and prices)', 'Within one working day of receiving the content we launch the site, WhatsApp and Google profile'],
  priceLabel: 'Bundle price', priceNote: 'One payment. After the first year: hosting and domain renewal; the WhatsApp agent subscription starts from the second month.', sar: 'SAR', vat: 'before VAT',
  formTitle: 'Order the bundle', name: 'Name', business: 'Business name', activity: 'Type of business', activityPh: 'e.g. restaurant, clinic, salon, shop', city: 'City', phone: 'Mobile', whatsapp: 'Business WhatsApp number (if different)', email: 'Email', notes: 'Notes (optional)',
  submit: 'Order and pay', sending: 'Creating your order…', ok: (id) => `Order #${id} received. We will contact you today to collect your content.`, payDown: 'Online payment is not available right now. Your order is saved and we will contact you to complete payment.', err: 'Could not send the order. Try again or message us on WhatsApp.', missing: 'Please enter your name, business name, a mobile number and a valid email.', privacy: 'We use your details only to fulfil the order.',
  faqTitle: 'FAQ',
  faq: [
    { q: 'Is it really ready in a day?', a: 'Yes, within one working day of receiving the complete content. WhatsApp connection may need Meta verification, which sometimes takes an extra day.' },
    { q: 'Do I need a new WhatsApp number?', a: 'A dedicated WhatsApp Business number is best. We help you set one up if needed.' },
    { q: 'Can I edit the site later?', a: 'Yes, from the dashboard in your account, or we edit it for you.' },
  ],
};

const de: Copy = { ...en,
  nav: 'Online an einem Tag', navDesc: 'Website + KI-WhatsApp + Google',
  title: 'An einem Tag online: Website & WhatsApp-KI | Oxira',
  description: 'Ein Paket, das Ihr Geschäft an einem Arbeitstag online bringt: professionelle Website mit Domain und Hosting, KI-Agent für WhatsApp und Ihr Google-Unternehmensprofil.',
  kicker: 'Schnellstart-Paket', h1: 'Ihr Geschäft an einem Tag online',
  lead: 'Senden Sie uns Name, Logo und Fotos. Innerhalb eines Arbeitstags erhalten Sie eine professionelle Website, einen KI-Agenten, der Kunden rund um die Uhr auf WhatsApp antwortet, und Ihr Profil auf Google Maps.',
  includedTitle: 'Im Paket enthalten', stepsTitle: 'So läuft es ab', priceLabel: 'Paketpreis', vat: 'zzgl. MwSt.',
  formTitle: 'Paket bestellen', name: 'Name', business: 'Name des Unternehmens', activity: 'Branche', activityPh: 'z. B. Restaurant, Praxis, Salon, Shop', city: 'Stadt', phone: 'Mobilnummer', whatsapp: 'WhatsApp-Nummer des Unternehmens (falls abweichend)', email: 'E-Mail', notes: 'Hinweise (optional)',
  submit: 'Bestellen und bezahlen', sending: 'Bestellung wird erstellt…', ok: (id) => `Bestellung Nr. ${id} erhalten. Wir melden uns heute, um Ihre Inhalte abzustimmen.`,
  payDown: 'Online-Zahlung ist gerade nicht verfügbar. Ihre Bestellung ist gespeichert, wir melden uns zur Zahlung.', err: 'Bestellung konnte nicht gesendet werden. Bitte erneut versuchen oder per WhatsApp schreiben.', missing: 'Bitte Name, Unternehmen, Mobilnummer und gültige E-Mail angeben.', privacy: 'Wir nutzen Ihre Daten nur zur Ausführung der Bestellung.', faqTitle: 'Häufige Fragen',
};
const fr: Copy = { ...en,
  nav: 'En ligne en un jour', navDesc: 'Site + WhatsApp IA + Google',
  title: 'En ligne en un jour : site et agent WhatsApp IA | Oxira',
  description: 'Un pack qui met votre activité en ligne en un jour ouvré : site professionnel avec domaine et hébergement, agent IA sur WhatsApp et fiche Google Business.',
  kicker: 'Pack lancement rapide', h1: 'Votre activité en ligne en un jour',
  lead: 'Envoyez-nous le nom, le logo et des photos. En un jour ouvré, vous recevez un site professionnel, un agent IA qui répond à vos clients sur WhatsApp 24 h/24 et votre fiche sur Google Maps.',
  includedTitle: 'Ce que comprend le pack', stepsTitle: 'Déroulement', priceLabel: 'Prix du pack', vat: 'HT',
  formTitle: 'Commander le pack', name: 'Nom', business: 'Nom de l’activité', activity: 'Type d’activité', activityPh: 'ex. restaurant, clinique, salon, boutique', city: 'Ville', phone: 'Mobile', whatsapp: 'Numéro WhatsApp de l’activité (si différent)', email: 'E-mail', notes: 'Remarques (facultatif)',
  submit: 'Commander et payer', sending: 'Création de la commande…', ok: (id) => `Commande n° ${id} reçue. Nous vous contactons aujourd’hui pour recueillir vos contenus.`,
  payDown: 'Le paiement en ligne n’est pas disponible pour le moment. Votre commande est enregistrée et nous vous contacterons pour le paiement.', err: 'Envoi impossible. Réessayez ou écrivez-nous sur WhatsApp.', missing: 'Indiquez votre nom, l’activité, un mobile et un e-mail valide.', privacy: 'Vos données servent uniquement à traiter la commande.', faqTitle: 'Questions fréquentes',
};
const ru: Copy = { ...en,
  nav: 'Онлайн за один день', navDesc: 'Сайт + ИИ в WhatsApp + Google',
  title: 'Бизнес онлайн за день: сайт и ИИ-агент WhatsApp | Oxira',
  description: 'Один пакет, который выводит бизнес в онлайн за рабочий день: профессиональный сайт с доменом и хостингом, ИИ-агент в WhatsApp и профиль компании в Google.',
  kicker: 'Пакет быстрого запуска', h1: 'Ваш бизнес онлайн за один день',
  lead: 'Пришлите название, логотип и фото. За один рабочий день вы получите профессиональный сайт, ИИ-агента, который круглосуточно отвечает клиентам в WhatsApp, и профиль компании на Google Картах.',
  includedTitle: 'Что входит', stepsTitle: 'Как это работает', priceLabel: 'Цена пакета', vat: 'без НДС',
  formTitle: 'Заказать пакет', name: 'Имя', business: 'Название бизнеса', activity: 'Сфера', activityPh: 'например: ресторан, клиника, салон, магазин', city: 'Город', phone: 'Мобильный', whatsapp: 'WhatsApp бизнеса (если другой)', email: 'E-mail', notes: 'Комментарий (необязательно)',
  submit: 'Заказать и оплатить', sending: 'Создаём заказ…', ok: (id) => `Заказ № ${id} получен. Мы свяжемся с вами сегодня, чтобы получить материалы.`,
  payDown: 'Онлайн-оплата сейчас недоступна. Заказ сохранён, мы свяжемся с вами для оплаты.', err: 'Не удалось отправить заказ. Попробуйте снова или напишите в WhatsApp.', missing: 'Укажите имя, название бизнеса, мобильный и корректный e-mail.', privacy: 'Мы используем ваши данные только для выполнения заказа.', faqTitle: 'Вопросы',
};

export const bundleText: Record<Lang, Copy> = { ar, en, de, fr, ru };
