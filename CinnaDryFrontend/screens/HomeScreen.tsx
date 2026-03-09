import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import CommonBottomNav from '../components/CommonBottomNav';
import Maturity, { SavedHistoryItem } from './Maturity';
import ScanSteps from './ScanSteps';
import TipsScreen from './TipsScreen';
import ViewHistory from './ViewHistory';

function formatDate() {
  const d = new Date();
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function HomeScreen() {
  const [showScanSteps, setShowScanSteps] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showMaturity, setShowMaturity] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [savedHistory, setSavedHistory] = useState<SavedHistoryItem[]>([]);

  const addToHistory = useCallback((uri: string, details?: string) => {
    setSavedHistory((prev) => [
      { id: Date.now().toString(), uri, date: formatDate(), details },
      ...prev,
    ]);
  }, []);

  const removeFromHistory = useCallback((id: string) => {
    setSavedHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to your photo library.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      const uri = result.assets?.[0]?.uri ?? null;
      setSelectedImageUri(uri);
      setShowMaturity(true);
    }
  };

  const handleScan = () => {
    setShowScanSteps(true);
  };

  const handleShowTips = () => {
    setShowTips(true);
  };

  const handleShowHistory = () => {
    setShowHistory(true);
  };

  if (showMaturity) {
    return (
      <Maturity
        imageUri={selectedImageUri ?? undefined}
        onClose={() => setShowMaturity(false)}
        onShowTips={() => {
          setShowMaturity(false);
          setShowTips(true);
        }}
        onSaveImage={(uri, details) => addToHistory(uri, details)}
        savedItems={savedHistory}
        onDeleteItem={removeFromHistory}
      />
    );
  }

  if (showHistory) {
    return (
      <ViewHistory
        onBack={() => setShowHistory(false)}
        onOpenTips={() => {
          setShowHistory(false);
          setShowTips(true);
        }}
        savedItems={savedHistory}
        onDeleteItem={removeFromHistory}
      />
    );
  }

  if (showTips) {
    return (
      <TipsScreen
        onClose={() => setShowTips(false)}
        onOpenHistory={() => {
          setShowTips(false);
          setShowHistory(true);
        }}
      />
    );
  }

  if (showScanSteps) {
    return (
      <ScanSteps
        onBack={() => setShowScanSteps(false)}
        onHome={() => setShowScanSteps(false)}
        onOpenTips={() => {
          setShowScanSteps(false);
          setShowTips(true);
        }}
        onOpenHistory={() => {
          setShowScanSteps(false);
          setShowHistory(true);
        }}
        onScanned={(uri) => {
          setSelectedImageUri(uri);
          setShowScanSteps(false);
          setShowMaturity(true);
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Top white status / header bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity activeOpacity={0.7}>
          <MaterialIcons name="menu" size={24} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Black section with plant and title overlay */}
      <View style={styles.topSection}>
        <View style={styles.plantContainer}>
          <Image
            source={require('../assets/images/plantcin.jpg')}
            style={styles.plantImage}
            resizeMode="contain"
          />
          <Text style={styles.titleOverlay}>Harvest Your Plant</Text>
        </View>
      </View>

      {/* Middle white area with Upload / Scan cards */}
      <View style={styles.middleSection}>
        <View style={styles.cardContainer}>
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionCard}
              activeOpacity={0.85}
              onPress={handleUpload}
            >
              <View style={styles.iconCircle}>
                <MaterialIcons name="file-upload" size={28} color="#ffffff" />
              </View>
              <Text style={styles.actionText}>Upload</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              activeOpacity={0.85}
              onPress={handleScan}
            >
              <View style={styles.iconCircle}>
                <MaterialIcons name="center-focus-strong" size={28} color="#ffffff" />
              </View>
              <Text style={styles.actionText}>Scan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ height: 58 }} />
      <CommonBottomNav active="home" onHome={() => {}} onTips={handleShowTips} onHistory={handleShowHistory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerBar: {
    height: 46,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000000',
  },
  topSection: {
    flex: 3.0,
    backgroundColor: '#000000',
    paddingHorizontal: 24,
  },
  sideButtonsContainer: {
    position: 'absolute',
    left: 24,
    top: 22,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sideButton: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#37B24D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    elevation: 4,
  },
  plantContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantImage: {
    width: '72%',
    height: '72%',
  },
  titleOverlay: {
    position: 'absolute',
    bottom: 32,
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },
  middleSection: {
    flex: 1.7,
    backgroundColor: '#FFFFFF',
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1.6,
    borderColor: '#e6efe9',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#f3fbf5',
    borderRadius: 20,
    paddingVertical: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.6,
    borderColor: '#26a852',
    elevation: 0,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#26a852',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f2a1a',
  },
  
});
