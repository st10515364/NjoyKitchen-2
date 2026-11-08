import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Course, COURSES } from '../models/MenuItem';
import { COLORS, SPACING, RADIUS } from '../theme';

type FilterValue = Course | 'All';
const options: FilterValue[] = ['All', ...COURSES];

export const CourseFilter: React.FC<{ selected: FilterValue; onChange: (value: FilterValue) => void }> = ({ selected, onChange }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
    {options.map((option) => {
      const active = option === selected;
      return (
        <TouchableOpacity key={option} style={[styles.chip, active && styles.activeChip]} onPress={() => onChange(option)}>
          <Text style={[styles.text, active && styles.activeText]}>{option}</Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  row: { gap: SPACING.sm, paddingVertical: SPACING.sm },
  chip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.lg, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border },
  activeChip: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  text: { color: COLORS.textMuted, fontWeight: '600' },
  activeText: { color: '#FFF' },
});