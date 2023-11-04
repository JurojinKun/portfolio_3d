import "../css/Projects.css";

import React from "react";
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";

const ProjectModal = ({ project, imgProject, setSelectedProject, t }) => {

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
            case "Gemu":
                return t("projects.content_context_gemu");
            case "My youkounkoun":
                return t("projects.content_context_myy");
            case "Portfolio 3D":
                return t("projects.content_context_portfolio");
            default:
                return "";
        }
    }

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
            case "Gemu":
                return t("projects.results_content_gemu");
            case "My youkounkoun":
                return t("projects.results_content_myy");
            case "Portfolio 3D":
                return t("projects.results_content_portfolio");
            default:
                return "";
        }
    }

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
            case "Gemu":
                return t("projects.challenges_content_gemu");
            case "My youkounkoun":
                return t("projects.challenges_content_myy");
            case "Portfolio 3D":
                return t("projects.challenges_content_portfolio");
            default:
                return "";
        }
    }

    return (
        <AnimatePresence>
            <motion.div className="image-hover-container"
                layoutId={project}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}>
                <div className="container">
                    <div className="middle">
                        <div className="icon-close-hover-project" onClick={() => setSelectedProject(null)}>
                            <FaTimes className="icon-close-project" />
                        </div>
                        <img src={imgProject} alt='Project img' className="item-img-project" />
                    </div>
                    <div className="top-left">
                        <span className="title-context-item-project">{t("projects.title_context_project")}</span>
                        <span className="content-context-item-project">{contextProject()}</span>
                    </div>
                    <div className="bottom-left">
                        <span className="title-challenges-item-project">{t("projects.title_results_project")}</span>
                        <span className="content-challenges-item-project">{resultsProject()}</span>
                    </div>
                    <div className="bottom-right">
                        <span className="title-results-item-project">{t("projects.title_challenges_project")}</span>
                        <span className="content-results-item-project">{challengesProject()}</span>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default ProjectModal;