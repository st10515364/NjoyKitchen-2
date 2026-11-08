import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useMenu } from '../context/MenuContext';
import { calculateMenuStatistics, formatCurrency } from '../utils/statistics';
import { StatCard } from '../components/StatCard';
import { COURSES } from '../models/MenuItem';
import { COLORS, SPACING, FONT } from '../theme';

export const StatisticsScreen: React.FC = () => {
  const { items } = useMenu();
  const stats = calculateMenuStatistics(items);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Menu Statistics</Text>
      <View style={styles.row}>
        <StatCard label="Total Items" value={String(stats.totalItems)} />
        <StatCard label="Average Price" value={formatCurrency(stats.averagePrice)} />
      </View>
      <Text style={styles.sectionTitle}>Items per Course</Text>
      <View style={styles.row}>
        {COURSES.map((course) => <StatCard key={course} label={course} value={String(stats.byCourse[course])} />)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg },
  title: { fontSize: FONT.xxl, fontWeight: '800', color: COLORS.text, marginBottom: SPACING.lg },
  sectionTitle: { marginTop: SPACING.lg, marginBottom: SPACING.md, fontWeight: '700', color: COLORS.text },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.md },
});