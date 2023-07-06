import "../css/Skills.css";

import React from "react";
import { TagCloud } from "@frank-mayer/react-tag-cloud";

const Skills = () => {
    return (
        <div className="skills">
            <TagCloud
                options={(w, TagCloudOptions) => ({
                    radius: Math.min(500, w.innerWidth, w.innerHeight / 2),
                    maxSpeed: "fast",
                })}
                onClick={(tag, ev) => alert(tag)}
                onClickOptions={{ passive: true }}
            >
                {[
                    "VSCode",
                    "TypeScript",
                    "React",
                    "Preact",
                    "Parcel",
                    "Jest",
                    "Next",
                    "ESLint",
                    "Framer Motion",
                    "Three.js",
                ]}
            </TagCloud>
        </div>
    );
}

export default Skills;