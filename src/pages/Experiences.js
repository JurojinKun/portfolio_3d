import "../css/Experiences.css";

import React from "react";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

import { textVariant } from "../utils/motion";
import dp from "../assets/experiences/dp.png";
import pepite from "../assets/experiences/pepite.png";
import groupeatlantic from "../assets/experiences/groupe-atlantic.png";
import { fontTitleBold, fontBodyBold } from "../utils/fonts";

const ExperienceCard = ({ experience }) => {
    return (
        <VerticalTimelineElement
            contentStyle={{
                background: "#1A1A1A",
                color: "white",
                fontWeight: "bold",
            }}
            contentArrowStyle={{ borderRight: "7px solid  #47CDD6" }}
            iconStyle={{ background: experience.iconBg }}
            icon={
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%"
                }}>
                    <img
                        src={experience.icon}
                        alt={experience.company_name}
                        style={{
                            height: "60%",
                            width: "60%",
                            objectFit: "contain"
                        }}
                    />
                </div>
            }
        >
            <div>
                <h3
                    style={{
                        color: "white",
                        fontSize: "25px",
                        fontWeight: "700",
                        fontFamily: "Monteserrat, sans-serif",
                        margin: 0
                    }}
                    >{experience.title}</h3>
                <p
                    style={{
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "700",
                        fontFamily: "Monteserrat, sans-serif",
                        margin: 0
                    }}
                >
                    {experience.company_name}
                </p>
                <p
                    style={{
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "700",
                        fontFamily: "Monteserrat, sans-serif",
                        margin: 0
                    }}
                >
                    {experience.date}
                </p>
            </div>

            <ul style={{
                marginTop: "1.25rem",
                listStyleType: "disc",
                marginLeft: "1.25rem"
            }}>
                {experience.points.map((point, index) => (
                    <li
                        key={`experience-point-${index}`}
                        style={fontBodyBold("15px", "white")}
                    >
                        {point}
                    </li>
                ))}
            </ul>
        </VerticalTimelineElement >
    );
}

const Experiences = () => {
    const { t } = useTranslation();
    const { ref, inView } = useInView({
        triggerOnce: true, // Change to false if you want the animation to trigger again whenever it comes in view
    });

    const experiences = [
        {
            title: "Lead dev front",
            company_name: "Digital Paca",
            icon: dp,
            iconBg: "#E6DEDD",
            date: "Octobre 2021 - Aujourd'hui",
            points: [
                "Développement from scratch d'une solution mobile Android/iOS et web de dons de vaccins entre médecins/pharmaciens,... Référence: Sauve mon vaccin",
                "Refonte/Amélioration avec design imposé par le client d'une solution mobile Android/iOS de réservation de croisières. Référence: Corsica Ferries",
                "Développement from scratch d'une application mobile Android/iOS afin de visualiser les informations des tournois sportifs organisés par le client. Référence: Madewis",
                "Développement from scratch d'une solution mobile Android/iOS d'un réseau social pour rencontrer des gens ayant les mêmes centres d'interêts. Référence: Hobbies",
                "Développement from scratch pour un organisme français d'une solution mobile Android/iOS pour faciliter la visualisation des présents/absents lors des formations. Référence: La croix rouge française"
            ],
        },
        {
            title: "Étudiant entrepreneur",
            company_name: "Pépite Toulon",
            icon: pepite,
            iconBg: "#E6DEDD",
            date: "2020 - 2021",
            points: [
                "Apprentissage de manière autodidacte du développement mobile",
                "Création d'une première version d'une application from scratch"
            ],
        },
        {
            title: "Stage ingénieur",
            company_name: "Groupe Atlantic",
            icon: groupeatlantic,
            iconBg: "#E6DEDD",
            date: "Juillet 2019 - Octobre 2019",
            points: [
                "Élaboration de la stratégie cybersécurité de l'entreprise"
            ],
        },
    ];

    return (
        <div style={{
            display: "flex",
            width: "100%",
            backgroundClip: "padding-box",
            border: "1px solid rgba(2, 2, 13, 1)",
            flexDirection: "column"
        }}>
            <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={textVariant(0.2)}>
                <h1 className="experiences-title" style={fontTitleBold("50px", "white")}>{t("experiences.title")}</h1>
            </motion.div>
            <div className="experiences-content">
                <VerticalTimeline>
                    {experiences.map((experience, index) => {
                        return <ExperienceCard key={index} experience={experience} />
                    })}
                </VerticalTimeline>
            </div>
        </div>
    );
}

export default Experiences;