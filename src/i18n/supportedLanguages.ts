export const supportedLanguages = ["fr", "en"] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export const defaultLanguage: SupportedLanguage = "fr";

export const isSupportedLanguage = (
  language: string,
): language is SupportedLanguage =>
  supportedLanguages.includes(language as SupportedLanguage);
