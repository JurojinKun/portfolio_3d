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
import starbucks from "../assets/experiences/starbucks.png";
import tesla from "../assets/experiences/tesla.png";
import shopify from "../assets/experiences/shopify.png";
import meta from "../assets/experiences/meta.png";

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
                        fontSize: "24px",
                        fontWeight: "bold",
                        margin: 0
                    }}>{experience.title}</h3>
                <p
                    style={{ margin: 0, color: "white", fontSize: "16px", fontWeight: "bold" }}
                >
                    {experience.company_name}
                </p>
                <p
                    style={{ margin: 0, color: "white", fontSize: "16px", fontWeight: "bold" }}
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
                        style={{
                            color: "white",
                            fontSize: "14px",
                            paddingLeft: "0.25rem",
                            letterSpacing: "0.05em",
                        }}
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
            title: "Full stack Developer",
            company_name: "Meta",
            icon: meta,
            iconBg: "#E6DEDD",
            date: "Jan 2023 - Present",
            points: [
                "Developing and maintaining web applications using React.js and other related technologies.",
                "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
                "Implementing responsive design and ensuring cross-browser compatibility.",
                "Participating in code reviews and providing constructive feedback to other developers.",
            ],
        },
        {
            title: "Web Developer",
            company_name: "Shopify",
            icon: shopify,
            iconBg: "#383E56",
            date: "Jan 2022 - Jan 2023",
            points: [
                "Developing and maintaining web applications using React.js and other related technologies.",
                "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
                "Implementing responsive design and ensuring cross-browser compatibility.",
                "Participating in code reviews and providing constructive feedback to other developers.",
            ],
        },
        {
            title: "React Native Developer",
            company_name: "Tesla",
            icon: tesla,
            iconBg: "#E6DEDD",
            date: "Jan 2021 - Feb 2022",
            points: [
                "Developing and maintaining web applications using React.js and other related technologies.",
                "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
                "Implementing responsive design and ensuring cross-browser compatibility.",
                "Participating in code reviews and providing constructive feedback to other developers.",
            ],
        },
        {
            title: "React.js Developer",
            company_name: "Starbucks",
            icon: starbucks,
            iconBg: "#383E56",
            date: "March 2020 - April 2021",
            points: [
                "Developing and maintaining web applications using React.js and other related technologies.",
                "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
                "Implementing responsive design and ensuring cross-browser compatibility.",
                "Participating in code reviews and providing constructive feedback to other developers.",
            ],
        }
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
                <h1 className="experiences-title">{t("experiences.title")}</h1>
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