import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, FONT } from '../theme';

export const StatCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.card}>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: '45%', backgroundColor: COLORS.card, borderRadius: RADIUS.md, padding: SPACING.md, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  value: { fontSize: FONT.xxl, fontWeight: '800', color: COLORS.primary },
  label: { fontSize: FONT.sm, color: COLORS.textMuted, marginTop: SPACING.xs },
});