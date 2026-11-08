import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT } from '../theme';

export const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <View style={styles.container}><Text style={styles.text}>{message}</Text></View>
);

const styles = StyleSheet.create({
  container: { padding: SPACING.xl, alignItems: 'center' },
  text: { color: COLORS.textMuted, fontSize: FONT.md, textAlign: 'center' },
});