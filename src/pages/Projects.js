import "../css/Projects.css";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";

import { fontBodyBold, fontTitleBold } from "../utils/fonts";

const ProProjects = () => {

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
                    height: "500px",
                    width: "500px",
                    borderRadius: "10px",
                    overflow: 'hidden',
                }}>
                    <img src="https://i.postimg.cc/Z0ktfskN/peter-broomfield-m3m-ln-R90u-M-unsplash.jpg" alt="1" style={{
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
                        <h2 style={fontTitleBold("30px", "white")}>
                            First project
                        </h2>
                        <p style={fontBodyBold("15px", "white")}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                    </div>
                </div>
        },
        {
            key: 2,
            content: <div style={{
                position: 'relative',
                height: "500px",
                width: "500px",
                borderRadius: "10px",
                overflow: 'hidden'
            }}>
                <img src="https://i.postimg.cc/MTTSXjbn/brandon-atchison-e-BJWhlq-WR54-unsplash.jpg" alt="2" style={{
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
                    <h2 style={fontTitleBold("30px", "white")}>
                        Second project
                    </h2>
                    <p style={fontBodyBold("15px", "white")}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
            </div>
        },
        {
            key: 3,
            content: <div style={{
                position: 'relative',
                height: "500px",
                width: "500px",
                borderRadius: "10px",
                overflow: 'hidden'
            }}>
                <img src="https://i.postimg.cc/8cfgmQYD/campbell-3-ZUs-NJhi-Ik-unsplash.jpg" alt="3" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: "500px",
                    width: "500px",
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: "10px"
                }} />
                <div className="content-slide">
                    <h2 style={fontTitleBold("30px", "white")}>
                        Third project
                    </h2>
                    <p style={fontBodyBold("15px", "white")}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
            </div>
        },
        {
            key: 4,
            content: <div style={{
                position: 'relative',
                height: "500px",
                width: "500px",
                borderRadius: "10px",
                overflow: 'hidden'
            }}>
                <img src="https://i.postimg.cc/8Ck5BcmS/evgeny-tchebotarev-aiwu-Lj-LPFn-U-unsplash.jpg" alt="4" style={{
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
                    <h2 style={fontTitleBold("30px", "white")}>
                        Fourth project
                    </h2>
                    <p style={fontBodyBold("15px", "white")}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
            </div>
        },
    ].map((slide, index) => {
        return {
            ...slide, onClick: () => {
                if (index !== currentIndex) {
                    setState({ goToSlide: index });
                    setCurrentIndex(index);
                } else {
                    alert("Work still in progress...");
                }
            }
        };
    });

    return (
        <div style={{
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
                    setState({ goToSlide: currentIndex - 1 });
                    setCurrentIndex(currentIndex - 1);
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
                    setState({ goToSlide: currentIndex + 1 });
                    setCurrentIndex(currentIndex + 1);
                }}>
                    <IoIosArrowForward color="white" size={25} />
                </div>
            </div>
        </div>
    );

}

const PrivateProjects = () => {

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
                    height: "500px",
                    width: "500px",
                    borderRadius: "10px",
                    overflow: 'hidden',
                }}>
                    <img src="https://i.postimg.cc/66F8J9tr/hakon-sataoen-qyfco1nf-Mtg-unsplash.jpg" alt="1" style={{
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
                        <h2 style={fontTitleBold("30px", "white")}>
                            First project
                        </h2>
                        <p style={fontBodyBold("15px", "white")}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                    </div>
                </div>
        },
        {
            key: 2,
            content: <div style={{
                position: 'relative',
                height: "500px",
                width: "500px",
                borderRadius: "10px",
                overflow: 'hidden'
            }}>
                <img src="https://i.postimg.cc/ydbzRYvv/joey-banks-YApi-Wyp0lqo-unsplash.jpg" alt="2" style={{
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
                    <h2 style={fontTitleBold("30px", "white")}>
                        Second project
                    </h2>
                    <p style={fontBodyBold("15px", "white")}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
            </div>
        },
        {
            key: 3,
            content: <div style={{
                position: 'relative',
                height: "500px",
                width: "500px",
                borderRadius: "10px",
                overflow: 'hidden'
            }}>
                <img src="https://i.postimg.cc/NGKKzyqG/joshua-koblin-eq-W1-MPin-EV4-unsplash.jpg" alt="3" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: "500px",
                    width: "500px",
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: "10px"
                }} />
                <div className="content-slide">
                    <h2 style={fontTitleBold("30px", "white")}>
                        Third project
                    </h2>
                    <p style={fontBodyBold("15px", "white")}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
            </div>
        },
        {
            key: 4,
            content: <div style={{
                position: 'relative',
                height: "500px",
                width: "500px",
                borderRadius: "10px",
                overflow: 'hidden'
            }}>
                <img src="https://i.postimg.cc/JhK81QJw/marcus-p-o-UBjd22g-F6w-unsplash.jpg" alt="4" style={{
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
                    <h2 style={fontTitleBold("30px", "white")}>
                        Fourth project
                    </h2>
                    <p style={fontBodyBold("15px", "white")}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
            </div>
        },
    ].map((slide, index) => {
        return {
            ...slide, onClick: () => {
                if (index !== currentIndex) {
                    setState({ goToSlide: index });
                    setCurrentIndex(index);
                } else {
                    alert("Work still in progress...");
                }
            }
        };
    });

    return (
        <div style={{
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
                    setState({ goToSlide: currentIndex - 1 });
                    setCurrentIndex(currentIndex - 1);
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
                    setState({ goToSlide: currentIndex + 1 });
                    setCurrentIndex(currentIndex + 1);
                }}>
                    <IoIosArrowForward color="white" size={25} />
                </div>
            </div>
        </div>
    );
}

const Projects = () => {
    const { t } = useTranslation();

    return (
        <div style={{
            display: "flex",
            backgroundClip: "padding-box",
            border: "1px solid rgba(2, 2, 13, 1)",
            flexDirection: "column"
        }}>
            <h1 className="projects-title" style={fontTitleBold("50px", "white")}>{t("projects.title_pro")}</h1>
            <ProProjects />
            <h1 className="projects-title" style={fontTitleBold("50px", "white")}>{t("projects.title_private")}</h1>
            <PrivateProjects />
        </div>
    );
}

export default Projects;