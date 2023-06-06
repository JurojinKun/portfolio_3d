import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link as ScrollLink, Element, scroller, animateScroll as scroll } from "react-scroll";
import NotFound from "./NotFound";

const Portfolio = () => {

    let { sectionId } = useParams();
    let navigate = useNavigate();

    const validSectionIds = useMemo(() => ["section1", "section2", "section3", "section4", "section5"], []);
    const [isCurrentSection, setIsCurrentSection] = useState(sectionId);

    const setNewCurrentUrl = (currentSection) => {
        console.log(isCurrentSection);
        if (currentSection && currentSection !== isCurrentSection) {
            navigate(`/portfolio/${currentSection}`, { replace: true });
            setIsCurrentSection(currentSection);
        }
    }

    useEffect(() => {
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

        setCurrentUrl();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (

        !validSectionIds.includes(isCurrentSection) && isCurrentSection ? <NotFound /> : <div>
            <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
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
