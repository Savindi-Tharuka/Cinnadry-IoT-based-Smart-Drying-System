import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  onBack?: () => void;
  onViewHistory?: () => void;
};

export default function SavedPlant({ onBack, onViewHistory }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header with back arrow */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7} onPress={onBack}>
          <Ionicons name="chevron-back" size={22} color="#000000" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <View style={{ width: 24 }} />
      </View>

      {/* Center content */}
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="insert-drive-file" size={26} color="#26a852" />
          <View style={styles.checkBadge}>
            <Ionicons name="checkmark" size={14} color="#ffffff" />
          </View>
        </View>

        <Text style={styles.title}>Saved Successfully!</Text>

        <Text style={styles.subtitle}>
          Your plant&apos;s maturity has been{'\n'}securely recorded in the history log.
        </Text>

        <TouchableOpacity
          style={styles.viewHistoryButton}
          activeOpacity={0.85}
          onPress={onViewHistory}
        >
          <Text style={styles.viewHistoryText}>View History</Text>
        </TouchableOpacity>
      </View>

      {/* Spacer for bottom nav */}
      <View style={{ height: 60 }} />

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Ionicons name="home-outline" size={22} color="#26a852" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Ionicons name="settings-outline" size={22} color="#555555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Ionicons name="happy-outline" size={22} color="#555555" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ICON_SIZE = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 8,
  },
  backButton: {
    paddingRight: 8,
    paddingVertical: 4,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconCircle: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: '#e6f7ec',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    position: 'relative',
  },
  checkBadge: {
    position: 'absolute',
    bottom: 8,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#26a852',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 28,
  },
  viewHistoryButton: {
    width: '100%',
    backgroundColor: '#26a852',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  viewHistoryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 52,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e1e1e1',
    backgroundColor: '#ffffff',
    paddingBottom: 8,
  },
  navItem: {
    alignItems: 'center',
  },
});


