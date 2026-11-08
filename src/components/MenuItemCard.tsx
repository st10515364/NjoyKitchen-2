import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MenuItem } from '../models/MenuItem';
import { formatCurrency } from '../utils/statistics';
import { COLORS, SPACING, RADIUS, FONT } from '../theme';

interface Props {
  item: MenuItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const MenuItemCard: React.FC<Props> = ({ item, onEdit, onDelete }) => (
  <View style={styles.card}>
    <View style={styles.headerRow}>
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.courseBadge}>{item.course}</Text>
    </View>
    <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
    <Text style={styles.price}>{formatCurrency(item.price)}</Text>
    <View style={styles.actions}>
      <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => onEdit(item.id)}>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => onDelete(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.card, borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.md, borderWidth: 1, borderColor: COLORS.border },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: FONT.lg, fontWeight: '700', color: COLORS.text, flex: 1 },
  courseBadge: { backgroundColor: COLORS.chipBg, color: COLORS.chipText, fontSize: FONT.sm, paddingHorizontal: SPACING.sm, paddingVertical: 2, borderRadius: RADIUS.sm, overflow: 'hidden' },
  description: { marginTop: SPACING.sm, color: COLORS.textMuted },
  price: { fontSize: FONT.lg, fontWeight: '700', color: COLORS.primary, marginTop: SPACING.sm },
  actions: { flexDirection: 'row', marginTop: SPACING.md, gap: SPACING.sm },
  button: { flex: 1, paddingVertical: SPACING.sm, borderRadius: RADIUS.sm, alignItems: 'center' },
  editButton: { backgroundColor: COLORS.background },
  deleteButton: { backgroundColor: '#FBE3E1' },
  editText: { color: COLORS.textMuted, fontWeight: '600' },
  deleteText: { color: COLORS.error, fontWeight: '600' },
});