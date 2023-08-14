import "../css/Skills.css";

import React from "react";
import { useTranslation } from "react-i18next";

import { TagCloud } from "@frank-mayer/react-tag-cloud";

const Skills = () => {
    const { t } = useTranslation();

    const skills = [
        "Flutter",
        "React native",
        "React redux",
        "React js",
        "Three js",
        "Python",
        "C",
        "Node js",
        "Sequelize",
        "MySQL",
        "Firebase",
        "Postman",
        "GitHub",
        "Bitbucket",
        "SourceTree"
    ];

    const contentSkills = [
        {
            title: t("skills.skill_title_1"),
            content: t("skills.skill_paragraph_1"),
        },
        {
            title: t("skills.skill_title_2"),
            content: t("skills.skill_paragraph_2"),
        },
        {
            title: t("skills.skill_title_3"),
            content: t("skills.skill_paragraph_3"),
        },
        {
            title: t("skills.skill_title_4"),
            content: t("skills.skill_paragraph_4"),
        },
        {
            title: t("skills.skill_title_5"),
            content: t("skills.skill_paragraph_5"),
        },
    ];

    return (
        <div style={{
            display: "flex",
            width: "100%",
            backgroundClip: "padding-box",
            border: "1px solid rgba(2, 2, 13, 1)",
        }}>
            <div className="skills">
                <div className="skills-content">
                    <div className="container-left">
                        <h1 className="skills-title">{t("skills.title")}</h1>
                        <div className="container-left-midle">
                        <div className="circle"/>
                            <TagCloud
                            className="tagcloud-skill"
                                style={{
                                    pointerEvents: "none"
                                }}
                                
                                options={(w, TagCloudOptions) => ({
                                    radius: Math.min(800, w.innerWidth, 800) / 2,
                                })}
                            >
                                {skills}
                            </TagCloud>
                        </div>
                    </div>
                    <div className="container-middle">
                        <div>
                            {contentSkills.map((skill, index) => {
                                return (
                                    <div key={index} className="container-in-middle">
                                        <div className="container-in-in-midle">
                                            <h2 className="fontBodyBoldSkills">{skill.title}</h2>
                                            <p className="fontBodyNormalSkills" dangerouslySetInnerHTML={{ __html: skill.content.replace(/\n/g, '<br>') }}/>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;