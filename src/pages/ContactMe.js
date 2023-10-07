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

const ContactMe = ({ threshold }) => {
    const { t } = useTranslation();

    const contactmeRef = useRef();
    const [contactmeHeight, setContactmeHeight] = useState(window.innerHeight);
    const [contactmeWidth, setContactmeWidth] = useState(window.innerWidth);

    const { ref, inView } = useInView({
        triggerOnce: true, // Change to false if you want the animation to trigger again whenever it comes in view
        threshold: threshold
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
            const identity = form.name + " " + form.firstname;
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
        const checkDimensions = () => {
            if (contactmeRef.current) {
                setContactmeHeight(contactmeRef.current.getBoundingClientRect().height);
                setContactmeWidth(contactmeRef.current.getBoundingClientRect().width);
            }
        };

        checkDimensions();
        window.addEventListener('resize', checkDimensions);

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkDimensions);
        }
    }, [inView]);

    return (
        <div
            ref={contactmeRef}
            style={{
                display: "flex",
                width: "100%",
                backgroundClip: "padding-box",
                border: "1px solid rgba(2, 2, 13, 1)"
            }}>
            <StarryBackground gradientTopLeft={false} gradientBottomRight={true} heightSection={contactmeHeight} widthSection={contactmeWidth} />
            <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={textVariant(0.2)} className="contactme">
                <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={textVariant(0.2)} className="contactme-title">
                    {t("contact_me.title")}
                    <p>{t("contact_me.subtitle")}</p>
                </motion.div>
                <div className="contactme-content">
                    <div className="form-contactme">
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
                                    name="firstname"
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
                                    autoComplete="off"
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
                                    autoComplete="off"
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