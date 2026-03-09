import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type ActiveTab = 'home' | 'tips' | 'history';

type Props = {
  active: ActiveTab;
  onHome?: () => void;
  onTips?: () => void;
  onHistory?: () => void;
  height?: number;
};

export default function CommonBottomNav({ active, onHome, onTips, onHistory, height = 58 }: Props) {
  const activeColor = '#26a852';
  const idleColor = '#555555';
  return (
    <View style={[styles.container, { height }]}>
      <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={onHome}>
        <Ionicons name="home-outline" size={24} color={active === 'home' ? activeColor : idleColor} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={onTips}>
        <Ionicons name="bulb-outline" size={24} color={active === 'tips' ? activeColor : idleColor} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={onHistory}>
        <Ionicons name="time-outline" size={24} color={active === 'history' ? activeColor : idleColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e1e1e1',
    backgroundColor: '#ffffff',
    paddingBottom: 8,
  },
  navItem: {
    alignItems: 'center',
  },
});
