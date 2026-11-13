// Classti sections that mirror the product's own landing page (classti.com),
// plus the access links (site, demo, trial, school login, app stores).
// Keep claims in line with classti.com: no customer counts or results figures.
import type { Lang } from './content';

const site = 'https://classti.com';
export const classtiLinks = {
  site: (lang: Lang) => (lang === 'ar' ? `${site}/` : `${site}/${lang}`),
  demo: `${site}/demo`,
  trial: `${site}/?trial=1&type=school`,
  login: 'https://school.classti.com/login',
  pricing: `${site}/pricing`,
  register: `${site}/register`,
  apps: {
    student: { play: 'https://play.google.com/store/apps/details?id=com.classti.student', apple: 'https://apps.apple.com/app/id6783915697' },
    teacher: { play: 'https://play.google.com/store/apps/details?id=com.classti.teacher', apple: 'https://apps.apple.com/app/id6781750858' },
    nursery: { play: 'https://play.google.com/store/apps/details?id=com.classti.nursery' },
  },
};

type Card = { name: string; text: string };
type Dict = {
  access: { visit: string; demo: string; trial: string; login: string; pricing: string };
  badges: string[];
  download: string;
  featuresTitle: string;
  featuresLead: string;
  features: Card[];
  nursery: { title: string; en: string; lead: string; features: string[] };
  solutionsTitle: string;
  solutions: Card[];
  integrationsTitle: string;
  integrations: string[];
  securityTitle: string;
  security: string[];
  ctaTitle: string;
  ctaBody: string;
  contact: string;
  homeVisit: string;
};

