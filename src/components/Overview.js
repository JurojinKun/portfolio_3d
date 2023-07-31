import '../css/index.css';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconRoundButton } from "./ButtonsCustom";
import DownloadIcon from '@mui/icons-material/Download';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { fontBodyBold, fontBodyNormal } from '../utils/fonts';

const Overview = ({ opacity }) => {
    const { t } = useTranslation();

    return (
        <section className="overview-content" style={{
            opacity: opacity
        }}>
            <h1 style={
                fontBodyBold("40px", "white")
            }>
                {t("overview.hello")}  <span className="name" style={fontBodyBold("40px")}>0ruj</span> <span className="wave">👋🏻</span>
            </h1>
            <p style={fontBodyNormal("23px", "white")}>
                {t("overview.first_para")} 🌍
            </p>
            <p style={fontBodyNormal("23px", "white")}>{t("overview.second_para")}
            </p>
            <p style={fontBodyNormal("23px", "white")}>{t("overview.third_para")} 🔍🕵️</p>
            <p style={fontBodyNormal("23px", "white")}>{t("overview.fourth_para")} 🔥</p>
            <p style={fontBodyNormal("23px", "white")}>{t("overview.fifth_para")} 👀</p>
            <div style={{ display: "flex", marginTop: "30px", marginBottom: "5px" }}>
                <IconRoundButton icon={<img
                    src="/pictures/github.png"
                    alt="Icone GitHub"
                    style={{ width: 30, height: 30 }}
                />} url="https://github.com/JurojinKun" />
                <IconRoundButton icon={<LinkedInIcon style={{
                    color: "white",
                    fontSize: 30,
                }} />} url="https://www.linkedin.com/in/clément-communay" />
                <a href="/cv/CV_Clement_Communay.pdf" download>
                    <IconRoundButton icon={<DownloadIcon style={{
                        color: "white",
                        fontSize: 30,
                    }} />} />
                </a>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center" }}>
                <p style={fontBodyBold("23px", "white")}>{t("overview.embark")}</p>
                <div className='field'>
                    <div className='mouse' />
                </div>
            </div>
        </section>
    );
}

export default Overview;