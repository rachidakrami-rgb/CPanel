"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfbf8]">
      {/* NAV - glass royal floating */}
      <nav className={`fixed top-0 inset-x-0 z-40 transition-all ${scrolled ? "py-3" : "py-4"}`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="glass-royal rounded-2xl px-4 lg:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-pink-600 grid place-items-center text-white font-black">N</div>
              <div>
                <div className="font-black tracking-tight leading-none">Nexovya Beauté</div>
                <div className="text-[10px] tracking-[0.2em] text-slate-500 -mt-0.5">SALON MANAGEMENT</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#features" className="hover:text-rose-600 transition">المميزات</a>
              <a href="#how" className="hover:text-rose-600 transition">كيف يعمل</a>
              <a href="#salons" className="hover:text-rose-600 transition">الصالونات</a>
              <Link href="/salons" className="px-5 py-2 rounded-full bg-white border border-slate-200 font-bold hover:bg-slate-50">حجز كزبون</Link>
              <Link href="/login" className="px-5 py-2.5 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800">دخول المنصة</Link>
            </div>
            <Link href="/login" className="md:hidden px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-bold">دخول</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-br from-slate-900 via-[#1a2340] to-[#0f3460] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-pink-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-blue-400 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" /> منصة SaaS متعددة المستأجرين — قاعدة بيانات معزولة لكل تاجر
            </div>
            <h1 className="text-4xl lg:text-6xl font-black leading-tight mb-6">
              تسيير صالونك<br />
              <span className="bg-gradient-to-r from-rose-200 to-pink-300 bg-clip-text text-transparent">أصبح أسهل</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              هل تملك صالون حلاقة نسائي، معهد تجميل، مركز عناية أو محل كراء تجهيزات عروس؟ منصة واحدة تدير كل شيء — حجوزات، مصروفات، دخل مالي، تذكيرات واتساب وتيليجرام.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/login" className="px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-600 text-white rounded-full font-black text-lg shadow-xl shadow-pink-500/20 hover:scale-[1.02] transition">ابدأ مجاناً — دخول موحد</Link>
              <Link href="/salons" className="px-8 py-4 border border-white/20 rounded-full font-bold text-lg hover:bg-white/10 transition">أنا زبونة — احجزي الآن</Link>
            </div>
            <div className="mt-10 p-4 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
              <div className="text-xs text-rose-200 font-bold mb-2">🔒 عزل تام: نفس الرابط <span className="font-mono bg-white/10 px-2 py-0.5 rounded">nexovya.com</span> → توجيه تلقائي للوحة كل تاجر بدون تداخل</div>
              <div className="text-xs text-slate-400">تاجر: دخول واحد → لوحته الخاصة • زبون: قائمة صالونات → بوابة حجز → رقم عضوية دائم + تذكرة بحرفين يحددها التاجر (مثل BS12346)</div>
            </div>
          </div>

          {/* Preview */}
          <div className="hidden lg:block">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="text-white font-bold">حجوزات اليوم — معزولة لكل صالون</div>
                <span className="text-xs bg-emerald-400/10 text-emerald-300 px-3 py-1 rounded-full border border-emerald-400/20">مباشر</span>
              </div>
              <div className="space-y-3">
                {[
                  { n: "سارة", s: "قص وتصفيف", t: "10:00", c: "مؤكد" },
                  { n: "نورة", s: "صبغة", t: "11:30", c: "بانتظار" },
                  { n: "مريم", s: "عناية بشرة", t: "13:00", c: "مؤكد" },
                ].map((x) => (
                  <div key={x.n} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 grid place-items-center text-white font-bold text-xs">{x.n[0]}</div>
                    <div className="flex-1"><div className="text-white text-sm font-bold">{x.n}</div><div className="text-slate-400 text-xs">{x.s} — {x.t}</div></div>
                    <span className="text-emerald-300 text-xs font-bold">{x.c}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center border-t border-white/10 pt-4">
                <div><div className="text-white font-black text-lg">24</div><div className="text-slate-400 text-xs">حجز اليوم</div></div>
                <div><div className="text-white font-black text-lg">18,400</div><div className="text-slate-400 text-xs">دج</div></div>
                <div><div className="text-white font-black text-lg">96%</div><div className="text-slate-400 text-xs">حضور</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-rose-500 font-black text-xs tracking-[0.2em] mb-2">المميزات</div>
            <h2 className="text-3xl lg:text-4xl font-black">كل ما تحتاجه — بهيكل زجاجي ملكي</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">واجهة دخول موحدة → لوحة خاصة معزولة لكل تاجر + تطبيق هاتف بنفس الـ API + تذكيرات واتساب وتيليجرام</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { i: "📅", t: "حجز ذكي بدون تضارب", d: "تقويم + Slots يمنع التعارض تلقائياً بنفس الثانية" },
              { i: "💳", t: "فوترة وحضوري فقط", d: "فواتير تلقائية بعد الحجز والدفع حضوري في المحل" },
              { i: "👥", t: "إدارة الفريق", d: "جدولة الموظفات وتتبع الأداء بنسبة الاستخدام" },
              { i: "📊", t: "مصروفات ودخل مالي", d: "لوحة إحصائيات يومية + إيراد + حضور" },
              { i: "💬", t: "تذكيرات واتساب + تيليجرام", d: "تأكيد فوري + تذكير 24س و 2س — تضع توكن تيليجرام الخاص بك" },
              { i: "🔗", t: "قائمة صالونات + حجز خاص", d: "زبون يرى القائمة ثم يحجز بدون حساب — يأخذ عضوية دائمة M-xxxxx وتذكرة BSxxxxx" },
              { i: "🎟️", t: "تذاكر بحرفين لكل تاجر", d: "التاجر يحدد الحرفين من الإعدادات (BS, LB, AR...)" },
              { i: "🏆", t: "عملاء أوفياء", d: "متابعة زيارات وإنفاق كل عميل برقم عضويته" },
              { i: "📱", t: "ويب + تطبيق هاتف", d: "نفس قاعدة البيانات — Next.js للويب و Expo للهاتف" },
            ].map((f) => (
              <div key={f.t} className="rounded-3xl border border-slate-100 p-6 bg-[#fdfbf8] card-hover">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 grid place-items-center text-xl mb-4">{f.i}</div>
                <div className="font-black mb-1">{f.t}</div>
                <div className="text-sm text-slate-500 leading-relaxed">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section id="how" className="py-16 bg-[#fdfbf8] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          {[
            { n: "1", t: "سجل صالونك", d: "خدمات، أسعار، موظفات — 5 دقائق" },
            { n: "2", t: "شارك القائمة", d: "الزبونات يخترن صالونك من القائمة ويحجزن 24/7" },
            { n: "3", t: "تابع وأرسل تذكيرات", d: "تيليجرام + واتساب تلقائي" },
          ].map((s) => (
            <div key={s.n} className="bg-white rounded-3xl p-8 border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-slate-900 text-white grid place-items-center font-black text-xl mx-auto mb-4">{s.n}</div>
              <div className="font-black text-lg mb-2">{s.t}</div>
              <div className="text-sm text-slate-500">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Salons preview */}
      <section id="salons" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-black mb-6">صالونات على المنصة — عرض للزبون</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "صالون نورة للتجميل", p: "BS", addr: "بشار", type: "صالون نسائي" },
              { name: "معهد لينا للعناية", p: "LB", addr: "وهران", type: "معهد تجميل" },
              { name: "أناقة العروس", p: "AR", addr: "الجزائر", type: "كراء تجهيزات" },
            ].map((s) => (
              <Link key={s.name} href={`/booking/${s.p}`} className="rounded-3xl border border-slate-200 p-6 hover:shadow-xl transition bg-[#fdfbf8]">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-pink-600 grid place-items-center text-white font-black mb-3">{s.name[0]}</div>
                <div className="font-black">{s.name}</div>
                <div className="text-xs text-slate-500">{s.type} • {s.addr} • بادئة التذاكر: {s.p}</div>
                <div className="mt-4 inline-flex px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-bold">احجزي الآن →</div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/salons" className="text-rose-600 font-bold">عرض كل الصالونات →</Link>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-slate-500 border-t">
        © 2026 Nexovya Beauté — منصة SaaS معزولة لكل تاجر • GitHub + Cloudflare
      </footer>
    </div>
  );
}
