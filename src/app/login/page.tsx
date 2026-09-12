"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { users, tenants } from "@/lib/mockData";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("noura@demo.com");
  const [password, setPassword] = useState("123456");
  const [err, setErr] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const u = users.find((x) => x.email === email && x.password === password);
    if (!u) {
      setErr("بيانات الدخول غير صحيحة — جرب noura@demo.com / 123456");
      return;
    }
    // Simulate tenant isolation: store tenantId in localStorage
    localStorage.setItem("nexovya_user", JSON.stringify(u));
    localStorage.setItem("nexovya_tenant", u.tenantId);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#fdfbf8] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-indigo-50" />
      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left info */}
        <div className="hidden lg:block">
          <div className="glass-royal rounded-[32px] p-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-pink-600 grid place-items-center text-white font-black mb-4">N</div>
            <h1 className="text-3xl font-black leading-tight mb-3">دخول موحد<br />لكل التجار</h1>
            <p className="text-slate-600 leading-relaxed mb-6">نفس الرابط <span className="font-mono bg-slate-900 text-white px-2 py-1 rounded-lg text-xs">nexovya.com/login</span> — بعد الدخول يتم توجيهك تلقائياً إلى لوحتك الخاصة المعزولة تماماً عن الآخرين.</p>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3 bg-white/70 rounded-xl p-3 border border-white">
                <span>🔒</span><span><b>عزل تام:</b> كل تاجر يرى فقط بياناته (حجوزات، خدمات، فواتير)</span>
              </div>
              <div className="flex gap-3 bg-white/70 rounded-xl p-3 border border-white">
                <span>🎟️</span><span><b>تذاكر بحرفين:</b> كل تاجر يحدد الحرفين من الإعدادات</span>
              </div>
              <div className="flex gap-3 bg-white/70 rounded-xl p-3 border border-white">
                <span>💬</span><span><b>تيليجرام + واتساب:</b> تضع توكن البوت الخاص بك</span>
              </div>
            </div>
            <div className="mt-6 text-xs text-slate-500">للزبون: لا يحتاج حساب — يذهب إلى <a href="/salons" className="text-rose-600 font-bold">قائمة الصالونات</a> ويحجز مباشرة</div>
          </div>
        </div>

        {/* Right form */}
        <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black">تسجيل دخول التاجر</h2>
            <p className="text-sm text-slate-500 mt-1">سيتم توجيهك تلقائياً إلى لوحتك بعد الدخول</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-600">البريد الإلكتروني</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-300 focus:outline-none text-sm" placeholder="noura@demo.com" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600">كلمة المرور</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-300 focus:outline-none text-sm" placeholder="••••••" />
            </div>
            {err && <div className="bg-rose-50 text-rose-700 text-xs p-3 rounded-xl border border-rose-100">{err}</div>}
            <button type="submit" className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-black hover:bg-slate-800 transition">دخول → لوحتي الخاصة</button>
            <div className="text-center text-xs text-slate-400">نسيت كلمة المرور؟ تواصل مع الإدارة</div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="text-xs font-black mb-3">حسابات تجريبية (نفس الواجهة، بيانات معزولة):</div>
            <div className="grid gap-2">
              {users.map((u) => {
                const t = tenants.find((x) => x.id === u.tenantId);
                return (
                  <button key={u.id} onClick={() => { setEmail(u.email); setPassword(u.password); }} className="text-right flex items-center justify-between p-3 rounded-xl bg-[#fdfbf8] border border-slate-100 hover:border-rose-200 transition">
                    <div>
                      <div className="font-bold text-sm">{t?.name}</div>
                      <div className="text-xs text-slate-500">{u.email} / {u.password} • بادئة: {t?.prefix}</div>
                    </div>
                    <span className="text-xs bg-white border px-2 py-1 rounded-full font-bold">{t?.prefix}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <a href="/" className="flex-1 text-center py-2.5 rounded-xl border border-slate-200 font-bold text-sm hover:bg-slate-50">← الرئيسية</a>
            <a href="/salons" className="flex-1 text-center py-2.5 rounded-xl bg-rose-50 text-rose-700 font-bold text-sm border border-rose-100">أنا زبونة</a>
          </div>
        </div>
      </div>
    </div>
  );
}
