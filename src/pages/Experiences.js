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

const ExperienceCard = ({ experience }) => {
    return (
        <VerticalTimelineElement
            contentStyle={{
                background: "#1A1A1A",
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
                    className="fontBodyBoldExperiences"
                    style={{
                        margin: 0
                    }}
                >{experience.title}</h3>
                <p
                    className="fontBodyBoldExperiences"
                    style={{
                        margin: 0,
                        fontWeight: "bold"
                    }}
                >
                    {experience.company_name}
                </p>
                <p
                    className="fontBodyBoldExperiences"
                    style={{
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
                        className="fontBodyNormalExperiences"
                    >
                        {point}
                    </li>
                ))}
            </ul>
        </VerticalTimelineElement >
    );
}

const Experiences = ({ threshold }) => {
    const { t } = useTranslation();
    const { ref, inView } = useInView({
        triggerOnce: true, // Change to false if you want the animation to trigger again whenever it comes in view
        threshold: threshold
    });

    const experiences = [
        {
            title: t("experiences.title_experience_1"),
            company_name: t("experiences.company_experience_1"),
            icon: dp,
            iconBg: "#E6DEDD",
            date: t("experiences.date_experience_1"),
            points: [
                t("experiences.point_1_experience_1"),
                t("experiences.point_2_experience_1"),
                t("experiences.point_3_experience_1"),
                t("experiences.point_4_experience_1"),
                t("experiences.point_5_experience_1")
            ],
        },
        {
            title: t("experiences.title_experience_2"),
            company_name: t("experiences.company_experience_2"),
            icon: pepite,
            iconBg: "#E6DEDD",
            date: t("experiences.date_experience_2"),
            points: [
                t("experiences.point_1_experience_2"),
                t("experiences.point_2_experience_2")
            ],
        },
        {
            title: t("experiences.title_experience_3"),
            company_name: t("experiences.company_experience_3"),
            icon: groupeatlantic,
            iconBg: "#E6DEDD",
            date: t("experiences.date_experience_3"),
            points: [
                t("experiences.point_1_experience_3")
            ],
        },
    ];

    return (
        <div className="experiences">
            <motion.div ref={ref} animate={inView ? "show" : "hidden"} initial="hidden" variants={textVariant(0.2)} className="experiences-title">
            {t("experiences.title")}
            <p>{t("experiences.subtitle")}</p>
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