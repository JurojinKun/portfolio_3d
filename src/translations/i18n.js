import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import frTranslation from './locales/fr.json';

i18n
  .use(LanguageDetector) // détection de la langue du navigateur
  .use(initReactI18next) 
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
    },
    fallbackLng: 'en', // si aucune langue correspondante est trouvée, on utilise l'anglais
    interpolation: {
      escapeValue: false, 
    },
    load: 'languageOnly',
  })
  .then(() => {
    console.log("Language Detected", i18n.language);
  });

export default i18n;