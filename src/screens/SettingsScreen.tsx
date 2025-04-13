import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Linking,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'es', name: 'Español' },
  { code: 'ar', name: 'العربية' },
  { code: 'fr', name: 'Français' },
  { code: 'ru', name: 'Русский' },
  { code: 'pt', name: 'Português' },
  { code: 'de', name: 'Deutsch' },
];

export const SettingsScreen: React.FC = () => {
  const { theme, setTheme, language, setLanguage } = useApp();

  const handleTelegramPress = () => {
    Linking.openURL('https://t.me/tonstable_news');
  };

  const handleTwitterPress = () => {
    Linking.openURL('https://x.com/ton_stable');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#000' : '#fff' }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme === 'dark' ? '#fff' : '#000' }]}>Settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#000' }]}>
            App Settings
          </Text>
          
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme === 'dark' ? '#fff' : '#000' }]}>
              Dark Mode
            </Text>
            <Switch
              value={theme === 'dark'}
              onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
              trackColor={{ false: '#767577', true: '#2196F3' }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#000' }]}>
            Language
          </Text>
          
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageItem,
                {
                  backgroundColor: language === lang.code ? '#2196F3' : 'transparent',
                  borderColor: theme === 'dark' ? '#333' : '#E0E0E0',
                },
              ]}
              onPress={() => setLanguage(lang.code as any)}>
              <Text
                style={[
                  styles.languageText,
                  {
                    color:
                      language === lang.code
                        ? '#fff'
                        : theme === 'dark'
                        ? '#fff'
                        : '#000',
                  },
                ]}>
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#000' }]}>
            Social Media
          </Text>
          
          <TouchableOpacity
            style={[styles.linkButton, { backgroundColor: theme === 'dark' ? '#333' : '#F5F5F5' }]}
            onPress={handleTelegramPress}>
            <Text style={[styles.linkButtonText, { color: theme === 'dark' ? '#fff' : '#2196F3' }]}>
              Telegram Channel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.linkButton, { backgroundColor: theme === 'dark' ? '#333' : '#F5F5F5' }]}
            onPress={handleTwitterPress}>
            <Text style={[styles.linkButtonText, { color: theme === 'dark' ? '#fff' : '#2196F3' }]}>
              Twitter
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#000' }]}>
            About
          </Text>
          
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: theme === 'dark' ? '#666' : '#666' }]}>
              Version
            </Text>
            <Text style={[styles.infoValue, { color: theme === 'dark' ? '#fff' : '#000' }]}>
              1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 16,
  },
  languageItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  languageText: {
    fontSize: 16,
  },
  linkButton: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  linkButtonText: {
    fontSize: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
  },
}); 