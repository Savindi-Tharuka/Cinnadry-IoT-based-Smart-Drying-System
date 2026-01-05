import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ApiResponse } from '../types/api';

interface Props {
  result: ApiResponse;
}

const ResultCard: React.FC<Props> = ({ result }) => {
  const isOptimal = result.is_optimal === 'yes';

  return (
    <View style={[styles.card, isOptimal ? styles.optimal : styles.drying]}>
      <Text style={styles.statusEmoji}>
        {isOptimal ? '🎉' : '⏳'}
      </Text>

      <Text style={styles.statusText}>
        {isOptimal ? 'Optimal Condition Reached!' : 'Still Drying'}
      </Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Condition:</Text>
        <Text style={styles.value}>{result.condition}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Confidence:</Text>
        <Text style={styles.value}>{(result.confidence * 100).toFixed(1)}%</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{result.timestamp}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 24,
    borderRadius: 16,
    marginTop: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  optimal: {
    backgroundColor: '#e6ffe6',
    borderWidth: 2,
    borderColor: '#28a745',
  },
  drying: {
    backgroundColor: '#fff3cd',
    borderWidth: 2,
    borderColor: '#ffc107',
  },
  statusEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  statusText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 6,
  },
  label: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
});

export default ResultCard;