import type { TranslationKey } from "./translationKeys";

export type AboutParagraphId =
  "intro-guide" | "presentation" | "engineering" | "frontend" | "backend";

export interface AboutParagraphData {
  id: AboutParagraphId;
  textKey: TranslationKey;
}

export const aboutHighlights = [
  "about_me.type_writer_1",
  "about_me.type_writer_2",
] as const satisfies readonly TranslationKey[];

export const aboutParagraphs = [
  {
    id: "intro-guide",
    textKey: "about_me.first_para",
  },
  {
    id: "presentation",
    textKey: "about_me.second_para",
  },
  {
    id: "engineering",
    textKey: "about_me.third_para",
  },
  {
    id: "frontend",
    textKey: "about_me.fourth_para",
  },
  {
    id: "backend",
    textKey: "about_me.fifth_para",
  },
] as const satisfies readonly AboutParagraphData[];
