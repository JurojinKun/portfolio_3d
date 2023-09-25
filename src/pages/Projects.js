import "../css/Projects.css";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { isMobile } from 'react-device-detect';

import smv from '../assets/projects/smv.jpg';
import corsica from '../assets/projects/corsica.jpg';
import madewis from '../assets/projects/madewis.jpg';
import hobbies from '../assets/projects/hobbies.jpg';
import croixrouge from '../assets/projects/croixrouge.jpg';
import gemu from '../assets/projects/gemu.jpg';
import myyoukounkoun from '../assets/projects/myyoukounkoun.jpg';
import portfolio from '../assets/projects/portfolio.jpg';
import { textVariant, fadeIn } from "../utils/motion";

const ProProjects = ({ menuOpened, t }) => {

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5
    });

    const [state, setState] = useState({
        goToSlide: 0,
        offsetRadius: 1,
        showNavigation: false,
        enableSwipe: true,
        config: config.gentle
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        {
            key: 1,
            content:
                <div className="slide">
                    <img src={smv} alt="1" style={{
                        objectFit: "cover",
                        objectPosition: "center"
                    }} />
                    <div className={isMobile ? "content-slide-mobile" : "content-slide"}>
                        <h2>
                            {t("projects.title_project_pro_1")}
                        </h2>
                        <p>{t("projects.content_project_pro_1")}</p>
                    </div>
                </div>
        },
        {
            key: 2,
            content: <div className="slide">
                <img src={corsica} alt="2" style={{
                    objectFit: "cover",
                    objectPosition: "center"
                }} />
                <div className={isMobile ? "content-slide-mobile" : "content-slide"}>
                    <h2>
                        {t("projects.title_project_pro_2")}
                    </h2>
                    <p>{t("projects.content_project_pro_2")}</p>
                </div>
            </div>
        },
        {
            key: 3,
            content: <div className="slide">
                <img src={madewis} alt="3" style={{
                    objectFit: "cover",
                    objectPosition: "center"
                }} />
                <div className={isMobile ? "content-slide-mobile" : "content-slide"}>
                    <h2>
                        {t("projects.title_project_pro_3")}
                    </h2>
                    <p>{t("projects.content_project_pro_3")}</p>
                </div>
            </div>
        },
        {
            key: 4,
            content: <div className="slide">
                <img src={hobbies} alt="4" style={{
                    objectFit: "cover",
                    objectPosition: "center"
                }} />
                <div className={isMobile ? "content-slide-mobile" : "content-slide"}>
                    <h2>
                        {t("projects.title_project_pro_4")}
                    </h2>
                    <p>{t("projects.content_project_pro_4")}</p>
                </div>
            </div>
        },
        {
            key: 5,
            content: <div className="slide">
                <img src={croixrouge} alt="5" style={{
                    objectFit: "cover",
                    objectPosition: "center"
                }} />
                <div className={isMobile ? "content-slide-mobile" : "content-slide"}>
                    <h2>
                        {t("projects.title_project_pro_5")}
                    </h2>
                    <p>{t("projects.content_project_pro_5")}</p>
                </div>
            </div>
        },
    ].map((slide, index) => {
        return {
            ...slide, onClick: () => {
                if (!menuOpened) {
                    if (index !== currentIndex) {
                        setState({
                            goToSlide: index, offsetRadius: 1,
                            showNavigation: false,
                            enableSwipe: true,
                            config: config.gentle
                        });
                        setCurrentIndex(index);
                    } else {
                        alert(t("wip.label"));
                    }
                }
            }
        };
    });

    return (
        <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={fadeIn("top", "tween", 0.2, 1)} className="container-caroussel">
            <div className="container-arrow-icon">
                <div className={isMobile ? "arrow-icon-hover-mobile" : "arrow-icon-hover"} onClick={() => {
                    if (!menuOpened) {
                        setState({
                            goToSlide: currentIndex - 1, offsetRadius: 1,
                            showNavigation: false,
                            enableSwipe: true,
                            config: config.gentle
                        });
                        setCurrentIndex(currentIndex - 1);
                    }
                }}>
                    <IoIosArrowBack className="arrow-icon" />
                </div>
            </div>
            <div
                className="container-slides"
            >
                <Carousel
                    slides={slides}
                    goToSlide={state.goToSlide}
                    offsetRadius={state.offsetRadius}
                    showNavigation={state.showNavigation}
                    enableSwipe={state.enableSwipe}
                    animationConfig={state.config}
                />
            </div>
            <div className="container-arrow-icon">
                <div className={isMobile ? "arrow-icon-hover-mobile" : "arrow-icon-hover"} onClick={() => {
                    if (!menuOpened) {
                        setState({
                            goToSlide: currentIndex + 1, offsetRadius: 1,
                            showNavigation: false,
                            enableSwipe: true,
                            config: config.gentle
                        });
                        setCurrentIndex(currentIndex + 1);
                    }
                }}>
                    <IoIosArrowForward className="arrow-icon" />
                </div>
            </div>
        </motion.div>
    );

}

