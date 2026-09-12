"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { tenants, services, bookings, generateMembershipId, generateTicket, staff } from "@/lib/mockData";
import { useParams, useRouter } from "next/navigation";

export default function BookingPortal() {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.id as string;
  const tenant = tenants.find((t) => t.id === tenantId) || tenants.find((t) => t.prefix === tenantId) || tenants[0];
  const tenantServices = services.filter((s) => s.tenantId === tenant.id);
  const tenantStaff = staff.filter((s) => s.tenantId === tenant.id);

  const [selectedService, setSelectedService] = useState<string>(tenantServices[0]?.id || "");
  const [selectedStaff, setSelectedStaff] = useState<string>(tenantStaff[0]?.id || "");
  const [date, setDate] = useState("2026-09-13");
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showTicket, setShowTicket] = useState<{ membership: string; ticket: string } | null>(null);

  // slots 09:00 - 17:00 every 30min, disable already booked
  const slots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];
  const bookedTimes = bookings.filter((b) => b.tenantId === tenant.id && b.date.includes("12")).map((b) => b.time);

  const handleBook = () => {
    if (!name || !phone || !time || !selectedService) {
      alert("أكملي جميع الحقول");
      return;
    }
    const svc = services.find((s) => s.id === selectedService);
    const membership = generateMembershipId();
    // sequence based on existing bookings count + random
    const seq = bookings.filter((b) => b.tenantId === tenant.id).length + 24005 + Math.floor(Math.random() * 10);
    const ticket = generateTicket(tenant.prefix, seq);

    // Simulate save with tenant isolation
    const newBooking = {
      id: "b" + Date.now(),
      tenantId: tenant.id,
      client: name,
      phone,
      membershipId: membership,
      ticket,
      service: svc?.name || "",
      staff: staff.find((s) => s.id === selectedStaff)?.name || "",
      date: "13 سبتمبر",
      time,
      status: "مؤكد" as const,
      statusColor: "emerald",
      amount: svc?.price || 0,
    };
    bookings.push(newBooking as any);

    // store membership locally for customer
    localStorage.setItem("nexovya_membership_" + phone, membership);
    setShowTicket({ membership, ticket });

    // Simulate Telegram/WhatsApp send
    const token = localStorage.getItem("telegram_token_" + tenant.id) || "";
    if (token) {
      console.log("Telegram would send to", phone, "via token", token);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf8]">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6">
        <div className="glass-royal rounded-2xl px-6 py-4 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/salons" className="w-9 h-9 rounded-xl bg-white border grid place-items-center">←</Link>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tenant.color} grid place-items-center text-white font-black`}>{tenant.logo}</div>
            <div>
              <div className="font-black">{tenant.name} — بوابة الحجز</div>
              <div className="text-xs text-slate-500">{tenant.type} • {tenant.address} • التذكرة تبدأ بـ {tenant.prefix}</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs bg-white border px-3 py-1.5 rounded-full">💬 تذكيرات واتساب + تيليجرام تلقائية</div>
        </div>

        {showTicket ? (
          <div className="bg-white rounded-3xl border border-emerald-200 p-8 text-center shadow-xl max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500 grid place-items-center text-white text-2xl mx-auto mb-4">✓</div>
            <div className="font-black text-xl mb-2">تم الحجز بنجاح!</div>
            <div className="text-sm text-slate-600 mb-6">الدفع حضوري في المحل — ستصلك تذكيرات واتساب وتيليجرام</div>
            <div className="grid gap-3 text-right">
              <div className="bg-[#fdfbf8] rounded-xl p-4 border">
                <div className="text-xs text-slate-500">رقم العضوية الدائم (احفظيه)</div>
                <div className="font-mono font-black text-lg">{showTicket.membership}</div>
                <div className="text-xs text-slate-400">تستخدمينه في كل حجز قادم</div>
              </div>
              <div className="bg-slate-900 text-white rounded-xl p-4">
                <div className="text-xs text-slate-300">تذكرة الحجز</div>
                <div className="font-mono font-black text-xl tracking-widest">{showTicket.ticket}</div>
                <div className="text-xs text-slate-400">الحروف {tenant.prefix} حددها صاحب الصالون من الإعدادات</div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowTicket(null)} className="flex-1 py-3 rounded-xl border font-bold">حجز آخر</button>
              <Link href="/salons" className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-bold text-center">العودة للقائمة</Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Services */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6">
                <div className="font-black mb-4">1 — اختاري الخدمة</div>
                <div className="grid md:grid-cols-2 gap-3">
                  {tenantServices.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedService(s.id)}
                      className={`text-right p-4 rounded-2xl border flex items-center justify-between ${selectedService === s.id ? "bg-slate-900 text-white border-slate-900" : "bg-[#fdfbf8] border-slate-100 hover:border-rose-200"}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{s.icon}</span>
                        <div>
                          <div className="font-bold text-sm">{s.name}</div>
                          <div className={`text-xs ${selectedService === s.id ? "text-slate-300" : "text-slate-500"}`}>{s.duration} دقيقة</div>
                        </div>
                      </div>
                      <div className="font-black text-sm">{s.price} دج</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Staff */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6">
                <div className="font-black mb-4">2 — اختاري الموظفة (اختياري)</div>
                <div className="grid md:grid-cols-3 gap-3">
                  {tenantStaff.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStaff(s.id)}
                      className={`p-4 rounded-2xl border text-center ${selectedStaff === s.id ? "bg-slate-900 text-white border-slate-900" : "bg-[#fdfbf8] border-slate-100"}`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${s.color}-400 to-${s.color}-600 grid place-items-center text-white font-black mx-auto mb-2`}>{s.name[0]}</div>
                      <div className="font-bold text-sm">{s.name}</div>
                      <div className={`text-xs ${selectedStaff === s.id ? "text-slate-300" : "text-slate-500"}`}>{s.role}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6">
                <div className="font-black mb-4">3 — التاريخ والوقت</div>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 mb-4" />
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {slots.map((slot) => {
                    const disabled = bookedTimes.includes(slot);
                    return (
                      <button
                        key={slot}
                        disabled={disabled}
                        onClick={() => setTime(slot)}
                        className={`slot py-3 rounded-xl border text-sm font-bold ${disabled ? "disabled bg-slate-50" : time === slot ? "selected" : "bg-white border-slate-200 hover:shadow"}`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                <div className="text-xs text-slate-500 mt-3">المواعيد الرمادية محجوزة بالفعل — لا يمكن الحجز المزدوج (حماية على مستوى قاعدة البيانات)</div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 h-fit sticky top-24">
              <div className="font-black mb-4">4 — بياناتك</div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-600">الاسم الكامل</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="مثال: سارة أحمد" className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-300 outline-none text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600">رقم الهاتف</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0551234567" className="mt-1 w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-300 outline-none text-sm" />
                </div>
                <div className="bg-[#fdfbf8] rounded-xl p-3 border border-slate-100 text-xs leading-relaxed">
                  <div>ستحصلين على <b>رقم عضوية دائم</b> + <b>تذكرة {tenant.prefix}-xxxxx</b></div>
                  <div className="text-slate-500">الدفع حضوري في المحل — تذكيرات تيليجرام/واتساب تلقائية</div>
                </div>
                <button onClick={handleBook} className="w-full py-3.5 bg-gradient-to-r from-rose-400 to-pink-600 text-white rounded-xl font-black shadow-lg shadow-pink-500/20">تأكيد الحجز — {services.find((s) => s.id === selectedService)?.price || 0} دج</button>
                <div className="text-center text-xs text-slate-400">بالحجز توافقين على سياسة الخصوصية</div>
              </div>
              <div className="mt-6 pt-6 border-t text-xs">
                <div className="font-bold mb-2">🔒 عزل البيانات</div>
                <div className="text-slate-500">هذا الحجز سيُحفظ فقط في قاعدة بيانات "{tenant.name}" ولن يظهر لأي صالون آخر — نفس الرابط لكن بيانات معزولة.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
