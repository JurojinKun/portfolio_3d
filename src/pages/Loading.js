import '../css/Loading.css';

import React from "react";

import astroLoading from "../assets/astro_loading.png";

const Loading = () => {
    var language = window.navigator.language || window.navigator.userLanguage;

    return (
        <div className="loading-screen">
            <img src={astroLoading} alt="Astronaut loading" />
            <div>
                <span className="loading-text">{language.startsWith("fr") ? "Chargement" : "Loading"}</span>
                <span className="ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                </span>
            </div>
        </div>
    )
}

export default Loading;