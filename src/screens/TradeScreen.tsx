import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const TradeScreen: React.FC = () => {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState('TON');
  const [toToken, setToToken] = useState('USDT');

  const handleSwap = () => {
    // Здесь будет логика свапа
    console.log('Swap initiated');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Swap</Text>
      </View>

      <View style={styles.swapContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={fromAmount}
            onChangeText={setFromAmount}
            placeholder="0.0"
            keyboardType="decimal-pad"
          />
          <TouchableOpacity style={styles.tokenButton}>
            <Text style={styles.tokenButtonText}>{fromToken}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.switchButton}>
          <Text>↓</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={toAmount}
            onChangeText={setToAmount}
            placeholder="0.0"
            keyboardType="decimal-pad"
          />
          <TouchableOpacity style={styles.tokenButton}>
            <Text style={styles.tokenButtonText}>{toToken}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Price Impact: 0.05%</Text>
          <Text style={styles.infoText}>Minimum received: 0.0 {toToken}</Text>
          <Text style={styles.infoText}>Network Fee: ~0.01 TON</Text>
        </View>

        <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
          <Text style={styles.swapButtonText}>Swap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  swapContainer: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  tokenButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tokenButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  switchButton: {
    alignSelf: 'center',
    padding: 8,
  },
  infoContainer: {
    marginVertical: 16,
  },
  infoText: {
    color: '#666',
    marginVertical: 4,
  },
  swapButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  swapButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
}); 