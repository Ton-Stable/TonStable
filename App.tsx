import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider, useApp } from './src/context/AppContext';
import './src/i18n';
import { useTranslation } from 'react-i18next';

// Импортируем экраны
import { WalletScreen } from './src/screens/WalletScreen';
import { TradeScreen } from './src/screens/TradeScreen';
import { StakingScreen } from './src/screens/StakingScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { CryptoDetailScreen } from './src/screens/CryptoDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  const { theme } = useApp();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#000' : '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: isDark ? '#666' : '#999',
      }}>
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{ title: t('common.wallet') }}
      />
      <Tab.Screen
        name="Trade"
        component={TradeScreen}
        options={{ title: t('common.trade') }}
      />
      <Tab.Screen
        name="Staking"
        component={StakingScreen}
        options={{ title: t('common.staking') }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: t('common.settings') }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? '#000' : '#FFFFFF',
          },
          headerTintColor: isDark ? '#FFFFFF' : '#000000',
        }}>
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CryptoDetail"
          component={CryptoDetailScreen}
          options={({ route }) => ({
            title: route.params?.name || 'Crypto Details',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </AppProvider>
  );
} 