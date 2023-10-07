import "../css/AboutMe.css";

import React, { useRef, useState, useEffect } from "react";
import StarryBackground from "../components/StarryBackground";
import astroAboutMe from '../assets/astro_about_me.png';
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import AppTypewriter from "../components/AppTypewriter";
import { textVariant } from "../utils/motion";

const AboutMe = ({ threshold }) => {
    const { t } = useTranslation();

    const { ref, inView } = useInView({
        triggerOnce: true, // Change to false if you want the animation to trigger again whenever it comes in view
        threshold: threshold,
    });

    const aboutmeRef = useRef();
    const [aboutmeHeight, setAboutmeHeight] = useState(window.innerHeight);
    const [aboutmeWidth, setAboutmeWidth] = useState(window.innerWidth);

    useEffect(() => {
        const checkDimensions = () => {
            if (aboutmeRef.current) {
                setAboutmeHeight(aboutmeRef.current.getBoundingClientRect().height);
                setAboutmeWidth(aboutmeRef.current.getBoundingClientRect().width);
            }
        };

        checkDimensions();
        window.addEventListener('resize', checkDimensions);

        // Cleanup
        return () => window.removeEventListener('resize', checkDimensions);
    }, [inView]);

    return (
        <div
            ref={aboutmeRef}
            style={{
                display: "flex",
                width: "100%",
                backgroundClip: "padding-box",
                border: "1px solid rgba(2, 2, 13, 1)",
            }}>
            <StarryBackground gradientTopLeft={true} gradientBottomRight={false} heightSection={aboutmeHeight} widthSection={aboutmeWidth} />
            <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={textVariant(0.2)} className="aboutme">
                <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={textVariant(0.2)} className="aboutme-title">
                {t("about_me.title")}
                <p>{t("about_me.subtitle")}</p>
                </motion.div>
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
                        <p className="fontBodyNormalAboutMe">{t("about_me.first_para")} 🧑‍🚀</p>
                        <p className="fontBodyNormalAboutMe">{t("about_me.second_para")} 🚀</p>
                        <p className="fontBodyNormalAboutMe">
                            {t("about_me.third_para")} 👨‍🎓🇨🇵
                        </p>
                        <p className="fontBodyNormalAboutMe">{t("about_me.fourth_para")} 📱</p>
                        <p className="fontBodyNormalAboutMe">{t("about_me.fifth_para")} 🧠</p>
                    </div>
                    <img src={astroAboutMe} alt='About me' className="img-astro-aboutme" />
                </div>
            </motion.div>
        </div>
    );
}

export default AboutMe;