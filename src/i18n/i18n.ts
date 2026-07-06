import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { defaultNamespace, resources } from "./resources";
import { defaultLanguage, supportedLanguages } from "./supportedLanguages";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: supportedLanguages,
    fallbackLng: defaultLanguage,
    defaultNS: defaultNamespace,
    ns: [defaultNamespace],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
    },
    react: {
      useSuspense: false,
    },
  });

export { i18n };
