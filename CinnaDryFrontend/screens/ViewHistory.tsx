import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ViewPlant from './ViewPlant';
import CommonBottomNav from '../components/CommonBottomNav';

export type SavedHistoryItem = {
  id: string;
  uri: string;
  date: string;
  details?: string;
};

type Props = {
  onBack?: () => void;
  onOpenTips?: () => void;
  savedItems?: SavedHistoryItem[];
  onDeleteItem?: (id: string) => void;
};

const CARD_HEIGHT = 110;
const CARD_IMAGE_WIDTH = 90;

export default function ViewHistory({ onBack, onOpenTips, savedItems = [], onDeleteItem }: Props) {
  const [selectedItem, setSelectedItem] = useState<SavedHistoryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = searchQuery.trim()
    ? savedItems.filter((item) => {
        const q = searchQuery.toLowerCase();
        const dateLower = item.date.toLowerCase();
        const detailsLower = (item.details || '').toLowerCase();
        return dateLower.includes(q) || detailsLower.includes(q);
      })
    : savedItems;

  if (selectedItem) {
    return (
      <ViewPlant
        item={selectedItem}
        onBack={() => setSelectedItem(null)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7} onPress={onBack}>
          <Ionicons name="chevron-back" size={22} color="#000000" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.titleSection}>
        <Text style={styles.titleText}>View History</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator
      >
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#777777" style={styles.searchIcon} />
          <TextInput
            placeholder="Search by maturity, date or month"
            placeholderTextColor="#9a9a9a"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <Text style={styles.recentLabel}>Recent history</Text>

        {savedItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="images-outline" size={48} color="#cccccc" />
            <Text style={styles.emptyText}>No saved images yet</Text>
            <Text style={styles.emptySub}>Save images from the Maturity page</Text>
          </View>
        ) : filteredItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color="#cccccc" />
            <Text style={styles.emptyText}>No results found</Text>
          </View>
        ) : (
          filteredItems.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image
                source={{ uri: item.uri }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.cardContent}>
                <View style={styles.resultBoxSmall} />
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
              <TouchableOpacity
                style={styles.arrowButton}
                activeOpacity={0.7}
                onPress={() => setSelectedItem(item)}
              >
                <Ionicons name="arrow-forward" size={20} color="#000000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                activeOpacity={0.7}
                onPress={() => onDeleteItem?.(item.id)}
              >
                <Ionicons name="trash-outline" size={20} color="#c45c26" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <View style={{ height: 58 }} />
      <CommonBottomNav active="history" onHome={onBack} onTips={onOpenTips} onHistory={() => {}} />
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
    backgroundColor: '#ffffff',
  },
  backButton: {
    paddingRight: 8,
    paddingVertical: 4,
  },
  titleSection: {
    backgroundColor: '#ffffff',
    paddingBottom: 12,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eeeeee',
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    marginTop: 8,
    marginBottom: 14,
    height: 38,
    borderRadius: 18,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    elevation: 2,
    width: '100%',
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#000000',
  },
  recentLabel: {
    marginTop: 4,
    marginBottom: 10,
    fontSize: 13,
    fontWeight: '600',
    color: '#ff8c1a',
    alignSelf: 'flex-start',
    width: '100%',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 15,
    color: '#666666',
  },
  emptySub: {
    marginTop: 4,
    fontSize: 13,
    color: '#999999',
  },
  card: {
    height: CARD_HEIGHT,
    backgroundColor: '#eaf5ec',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 12,
    elevation: 3,
    width: '100%',
  },
  cardImage: {
    width: CARD_IMAGE_WIDTH,
    height: CARD_HEIGHT - 20,
    borderRadius: 10,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  resultBoxSmall: {
    width: 56,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 6,
  },
  dateText: {
    fontSize: 12,
    color: '#666666',
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e8c4b8',
    backgroundColor: '#fff5f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  
});
