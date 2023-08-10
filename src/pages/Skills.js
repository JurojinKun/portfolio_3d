import "../css/Skills.css";

import React from "react";
import { useTranslation } from "react-i18next";

import { TagCloud } from "@frank-mayer/react-tag-cloud";
import { fontTitleBold, fontBodyBold, fontBodyNormal } from "../utils/fonts";

const Skills = () => {
    const { t } = useTranslation();

    const skills = [
        "Flutter",
        "React native",
        "React redux",
        "React js",
        "Three js",
        "Python",
        "C",
        "Node js",
        "Sequelize",
        "MySQL",
        "Firebase",
        "Postman",
        "GitHub",
        "Bitbucket",
        "SourceTree"
    ];

    const contentSkills = [
        {
            title: "Mes débuts dans le développement",
            content: "J'ai fait mes débuts dans le monde du développement à l'âge de 18 ans en apprenant le Python. \n\nCette expérience m'ayant plus, j'ai voulu continuer en intégrant un cycle préparatoire intégré et enfin une école d'ingénieur : ISEN Toulon. \nDurant ces années, j'ai pu apprendre à comprendre, à analyser et réfléchir à un code simple, compréhensible et propre en apprenant les bases du développement sur des technologies comme le C. \n\nJ'ai aussi pu en apprendre davantage en faisant notamment un stage au sein du groupe Atlantic avec l'équipe réseau et cybersécurité.",
        },
        {
            title: "Mon apprentissage autodidacte",
            content: "Après une diplômation dans ma formation d'ingénieur en tant qu'ingénieur dans le traitement de l'image et l'intelligence artificielle et ne voyant pas ma future carrière dans ce domaine, j'ai décidé de m'orienter vers l'entrepreneuriat et le développement mobile et web de manière autodidacte avec le programme Pépite Toulon. \n\nJ'ai pu apprendre avec leur aide et par moi-même un peu plus sur le monde de l'entrepreneuriat et la programmation mobile avec notamment le framework Flutter durant une année.",
        },
        {
            title: "Années de développeur front",
            content: "Après cette année concentrée sur ma montée en compétences autodidacte, j'ai décidé de découvrir et de m'épanouir dans le monde du travail avec un premier CDI au sein d'une start-up. \n\nCes années-là m'ont permis d'en apprendre beaucoup sur le développement front en mobile en Flutter, mais aussi dans d'autres technologies comme par exemple le React native en participant à des projets pour des clients jusqu'à devenir Lead dev front. \n\nJ'ai pu aussi de mon côté durant mon temps libre, améliorer mes compétences en faisant des projets personnels que ce soit mobile ou web.",
        },
        {
            title: "Et pourquoi pas développeur back ?",
            content: "J'ai beaucoup parlé de ma montée en compétences dans le développement front, mais qu'en est-il du développement back ? \n\nJ'ai pu participé à des ajouts et modifications dans certains projets en faisant du Node js mais j'ai encore beaucoup à apprendre afin de devenir un développeur full stack.",
        },
        {
            title: "L'avenir...",
            content: "Quelle aventure déjà ! Et la suite alors ? \n\nComme je l'ai dit, j'aimerai dans un futur proche, devenir un développeur full stack et par la suite de ma carrière, toujours prendre du plaisir dans ce que je fais et apprendre toujours de nouvelles choses et de nouvelles technologies.",
        },
    ];

    return (
        <div style={{
            display: "flex",
            width: "100%",
            backgroundClip: "padding-box",
            border: "1px solid rgba(2, 2, 13, 1)",
        }}>
            <div className="skills">
                <div className="skills-content">
                    <div className="container-left">
                        <h1 className="skills-title" style={fontTitleBold("50px", "white")}>{t("skills.title")}</h1>
                        <div className="container-left-midle">
                        <div className="circle"/>
                            <TagCloud
                                style={{
                                    ...fontTitleBold("30px", "white"),
                                    pointerEvents: "none"
                                }}
                                
                                options={(w, TagCloudOptions) => ({
                                    radius: Math.min(800, w.innerWidth, 800) / 2,
                                })}
                            >
                                {skills}
                            </TagCloud>
                        </div>
                    </div>
                    <div className="container-middle">
                        <div>
                            {contentSkills.map((skill, index) => {
                                return (
                                    <div key={index} className="container-in-middle">
                                        <div className="container-in-in-midle">
                                            <h2 style={fontBodyBold("25px", "white")}>{skill.title}</h2>
                                            <p style={fontBodyNormal("20px", "white")} dangerouslySetInnerHTML={{ __html: skill.content.replace(/\n/g, '<br>') }}/>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;