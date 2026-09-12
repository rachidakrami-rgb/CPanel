"use client";
import Link from "next/link";
import { tenants } from "@/lib/mockData";

export default function SalonsPage() {
  return (
    <div className="min-h-screen bg-[#fdfbf8]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        <div className="glass-royal rounded-2xl px-6 py-4 flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-9 h-9 rounded-xl bg-white border grid place-items-center">←</Link>
            <div>
              <div className="font-black">قائمة الصالونات — للزبون بدون تسجيل</div>
              <div className="text-xs text-slate-500">اختر صالوناً → بوابة الحجز → عضوية دائمة + تذكرة بحرفين</div>
            </div>
          </div>
          <Link href="/login" className="hidden md:inline-flex px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-bold">دخول التاجر</Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenants.map((t) => (
            <div key={t.id} className="bg-white rounded-3xl border border-slate-200 p-6 card-hover flex flex-col">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} grid place-items-center text-white font-black text-lg`}>{t.logo}</div>
              <div className="font-black text-lg mt-4">{t.name}</div>
              <div className="text-xs text-slate-500 mt-1">{t.type} • {t.address} • {t.phone}</div>
              <div className="mt-3 inline-flex items-center gap-2 text-xs bg-rose-50 text-rose-700 px-3 py-1.5 rounded-full border border-rose-100 w-fit">
                بادئة التذاكر: <b>{t.prefix}</b> — مثال {t.prefix}-24001
              </div>
              <div className="mt-4 flex gap-2">
                <Link href={`/booking/${t.id}`} className="flex-1 text-center py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800">احجزي الآن</Link>
                <Link href={`/booking/${t.id}`} className="px-4 py-3 rounded-xl border border-slate-200 font-bold text-sm bg-[#fdfbf8]">عرض الخدمات</Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
          <div className="font-black mb-2">كيف يعمل حجز الزبون؟</div>
          <ol className="list-decimal mr-6 text-sm text-slate-600 space-y-1">
            <li>تختار الصالون من القائمة</li>
            <li>تختار الخدمة والموظفة والتاريخ/الوقت (بدون تضارب)</li>
            <li>تدخل اسمك ورقمك — يُمنح لك رقم عضوية دائم <b>M-xxxxx</b> تستخدمه لاحقاً</li>
            <li>تحصل على تذكرة حجز <b>{tenants[0].prefix}-xxxxx</b> بحرفين يحددهما صاحب الصالون من الإعدادات — الدفع حضوري في المحل</li>
            <li>تُرسل لك تذكيرات واتساب + تيليجرام تلقائياً</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
