// Copy for the free website audit (/website-audit/), the testimonial form (/feedback/) and the proof block.
import type { Lang } from './content';

const checkIds = ['reachable', 'https', 'title', 'description', 'h1', 'viewport', 'lang', 'canonical', 'og', 'schema', 'alt', 'robots', 'sitemap', 'size'] as const;
export type CheckId = (typeof checkIds)[number];
export { checkIds };

interface Growth {
  audit: {
    title: string; description: string; nav: string; h1: string; lead: string;
    url: string; urlPh: string; name: string; email: string; phone: string; submit: string; running: string;
    errUrl: string; errEmail: string; errFailed: string;
    scoreTitle: string; sent: string; passed: string; toFix: string;
    scores: { performance: string; seo: string; accessibility: string; bestPractices: string };
    checks: Record<CheckId, string>;
    tips: Record<CheckId, string>;
    ctaTitle: string; ctaBody: string; ctaBtn: string; again: string;
    whatTitle: string; what: string[]; privacy: string;
  };
  feedback: {
    title: string; h1: string; lead: string; name: string; role: string; company: string; rating: string; text: string; textPh: string;
    email: string; consent: string; submit: string; sending: string; done: string; failed: string;
  };
  proof: { title: string; sites: string };
}

export const growthText: Record<Lang, Growth> = {
  ar: {
    audit: {
      title: 'افحص موقعك مجاناً: تقرير SEO وسرعة فوري | أوكسيرا',
      description: 'أداة مجانية تفحص موقعك خلال ثوانٍ: الظهور في جوجل، التوافق مع الجوال، الأمان والبيانات المنظمة، وتصلك النتيجة مع خطوات التحسين على بريدك.',
      nav: 'افحص موقعك مجاناً',
      h1: 'افحص موقعك مجاناً',
      lead: 'اكتب رابط موقعك، ونفحص لك خلال ثوانٍ أهم ما يحتاجه ليظهر في جوجل ويقنع زواره، ونرسل لك التقرير على بريدك.',
      url: 'رابط موقعك', urlPh: 'example.com', name: 'الاسم', email: 'البريد الإلكتروني', phone: 'الجوال (اختياري)',
      submit: 'افحص الآن', running: 'نفحص موقعك…',
      errUrl: 'تأكد من رابط الموقع، مثل: example.com', errEmail: 'تأكد من البريد الإلكتروني.', errFailed: 'تعذّر الفحص الآن، حاول مرة أخرى بعد قليل.',
      scoreTitle: 'نتيجة موقعك', sent: 'أرسلنا نسخة من التقرير إلى بريدك.', passed: 'سليم', toFix: 'يحتاج تحسين',
      scores: { performance: 'السرعة على الجوال', seo: 'محركات البحث', accessibility: 'سهولة الوصول', bestPractices: 'أفضل الممارسات' },
      checks: {
        reachable: 'الموقع يفتح بدون أخطاء', https: 'اتصال آمن HTTPS', title: 'عنوان الصفحة بطول مناسب', description: 'وصف الصفحة لمحركات البحث',
        h1: 'عنوان رئيسي H1 واحد', viewport: 'متوافق مع الجوال', lang: 'لغة الصفحة محددة', canonical: 'الرابط الأساسي (canonical)',
        og: 'صورة وعنوان عند المشاركة', schema: 'بيانات منظمة لجوجل', alt: 'نص بديل للصور', robots: 'ملف robots.txt', sitemap: 'خريطة الموقع sitemap.xml', size: 'حجم الصفحة مناسب',
      },
      tips: {
        reachable: 'الموقع لم يفتح بشكل سليم. تأكد من الاستضافة والدومين.', https: 'فعّل شهادة SSL ليظهر القفل ويثق بك الزوار وجوجل.',
        title: 'اجعل العنوان بين 10 و65 حرفاً ويتضمن نشاطك ومدينتك.', description: 'اكتب وصفاً من 50 إلى 170 حرفاً يشجع على النقر من نتائج البحث.',
        h1: 'استخدم عنواناً رئيسياً واحداً يصف الصفحة بوضوح.', viewport: 'أضف وسم viewport ليظهر الموقع بشكل صحيح على الجوال.',
        lang: 'حدد لغة الصفحة (lang) ليفهمها جوجل وقارئات الشاشة.', canonical: 'أضف رابطاً أساسياً لمنع تكرار الصفحات في جوجل.',
        og: 'أضف عنواناً وصورة للمشاركة على واتساب وتويتر ولينكدإن.', schema: 'أضف بيانات منظمة (Schema) ليعرض جوجل معلومات نشاطك بشكل أغنى.',
        alt: 'أضف وصفاً نصياً لكل صورة.', robots: 'أضف ملف robots.txt لتوجيه محركات البحث.', sitemap: 'أضف خريطة موقع وسجّلها في Google Search Console.',
        size: 'خفّف حجم الصفحة لتفتح أسرع.',
      },
      ctaTitle: 'تحب نصلح لك هذه النقاط؟', ctaBody: 'مواقع أوكسيرا تأتي جاهزة بكل هذه الأساسيات، أو نساعدك في تحسين موقعك الحالي.', ctaBtn: 'احجز استشارة مجانية', again: 'افحص موقعاً آخر',
      whatTitle: 'ماذا نفحص؟', what: ['الظهور في محركات البحث: العنوان والوصف والعناوين وخريطة الموقع', 'التوافق مع الجوال والأمان (HTTPS)', 'المشاركة على الشبكات الاجتماعية والبيانات المنظمة', 'السرعة وسهولة الوصول عند توفرها'],
      privacy: 'نستخدم بياناتك لإرسال التقرير والتواصل معك بخصوصه فقط.',
    },
    feedback: {
      title: 'شاركنا رأيك في أوكسيرا', h1: 'شاركنا رأيك', lead: 'رأيك يساعدنا نتحسن، ويساعد غيرك يختار بثقة. شكراً لوقتك.',
      name: 'الاسم', role: 'المسمى الوظيفي (اختياري)', company: 'الشركة أو النشاط (اختياري)', rating: 'تقييمك', text: 'رأيك', textPh: 'كيف كانت تجربتك مع أوكسيرا؟',
      email: 'البريد الإلكتروني (لن يُنشر)', consent: 'أوافق على نشر رأيي واسمي (والمسمى والشركة إن كتبتها) على موقع أوكسيرا.',
      submit: 'أرسل رأيي', sending: 'جارٍ الإرسال…', done: 'شكراً لك! وصلنا رأيك.', failed: 'تأكد من البيانات وحاول مرة أخرى.',
    },
    proof: { title: 'ماذا يقول عملاؤنا', sites: 'موقعاً نُشر عبر استوديو أوكسيرا' },
  },
  en: {
    audit: {
      title: 'Free website check: instant SEO & speed report | Oxira',
      description: 'A free tool that checks your website in seconds: Google visibility, mobile, security and structured data, with fixes emailed to you.',
      nav: 'Free website check', h1: 'Check your website for free',
      lead: 'Enter your website address. In seconds we check the essentials it needs to show up on Google and convince visitors, and email you the report.',
      url: 'Your website', urlPh: 'example.com', name: 'Name', email: 'Email', phone: 'Phone (optional)', submit: 'Check now', running: 'Checking your site…',
      errUrl: 'Please check the address, e.g. example.com', errEmail: 'Please check your email address.', errFailed: 'We couldn’t run the check right now. Please try again shortly.',
      scoreTitle: 'Your score', sent: 'We emailed you a copy of the report.', passed: 'Good', toFix: 'Needs work',
      scores: { performance: 'Mobile speed', seo: 'SEO', accessibility: 'Accessibility', bestPractices: 'Best practices' },
      checks: {
        reachable: 'Site loads without errors', https: 'Secure HTTPS connection', title: 'Page title length', description: 'Meta description',
        h1: 'One main H1 heading', viewport: 'Mobile friendly', lang: 'Page language set', canonical: 'Canonical link',
        og: 'Title and image when shared', schema: 'Structured data for Google', alt: 'Image alt text', robots: 'robots.txt file', sitemap: 'sitemap.xml', size: 'Reasonable page size',
      },
      tips: {
        reachable: 'The site didn’t load properly. Check your hosting and domain.', https: 'Turn on SSL so browsers show the padlock and Google trusts your site.',
        title: 'Keep the title between 10 and 65 characters and include your business and city.', description: 'Write a 50–170 character description that makes people click.',
        h1: 'Use one clear main heading per page.', viewport: 'Add a viewport tag so the site displays correctly on phones.',
        lang: 'Set the page language (lang) for Google and screen readers.', canonical: 'Add a canonical link to avoid duplicate pages in Google.',
        og: 'Add a title and image for sharing on WhatsApp, X and LinkedIn.', schema: 'Add structured data so Google can show richer business info.',
        alt: 'Add a text description to every image.', robots: 'Add a robots.txt file to guide search engines.', sitemap: 'Add a sitemap and submit it in Google Search Console.',
        size: 'Reduce the page size so it loads faster.',
      },
      ctaTitle: 'Want us to fix these for you?', ctaBody: 'Oxira websites come with all of these basics built in, or we can help improve your current site.', ctaBtn: 'Book a free consultation', again: 'Check another site',
      whatTitle: 'What we check', what: ['Search visibility: title, description, headings and sitemap', 'Mobile friendliness and security (HTTPS)', 'Social sharing and structured data', 'Speed and accessibility when available'],
      privacy: 'We only use your details to send the report and follow up about it.',
    },
    feedback: {
      title: 'Share your feedback on Oxira', h1: 'Share your feedback', lead: 'Your feedback helps us improve and helps others choose with confidence. Thank you for your time.',
      name: 'Name', role: 'Job title (optional)', company: 'Company or business (optional)', rating: 'Your rating', text: 'Your feedback', textPh: 'How was your experience with Oxira?',
      email: 'Email (not published)', consent: 'I agree that Oxira may publish my feedback and name (and title and company if given) on its website.',
      submit: 'Send feedback', sending: 'Sending…', done: 'Thank you! We received your feedback.', failed: 'Please check the form and try again.',
    },
    proof: { title: 'What our clients say', sites: 'websites published with Oxira Studio' },
  },
  de: {
    audit: {
      title: 'Kostenloser Website-Check: SEO- & Speed-Report | Oxira',
      description: 'Kostenloses Tool prüft Ihre Website in Sekunden: Google-Sichtbarkeit, Mobilgeräte, Sicherheit und strukturierte Daten – mit Tipps per E-Mail.',
      nav: 'Kostenloser Website-Check', h1: 'Prüfen Sie Ihre Website kostenlos',
      lead: 'Geben Sie Ihre Website-Adresse ein. In Sekunden prüfen wir das Wichtigste für Google und Ihre Besucher und senden Ihnen den Bericht per E-Mail.',
      url: 'Ihre Website', urlPh: 'example.com', name: 'Name', email: 'E-Mail', phone: 'Telefon (optional)', submit: 'Jetzt prüfen', running: 'Wir prüfen Ihre Website…',
      errUrl: 'Bitte prüfen Sie die Adresse, z. B. example.com', errEmail: 'Bitte prüfen Sie Ihre E-Mail-Adresse.', errFailed: 'Die Prüfung ist gerade nicht möglich. Bitte versuchen Sie es gleich noch einmal.',
      scoreTitle: 'Ihr Ergebnis', sent: 'Wir haben Ihnen eine Kopie des Berichts gesendet.', passed: 'Gut', toFix: 'Verbesserungsbedarf',
      scores: { performance: 'Mobile Geschwindigkeit', seo: 'SEO', accessibility: 'Barrierefreiheit', bestPractices: 'Best Practices' },
      checks: {
        reachable: 'Website lädt fehlerfrei', https: 'Sichere HTTPS-Verbindung', title: 'Länge des Seitentitels', description: 'Meta-Beschreibung',
        h1: 'Eine H1-Hauptüberschrift', viewport: 'Mobilfreundlich', lang: 'Seitensprache gesetzt', canonical: 'Canonical-Link',
        og: 'Titel und Bild beim Teilen', schema: 'Strukturierte Daten für Google', alt: 'Alternativtexte für Bilder', robots: 'robots.txt', sitemap: 'sitemap.xml', size: 'Angemessene Seitengröße',
      },
      tips: {
        reachable: 'Die Website lud nicht korrekt. Prüfen Sie Hosting und Domain.', https: 'Aktivieren Sie SSL, damit Browser das Schloss zeigen und Google Ihnen vertraut.',
        title: 'Titel mit 10–65 Zeichen, inklusive Branche und Stadt.', description: 'Schreiben Sie eine Beschreibung mit 50–170 Zeichen, die zum Klicken einlädt.',
        h1: 'Eine klare Hauptüberschrift pro Seite.', viewport: 'Fügen Sie ein Viewport-Tag hinzu, damit die Seite auf Handys korrekt aussieht.',
        lang: 'Setzen Sie die Seitensprache (lang) für Google und Screenreader.', canonical: 'Ein Canonical-Link verhindert doppelte Seiten bei Google.',
        og: 'Titel und Bild für das Teilen auf WhatsApp, X und LinkedIn hinzufügen.', schema: 'Strukturierte Daten helfen Google, Ihr Unternehmen reicher darzustellen.',
        alt: 'Jedem Bild eine Textbeschreibung geben.', robots: 'Eine robots.txt hilft Suchmaschinen bei der Orientierung.', sitemap: 'Sitemap anlegen und in der Google Search Console einreichen.',
        size: 'Seitengröße reduzieren, damit sie schneller lädt.',
      },
      ctaTitle: 'Sollen wir das für Sie beheben?', ctaBody: 'Oxira-Websites bringen all diese Grundlagen mit – oder wir verbessern Ihre bestehende Website.', ctaBtn: 'Kostenlose Beratung buchen', again: 'Andere Website prüfen',
      whatTitle: 'Was wir prüfen', what: ['Sichtbarkeit: Titel, Beschreibung, Überschriften und Sitemap', 'Mobilfreundlichkeit und Sicherheit (HTTPS)', 'Teilen in sozialen Netzwerken und strukturierte Daten', 'Geschwindigkeit und Barrierefreiheit, sofern verfügbar'],
      privacy: 'Wir nutzen Ihre Angaben nur, um den Bericht zu senden und dazu nachzufragen.',
    },
    feedback: {
      title: 'Ihr Feedback zu Oxira', h1: 'Teilen Sie Ihr Feedback', lead: 'Ihr Feedback hilft uns besser zu werden und anderen bei der Entscheidung. Danke für Ihre Zeit.',
      name: 'Name', role: 'Position (optional)', company: 'Unternehmen (optional)', rating: 'Ihre Bewertung', text: 'Ihr Feedback', textPh: 'Wie war Ihre Erfahrung mit Oxira?',
      email: 'E-Mail (wird nicht veröffentlicht)', consent: 'Ich bin einverstanden, dass Oxira mein Feedback und meinen Namen (sowie Position und Unternehmen, falls angegeben) auf der Website veröffentlicht.',
      submit: 'Feedback senden', sending: 'Wird gesendet…', done: 'Vielen Dank! Ihr Feedback ist angekommen.', failed: 'Bitte prüfen Sie das Formular und versuchen Sie es erneut.',
    },
    proof: { title: 'Das sagen unsere Kunden', sites: 'Websites mit Oxira Studio veröffentlicht' },
  },
  fr: {
    audit: {
      title: 'Audit de site gratuit : rapport SEO et vitesse | Oxira',
      description: 'Un outil gratuit qui analyse votre site en quelques secondes : visibilité Google, mobile, sécurité et données structurées, avec conseils par e-mail.',
      nav: 'Audit de site gratuit', h1: 'Analysez votre site gratuitement',
      lead: 'Saisissez l’adresse de votre site. En quelques secondes, nous vérifions l’essentiel pour Google et vos visiteurs, puis vous envoyons le rapport par e-mail.',
      url: 'Votre site', urlPh: 'example.com', name: 'Nom', email: 'E-mail', phone: 'Téléphone (facultatif)', submit: 'Analyser', running: 'Analyse en cours…',
      errUrl: 'Vérifiez l’adresse, par ex. example.com', errEmail: 'Vérifiez votre adresse e-mail.', errFailed: 'Analyse impossible pour le moment. Réessayez dans un instant.',
      scoreTitle: 'Votre score', sent: 'Nous vous avons envoyé une copie du rapport.', passed: 'Bon', toFix: 'À améliorer',
      scores: { performance: 'Vitesse mobile', seo: 'SEO', accessibility: 'Accessibilité', bestPractices: 'Bonnes pratiques' },
      checks: {
        reachable: 'Le site se charge sans erreur', https: 'Connexion sécurisée HTTPS', title: 'Longueur du titre', description: 'Méta-description',
        h1: 'Un seul titre H1', viewport: 'Adapté au mobile', lang: 'Langue de la page définie', canonical: 'Lien canonique',
        og: 'Titre et image au partage', schema: 'Données structurées pour Google', alt: 'Texte alternatif des images', robots: 'Fichier robots.txt', sitemap: 'sitemap.xml', size: 'Poids de page raisonnable',
      },
      tips: {
        reachable: 'Le site ne s’est pas chargé correctement. Vérifiez l’hébergement et le domaine.', https: 'Activez le SSL pour afficher le cadenas et gagner la confiance de Google.',
        title: 'Un titre de 10 à 65 caractères avec votre activité et votre ville.', description: 'Une description de 50 à 170 caractères qui donne envie de cliquer.',
        h1: 'Un titre principal clair par page.', viewport: 'Ajoutez une balise viewport pour un affichage correct sur mobile.',
        lang: 'Définissez la langue (lang) pour Google et les lecteurs d’écran.', canonical: 'Un lien canonique évite les pages en double sur Google.',
        og: 'Ajoutez un titre et une image pour le partage sur WhatsApp, X et LinkedIn.', schema: 'Les données structurées aident Google à mieux présenter votre activité.',
        alt: 'Ajoutez une description textuelle à chaque image.', robots: 'Un fichier robots.txt guide les moteurs de recherche.', sitemap: 'Créez un sitemap et soumettez-le dans Google Search Console.',
        size: 'Allégez la page pour qu’elle se charge plus vite.',
      },
      ctaTitle: 'On s’en occupe pour vous ?', ctaBody: 'Les sites Oxira intègrent toutes ces bases, ou nous pouvons améliorer votre site actuel.', ctaBtn: 'Réserver un conseil gratuit', again: 'Analyser un autre site',
      whatTitle: 'Ce que nous vérifions', what: ['Visibilité : titre, description, titres et sitemap', 'Compatibilité mobile et sécurité (HTTPS)', 'Partage sur les réseaux et données structurées', 'Vitesse et accessibilité lorsque disponibles'],
      privacy: 'Nous utilisons vos informations uniquement pour envoyer le rapport et en assurer le suivi.',
    },
    feedback: {
      title: 'Votre avis sur Oxira', h1: 'Partagez votre avis', lead: 'Votre avis nous aide à progresser et aide les autres à choisir en confiance. Merci pour votre temps.',
      name: 'Nom', role: 'Fonction (facultatif)', company: 'Entreprise (facultatif)', rating: 'Votre note', text: 'Votre avis', textPh: 'Comment s’est passée votre expérience avec Oxira ?',
      email: 'E-mail (non publié)', consent: 'J’accepte qu’Oxira publie mon avis et mon nom (ainsi que ma fonction et mon entreprise si indiquées) sur son site.',
      submit: 'Envoyer mon avis', sending: 'Envoi…', done: 'Merci ! Nous avons bien reçu votre avis.', failed: 'Vérifiez le formulaire et réessayez.',
    },
    proof: { title: 'Ce que disent nos clients', sites: 'sites publiés avec Oxira Studio' },
  },
  ru: {
    audit: {
      title: 'Бесплатная проверка сайта: SEO и скорость | Oxira',
      description: 'Бесплатный инструмент проверит ваш сайт за секунды: видимость в Google, мобильная версия, безопасность и разметка — советы придут на почту.',
      nav: 'Бесплатная проверка сайта', h1: 'Проверьте свой сайт бесплатно',
      lead: 'Введите адрес сайта. За несколько секунд мы проверим главное для Google и посетителей и отправим отчёт вам на почту.',
      url: 'Ваш сайт', urlPh: 'example.com', name: 'Имя', email: 'Эл. почта', phone: 'Телефон (необязательно)', submit: 'Проверить', running: 'Проверяем сайт…',
      errUrl: 'Проверьте адрес, например example.com', errEmail: 'Проверьте адрес почты.', errFailed: 'Сейчас не удалось выполнить проверку. Попробуйте чуть позже.',
      scoreTitle: 'Ваш результат', sent: 'Мы отправили копию отчёта на вашу почту.', passed: 'Хорошо', toFix: 'Нужно улучшить',
      scores: { performance: 'Скорость на телефоне', seo: 'SEO', accessibility: 'Доступность', bestPractices: 'Лучшие практики' },
      checks: {
        reachable: 'Сайт открывается без ошибок', https: 'Защищённое соединение HTTPS', title: 'Длина заголовка страницы', description: 'Мета-описание',
        h1: 'Один заголовок H1', viewport: 'Адаптация под телефоны', lang: 'Указан язык страницы', canonical: 'Канонический адрес',
        og: 'Заголовок и картинка при репосте', schema: 'Структурированные данные', alt: 'Альтернативный текст картинок', robots: 'Файл robots.txt', sitemap: 'sitemap.xml', size: 'Разумный вес страницы',
      },
      tips: {
        reachable: 'Сайт открылся с ошибкой. Проверьте хостинг и домен.', https: 'Включите SSL, чтобы браузер показывал замок, а Google доверял сайту.',
        title: 'Заголовок 10–65 символов с видом деятельности и городом.', description: 'Описание 50–170 символов, которое хочется открыть.',
        h1: 'Один понятный главный заголовок на страницу.', viewport: 'Добавьте тег viewport для правильного вида на телефонах.',
        lang: 'Укажите язык страницы (lang) для Google и экранных дикторов.', canonical: 'Канонический адрес убирает дубли страниц в Google.',
        og: 'Добавьте заголовок и картинку для репостов в WhatsApp, X и LinkedIn.', schema: 'Структурированные данные помогают Google подробнее показать ваш бизнес.',
        alt: 'Добавьте текстовое описание к каждой картинке.', robots: 'Файл robots.txt подсказывает поисковикам, что индексировать.', sitemap: 'Создайте карту сайта и добавьте её в Google Search Console.',
        size: 'Уменьшите вес страницы, чтобы она открывалась быстрее.',
      },
      ctaTitle: 'Исправим это за вас?', ctaBody: 'Сайты Oxira уже включают всё это, или мы поможем улучшить ваш текущий сайт.', ctaBtn: 'Записаться на бесплатную консультацию', again: 'Проверить другой сайт',
      whatTitle: 'Что мы проверяем', what: ['Видимость в поиске: заголовок, описание, заголовки и карта сайта', 'Мобильная версия и безопасность (HTTPS)', 'Репосты в соцсетях и структурированные данные', 'Скорость и доступность, когда доступны'],
      privacy: 'Мы используем ваши данные только для отправки отчёта и связи по нему.',
    },
    feedback: {
      title: 'Ваш отзыв об Oxira', h1: 'Поделитесь отзывом', lead: 'Ваш отзыв помогает нам расти, а другим — выбрать с уверенностью. Спасибо за ваше время.',
      name: 'Имя', role: 'Должность (необязательно)', company: 'Компания (необязательно)', rating: 'Ваша оценка', text: 'Ваш отзыв', textPh: 'Как вам работа с Oxira?',
      email: 'Эл. почта (не публикуется)', consent: 'Я согласен(на), что Oxira опубликует мой отзыв и имя (а также должность и компанию, если указаны) на своём сайте.',
      submit: 'Отправить отзыв', sending: 'Отправляем…', done: 'Спасибо! Ваш отзыв получен.', failed: 'Проверьте форму и попробуйте снова.',
    },
    proof: { title: 'Что говорят наши клиенты', sites: 'сайтов опубликовано через Oxira Studio' },
  },
};
