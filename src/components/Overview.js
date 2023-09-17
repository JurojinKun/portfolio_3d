import '../css/Home3D.css';

import React from 'react';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { IconRoundButton } from "./ButtonsCustom";
import DownloadIcon from '@mui/icons-material/Download';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

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

const ResponsiveGitHubIcon = styled(GitHubIcon)(({ theme }) => ({
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
                <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <p className='scroll-content'>{t("overview.embark")}</p>
                    <div className='field'>
                        <div className='mouse' />
                    </div>
                </div>
                <p className='fontBodyNormalHome3D'>{t("overview.fifth_para")} 👀</p>
                <div style={{ display: 'flex',  marginTop: "5%", width: "40%"}}>
                    <IconRoundButton icon={<ResponsiveGitHubIcon className='icon-contact' />} url="https://github.com/JurojinKun" title={"GitHub"} />
                    <IconRoundButton icon={<ResponsiveLinkedInIcon className='icon-contact' />} url="https://www.linkedin.com/in/clément-communay" title={"LinkedIn"} />
                    <IconRoundButton icon={<ResponsiveDownloadIcon className='icon-contact' />} url="/cv/CV_Clement_Communay.pdf" title={"CV"} />
                </div>
            </div>
        </div>
    );
}

export default Overview;