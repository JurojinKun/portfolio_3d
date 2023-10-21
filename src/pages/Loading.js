import '../css/Loading.css';

import React, { useEffect } from "react";

const Loading = () => {
    var language = window.navigator.language || window.navigator.userLanguage;

    useEffect(() => {
        document.body.style.overflow = "hidden";
    }, []);

    return (
        <div className="loading-screen">
            <div className='atom'>
                <div className='line line-1' />
                <div className='line line-2' />
                <div className='line line-3' />
            </div>
            <div className='content-loading'>
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