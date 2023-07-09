import { useTranslation } from "react-i18next";
import "../css/Portfolio.css";
import "../css/Skills.css";

import React from "react";

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
                <h1 className="section-title">{t("skills.title")}</h1>
                <div className="skills-content">
                    <div className="container-left">
                        <div className="container-left-in-midle">TEST</div>
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