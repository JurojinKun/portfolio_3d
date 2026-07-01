import bitbucket from "@/assets/skills/bitbucket.png";
import c from "@/assets/skills/c.png";
import firebase from "@/assets/skills/firebase.png";
import flutter from "@/assets/skills/flutter.png";
import github from "@/assets/skills/github.png";
import kotlin from "@/assets/skills/kotlin.png";
import mysql from "@/assets/skills/mysql.png";
import nodejs from "@/assets/skills/nodejs.png";
import postman from "@/assets/skills/postman.png";
import python from "@/assets/skills/python.png";
import react from "@/assets/skills/react.png";
import redux from "@/assets/skills/redux.png";
import sequelize from "@/assets/skills/sequelize.png";
import sourcetree from "@/assets/skills/sourcetree.png";
import threejs from "@/assets/skills/threejs.png";

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
    image: flutter,
    label: "Flutter",
  },
  {
    id: "react-native",
    category: "mobile",
    contentKey: "skills.content_reactnative",
    image: react,
    label: "React native",
  },
  {
    id: "kotlin",
    category: "mobile",
    contentKey: "skills.content_kotlin",
    image: kotlin,
    label: "Kotlin",
  },
  {
    id: "c",
    category: "language",
    contentKey: "skills.content_c",
    image: c,
    label: "C",
  },
  {
    id: "mysql",
    category: "database",
    contentKey: "skills.content_mysql",
    image: mysql,
    label: "MySQL",
  },
  {
    id: "python",
    category: "language",
    contentKey: "skills.content_python",
    image: python,
    label: "Python",
  },
  {
    id: "three-js",
    category: "frontend",
    contentKey: "skills.content_threejs",
    image: threejs,
    label: "Three js",
  },
  {
    id: "node-js",
    category: "backend",
    contentKey: "skills.content_nodejs",
    image: nodejs,
    label: "Node js",
  },
  {
    id: "sequelize",
    category: "backend",
    contentKey: "skills.content_sequelize",
    image: sequelize,
    label: "Sequelize",
  },
  {
    id: "firebase",
    category: "backend",
    contentKey: "skills.content_firebase",
    image: firebase,
    label: "Firebase",
  },
  {
    id: "react-redux",
    category: "frontend",
    contentKey: "skills.content_reactredux",
    image: redux,
    label: "React redux",
  },
  {
    id: "postman",
    category: "tool",
    contentKey: "skills.content_postman",
    image: postman,
    label: "Postman",
  },
  {
    id: "github",
    category: "version-control",
    contentKey: "skills.content_github",
    image: github,
    label: "GitHub",
  },
  {
    id: "react-js",
    category: "frontend",
    contentKey: "skills.content_reactjs",
    image: react,
    label: "React js",
  },
  {
    id: "bitbucket",
    category: "version-control",
    contentKey: "skills.content_bitbucket",
    image: bitbucket,
    label: "Bitbucket",
  },
  {
    id: "sourcetree",
    category: "version-control",
    contentKey: "skills.content_sourcetree",
    image: sourcetree,
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
