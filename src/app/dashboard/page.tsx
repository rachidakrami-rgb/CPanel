"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GlassTopBar from "@/components/GlassTopBar";
import { tenants, users, bookings, services, staff as staffData, invoices, loyalClients } from "@/lib/mockData";
import Link from "next/link";

type Tab = "overview" | "bookings" | "services" | "staff" | "invoices" | "loyal" | "settings";

export default function Dashboard() {
  const router = useRouter();
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [prefix, setPrefix] = useState("BS");
  const [telegramToken, setTelegramToken] = useState("");
  const [telegramEnabled, setTelegramEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [showToast, setShowToast] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const u = localStorage.getItem("nexovya_user");
    const t = localStorage.getItem("nexovya_tenant");
    if (!u || !t) {
      router.push("/login");
      return;
    }
    const parsed = JSON.parse(u);
    setUser(parsed);
    setTenantId(t);
    const tenant = tenants.find((x) => x.id === t);
    if (tenant) setPrefix(tenant.prefix);
    const tok = localStorage.getItem("telegram_token_" + t) || "";
    setTelegramToken(tok);
  }, [router]);

  useEffect(() => {
    if (showToast) {
      const id = setTimeout(() => setShowToast(""), 2500);
      return () => clearTimeout(id);
    }
  }, [showToast]);

  if (!tenantId || !user) return <div className="min-h-screen grid place-items-center">جاري التحقق...</div>;

  const tenant = tenants.find((t) => t.id === tenantId)!;
  const tenantBookings = bookings.filter((b) => b.tenantId === tenantId);
  const tenantServices = services.filter((s) => s.tenantId === tenantId);
  const tenantStaff = staffData.filter((s) => s.tenantId === tenantId);
  const tenantInvoices = invoices.filter((i) => i.tenantId === tenantId);
  const tenantLoyal = loyalClients.filter((c) => c.tenantId === tenantId);
  const revenueToday = tenantBookings.filter((b) => b.status !== "لم تحضر").reduce((a, b) => a + b.amount, 0);

  const saveSettings = () => {
    // update prefix
    tenant.prefix = prefix.toUpperCase().slice(0, 2) || "BS";
    localStorage.setItem("telegram_token_" + tenantId, telegramToken);
    setShowToast("تم حفظ الإعدادات — الحروف الجديدة للتذاكر: " + tenant.prefix);
  };

  const testTelegram = async () => {
    if (!telegramToken) {
      setShowToast("ضع توكن بوت تيليجرام أولاً");
      return;
    }
    // Simulate API call
    try {
      // In real app: fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`,...)
      setShowToast("تم إرسال رسالة تجريبية عبر تيليجرام ✓ (محاكاة)");
    } catch {
      setShowToast("فشل الإرسال — تأكد من التوكن");
    }
  };

  const filteredBookings = tenantBookings.filter((b) => !filter || b.client.includes(filter) || b.ticket.includes(filter) || b.phone.includes(filter));

  return (
    <div className="min-h-screen bg-[#fdfbf8]">
      {/* Glass Top Bar - Royal Pink Grading */}
      <GlassTopBar
        tenantName={tenant.name}
        tenantType={tenant.type}
        onLogout={() => {
          localStorage.removeItem("nexovya_user");
          localStorage.removeItem("nexovya_tenant");
          router.push("/login");
        }}
        onMessages={() => setShowToast("الرسائل — قريباً")}
        onSettings={() => setTab("settings")}
      />

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 grid lg:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="bg-white rounded-3xl border border-slate-200 p-3 h-fit lg:sticky lg:top-[88px]">
          <div className="px-3 py-3 mb-2">
            <div className="font-black text-sm">{tenant.name}</div>
            <div className="text-xs text-slate-500">{tenant.type} • {tenant.address}</div>
            <div className="mt-2 inline-flex text-xs bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full border border-rose-100">بادئة التذاكر: <b className="mr-1">{tenant.prefix}</b></div>
          </div>
          <nav className="space-y-1">
            {[
              { id: "overview", label: " الرئيسية", icon: "🏠" },
              { id: "bookings", label: "الحجوزات", icon: "📅" },
              { id: "services", label: "الخدمات", icon: "✂️" },
              { id: "staff", label: "الفريق", icon: "👥" },
              { id: "invoices", label: "الفوترة", icon: "💳" },
              { id: "loyal", label: "عملاء أوفياء", icon: "🏆" },
              { id: "settings", label: "الإعدادات", icon: "⚙️" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id as Tab)}
                className={`sidebar-item w-full text-right flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${tab === item.id ? "active" : "hover:bg-slate-50"}`}
              >
                <span>{item.icon}</span> {item.label}
                {item.id === "bookings" && <span className="mr-auto bg-slate-900 text-white text-xs px-2 py-0.5 rounded-full">{tenantBookings.length}</span>}
              </button>
            ))}
          </nav>
          <div className="mt-4 p-3 bg-[#fdfbf8] rounded-2xl border border-slate-100">
            <div className="text-xs font-bold mb-1">🔒 عزل البيانات</div>
            <div className="text-xs text-slate-500 leading-relaxed">كل بياناتك معزولة عن باقي التجار — نفس الرابط لكن قاعدة بيانات منطقية منفصلة.</div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link href="/salons" className="text-center py-2 rounded-xl border text-xs font-bold bg-white">عرض كزبون</Link>
            <Link href="/" className="text-center py-2 rounded-xl bg-slate-900 text-white text-xs font-bold">الرئيسية</Link>
          </div>
        </aside>

        {/* Main */}
        <main className="space-y-6">
          {tab === "overview" && (
            <>
              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-3xl border border-slate-200 p-6">
                  <div className="text-xs text-slate-500 font-bold">حجوزات اليوم</div>
                  <div className="text-2xl font-black mt-1">{tenantBookings.length}</div>
                  <div className="text-xs text-emerald-600 mt-1">● مباشر • معزولة لهذا الصالون فقط</div>
                </div>
                <div className="bg-white rounded-3xl border border-slate-200 p-6">
                  <div className="text-xs text-slate-500 font-bold">الدخل (حضوري)</div>
                  <div className="text-2xl font-black mt-1">{revenueToday.toLocaleString()} دج</div>
                  <div className="text-xs text-slate-400 mt-1">بدون دفع إلكتروني — حضوري فقط</div>
                </div>
                <div className="bg-white rounded-3xl border border-slate-200 p-6">
                  <div className="text-xs text-slate-500 font-bold">معدل الحضور</div>
                  <div className="text-2xl font-black mt-1">96%</div>
                  <div className="h-2 bg-slate-100 rounded-full mt-2 overflow-hidden"><div className="h-full w-[96%] bg-emerald-500 rounded-full" /></div>
                </div>
              </div>

              {/* Today's bookings live */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-black">مواعيد اليوم — مباشر</div>
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-500 rounded-full pulse-dot" /> مباشر</span>
                </div>
                <div className="space-y-3">
                  {tenantBookings.map((b) => (
                    <div key={b.id} className="flex items-center gap-3 bg-[#fdfbf8] rounded-2xl p-3 border border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 grid place-items-center text-white font-bold text-xs">{b.client[0]}</div>
                      <div className="flex-1">
                        <div className="font-bold text-sm">{b.client} — <span className="font-mono text-xs bg-white border px-1.5 py-0.5 rounded">{b.ticket}</span></div>
                        <div className="text-xs text-slate-500">{b.service} • {b.staff} • {b.time} • عضوية {b.membershipId}</div>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-${b.statusColor}-50 text-${b.statusColor}-700 border border-${b.statusColor}-100`}>{b.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-3xl border border-slate-200 p-6">
                  <div className="font-black mb-3">تذكيرات اليوم</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between bg-[#fdfbf8] p-3 rounded-xl border"><span>واتساب</span><span className={whatsappEnabled ? "text-emerald-600 font-bold" : "text-slate-400"}>{whatsappEnabled ? "مفعّل" : "متوقف"}</span></div>
                    <div className="flex justify-between bg-[#fdfbf8] p-3 rounded-xl border"><span>تيليجرام</span><span className={telegramEnabled ? "text-emerald-600 font-bold" : "text-slate-400"}>{telegramEnabled ? "مفعّل" : "متوقف"}</span></div>
                    <div className="text-xs text-slate-500">تذكير تلقائي قبل 24س و 2س — كل تاجر يضع توكنه الخاص</div>
                  </div>
                </div>
                <div className="bg-slate-900 text-white rounded-3xl p-6">
                  <div className="font-black mb-2">رابط الحجز الخاص بك (للزبون)</div>
                  <div className="font-mono text-xs bg-white/10 p-3 rounded-xl border border-white/10 break-all">nexovya.com/booking/{tenant.id} — شاركيه على إنستغرام وواتساب</div>
                  <Link href={`/booking/${tenant.id}`} className="inline-flex mt-3 px-4 py-2 rounded-full bg-white text-slate-900 text-sm font-bold">معاينة كبون الزبون →</Link>
                </div>
              </div>
            </>
          )}

          {tab === "bookings" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="font-black">كل الحجوزات — معزولة: {tenant.name}</div>
                <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="بحث بالاسم أو التذكرة أو الهاتف..." className="px-4 py-2 rounded-full border border-slate-200 text-sm w-64" />
              </div>
              <div className="overflow-auto rounded-xl border border-slate-100">
                <table className="w-full text-sm">
                  <thead className="bg-[#fdfbf8] text-xs text-slate-500">
                    <tr>
                      <th className="text-right px-4 py-3">الزبونة</th>
                      <th className="text-right px-4 py-3">التذكرة</th>
                      <th className="text-right px-4 py-3">العضوية</th>
                      <th className="text-right px-4 py-3">الخدمة</th>
                      <th className="text-right px-4 py-3">الموظفة</th>
                      <th className="text-right px-4 py-3">الوقت</th>
                      <th className="text-right px-4 py-3">الحالة</th>
                      <th className="text-right px-4 py-3">المبلغ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="border-t hover:bg-slate-50">
                        <td className="px-4 py-3 font-bold">{b.client}<div className="text-xs text-slate-500">{b.phone}</div></td>
                        <td className="px-4 py-3 font-mono text-xs bg-slate-50 rounded px-2 py-1 inline-block mt-2 border">{b.ticket}</td>
                        <td className="px-4 py-3 font-mono text-xs">{b.membershipId}</td>
                        <td className="px-4 py-3">{b.service}</td>
                        <td className="px-4 py-3">{b.staff}</td>
                        <td className="px-4 py-3 font-bold text-indigo-600">{b.time}</td>
                        <td className="px-4 py-3"><span className="text-xs bg-slate-100 px-2 py-1 rounded-full">{b.status}</span></td>
                        <td className="px-4 py-3 font-black">{b.amount} دج</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-xs text-slate-500 mt-3">هذه الحجوزات لا تظهر إلا في لوحة "{tenant.name}" — عزل تام على مستوى قاعدة البيانات.</div>
            </div>
          )}

          {tab === "services" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="font-black">الخدمات — {tenant.name}</div>
                <button onClick={() => setShowToast("إضافة خدمة — قريباً")} className="px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-bold">+ إضافة خدمة</button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tenantServices.map((s) => (
                  <div key={s.id} className="rounded-2xl border border-slate-100 p-5 bg-[#fdfbf8] card-hover">
                    <div className="flex justify-between mb-3">
                      <span className="text-2xl">{s.icon}</span>
                      <span className="text-xs bg-white border px-2 py-1 rounded-full">{s.count} حجز</span>
                    </div>
                    <div className="font-black">{s.name}</div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-slate-500">{s.duration} دقيقة</span>
                      <span className="font-black text-rose-600">{s.price} دج</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "staff" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <div className="font-black mb-4">الفريق — {tenant.name}</div>
              <div className="grid md:grid-cols-3 gap-4">
                {tenantStaff.map((s) => (
                  <div key={s.id} className="rounded-2xl border border-slate-100 p-5 bg-white card-hover">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-600 grid place-items-center text-white font-black">{s.name[0]}</div>
                      <div>
                        <div className="font-black">{s.name}</div>
                        <div className="text-xs text-slate-500">{s.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-amber-500">⭐ {s.rating}</span>
                      <span className="mr-auto text-xs text-slate-500">{s.bookings} حجز</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1"><span>نسبة الاستخدام</span><b>{s.utilization}%</b></div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-slate-900 rounded-full" style={{ width: s.utilization + "%" }} /></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "invoices" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <div className="font-black mb-4">الفوترة — حضوري فقط</div>
              <div className="overflow-auto rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-[#fdfbf8] text-xs text-slate-500">
                    <tr><th className="text-right px-4 py-3">رقم الفاتورة</th><th className="text-right px-4 py-3">الزبونة</th><th className="text-right px-4 py-3">المبلغ</th><th className="text-right px-4 py-3">الحالة</th><th className="text-right px-4 py-3">طريقة الدفع</th></tr>
                  </thead>
                  <tbody>
                    {tenantInvoices.map((inv) => (
                      <tr key={inv.id} className="border-t">
                        <td className="px-4 py-3 font-mono text-indigo-600 font-bold">{inv.number}</td>
                        <td className="px-4 py-3">{inv.client}</td>
                        <td className="px-4 py-3 font-black">{inv.amount} دج</td>
                        <td className="px-4 py-3"><span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full border">{inv.status}</span></td>
                        <td className="px-4 py-3">{inv.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "loyal" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <div className="font-black mb-4">عملاء أوفياء — برقم العضوية الدائم</div>
              <div className="grid md:grid-cols-2 gap-4">
                {tenantLoyal.map((c) => (
                  <div key={c.id} className="rounded-2xl border p-4 bg-[#fdfbf8] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 grid place-items-center text-white font-black">{c.name[0]}</div>
                    <div className="flex-1">
                      <div className="font-black">{c.name}</div>
                      <div className="text-xs text-slate-500">{c.phone} • {c.membershipId} • {c.visits} زيارة</div>
                      <div className="text-xs font-bold text-emerald-600">إجمالي الإنفاق: {c.total} دج</div>
                    </div>
                    <span className="text-xs bg-white border px-2 py-1 rounded-full">آخر زيارة {c.lastVisit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "settings" && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6">
                <div className="font-black mb-4">إعدادات الصالون — تتحكم في تذاكرك</div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600">اسم الصالون</label>
                    <input defaultValue={tenant.name} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600">حروف التذكرة (حرفين فقط — يحددها كل مستأجر)</label>
                    <input value={prefix} onChange={(e) => setPrefix(e.target.value.toUpperCase())} maxLength={2} className="mt-1 w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 outline-none font-mono font-black text-center text-lg tracking-widest" placeholder="BS" />
                    <div className="text-xs text-slate-500 mt-1">مثال: إذا كتبت <b>{prefix || "BS"}</b> ستصبح التذاكر <b>{prefix || "BS"}-24001</b> — كل صالون له حروفه الخاصة</div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600">رقم الجوال</label>
                    <input defaultValue={tenant.phone} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600">العنوان</label>
                    <input defaultValue={tenant.address} className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 text-sm" />
                  </div>
                  <button onClick={saveSettings} className="w-full py-3 bg-slate-900 text-white rounded-xl font-black">حفظ الإعدادات</button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-slate-200 p-6">
                  <div className="font-black mb-4">تذكيرات تيليجرام 🤖</div>
                  <div className="text-xs text-slate-600 mb-3">ضع توكن بوت تيليجرام الخاص بك — كل تاجر له بوت مستقل. نرسل تذكيرات قبل 24س و 2س.</div>
                  <label className="text-xs font-bold">Telegram Bot Token</label>
                  <input value={telegramToken} onChange={(e) => setTelegramToken(e.target.value)} placeholder="123456:ABC-DEF..." className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 font-mono text-sm" />
                  <div className="flex items-center justify-between mt-3 p-3 bg-[#fdfbf8] rounded-xl border">
                    <span className="text-sm font-bold">تفعيل تيليجرام</span>
                    <button onClick={() => setTelegramEnabled(!telegramEnabled)} className={`w-12 h-7 rounded-full p-1 transition ${telegramEnabled ? "bg-emerald-500" : "bg-slate-300"}`}><span className={`w-5 h-5 bg-white rounded-full block transition ${telegramEnabled ? "translate-x-5" : ""}`} /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <button onClick={testTelegram} className="py-2.5 rounded-xl bg-[#229ED9] text-white font-bold text-sm">اختبار الإرسال</button>
                    <button onClick={saveSettings} className="py-2.5 rounded-xl border font-bold text-sm">حفظ التوكن</button>
                  </div>
                  <div className="text-xs text-slate-400 mt-2">نستخدم واجهة Telegram Bot API مباشرة — لا حاجة لخدمة وسيطة.</div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-6">
                  <div className="font-black mb-4">تذكيرات واتساب</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100"><span className="text-sm">تأكيد الحجز فوري</span><span className="text-emerald-600 font-black text-xs">مفعّل</span></div>
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100"><span className="text-sm">تذكير 24 ساعة</span><span className="text-emerald-600 font-black text-xs">مفعّل</span></div>
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100"><span className="text-sm">تذكير 2 ساعة</span><span className="text-emerald-600 font-black text-xs">مفعّل</span></div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"><span className="text-sm">حالة الربط</span><span className="text-emerald-600 font-bold text-xs">متصل ✓ {tenant.phone}</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl text-sm font-bold z-50 fade-in flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-emerald-500 grid place-items-center text-xs">✓</span> {showToast}
        </div>
      )}
    </div>
  );
}
