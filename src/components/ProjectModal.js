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
                    <div className="bottom-right" />
                    <div className="bottom-left" />
                    <div className="top-left" />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default ProjectModal;

{/* <AnimatePresence>
            <motion.div className="animated-item-project"
                layoutId={project}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}>
                <div className="icon-close-hover-project" onClick={() => setSelectedProject(null)}>
                    <FaTimes className="icon-close-project" />
                </div>
                <img src={imgProject} alt='Project img' className="item-img-project" />
                <span className="title-animated-item-project">{project}</span>
            </motion.div>
        </AnimatePresence> */}