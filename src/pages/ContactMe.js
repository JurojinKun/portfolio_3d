import "../css/ContactMe.css";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import StarryBackground from "../components/StarryBackground";
import astroContactMe from '../assets/astro_contact_me.png'
import enveloppeContactMe from "../assets/enveloppe_contact_me.png";
import { slideIn } from "../utils/motion";
import showAlertCustom  from '../components/AlertCustom';
import { fontTitleBold, fontBodyBold } from "../utils/fonts";

const ContactMe = () => {
    const { t } = useTranslation();

    const contactmeRef = useRef();
    const [contactmeHeight, setContactmeHeight] = useState(window.innerHeight);

    const { ref, inView } = useInView({
        triggerOnce: true, // Change to false if you want the animation to trigger again whenever it comes in view
    });
    const formRef = useRef();
    const [form, setForm] = useState({
        name: "",
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

        if (form.name.trim() === "" || form.post.trim() === "" || form.email.trim() === "" || form.message.trim() === "") {
            setLoading(false);
            showAlertCustom('Erreur', 'Les champs ne sont pas tous remplis.', 'error');
        } else {
            const concatMessage = `Bonjour/Bonsoir, je suis ${form.name}, actuellement ${form.post}.\n\n${form.message}\n\nTu peux me contacter via ${form.email}`;
            emailjs
                .send(
                    process.env.REACT_APP_SERVICE_ID,
                    process.env.REACT_APP_TEMPLATE_ID,
                    {
                        from_name: form.name,
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
                        showAlertCustom('Mail envoyé', 'Thank you. I will get back to you as soon as possible.', 'success');
                        setForm({
                            name: "",
                            post: "",
                            email: "",
                            message: "",
                        });
                    },
                    (error) => {
                        console.log(error);
                        setLoading(false);
                        showAlertCustom('Erreur', 'Something went wrong', 'error');
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
            <h1 className="contactme-title" style={fontTitleBold("50px", "white")}>{t("contact_me.title")}</h1>
            <div className="contactme-content">
                <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={slideIn("left", "tween", 0.2, 1)} style={{
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
                            <span style={{
                                color: "white",
                                fontSize: "25px",
                                fontWeight: "700",
                                fontFamily: "Montserrat, sans-serif",
                                marginBottom: "1rem"
                            }}>Your Name</span>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="What's your name?"
                                className="input"
                                style={fontBodyBold("16px", "white")}
                            />
                        </label>
                        <label style={{
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <span style={{
                                color: "white",
                                fontSize: "25px",
                                fontWeight: "700",
                                fontFamily: "Montserrat, sans-serif",
                                marginBottom: "1rem"
                            }}>Your Post</span>
                            <input
                                type="text"
                                name="post"
                                value={form.post}
                                onChange={handleChange}
                                placeholder="What's your post?"
                                className="input"
                                style={fontBodyBold("16px", "white")}
                            />
                        </label>
                        <label style={{
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <span style={{
                                color: "white",
                                fontSize: "25px",
                                fontWeight: "700",
                                fontFamily: "Montserrat, sans-serif",
                                marginBottom: "1rem"
                            }}>Your email</span>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="What's your email?"
                                className="input"
                                style={fontBodyBold("16px", "white")}
                            />
                        </label>
                        <label style={{
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <span style={{
                                color: "white",
                                fontSize: "25px",
                                fontWeight: "700",
                                fontFamily: "Montserrat, sans-serif",
                                marginBottom: "1rem"
                            }}>Your Message</span>
                            <textarea
                                rows={7}
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="What do you want to say?"
                                className="input"
                                style={fontBodyBold("16px", "white")}
                            />
                        </label>

                        <button
                            type="submit"
                            className="submit"
                            style={fontBodyBold("20px", "white")}
                        >
                            {loading ? "Sending..." : "Send"}
                        </button>
                    </form>
                </motion.div>

                <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={slideIn("right", "tween", 0.2, 1)} className="image-container">
                    <img src={astroContactMe} alt="Astro contact me" className="static-image" />
                    <img src={enveloppeContactMe} alt="Enveloppe contact me" className="animated-image" />
                </motion.div>
            </div>
        </div>
    );
}

export default ContactMe;