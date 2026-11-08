import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useMenu } from '../context/MenuContext';
import { Course } from '../models/MenuItem';
import { MenuItemCard } from '../components/MenuItemCard';
import { SearchBar } from '../components/SearchBar';
import { CourseFilter } from '../components/CourseFilter';
import { EmptyState } from '../components/EmptyState';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { COLORS, SPACING, RADIUS, FONT } from '../theme';

type FilterValue = Course | 'All';

export const MenuListScreen: React.FC<{ onAddNew: () => void; onEditItem: (id: string) => void }> = ({ onAddNew, onEditItem }) => {
  const { items, deleteItem } = useMenu();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<FilterValue>('All');
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      const matchesName = query === '' || item.name.toLowerCase().includes(query);
      const matchesCourse = selectedCourse === 'All' || item.course === selectedCourse;
      return matchesName && matchesCourse;
    });
  }, [items, searchQuery, selectedCourse]);

  const clearFilters = () => { setSearchQuery(''); setSelectedCourse('All'); };

  const handleDeleteConfirmed = () => {
    if (pendingDeleteId) {
      deleteItem(pendingDeleteId);
      setPendingDeleteId(null);
      Alert.alert('Deleted', 'The menu item has been removed.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <CourseFilter selected={selectedCourse} onChange={setSelectedCourse} />
        {(searchQuery.trim() !== '' || selectedCourse !== 'All') && (
          <TouchableOpacity onPress={clearFilters} style={styles.clearFilters}><Text style={styles.clearFiltersText}>Clear search & filter</Text></TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<EmptyState message={items.length === 0 ? 'No menu items yet. Tap "+ Add New Item" to start!' : 'No items match your search.'} />}
        renderItem={({ item }) => <MenuItemCard item={item} onEdit={onEditItem} onDelete={(id) => setPendingDeleteId(id)} />}
      />

      <TouchableOpacity style={styles.fab} onPress={onAddNew}><Text style={styles.fabText}>+ Add New Item</Text></TouchableOpacity>
      <ConfirmDialog visible={pendingDeleteId !== null} title="Delete item?" message="This action cannot be undone." onCancel={() => setPendingDeleteId(null)} onConfirm={handleDeleteConfirmed} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: SPACING.md },
  controls: { paddingTop: SPACING.sm },
  clearFilters: { alignSelf: 'flex-start', paddingVertical: SPACING.xs },
  clearFiltersText: { color: COLORS.primary, fontWeight: '600', fontSize: FONT.sm },
  listContent: { paddingBottom: 100, paddingTop: SPACING.sm },
  fab: { position: 'absolute', bottom: SPACING.lg, left: SPACING.lg, right: SPACING.lg, backgroundColor: COLORS.primary, paddingVertical: SPACING.md, borderRadius: RADIUS.lg, alignItems: 'center' },
  fabText: { color: '#FFF', fontWeight: '700', fontSize: FONT.lg },
});