import { sourceAssets } from "@/shared/assets/sourceAssets";

import type { TranslationKey } from "./translationKeys";

export type SkillCategory =
  | "backend"
  | "database"
  | "frontend"
  | "language"
  | "mobile"
  | "tool"
  | "version-control";

export type SkillId =
  | "flutter"
  | "react-native"
  | "kotlin"
  | "c"
  | "mysql"
  | "python"
  | "three-js"
  | "node-js"
  | "sequelize"
  | "firebase"
  | "react-redux"
  | "postman"
  | "github"
  | "react-js"
  | "bitbucket"
  | "sourcetree";

export type SkillStorySectionId =
  | "development-start"
  | "self-taught-learning"
  | "frontend-years"
  | "backend-growth"
  | "future";

export interface SkillData {
  id: SkillId;
  category: SkillCategory;
  contentKey: TranslationKey;
  image: string;
  label: string;
}

export interface SkillStorySectionData {
  id: SkillStorySectionId;
  contentKey: TranslationKey;
  titleKey: TranslationKey;
}

export const skills = [
  {
    id: "flutter",
    category: "mobile",
    contentKey: "skills.content_flutter",
    image: sourceAssets.skills.flutter,
    label: "Flutter",
  },
  {
    id: "react-native",
    category: "mobile",
    contentKey: "skills.content_reactnative",
    image: sourceAssets.skills.react,
    label: "React native",
  },
  {
    id: "kotlin",
    category: "mobile",
    contentKey: "skills.content_kotlin",
    image: sourceAssets.skills.kotlin,
    label: "Kotlin",
  },
  {
    id: "c",
    category: "language",
    contentKey: "skills.content_c",
    image: sourceAssets.skills.c,
    label: "C",
  },
  {
    id: "mysql",
    category: "database",
    contentKey: "skills.content_mysql",
    image: sourceAssets.skills.mysql,
    label: "MySQL",
  },
  {
    id: "python",
    category: "language",
    contentKey: "skills.content_python",
    image: sourceAssets.skills.python,
    label: "Python",
  },
  {
    id: "three-js",
    category: "frontend",
    contentKey: "skills.content_threejs",
    image: sourceAssets.skills.threejs,
    label: "Three js",
  },
  {
    id: "node-js",
    category: "backend",
    contentKey: "skills.content_nodejs",
    image: sourceAssets.skills.nodejs,
    label: "Node js",
  },
  {
    id: "sequelize",
    category: "backend",
    contentKey: "skills.content_sequelize",
    image: sourceAssets.skills.sequelize,
    label: "Sequelize",
  },
  {
    id: "firebase",
    category: "backend",
    contentKey: "skills.content_firebase",
    image: sourceAssets.skills.firebase,
    label: "Firebase",
  },
  {
    id: "react-redux",
    category: "frontend",
    contentKey: "skills.content_reactredux",
    image: sourceAssets.skills.redux,
    label: "React redux",
  },
  {
    id: "postman",
    category: "tool",
    contentKey: "skills.content_postman",
    image: sourceAssets.skills.postman,
    label: "Postman",
  },
  {
    id: "github",
    category: "version-control",
    contentKey: "skills.content_github",
    image: sourceAssets.skills.github,
    label: "GitHub",
  },
  {
    id: "react-js",
    category: "frontend",
    contentKey: "skills.content_reactjs",
    image: sourceAssets.skills.react,
    label: "React js",
  },
  {
    id: "bitbucket",
    category: "version-control",
    contentKey: "skills.content_bitbucket",
    image: sourceAssets.skills.bitbucket,
    label: "Bitbucket",
  },
  {
    id: "sourcetree",
    category: "version-control",
    contentKey: "skills.content_sourcetree",
    image: sourceAssets.skills.sourcetree,
    label: "SourceTree",
  },
] as const satisfies readonly SkillData[];

export const skillStorySections = [
  {
    id: "development-start",
    contentKey: "skills.skill_paragraph_1",
    titleKey: "skills.skill_title_1",
  },
  {
    id: "self-taught-learning",
    contentKey: "skills.skill_paragraph_2",
    titleKey: "skills.skill_title_2",
  },
  {
    id: "frontend-years",
    contentKey: "skills.skill_paragraph_3",
    titleKey: "skills.skill_title_3",
  },
  {
    id: "backend-growth",
    contentKey: "skills.skill_paragraph_4",
    titleKey: "skills.skill_title_4",
  },
  {
    id: "future",
    contentKey: "skills.skill_paragraph_5",
    titleKey: "skills.skill_title_5",
  },
] as const satisfies readonly SkillStorySectionData[];
