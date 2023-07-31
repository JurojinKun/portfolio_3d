import "../css/AboutMe.css";

import React, { useRef, useState, useEffect } from "react";
import StarryBackground from "../components/StarryBackground";
import astroAboutMe from '../assets/astro_about_me.png';
import { useTranslation } from "react-i18next";

import AppTypewriter from "../components/AppTypewriter";
import { fontTitleBold, fontBodyNormal } from "../utils/fonts";

const AboutMe = () => {
    const { t } = useTranslation();

    const aboutmeRef = useRef();
    const [aboutmeHeight, setAboutmeHeight] = useState(window.innerHeight);

    useEffect(() => {
        const checkHeight = () => {
            if (aboutmeRef.current) {
                setAboutmeHeight(aboutmeRef.current.getBoundingClientRect().height);
            }
        };

        checkHeight();
        window.addEventListener('resize', checkHeight);

        // Cleanup
        return () => window.removeEventListener('resize', checkHeight);
    }, []);

    return (
        <div
            ref={aboutmeRef}
            style={{
                display: "flex",
                width: "100%",
                backgroundClip: "padding-box",
                border: "1px solid rgba(2, 2, 13, 1)",
            }}>
            <StarryBackground gradientTopLeft={true} gradientBottomRight={false} heightSection={aboutmeHeight} />
            <div className="aboutme">
                <h1 className="aboutme-title" style={fontTitleBold("50px", "white")}>{t("about_me.title")}</h1>
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
                        <p style={fontBodyNormal("23px", "white")}>{t("about_me.first_para")} 🧑‍🚀</p>
                        <p style={fontBodyNormal("23px", "white")}>{t("about_me.second_para")} 🚀</p>
                        <p style={fontBodyNormal("23px", "white")}>
                            {t("about_me.third_para")} 👨‍🎓🇨🇵
                        </p>
                        <p style={fontBodyNormal("23px", "white")}>{t("about_me.fourth_para")} 📱</p>
                        <p style={fontBodyNormal("23px", "white")}>{t("about_me.fifth_para")} 🧠</p>
                    </div>
                    <img src={astroAboutMe} alt='About me' className="img-astro-aboutme" />
                </div>
            </div>
        </div>
    );
}

export default AboutMe;