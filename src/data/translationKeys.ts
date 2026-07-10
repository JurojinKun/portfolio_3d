import fr from "@/i18n/locales/fr.json";

type TranslationResource = typeof fr;

type DotNestedKeys<TValue> = {
  [TKey in keyof TValue & string]: TValue[TKey] extends string
    ? TKey
    : TValue[TKey] extends Record<string, unknown>
      ? `${TKey}.${DotNestedKeys<TValue[TKey]>}`
      : never;
}[keyof TValue & string];

export type TranslationKey = DotNestedKeys<TranslationResource>;
