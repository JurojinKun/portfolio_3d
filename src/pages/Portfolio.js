/* eslint-disable react-hooks/exhaustive-deps */
import "../css/Portfolio.css";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link as ScrollLink, Element, scroller, animateScroll as scroll } from "react-scroll";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from 'react-icons/fa';
import { BiMask, BiBrain, BiPhone } from 'react-icons/bi';
import { MdOutlineScience, MdComputer } from 'react-icons/md';

import NotFound from "./NotFound";
import LanguageSwitcher from '../components/LanguageSwitcher';
import profilePicture from '../assets/profile_picture.png';
import AboutMe from "./AboutMe";
import Skills from "./Skills";
import Experiences from "./Experiences";
import Projects from "./Projects";
import ContactMe from "./ContactMe";

const Portfolio = () => {

    const { t } = useTranslation();

    let { sectionId } = useParams();
    let navigate = useNavigate();

    const validSectionIds = useMemo(() => ["aboutme", "skills", "experiences", "projects", "contactme"], []);

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
                iconSection = <BiMask size={25} />
                break;
            case "skills":
                iconSection = <BiBrain size={25} />
                break;
            case "experiences":
                iconSection = <MdOutlineScience size={25} />
                break;
            case "projects":
                iconSection = <MdComputer size={25} />
                break;
            case "contactme":
                iconSection = <BiPhone size={25} />
                break;
            default:
                iconSection = <MdComputer size={25} />
                break;
        }

        return iconSection;
    }

    const sectionPart = (section) => {
        let currentSection;

        switch (section) {
            case "aboutme":
                currentSection = <AboutMe />
                break;
            case "skills":
                currentSection = <Skills />
                break;
            case "experiences":
                currentSection = <Experiences />
                break;
            case "projects":
                currentSection = <Projects />
                break;
            case "contactme":
                currentSection = <ContactMe />
                break;
            default:
                currentSection = <AboutMe />
                break;
        }

        return currentSection;
    }

    const setNewCurrentUrl = (currentSection) => {
        if (currentSection && currentSection !== isCurrentSection) {
            setIsCurrentSection(currentSection);
        }
    }

    useEffect(() => {
        const setProgressBar = () => {
            gsap.registerPlugin(ScrollTrigger);
            gsap.to("progress", {
                value: 100,
                ease: 'none',
                scrollTrigger: { scrub: 0.5 }
            });
        }

        const setCurrentUrl = () => {
            if (isCurrentSection) {
                if (validSectionIds.includes(isCurrentSection)) {
                    scroller.scrollTo(isCurrentSection, {
                        duration: 800,
                        delay: 0,
                        smooth: 'easeInOutQuart'
                    });
                }
            } else {
                scroll.scrollToTop();
            }
        }

        document.body.style.overflow = "auto";
        setProgressBar();
        setCurrentUrl();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const setNewCurrentUrlObserver = (currentSection) => {
            if (currentSection && currentSection !== isCurrentSection) {
                navigate(`/portfolio/${currentSection}`, { replace: true });
                setIsCurrentSection(currentSection);
            }
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setNewCurrentUrlObserver(entry.target.id);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        });

        const targets = document.querySelectorAll('.sectionElement');
        targets.forEach(target => observer.observe(target));

        return () => {
            targets.forEach(target => observer.unobserve(target));
        };
    }, [isCurrentSection, navigate]);


    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1250px)');

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
        !validSectionIds.includes(isCurrentSection) && isCurrentSection ?
            <NotFound /> :
            <div className="portfolio">

                <progress max="100" value="0" />

                <nav className={`navbar main-content${isOpen ? " blurred" : ""}`} style={{
                    // backgroundColor: scrollPosition > 10 ? 'rgba(2, 2, 13, 0.5)' : 'transparent',
                    // backdropFilter: scrollPosition > 10 ? 'blur(5px)' : 'none'
                    backgroundColor: 'rgba(2, 2, 13, 0.5)',
                    backdropFilter: 'blur(10px)'
                }}>
                    {!isOpen ?
                        <ScrollLink
                            key={validSectionIds[0]}
                            to={validSectionIds[0]}
                            smooth={true}
                            duration={800}
                            onClick={() => {
                                setNewCurrentUrl(validSectionIds[0]);
                            }}
                            style={{
                                paddingLeft: "50px"
                            }}
                        >
                            <div style={{
                                color: "white",
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <img src={profilePicture} alt='Profile pic' style={{
                                    width: "40px",
                                }} />
                                <h3 style={{ fontSize: 20, paddingLeft: "10px" }}>0ruj | 3D Portfolio</h3>
                            </div>
                        </ScrollLink>
                        : <div style={{
                            color: "white",
                            cursor: "default",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            paddingLeft: "50px"
                        }}>
                            <img src={profilePicture} alt='Profile pic' style={{
                                width: "40px",
                            }} />
                            <h3 style={{ fontSize: 20, paddingLeft: "10px" }}>0ruj | 3D Portfolio</h3>
                        </div>}

                    <div className="navbar-desktop">
                        {validSectionIds.map((section) => (
                            <ScrollLink
                                key={section}
                                to={section}
                                smooth={true}
                                duration={800}
                                onClick={() => {
                                    setNewCurrentUrl(section);
                                }}
                            >
                                <span className={`sectionSpan ${isCurrentSection === section ? "active" : "default"}`}>{nameSection(section)}</span>
                            </ScrollLink>
                        ))}
                        <div style={{
                            pointerEvents: 'auto',
                        }}>
                            <LanguageSwitcher />
                        </div>
                    </div>
                    <GiHamburgerMenu className="icon-sidebar" onClick={() => setIsOpen(!isOpen)} size={27} style={{ color: "white", cursor: "pointer" }} />
                </nav>

                <div className="navbar-mobile">
                    <div className={`sidebar ${isOpen ? "open" : ""}`}>
                        <div style={{ display: "flex", height: "70px", width: "100%", alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                            <span style={{ color: "white", fontSize: "25px", fontWeight: "bold", paddingLeft: "20px" }}>{t("portfolio.menu")}</span>
                            <FaTimes size={27} style={{ color: "white", paddingRight: "20px", cursor: "pointer" }} onClick={() => setIsOpen(!isOpen)} />
                        </div>
                        <div style={{
                            overflowY: "auto",
                            display: "flex", height: "100%", flexDirection: "column", paddingLeft: "10px",
                            paddingRight: "10px"
                        }}>
                            {validSectionIds.map((section) => (
                                <ScrollLink key={section}
                                    to={section}
                                    smooth={true}
                                    duration={800} onClick={() => {
                                        setNewCurrentUrl(section);
                                        setIsOpen(false);
                                    }}
                                    className={`sectionSpanSidebar ${isCurrentSection === section ? "active" : "default"}`}
                                    style={{
                                        marginTop: "35px",
                                        marginBottom: "35px",
                                        paddingLeft: "15px",
                                        height: "30px",
                                        display: "flex",
                                        alignItems: "center"
                                    }} >
                                    {iconSectionSidebar(section)}
                                    <span
                                        style={{
                                            padding: "15px",
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            textDecoration: "none",
                                        }}
                                    >{nameSection(section)}</span>
                                </ScrollLink>
                            ))}
                        </div>
                        <div style={{
                            pointerEvents: 'auto',
                            marginBottom: "20px",
                            paddingLeft: "20px",
                            paddingRight: "20px"
                        }}>
                            <LanguageSwitcher />
                        </div>

                    </div>
                </div>

                <div className={`main-content${isOpen ? " blurred" : ""}`} onClick={() => {
                    if (isOpen) {
                        setIsOpen(false);
                    }
                }}>
                    {validSectionIds.map((section) => (
                        <Element key={section} name={section} id={section} className='sectionElement'>
                            {sectionPart(section)}
                        </Element>
                    ))}
                </div>
            </div >
    );
}

export default Portfolio;