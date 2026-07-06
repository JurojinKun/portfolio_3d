export const supportedLanguages = ["en", "fr"] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export const defaultLanguage: SupportedLanguage = "en";

export const isSupportedLanguage = (
  language: string,
): language is SupportedLanguage =>
  supportedLanguages.includes(language as SupportedLanguage);
