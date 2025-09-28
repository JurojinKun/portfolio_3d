import { useTranslation } from "react-i18next";
import { FaLinkedin } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import { HiDocumentText } from "react-icons/hi";
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
        icon={<HiDocumentText className="icon-footer" />}
        url="/cv/CV_Clement_Communay.pdf"
        download
        title="CV"
      />
      <IconRoundButton
        icon={<MdEmail className="icon-footer" />}
        url={`mailto:${process.env.REACT_APP_TO_EMAIL}`}
        title={t("contact_me.title")}
      />
    </div>
  );
};

export default FixedFooter;
