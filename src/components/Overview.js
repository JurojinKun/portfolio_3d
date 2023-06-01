import '../css/index.css';

import AppTypewriter from "./AppTypewriter";
import { useTranslation } from 'react-i18next';
import { IconRoundButton } from "./ButtonsCustom";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useDispatch, useSelector } from 'react-redux';

import { startAnimation, resetAnimation } from '../redux/slices/animationSphereSlice';
import { selectShouldAnimate } from '../redux/selectors/animationSphereSelector';

const Overview = ({ opacity }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const shouldAnimateSphere = useSelector(selectShouldAnimate);

    return (
        <section className="overview-content" style={{
            opacity: opacity
        }}>
            <h1>
                {t("overview.hello")}  <span className="name">0ruj</span> <span className="wave">👋🏻</span>
            </h1>
            <p>
                {t("overview.first_para")} 👨‍🎓🇨🇵
            </p>
            <p>{t("overview.second_para")} 📱</p>
            <p>{t("overview.third_para")} 🧠</p>
            <AppTypewriter
                strings={[
                    t("overview.type_writer_1"),
                    t("overview.type_writer_2"),
                ]}
                wrapperClassName="typewriterWrapper"
                cursorClassName="typewriterCursor"
            />
            <div style={{ display: "flex", marginBlock: "30px" }}>
                <IconRoundButton icon={<img
                    src="/pictures/github.png"
                    alt="Icone GitHub"
                    style={{ width: 30, height: 30, color: "red" }}
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
                    fontWeight: "bold"
                }}>{t("overview.embark")}</p>
                <ArrowCircleRightOutlinedIcon style={{
                    color: "white",
                    fontSize: 36,
                    marginLeft: 10
                }} onClick={() => {
                    if (!shouldAnimateSphere) {
                        dispatch(startAnimation());
                    } else {
                        dispatch(resetAnimation());
                    }
                }} />
            </div>
        </section>
    );
}

export default Overview;