import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LinearGradient } from 'react-native';
import { COLORS } from '../data/mockData';

export const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

export const Pill = ({ label, variant = 'default' }) => {
  const variants = {
    default: { bg: '#f5f5f4', text: '#57534e' },
    success: { bg: '#d1fae5', text: '#065f46' },
    warning: { bg: '#fef3c7', text: '#92400e' },
    danger: { bg: '#fee2e2', text: '#991b1b' },
    info: { bg: '#e0f2fe', text: '#075985' },
    gold: { bg: '#fef9c3', text: '#854d0e' },
    ink: { bg: '#0f172a', text: '#fef3c7' },
  };
  const v = variants[variant] || variants.default;
  return (
    <View style={[styles.pill, { backgroundColor: v.bg }]}>
      <Text style={[styles.pillText, { color: v.text }]}>{label}</Text>
    </View>
  );
};

export const StatCard = ({ icon, label, value, sub, accent = 'amber' }) => {
  const accents = {
    amber: { bg: '#fffbeb', icon: '#fef3c7', iconText: '#92400e' },
    emerald: { bg: '#ecfdf5', icon: '#d1fae5', iconText: '#065f46' },
    rose: { bg: '#fff1f2', icon: '#fee2e2', iconText: '#9f1239' },
    indigo: { bg: '#eef2ff', icon: '#e0e7ff', iconText: '#3730a3' },
  };
  const a = accents[accent] || accents.amber;
  return (
    <View style={[styles.statCard, { backgroundColor: a.bg }]}>
      <View style={[styles.statIcon, { backgroundColor: a.icon }]}>
        <Text style={[styles.statIconText, { color: a.iconText }]}>{icon}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      {sub ? <Text style={styles.statSub}>{sub}</Text> : null}
    </View>
  );
};

export const SectionHeader = ({ title, subtitle }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionSubtitle}>{subtitle?.toUpperCase()}</Text>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

export const Row = ({ children, style }) => (
  <View style={[styles.row, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  pillText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    margin: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statIconText: {
    fontSize: 16,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  statSub: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  sectionHeader: {
    marginBottom: 14,
  },
  sectionSubtitle: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: COLORS.gold,
    fontWeight: '600',
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
