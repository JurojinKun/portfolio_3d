import {
  aboutHighlights,
  aboutParagraphs,
  experiences,
  portfolioSections,
  projects,
  skills,
} from "@/data";
import { resources, supportedLanguages } from "@/i18n";
import type { TranslationKey } from "@/data";

const getNestedTranslation = (
  translations: unknown,
  key: TranslationKey,
): unknown =>
  key.split(".").reduce<unknown>((currentValue, pathSegment) => {
    if (typeof currentValue !== "object" || currentValue === null) {
      return undefined;
    }

    const translationRecord = currentValue as Record<string, unknown>;

    return Object.prototype.hasOwnProperty.call(translationRecord, pathSegment)
      ? translationRecord[pathSegment]
      : undefined;
  }, translations);

const expectUniqueIds = (items: readonly { id: string }[]) => {
  const ids = items.map((item) => item.id);

  expect(new Set(ids).size).toBe(ids.length);
};

const dataTranslationKeys = [
  ...aboutHighlights,
  ...aboutParagraphs.map((paragraph) => paragraph.textKey),
  ...portfolioSections.map((section) => section.labelKey),
  ...projects.flatMap((project) => [
    project.challengesKey,
    project.contextKey,
    project.resultsKey,
    project.summaryKey,
    project.titleKey,
  ]),
  ...skills.map((skill) => skill.contentKey),
  ...experiences.flatMap((experience) => [
    experience.companyKey,
    experience.dateKey,
    ...experience.pointKeys,
    experience.titleKey,
  ]),
];

describe("v2 data", () => {
  it("uses stable unique ids", () => {
    expectUniqueIds(aboutParagraphs);
    expectUniqueIds(portfolioSections);
    expectUniqueIds(projects);
    expectUniqueIds(skills);
    expectUniqueIds(experiences);
  });

  it("uses translation keys available in every supported language", () => {
    dataTranslationKeys.forEach((translationKey) => {
      supportedLanguages.forEach((language) => {
        expect(
          getNestedTranslation(resources[language].translation, translationKey),
        ).toEqual(expect.any(String));
      });
    });
  });
});
