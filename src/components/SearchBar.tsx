import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';

export const SearchBar: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => (
  <View style={styles.container}>
    <TextInput style={styles.input} value={value} onChangeText={onChange} placeholder="Search by name..." placeholderTextColor={COLORS.textMuted} />
    {value.length > 0 && (
      <TouchableOpacity onPress={() => onChange('')} style={styles.clear}>
        <Text style={styles.clearText}>✕</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: SPACING.md },
  input: { flex: 1, paddingVertical: SPACING.sm, color: COLORS.text },
  clear: { padding: SPACING.xs },
  clearText: { fontSize: 16, color: COLORS.textMuted },
});