import "../css/Projects.css";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { isMobile } from 'react-device-detect';
import { FaTimes } from 'react-icons/fa';

import smv from '../assets/projects/smv.jpg';
import corsica from '../assets/projects/corsica.jpg';
import madewis from '../assets/projects/madewis.jpg';
import hobbies from '../assets/projects/hobbies.jpg';
import croixrouge from '../assets/projects/croixrouge.jpg';
import gemu from '../assets/projects/gemu.jpg';
import myyoukounkoun from '../assets/projects/myyoukounkoun.jpg';
import portfolio from '../assets/projects/portfolio.jpg';
import { textVariant, fadeIn } from "../utils/motion";
import Slide from "../components/Slide";

const ProProjects = ({ menuOpened, t, threshold }) => {

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: threshold
    });

    const [state, setState] = useState({
        goToSlide: 0,
        offsetRadius: 1,
        showNavigation: false,
        enableSwipe: true,
        config: config.gentle
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedId, setSelectedId] = useState(null);

    const slides = [
        {
            key: 1,
            img: smv,
            titleSlide: t("projects.title_project_pro_1"),
            contentSlide: t("projects.content_project_pro_1"),
            content: <Slide isMobile={isMobile} img={smv} alt={"smv"} title={t("projects.title_project_pro_1")} content={t("projects.content_project_pro_1")} />
        },
        {
            key: 2,
            img: corsica,
            titleSlide: t("projects.title_project_pro_2"),
            contentSlide: t("projects.content_project_pro_2"),
            content: <Slide isMobile={isMobile} img={corsica} alt={"corsica"} title={t("projects.title_project_pro_2")} content={t("projects.content_project_pro_2")} />
        },
        {
            key: 3,
            img: madewis,
            titleSlide: t("projects.title_project_pro_3"),
            contentSlide: t("projects.content_project_pro_3"),
            content: <Slide isMobile={isMobile} img={madewis} alt={"madewis"} title={t("projects.title_project_pro_3")} content={t("projects.content_project_pro_3")} />
        },
        {
            key: 4,
            img: hobbies,
            titleSlide: t("projects.title_project_pro_4"),
            contentSlide: t("projects.content_project_pro_4"),
            content: <Slide isMobile={isMobile} img={hobbies} alt={"hobbies"} title={t("projects.title_project_pro_4")} content={t("projects.content_project_pro_4")} />
        },
        {
            key: 5,
            img: croixrouge,
            titleSlide: t("projects.title_project_pro_5"),
            contentSlide: t("projects.content_project_pro_5"),
            content: <Slide isMobile={isMobile} img={croixrouge} alt={"croixrouge"} title={t("projects.title_project_pro_5")} content={t("projects.content_project_pro_5")} />
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
                        // alert(t("wip.label"));
                        setSelectedId(slide.key);
                    }
                }
            }
        };
    });

    return (
        <>
            <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={textVariant(0.2)} className="projects-title">
                {t("projects.title_pro")}
                <p>{t("projects.subtitle_pro")}</p>
            </motion.div>
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

            {selectedId && (
                <div className="overlay-animated-content-slide"></div>
            )}
            <AnimatePresence>
                {selectedId && (
                    <motion.div className="animated-content-slide"
                        layoutId={selectedId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        style={{ backgroundImage: `url(${slides[currentIndex].img})` }}>
                        <motion.div className="icon-close-hover" onClick={() => setSelectedId(null)}>
                            <FaTimes className="icon-close" />
                        </motion.div>
                        <motion.div className="title-animated-content-slide">{slides[currentIndex].titleSlide}</motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );

}

const PrivateProjects = ({ menuOpened, t, threshold }) => {

    const { ref, inView } = useInView({
        triggerOnce: true, // Change to false if you want the animation to trigger again whenever it comes in view
        threshold: threshold
    });

    const [state, setState] = useState({
        goToSlide: 0,
        offsetRadius: 1,
        showNavigation: false,
        enableSwipe: true,
        config: config.gentle
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedId, setSelectedId] = useState(null);

    let slides = [
        {
            key: 1,
            img: gemu,
            titleSlide: t("projects.title_project_perso_1"),
            contentSlide: t("projects.content_project_perso_1"),
            content: <Slide isMobile={isMobile} img={gemu} alt={"gemu"} title={t("projects.title_project_perso_1")} content={t("projects.content_project_perso_1")} />
        },
        {
            key: 2,
            img: myyoukounkoun,
            titleSlide: t("projects.title_project_perso_2"),
            contentSlide: t("projects.content_project_perso_2"),
            content: <Slide isMobile={isMobile} img={myyoukounkoun} alt={"myyoukounkoun"} title={t("projects.title_project_perso_2")} content={t("projects.content_project_perso_2")} />
        },
        {
            key: 3,
            img: portfolio,
            titleSlide: t("projects.title_project_perso_3"),
            contentSlide: t("projects.content_project_perso_3"),
            content: <Slide isMobile={isMobile} img={portfolio} alt={"portfolio"} title={t("projects.title_project_perso_3")} content={t("projects.content_project_perso_3")} />
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
                        // alert(t("wip.label"));
                        setSelectedId(slide.key);
                    }
                }
            }
        };
    });

    return (
        <>
            <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={textVariant(0.2)} className="projects-title">
                {t("projects.title_private")}
                <p>{t("projects.subtitle_private")}</p>
            </motion.div>
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

            {selectedId && (
                <div className="overlay-animated-content-slide"></div>
            )}
            <AnimatePresence>
                {selectedId && (
                    <motion.div className="animated-content-slide"
                        layoutId={selectedId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        style={{ backgroundImage: `url(${slides[currentIndex].img})` }}>
                        <motion.div className="icon-close-hover" onClick={() => setSelectedId(null)}>
                            <FaTimes className="icon-close" />
                        </motion.div>
                        <motion.div className="title-animated-content-slide">{slides[currentIndex].titleSlide}</motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

const Projects = ({ menuOpened, threshold }) => {
    const { t } = useTranslation();

    return (
        <div className="projects">
            <div className="projects-content-pro">
                <ProProjects menuOpened={menuOpened} t={t} threshold={threshold} />
            </div>
            <div className="projects-content-perso">
                <PrivateProjects menuOpened={menuOpened} t={t} threshold={threshold} />
            </div>
        </div>
    );
}

export default Projects;