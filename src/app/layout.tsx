import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nexovya Beauté — منصة إدارة الصالونات المتكاملة",
  description: "منصة SaaS متعددة المستأجرين لإدارة صالونات التجميل، معاهد العناية، وكراء تجهيزات العروس — حجز، مصروفات، تذكيرات واتساب/تيليجرام، عملاء أوفياء",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="text-slate-800 antialiased">{children}</body>
    </html>
  );
}
