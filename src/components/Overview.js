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
                {t("overview.first_para")} 🌍
            </p>
            <p>{t("overview.second_para")}
            </p>
            <p>{t("overview.third_para")} 🔍🕵️</p>
            <p>{t("overview.fourth_para")} 🔥</p>
            <p>{t("overview.fifth_para")} 👀</p>
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