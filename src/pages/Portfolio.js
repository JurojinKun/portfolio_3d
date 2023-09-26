/* eslint-disable react-hooks/exhaustive-deps */
import "../css/Portfolio.css";

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link, Element } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from 'react-icons/fa';
import { BiMask, BiBrain, BiPhone } from 'react-icons/bi';
import { MdOutlineScience, MdComputer } from 'react-icons/md';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

import AboutMe from "./AboutMe";
import Skills from "./Skills";
import Experiences from "./Experiences";
import Projects from "./Projects";
import ContactMe from "./ContactMe";
import NotFound from "./NotFound";
import LanguageSwitcher from '../components/LanguageSwitcher';
import profilePicture from '../assets/profile_picture.png';

const Portfolio = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { sectionId } = useParams();
    const sections = useMemo(() => ["aboutme", "skills", "experiences", "projects", "contactme"], []);
    const [isCurrentSection, setIsCurrentSection] = useState(sectionId === null || sectionId === undefined ? "aboutme" : sectionId);
    const [isOpen, setIsOpen] = useState(false);

    const nameSection = (section) => {
        let titleBtn;

        switch (section) {
            case "aboutme":
                titleBtn = t("satellites.about_me");
                break;
            case "skills":
                titleBtn = t("satellites.skills");
                break;
            case "experiences":
                titleBtn = t("satellites.experiences");
                break;
            case "projects":
                titleBtn = t("satellites.projects");
                break;
            case "contactme":
                titleBtn = t("satellites.contact_me");
                break;
            default:
                titleBtn = "Section";
                break;
        }

        return titleBtn;
    }

    const iconSectionSidebar = (section) => {
        let iconSection;

        switch (section) {
            case "aboutme":
                iconSection = <BiMask className="icon-menu-section" />
                break;
            case "skills":
                iconSection = <BiBrain className="icon-menu-section" />
                break;
            case "experiences":
                iconSection = <MdOutlineScience className="icon-menu-section" />
                break;
            case "projects":
                iconSection = <MdComputer className="icon-menu-section" />
                break;
            case "contactme":
                iconSection = <BiPhone className="icon-menu-section" />
                break;
            default:
                iconSection = <MdComputer className="icon-menu-section" />
                break;
        }

        return iconSection;
    }

    const sectionPart = (section) => {
        let currentSection;

        switch (section) {
            case "aboutme":
                currentSection = <Element name="aboutme" id="aboutme" key={"aboutme"}>
                    <AboutMe />
                </Element>
                break;
            case "skills":
                currentSection = <Element name="skills" id="skills" key={"skills"}>
                    <Skills />
                </Element>
                break;
            case "experiences":
                currentSection = <Element name="experiences" id="experiences" key={"experiences"}>
                    <Experiences />
                </Element>
                break;
            case "projects":
                currentSection = <Element name="projects" id="projects" key={"projects"}>
                    <Projects menuOpened={isOpen} />
                </Element>
                break;
            case "contactme":
                currentSection = <Element name="contactme" id="contactme" key={"contactme"}>
                    <ContactMe />
                </Element>
                break;
            default:
                currentSection = <Element name="aboutme" id="aboutme" key={"aboutme"}>
                    <AboutMe />
                </Element>
                break;
        }

        return currentSection;
    }

    useEffect(() => {
        const setProgressBar = () => {
            if (isCurrentSection && sections.includes(isCurrentSection)) {
                gsap.registerPlugin(ScrollTrigger);
                gsap.to("progress", {
                    value: 100,
                    ease: 'none',
                    scrollTrigger: { scrub: 0.5 }
                });
            }
        }

        const setToInitialSection = () => {
            if (isCurrentSection && sections.includes(isCurrentSection)) {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', duration: 500, delay: 0 });
                }
            }
        }

        document.body.style.overflow = 'auto';
        setProgressBar();
        setTimeout(setToInitialSection, 100);
    }, []);

    useEffect(() => {
        const observerEntering = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const section = entry.target.id;
                        navigate(`/portfolio/${section}`, { replace: true });
                        setIsCurrentSection(section);
                    }
                });
            },
            { threshold: 0, rootMargin: '-10% 0px -90% 0px' }
        );

        sections.forEach((section) => {
            const element = document.getElementById(section);
            if (element) {
                observerEntering.observe(element);
            }
        });

        return () => {
            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    observerEntering.unobserve(element);
                }
            });
        };
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1401px)');

        const handleWindowSizeChange = () => {
            if (mediaQuery.matches && isOpen) {
                setIsOpen(false);
            }
        }

        mediaQuery.addEventListener('change', handleWindowSizeChange);

        handleWindowSizeChange();

        return () => {
            mediaQuery.removeEventListener('change', handleWindowSizeChange);
        }
    }, [isOpen]);

    return (
        !sections.includes(isCurrentSection) && isCurrentSection ?
            <NotFound /> :
            <div className="portfolio">
                <progress max="100" value="0" />

                <nav className={`navbar main-content${isOpen ? " blurred" : ""}`} style={{
                }} onClick={() => {
                    if (isOpen) {
                        setIsOpen(false);
                    }
                }} >
                    {!isOpen ?
                        <Link
                            key={sections[0]}
                            to={sections[0]}
                            spy={true}
                            smooth={true}
                            duration={500}
                            className="link-title"
                        >
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer"
                            }}>
                                <img src={profilePicture} alt='Profile pic' style={{
                                    width: "40px",
                                }} />
                                <h3 className="title-portfolio">0ruj | 3D Portfolio</h3>
                            </div>
                        </Link>
                        : <div className="link-title">
                            <img src={profilePicture} alt='Profile pic' style={{
                                width: "40px",
                            }} />
                            <h3 className="title-portfolio">0ruj | 3D Portfolio</h3>
                        </div>}

                    <div className="navbar-desktop">
                        {sections.map((section) => (
                            <Link
                                activeClass="active"
                                key={section}
                                to={section}
                                spy={true}
                                smooth={true}
                                duration={500}
                            >
                                <span className={`fontTitleBoldPortfolio sectionSpan ${isCurrentSection === section ? "active" : "default"}`}>{nameSection(section)}</span>
                            </Link>
                        ))}
                        <div style={{
                            pointerEvents: 'auto',
                           padding: "0 0 0 15px"
                        }}>
                            <LanguageSwitcher openingDirection={"bottom"} />
                        </div>
                    </div>
                    <div className="icon-sidebar-hover" onClick={() => setIsOpen(!isOpen)}>
                        <GiHamburgerMenu className="icon-sidebar" />
                    </div>
                </nav>

                <div className="navbar-mobile">
                    <div className={`sidebar ${isOpen ? "open" : ""}`} style={{
                        height: `${window.innerHeight - 30}px`
                    }}>
                        <div style={{ display: "flex", height: "70px", width: "100%", alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                            <span className="title-menu">{t("portfolio.menu")}</span>
                            <div className="icon-menu-close-hover" onClick={() => setIsOpen(!isOpen)}>
                                <FaTimes className="icon-menu-close" />
                            </div>
                        </div>
                        <div style={{
                            overflow: "auto",
                            display: "flex", height: "100%", flexDirection: "column"
                        }}>
                            {sections.map((section) => (
                                <Link
                                    activeClass="active"
                                    key={section}
                                    to={section}
                                    spy={true}
                                    smooth={true}
                                    duration={500}
                                    className={`sectionSpanSidebar ${isCurrentSection === section ? "active" : "default"} sectionSpanDim`}
                                    onClick={() => {
                                        if (isOpen) {
                                            setIsOpen(false);
                                        }
                                    }}
                                    style={{

                                    }} >
                                    {iconSectionSidebar(section)}
                                    <span
                                        className="menu-section"
                                    >{nameSection(section)}</span>
                                </Link>
                            ))}
                        </div>
                        <div style={{
                            pointerEvents: 'auto',
                            marginBottom: "20px",
                            paddingLeft: "20px",
                            paddingRight: "20px"
                        }}>
                            <LanguageSwitcher openingDirection={"top"} />
                        </div>

                    </div>
                </div>

                <div className={`main-content${isOpen ? " blurred" : ""}`} style={{
                    backgroundColor: "#02020D"
                }} onClick={() => {
                    if (isOpen) {
                        setIsOpen(false);
                    }
                }}>
                    {sections.map((section) => {
                        return sectionPart(section);
                    })}
                </div>
            </div>
    );
}

export default Portfolio;