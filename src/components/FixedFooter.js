import { useTranslation } from "react-i18next";
import { FaLinkedin } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import { HiDownload } from "react-icons/hi";
import { MdEmail } from "react-icons/md";

import "../css/Home3D.css";
import { IconRoundButton } from "../components/ButtonsCustom";

const FixedFooter = () => {
  const { t } = useTranslation();

  return (
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
  );
};

export default FixedFooter;
