import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface StakingOption {
  id: string;
  name: string;
  apy: string;
  minStake: string;
  duration: string;
}

const stakingOptions: StakingOption[] = [
  {
    id: '1',
    name: 'TON Staking',
    apy: '12.5%',
    minStake: '100 TON',
    duration: 'Flexible',
  },
  {
    id: '2',
    name: 'TON-USDT LP',
    apy: '25%',
    minStake: '500 TON',
    duration: '30 days',
  },
];

export const StakingScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Staking</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Staked</Text>
            <Text style={styles.statValue}>0 TON</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Rewards</Text>
            <Text style={styles.statValue}>0 TON</Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          <Text style={styles.sectionTitle}>Staking Options</Text>
          {stakingOptions.map((option) => (
            <View key={option.id} style={styles.optionCard}>
              <View style={styles.optionHeader}>
                <Text style={styles.optionName}>{option.name}</Text>
                <Text style={styles.optionApy}>APY: {option.apy}</Text>
              </View>
              <View style={styles.optionDetails}>
                <Text style={styles.optionText}>
                  Min Stake: {option.minStake}
                </Text>
                <Text style={styles.optionText}>
                  Duration: {option.duration}
                </Text>
              </View>
              <TouchableOpacity style={styles.stakeButton}>
                <Text style={styles.stakeButtonText}>Stake Now</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  optionCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionName: {
    fontSize: 18,
    fontWeight: '600',
  },
  optionApy: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  optionDetails: {
    marginBottom: 12,
  },
  optionText: {
    color: '#666',
    marginVertical: 2,
  },
  stakeButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  stakeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
}); 