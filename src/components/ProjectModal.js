import "../css/Projects.css";

import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ProjectModal = ({ project, imgProject, setSelectedProject, t }) => {
  const [colorPrimary, setColorPrimary] = useState("");
  const [shadowPrimary, setShadowPrimary] = useState("");

  const [hoverIconClose, setHoverIconClose] = useState({});
  const [hoverBtnRepo, setHoverBtnRepo] = useState({
    backgroundColor: "#1A1B1B",
  });

  const onHoverIconClose = () => {
    setHoverIconClose({
      backgroundColor: shadowPrimary,
    });
  };

  const onHoverOutIconClose = () => {
    setHoverIconClose({});
  };

  const onHoverBtnRepo = () => {
    setHoverBtnRepo({
      backgroundColor: colorPrimary,
    });
  };

  const onHoverOutBtnRepo = () => {
    setHoverBtnRepo({
      backgroundColor: "#1A1B1B",
    });
  };

  const contextProject = () => {
    switch (project) {
      case "Sauve mon vaccin":
        return t("projects.content_context_smv");
      case "Corsica Ferries":
        return t("projects.content_context_cf");
      case "Madewis":
        return t("projects.content_context_madewis");
      case "Hobbies":
        return t("projects.content_context_hobbies");
      case "La croix rouge française":
        return t("projects.content_context_crf");
      case "ASM Clermont Auvergne":
        return t("projects.content_context_asm");
      case "Gemu":
        return t("projects.content_context_gemu");
      case "My youkounkoun":
        return t("projects.content_context_myy");
      case "Portfolio 3D":
        return t("projects.content_context_portfolio");
      case "Bot discord":
        return t("projects.content_context_bot");
      default:
        return "";
    }
  };

  const resultsProject = () => {
    switch (project) {
      case "Sauve mon vaccin":
        return t("projects.results_content_smv");
      case "Corsica Ferries":
        return t("projects.results_content_cf");
      case "Madewis":
        return t("projects.results_content_madewis");
      case "Hobbies":
        return t("projects.results_content_hobbies");
      case "La croix rouge française":
        return t("projects.results_content_crf");
      case "ASM Clermont Auvergne":
        return t("projects.results_content_asm");
      case "Gemu":
        return t("projects.results_content_gemu");
      case "My youkounkoun":
        return t("projects.results_content_myy");
      case "Portfolio 3D":
        return t("projects.results_content_portfolio");
      case "Bot discord":
        return t("projects.results_content_bot");
      default:
        return "";
    }
  };

  const challengesProject = () => {
    switch (project) {
      case "Sauve mon vaccin":
        return t("projects.challenges_content_smv");
      case "Corsica Ferries":
        return t("projects.challenges_content_cf");
      case "Madewis":
        return t("projects.challenges_content_madewis");
      case "Hobbies":
        return t("projects.challenges_content_hobbies");
      case "La croix rouge française":
        return t("projects.challenges_content_crf");
      case "ASM Clermont Auvergne":
        return t("projects.challenges_content_asm");
      case "Gemu":
        return t("projects.challenges_content_gemu");
      case "My youkounkoun":
        return t("projects.challenges_content_myy");
      case "Portfolio 3D":
        return t("projects.challenges_content_portfolio");
      case "Bot discord":
        return t("projects.challenges_content_bot");
      default:
        return "";
    }
  };

  const handleClick = () => {
    window.open(repository, "_blank");
  };

  const [repository, setRepository] = useState(null);

  useEffect(() => {
    const getToolsProject = () => {
      switch (project) {
        case "Sauve mon vaccin":
          setRepository(null);
          setColorPrimary("#cd2326");
          setShadowPrimary("rgba(205, 35, 38, 0.2)");
          break;
        case "Corsica Ferries":
          setRepository(null);
          setColorPrimary("#fcee4f");
          setShadowPrimary("rgba(252, 238, 79, 0.2)");
          break;
        case "Madewis":
          setRepository(null);
          setColorPrimary("#000000");
          setShadowPrimary("rgba(0, 0, 0, 0.2)");
          break;
        case "Hobbies":
          setRepository(null);
          setColorPrimary("#ed742f");
          setShadowPrimary("rgba(237, 116, 47, 0.2)");
          break;
        case "La croix rouge française":
          setRepository(null);
          setColorPrimary("#ffffff");
          setShadowPrimary("rgba(255, 255, 255, 0.2)");
          break;
        case "ASM Clermont Auvergne":
          setRepository(null);
          setColorPrimary("#042e6c");
          setShadowPrimary("rgba(4, 46, 108, 0.2)");
          break;
        case "Gemu":
          setRepository("https://github.com/Gemu-Inc/Gemu_ui");
          setColorPrimary("#6077bd");
          setShadowPrimary("rgba(96, 119, 189, 0.2)");
          break;
        case "My youkounkoun":
          setRepository("https://github.com/JurojinKun/my_youkounkoun_front");
          setColorPrimary("#074367");
          setShadowPrimary("rgba(7, 67, 103, 0.2)");
          break;
        case "Portfolio 3D":
          setRepository("https://github.com/JurojinKun/portfolio_3d");
          setColorPrimary("#c4658d");
          setShadowPrimary("rgba(196, 101, 141, 0.2)");
          break;
        case "Bot discord":
          setRepository("https://github.com/JurojinKun/bot-discord-opf-stats");
          setColorPrimary("#85b68c");
          setShadowPrimary("rgba(133, 182, 140, 0.2)");
          break;
        default:
          setRepository(null);
          setColorPrimary("#47CDD6");
          setShadowPrimary("rgba(71, 205, 214, 0.2)");
          break;
      }
    };

    getToolsProject();
  }, [repository, project]);

  return (
    <AnimatePresence>
      <motion.div
        className="image-hover-container"
        layoutId={project}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container">
          <div className="middle">
            <div
              className="icon-close-hover-project"
              style={hoverIconClose}
              onMouseEnter={onHoverIconClose}
              onMouseLeave={onHoverOutIconClose}
              onTouchStart={onHoverIconClose}
              onTouchEnd={onHoverOutIconClose}
              onClick={() => setSelectedProject(null)}
            >
              <FaTimes className="icon-close-project" />
            </div>
            <img
              src={imgProject}
              alt="Project img"
              className="item-img-project"
            />
            {repository != null && (
              <button
                className="btn-repository-project"
                style={{
                  ...hoverBtnRepo,
                  border: `2px solid transparent`,
                }}
                onMouseEnter={onHoverBtnRepo}
                onMouseLeave={onHoverOutBtnRepo}
                onTouchStart={onHoverBtnRepo}
                onTouchEnd={onHoverOutBtnRepo}
                onClick={handleClick}
              >
                {t("projects.repository")}
              </button>
            )}
          </div>
          <div
            className="top-left"
            style={{ boxShadow: `-5px 5px 5px ${shadowPrimary}` }}
          >
            <span className="title-context-item-project">
              {t("projects.title_context_project")}
            </span>
            <span className="content-context-item-project">
              {contextProject()}
            </span>
          </div>
          <div
            className="bottom-left"
            style={{ boxShadow: `-5px 5px 5px ${shadowPrimary}` }}
          >
            <span className="title-results-item-project">
              {t("projects.title_challenges_project")}
            </span>
            <span className="content-results-item-project">
              {challengesProject()}
            </span>
          </div>
          <div
            className="bottom-right"
            style={{ boxShadow: `5px 5px 5px ${shadowPrimary}` }}
          >
            <span className="title-challenges-item-project">
              {t("projects.title_results_project")}
            </span>
            <span className="content-challenges-item-project">
              {resultsProject()}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
