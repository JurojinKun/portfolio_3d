import en from "./locales/en.json";
import fr from "./locales/fr.json";

export const defaultNamespace = "translation";

export const resources = {
  fr: {
    translation: fr,
  },
  en: {
    translation: en,
  },
} as const;
