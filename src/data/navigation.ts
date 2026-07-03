import type { TranslationKey } from "./translationKeys";

export type PortfolioSectionId =
  "aboutme" | "skills" | "experiences" | "projects" | "contactme";

export type PortfolioRoute = `/portfolio/${PortfolioSectionId}`;
export type PublicIconPath = `/icons/${string}.svg`;

export interface PortfolioSectionData {
  id: PortfolioSectionId;
  iconPath: PublicIconPath;
  labelKey: TranslationKey;
  route: PortfolioRoute;
}

export interface NotFoundNavigationData {
  id: "notfound";
  iconPath: PublicIconPath;
  isBug: true;
  label: "ERR 404";
  route: "/notfound";
}

export const portfolioSections = [
  {
    id: "aboutme",
    iconPath: "/icons/about_me.svg",
    labelKey: "satellites.about_me",
    route: "/portfolio/aboutme",
  },
  {
    id: "experiences",
    iconPath: "/icons/experiences.svg",
    labelKey: "satellites.experiences",
    route: "/portfolio/experiences",
  },
  {
    id: "skills",
    iconPath: "/icons/skills.svg",
    labelKey: "satellites.skills",
    route: "/portfolio/skills",
  },
  {
    id: "projects",
    iconPath: "/icons/projects.svg",
    labelKey: "satellites.projects",
    route: "/portfolio/projects",
  },
  {
    id: "contactme",
    iconPath: "/icons/contact_me.svg",
    labelKey: "satellites.contact_me",
    route: "/portfolio/contactme",
  },
] as const satisfies readonly PortfolioSectionData[];

export const notFoundNavigationItem = {
  id: "notfound",
  iconPath: "/icons/not_found.svg",
  isBug: true,
  label: "ERR 404",
  route: "/notfound",
} as const satisfies NotFoundNavigationData;

export const satelliteNavigationItems = [
  ...portfolioSections,
  notFoundNavigationItem,
] as const;
