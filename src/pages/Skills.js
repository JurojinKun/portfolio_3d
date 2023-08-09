import "../css/Skills.css";

import React from "react";
import { useTranslation } from "react-i18next";

import { TagCloud } from "@frank-mayer/react-tag-cloud";
import { fontTitleBold, fontBodyBold, fontBodyNormal } from "../utils/fonts";

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
            title: "First skills",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum fbrughrughruhgrivnrgbruhrugntugrhgurbhhhththtcvfbgbgbgb gurgburghrugrughrugnrighrig hrigrhgirhgirghr ighrighrighrigri",
        },
        {
            title: "Second skills",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        },
        {
            title: "Third skills",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        },
        {
            title: "Fourth skills",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        },
        {
            title: "Fifth skills",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
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
                        <h1 className="skills-title" style={fontTitleBold("50px", "white")}>{t("skills.title")}</h1>
                        <div className="container-left-midle">
                        <div className="circle"/>
                            <TagCloud
                                style={{
                                    ...fontTitleBold("30px", "white"),
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
                                            <h2 style={fontBodyBold("25px", "white")}>{skill.title}</h2>
                                            <p style={fontBodyNormal("20px", "white")}>{skill.content}</p>
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