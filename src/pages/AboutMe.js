import "../css/Portfolio.css";
import "../css/AboutMe.css";

import React from "react";
import StarryBackground from "../components/StarryBackground";
import astroAboutMe from '../assets/astro_about_me.png';
import { useTranslation } from "react-i18next";

import AppTypewriter from "../components/AppTypewriter";

const AboutMe = () => {
    const { t } = useTranslation();

    return (
        <>
            <StarryBackground gradientTopLeft={true} gradientBottomRight={false} />
            <div className="aboutme">
                <h1 className="section-title">{t("about_me.title")}</h1>
                <div className="aboutme-content">
                    <div className="overview-aboutme">
                        <AppTypewriter
                            strings={[
                                t("about_me.type_writer_1"),
                                t("about_me.type_writer_2"),
                            ]}
                            wrapperClassName="typewriterWrapper"
                            cursorClassName="typewriterCursor"
                        />
                        <p>{t("about_me.first_para")} 🧑‍🚀</p>
                        <p>{t("about_me.second_para")} 🚀</p>
                        <p>
                            {t("about_me.third_para")} 👨‍🎓🇨🇵
                        </p>
                        <p>{t("about_me.fourth_para")} 📱</p>
                        <p>{t("about_me.fifth_para")} 🧠</p>
                    </div>
                    <img src={astroAboutMe} alt='About me' className="img-astro-aboutme" />
                </div>
            </div>
        </>
    );
}

export default AboutMe;