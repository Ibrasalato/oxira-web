# موقع أوكسيرا | Oxira website

موقع أوكسيرا بالعربية (الافتراضي) والإنجليزية، مبني بـ [Astro](https://astro.build) ويُنشر تلقائياً على GitHub Pages مع كل push على `main`.

## تعديل المحتوى

كل نصوص الموقع باللغتين في ملف واحد: `src/i18n/content.ts`.

| ماذا | أين |
|---|---|
| النصوص والخدمات والمشاريع والعملاء | `src/i18n/content.ts` |
| تصميم الصفحة وأقسامها | `src/components/Home.astro` |
| الألوان والخطوط والإعدادات العامة | `src/layouts/Base.astro` |
| الشعار (SVG) والأيقونات | `src/components/Logo.astro` · `src/components/Icon.astro` |
| لوجوهات العملاء وصور المشاريع | `public/clients/` · `public/work/` |
| أيقونة المتصفح | `public/favicon.svg` |

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

رسائل النموذج (طلبات المشاريع وطلبات الدعم الفني) تصل إلى **info@oxira.sa** عبر خدمة [FormSubmit](https://formsubmit.co) المجانية.

- **التفعيل لمرة واحدة:** أول رسالة تُرسل من الموقع تجعل FormSubmit يرسل إيميل تفعيل إلى info@oxira.sa. افتحه واضغط **Activate Form**، ومن بعدها تصل كل الرسائل مباشرة.
- عنوان الإيميل يوضح نوع الطلب ("طلب جديد" أو "طلب دعم فني")، وزر الرد يرد على بريد العميل مباشرة.
- لتغيير وجهة الرسائل (مثل Webhook في n8n): أضف متغيراً باسم `FORM_ENDPOINT` في **Settings → Secrets and variables → Actions → Variables**.
- إن تعذر الإرسال، يفتح النموذج تطبيق البريد لدى الزائر برسالة جاهزة إلى info@oxira.sa.
