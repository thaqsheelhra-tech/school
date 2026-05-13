import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, TIMETABLE } from '../data/mockData';
import { Card } from '../components/UI';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function TimetableScreen() {
  const [day, setDay] = useState('Monday');
  const classes = TIMETABLE[day];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
      {/* Day tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
        {DAYS.map(d => (
          <TouchableOpacity
            key={d}
            style={[styles.tab, day === d && styles.tabActive]}
            onPress={() => setDay(d)}
          >
            <Text style={[styles.tabText, day === d && styles.tabTextActive]}>{d}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.content}>
        {classes.map((c, i) => {
          const isBreak = c.subject === 'Lunch Break' || c.subject === 'Free Period';
          return (
            <View key={i} style={[styles.row, isBreak && styles.rowBreak]}>
              <View style={styles.timeCol}>
                <Text style={styles.time}>{c.time}</Text>
              </View>
              <View style={[styles.dot, { backgroundColor: isBreak ? COLORS.textLight : COLORS.gold }]} />
              <View style={[styles.classCard, { backgroundColor: c.color || '#f5f5f4' }]}>
                <Text style={styles.subject}>{c.subject}</Text>
                {c.teacher ? <Text style={styles.teacher}>{c.teacher}</Text> : null}
                <Text style={styles.room}>📍 {c.room}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.ivory },
  tabs: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.stone,
  },
  tabActive: { backgroundColor: COLORS.ink },
  tabText: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted },
  tabTextActive: { color: '#fefce8' },
  content: { padding: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 10,
  },
  rowBreak: { opacity: 0.6 },
  timeCol: { width: 52, alignItems: 'flex-end', paddingTop: 14 },
  time: { fontSize: 13, fontWeight: '700', color: COLORS.textMuted },
  dot: { width: 10, height: 10, borderRadius: 5, marginTop: 18 },
  classCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  subject: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  teacher: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },
  room: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },
});
