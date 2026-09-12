import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

/**
 * Nexovya Mobile — Same API as Web
 * Two roles in one app:
 * - Merchant: login with tenantId → dashboard
 * - Customer: browse salons → booking portal → get membershipId + ticket (BSxxxxx)
 * Token per tenant for Telegram: stored per tenant, used via same API endpoint POST /api/telegram
 */

const tenants = [
  { id: 't1', name: 'صالون نورة للتجميل', prefix: 'BS', addr: 'بشار' },
  { id: 't2', name: 'معهد لينا للعناية', prefix: 'LB', addr: 'وهران' },
  { id: 't3', name: 'أناقة العروس', prefix: 'AR', addr: 'الجزائر' },
];

export default function App() {
  const [role, setRole] = useState<'choose' | 'merchant' | 'customer'>('choose');
  const [selectedTenant, setSelectedTenant] = useState(tenants[0]);

  if (role === 'choose') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nexovya Beauté</Text>
        <Text style={styles.sub}>منصة واحدة — ويب + هاتف بنفس قاعدة البيانات</Text>
        <TouchableOpacity style={styles.btnDark} onPress={() => setRole('merchant')}>
          <Text style={styles.btnDarkText}>دخول التاجر — توجيه تلقائي للوحة المعزولة</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnLight} onPress={() => setRole('customer')}>
          <Text style={styles.btnLightText}>أنا زبونة — قائمة الصالونات → حجز بدون حساب</Text>
        </TouchableOpacity>
        <Text style={styles.note}>نفس الـ API للويب والهاتف • عزل تام tenant_id • تذكرة بحرفين من إعدادات التاجر • تيليجرام بتوكن خاص</Text>
      </View>
    );
  }

  if (role === 'customer') {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => setRole('choose')}><Text style={{ color: '#e11d48', fontWeight: '700' }}>← رجوع</Text></TouchableOpacity>
        <Text style={styles.title}>قائمة الصالونات</Text>
        {tenants.map(t => (
          <TouchableOpacity key={t.id} style={styles.card} onPress={() => setSelectedTenant(t)}>
            <Text style={styles.cardTitle}>{t.name}</Text>
            <Text style={styles.cardSub}>{t.addr} • بادئة التذاكر: {t.prefix}</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.bookingBox}>
          <Text style={styles.bookingTitle}>بوابة حجز — {selectedTenant.name}</Text>
          <TextInput placeholder="الاسم" style={styles.input} />
          <TextInput placeholder="الهاتف" style={styles.input} />
          <Text style={styles.hint}>ستحصل على عضوية دائمة M-xxxxx + تذكرة {selectedTenant.prefix}-xxxxx — الدفع حضوري</Text>
          <TouchableOpacity style={styles.btnDark}><Text style={styles.btnDarkText}>تأكيد الحجز</Text></TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => setRole('choose')}><Text style={{ color: '#e11d48', fontWeight: '700' }}>← رجوع</Text></TouchableOpacity>
      <Text style={styles.title}>لوحة التاجر — معزولة</Text>
      <Text style={styles.sub}>الصالون: {selectedTenant.name} • الحرفين: {selectedTenant.prefix}</Text>
      <View style={styles.statsRow}>
        <View style={styles.stat}><Text style={styles.statNum}>24</Text><Text>حجز اليوم</Text></View>
        <View style={styles.stat}><Text style={styles.statNum}>18,400 دج</Text><Text>الدخل</Text></View>
        <View style={styles.stat}><Text style={styles.statNum}>96%</Text><Text>حضور</Text></View>
      </View>
      <View style={styles.card}><Text style={styles.cardTitle}>تذكيرات تيليجرام</Text><Text>ضع توكن البوت من الإعدادات — نفس التوكن المستخدم في الويب</Text></View>
      <View style={styles.card}><Text style={styles.cardTitle}>الفوترة — حضوري فقط</Text><Text>INV-2048 • سارة أحمد • 1800 دج • مدفوع حضوري</Text></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fdfbf8' },
  title: { fontSize: 22, fontWeight: '900', marginTop: 20, textAlign: 'right' },
  sub: { color: '#64748b', marginTop: 6, textAlign: 'right' },
  btnDark: { backgroundColor: '#0f172a', padding: 16, borderRadius: 16, marginTop: 16, alignItems: 'center' },
  btnDarkText: { color: 'white', fontWeight: '800' },
  btnLight: { backgroundColor: 'white', borderWidth: 1, borderColor: '#e2e8f0', padding: 16, borderRadius: 16, marginTop: 12, alignItems: 'center' },
  btnLightText: { color: '#0f172a', fontWeight: '800' },
  note: { color: '#94a3b8', fontSize: 12, marginTop: 16, textAlign: 'center' },
  card: { backgroundColor: 'white', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 16, padding: 16, marginTop: 12 },
  cardTitle: { fontWeight: '800' },
  cardSub: { color: '#64748b', fontSize: 12, marginTop: 4 },
  bookingBox: { backgroundColor: 'white', borderRadius: 20, padding: 16, marginTop: 20, borderWidth: 1, borderColor: '#e2e8f0' },
  bookingTitle: { fontWeight: '900', marginBottom: 12, textAlign: 'right' },
  input: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, padding: 12, marginTop: 8, textAlign: 'right' },
  hint: { color: '#94a3b8', fontSize: 11, marginTop: 8, textAlign: 'right' },
  statsRow: { flexDirection: 'row-reverse', gap: 8, marginTop: 16 },
  stat: { flex: 1, backgroundColor: 'white', borderRadius: 16, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  statNum: { fontWeight: '900', fontSize: 16 },
});
