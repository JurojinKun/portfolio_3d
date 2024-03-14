import "../css/Skills.css";

import React from "react";
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";

import bitbucket from '../assets/skills/bitbucket.png';
import c from '../assets/skills/c.png';
import firebase from '../assets/skills/firebase.png';
import flutter from '../assets/skills/flutter.png';
import github from '../assets/skills/github.png';
import mysql from '../assets/skills/mysql.png';
import nodejs from '../assets/skills/nodejs.png';
import postman from '../assets/skills/postman.png';
import python from '../assets/skills/python.png';
import react from '../assets/skills/react.png';
import redux from '../assets/skills/redux.png';
import sequelize from '../assets/skills/sequelize.png';
import sourcetree from '../assets/skills/sourcetree.png';
import threejs from '../assets/skills/threejs.png';
import kotlin from '../assets/skills/kotlin.png';

const SkillModal = ({ skill, setSelectedSkill, t }) => {

    const imgSkill = (skill) => {
        switch (skill) {
            case "Bitbucket":
                return bitbucket;
            case "C":
                return c;
            case "Firebase":
                return firebase;
            case "Flutter":
                return flutter;
            case "GitHub":
                return github;
            case "MySQL":
                return mysql;
            case "Node js":
                return nodejs;
            case "Postman":
                return postman;
            case "Python":
                return python;
            case "React native":
                return react;
            case "React js":
                return react;
            case "React redux":
                return redux;
            case "Sequelize":
                return sequelize;
            case "SourceTree":
                return sourcetree;
            case "Three js":
                return threejs;
            case "Kotlin":
                return kotlin;
            default:
                return "";
        }
    }

    const contentSkill = (skill) => {
        switch (skill) {
            case "Bitbucket":
                return t("skills.content_bitbucket");
            case "C":
                return t("skills.content_c");
            case "Firebase":
                return t("skills.content_firebase");
            case "Flutter":
                return t("skills.content_flutter");
            case "GitHub":
                return t("skills.content_github");
            case "MySQL":
                return t("skills.content_mysql");
            case "Node js":
                return t("skills.content_nodejs");
            case "Postman":
                return t("skills.content_postman");
            case "Python":
                return t("skills.content_python");
            case "React native":
                return t("skills.content_reactnative");
            case "React js":
                return t("skills.content_reactjs");
            case "React redux":
                return t("skills.content_reactredux");
            case "Sequelize":
                return t("skills.content_sequelize");
            case "SourceTree":
                return t("skills.content_sourcetree");
            case "Three js":
                return t("skills.content_threejs");
            case "Kotlin":
                return t("skills.content_kotlin");
            default:
                return "";
        }
    }

    const skillImage = imgSkill(skill);
    const skillContent = contentSkill(skill);

    return (
        <AnimatePresence>
            <motion.div className="animated-item-skill"
                layoutId={skill}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}>
                <div className="icon-close-hover-skill" onClick={() => setSelectedSkill(null)}>
                    <FaTimes className="icon-close-skill" />
                </div>
                <img src={skillImage} alt='Skill img' className="item-img-skill" />
                <span className="title-animated-item-skill">{skill}</span>
                <span className="content-animated-item-skill">{skillContent}</span>
            </motion.div>
        </AnimatePresence>
    );
}

export default SkillModal;