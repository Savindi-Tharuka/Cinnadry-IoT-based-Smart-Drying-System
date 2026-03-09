import { Ionicons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type { SavedHistoryItem } from './ViewHistory';

type Props = {
  onBack?: () => void;
  item: SavedHistoryItem;
};

export default function ViewPlant({ onBack, item }: Props) {
  const [isExporting, setIsExporting] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      setIsExporting(true);
      const html = `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"><title>Plant Report</title></head>
        <body style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #1a7a3e;">Plant Details Report</h2>
          <p><strong>Date:</strong> ${item.date}</p>
        </body>
        </html>
      `;
      const { uri } = await Print.printToFileAsync({ html });
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Save PDF Report',
        });
      } else {
        Alert.alert('Done', 'PDF saved to device.');
      }
    } catch (e) {
      Alert.alert('Error', 'Could not generate PDF.');
    } finally {
      setIsExporting(false);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7} onPress={onBack}>
          <Ionicons name="chevron-back" size={22} color="#000000" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.titleSection}>
        <Text style={styles.titleText}>Plant Details</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Image
            source={{ uri: item.uri }}
            style={styles.cardImage}
            resizeMode="cover"
          />

          <View style={styles.resultSection}>
            <Text style={styles.resultLabel}>Result</Text>
            <View style={styles.resultEmpty} />
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Date</Text>
            <Text style={styles.metaValue}>{item.date}</Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={handleDownloadPDF}
            disabled={isExporting}
          >
            <View style={styles.iconLeft}>
              <Text style={styles.iconText}>PDF</Text>
            </View>
            <Text style={styles.primaryText}>
              {isExporting ? 'Generating...' : 'Download PDF Report'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85}>
            <View style={styles.iconLeftSecondary}>
              <Text style={styles.iconTextSecondary}>CSV</Text>
            </View>
            <Text style={styles.secondaryText}>Export as CSV</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={{ height: 60 }} />

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

const CARD_WIDTH = 300;
const CARD_IMAGE_SIZE = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf7ee',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e8e8e8',
  },
  backButton: {
    paddingRight: 8,
    paddingVertical: 4,
  },
  titleSection: {
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#ecf7ee',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e8e8e8',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: '#ecf7ee',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: CARD_WIDTH,
    backgroundColor: '#fafafa',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    maxHeight: CARD_IMAGE_SIZE,
    alignSelf: 'center',
    borderRadius: 12,
    marginBottom: 18,
  },
  resultSection: {
    marginBottom: 18,
  },
  resultLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a7a3e',
    marginBottom: 8,
  },
  resultEmpty: {
    height: 48,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },
  metaLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginRight: 8,
  },
  metaValue: {
    fontSize: 14,
    color: '#333333',
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 300,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#26a852',
    borderRadius: 14,
    paddingVertical: 12,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  iconLeft: {
    position: 'absolute',
    left: 16,
    width: 32,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#26a852',
  },
  primaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    paddingHorizontal: 16,
  },
  iconLeftSecondary: {
    position: 'absolute',
    left: 16,
    width: 32,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTextSecondary: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
  },
  secondaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
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
