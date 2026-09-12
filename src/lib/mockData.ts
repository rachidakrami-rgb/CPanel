// Mock data with tenant isolation
export type Tenant = {
  id: string;
  name: string;
  prefix: string; // حرفين للتذكرة
  phone: string;
  address: string;
  type: string;
  logo: string;
  color: string;
};

export const tenants: Tenant[] = [
  { id: "t1", name: "صالون نورة للتجميل", prefix: "BS", phone: "+213 55 123 4567", address: "بشار - حي النخيل", type: "صالون نسائي", logo: "N", color: "from-rose-400 to-pink-600" },
  { id: "t2", name: "معهد لينا للعناية", prefix: "LB", phone: "+213 66 987 6543", address: "وهران - السانيا", type: "معهد تجميل", logo: "L", color: "from-amber-400 to-orange-600" },
  { id: "t3", name: "أناقة العروس", prefix: "AR", phone: "+213 77 111 2222", address: "الجزائر - حيدرة", type: "كراء تجهيزات عروس", logo: "A", color: "from-violet-400 to-indigo-600" },
];

export const users = [
  { id: "u1", email: "noura@demo.com", password: "123456", name: "نورة", tenantId: "t1", role: "owner" },
  { id: "u2", email: "lina@demo.com", password: "123456", name: "لينا", tenantId: "t2", role: "owner" },
  { id: "u3", email: "admin@demo.com", password: "admin", name: "أميرة", tenantId: "t3", role: "owner" },
];

export type Booking = {
  id: string;
  tenantId: string;
  client: string;
  phone: string;
  membershipId: string; // رقم عضوية دائم
  ticket: string; // رقم تذكرة متغير مع حرفين
  service: string;
  staff: string;
  date: string;
  time: string;
  status: "مؤكد" | "بانتظار" | "مكتمل" | "لم تحضر";
  statusColor: string;
  amount: number;
};

export const bookings: Booking[] = [
  { id: "b1", tenantId: "t1", client: "سارة أحمد", phone: "0551122334", membershipId: "M-88291", ticket: "BS-24001", service: "قص وتصفيف", staff: "جواهر", date: "12 سبتمبر", time: "09:00", status: "مؤكد", statusColor: "emerald", amount: 1800 },
  { id: "b2", tenantId: "t1", client: "نورة خالد", phone: "0559988776", membershipId: "M-77102", ticket: "BS-24002", service: "صبغة", staff: "هند", date: "12 سبتمبر", time: "10:30", status: "بانتظار", statusColor: "amber", amount: 3500 },
  { id: "b3", tenantId: "t1", client: "مريم يوسف", phone: "0661234567", membershipId: "M-90331", ticket: "BS-24003", service: "عناية بشرة", staff: "ريم", date: "12 سبتمبر", time: "11:30", status: "مؤكد", statusColor: "emerald", amount: 2500 },
  { id: "b4", tenantId: "t1", client: "ليلى عبدالله", phone: "0770011223", membershipId: "M-44109", ticket: "BS-24004", service: "مكياج عروس", staff: "جواهر", date: "12 سبتمبر", time: "13:00", status: "لم تحضر", statusColor: "rose", amount: 4000 },
  { id: "b5", tenantId: "t2", client: "إيمان سعيد", phone: "0553344556", membershipId: "M-55201", ticket: "LB-11002", service: "حمام مغربي", staff: "سارة", date: "12 سبتمبر", time: "10:00", status: "مؤكد", statusColor: "emerald", amount: 2200 },
  { id: "b6", tenantId: "t3", client: "آية محمد", phone: "0667788990", membershipId: "M-66123", ticket: "AR-99001", service: "كراء فستان عروس", staff: "أميرة", date: "13 سبتمبر", time: "09:30", status: "مؤكد", statusColor: "emerald", amount: 12000 },
];

export type ServiceItem = {
  id: string;
  tenantId: string;
  name: string;
  price: number;
  duration: number;
  icon: string;
  color: string;
  count: number;
};

