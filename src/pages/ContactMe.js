import "../css/ContactMe.css";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import StarryBackground from "../components/StarryBackground";
import astroContactMe from '../assets/astro_contact_me.png'
import enveloppeContactMe from "../assets/enveloppe_contact_me.png";
import { textVariant } from "../utils/motion";
import showAlertCustom from '../components/AlertCustom';

const ContactMe = () => {
    const { t } = useTranslation();

    const contactmeRef = useRef();
    const [contactmeHeight, setContactmeHeight] = useState(window.innerHeight);

    const { ref, inView } = useInView({
        triggerOnce: true, // Change to false if you want the animation to trigger again whenever it comes in view
        threshold: 0.5
    });
    const formRef = useRef();
    const [form, setForm] = useState({
        name: "",
        firstname: "",
        post: "",
        email: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (form.name.trim() === "" || form.firstname.trim() === "" || form.post.trim() === "" || form.email.trim() === "" || form.message.trim() === "") {
            setLoading(false);
            showAlertCustom(t("contact_me.title_error"), t("contact_me.content_error_1"), 'error');
        } else {
            const identity = form.name + form.firstname;
            const concatMessage = `Bonjour/Bonsoir, je suis ${form.name} ${form.firstname}, actuellement ${form.post}.\n\n${form.message}\n\nTu peux me contacter via ${form.email}`;
            emailjs
                .send(
                    process.env.REACT_APP_SERVICE_ID,
                    process.env.REACT_APP_TEMPLATE_ID,
                    {
                        from_name: identity,
                        to_name: process.env.REACT_APP_TO_NAME,
                        from_email: form.email,
                        to_email: process.env.REACT_APP_TO_EMAIL,
                        message: concatMessage,
                    },
                    process.env.REACT_APP_PUBLIC_KEY_EMAILJS
                )
                .then(
                    () => {
                        setLoading(false);
                        showAlertCustom(t("contact_me.title_validate"), t("contact_me.content_validate"), 'success');
                        setForm({
                            name: "",
                            firstname: "",
                            post: "",
                            email: "",
                            message: "",
                        });
                    },
                    (error) => {
                        console.log(error)
                        setLoading(false);
                        showAlertCustom(t("contact_me.title_error"), t("contact_me.content_error_2"), 'error');
                    }
                );
        }
    };

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
            <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={textVariant(0.2)}>
                <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={textVariant(0.2)}><h1 className="contactme-title">{t("contact_me.title")}</h1></motion.div>
                <div className="contactme-content">
                    <div style={{
                        zIndex: 0,
                        backgroundColor: "rgba(26, 26, 26, 0.7)",
                        marginBottom: "20px",
                        flexGrow: 0.75,
                        padding: "2rem",
                        borderRadius: "1rem",
                        margin: "2rem"
                    }}>
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "2rem"
                            }}
                        >
                            <label style={{
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <span className="fontBodyBoldContactMe" style={{
                                    marginBottom: "1rem"
                                }}>{t("contact_me.title_name")}</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder={t("contact_me.label_name")}
                                    className="input fontBodyNormalContactMe"
                                />
                            </label>
                            <label style={{
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <span className="fontBodyBoldContactMe" style={{
                                    marginBottom: "1rem"
                                }}>{t("contact_me.title_firstname")}</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.firstname}
                                    onChange={handleChange}
                                    placeholder={t("contact_me.label_firstname")}
                                    className="input fontBodyNormalContactMe"
                                />
                            </label>
                            <label style={{
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <span className="fontBodyBoldContactMe" style={{
                                    marginBottom: "1rem"
                                }}>{t("contact_me.title_post")}</span>
                                <input
                                    type="text"
                                    name="post"
                                    value={form.post}
                                    onChange={handleChange}
                                    placeholder={t("contact_me.label_post")}
                                    className="input fontBodyNormalContactMe"
                                />
                            </label>
                            <label style={{
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <span className="fontBodyBoldContactMe" style={{
                                    marginBottom: "1rem"
                                }}>{t("contact_me.title_email")}</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder={t("contact_me.label_email")}
                                    className="input fontBodyNormalContactMe"
                                />
                            </label>
                            <label style={{
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <span className="fontBodyBoldContactMe" style={{
                                    marginBottom: "1rem"
                                }}>{t("contact_me.title_message")}</span>
                                <textarea
                                    rows={7}
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder={t("contact_me.label_message")}
                                    className="input fontBodyNormalContactMe"
                                />
                            </label>

                            <button
                                type="submit"
                                className="submit fontBodyBoldContactMe"
                            >
                                {loading ? t("contact_me.loading_send") : t("contact_me.send")}
                            </button>
                        </form>
                    </div>
                    <div className="image-container">
                        <img src={astroContactMe} alt="Astro contact me" className="static-image" />
                        <img src={enveloppeContactMe} alt="Enveloppe contact me" className="animated-image" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default ContactMe;