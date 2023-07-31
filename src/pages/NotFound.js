import '../css/BlackHole.css';

import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';

import notFoundAstro from '../assets/astro_not_found.png';
import StarryBackground from '../components/StarryBackground';
import { fontBodyBold } from '../utils/fonts';

const NotFound = () => {
    const { t } = useTranslation();

    useEffect(() => {
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
        <>
            <StarryBackground gradientTopLeft={true} gradientBottomRight={true} />
            <div style={styles.mainContainer}>
                <div style={styles.innerContainer}>
                    <img src={notFoundAstro} alt='Not Found' style={{
                        height: "305px",
                        width: "190px",
                        paddingInline: "30px",
                        zIndex: 1
                    }} />
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
                <div style={fontBodyBold("23px", "white")}>
                    {t("not_found.user_lost")}
                </div>
                <div style={fontBodyBold("23px", "white")}>
                    {t("not_found.url_not_found")}
                </div>
            </div>
        </>
    );
}

const styles = {
    mainContainer: {
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        backgroundColor: '#02020D',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column",
        backgroundClip: 'padding-box',
        border: '1px solid rgba(2, 2, 13, 1)'
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: "50px"
    },
    notFoundAstro: {
        height: "250px",
        width: "150px",
        paddingInline: "30px",
        zIndex: 1
    }
}

export default NotFound;