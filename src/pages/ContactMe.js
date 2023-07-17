import "../css/ContactMe.css";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import StarryBackground from "../components/StarryBackground";
import astroContactMe from '../assets/astro_contact_me.png'
import enveloppeContactMe from "../assets/enveloppe_contact_me.png";

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
                <div className="image-container">
                    <img src={astroContactMe} alt="Astro contact me" className="static-image" />
                    <img src={enveloppeContactMe} alt="Enveloppe contact me" className="animated-image" />
                </div>
            </div>
        </div>
    );
}

export default ContactMe;