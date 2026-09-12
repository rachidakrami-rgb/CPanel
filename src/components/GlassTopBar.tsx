"use client";
import { useEffect, useState } from "react";

export default function GlassTopBar({
  tenantName,
  tenantType,
  onLogout,
  onMessages,
  onSettings,
}: {
  tenantName: string;
  tenantType?: string;
  onLogout: () => void;
  onMessages: () => void;
  onSettings: () => void;
}) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const upd = () => setTime(new Date().toLocaleTimeString("ar-DZ", { hour: "2-digit", minute: "2-digit" }));
    upd();
    const id = setInterval(upd, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="sticky top-4 z-30 mx-4 lg:mx-6">
      <div className="glass-royal rounded-[22px] px-4 lg:px-6 py-3 flex items-center justify-between">
        {/* right */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 grid place-items-center text-white font-black text-sm shadow-lg">
            {tenantName?.[0] || "N"}
          </div>
          <div>
            <div className="font-black text-sm leading-none">{tenantName || "لوحة التحكم"}</div>
            <div className="text-[11px] text-slate-500">{tenantType || "متعدد الخدمات"} • {time}</div>
          </div>
          <span className="hidden md:inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-100 mr-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" /> متصل
          </span>
        </div>

        {/* center - search */}
        <div className="hidden lg:flex items-center gap-2 bg-white/60 backdrop-blur rounded-full px-4 py-2 border border-white/60 w-[360px]">
          <span className="text-slate-400 text-sm">🔍</span>
          <input placeholder="بحث في الحجوزات، العملاء، الفواتير..." className="bg-transparent outline-none text-sm w-full placeholder:text-slate-400" />
        </div>

        {/* left actions */}
        <div className="flex items-center gap-1.5">
          <button onClick={onMessages} className="relative w-10 h-10 rounded-full bg-white/70 backdrop-blur grid place-items-center border border-white/60 hover:bg-white transition shadow-sm">
            <span className="text-base">💬</span>
            <span className="absolute -top-0.5 -left-0.5 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full grid place-items-center border-2 border-white">3</span>
          </button>
          <button onClick={onSettings} className="w-10 h-10 rounded-full bg-white/70 backdrop-blur grid place-items-center border border-white/60 hover:bg-white transition shadow-sm">
            <span className="text-base">⚙️</span>
          </button>
          <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block" />
          <button
            onClick={onLogout}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition shadow"
          >
            <span>خروج</span>
            <span className="text-xs">↗</span>
          </button>
          <button onClick={onLogout} className="sm:hidden w-10 h-10 rounded-full bg-slate-900 text-white grid place-items-center">
            ↗
          </button>
        </div>
      </div>
    </div>
  );
}
