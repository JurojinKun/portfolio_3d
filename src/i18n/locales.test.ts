import en from "./locales/en.json";
import fr from "./locales/fr.json";
import { defaultLanguage, supportedLanguages } from "./supportedLanguages";
import { collectTranslationKeys } from "./testUtils";

describe("i18n locales", () => {
  it("uses English as the default language", () => {
    expect(defaultLanguage).toBe("en");
  });

  it("prioritizes English in language switchers", () => {
    expect(supportedLanguages[0]).toBe("en");
  });

  it("keeps the same translation keys in French and English", () => {
    const frenchKeys = collectTranslationKeys(fr).sort();
    const englishKeys = collectTranslationKeys(en).sort();

    expect(englishKeys).toEqual(frenchKeys);
  });
});
