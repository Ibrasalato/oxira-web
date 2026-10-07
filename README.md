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

## نموذج التواصل

GitHub Pages لا يشغّل كود خادم، لذلك يرسل النموذج طلبه إلى رابط خارجي (مثل Webhook في n8n).

- أضف الرابط في **Settings → Secrets and variables → Actions → Variables** باسم `FORM_ENDPOINT`.
- يستقبل الرابط طلب `POST` بصيغة JSON يحتوي: `name`, `email`, `phone`, `layer`, `details`, `lang`, `page`.
- إن لم يُضبط الرابط، يفتح النموذج تطبيق البريد لدى الزائر برسالة جاهزة إلى info@oxira.sa.
