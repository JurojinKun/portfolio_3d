import "../css/Skills.css";

import React from "react";
import { useTranslation } from "react-i18next";

import { TagCloud } from "@frank-mayer/react-tag-cloud";

const Skills = () => {
    const { t } = useTranslation();

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
                                {[
                                    "VSCode",
                                    "TypeScript",
                                    "React",
                                    "Preact",
                                    "Parcel",
                                    "Jest",
                                    "Next",
                                    "ESLint",
                                    "Framer Motion",
                                    "Three.js",
                                ]}
                            </TagCloud>
                        </div>
                    </div>
                    <div className="container-middle">
                        <div>
                            <div className="container-in-middle">
                                <div className="container-in-in-midle">
                                    ONE
                                </div>
                            </div>
                            <div className="container-in-middle">
                                <div className="container-in-in-midle">TWO</div>
                            </div>
                            <div className="container-in-middle">
                                <div className="container-in-in-midle">THREE</div>
                            </div>
                            <div className="container-in-middle">
                                <div className="container-in-in-midle">FOURTH</div>
                            </div>
                            <div className="container-in-middle">
                                <div className="container-in-in-midle">FIFTH</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;