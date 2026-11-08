import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, FONT } from '../theme';

export const ConfirmDialog: React.FC<{ visible: boolean; title: string; message: string; onCancel: () => void; onConfirm: () => void; }> = ({ visible, title, message, onCancel, onConfirm }) => (
  <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
    <View style={styles.overlay}>
      <View style={styles.box}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.btn, styles.cancel]} onPress={onCancel}><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.confirm]} onPress={onConfirm}><Text style={styles.confirmText}>Delete</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: SPACING.xl },
  box: { backgroundColor: COLORS.card, borderRadius: RADIUS.lg, padding: SPACING.lg },
  title: { fontSize: FONT.xl, fontWeight: '700', color: COLORS.text },
  message: { marginTop: SPACING.sm, color: COLORS.textMuted },
  row: { flexDirection: 'row', gap: SPACING.md, marginTop: SPACING.lg },
  btn: { flex: 1, paddingVertical: SPACING.md, borderRadius: RADIUS.sm, alignItems: 'center' },
  cancel: { backgroundColor: COLORS.background },
  confirm: { backgroundColor: COLORS.error },
  cancelText: { color: COLORS.text, fontWeight: '600' },
  confirmText: { color: '#FFF', fontWeight: '600' },
});