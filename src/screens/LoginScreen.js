import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../data/mockData';

const ROLE_OPTIONS = [
  { key: 'student', title: 'Student', desc: 'Track classes, homework & progress', icon: 'school', color: '#c89c4a' },
  { key: 'teacher', title: 'Teacher', desc: 'Manage classes, attendance & grading', icon: 'book', color: '#10b981' },
  { key: 'head', title: 'Head of Teachers', desc: 'School-wide academic oversight', icon: 'shield-checkmark', color: '#f43f5e' },
  { key: 'parent', title: 'Parent', desc: "Stay connected with your child's journey", icon: 'heart', color: '#6366f1' },
  { key: 'driver', title: 'Bus Driver', desc: 'Broadcast live GPS & manage boarding', icon: 'bus', color: '#0ea5e9' },
];

export default function LoginScreen({ onLogin }) {
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.ink} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Ionicons name="school" size={28} color={COLORS.ink} />
          </View>
          <Text style={styles.brandName}>Scholaria</Text>
          <Text style={styles.brandTagline}>EST. MMXXVI</Text>
        </View>

        {/* Hero text */}
        <View style={styles.hero}>
          <Text style={styles.heroLabel}>A NEW ERA IN EDUCATION</Text>
          <Text style={styles.heroTitle}>Where minds{'\n'}flourish &{'\n'}futures begin.</Text>
          <Text style={styles.heroSub}>
            One unified platform for students, faculty, leadership, and families.
          </Text>
        </View>

        {/* Stats strip */}
        <View style={styles.statsRow}>
          {[['12,400+', 'Schools'], ['2.1M', 'Students'], ['98.7%', 'Satisfaction']].map(([val, lbl]) => (
            <View key={lbl} style={styles.statItem}>
              <Text style={styles.statVal}>{val}</Text>
              <Text style={styles.statLbl}>{lbl}</Text>
            </View>
          ))}
        </View>

        {/* Role selector */}
        <View style={styles.selectorBox}>
          <Text style={styles.selectorLabel}>WELCOME BACK</Text>
          <Text style={styles.selectorTitle}>Sign in to continue</Text>
          <Text style={styles.selectorSub}>Choose how you'd like to enter Scholaria today.</Text>

          <View style={styles.roles}>
            {ROLE_OPTIONS.map((r) => (
              <TouchableOpacity
                key={r.key}
                style={[styles.roleCard, selected === r.key && styles.roleCardActive]}
                onPress={() => setSelected(r.key)}
                activeOpacity={0.8}
              >
                <View style={[styles.roleIcon, { backgroundColor: r.color }]}>
                  <Ionicons name={r.icon} size={22} color="#fff" />
                </View>
                <View style={styles.roleText}>
                  <Text style={styles.roleTitle}>{r.title}</Text>
                  <Text style={styles.roleDesc}>{r.desc}</Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={selected === r.key ? COLORS.ink : COLORS.textLight}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.loginBtn, !selected && styles.loginBtnDisabled]}
            onPress={() => selected && onLogin(selected)}
            disabled={!selected}
            activeOpacity={0.85}
          >
            <Text style={styles.loginBtnText}>
              {selected ? `Enter as ${ROLE_OPTIONS.find(r => r.key === selected)?.title}` : 'Select a role above'}
            </Text>
            {selected && <Ionicons name="arrow-forward" size={18} color={COLORS.ink} style={{ marginLeft: 8 }} />}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.ink },
  container: { paddingBottom: 40 },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  logoBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: COLORS.gold,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  brandName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fefce8',
    letterSpacing: -0.5,
  },
  brandTagline: {
    fontSize: 10,
    letterSpacing: 3,
    color: 'rgba(253,230,138,0.5)',
    marginTop: 2,
  },
  hero: {
    paddingHorizontal: 28,
    marginBottom: 28,
  },
  heroLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: 'rgba(253,230,138,0.6)',
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: '#fefce8',
    lineHeight: 44,
    letterSpacing: -1,
    marginBottom: 14,
  },
  heroSub: {
    fontSize: 15,
    color: 'rgba(253,230,138,0.6)',
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 28,
    marginBottom: 28,
    gap: 24,
  },
  statItem: { flex: 1 },
  statVal: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fefce8',
    letterSpacing: -0.5,
  },
  statLbl: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: 'rgba(253,230,138,0.4)',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  selectorBox: {
    backgroundColor: COLORS.ivory,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 28,
    paddingTop: 32,
  },
  selectorLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: COLORS.gold,
    fontWeight: '600',
    marginBottom: 4,
  },
  selectorTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  selectorSub: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 24,
  },
  roles: { gap: 10, marginBottom: 24 },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    gap: 14,
  },
  roleCardActive: {
    borderColor: COLORS.ink,
    backgroundColor: '#f8fafc',
  },
  roleIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleText: { flex: 1 },
  roleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  roleDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  loginBtn: {
    backgroundColor: COLORS.gold,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginBtnDisabled: {
    backgroundColor: COLORS.border,
  },
  loginBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.ink,
  },
});
