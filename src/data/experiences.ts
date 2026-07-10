import cgi from "@/assets/experiences/cgi.png";
import digitalPaca from "@/assets/experiences/dp.png";
import groupeAtlantic from "@/assets/experiences/groupe-atlantic.png";
import pepiteToulon from "@/assets/experiences/pepite.png";

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
    icon: cgi,
    iconAlt: "CGI",
    iconBackgroundColor: "#E6DEDD",
    pointKeys: [
      "experiences.point_1_experience_4",
      "experiences.point_1_experience_5",
      "experiences.point_1_experience_6",
    ],
    titleKey: "experiences.title_experience_4",
  },
  {
    id: "digital-paca",
    companyKey: "experiences.company_experience_1",
    dateKey: "experiences.date_experience_1",
    icon: digitalPaca,
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
    icon: pepiteToulon,
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
    icon: groupeAtlantic,
    iconAlt: "Groupe Atlantic",
    iconBackgroundColor: "#E6DEDD",
    pointKeys: ["experiences.point_1_experience_3"],
    titleKey: "experiences.title_experience_3",
  },
] as const satisfies readonly ExperienceData[];
