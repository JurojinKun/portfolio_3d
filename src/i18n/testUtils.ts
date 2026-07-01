const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const collectTranslationKeys = (
  value: unknown,
  prefix = "",
): string[] => {
  if (!isRecord(value)) {
    return prefix === "" ? [] : [prefix];
  }

  return Object.entries(value).flatMap(([key, childValue]) => {
    const nextPrefix = prefix === "" ? key : `${prefix}.${key}`;
    return collectTranslationKeys(childValue, nextPrefix);
  });
};
