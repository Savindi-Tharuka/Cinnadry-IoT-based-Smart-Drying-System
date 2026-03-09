import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ScanPreview from './ScanPreview';

type Props = {
  onBack?: () => void;
  onScanned?: (imageUri: string) => void;
};

export default function ScanCamera({ onBack, onScanned }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedUri, setCapturedUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);

  const handleCapture = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
      });
      if (photo?.uri) {
        setCapturedUri(photo.uri);
      }
    } catch (e) {
      onBack?.();
    }
  };

  if (capturedUri) {
    return (
      <ScanPreview
        imageUri={capturedUri}
        onUse={() => {
          onScanned?.(capturedUri);
          onBack?.();
        }}
        onRetake={() => setCapturedUri(null)}
      />
    );
  }

  if (!permission) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.permissionTitle}>Camera access needed</Text>
        <Text style={styles.permissionText}>
          Allow camera access to scan your plant stem.
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          activeOpacity={0.85}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.permissionBack}
          activeOpacity={0.7}
          onPress={onBack}
        >
          <Text style={styles.permissionBackText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={onBack}
        >
          <Ionicons name="chevron-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Stem</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Camera with green frame overlay */}
      <View style={styles.cameraWrapper}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back"
        />

        {/* Dark overlays */}
        <View style={styles.overlayTop} pointerEvents="none" />
        <View style={styles.overlayBottom} pointerEvents="none" />
        <View style={styles.overlayLeft} pointerEvents="none" />
        <View style={styles.overlayRight} pointerEvents="none" />

        {/* Green scan frame */}
        <View style={styles.frame} pointerEvents="none" />

        {/* Hint text */}
        <Text style={styles.hintText} pointerEvents="none">
          Align the stem inside the green frame
        </Text>
      </View>

      {/* Capture button */}
      <View style={styles.captureRow}>
        <TouchableOpacity
          style={styles.captureButton}
          activeOpacity={0.9}
          onPress={handleCapture}
        >
          <View style={styles.captureInner} />
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
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 12,
  },
  backButton: {
    paddingVertical: 4,
    paddingRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  cameraWrapper: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  overlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '18%',
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '24%',
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  overlayLeft: {
    position: 'absolute',
    top: '18%',
    bottom: '24%',
    left: 0,
    width: '8%',
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  overlayRight: {
    position: 'absolute',
    top: '18%',
    bottom: '24%',
    right: 0,
    width: '8%',
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  frame: {
    position: 'absolute',
    top: '18%',
    bottom: '24%',
    left: '8%',
    right: '8%',
    borderWidth: 3,
    borderColor: '#26a852',
    borderRadius: 18,
  },
  hintText: {
    position: 'absolute',
    bottom: '14%',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 13,
    color: '#e5f7ea',
    fontWeight: '500',
  },
  captureRow: {
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#26a852',
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  permissionText: {
    fontSize: 14,
    color: '#d0d0d0',
    textAlign: 'center',
    marginBottom: 18,
  },
  permissionButton: {
    backgroundColor: '#26a852',
    borderRadius: 20,
    paddingHorizontal: 32,
    paddingVertical: 10,
    marginBottom: 8,
  },
  permissionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  permissionBack: {
    paddingVertical: 6,
  },
  permissionBackText: {
    fontSize: 14,
    color: '#bbbbbb',
  },
});

