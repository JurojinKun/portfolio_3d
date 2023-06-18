import '../css/BlackHole.css';

import React from "react";
import { useTranslation } from 'react-i18next';

import notFoundAstro from '../assets/astro_notfound.png';
import StarryBackground from '../components/StarryBackground';

const NotFound = () => {
    const { t } = useTranslation();

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
                    <div className="black_hole">
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
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