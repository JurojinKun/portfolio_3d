import asm from "@/assets/projects/asm.jpg";
import botDiscord from "@/assets/projects/botdiscord.jpg";
import corsicaFerries from "@/assets/projects/corsica.jpg";
import croixRouge from "@/assets/projects/croixrouge.jpg";
import gemu from "@/assets/projects/gemu.jpg";
import hobbies from "@/assets/projects/hobbies.jpg";
import madewis from "@/assets/projects/madewis.jpg";
import myYoukounkoun from "@/assets/projects/myyoukounkoun.jpg";
import parisMaVille from "@/assets/projects/parismaville.jpg";
import portfolio from "@/assets/projects/portfolio.jpg";
import sauveMonVaccin from "@/assets/projects/smv.jpg";

import type { TranslationKey } from "./translationKeys";

type HexColor = `#${string}`;
type RgbaColor = `rgba(${number}, ${number}, ${number}, ${number})`;

export type ProjectCategory = "professional" | "personal";

export type ProjectId =
  | "sauve-mon-vaccin"
  | "corsica-ferries"
  | "madewis"
  | "hobbies"
  | "la-croix-rouge-francaise"
  | "asm-clermont-auvergne"
  | "paris-ma-ville"
  | "gemu"
  | "my-youkounkoun"
  | "portfolio-3d"
  | "bot-discord";

export interface ProjectTheme {
  primaryColor: HexColor;
  shadowColor: RgbaColor;
}

export interface ProjectData {
  id: ProjectId;
  category: ProjectCategory;
  challengesKey: TranslationKey;
  contextKey: TranslationKey;
  image: string;
  imageAlt: string;
  repositoryUrl?: `https://${string}`;
  resultsKey: TranslationKey;
  summaryKey: TranslationKey;
  theme: ProjectTheme;
  titleKey: TranslationKey;
}