export const services: ServiceItem[] = [
  { id: "s1", tenantId: "t1", name: "قص وتصفيف", price: 1800, duration: 45, icon: "✂️", color: "indigo", count: 124 },
  { id: "s2", tenantId: "t1", name: "صبغة", price: 3500, duration: 60, icon: "🎨", color: "rose", count: 86 },
  { id: "s3", tenantId: "t1", name: "عناية بالبشرة", price: 2500, duration: 30, icon: "✨", color: "teal", count: 72 },
  { id: "s4", tenantId: "t1", name: "مكياج", price: 4000, duration: 45, icon: "💄", color: "purple", count: 58 },
  { id: "s5", tenantId: "t1", name: "باقة عروس", price: 12000, duration: 180, icon: "👰", color: "amber", count: 24 },
  { id: "s6", tenantId: "t1", name: "مانيكير وباديكير", price: 1500, duration: 30, icon: "💅", color: "pink", count: 95 },
  { id: "s7", tenantId: "t2", name: "حمام مغربي", price: 2200, duration: 60, icon: "🛁", color: "teal", count: 64 },
  { id: "s8", tenantId: "t3", name: "كراء فستان عروس فاخر", price: 12000, duration: 1440, icon: "👗", color: "violet", count: 31 },
  { id: "s9", tenantId: "t3", name: "كراء تاج وإكسسوارات", price: 3000, duration: 1440, icon: "👑", color: "amber", count: 42 },
];

export const staff = [
  { id: "st1", tenantId: "t1", name: "جواهر", role: "خبيرة قص وتصفيف", rating: 4.9, bookings: 42, utilization: 82, color: "indigo" },
  { id: "st2", tenantId: "t1", name: "هند", role: "خبيرة صبغة", rating: 4.8, bookings: 35, utilization: 68, color: "rose" },
  { id: "st3", tenantId: "t1", name: "ريم", role: "خبيرة عناية بشرة", rating: 4.7, bookings: 28, utilization: 45, color: "teal" },
  { id: "st4", tenantId: "t2", name: "سارة", role: "أخصائية عناية", rating: 4.8, bookings: 30, utilization: 75, color: "amber" },
  { id: "st5", tenantId: "t3", name: "أميرة", role: "مسؤولة العروس", rating: 5.0, bookings: 22, utilization: 60, color: "violet" },
];

export const invoices = [
  { id: "inv1", tenantId: "t1", number: "INV-2048", client: "سارة أحمد", date: "12 سبتمبر", amount: 1800, status: "مدفوع", statusColor: "emerald", method: "حضوري" },
  { id: "inv2", tenantId: "t1", number: "INV-2047", client: "نورة خالد", date: "12 سبتمبر", amount: 3500, status: "معلق", statusColor: "amber", method: "—" },
  { id: "inv3", tenantId: "t1", number: "INV-2046", client: "مريم يوسف", date: "12 سبتمبر", amount: 2500, status: "مدفوع", statusColor: "emerald", method: "حضوري" },
  { id: "inv4", tenantId: "t2", number: "INV-1101", client: "إيمان سعيد", date: "12 سبتمبر", amount: 2200, status: "مدفوع", statusColor: "emerald", method: "حضوري" },
];

export const loyalClients = [
  { id: "c1", tenantId: "t1", name: "سارة أحمد", phone: "0551122334", membershipId: "M-88291", visits: 14, total: 28600, lastVisit: "12 سبتمبر" },
  { id: "c2", tenantId: "t1", name: "هيا السالم", phone: "0559988776", membershipId: "M-77102", visits: 9, total: 21200, lastVisit: "10 سبتمبر" },
  { id: "c3", tenantId: "t2", name: "إيمان سعيد", phone: "0553344556", membershipId: "M-55201", visits: 7, total: 15400, lastVisit: "11 سبتمبر" },
];

// helpers
export function generateMembershipId() {
  return "M-" + Math.floor(10000 + Math.random() * 90000);
}
export function generateTicket(prefix: string, seq: number) {
  return `${prefix}-${String(seq).padStart(5, "0")}`;
}
