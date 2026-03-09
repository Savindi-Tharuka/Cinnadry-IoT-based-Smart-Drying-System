import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CommonBottomNav from '../components/CommonBottomNav';
import SavedPlant from './SavedPlant';
import ViewHistory from './ViewHistory';

export type SavedHistoryItem = {
  id: string;
  uri: string;
  date: string;
  details?: string;
};

type Props = {
  onClose?: () => void;
  onShowTips?: () => void;
  onSaveImage?: (uri: string, details?: string) => void;
  savedItems?: SavedHistoryItem[];
  onDeleteItem?: (id: string) => void;
  imageUri?: string;
};

export default function Maturity({ onClose, onShowTips, onSaveImage, savedItems = [], onDeleteItem, imageUri }: Props) {
  const [showSaved, setShowSaved] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSavedPopup, setShowSavedPopup] = useState(false);

  const handleSave = () => {
    if (imageUri && onSaveImage) {
      onSaveImage(imageUri, undefined);
      setShowSavedPopup(true);
    }
  };

  if (showHistory) {
    return (
      <ViewHistory
        onBack={() => setShowHistory(false)}
        savedItems={savedItems}
        onDeleteItem={onDeleteItem}
      />
    );
  }

  if (showSaved) {
    return <SavedPlant onBack={() => setShowSaved(false)} onViewHistory={() => setShowHistory(true)} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Top bar with close icon */}
      <View style={styles.topBar}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={styles.closeButton}
          activeOpacity={0.7}
          onPress={onClose}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="close" size={26} color="#000000" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.highlightBox}>
            <View style={styles.imageWrapper}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="image-outline" size={32} color="#7a7a7a" />
                  <Text style={styles.placeholderText}>No image selected</Text>
                </View>
              )}
            </View>

            <View style={styles.resultBox}>
              <Text style={styles.resultLabel}>Result</Text>
              <View style={styles.resultEmpty} />
            </View>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
          activeOpacity={0.85}
          onPress={handleSave}
            disabled={!imageUri}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tipsRow}
            activeOpacity={0.7}
            onPress={onShowTips}
          >
            <Text style={styles.tipsText}>
              For next steps click{' '}
              <Text style={styles.tipsLink}>"Tips"</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success popup */}
      <Modal visible={showSavedPopup} transparent animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <TouchableOpacity
              style={styles.popupCloseTop}
              activeOpacity={0.7}
              onPress={() => setShowSavedPopup(false)}
            >
              <Ionicons name="close" size={22} color="#666666" />
            </TouchableOpacity>
            <View style={styles.popupCheckCircle}>
              <Ionicons name="checkmark" size={36} color="#ffffff" />
            </View>
            <Text style={styles.popupTitle}>Successfully saved</Text>
          </View>
        </View>
      </Modal>

      <View style={{ height: 58 }} />
      <CommonBottomNav
        active="home"
        onHome={onClose}
        onTips={onShowTips}
        onHistory={() => setShowHistory(true)}
        height={58}
      />
    </View>
  );
}

const IMAGE_SIZE = 300;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 8,
    backgroundColor: '#ffffff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e1e1e1',
  },
  closeButton: {
    padding: 4,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    alignItems: 'center',
  },
  highlightBox: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 4,
    borderWidth: 1.5,
    borderColor: '#1a7a3e',
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 16,
  },
  imagePlaceholder: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  placeholderText: {
    fontSize: 14,
    color: '#7a7a7a',
    fontWeight: '600',
  },
  resultBox: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#E8F5E9',
    borderRadius: 14,
    padding: 16,
  },
  resultLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a7a3e',
    marginBottom: 12,
    textAlign: 'center',
  },
  resultEmpty: {
    height: 64,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#9e9e9e',
  },
  tipsRow: {
    marginTop: 34,
    alignItems: 'center',
  },
  tipsText: {
    fontSize: 16,
    color: '#333333',
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupBox: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 32,
    minWidth: 300,
    width: '84%',
    maxWidth: 340,
    alignItems: 'center',
    position: 'relative',
  },
  popupCloseTop: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
  },
  popupCheckCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#26a852',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  tipsLink: {
    fontSize: 18,
    fontWeight: '700',
    color: '#26a852',
  },
  saveButton: {
    marginTop: 22,
    alignSelf: 'center',
    backgroundColor: '#26a852',
    paddingVertical: 16,
    paddingHorizontal: 14,
    width: '100%',
    maxWidth: 320,
    borderRadius: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 19,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  
});
