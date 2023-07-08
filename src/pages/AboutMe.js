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
                <h1 className="section-title">À propos de moi</h1>
                <div className="aboutme-content">
                    <div className="overview-aboutme">
                        <AppTypewriter
                            strings={[
                                t("overview.type_writer_1"),
                                t("overview.type_writer_2"),
                            ]}
                            wrapperClassName="typewriterWrapper"
                            cursorClassName="typewriterCursor"
                        />
                        <p>Ohhh tu es déjà là?  Oui, c'est moi qui te parle, sur ta droite, je serais ton guide tout au long de ton voyage ici. Tu peux m'appeler Astr0ruj ! 🧑‍🚀</p>
                        <p>Pour commencer la visite, quoi de mieux qu'une petite présentation de moi-même. 🚀</p>
                        <p>
                            {t("overview.first_para")} 👨‍🎓🇨🇵
                        </p>
                        <p>{t("overview.second_para")} 📱</p>
                        <p>{t("overview.third_para")} 🧠</p>
                    </div>
                    <img src={astroAboutMe} alt='About me' className="img-astro-aboutme" />
                </div>
            </div>
        </>
    );
}

export default AboutMe;