export const classtiText: Record<Lang, Dict> = {
  ar: {
    access: { visit: 'زيارة الموقع', demo: 'احجز عرضاً مجانياً', trial: 'جرّب Classti الآن', login: 'دخول المدارس', pricing: 'الأسعار' },
    badges: ['الفوترة الإلكترونية ZATCA', 'نفاذ', 'حماية البيانات PDPL'],
    download: 'حمّل التطبيق',
    featuresTitle: 'مزايا تصنع الفرق في يوم المدرسة',
    featuresLead: 'أدوات عملية تخدم الإدارة والمعلم وولي الأمر كل يوم.',
    features: [
      { name: 'رادار الطالب', text: 'اكتشاف مبكر للطلاب المتعثرين من الحضور والدرجات والسلوك.' },
      { name: 'جدول تلقائي وانتظار ذكي', text: 'توليد الجدول تلقائياً وتوزيع حصص الانتظار اليومية بعدل.' },
      { name: 'مدير الانصراف', text: 'تسليم الطالب للمفوَّض فقط، موثّق عند البوابة.' },
      { name: 'محفظة المقصف', text: 'حدود صرف يضعها ولي الأمر وحجب تلقائي لمسببات الحساسية.' },
      { name: 'حصص مباشرة بسبورة تفاعلية', text: 'حضور تلقائي وتسجيل للحصة.' },
      { name: 'التحصيل وخطط التقسيط', text: 'تذكيرات تلقائية واقتراح خطط تقسيط للأسر.' },
      { name: 'القبول والتسجيل', text: 'صفحة قبول وزيارات مجدولة وعروض معتمدة إلكترونياً.' },
      { name: 'الدورات التدريبية', text: 'متابعة التقدم وإصدار الشهادات.' },
      { name: 'الشهادات والتوقيع الإلكتروني', text: 'شهادات برمز تحقق وتوقيع إلكتروني.' },
      { name: 'العيادة المدرسية', text: 'ملف صحي وتنبيهات الحساسية.' },
      { name: 'نقاط السلوك الإيجابي', text: 'نقاط يراها ولي الأمر في التطبيق.' },
      { name: 'ملف الاعتماد المدرسي', text: 'شواهد تُبنى من العمل اليومي وجاهزية لكل مجال.' },
    ],
    nursery: {
      title: 'تطبيق الحضانة',
      en: 'Classti Nursery',
      lead: 'يوم الطفل لحظة بلحظة بين المربيات وأولياء الأمور.',
      features: ['الوجبات والنوم والأنشطة', 'صور ورسائل من المربية', 'الاستلام والتسليم'],
    },
    solutionsTitle: 'لكل نوع من المؤسسات التعليمية',
    solutions: [
      { name: 'من أول رضعة حتى يوم التخرج', text: 'Classti للحضانات: من عمر 0 إلى 4 سنوات حتى المدرسة والأكاديمية، بملف واحد لولي الأمر وتطبيق واحد وملف صحي واحد لكل المراحل.' },
      { name: 'كل الفروع في شاشة واحدة', text: 'لوحة المالك لمجموعات المدارس: أداء كل فرع والمالية والكادر والتنبيهات، مع مقارنة الفروع وتحكم مركزي في الاشتراكات والصلاحيات.' },
      { name: 'منصتك باسم مدرستك', text: 'منصة وتطبيقات باسم المدرسة وشعارها ونطاقها الخاص، ميزات مخصصة، تكامل مع الأنظمة المحاسبية والحكومية وأجهزة الحضور، ونقل بياناتك من Excel أو نظامك الحالي.' },
    ],
    integrationsTitle: 'التكاملات',
    integrations: ['الفوترة الإلكترونية ZATCA', 'نفاذ', 'بوابات الدفع والمحافظ الرقمية', 'واتساب للأعمال', 'Google Classroom', 'Microsoft Teams (OneRoster)', 'الاستيراد من Excel', 'عدة عملات ولغات'],
    securityTitle: 'الأمان والخصوصية',
    security: ['صلاحيات دقيقة لكل دور', 'عزل بيانات كل مدرسة', 'التحقق بخطوتين', 'سجل تدقيق', 'تشفير HTTPS/TLS', 'مركز خصوصية متوافق مع PDPL'],
    ctaTitle: 'جاهز تنقل مدرستك إلى المستقبل؟',
    ctaBody: 'احجز عرضاً مجانياً أو جرّب المنصة الآن على موقع Classti، أو تواصل مع فريق أوكسيرا.',
    contact: 'تواصل مع أوكسيرا',
    homeVisit: 'زيارة classti.com',
  },
  en: {
    access: { visit: 'Visit', demo: 'Book a free demo', trial: 'Try Classti now', login: 'School login', pricing: 'Pricing' },
    badges: ['ZATCA e-invoicing', 'Nafath', 'PDPL data protection'],
    download: 'Get the app',
    featuresTitle: 'Features that make the school day easier',
    featuresLead: 'Practical tools that serve leaders, teachers and parents every day.',
    features: [
      { name: 'Student radar', text: 'Early detection of struggling students from attendance, grades and behaviour.' },
      { name: 'Auto timetable & smart cover', text: 'Automatic timetables and fair daily substitute distribution.' },
      { name: 'Dismissal manager', text: 'Students handed only to authorised pickups, recorded at the gate.' },
      { name: 'Canteen wallet', text: 'Spending limits set by parents and automatic blocking of allergens.' },
      { name: 'Live classes with whiteboard', text: 'Automatic attendance and class recording.' },
      { name: 'Smart collections & installments', text: 'Automatic reminders and suggested installment plans for families.' },
      { name: 'Admissions & enrollment', text: 'Admissions page, scheduled visits and e-approved offers.' },
      { name: 'Training courses', text: 'Progress tracking and certificates.' },
      { name: 'Certificates & e-signature', text: 'Certificates with verification codes and e-signatures.' },
      { name: 'School clinic', text: 'Health records and allergy alerts.' },
      { name: 'Positive behaviour points', text: 'Points parents can see in the app.' },
      { name: 'Accreditation portfolio', text: 'Evidence built from daily work, with readiness per domain.' },
    ],
    nursery: {
      title: 'Nursery app',
      en: 'Classti Nursery',
      lead: "The child's day, moment by moment, between caregivers and parents.",
      features: ['Meals, sleep and activities', 'Photos and messages from caregivers', 'Check-in and handover'],
    },
    solutionsTitle: 'For every kind of school',
    solutions: [
      { name: 'From the first feed to graduation day', text: 'Classti for nurseries: ages 0–4 through school and academy, with one parent profile, one app and one health file across every stage.' },
      { name: 'Every branch on one screen', text: 'The owner dashboard for school groups: performance, finance, staff and alerts per branch, with branch comparison and central control of subscriptions and permissions.' },
      { name: 'Your platform, your school name', text: "Platform and apps under the school's name, logo and domain, custom features, integrations with accounting, government systems and attendance devices, and data import from Excel or your current system." },
    ],
    integrationsTitle: 'Integrations',
    integrations: ['ZATCA e-invoicing', 'Nafath', 'Payment gateways & digital wallets', 'WhatsApp Business', 'Google Classroom', 'Microsoft Teams (OneRoster)', 'Excel import', 'Multiple currencies & languages'],
    securityTitle: 'Security & privacy',
    security: ['Granular role permissions', 'Per-school data isolation', 'Two-step verification', 'Audit log', 'HTTPS/TLS encryption', 'PDPL-aligned privacy centre'],
    ctaTitle: 'Ready to move your school into the future?',
    ctaBody: 'Book a free demo or try the platform now on the Classti website, or talk to the Oxira team.',
    contact: 'Contact Oxira',
    homeVisit: 'Visit classti.com',
  },
  de: {
    access: { visit: 'Website:', demo: 'Kostenlose Demo buchen', trial: 'Classti jetzt testen', login: 'Schul-Login', pricing: 'Preise' },
    badges: ['ZATCA E-Rechnung', 'Nafath', 'PDPL-Datenschutz'],
    download: 'App laden',
    featuresTitle: 'Funktionen, die den Schultag erleichtern',
    featuresLead: 'Praktische Werkzeuge für Schulleitung, Lehrkräfte und Eltern – jeden Tag.',
    features: [
      { name: 'Schüler-Radar', text: 'Früherkennung gefährdeter Schüler aus Anwesenheit, Noten und Verhalten.' },
      { name: 'Auto-Stundenplan & Vertretung', text: 'Automatische Stundenpläne und faire tägliche Vertretungen.' },
      { name: 'Abholmanager', text: 'Übergabe nur an berechtigte Personen, am Tor dokumentiert.' },
      { name: 'Kantinen-Wallet', text: 'Ausgabelimits der Eltern und automatische Allergen-Sperre.' },
      { name: 'Live-Unterricht mit Whiteboard', text: 'Automatische Anwesenheit und Aufzeichnung.' },
      { name: 'Inkasso & Ratenpläne', text: 'Automatische Erinnerungen und vorgeschlagene Ratenpläne.' },
      { name: 'Aufnahme & Einschreibung', text: 'Aufnahmeseite, geplante Besuche und elektronisch genehmigte Angebote.' },
      { name: 'Schulungen', text: 'Fortschrittsverfolgung und Zertifikate.' },
      { name: 'Zeugnisse & E-Signatur', text: 'Dokumente mit Prüfcode und elektronischer Signatur.' },
      { name: 'Schulklinik', text: 'Gesundheitsakte und Allergiewarnungen.' },
      { name: 'Positive Verhaltenspunkte', text: 'Punkte, die Eltern in der App sehen.' },
      { name: 'Akkreditierungsmappe', text: 'Nachweise aus der täglichen Arbeit, Bereitschaft je Bereich.' },
    ],
    nursery: {
      title: 'Kita-App',
      en: 'Classti Nursery',
      lead: 'Der Tag des Kindes, Moment für Moment, zwischen Betreuern und Eltern.',
      features: ['Mahlzeiten, Schlaf und Aktivitäten', 'Fotos und Nachrichten der Betreuer', 'Ankunft und Übergabe'],
    },
    solutionsTitle: 'Für jede Bildungseinrichtung',
    solutions: [
      { name: 'Von der ersten Mahlzeit bis zum Abschluss', text: 'Classti für Kitas: 0–4 Jahre bis Schule und Akademie, mit einem Elternprofil, einer App und einer Gesundheitsakte für alle Stufen.' },
      { name: 'Alle Standorte auf einem Bildschirm', text: 'Das Eigentümer-Dashboard für Schulgruppen: Leistung, Finanzen, Personal und Warnungen je Standort, mit Vergleich und zentraler Steuerung.' },
      { name: 'Ihre Plattform, Ihr Schulname', text: 'Plattform und Apps mit Name, Logo und Domain der Schule, individuelle Funktionen, Integrationen und Datenimport aus Excel oder Ihrem bisherigen System.' },
    ],
    integrationsTitle: 'Integrationen',
    integrations: ['ZATCA E-Rechnung', 'Nafath', 'Zahlungsgateways & Wallets', 'WhatsApp Business', 'Google Classroom', 'Microsoft Teams (OneRoster)', 'Excel-Import', 'Mehrere Währungen & Sprachen'],
    securityTitle: 'Sicherheit & Datenschutz',
    security: ['Feingranulare Rollenrechte', 'Datentrennung je Schule', 'Zwei-Faktor-Anmeldung', 'Audit-Log', 'HTTPS/TLS-Verschlüsselung', 'PDPL-konformes Datenschutzcenter'],
    ctaTitle: 'Bereit, Ihre Schule in die Zukunft zu bringen?',
    ctaBody: 'Buchen Sie eine kostenlose Demo oder testen Sie die Plattform auf der Classti-Website – oder sprechen Sie mit dem Oxira-Team.',
    contact: 'Oxira kontaktieren',
    homeVisit: 'classti.com besuchen',
  },
  fr: {
    access: { visit: 'Visiter', demo: 'Réserver une démo gratuite', trial: 'Essayer Classti', login: 'Connexion école', pricing: 'Tarifs' },
    badges: ['Facturation électronique ZATCA', 'Nafath', 'Protection des données PDPL'],
    download: "Télécharger l'app",
    featuresTitle: 'Des fonctions qui simplifient la journée scolaire',
    featuresLead: 'Des outils concrets pour la direction, les enseignants et les parents, chaque jour.',
    features: [
      { name: 'Radar élève', text: 'Détection précoce des élèves en difficulté (présence, notes, comportement).' },
      { name: 'Emploi du temps auto & remplacements', text: 'Emplois du temps automatiques et remplacements quotidiens équitables.' },
      { name: 'Gestion des sorties', text: 'Remise aux seules personnes autorisées, enregistrée au portail.' },
      { name: 'Portefeuille cantine', text: 'Plafonds fixés par les parents et blocage automatique des allergènes.' },
      { name: 'Cours en direct avec tableau', text: 'Présence automatique et enregistrement.' },
      { name: 'Recouvrement & échéanciers', text: "Relances automatiques et plans d'échéances suggérés." },
      { name: 'Admissions & inscriptions', text: "Page d'admission, visites planifiées et offres approuvées en ligne." },
      { name: 'Formations', text: 'Suivi de progression et certificats.' },
      { name: 'Certificats & signature électronique', text: 'Documents avec code de vérification et signature électronique.' },
      { name: 'Infirmerie scolaire', text: 'Dossier de santé et alertes allergies.' },
      { name: 'Points de comportement positif', text: "Des points visibles par les parents dans l'app." },
      { name: "Dossier d'accréditation", text: 'Preuves issues du travail quotidien, état de préparation par domaine.' },
    ],
    nursery: {
      title: 'App crèche',
      en: 'Classti Nursery',
      lead: "La journée de l'enfant, moment par moment, entre éducateurs et parents.",
      features: ['Repas, sieste et activités', 'Photos et messages des éducateurs', 'Arrivée et remise'],
    },
    solutionsTitle: 'Pour chaque établissement',
    solutions: [
      { name: 'Du premier biberon au jour du diplôme', text: "Classti pour les crèches : de 0 à 4 ans jusqu'à l'école et l'académie, avec un seul profil parent, une seule app et un seul dossier de santé." },
      { name: 'Tous les campus sur un écran', text: 'Le tableau de bord propriétaire des groupes scolaires : performance, finances, personnel et alertes par campus, avec comparaison et contrôle centralisé.' },
      { name: 'Votre plateforme, au nom de votre école', text: "Plateforme et apps au nom, logo et domaine de l'école, fonctions sur mesure, intégrations et import des données depuis Excel ou votre système actuel." },
    ],
    integrationsTitle: 'Intégrations',
    integrations: ['Facturation ZATCA', 'Nafath', 'Passerelles de paiement & portefeuilles', 'WhatsApp Business', 'Google Classroom', 'Microsoft Teams (OneRoster)', 'Import Excel', 'Plusieurs devises & langues'],
    securityTitle: 'Sécurité & confidentialité',
    security: ['Permissions fines par rôle', 'Isolation des données par école', 'Vérification en deux étapes', "Journal d'audit", 'Chiffrement HTTPS/TLS', 'Centre de confidentialité conforme PDPL'],
    ctaTitle: "Prêt à faire entrer votre école dans l'avenir ?",
    ctaBody: "Réservez une démo gratuite ou essayez la plateforme sur le site Classti, ou parlez à l'équipe Oxira.",
    contact: 'Contacter Oxira',
    homeVisit: 'Visiter classti.com',
  },
  ru: {
    access: { visit: 'Сайт:', demo: 'Бесплатная демонстрация', trial: 'Попробовать Classti', login: 'Вход для школ', pricing: 'Цены' },
    badges: ['Электронные счета ZATCA', 'Nafath', 'Защита данных PDPL'],
    download: 'Скачать приложение',
    featuresTitle: 'Функции, которые упрощают школьный день',
    featuresLead: 'Практичные инструменты для руководства, учителей и родителей каждый день.',
    features: [
      { name: 'Радар ученика', text: 'Раннее выявление отстающих по посещаемости, оценкам и поведению.' },
      { name: 'Авторасписание и замены', text: 'Автоматическое расписание и справедливое распределение замен.' },
      { name: 'Контроль выдачи детей', text: 'Передача только доверенным лицам с отметкой на входе.' },
      { name: 'Кошелёк столовой', text: 'Лимиты от родителей и автоматическая блокировка аллергенов.' },
      { name: 'Онлайн-уроки с доской', text: 'Автоматическая посещаемость и запись урока.' },
      { name: 'Сбор оплат и рассрочка', text: 'Автонапоминания и предлагаемые планы рассрочки.' },
      { name: 'Приём и зачисление', text: 'Страница приёма, запись на визиты и электронно одобренные предложения.' },
      { name: 'Учебные курсы', text: 'Отслеживание прогресса и сертификаты.' },
      { name: 'Сертификаты и э-подпись', text: 'Документы с кодом проверки и электронной подписью.' },
      { name: 'Школьный медпункт', text: 'Медкарта и оповещения об аллергиях.' },
      { name: 'Баллы за поведение', text: 'Баллы, которые родители видят в приложении.' },
      { name: 'Портфолио аккредитации', text: 'Доказательства из ежедневной работы и готовность по областям.' },
    ],
    nursery: {
      title: 'Приложение для детсада',
      en: 'Classti Nursery',
      lead: 'День ребёнка шаг за шагом — для воспитателей и родителей.',
      features: ['Питание, сон и занятия', 'Фото и сообщения от воспитателей', 'Приход и передача ребёнка'],
    },
    solutionsTitle: 'Для любых учебных заведений',
    solutions: [
      { name: 'От первого кормления до выпускного', text: 'Classti для детсадов: от 0 до 4 лет и дальше в школу и академию — один профиль родителя, одно приложение и одна медкарта.' },
      { name: 'Все филиалы на одном экране', text: 'Панель владельца для сетей школ: показатели, финансы, персонал и оповещения по филиалам, сравнение и централизованное управление.' },
      { name: 'Платформа под именем вашей школы', text: 'Платформа и приложения с названием, логотипом и доменом школы, доработки под вас, интеграции и перенос данных из Excel или текущей системы.' },
    ],
    integrationsTitle: 'Интеграции',
    integrations: ['Электронные счета ZATCA', 'Nafath', 'Платёжные шлюзы и кошельки', 'WhatsApp Business', 'Google Classroom', 'Microsoft Teams (OneRoster)', 'Импорт из Excel', 'Несколько валют и языков'],
    securityTitle: 'Безопасность и приватность',
    security: ['Детальные права по ролям', 'Изоляция данных каждой школы', 'Двухэтапная проверка', 'Журнал аудита', 'Шифрование HTTPS/TLS', 'Центр приватности по PDPL'],
    ctaTitle: 'Готовы перевести школу в будущее?',
    ctaBody: 'Запишитесь на бесплатную демонстрацию или попробуйте платформу на сайте Classti — или свяжитесь с командой Oxira.',
    contact: 'Связаться с Oxira',
    homeVisit: 'Открыть classti.com',
  },
};
