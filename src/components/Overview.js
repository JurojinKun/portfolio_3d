import "../css/Home3D.css";

import { useTranslation } from "react-i18next";

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
      </div>
    </div>
  );
};

export default Overview;
