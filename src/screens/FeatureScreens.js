import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { COLORS, HOMEWORK, ANNOUNCEMENTS, BUS_ROUTES, EXAM_RESULTS, FEES_DATA, GALLERY_ALBUMS, EVENTS, ATTENDANCE_DATA } from '../data/mockData';
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
};

// ---- ATTENDANCE ----
export function AttendanceScreen({ role }) {
  const [view, setView] = useState('calendar');
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const absentDays = [3, 11, 17, 24];
  const holidays = [1, 8, 15, 22, 29];
  const today = 12;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.statsRow}>
        <StatCard icon="✅" label="Present" value="155" sub="This year" accent="emerald" />
        <StatCard icon="❌" label="Absent" value="10" accent="rose" />
        <StatCard icon="📊" label="Rate" value="94.2%" accent="amber" />
      </View>

      <Card>
        <View style={styles.rowBetween}>
          <SectionHeader title="May 2026" subtitle="Monthly View" />
          <View style={styles.toggleRow}>
            {['calendar', 'chart'].map(v => (
              <TouchableOpacity key={v} style={[styles.toggleBtn, view === v && styles.toggleBtnActive]} onPress={() => setView(v)}>
                <Text style={[styles.toggleText, view === v && styles.toggleTextActive]}>{v}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {view === 'calendar' ? (
          <>
            <View style={styles.calDays}>
              {['M','T','W','T','F','S','S'].map((d, i) => (
                <Text key={i} style={styles.calDayLabel}>{d}</Text>
              ))}
            </View>
            <View style={styles.calGrid}>
              {days.map(d => {
                const isAbsent = absentDays.includes(d);
                const isHoliday = holidays.includes(d);
                const isToday = d === today;
                const isFuture = d > today;
                let bg = '#d1fae5', tc = '#065f46';
                if (isToday) { bg = COLORS.ink; tc = '#fef3c7'; }
                else if (isAbsent) { bg = '#fee2e2'; tc = '#991b1b'; }
                else if (isHoliday) { bg = '#fef3c7'; tc = '#92400e'; }
                else if (isFuture) { bg = COLORS.stone; tc = COLORS.textLight; }
                return (
                  <View key={d} style={[styles.calCell, { backgroundColor: bg }]}>
                    <Text style={[styles.calCellText, { color: tc }]}>{d}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.legend}>
              {[['#d1fae5','Present'],['#fee2e2','Absent'],['#fef3c7','Holiday'],['#0f172a','Today']].map(([color, label]) => (
                <View key={label} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: color }]} />
                  <Text style={styles.legendText}>{label}</Text>
                </View>
              ))}
            </View>
          </>
        ) : (
          <BarChart
            data={ATTENDANCE_DATA}
            width={W - 64}
            height={200}
            chartConfig={chartConfig}
            style={{ borderRadius: 12, marginLeft: -16 }}
            withInnerLines={false}
          />
        )}
      </Card>

      {role === 'teacher' && (
        <Card>
          <SectionHeader title="Mark Attendance — Grade 9A" subtitle="Quick Mark" />
          <View style={styles.markGrid}>
            {['Aarav M.','Saanvi I.','Vihaan K.','Anaya P.','Arjun D.','Myra J.','Kavya R.','Reyansh S.'].map((name, i) => (
              <TouchableOpacity key={i} style={styles.markCard}>
                <Ionicons name="checkmark-circle" size={16} color={COLORS.emerald} />
                <Text style={styles.markName}>{name}</Text>
                <Text style={styles.markStatus}>P</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Save Attendance</Text>
          </TouchableOpacity>
        </Card>
      )}
    </ScrollView>
  );
}

// ---- HOMEWORK ----
export function HomeworkScreen({ role }) {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? HOMEWORK : HOMEWORK.filter(h => h.status === filter);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.filterRow}>
        {['all', 'pending', 'submitted'].map(f => (
          <TouchableOpacity key={f} style={[styles.filterBtn, filter === f && styles.filterBtnActive]} onPress={() => setFilter(f)}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ padding: 16, gap: 10 }}>
        {filtered.map(h => (
          <View key={h.id} style={styles.hwCard}>
            <View style={styles.hwCardHeader}>
              <Pill label={h.subject} variant={h.priority === 'high' ? 'danger' : 'default'} />
              <Pill label={h.status === 'submitted' ? '✓ Submitted' : 'Pending'} variant={h.status === 'submitted' ? 'success' : 'warning'} />
            </View>
            <Text style={styles.hwCardTitle}>{h.title}</Text>
            <View style={styles.hwCardMeta}>
              <Text style={styles.hwCardMetaText}>👤 {h.teacher}</Text>
              <Text style={styles.hwCardMetaText}>🕐 Due {h.due}</Text>
            </View>
            {h.status === 'pending' && role !== 'parent' && (
              <TouchableOpacity style={styles.submitBtn}>
                <Text style={styles.submitBtnText}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// ---- ANNOUNCEMENTS ----
export function AnnouncementsScreen({ role }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100, padding: 16 }}>
      {ANNOUNCEMENTS.map(a => (
        <View key={a.id} style={[styles.annoCard, a.urgent && styles.annoCardUrgent]}>
          <View style={styles.annoCardHeader}>
            <Pill label={a.type} variant={a.type === 'transport' ? 'danger' : a.type === 'event' ? 'success' : 'default'} />
            {a.urgent && <Pill label="⚠ Urgent" variant="danger" />}
            <Text style={styles.annoCardDate}>{a.date}</Text>
          </View>
          <Text style={styles.annoCardTitle}>{a.title}</Text>
          <Text style={styles.annoCardBody}>{a.body}</Text>
          <Text style={styles.annoCardAuthor}>— {a.author}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

// ---- BUS TRACKING ----
export function BusScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Live card */}
      <View style={styles.busBanner}>
        <Text style={styles.busLabel}>LIVE TRACKING</Text>
        <Text style={styles.busTitle}>Bus B-01 — Indiranagar Route</Text>
        <Text style={styles.busSub}>Aarav boards at Domlur Stop · Pickup 7:15 AM</Text>
        <View style={styles.busStats}>
          <View>
            <Text style={styles.busStatVal}>7:42</Text>
            <Text style={styles.busStatLbl}>ETA SCHOOL</Text>
          </View>
          <View style={styles.busDivider} />
          <View>
            <Text style={styles.busStatVal}>2.3 km</Text>
            <Text style={styles.busStatLbl}>REMAINING</Text>
          </View>
          <View style={styles.busDivider} />
          <View>
            <Text style={styles.busStatVal}>On Time</Text>
            <Text style={styles.busStatLbl}>STATUS</Text>
          </View>
        </View>
      </View>

      {/* Map placeholder */}
      <View style={styles.mapPlaceholder}>
        <View style={styles.mapRoute} />
        <View style={[styles.mapPin, { left: '10%', bottom: '20%' }]}>
          <Ionicons name="location" size={22} color={COLORS.emerald} />
          <Text style={styles.mapLabel}>Start</Text>
        </View>
        <View style={[styles.busIcon, { left: '45%', top: '35%' }]}>
          <Ionicons name="bus" size={22} color="#fff" />
        </View>
        <View style={[styles.mapPin, { right: '8%', top: '15%' }]}>
          <Ionicons name="school" size={22} color={COLORS.rose} />
          <Text style={styles.mapLabel}>School</Text>
        </View>
        <Text style={styles.mapWatermark}>Scholaria Live Map</Text>
      </View>

      <View style={{ padding: 16, gap: 10 }}>
        <Text style={styles.sectionLabel}>ALL ROUTES</Text>
        {BUS_ROUTES.map(b => (
          <View key={b.id} style={styles.busCard}>
            <View style={styles.busCardHeader}>
              <Text style={styles.busId}>{b.id}</Text>
              <Pill
                label={b.status.replace('-', ' ')}
                variant={b.status === 'arrived' ? 'success' : b.status === 'on-route' ? 'info' : b.status === 'delayed' ? 'warning' : 'danger'}
              />
            </View>
            <Text style={styles.busRoute}>{b.route}</Text>
            <View style={styles.busCardMeta}>
              <Text style={styles.busMetaText}>👤 {b.driver}</Text>
              <Text style={styles.busMetaText}>👨‍🎓 {b.students} students</Text>
              <Text style={styles.busMetaText}>🕐 {b.eta}</Text>
            </View>
            <Text style={styles.busStop}>📍 {b.currentStop} → {b.nextStop}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// ---- EXAMS ----
export function ExamsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.statsRow}>
        <StatCard icon="🏅" label="Overall" value="88.2%" sub="+3.4%" accent="amber" />
        <StatCard icon="🏆" label="Class Rank" value="3rd" sub="of 40" accent="rose" />
      </View>
      <View style={styles.statsRow}>
        <StatCard icon="🎯" label="School Rank" value="27th" sub="of 480" accent="indigo" />
        <StatCard icon="📈" label="Improvement" value="+12%" sub="vs last term" accent="emerald" />
      </View>

      <Card>
        <SectionHeader title="Exam Results" subtitle="Mid-term · Mar 2026" />
        {EXAM_RESULTS.map((r, i) => (
          <View key={i} style={styles.examRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.examSubject}>{r.subject}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${r.score}%` }]} />
              </View>
            </View>
            <Text style={styles.examScore}>{r.score}</Text>
            <Pill label={r.grade} variant={r.grade.startsWith('A') ? 'gold' : 'info'} />
          </View>
        ))}
      </Card>

      <Card>
        <SectionHeader title="Upcoming Exams" subtitle="Schedule" />
        {[
          { date: 'May 28', subject: 'Mathematics', hall: 'Hall A', time: '9:00 AM' },
          { date: 'May 30', subject: 'Science', hall: 'Hall B', time: '9:00 AM' },
          { date: 'Jun 02', subject: 'English', hall: 'Hall A', time: '9:00 AM' },
          { date: 'Jun 04', subject: 'Social Studies', hall: 'Hall C', time: '9:00 AM' },
        ].map((e, i) => (
          <View key={i} style={styles.upcomingRow}>
            <View style={styles.upcomingDate}>
              <Text style={styles.upcomingDateText}>{e.date.split(' ')[1]}</Text>
              <Text style={styles.upcomingMonth}>{e.date.split(' ')[0]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.examSubject}>{e.subject}</Text>
              <Text style={styles.examMeta}>{e.time} · {e.hall}</Text>
            </View>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

// ---- FEES ----
export function FeesScreen() {
  const total = FEES_DATA.reduce((s, f) => s + f.amount, 0);
  const paid = FEES_DATA.filter(f => f.status === 'paid').reduce((s, f) => s + f.amount, 0);
  const pct = Math.round((paid / total) * 100);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.feesBanner}>
        <Text style={styles.feesLabel}>ACADEMIC YEAR 2026–27</Text>
        <Text style={styles.feesTotal}>₹{total.toLocaleString()}</Text>
        <Text style={styles.feesSub}>Total fees</Text>
        <View style={styles.feeProgressRow}>
          <View style={styles.feeProgressBg}>
            <View style={[styles.feeProgressFill, { width: `${pct}%` }]} />
          </View>
          <Text style={styles.feeProgressPct}>{pct}%</Text>
        </View>
        <Text style={styles.feesDetail}>₹{paid.toLocaleString()} paid · ₹{(total - paid).toLocaleString()} pending</Text>
      </View>

      <View style={{ padding: 16, gap: 10 }}>
        {FEES_DATA.map((f, i) => (
          <View key={i} style={styles.feeCard}>
            <View style={styles.feeCardHeader}>
              <Text style={styles.feeTerm}>{f.term}</Text>
              <Pill label={f.status} variant={f.status === 'paid' ? 'success' : 'danger'} />
            </View>
            <Text style={styles.feeAmount}>₹{f.amount.toLocaleString()}</Text>
            <View style={styles.feeMeta}>
              <Text style={styles.feeMetaText}>Due: {f.dueDate}</Text>
              <Text style={styles.feeMetaText}>Paid: {f.paidOn}</Text>
            </View>
            {f.status === 'pending' && (
              <TouchableOpacity style={styles.payBtn}>
                <Text style={styles.payBtnText}>Pay Now</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// ---- GALLERY ----
export function GalleryScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100, padding: 16 }}>
      <View style={styles.galleryGrid}>
        {GALLERY_ALBUMS.map(g => (
          <TouchableOpacity key={g.id} style={styles.galleryCard} activeOpacity={0.85}>
            <View style={[styles.galleryCover, { backgroundColor: g.color1 }]}>
              <View style={[StyleSheet.absoluteFill, { backgroundColor: g.color2, opacity: 0.4, borderRadius: 16 }]} />
              <Text style={styles.galleryCount}>{g.count} photos</Text>
            </View>
            <Text style={styles.galleryTitle}>{g.title}</Text>
            <Text style={styles.galleryDate}>{g.date}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// ---- CALENDAR ----
export function CalendarScreen() {
  const days = Array.from({ length: 35 }, (_, i) => {
    const d = i - 3;
    return d > 0 && d <= 31 ? d : null;
  });
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <Card style={{ margin: 16 }}>
        <SectionHeader title="May 2026" subtitle="School Calendar" />
        <View style={styles.calDays}>
          {['M','T','W','T','F','S','S'].map((d, i) => (
            <Text key={i} style={styles.calDayLabel}>{d}</Text>
          ))}
        </View>
        <View style={styles.calGrid}>
          {days.map((d, i) => {
            const hasEvent = d && EVENTS.find(e => e.date === d);
            const isToday = d === 12;
            return (
              <View key={i} style={[
                styles.calCell,
                { backgroundColor: !d ? 'transparent' : isToday ? COLORS.ink : hasEvent ? '#fef3c7' : COLORS.stone }
              ]}>
                {d ? <Text style={[styles.calCellText, { color: isToday ? '#fefce8' : COLORS.text }]}>{d}</Text> : null}
                {hasEvent ? <View style={styles.calEventDot} /> : null}
              </View>
            );
          })}
        </View>
      </Card>

      <View style={{ paddingHorizontal: 16 }}>
        <Text style={styles.sectionLabel}>UPCOMING EVENTS</Text>
        {EVENTS.map((e, i) => (
          <View key={i} style={styles.eventRow}>
            <View style={styles.eventDate}>
              <Text style={styles.eventDateNum}>{e.date}</Text>
              <Text style={styles.eventDay}>{e.day}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Pill label={e.type} variant={e.type === 'exam' ? 'danger' : e.type === 'meeting' ? 'info' : 'success'} />
              <Text style={styles.eventTitle}>{e.title}</Text>
              <Text style={styles.eventTime}>🕐 {e.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.ivory },
  statsRow: { flexDirection: 'row', padding: 8, paddingBottom: 0 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  filterRow: {
    flexDirection: 'row', gap: 8, padding: 16,
    backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.stone },
  filterBtnActive: { backgroundColor: COLORS.ink },
  filterText: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted, textTransform: 'capitalize' },
  filterTextActive: { color: '#fefce8' },
  toggleRow: { flexDirection: 'row', gap: 6 },
  toggleBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, backgroundColor: COLORS.stone },
  toggleBtnActive: { backgroundColor: COLORS.ink },
  toggleText: { fontSize: 12, fontWeight: '600', color: COLORS.textMuted, textTransform: 'capitalize' },
  toggleTextActive: { color: '#fefce8' },
  calDays: { flexDirection: 'row', marginBottom: 6 },
  calDayLabel: { flex: 1, textAlign: 'center', fontSize: 11, fontWeight: '700', color: COLORS.textMuted, textTransform: 'uppercase' },
  calGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  calCell: { width: `${100/7}%`, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginVertical: 2 },
  calCellText: { fontSize: 13, fontWeight: '700' },
  calEventDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: COLORS.gold, position: 'absolute', bottom: 4 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 14 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 12, height: 12, borderRadius: 4 },
  legendText: { fontSize: 11, color: COLORS.textMuted },
  markGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  markCard: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#ecfdf5', borderRadius: 10, padding: 10,
    borderWidth: 1, borderColor: '#a7f3d0', width: '47%',
  },
  markName: { flex: 1, fontSize: 12, fontWeight: '600', color: '#065f46' },
  markStatus: { fontSize: 11, fontWeight: '800', color: '#065f46' },
  saveBtn: { backgroundColor: COLORS.ink, borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  saveBtnText: { color: '#fefce8', fontWeight: '700', fontSize: 14 },
  hwCard: {
    backgroundColor: COLORS.white, borderRadius: 18, padding: 16,
    borderWidth: 1, borderColor: COLORS.border,
  },
  hwCardHeader: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  hwCardTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text, lineHeight: 20, marginBottom: 10 },
  hwCardMeta: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  hwCardMetaText: { fontSize: 12, color: COLORS.textMuted },
  submitBtn: { backgroundColor: COLORS.ink, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 14, alignSelf: 'flex-end' },
  submitBtnText: { color: '#fefce8', fontWeight: '700', fontSize: 13 },
  annoCard: {
    backgroundColor: COLORS.white, borderRadius: 18, padding: 18,
    borderWidth: 1, borderColor: COLORS.border, marginBottom: 10,
  },
  annoCardUrgent: { borderColor: '#fecaca', backgroundColor: '#fff9f9' },
  annoCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  annoCardDate: { fontSize: 11, color: COLORS.textLight, marginLeft: 'auto' },
  annoCardTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, lineHeight: 22, marginBottom: 8 },
  annoCardBody: { fontSize: 13, color: COLORS.textMuted, lineHeight: 19, marginBottom: 10 },
  annoCardAuthor: { fontSize: 11, color: COLORS.textLight },
  busBanner: {
    backgroundColor: COLORS.ink, padding: 24,
    borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
  },
  busLabel: { fontSize: 10, letterSpacing: 2, color: COLORS.gold, fontWeight: '600', marginBottom: 8 },
  busTitle: { fontSize: 20, fontWeight: '800', color: '#fefce8', marginBottom: 6 },
  busSub: { fontSize: 13, color: 'rgba(253,230,138,0.6)', marginBottom: 20 },
  busStats: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  busStatVal: { fontSize: 22, fontWeight: '800', color: COLORS.gold },
  busStatLbl: { fontSize: 9, letterSpacing: 1.5, color: 'rgba(253,230,138,0.5)', textTransform: 'uppercase', marginTop: 2 },
  busDivider: { width: 1, height: 40, backgroundColor: 'rgba(253,230,138,0.2)' },
  mapPlaceholder: {
    height: 200, backgroundColor: '#e5e7eb', margin: 16, borderRadius: 20,
    position: 'relative', overflow: 'hidden', alignItems: 'center', justifyContent: 'center',
  },
  mapRoute: {
    position: 'absolute', width: '80%', height: 3,
    backgroundColor: COLORS.gold, borderRadius: 2, top: '50%',
    transform: [{ rotate: '-10deg' }],
  },
  mapPin: { position: 'absolute', alignItems: 'center' },
  mapLabel: { fontSize: 10, fontWeight: '700', color: COLORS.text, marginTop: 2 },
  busIcon: {
    position: 'absolute', width: 44, height: 44, borderRadius: 22,
    backgroundColor: COLORS.gold, alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.gold, shadowOpacity: 0.5, shadowRadius: 10, shadowOffset: { width: 0, height: 2 },
  },
  mapWatermark: { position: 'absolute', bottom: 10, fontSize: 10, color: COLORS.textLight },
  busCard: {
    backgroundColor: COLORS.white, borderRadius: 18, padding: 16,
    borderWidth: 1, borderColor: COLORS.border,
  },
  busCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  busId: { fontSize: 18, fontWeight: '800', color: COLORS.text, letterSpacing: -0.5 },
  busRoute: { fontSize: 14, fontWeight: '600', color: COLORS.text, marginBottom: 8 },
  busCardMeta: { flexDirection: 'row', gap: 14, marginBottom: 6 },
  busMetaText: { fontSize: 12, color: COLORS.textMuted },
  busStop: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },
  sectionLabel: { fontSize: 10, letterSpacing: 2, color: COLORS.gold, fontWeight: '700', marginBottom: 12, textTransform: 'uppercase' },
  examRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  examSubject: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 6 },
  examMeta: { fontSize: 12, color: COLORS.textMuted },
  progressBar: { height: 6, backgroundColor: COLORS.stone, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.gold, borderRadius: 3 },
  examScore: { fontSize: 20, fontWeight: '800', color: COLORS.text, letterSpacing: -0.5, width: 36, textAlign: 'right' },
  upcomingRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  upcomingDate: { width: 48, height: 48, backgroundColor: '#fef3c7', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  upcomingDateText: { fontSize: 18, fontWeight: '800', color: '#92400e', letterSpacing: -0.5 },
  upcomingMonth: { fontSize: 9, fontWeight: '700', color: '#92400e', textTransform: 'uppercase', letterSpacing: 1 },
  feesBanner: { backgroundColor: COLORS.ink, padding: 28, paddingTop: 24 },
  feesLabel: { fontSize: 10, letterSpacing: 2, color: COLORS.gold, fontWeight: '600', marginBottom: 8 },
  feesTotal: { fontSize: 36, fontWeight: '800', color: '#fefce8', letterSpacing: -1, marginBottom: 4 },
  feesSub: { fontSize: 13, color: 'rgba(253,230,138,0.6)', marginBottom: 16 },
  feeProgressRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  feeProgressBg: { flex: 1, height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' },
  feeProgressFill: { height: '100%', backgroundColor: COLORS.gold, borderRadius: 4 },
  feeProgressPct: { fontSize: 14, fontWeight: '700', color: COLORS.gold },
  feesDetail: { fontSize: 12, color: 'rgba(253,230,138,0.5)', marginTop: 8 },
  feeCard: { backgroundColor: COLORS.white, borderRadius: 18, padding: 16, borderWidth: 1, borderColor: COLORS.border },
  feeCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  feeTerm: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  feeAmount: { fontSize: 24, fontWeight: '800', color: COLORS.text, letterSpacing: -0.5, marginBottom: 8 },
  feeMeta: { flexDirection: 'row', gap: 16 },
  feeMetaText: { fontSize: 12, color: COLORS.textMuted },
  payBtn: { backgroundColor: COLORS.gold, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 16, alignSelf: 'flex-start', marginTop: 12 },
  payBtnText: { color: COLORS.ink, fontWeight: '700', fontSize: 13 },
  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  galleryCard: { width: (W - 44) / 2 },
  galleryCover: { height: 130, borderRadius: 16, marginBottom: 8, alignItems: 'flex-end', justifyContent: 'flex-start', padding: 10 },
  galleryCount: { backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, fontSize: 10, fontWeight: '600', color: '#fff' },
  galleryTitle: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  galleryDate: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  eventRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  eventDate: { width: 50, height: 50, backgroundColor: COLORS.stone, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  eventDateNum: { fontSize: 20, fontWeight: '800', color: COLORS.text, letterSpacing: -0.5 },
  eventDay: { fontSize: 10, fontWeight: '700', color: COLORS.textMuted, textTransform: 'uppercase' },
  eventTitle: { fontSize: 13, fontWeight: '600', color: COLORS.text, marginTop: 6, marginBottom: 4 },
  eventTime: { fontSize: 11, color: COLORS.textMuted },
});
