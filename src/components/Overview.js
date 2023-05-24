import AppTypewriter from "./AppTypewriter";
import { useTranslation } from 'react-i18next';
import '../css/index.css';
import { IconRoundButton, TextButton } from "./ButtonsCustom";

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
            <div style={{ display: "flex", width: "50%", justifyContent: "space-between", marginBlock: "40px" }}>
                <IconRoundButton icon="fa-home" url="https://www.example.com" />
                <IconRoundButton icon="fa-home" url="https://www.example.com" />
                <IconRoundButton icon="fa-home" url="https://www.example.com" />
            </div>
            <div>
                <p>Enter on my world</p>
            </div>
        </section>
    );
}

export default Overview;