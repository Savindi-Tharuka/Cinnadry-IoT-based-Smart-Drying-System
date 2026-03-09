import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CommonBottomNav from '../components/CommonBottomNav';
import TipsFollow from './TipsFollow';
import TipsFollowMatured from './TipsFollowMatured';
import TipsFollowOvermatured from './TipsFollowOvermatured';

const NAVBAR_HEIGHT = 56;

type Props = {
  onClose?: () => void;
  onOpenHistory?: () => void;
};

type FollowScreen = 'immatured' | 'matured' | 'overmatured' | null;

export default function TipsScreen({ onClose, onOpenHistory }: Props) {
  const [followScreen, setFollowScreen] = useState<FollowScreen>(null);

  if (followScreen === 'immatured') {
    return <TipsFollow onBack={() => setFollowScreen(null)} />;
  }
  if (followScreen === 'matured') {
    return <TipsFollowMatured onBack={() => setFollowScreen(null)} />;
  }
  if (followScreen === 'overmatured') {
    return <TipsFollowOvermatured onBack={() => setFollowScreen(null)} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header: title centered, close on right */}
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <TouchableOpacity
          style={styles.closeButton}
          activeOpacity={0.7}
          onPress={onClose}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="close" size={26} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.title}>Tips</Text>

        <TouchableOpacity style={styles.tipBox} activeOpacity={0.85} onPress={() => setFollowScreen('immatured')}>
          <View style={styles.iconCircle}>
            <Ionicons name="leaf-outline" size={30} color="#ffffff" />
          </View>
          <Text style={styles.boxLabel}>Immatured</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tipBox} activeOpacity={0.85} onPress={() => setFollowScreen('matured')}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark-circle-outline" size={30} color="#ffffff" />
          </View>
          <Text style={styles.boxLabel}>Matured</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tipBox} activeOpacity={0.85} onPress={() => setFollowScreen('overmatured')}>
          <View style={styles.iconCircle}>
            <Ionicons name="alert-circle-outline" size={30} color="#ffffff" />
          </View>
          <Text style={styles.boxLabel}>Overmatured</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: NAVBAR_HEIGHT }} />
      <CommonBottomNav active="tips" onHome={onClose} onTips={() => {}} onHistory={onOpenHistory} height={NAVBAR_HEIGHT} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 20,
  },
  headerSpacer: {
    width: 36,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 28,
  },
  closeButton: {
    width: 36,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 18,
    gap: 16,
  },
  tipBox: {
    width: 270,
    height: 160,
    borderRadius: 20,
    backgroundColor: '#f3fbf5',
    borderWidth: 1.6,
    borderColor: '#26a852',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 13,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#26a852',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  boxLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f2a1a',
  },
  
});
