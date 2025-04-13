import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en.json';
import zh from './translations/zh.json';
import es from './translations/es.json';
import ar from './translations/ar.json';
import fr from './translations/fr.json';
import ru from './translations/ru.json';
import pt from './translations/pt.json';
import de from './translations/de.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
    es: { translation: es },
    ar: { translation: ar },
    fr: { translation: fr },
    ru: { translation: ru },
    pt: { translation: pt },
    de: { translation: de },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n; 