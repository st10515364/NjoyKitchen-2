import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MenuProvider } from './src/context/MenuContext';
import { MenuListScreen } from './src/screens/MenuListScreen';
import { AddEditItemScreen } from './src/screens/AddEditItemScreen';
import { StatisticsScreen } from './src/screens/StatisticsScreen';
import { COLORS, FONT, SPACING } from './src/theme';
type Tab = 'menu' | 'stats';
type Screen = { name: 'tabs' } | { name: 'addEdit'; editingId: string | null };
function AppContent() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<Tab>('menu');
  const [screen, setScreen] = useState<Screen>({ name: 'tabs' });

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {screen.name === 'addEdit' ? (
        <AddEditItemScreen editingId={screen.editingId} onDone={() => setScreen({ name: 'tabs' })} />
      ) : tab === 'menu' ? (
        <MenuListScreen onAddNew={() => setScreen({ name: 'addEdit', editingId: null })} onEditItem={(id) => setScreen({ name: 'addEdit', editingId: id })} />
      ) : (
        <StatisticsScreen />
      )}
      {screen.name === 'tabs' && (
        <View style={[styles.tabBar, { paddingBottom: insets.bottom + SPACING.sm }]}>
          <TouchableOpacity style={styles.tabItem} onPress={() => setTab('menu')}>
            <Text style={[styles.tabLabel, tab === 'menu' && styles.tabLabelActive]}>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setTab('stats')}>
            <Text style={[styles.tabLabel, tab === 'stats' && styles.tabLabelActive]}>Statistics</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <MenuProvider>
        <AppContent />
      </MenuProvider>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  tabBar: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: COLORS.border, backgroundColor: COLORS.card, paddingTop: SPACING.sm },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: SPACING.sm },
  tabLabel: { fontSize: FONT.md, color: COLORS.textMuted, fontWeight: '600' },
  tabLabelActive: { color: COLORS.primary },
});