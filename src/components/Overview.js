import '../css/Home3D.css';

import React from 'react';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { IconRoundButton } from "./ButtonsCustom";
import DownloadIcon from '@mui/icons-material/Download';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const ResponsiveDownloadIcon = styled(DownloadIcon)(({ theme }) => ({
    width: theme.spacing(3),
    height: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(2),
      height: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(1),
      height: theme.spacing(1),
    },
  }));

const ResponsiveLinkedInIcon = styled(LinkedInIcon)(({ theme }) => ({
    width: theme.spacing(3),
    height: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(2),
      height: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(1),
      height: theme.spacing(1),
    },
  }));

const Overview = ({ opacity }) => {
    const { t } = useTranslation();

    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "transparent",
        }}>
            <div className='overview-content' style={{
                opacity: opacity,
            }}>
                <p className='hello-title'>
                    {t("overview.hello")}  <span className="name">0ruj</span> <span className="wave">👋🏻</span>
                </p>
                <p className='fontBodyNormalHome3D'>
                    {t("overview.first_para")} 🌍
                </p>
                <p className='fontBodyNormalHome3D'>{t("overview.second_para")}
                </p>
                <p className='fontBodyNormalHome3D'>{t("overview.third_para")} 🔍🕵️</p>
                <p className='fontBodyNormalHome3D'>{t("overview.fourth_para")} 🔥</p>
                <p className='fontBodyNormalHome3D'>{t("overview.fifth_para")} 👀</p>
                <div style={{ display: "flex", marginTop: "1%", marginBottom: "1%" }}>
                    <IconRoundButton icon={<img
                        src="/pictures/github.png"
                        alt="Icone GitHub"
                        className='icon-contact'
                    />} url="https://github.com/JurojinKun" />
                    <IconRoundButton icon={<ResponsiveLinkedInIcon className='icon-contact' />} url="https://www.linkedin.com/in/clément-communay" />
                    <a href="/cv/CV_Clement_Communay.pdf" download>
                        <IconRoundButton icon={<ResponsiveDownloadIcon className='icon-contact' />} />
                    </a>
                </div>
                <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <p className='scroll-content'>{t("overview.embark")}</p>
                    <div className='field'>
                        <div className='mouse' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;