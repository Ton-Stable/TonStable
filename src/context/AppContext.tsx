import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeType = 'light' | 'dark';
export type LanguageType = 'en' | 'zh' | 'es' | 'ar' | 'fr' | 'ru' | 'pt' | 'de';

interface AppContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(systemColorScheme as ThemeType || 'light');
  const [language, setLanguage] = useState<LanguageType>('en');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      const savedLanguage = await AsyncStorage.getItem('language');
      
      if (savedTheme) setTheme(savedTheme as ThemeType);
      if (savedLanguage) setLanguage(savedLanguage as LanguageType);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleThemeChange = async (newTheme: ThemeType) => {
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const handleLanguageChange = async (newLanguage: LanguageType) => {
    setLanguage(newLanguage);
    try {
      await AsyncStorage.setItem('language', newLanguage);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme: handleThemeChange,
        language,
        setLanguage: handleLanguageChange,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 