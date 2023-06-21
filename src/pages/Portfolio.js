import "../css/Portfolio.css";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link as ScrollLink, Element, scroller, animateScroll as scroll } from "react-scroll";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

import NotFound from "./NotFound";
import LanguageSwitcher from '../components/LanguageSwitcher';
import profilePicture from '../assets/profile_picture.png';

const Portfolio = () => {

    const { t } = useTranslation();

    let { sectionId } = useParams();
    let navigate = useNavigate();

    const validSectionIds = useMemo(() => ["aboutme", "skills", "experiences", "projects", "contactme"], []);

    const [isCurrentSection, setIsCurrentSection] = useState(sectionId === null || sectionId === undefined ? "aboutme" : sectionId);
    const [scrollPosition, setScrollPosition] = useState(0);

    const setNewCurrentUrl = (currentSection) => {
        if (currentSection && currentSection !== isCurrentSection) {
            navigate(`/portfolio/${currentSection}`, { replace: true });
            setIsCurrentSection(currentSection);
        }
    }

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

    useEffect(() => {
        const setCurrentUrl = () => {
            gsap.registerPlugin(ScrollTrigger);
            gsap.to("progress", {
                value: 100,
                scrollTrigger: {
                    scrub: 0.5
                },
            });

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

        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        setCurrentUrl();

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        !validSectionIds.includes(isCurrentSection) && isCurrentSection ?
            <NotFound /> : <div style={{
                backgroundColor: "#02020D"
            }}>
                <progress max="100" value="0" />
                <nav style={{
                    position: 'fixed', top: 0, left: 0, height: "70px", width: '100%', zIndex: 1, backgroundColor: scrollPosition > 100 ? 'rgba(2, 2, 13, 0.5)' : 'transparent',
                    backdropFilter: scrollPosition > 100 ? 'blur(10px)' : 'none', transition: 'background-color 0.5s ease, backdrop-filter 0.5s ease', display: "flex", alignItems: "center", justifyContent: "space-between"
                }}>
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
                                width: "45px",
                            }} />
                            <h3 style={{ fontSize: 20, paddingLeft: "10px" }}>0ruj | 3D Portfolio</h3>
                        </div>
                    </ScrollLink>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingRight: "50px" }}>
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
                </nav>

                {validSectionIds.map((section) => (
                    <Element key={section} name={section}>
                        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '60px' }}>
                            <h2 style={{ color: "white" }}>{nameSection(section)}</h2>
                            <p style={{ color: "white" }}>Content {nameSection(section).toLowerCase()}...</p>
                        </div>
                    </Element>
                ))}
            </div>
    );
}

export default Portfolio;
