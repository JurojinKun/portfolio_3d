import "../css/AboutMe.css";

import React from "react";
import StarryBackground from "../components/StarryBackground";
import astroAboutMe from '../assets/astro_about_me.png';
import { useTranslation } from "react-i18next";

const AboutMe = () => {
    const { t } = useTranslation();

    return (
        <>
            <StarryBackground gradientTopLeft={true} gradientBottomRight={false} />
            <div className='aboutme'>
                <div className="overview-aboutme">
                    <h1>
                        {t("overview.hello")}  <span className="name">0ruj</span> <span className="wave">👋🏻</span>
                    </h1>
                    <p>
                        {t("overview.first_para")} 👨‍🎓🇨🇵
                    </p>
                    <p>{t("overview.second_para")} 📱</p>
                    <p>{t("overview.third_para")} 🧠</p>
                </div>
                <img src={astroAboutMe} alt='About me' className="img-astro-aboutme" />
            </div>
        </>
    );
}

export default AboutMe;