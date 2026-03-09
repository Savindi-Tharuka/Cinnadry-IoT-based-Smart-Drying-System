import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  imageUri: string;
  onUse: () => void;
  onRetake: () => void;
};

export default function ScanPreview({ imageUri, onUse, onRetake }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Preview</Text>
      </View>

      <View style={styles.previewWrapper}>
        <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="contain" />
        <Text style={styles.hint}>Is the stem clearly visible?</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.retakeButton}
          activeOpacity={0.85}
          onPress={onRetake}
        >
          <Ionicons name="refresh" size={20} color="#c45c26" />
          <Text style={styles.retakeText}>Image not clear - Rescan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.useButton}
          activeOpacity={0.85}
          onPress={onUse}
        >
          <Text style={styles.useText}>Use this image</Text>
          <Ionicons name="checkmark" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 44,
    paddingBottom: 12,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  previewWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    flex: 1,
    borderRadius: 12,
  },
  hint: {
    marginTop: 12,
    fontSize: 14,
    color: '#d0d0d0',
  },
  buttons: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 12,
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#fff8e6',
    gap: 8,
  },
  retakeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#c45c26',
  },
  useButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#26a852',
    gap: 8,
  },
  useText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
});
