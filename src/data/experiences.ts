import { sourceAssets } from "@/shared/assets/sourceAssets";

import type { TranslationKey } from "./translationKeys";

type HexColor = `#${string}`;

export type ExperienceId =
  "cgi" | "digital-paca" | "pepite-toulon" | "groupe-atlantic";

export interface ExperienceData {
  id: ExperienceId;
  companyKey: TranslationKey;
  dateKey: TranslationKey;
  icon: string;
  iconAlt: string;
  iconBackgroundColor: HexColor;
  pointKeys: readonly TranslationKey[];
  titleKey: TranslationKey;
}

export const experiences = [
  {
    id: "cgi",
    companyKey: "experiences.company_experience_4",
    dateKey: "experiences.date_experience_4",
    icon: sourceAssets.experiences.cgi,
    iconAlt: "CGI",
    iconBackgroundColor: "#E6DEDD",
    pointKeys: [
      "experiences.point_1_experience_4",
      "experiences.point_1_experience_5",
    ],
    titleKey: "experiences.title_experience_4",
  },
  {
    id: "digital-paca",
    companyKey: "experiences.company_experience_1",
    dateKey: "experiences.date_experience_1",
    icon: sourceAssets.experiences.digitalPaca,
    iconAlt: "Digital Paca",
    iconBackgroundColor: "#E6DEDD",
    pointKeys: [
      "experiences.point_1_experience_1",
      "experiences.point_2_experience_1",
      "experiences.point_3_experience_1",
      "experiences.point_4_experience_1",
      "experiences.point_5_experience_1",
    ],
    titleKey: "experiences.title_experience_1",
  },
  {
    id: "pepite-toulon",
    companyKey: "experiences.company_experience_2",
    dateKey: "experiences.date_experience_2",
    icon: sourceAssets.experiences.pepiteToulon,
    iconAlt: "Pepite Toulon",
    iconBackgroundColor: "#E6DEDD",
    pointKeys: [
      "experiences.point_1_experience_2",
      "experiences.point_2_experience_2",
    ],
    titleKey: "experiences.title_experience_2",
  },
  {
    id: "groupe-atlantic",
    companyKey: "experiences.company_experience_3",
    dateKey: "experiences.date_experience_3",
    icon: sourceAssets.experiences.groupeAtlantic,
    iconAlt: "Groupe Atlantic",
    iconBackgroundColor: "#E6DEDD",
    pointKeys: ["experiences.point_1_experience_3"],
    titleKey: "experiences.title_experience_3",
  },
] as const satisfies readonly ExperienceData[];
