import "../css/Home3D.css";

import { useTranslation } from "react-i18next";
import { IconRoundButton } from "./ButtonsCustom";
import { FaLinkedin } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import { HiDownload } from "react-icons/hi";
import { MdEmail } from "react-icons/md";

const Overview = ({ opacity }) => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div
        className="overview-content"
        style={{
          opacity: opacity,
          flex: 1,
        }}
      >
        <p className="hello-title">
          {t("overview.hello")} <span className="name">0ruj</span>{" "}
          <span className="wave">👋🏻</span>
        </p>
        <p className="fontBodyNormalHome3D">{t("overview.first_para")} 🌍</p>
        <p className="fontBodyNormalHome3D">{t("overview.second_para")} 🔥</p>
        <p className="fontBodyNormalHome3D">{t("overview.third_para")} 👀</p>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <p className="scroll-content">{t("overview.embark")}</p>
          <div className="field">
            <div className="mouse" />
          </div>
        </div>
      </div>
      <div
        style={{
          opacity: opacity,
          margin: "0 5% 0 5%",
        }}
      >
        <div className="container-btns">
          <IconRoundButton
            icon={<AiFillGithub className="icon-footer" />}
            url="https://github.com/JurojinKun"
            title="GitHub"
          />
          <IconRoundButton
            icon={<FaLinkedin className="icon-footer" />}
            url="https://www.linkedin.com/in/clément-communay"
            title="LinkedIn"
          />
          <IconRoundButton
            icon={<HiDownload className="icon-footer" />}
            url="/cv/CV_Clement_Communay.pdf"
            title="CV"
          />
          <IconRoundButton
            icon={<MdEmail className="icon-footer" />}
            url="mailto:0rujdev@gmail.com"
            title={t("contact_me.title")}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
