import "../css/Projects.css";

import React from "react";

const Slide = ({ isMobile, img, alt, title, content }) => {
    const truncate = (input) => {
        if (!isMobile || input.length <= 80) {
            return input;
        }
        // Trouvez le dernier espace avant la limite
        let lastIndex = input.lastIndexOf(' ', 80);
        if (lastIndex === -1) {
            return `${input.substring(0, 80)}...`; // Fallback si aucun espace n'est trouvé
        }
        return `${input.substring(0, lastIndex)}...`;
    };

    return (
        <div className="slide">
            <img src={img} alt={alt} style={{
                objectFit: "cover",
                objectPosition: "center"
            }} />
            <div className={isMobile ? "content-slide-mobile" : "content-slide"}>
                <h2>
                    {title}
                </h2>
                <p>{truncate(content)}</p>
            </div>
        </div>
    );
}

export default Slide;
