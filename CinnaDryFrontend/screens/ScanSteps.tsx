import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import CommonBottomNav from '../components/CommonBottomNav';
import ScanCamera from './ScanCamera';

type Props = {
  onBack?: () => void;
  onScanned?: (imageUri: string) => void;
  onHome?: () => void;
  onOpenTips?: () => void;
  onOpenHistory?: () => void;
};

const steps = [
  'Center the stem within the camera frame clearly.',
  'Ensure there is sufficient lighting on the stem surface.',
  'Hold your phone steady to avoid blurred images.',
  'Use a white background for better focus (white sheet behind the focused stem area/portion).',
  'Keep 8–10cm gap between camera and the stem when scanning.',
];

export default function ScanSteps({ onBack, onScanned, onHome, onOpenTips, onOpenHistory }: Props) {
  const [showCamera, setShowCamera] = useState(false);

  if (showCamera) {
    return (
      <ScanCamera
        onBack={() => setShowCamera(false)}
        onScanned={(uri) => {
          onScanned?.(uri);
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header with back arrow */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={onBack}
        >
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <View style={{ width: 24 }} />
      </View>

      {/* Topic */}
      <View style={styles.topicSection}>
        <Text style={styles.topicText}>Before You Scan...</Text>
      </View>

      {/* Steps list */}
      <View style={styles.stepsContainer}>
        {steps.map((text, index) => (
          <View key={index} style={styles.stepItem}>
            <View style={styles.stepIconCircle}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
            </View>
            <Text style={styles.stepText}>{text}</Text>
          </View>
        ))}
      </View>

      {/* Scan Now button */}
      <TouchableOpacity
        style={styles.scanButton}
        activeOpacity={0.85}
        onPress={() => setShowCamera(true)}
      >
        <MaterialIcons name="center-focus-strong" size={22} color="#ffffff" />
        <Text style={styles.scanButtonText}>Scan Now</Text>
      </TouchableOpacity>

      <View style={{ height: 58 }} />
      <CommonBottomNav
        active="home"
        onHome={onHome ?? onBack}
        onTips={onOpenTips}
        onHistory={onOpenHistory}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 8,
  },
  backButton: {
    padding: 4,
  },
  topicSection: {
    alignItems: 'center',
    paddingTop: 22,
    paddingBottom: 16,
  },
  topicText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  stepsContainer: {
    paddingHorizontal: 20,
    paddingTop: 18,
    alignItems: 'center',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9f8ee',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 14,
    width: '100%',
  },
  stepIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#26a852',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  stepText: {
    flex: 1,
    fontSize: 13,
    color: '#1f2933',
    textAlign: 'left',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 12,
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: '#26a852',
  },
  scanButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  
});
