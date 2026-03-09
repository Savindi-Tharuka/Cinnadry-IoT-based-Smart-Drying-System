import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  onBack?: () => void;
};

const BOX_BG = '#E8F5E9';
const SECTION_TITLE = '#1a7a3e';
const BODY = '#2d2d2d';
const ACTION_COLOR = '#c45c26';
const TIMELINE_COLOR = '#b8860b';

export default function TipsFollow({ onBack }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7} onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} />
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentCard}>
          <Text style={[styles.topicTitleOrangeText, { textAlign: 'center', marginBottom: 16 }]}>Immatured</Text>

        <View style={styles.box}>
          <Text style={styles.sectionTitle}>Check for diseases:</Text>
          <Text style={styles.point}>• Scan with CinnGuard to check for illness.</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.sectionTitle}>Next steps</Text>
          <Text style={styles.point}>• Wait 6 months — growth takes time; do not harvest yet.</Text>
          <Text style={styles.point}>• Monthly checks — scan once a month to track maturity.</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.sectionTitle}>Daily care</Text>
          <Text style={styles.point}>• Watering — keep soil moist; water in the morning or evening.</Text>
          <Text style={styles.point}>• Weeding — remove nearby weeds to save nutrients.</Text>
        </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faf8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 40,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e8e8e8',
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 4,
    marginRight: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a7a3e',
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: { width: 36 },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: 'center',
  },
  contentCard: {
    borderWidth: 1.5,
    borderColor: '#1a7a3e',
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  topicTitleBox: {
    backgroundColor: '#ffe6cc',
    borderColor: '#d35400',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  topicTitleOrangeText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#e67e22',
  },
  box: {
    backgroundColor: BOX_BG,
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: SECTION_TITLE,
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 15,
    color: BODY,
    marginBottom: 10,
  },
  point: {
    fontSize: 15,
    color: BODY,
    lineHeight: 24,
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: ACTION_COLOR,
    marginTop: 12,
    marginBottom: 8,
  },
});
