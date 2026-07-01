import en from "./locales/en.json";
import fr from "./locales/fr.json";
import { collectTranslationKeys } from "./testUtils";

describe("i18n locales", () => {
  it("keeps the same translation keys in French and English", () => {
    const frenchKeys = collectTranslationKeys(fr).sort();
    const englishKeys = collectTranslationKeys(en).sort();

    expect(englishKeys).toEqual(frenchKeys);
  });
});
