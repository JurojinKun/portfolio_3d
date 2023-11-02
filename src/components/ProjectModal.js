import "../css/Projects.css";

import React from "react";
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";

const ProjectModal = ({ project, imgProject, setSelectedProject }) => {

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
                        <span className="title-animated-item-project">{project}</span>
                    </div>
                    <div className="top-left">
                        <span className="title-context-item-project">Contexte</span>
                        <span className="content-context-item-project">Texte du contexte</span>
                    </div>
                    <div className="bottom-left">
                        <span className="title-challenges-item-project">Challenges</span>
                        <span className="content-challenges-item-project">Texte des challenges</span>
                    </div>
                    <div className="bottom-right">
                        <span className="title-results-item-project">Résultats</span>
                        <span className="content-results-item-project">Texte des résultats</span>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default ProjectModal;