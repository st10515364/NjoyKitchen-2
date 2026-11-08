import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useMenu } from '../context/MenuContext';
import { Course, COURSES } from '../models/MenuItem';
import { validateMenuItem, ValidationErrors } from '../utils/validators';
import { COLORS, SPACING, RADIUS, FONT } from '../theme';

export const AddEditItemScreen: React.FC<{ editingId?: string | null; onDone: () => void }> = ({ editingId, onDone }) => {
  const { addItem, updateItem, getItemById } = useMenu();
  const existing = editingId ? getItemById(editingId) : undefined;

  const [name, setName] = useState(existing?.name ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [price, setPrice] = useState(existing ? String(existing.price) : '');
  const [course, setCourse] = useState<Course>(existing?.course ?? 'Starter');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleSave = () => {
    const { isValid, errors: validationErrors } = validateMenuItem({ name, description, price });
    setErrors(validationErrors);
    if (!isValid) return;

    const payload = { name: name.trim(), description: description.trim(), price: Number(price), course };
    if (existing && editingId) { updateItem(editingId, payload); Alert.alert('Updated', 'Item updated.'); }
    else { addItem(payload); Alert.alert('Added', 'Item added.'); }
    onDone();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{existing ? 'Edit Item' : 'Add New Item'}</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput style={[styles.input, errors.name && styles.inputError]} value={name} onChangeText={setName} placeholder="e.g. Grilled Chicken" />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <Text style={styles.label}>Description</Text>
      <TextInput style={[styles.input, styles.multiline, errors.description && styles.inputError]} value={description} onChangeText={setDescription} multiline />
      {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

      <Text style={styles.label}>Price (R)</Text>
      <TextInput style={[styles.input, errors.price && styles.inputError]} value={price} onChangeText={setPrice} keyboardType="decimal-pad" />
      {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

      <Text style={styles.label}>Course</Text>
      <View style={styles.courseRow}>
        {COURSES.map((c) => (
          <TouchableOpacity key={c} style={[styles.courseChip, c === course && styles.courseChipActive]} onPress={() => setCourse(c)}>
            <Text style={[styles.courseText, c === course && styles.courseTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>{existing ? 'Save Changes' : 'Add Item'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg },
  title: { fontSize: FONT.xxl, fontWeight: '800', color: COLORS.text, marginBottom: SPACING.md },
  label: { marginTop: SPACING.md, marginBottom: SPACING.xs, fontWeight: '600', color: COLORS.text },
  input: { backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.sm, padding: SPACING.md, color: COLORS.text },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  inputError: { borderColor: COLORS.error },
  errorText: { color: COLORS.error, marginTop: SPACING.xs, fontSize: FONT.sm },
  courseRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  courseChip: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md, borderRadius: RADIUS.lg, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border },
  courseChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  courseText: { color: COLORS.textMuted, fontWeight: '600' },
  courseTextActive: { color: '#FFF' },
  saveButton: { marginTop: SPACING.xl, backgroundColor: COLORS.primary, paddingVertical: SPACING.md, borderRadius: RADIUS.lg, alignItems: 'center' },
  saveText: { color: '#FFF', fontWeight: '700', fontSize: FONT.lg },
});