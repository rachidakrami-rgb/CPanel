# G-BEAUTY — CPanel SaaS

منصة SaaS متعددة المستأجرين لإدارة **صالون حلاقة نسائي، معهد تجميل، مركز عناية، محل كراء تجهيزات عروس** — نفس الرابط لكل التجار مع توجيه تلقائي ولوحة معزولة.

## الفكرة
- **دخول موحد** `nexovya.com/login` → بعد تسجيل الدخول يتم توجيه كل تاجر إلى لوحته الخاصة.
- **عزل تام** على مستوى قاعدة البيانات `tenant_id` — مستحيل يرى تاجر بيانات تاجر آخر.
- **زبون بدون حساب**: يرى قائمة الصالونات → يختار صالون → بوابة حجز (خدمة/موظفة/تاريخ/وقت) → يُمنح **رقم عضوية دائم `M-xxxxx`** + **تذكرة حجز `BS-xxxxx`** بحرفين يحددهما صاحب الصالون من الإعدادات.
- **الدفع حضوري فقط** في المحل.
- **الشريط العلوي**: زجاجي ملكي طافي مع تدرج وردي خفيف جداً من الحواف `glass-royal` — أزرار رسائل / إعدادات / خروج.

## المميزات (1-12)
1. صفحة هبوط
2. لوحة تحكم مع سايدبار + شريط علوي زجاجي
3. مواعيد اليوم مباشر
4. إحصائيات (حجوزات، دخل، حضور)
5. حجز ذكي بدون تضارب (منع الحجز المزدوج بـ unique constraint)
6. خدمات
7. فريق
8. فوترة
9. تذكيرات واتساب + **تيليجرام بتوكن خاص لكل تاجر**
10. قائمة صالونات + رابط حجز خاص
11. إعدادات الصالون
12. عضوية دائمة + تذاكر بحرفين

## الستاك (الأفضل تقنياً)
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind — على **Cloudflare Pages**
- **API**: Hono.js على **Cloudflare Workers**
- **DB**: PostgreSQL (Neon/Supabase) + Prisma + Row Level Isolation
- **Mobile**: Expo React Native — نفس الـ API
- **CI/CD**: GitHub Actions

> لماذا TypeScript وليس Laravel؟ لغة واحدة للويب والهاتف والـ API + يعمل natively على Cloudflare Workers (PHP لا يعمل) + مشاركة 80% من المنطق.

## التشغيل محلياً
```bash
npm install
npm run dev # http://localhost:3000  (يستمع على 0.0.0.0 للـ preview)
```

حسابات تجريبية (نفس الواجهة، بيانات معزولة):
- `noura@demo.com / 123456` → صالون نورة (BS)
- `lina@demo.com / 123456` → معهد لينا (LB)
- `admin@demo.com / admin` → أناقة العروس (AR)

## إعداد تيليجرام
كل تاجر يضع **Bot Token** من @BotFather في الإعدادات → يُحفظ `localStorage telegram_token_<tenantId>` → يُستخدم لإرسال:
```
POST https://api.telegram.org/bot<TOKEN>/sendMessage
{ chat_id, text: "تذكير: موعدك غداً الساعة 10:00 في صالون نورة — تذكرتك BS-24001" }
```
يوجد زر **اختبار الإرسال** في الإعدادات.

## هيكل قاعدة البيانات
انظر `prisma/schema.prisma` — الأهم:
- `Tenant.prefix` حرفين
- `Booking @@unique([tenantId, date, time, staffId])` لمنع التضارب
- `Customer.membershipId @unique` دائم

## النشر
- **GitHub**: push إلى `main` → Action يبني Next.js
- **Cloudflare**: `wrangler pages publish` + `workers` — DNS عبر Cloudflare

## ملاحظات التصميم
- كل التصميم زجاجي ملكي فاخر مع grading وردي خفيف من حواف الشريط العلوي الطافي — بدون ألوان صاخبة.
- الهيكل وظيفي خام لكن مع لمسة ملكية خفيفة.
