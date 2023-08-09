import "../css/Projects.css";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";

import { fontBodyBold, fontTitleBold } from "../utils/fonts";
import smv from '../assets/projects/smv.jpg';
import corsica from '../assets/projects/corsica.jpg';
import madewis from '../assets/projects/madewis.jpg';
import hobbies from '../assets/projects/hobbies.jpg';
import croixrouge from '../assets/projects/croixrouge.jpg';
import gemu from '../assets/projects/gemu.jpg';
import myyoukounkoun from '../assets/projects/myyoukounkoun.jpg';
import portfolio from '../assets/projects/portfolio.jpg';

const ProProjects = ({ menuOpened }) => {

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
                        <h2 style={{
                            ...fontTitleBold("30px", "white"),
                            margin: "15px 15px 30px 15px"
                        }}>
                            Sauve mon vaccin
                        </h2>
                        <p style={{
                            ...fontBodyBold("15px", "white"),
                            margin: "0px 30px 0px 30px"
                        }}>Développement from scratch d'une solution mobile Android/iOS et web en Flutter de dons de vaccins entre médecins/pharmaciens,...</p>
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
                    <h2 style={{
                        ...fontTitleBold("30px", "white"),
                        margin: "15px 15px 30px 15px"
                    }}>
                        Corsica Ferries
                    </h2>
                    <p style={{
                        ...fontBodyBold("15px", "white"),
                        margin: "0px 30px 0px 30px"
                    }}>Refonte/Amélioration avec design imposé par le client d'une solution mobile Android/iOS en React native de réservation de croisières.</p>
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
                    <h2 style={{
                        ...fontTitleBold("30px", "white"),
                        margin: "15px 15px 30px 15px"
                    }}>
                        Madewis
                    </h2>
                    <p style={{
                        ...fontBodyBold("15px", "white"),
                        margin: "0px 30px 0px 30px"
                    }}>Développement from scratch d'une application mobile Android/iOS en Flutter afin de visualiser les informations des tournois sportifs organisés par le client.</p>
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
                    <h2 style={{
                        ...fontTitleBold("30px", "white"),
                        margin: "15px 15px 30px 15px"
                    }}>
                        Hobbies
                    </h2>
                    <p style={{
                        ...fontBodyBold("15px", "white"),
                        margin: "0px 30px 0px 30px"
                    }}>Développement from scratch d'une solution mobile Android/iOS en Flutter d'un réseau social pour rencontrer des gens ayant les mêmes centres d'interêts.</p>
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
                    <h2 style={{
                        ...fontTitleBold("30px", "white"),
                        margin: "15px 15px 30px 15px"
                    }}>
                        La croix rouge française
                    </h2>
                    <p style={{
                        ...fontBodyBold("15px", "white"),
                        margin: "0px 30px 0px 30px"
                    }}>Développement from scratch pour un organisme français d'une solution mobile Android/iOS en Flutter pour faciliter la visualisation des présents/absents lors des formations.</p>
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
                        alert("Work still in progress...");
                    }
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
        </div>
    );

}

const PrivateProjects = ({ menuOpened }) => {

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
                        <h2 style={{
                            ...fontTitleBold("30px", "white"),
                            margin: "15px 15px 30px 15px"
                        }}>
                            Gemu
                        </h2>
                        <p style={{
                            ...fontBodyBold("15px", "white"),
                            margin: "0px 30px 0px 30px"
                        }}>Version 1 d'une application de réseau social pour les personnes intéressées par l'e-sport et les jeux vidéo développée en Flutter reliée à un serveur Firebase. Pourquoi pas une version 2, affaire à suivre....</p>
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
                    <h2 style={{
                        ...fontTitleBold("30px", "white"),
                        margin: "15px 15px 30px 15px"
                    }}>
                        My youkounkoun
                    </h2>
                    <p style={{
                        ...fontBodyBold("15px", "white"),
                        margin: "0px 30px 0px 30px"
                    }}>Une application dotée d'une grande variété de fonctions de base et de fonctions complexes très utiles lors de la création d'une nouvelle application. Pourquoi repartir de zéro à chaque fois ? L'application front-end est développée avec Flutter et le back-end sera développé en Node.js en lien avec la base de données MySQL.</p>
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
                    <h2 style={{
                        ...fontTitleBold("30px", "white"),
                        margin: "15px 15px 30px 15px"
                    }}>
                        Portfolio 3D
                    </h2>
                    <p style={{
                        ...fontBodyBold("15px", "white"),
                        margin: "0px 30px 0px 30px"
                    }}>Site et portfolio personnel afin de montrer mon travail à tous. Ce site est développé en React js avec du Three js.</p>
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
                        alert("Work still in progress...");
                    }
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
        </div>
    );
}

const Projects = ({ menuOpened }) => {
    const { t } = useTranslation();

    return (
        <div style={{
            display: "flex",
            backgroundClip: "padding-box",
            border: "1px solid rgba(2, 2, 13, 1)",
            flexDirection: "column"
        }}>
            <h1 className="projects-title" style={fontTitleBold("50px", "white")}>{t("projects.title_pro")}</h1>
            <ProProjects menuOpened={menuOpened} />
            <h1 className="projects-title" style={fontTitleBold("50px", "white")}>{t("projects.title_private")}</h1>
            <PrivateProjects menuOpened={menuOpened} />
        </div>
    );
}

export default Projects;