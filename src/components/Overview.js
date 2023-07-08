import '../css/index.css';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconRoundButton } from "./ButtonsCustom";
import DownloadIcon from '@mui/icons-material/Download';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Overview = ({ opacity }) => {
    const { t } = useTranslation();

    return (
        <section className="overview-content" style={{
            opacity: opacity
        }}>
            <h1>
                {t("overview.hello")}  <span className="name">0ruj</span> <span className="wave">👋🏻</span>
            </h1>
            <p>
                Bienvenue dans mon monde nouveau visiteur ! 🌍
            </p>
            <p>Pourquoi avoir pris le temps de créer ce monde ?
            </p>
            <p>Simplement afin que chacun d'un peu curieux et qui souhaite partir pour un voyage afin de mieux me connaître puisse le faire de la meilleure des façons. 🔍🕵️</p>
            <p>Alors si tu es prêt à braver tous les dangers, attache ta ceinture et en avant toute ! 🔥</p>
            <p>Sinon je t'ai laissé 3 petits boutons afin d'en savoir plus sur ma personne et mon travail sans se mettre en danger, n'hésite pas à y jeter un oeil aussi. 👀</p>
            <div style={{ display: "flex", marginTop: "30px", marginBottom: "5px" }}>
                <IconRoundButton icon={<img
                    src="/pictures/github.png"
                    alt="Icone GitHub"
                    style={{ width: 30, height: 30 }}
                />} url="https://github.com/JurojinKun" />
                <IconRoundButton icon={<LinkedInIcon style={{
                    color: "white",
                    fontSize: 30,
                }} />} url="https://www.linkedin.com/in/cl%C3%A9ment-communay-39238b12b/" />
                <a href="/cv/CV_Clement_Communay.pdf" download>
                    <IconRoundButton icon={<DownloadIcon style={{
                        color: "white",
                        fontSize: 30,
                    }} />} />
                </a>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center" }}>
                <p style={{
                    fontSize: 23,
                    fontWeight: "bold",
                }}>{t("overview.embark")}</p>
                <div className='field'>
                    <div className='mouse' />
                </div>
            </div>
        </section>
    );
}

export default Overview;