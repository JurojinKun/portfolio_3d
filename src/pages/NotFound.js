import '../css/BlackHole.css';

import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';

import notFoundAstro from '../assets/astro_notfound.png';
import StarryBackground from '../components/StarryBackground';

const NotFound = () => {
    const { t } = useTranslation();

    useEffect(() => {
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
            <StarryBackground />
            <div style={{
                height: '100vh',
                width: '100vw',
                margin: 0,
                padding: 0,
                backgroundColor: '#161616',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: "column"
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: "50px"
                }}>
                    <img src={notFoundAstro} alt='Not Found' style={{
                        height: "250px",
                        width: "150px",
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
                <div style={{
                    color: 'white',
                    textAlign: "center",
                    fontSize: 23,
                    fontWeight: "bold",
                }}>
                    {t("not_found.user_lost")}
                </div>
                <div style={{
                    color: 'white',
                    textAlign: "center",
                    fontSize: 23,
                    fontWeight: "bold",
                }}>
                    {t("not_found.url_not_found")}
                </div>
            </div>
        </>
    );
}

export default NotFound;