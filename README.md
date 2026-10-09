# موقع أوكسيرا | Oxira website

موقع أوكسيرا بخمس لغات: العربية (الافتراضي) والإنجليزية والألمانية والفرنسية والروسية، مبني بـ [Astro](https://astro.build) ويُنشر تلقائياً على GitHub Pages مع كل push على `main`.

## تعديل المحتوى

نصوص العربي والإنجليزي في `src/i18n/content.ts`، والألماني والفرنسي والروسي في `src/i18n/de.json` و`fr.json` و`ru.json` (نفس هيكل الإنجليزي بالضبط).

قائمة اللغات (الاسم + العلم) في `languages` داخل `content.ts`، والأعلام في `public/flags/`. الروابط: `/` عربي، `/en/` `/de/` `/fr/` `/ru/`.

| ماذا | أين |
|---|---|
| النصوص والخدمات والمشاريع والعملاء | `src/i18n/content.ts` |
| الصفحات (الرئيسية، الخدمات، وكلاء AI، Classti، الأعمال، من نحن، تواصل) | `src/views/*View.astro` |
| الهيدر والفوتر والفورم والمحادثة | `src/components/` |
| صور المشاركة على واتساب ولينكدإن | `public/og-*.png` (لكل لغة) |
| الألوان والخطوط والإعدادات العامة | `src/layouts/Base.astro` |
| الشعار (SVG) والأيقونات | `src/components/Logo.astro` · `src/components/Icon.astro` |
| لوجوهات العملاء وصور المشاريع | `public/clients/` · `public/work/` |
| أيقونة المتصفح | `public/favicon.svg` |
| لوجو Classti | `public/products/classti-logo-*.png` · `classti-icon.png` |
| سياسة الخصوصية وصفحة 404 | `src/i18n/content.ts` (قسم `legal`) · `src/views/PrivacyView.astro` · `src/pages/404.astro` |

## التشغيل محلياً

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # ينتج مجلد dist/
```

## النشر

1. في إعدادات الريبو: **Settings → Pages → Source: GitHub Actions**.
2. أي push على `main` يبني الموقع وينشره على `https://<الحساب>.github.io/oxira-site/`.

### ربط الدومين oxira.sa

1. أنشئ ملف `public/CNAME` يحتوي سطراً واحداً: `oxira.sa`
2. من لوحة الدومين، وجّه سجلات A للدومين إلى عناوين GitHub Pages:
   `185.199.108.153` · `185.199.109.153` · `185.199.110.153` · `185.199.111.153`
   وسجل CNAME لـ `www` إلى `<الحساب>.github.io`
3. في **Settings → Pages** فعّل **Enforce HTTPS** بعد أن يتعرّف GitHub على الدومين.

## نموذج التواصل والدعم الفني

رسائل النموذج (طلبات المشاريع وطلبات الدعم الفني) تُرسل إلى workflow في n8n اسمه **Oxira 2 — Website contact form**:

1. يحفظ كل رسالة في جدول **oxira_website_messages** في n8n.
2. يرد على الموقع بنجاح الإرسال.
3. يرسل الرسالة بالإيميل إلى **info@oxira.sa** (عقدة **Email info@oxira.sa**، تحتاج بيانات SMTP لبريد info@oxira.sa).

- رابط الاستقبال: `https://api.oxira.sa/oxira-website-contact`
- لتغييره: أضف متغيراً باسم `FORM_ENDPOINT` في **Settings → Secrets and variables → Actions → Variables**.
- إن تعذر الإرسال، يعرض النموذج زرين لإرسال الرسالة مباشرة عبر البريد أو واتساب.

## محادثة الموقع (AI Agent)

زر "مساعد أوكسيرا" أسفل الصفحة يفتح محادثة مع وكيل ذكاء اصطناعي في n8n اسمه **Oxira 4 — Website Chat Agent**:

- يعرف خدمات أوكسيرا وClassti والعملاء وبيانات التواصل (من تعليمات الوكيل)، وكتالوج وكلاء الذكاء الاصطناعي من جدولي **oxira_services** و **oxira_faq**.
- يتذكر المحادثة لكل زائر طوال الجلسة.
- يسجّل الطلبات وطلبات الدعم الفني في جدول **oxira_leads** (القناة: website).
- رابط الاستقبال: `https://api.oxira.sa/oxira-website-chat` (لتغييره: متغير `CHAT_ENDPOINT`).
- الكود: `src/components/Chat.astro`، والنصوص في `src/i18n/content.ts` (قسم `chat`).

## ابني موقعك (استوديو أوكسيرا)

- صفحة الخدمة: `/website-builder/`، والاستوديو: `/studio/` (بكل اللغات).
- القوالب الستة ومحرّك عرض المواقع: `src/builder/spec.ts` (بيانات الموقع والنصوص التجريبية) و`src/builder/render.ts` (يحوّلها لصفحة HTML).
- نصوص الاستوديو: `src/i18n/builder/*.json`، **والأسعار** في `src/i18n/builder.ts` (`builderPrices`).
- المصمم الذكي: workflow في n8n اسمه **Oxira 5 — Website Builder Studio** (`/webhook/oxira-site-builder`).
- الدفع: **Oxira 7 — Website Builder Payments (Moyasar)**: ينشئ فاتورة ميسر بالسعر من n8n، ويتأكد من الدفع، ثم ينشر الموقع.
- النشر: **Oxira 8 — Client Sites (Cloudflare)**: Worker اسمه `oxira-sites` يعرض كل مواقع العملاء من KV (`oxira-sites`). الكود في `src/builder/worker.ts`، وبعد أي تعديل عليه: `npm run build:worker` ثم push، ثم شغّل **Run setup** في الـ workflow ليرفع النسخة الجديدة.
- الطلبات: **Oxira 6 — Website Builder Orders** (`/webhook/oxira-site-order`) يحفظ في جدول **oxira_site_orders** ويرسل إيميل لـ info@oxira.sa.

## الخطوط

- العربي: **Cairo**، واللاتيني والروسي: **IBM Plex Sans**. المتصفح يختار الخط المناسب لكل حرف تلقائياً.
- كلمة Oxira في اللوجو مرسومة (مش خط)، ومنسوخة من اللوجو الرسمي كـ SVG في `src/components/Logo.astro`، ونسخة جاهزة في `public/brand/` (كحلي وأبيض).

## قياس الزوار (اختياري)

لتفعيل Google Analytics 4: أنشئ خاصية في Google Analytics، ثم أضف متغيراً باسم `GA_ID` (مثل `G-XXXXXXX`) في **Settings → Secrets and variables → Actions → Variables**، وأعد النشر. بدون هذا المتغير لا يُحمّل أي كود تتبع.
