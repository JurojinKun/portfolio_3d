import "../css/Skills.css";

import React from "react";
import { useTranslation } from "react-i18next";

import { TagCloud } from "@frank-mayer/react-tag-cloud";

const Skills = () => {
    const { t } = useTranslation();

    const skills = [
        "VSCode",
        "TypeScript",
        "React",
        "Preact",
        "Parcel",
        "Jest",
        "Next",
        "ESLint",
        "Framer Motion",
        "Three.js"
    ];

    const contentSkills = [
        {
            "title": "First skills",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum fbrughrughruhgrivnrgbruhrugntugrhgurbhhhththtcvfbgbgbgb gurgburghrugrughrugnrighrig hrigrhgirhgirghr ighrighrighrigri",
        },
        {
            "title": "Second skills",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        },
        {
            "title": "Third skills",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        },
        {
            "title": "Fourth skills",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        },
        {
            "title": "Fifth skills",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
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
                            <div className="circle" />
                            <TagCloud
                                style={{
                                    color: "white",
                                    fontSize: "30px",
                                    fontWeight: "bold"
                                }}
                                options={(w, TagCloudOptions) => ({
                                    radius: Math.min(400, 400, 400),
                                })}
                                onClick={(tag, ev) => alert(tag)}
                                onClickOptions={{ passive: true }}
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
                                            <h2 style={{
                                                color: "white",
                                                font: "24px",
                                                fontWeight: "bold"
                                            }}>{skill.title}</h2>
                                            <p style={{
                                                color: "white",
                                                font: "16px",
                                                fontWeight: "bold"
                                            }}>{skill.content}</p>
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