const PrivateProjects = ({ menuOpened, t }) => {

    const { ref, inView } = useInView({
        triggerOnce: true, // Change to false if you want the animation to trigger again whenever it comes in view
        threshold: 0.5
    });

    const [state, setState] = useState({
        goToSlide: 0,
        offsetRadius: 1,
        showNavigation: false,
        enableSwipe: true,
        config: config.gentle
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    let slides = [
        {
            key: 1,
            content:
                <div className="slide">
                    <img src={gemu} alt="1" style={{
                    objectFit: "cover",
                    objectPosition: "center"
                }} />
                    <div className={isMobile ? "content-slide-mobile" : "content-slide"}>
                        <h2>
                            {t("projects.title_project_perso_1")}
                        </h2>
                        <p>{t("projects.content_project_perso_1")}</p>
                    </div>
                </div>
        },
        {
            key: 2,
            content: <div className="slide">
                <img src={myyoukounkoun} alt="2" style={{
                    objectFit: "cover",
                    objectPosition: "center"
                }} />
                <div className={isMobile ? "content-slide-mobile" : "content-slide"}>
                    <h2>
                        {t("projects.title_project_perso_2")}
                    </h2>
                    <p>{t("projects.content_project_perso_2")}</p>
                </div>
            </div>
        },
        {
            key: 3,
            content: <div className="slide">
                <img src={portfolio} alt="3" style={{
                    objectFit: "cover",
                    objectPosition: "center"
                }} />
                <div className={isMobile ? "content-slide-mobile" : "content-slide"}>
                    <h2>
                        {t("projects.title_project_perso_3")}
                    </h2>
                    <p>{t("projects.content_project_perso_3")}</p>
                </div>
            </div>
        },
    ].map((slide, index) => {
        return {
            ...slide, onClick: () => {
                if (!menuOpened) {
                    if (index !== currentIndex) {
                        setState({
                            goToSlide: index,
                            offsetRadius: 1,
                            showNavigation: false,
                            enableSwipe: true,
                            config: config.gentle
                        });
                        setCurrentIndex(index);
                    } else {
                        alert(t("wip.label"));
                    }
                }
            }
        };
    });

    return (
        <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={fadeIn("bottom", "tween", 0.2, 1)} className="container-caroussel">
            <div className="container-arrow-icon">
                <div className={isMobile ? "arrow-icon-hover-mobile" : "arrow-icon-hover"} onClick={() => {
                    if (!menuOpened) {
                        setState({
                            goToSlide: currentIndex - 1,
                            offsetRadius: 1,
                            showNavigation: false,
                            enableSwipe: true,
                            config: config.gentle
                        });
                        setCurrentIndex(currentIndex - 1);
                    }
                }}>
                    <IoIosArrowBack className="arrow-icon" />
                </div>
            </div>
            <div
                className="container-slides"
            >
                <Carousel
                    slides={slides}
                    goToSlide={state.goToSlide}
                    offsetRadius={state.offsetRadius}
                    showNavigation={state.showNavigation}
                    enableSwipe={state.enableSwipe}
                    animationConfig={state.config}
                />
            </div>
            <div className="container-arrow-icon">
                <div className={isMobile ? "arrow-icon-hover-mobile" : "arrow-icon-hover"} onClick={() => {
                    if (!menuOpened) {
                        setState({
                            goToSlide: currentIndex + 1,
                            offsetRadius: 1,
                            showNavigation: false,
                            enableSwipe: true,
                            config: config.gentle
                        });
                        setCurrentIndex(currentIndex + 1);
                    }
                }}>
                    <IoIosArrowForward className="arrow-icon" />
                </div>
            </div>
        </motion.div>
    );
}

const Projects = ({ menuOpened }) => {
    const { t } = useTranslation();

    const { ref, inView } = useInView({
        triggerOnce: true, // Change to false if you want the animation to trigger again whenever it comes in view
        threshold: 0.5
    });

    return (
        <div className="projects">
            <div className="projects-content-pro">
                <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={textVariant(0.2)} className="projects-title">
                    {t("projects.title_pro")}
                    <p>{t("projects.subtitle_pro")}</p>
                </motion.div>
                <ProProjects menuOpened={menuOpened} t={t} />
            </div>
            <div className="projects-content-perso">
                <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={textVariant(0.2)} className="projects-title">
                    {t("projects.title_private")}
                    <p>{t("projects.subtitle_private")}</p>
                </motion.div>
                <PrivateProjects menuOpened={menuOpened} t={t} />
            </div>
        </div>
    );
}

export default Projects;