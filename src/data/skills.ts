import bitbucket from "@/assets/skills/bitbucket.svg";
import c from "@/assets/skills/c.svg";
import firebase from "@/assets/skills/firebase.svg";
import flutter from "@/assets/skills/flutter.svg";
import github from "@/assets/skills/github.svg";
import kotlin from "@/assets/skills/kotlin.svg";
import mysql from "@/assets/skills/mysql.svg";
import nodejs from "@/assets/skills/nodejs.svg";
import postman from "@/assets/skills/postman.svg";
import python from "@/assets/skills/python.svg";
import react from "@/assets/skills/react.svg";
import redux from "@/assets/skills/redux.svg";
import sequelize from "@/assets/skills/sequelize.svg";
import sourcetree from "@/assets/skills/sourcetree.svg";
import threejs from "@/assets/skills/threejs.svg";

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

export interface SkillData {
  id: SkillId;
  category: SkillCategory;
  contentKey: TranslationKey;
  image: string;
  label: string;
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
    label: "React",
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
