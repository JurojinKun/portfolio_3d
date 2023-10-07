import "../css/Projects.css";

import React from "react";

const Slide = ({ isMobile, img, alt, title, content }) => {
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
                <p>{content}</p>
            </div>
        </div>
    );
}

export default Slide;
