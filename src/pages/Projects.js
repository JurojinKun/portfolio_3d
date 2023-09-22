import "../css/Projects.css";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
        triggerOnce: true, // Change to false if you want the animation to trigger again whenever it comes in view
    });

    const [state, setState] = useState({
        goToSlide: 0,
        offsetRadius: 2,
        showNavigation: false,
        enableSwipe: true,
        config: config.gentle
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        {
            key: 1,
            content:
                <div style={{
                    position: 'relative',
                    height: "400px",
                    width: "450px",
                    borderRadius: "10px",
                    overflow: 'hidden',
                }}>
                    <img src={smv} alt="1" style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        borderRadius: "10px"
                    }} />
                    <div className="content-slide">
                        <h2 className="fontBodyBoldProjects" style={{
                            margin: "15px 15px 30px 15px"
                        }}>
                            {t("projects.title_project_pro_1")}
                        </h2>
                        <p
                            className="fontBodyNormalProjects"
                            style={{
                                margin: "0px 30px 0px 30px"
                            }}>{t("projects.content_project_pro_1")}</p>
                    </div>
                </div>
        },
        {
            key: 2,
            content: <div style={{
                position: 'relative',
                height: "400px",
                width: "450px",
                borderRadius: "10px",
                overflow: 'hidden'
            }}>
                <img src={corsica} alt="2" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: "10px"
                }} />
                <div className="content-slide">
                    <h2
                        className="fontBodyBoldProjects"
                        style={{
                            margin: "15px 15px 30px 15px"
                        }}>
                        {t("projects.title_project_pro_2")}
                    </h2>
                    <p
                        className="fontBodyNormalProjects"
                        style={{
                            margin: "0px 30px 0px 30px"
                        }}>{t("projects.content_project_pro_2")}</p>
                </div>
            </div>
        },
        {
            key: 3,
            content: <div style={{
                position: 'relative',
                height: "400px",
                width: "450px",
                borderRadius: "10px",
                overflow: 'hidden'
            }}>
                <img src={madewis} alt="3" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: "10px"
                }} />
                <div className="content-slide">
                    <h2
                        className="fontBodyBoldProjects"
                        style={{
                            margin: "15px 15px 30px 15px"
                        }}>
                        {t("projects.title_project_pro_3")}
                    </h2>
                    <p
                        className="fontBodyNormalProjects"
                        style={{
                            margin: "0px 30px 0px 30px"
                        }}>{t("projects.content_project_pro_3")}</p>
                </div>
            </div>
        },
        {
            key: 4,
            content: <div style={{
                position: 'relative',
                height: "400px",
                width: "450px",
                borderRadius: "10px",
                overflow: 'hidden'
            }}>
                <img src={hobbies} alt="4" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: "10px"
                }} />
                <div className="content-slide">
                    <h2
                        className="fontBodyBoldProjects"
                        style={{
                            margin: "15px 15px 30px 15px"
                        }}>
                        {t("projects.title_project_pro_4")}
                    </h2>
                    <p
                        className="fontBodyNormalProjects"
                        style={{
                            margin: "0px 30px 0px 30px"
                        }}>{t("projects.content_project_pro_4")}</p>
                </div>
            </div>
        },
        {
            key: 5,
            content: <div style={{
                position: 'relative',
                height: "400px",
                width: "450px",
                borderRadius: "10px",
                overflow: 'hidden'
            }}>
                <img src={croixrouge} alt="5" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: "10px"
                }} />
                <div className="content-slide">
                    <h2
                        className="fontBodyBoldProjects"
                        style={{
                            margin: "15px 15px 30px 15px"
                        }}>
                        {t("projects.title_project_pro_5")}
                    </h2>
                    <p
                        className="fontBodyNormalProjects"
                        style={{
                            margin: "0px 30px 0px 30px"
                        }}>{t("projects.content_project_pro_5")}</p>
                </div>
            </div>
        },
    ].map((slide, index) => {
        return {
            ...slide, onClick: () => {
                if (!menuOpened) {
                    if (index !== currentIndex) {
                        setState({ goToSlide: index });
                        setCurrentIndex(index);
                    } else {
                        alert(t("wip.label"));
                    }
                }
            }
        };
    });

    return (
        <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={fadeIn("top", "tween", 0.2, 1)} style={{
            display: "flex",
            backgroundClip: "padding-box",
            border: "1px solid rgba(2, 2, 13, 1)",
            minHeight: "550px",
            width: "100vw",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                width: "20%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <div className="arrow-icon" onClick={() => {
                    if (!menuOpened) {
                        setState({ goToSlide: currentIndex - 1 });
                        setCurrentIndex(currentIndex - 1);
                    }
                }}>
                    <IoIosArrowBack color="white" size={25} />
                </div>
            </div>
            <div
                style={{ width: "60%", height: "550px", zIndex: 0 }}
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
            <div style={{
                width: "20%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div className="arrow-icon" onClick={() => {
                    if (!menuOpened) {
                        setState({ goToSlide: currentIndex + 1 });
                        setCurrentIndex(currentIndex + 1);
                    }
                }}>
                    <IoIosArrowForward color="white" size={25} />
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
        offsetRadius: 2,
        showNavigation: false,
        enableSwipe: true,
        config: config.gentle
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    let slides = [
        {
            key: 1,
            content:
                <div style={{
                    position: 'relative',
                    height: "400px",
                    width: "450px",
                    borderRadius: "10px",
                    overflow: 'hidden',
                }}>
                    <img src={gemu} alt="1" style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        borderRadius: "10px"
                    }} />
                    <div className="content-slide">
                        <h2
                            className="fontBodyBoldProjects"
                            style={{
                                margin: "15px 15px 30px 15px"
                            }}>
                            {t("projects.title_project_perso_1")}
                        </h2>
                        <p
                            className="fontBodyNormalProjects"
                            style={{
                                margin: "0px 30px 0px 30px"
                            }}>{t("projects.content_project_perso_1")}</p>
                    </div>
                </div>
        },
        {
            key: 2,
            content: <div style={{
                position: 'relative',
                height: "400px",
                width: "450px",
                borderRadius: "10px",
                overflow: 'hidden'
            }}>
                <img src={myyoukounkoun} alt="2" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: "10px"
                }} />
                <div className="content-slide">
                    <h2
                        className="fontBodyBoldProjects"
                        style={{
                            margin: "15px 15px 30px 15px"
                        }}>
                        {t("projects.title_project_perso_2")}
                    </h2>
                    <p
                        className="fontBodyNormalProjects"
                        style={{
                            margin: "0px 30px 0px 30px"
                        }}>{t("projects.content_project_perso_2")}</p>
                </div>
            </div>
        },
        {
            key: 3,
            content: <div style={{
                position: 'relative',
                height: "400px",
                width: "450px",
                borderRadius: "10px",
                overflow: 'hidden'
            }}>
                <img src={portfolio} alt="3" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: "10px"
                }} />
                <div className="content-slide">
                    <h2
                        className="fontBodyBoldProjects"
                        style={{
                            margin: "15px 15px 30px 15px"
                        }}>
                        {t("projects.title_project_perso_3")}
                    </h2>
                    <p
                        className="fontBodyNormalProjects"
                        style={{
                            margin: "0px 30px 0px 30px"
                        }}>{t("projects.content_project_perso_3")}</p>
                </div>
            </div>
        },
    ].map((slide, index) => {
        return {
            ...slide, onClick: () => {
                if (!menuOpened) {
                    if (index !== currentIndex) {
                        setState({ goToSlide: index });
                        setCurrentIndex(index);
                    } else {
                        alert(t("wip.label"));
                    }
                }
            }
        };
    });

    return (
        <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={fadeIn("bottom", "tween", 0.2, 1)} style={{
            display: "flex",
            backgroundClip: "padding-box",
            border: "1px solid rgba(2, 2, 13, 1)",
            minHeight: "550px",
            width: "100vw",
            flexDirection: "row",
            alignItems: "center", justifyContent: "center"
        }}>
            <div style={{
                width: "20%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <div className="arrow-icon" onClick={() => {
                    if (!menuOpened) {
                        setState({ goToSlide: currentIndex - 1 });
                        setCurrentIndex(currentIndex - 1);
                    }
                }}>
                    <IoIosArrowBack color="white" size={25} />
                </div>
            </div>
            <div
                style={{ width: "60%", height: "550px", zIndex: 0 }}
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
            <div style={{
                width: "20%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div className="arrow-icon" onClick={() => {
                    if (!menuOpened) {
                        setState({ goToSlide: currentIndex + 1 });
                        setCurrentIndex(currentIndex + 1);
                    }
                }}>
                    <IoIosArrowForward color="white" size={25} />
                </div>
            </div>
        </motion.div>
    );
}

const Projects = ({ menuOpened }) => {
    const { t } = useTranslation();

    const { ref, inView } = useInView({
        triggerOnce: true, // Change to false if you want the animation to trigger again whenever it comes in view
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