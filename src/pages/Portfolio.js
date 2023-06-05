import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link as ScrollLink, Element, scroller, animateScroll as scroll } from "react-scroll";

const Portfolio = () => {
    const validSectionIds = ["section1", "section2", "section3", "section4", "section5"];

    let { sectionId } = useParams();
    let navigate = useNavigate();

    const [isScrolling, setIsScrolling] = useState(false);

    function getCurrentSection() {
        for (const name of validSectionIds) {
            const section = scroller.get(name);
            if (!section) continue;
            const rect = section.getBoundingClientRect();
            if (rect.top <= 0 && rect.bottom >= 0) {
                return name;
            }
        }
        return null;
    }

    function handleScroll() {
        if (isScrolling) return;
        const currentSection = getCurrentSection();
        if (currentSection && currentSection !== sectionId) {
            navigate(`/portfolio/${currentSection}`, { replace: true });
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (sectionId) {
            if (!validSectionIds.includes(sectionId)) {
                navigate("/not-found", { replace: true });
            } else {
                // setIsScrolling(true);
                scroller.scrollTo(sectionId, {
                    duration: 800,
                    delay: 0,
                    smooth: 'easeInOutQuart'
                });
            }
        } else {
            scroll.scrollToTop();
        }
    }, [sectionId, navigate]);

    // useEffect(() => {
    //     setIsScrolling(false);
    // }, [sectionId]);

    return (
        <div>
            <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
                {validSectionIds.map((section) => (
                    <ScrollLink
                        key={section}
                        to={section}
                        smooth={true}
                        duration={500}
                        onClick={() => {
                            console.log("test");
                        }}
                    >
                        <button>{section}</button>
                    </ScrollLink>
                ))}
            </nav>

            {validSectionIds.map((section) => (
                <Element key={section} name={section}>
                    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '60px' }}>
                        <h2>{section}</h2>
                        <p>Some content for {section}...</p>
                    </div>
                </Element>
            ))}
        </div>
    );
}

export default Portfolio;
