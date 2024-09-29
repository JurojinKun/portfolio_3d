import '../css/NotFound.css';

import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from 'react-i18next';

import notFoundAstro from '../assets/astro_not_found.png';
import StarryBackground from '../components/StarryBackground';

const NotFound = () => {
    const { t } = useTranslation();

    const notFoundRef = useRef();
    const [notFoundHeight, setNotFoundHeight] = useState(window.innerHeight);
    const [notFoundWidth, setNotFoundWidth] = useState(window.innerWidth);

    useEffect(() => {
        const checkDimensions = () => {
            if (notFoundRef.current) {
                setNotFoundHeight(notFoundRef.current.getBoundingClientRect().height);
                setNotFoundWidth(notFoundRef.current.getBoundingClientRect().width);
            }
        };

        checkDimensions();
        window.addEventListener('resize', checkDimensions);

        // Cleanup
        return () => window.removeEventListener('resize', checkDimensions);
    }, []);

    useEffect(() => {
        document.title = "0ruj | Portfolio";

        document.body.style.overflow = "hidden";

        const cursor = document.getElementById('custom-cursor');
        const element = document.querySelector('.element-to-hover');

        const moveCursor = (e) => {
            cursor.style.left = e.pageX + 'px';
            cursor.style.top = e.pageY + 'px';
        };

        const addBugEffect = () => {
            cursor.classList.add('bug-cursor');
            document.body.style.cursor = 'none'; // Cacher le vrai curseur
        };

        const removeBugEffect = () => {
            cursor.classList.remove('bug-cursor');
            document.body.style.cursor = 'auto'; // Afficher à nouveau le vrai curseur
        };

        window.addEventListener('mousemove', moveCursor);
        element.addEventListener('mouseover', addBugEffect);
        element.addEventListener('mouseout', removeBugEffect);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            element.removeEventListener('mouseover', addBugEffect);
            element.removeEventListener('mouseout', removeBugEffect);
        };
    }, []);

    return (
        <div
            ref={notFoundRef}
            style={{
                display: "flex",
                width: "100%",
                backgroundClip: "padding-box",
                border: "1px solid rgba(2, 2, 13, 1)",
            }}>
            <StarryBackground gradientTopLeft={true} gradientBottomRight={true} heightSection={notFoundHeight} widthSection={notFoundWidth} />
            <div className="mainContainer">
                <div className="innerContainer">
                    <img src={notFoundAstro} alt='Not Found' className="notFoundAstro" />
                    <div>
                        <div className="black_hole element-to-hover">
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>
                        <div id="custom-cursor"></div>
                    </div>
                </div>
                <div className='fontBodyBoldNotFound' style={{
                    textAlign: "center"
                }}>
                    {t("not_found.user_lost")}
                </div>
                <div
                    className='fontBodyBoldNotFound'
                    style={{
                        margin: "0 10px 0 10px",
                        textAlign: "center",
                        zIndex: 1
                    }}>
                    {t("not_found.url_not_found")}
                </div>
            </div>
        </div>
    );
}

export default NotFound;