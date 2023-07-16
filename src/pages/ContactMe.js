import "../css/ContactMe.css";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import StarryBackground from "../components/StarryBackground";
import astroContactMe from '../assets/astro_contact.png'

const ContactMe = () => {
    const { t } = useTranslation();

    const contactmeRef = useRef();
    const [contactmeHeight, setContactmeHeight] = useState(window.innerHeight);

    useEffect(() => {
        const checkHeight = () => {
            if (contactmeRef.current) {
                setContactmeHeight(contactmeRef.current.getBoundingClientRect().height);
            }
        };

        checkHeight();
        window.addEventListener('resize', checkHeight);

        // Cleanup
        return () => window.removeEventListener('resize', checkHeight);
    }, []);

    return (
        <div 
        ref={contactmeRef}
        style={{
            display: "flex",
            minHeight: "100vh",
            width: "100%",
            backgroundClip: "padding-box",
            border: "1px solid rgba(2, 2, 13, 1)",
            flexDirection: "column"
        }}>
            <StarryBackground gradientTopLeft={false} gradientBottomRight={true} heightSection={contactmeHeight} />
            <h1 className="contactme-title">{t("contact_me.title")}</h1>
            <div className="contactme-content">
                <div style={{
                    display: "flex",
                    height: "1200px",
                    width: "50%",
                    zIndex: 0,
                    backgroundColor: "red",
                    marginBottom: "20px"
                }}>
                   
                </div>
                <img src={astroContactMe} alt='Contact me' className="img-astro-contactme" />
            </div>
        </div>
    );
}

export default ContactMe;