export const projects = [
  {
    id: "sauve-mon-vaccin",
    category: "professional",
    challengesKey: "projects.challenges_content_smv",
    contextKey: "projects.content_context_smv",
    image: sauveMonVaccin,
    imageAlt: "Sauve mon vaccin",
    resultsKey: "projects.results_content_smv",
    summaryKey: "projects.content_project_pro_1",
    theme: {
      primaryColor: "#cd2326",
      shadowColor: "rgba(205, 35, 38, 0.2)",
    },
    titleKey: "projects.title_project_pro_1",
  },
  {
    id: "corsica-ferries",
    category: "professional",
    challengesKey: "projects.challenges_content_cf",
    contextKey: "projects.content_context_cf",
    image: corsicaFerries,
    imageAlt: "Corsica Ferries",
    resultsKey: "projects.results_content_cf",
    summaryKey: "projects.content_project_pro_2",
    theme: {
      primaryColor: "#fcee4f",
      shadowColor: "rgba(252, 238, 79, 0.2)",
    },
    titleKey: "projects.title_project_pro_2",
  },
  {
    id: "madewis",
    category: "professional",
    challengesKey: "projects.challenges_content_madewis",
    contextKey: "projects.content_context_madewis",
    image: madewis,
    imageAlt: "Madewis",
    resultsKey: "projects.results_content_madewis",
    summaryKey: "projects.content_project_pro_3",
    theme: {
      primaryColor: "#000000",
      shadowColor: "rgba(0, 0, 0, 0.2)",
    },
    titleKey: "projects.title_project_pro_3",
  },
  {
    id: "hobbies",
    category: "professional",
    challengesKey: "projects.challenges_content_hobbies",
    contextKey: "projects.content_context_hobbies",
    image: hobbies,
    imageAlt: "Hobbies",
    resultsKey: "projects.results_content_hobbies",
    summaryKey: "projects.content_project_pro_4",
    theme: {
      primaryColor: "#ed742f",
      shadowColor: "rgba(237, 116, 47, 0.2)",
    },
    titleKey: "projects.title_project_pro_4",
  },
  {
    id: "la-croix-rouge-francaise",
    category: "professional",
    challengesKey: "projects.challenges_content_crf",
    contextKey: "projects.content_context_crf",
    image: croixRouge,
    imageAlt: "La croix rouge francaise",
    resultsKey: "projects.results_content_crf",
    summaryKey: "projects.content_project_pro_5",
    theme: {
      primaryColor: "#ffffff",
      shadowColor: "rgba(255, 255, 255, 0.2)",
    },
    titleKey: "projects.title_project_pro_5",
  },
  {
    id: "asm-clermont-auvergne",
    category: "professional",
    challengesKey: "projects.challenges_content_asm",
    contextKey: "projects.content_context_asm",
    image: asm,
    imageAlt: "ASM Clermont Auvergne",
    resultsKey: "projects.results_content_asm",
    summaryKey: "projects.content_project_pro_6",
    theme: {
      primaryColor: "#042e6c",
      shadowColor: "rgba(4, 46, 108, 0.2)",
    },
    titleKey: "projects.title_project_pro_6",
  },
  {
    id: "paris-ma-ville",
    category: "professional",
    challengesKey: "projects.challenges_content_pmv",
    contextKey: "projects.content_context_pmv",
    image: parisMaVille,
    imageAlt: "Paris ma Ville",
    resultsKey: "projects.results_content_pmv",
    summaryKey: "projects.content_project_pro_7",
    theme: {
      primaryColor: "#2a42b7",
      shadowColor: "rgba(42, 66, 183, 0.2)",
    },
    titleKey: "projects.title_project_pro_7",
  },
  {
    id: "gemu",
    category: "personal",
    challengesKey: "projects.challenges_content_gemu",
    contextKey: "projects.content_context_gemu",
    image: gemu,
    imageAlt: "Gemu",
    repositoryUrl: "https://github.com/Gemu-Inc/Gemu_ui",
    resultsKey: "projects.results_content_gemu",
    summaryKey: "projects.content_project_perso_1",
    theme: {
      primaryColor: "#6077bd",
      shadowColor: "rgba(96, 119, 189, 0.2)",
    },
    titleKey: "projects.title_project_perso_1",
  },
  {
    id: "my-youkounkoun",
    category: "personal",
    challengesKey: "projects.challenges_content_myy",
    contextKey: "projects.content_context_myy",
    image: myYoukounkoun,
    imageAlt: "My youkounkoun",
    repositoryUrl: "https://github.com/JurojinKun/my_youkounkoun_front",
    resultsKey: "projects.results_content_myy",
    summaryKey: "projects.content_project_perso_2",
    theme: {
      primaryColor: "#074367",
      shadowColor: "rgba(7, 67, 103, 0.2)",
    },
    titleKey: "projects.title_project_perso_2",
  },
  {
    id: "portfolio-3d",
    category: "personal",
    challengesKey: "projects.challenges_content_portfolio",
    contextKey: "projects.content_context_portfolio",
    image: portfolio,
    imageAlt: "Portfolio 3D",
    repositoryUrl: "https://github.com/JurojinKun/portfolio_3d",
    resultsKey: "projects.results_content_portfolio",
    summaryKey: "projects.content_project_perso_3",
    theme: {
      primaryColor: "#c4658d",
      shadowColor: "rgba(196, 101, 141, 0.2)",
    },
    titleKey: "projects.title_project_perso_3",
  },
  {
    id: "bot-discord",
    category: "personal",
    challengesKey: "projects.challenges_content_bot",
    contextKey: "projects.content_context_bot",
    image: botDiscord,
    imageAlt: "Bot discord",
    repositoryUrl: "https://github.com/JurojinKun/bot-discord-opf-stats",
    resultsKey: "projects.results_content_bot",
    summaryKey: "projects.content_project_perso_4",
    theme: {
      primaryColor: "#85b68c",
      shadowColor: "rgba(133, 182, 140, 0.2)",
    },
    titleKey: "projects.title_project_perso_4",
  },
] as const satisfies readonly ProjectData[];

export const professionalProjects = projects.filter(
  (project) => project.category === "professional",
);

export const personalProjects = projects.filter(
  (project) => project.category === "personal",
);
