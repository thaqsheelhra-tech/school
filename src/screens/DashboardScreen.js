import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { COLORS, ROLES, TIMETABLE, HOMEWORK, ANNOUNCEMENTS, PERFORMANCE_DATA, TEACHERS_LIST, ADMISSIONS_DATA } from '../data/mockData';
import { Card, StatCard, SectionHeader, Pill } from '../components/UI';

const W = Dimensions.get('window').width;

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(200, 156, 74, ${opacity})`,
  labelColor: () => COLORS.textMuted,
  style: { borderRadius: 12 },
  propsForDots: { r: '4', strokeWidth: '2', stroke: COLORS.gold },
};

function BannerCard({ role }) {
  const configs = {
    student: { accent: '#c89c4a', label: 'TUESDAY, 12 MAY 2026', title: '5 classes today and 3 assignments due this week.', sub: 'Mid-term exams begin in 16 days. You're on track.' },
    teacher: { accent: '#10b981', label: 'TUESDAY, 12 MAY 2026', title: '3 classes today and 42 papers awaiting review.', sub: 'Grade 9-A is performing 6% above average this term.' },
    head: { accent: '#f43f5e', label: 'SCHOOL OVERVIEW · TUESDAY', title: '1,290 students present today. School at 96%.', sub: '14 new admission applications this week. 3 need review.' },
    parent: { accent: '#6366f1', label: "YOUR CHILD · AARAV MEHTA", title: 'Grade 9 — Section A · Roll No. 14', sub: 'Attendance 94.2% · GPA 8.7 · Fees due May 30' },
  };
  const c = configs[role];
  return (
    <View style={[styles.banner, { borderLeftColor: c.accent, borderLeftWidth: 4 }]}>
      <Text style={[styles.bannerLabel, { color: c.accent }]}>{c.label}</Text>
      <Text style={styles.bannerTitle}>{c.title}</Text>
      <Text style={styles.bannerSub}>{c.sub}</Text>
    </View>
  );
}

function StudentDash() {
  const todayClasses = TIMETABLE.Monday.slice(0, 4);
  const pending = HOMEWORK.filter(h => h.status === 'pending').slice(0, 3);
  return (
    <>
      <View style={styles.statsRow}>
        <StatCard icon="✅" label="Attendance" value="94.2%" sub="155/165 days" accent="emerald" />
        <StatCard icon="🏅" label="GPA" value="8.7" sub="Last: 8.4" accent="amber" />
      </View>
      <View style={styles.statsRow}>
        <StatCard icon="🏆" label="Class Rank" value="3rd" sub="of 40" accent="rose" />
        <StatCard icon="📋" label="Pending" value="5" sub="2 due tomorrow" accent="indigo" />
      </View>

      <Card>
        <SectionHeader title="Today's Classes" subtitle="Monday · 12 May" />
        {todayClasses.map((c, i) => (
          <View key={i} style={styles.classRow}>
            <View style={[styles.classIcon, { backgroundColor: c.color }]}>
              <Text style={styles.classIconText}>📚</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.className}>{c.subject}</Text>
              <Text style={styles.classDetail}>{c.teacher} · Room {c.room}</Text>
            </View>
            <Text style={styles.classTime}>{c.time}</Text>
          </View>
        ))}
      </Card>

      <Card>
        <SectionHeader title="Performance" subtitle="Last Assessment" />
        <BarChart
          data={PERFORMANCE_DATA}
          width={W - 64}
          height={180}
          chartConfig={chartConfig}
          style={{ borderRadius: 12, marginLeft: -16 }}
          showValuesOnTopOfBars
          withInnerLines={false}
        />
      </Card>

      <Card>
        <SectionHeader title="Pending Tasks" subtitle="Action Needed" />
        {pending.map(h => (
          <View key={h.id} style={styles.hwRow}>
            <View style={{ flex: 1 }}>
              <Pill label={h.subject} variant={h.priority === 'high' ? 'danger' : 'info'} />
              <Text style={styles.hwTitle} numberOfLines={2}>{h.title}</Text>
              <Text style={styles.hwDue}>Due {h.due} · {h.teacher}</Text>
            </View>
            <View style={[styles.hwStatus, { backgroundColor: h.status === 'pending' ? '#fef3c7' : '#d1fae5' }]}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: h.status === 'pending' ? '#92400e' : '#065f46' }}>
                {h.status === 'pending' ? 'Pending' : 'Done'}
              </Text>
            </View>
          </View>
        ))}
      </Card>

      <Card>
        <SectionHeader title="Announcements" subtitle="Latest" />
        {ANNOUNCEMENTS.slice(0, 3).map(a => (
          <View key={a.id} style={styles.annoRow}>
            <View style={[styles.annoAccent, { backgroundColor: a.urgent ? COLORS.rose : COLORS.gold }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.annoDate}>{a.date}</Text>
              <Text style={styles.annoTitle}>{a.title}</Text>
              <Text style={styles.annoAuthor}>— {a.author}</Text>
            </View>
          </View>
        ))}
      </Card>
    </>
  );
}

function TeacherDash() {
  return (
    <>
      <View style={styles.statsRow}>
        <StatCard icon="👥" label="Students" value="194" sub="5 classes" accent="emerald" />
        <StatCard icon="📊" label="Attendance" value="92.4%" sub="This month" accent="amber" />
      </View>
      <View style={styles.statsRow}>
        <StatCard icon="📝" label="To Grade" value="42" sub="Submissions" accent="rose" />
        <StatCard icon="⭐" label="My Rating" value="4.8" sub="Student feedback" accent="indigo" />
      </View>

      <Card>
        <SectionHeader title="Quick Actions" subtitle="Today" />
        {[
          { icon: 'checkmark-circle', label: 'Mark Attendance', color: COLORS.emerald },
          { icon: 'add-circle', label: 'Assign Homework', color: COLORS.gold },
          { icon: 'cloud-upload', label: 'Upload Notes', color: COLORS.indigo },
          { icon: 'create', label: 'Update Gradebook', color: COLORS.rose },
        ].map((a, i) => (
          <TouchableOpacity key={i} style={styles.actionRow} activeOpacity={0.7}>
            <View style={[styles.actionIcon, { backgroundColor: a.color + '20' }]}>
              <Ionicons name={a.icon} size={20} color={a.color} />
            </View>
            <Text style={styles.actionLabel}>{a.label}</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
          </TouchableOpacity>
        ))}
      </Card>

      <Card>
        <SectionHeader title="My Classes" subtitle="Teaching" />
        {[
          { cls: 'Grade 8 — A', next: 'Today, 11:15 AM', avg: 84 },
          { cls: 'Grade 9 — A', next: 'Tomorrow, 8:00 AM', avg: 87 },
          { cls: 'Grade 10 — A', next: 'Wed, 9:00 AM', avg: 91 },
        ].map((c, i) => (
          <View key={i} style={styles.classRow}>
            <View style={[styles.classIcon, { backgroundColor: '#d1fae5' }]}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#065f46' }}>
                {c.cls.match(/\d+/)?.[0]}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.className}>{c.cls} · Avg {c.avg}%</Text>
              <Text style={styles.classDetail}>Next: {c.next}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
          </View>
        ))}
      </Card>
    </>
  );
}

function HeadDash() {
  return (
    <>
      <View style={styles.statsRow}>
        <StatCard icon="👨‍🎓" label="Students" value="1,290" sub="This year" accent="amber" />
        <StatCard icon="👩‍🏫" label="Faculty" value="87" sub="6 new this term" accent="emerald" />
      </View>
      <View style={styles.statsRow}>
        <StatCard icon="📈" label="Attendance" value="91.6%" sub="School-wide" accent="rose" />
        <StatCard icon="💰" label="Fees" value="₹4.2Cr" sub="This term" accent="indigo" />
      </View>

      <Card>
        <SectionHeader title="Recent Applications" subtitle="Admissions" />
        {[
          { name: 'Ishaan Reddy', grade: 'Grade 6', status: 'interview-scheduled', score: 88 },
          { name: 'Saanvi Iyer', grade: 'Grade 4', status: 'under-review', score: 92 },
          { name: 'Vihaan Khan', grade: 'Grade 9', status: 'accepted', score: 95 },
          { name: 'Anaya Pillai', grade: 'Grade 1', status: 'documents-pending', score: 79 },
        ].map((a, i) => (
          <View key={i} style={styles.classRow}>
            <View style={[styles.classIcon, { backgroundColor: '#f5f5f4' }]}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: COLORS.textMuted }}>
                {a.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.className}>{a.name}</Text>
              <Text style={styles.classDetail}>{a.grade} · Score {a.score}%</Text>
            </View>
            <Pill
              label={a.status.replace('-', ' ')}
              variant={a.status === 'accepted' ? 'success' : a.status === 'documents-pending' ? 'warning' : 'info'}
            />
          </View>
        ))}
      </Card>

      <Card>
        <SectionHeader title="Faculty Highlights" subtitle="Active Staff" />
        {TEACHERS_LIST.slice(0, 4).map((t, i) => (
          <View key={i} style={styles.classRow}>
            <View style={[styles.classIcon, { backgroundColor: '#d1fae5' }]}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#065f46' }}>
                {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.className}>{t.name}</Text>
              <Text style={styles.classDetail}>{t.subject} · {t.experience}</Text>
            </View>
            <Text style={styles.rating}>⭐ {t.rating}</Text>
          </View>
        ))}
      </Card>
    </>
  );
}

function ParentDash() {
  const pending = HOMEWORK.filter(h => h.status === 'pending').slice(0, 3);
  return (
    <>
      <View style={styles.statsRow}>
        <StatCard icon="✅" label="Attendance" value="94.2%" sub="Excellent" accent="emerald" />
        <StatCard icon="🏅" label="GPA" value="8.7" sub="Class avg 7.6" accent="amber" />
      </View>
      <View style={styles.statsRow}>
        <StatCard icon="💳" label="Fees Due" value="₹60K" sub="By May 30" accent="rose" />
        <StatCard icon="🚌" label="Bus ETA" value="7:42 AM" sub="Bus B-01" accent="indigo" />
      </View>

      <Card style={styles.alertCard}>
        <View style={styles.alertHeader}>
          <Ionicons name="alert-circle" size={18} color={COLORS.rose} />
          <Text style={styles.alertLabel}>ACTION REQUIRED</Text>
        </View>
        <Text style={styles.alertTitle}>Fee Payment Due</Text>
        <Text style={styles.alertBody}>Term 3 + Activity & Transport totalling ₹60,000 is due by 30 May 2026.</Text>
        <TouchableOpacity style={styles.alertBtn}>
          <Text style={styles.alertBtnText}>Pay Now →</Text>
        </TouchableOpacity>
      </Card>

      <Card>
        <SectionHeader title="Homework Status" subtitle="Aarav's Tasks" />
        {pending.map(h => (
          <View key={h.id} style={styles.hwRow}>
            <View style={{ flex: 1 }}>
              <Pill label={h.subject} variant="default" />
              <Text style={styles.hwTitle} numberOfLines={2}>{h.title}</Text>
              <Text style={styles.hwDue}>Due {h.due}</Text>
            </View>
            <Pill label="Pending" variant="warning" />
          </View>
        ))}
      </Card>

      <Card>
        <SectionHeader title="Announcements" subtitle="School Updates" />
        {ANNOUNCEMENTS.slice(0, 3).map(a => (
          <View key={a.id} style={styles.annoRow}>
            <View style={[styles.annoAccent, { backgroundColor: a.urgent ? COLORS.rose : COLORS.indigo }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.annoDate}>{a.date}</Text>
              <Text style={styles.annoTitle}>{a.title}</Text>
            </View>
          </View>
        ))}
      </Card>
    </>
  );
}

export default function DashboardScreen({ role }) {
  const user = ROLES[role];
  const DashContent = { student: StudentDash, teacher: TeacherDash, head: HeadDash, parent: ParentDash }[role];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
      <BannerCard role={role} />
      <View style={styles.content}>
        <DashContent />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.ivory },
  banner: {
    backgroundColor: COLORS.ink,
    padding: 24,
    paddingTop: 20,
    paddingBottom: 28,
  },
  bannerLabel: { fontSize: 10, letterSpacing: 2, fontWeight: '600', marginBottom: 8 },
  bannerTitle: { fontSize: 20, fontWeight: '800', color: '#fefce8', lineHeight: 27, letterSpacing: -0.3, marginBottom: 8 },
  bannerSub: { fontSize: 13, color: 'rgba(253,230,138,0.6)', lineHeight: 18 },
  content: { padding: 16, gap: 4 },
  statsRow: { flexDirection: 'row', marginBottom: 0 },
  classRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border, gap: 12 },
  classIcon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  classIconText: { fontSize: 18 },
  className: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  classDetail: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  classTime: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  hwRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border, gap: 12 },
  hwTitle: { fontSize: 13, fontWeight: '600', color: COLORS.text, marginTop: 6, marginBottom: 4 },
  hwDue: { fontSize: 11, color: COLORS.textMuted },
  hwStatus: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  annoRow: { flexDirection: 'row', paddingVertical: 10, gap: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  annoAccent: { width: 3, borderRadius: 2, alignSelf: 'stretch' },
  annoDate: { fontSize: 10, color: COLORS.textLight, marginBottom: 4 },
  annoTitle: { fontSize: 13, fontWeight: '600', color: COLORS.text, lineHeight: 18 },
  annoAuthor: { fontSize: 11, color: COLORS.textMuted, marginTop: 4 },
  actionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 14, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  actionIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  actionLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: COLORS.text },
  rating: { fontSize: 13, fontWeight: '600', color: COLORS.gold },
  alertCard: { borderColor: '#fecaca', backgroundColor: '#fff1f2' },
  alertHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  alertLabel: { fontSize: 10, letterSpacing: 1.5, fontWeight: '700', color: COLORS.rose },
  alertTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  alertBody: { fontSize: 13, color: COLORS.textMuted, lineHeight: 18, marginBottom: 14 },
  alertBtn: { backgroundColor: COLORS.rose, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 18, alignSelf: 'flex-start' },
  alertBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
