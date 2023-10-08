import '../css/Home3D.css';

import React, { useState, useRef } from 'react';
import { isMobile } from 'react-device-detect';

const IconRoundButton = ({ icon, url, title }) => {

    const [isHovered, setIsHovered] = useState(false);
    const touchEndTimeout = useRef(null);

    const handleClick = () => {
        window.open(url, '_blank');
    };

    const handleTouchMoble = () => {
        setIsHovered(true);
        if (touchEndTimeout.current) {
            clearTimeout(touchEndTimeout.current);
        }
        touchEndTimeout.current = setTimeout(() => {
            setIsHovered(false);
        }, 2000);  // Ce délai permet de garder le label visible pendant 2 secondes après le toucher
    };

    return (
        <div className="container">
            {url === undefined || url === null ?
                <div className='element'>
                    <div className='black-hole'>
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                    <div className={isHovered ? 'roundButton-hovered' : 'roundButton-not-hovered'}>
                        {icon}
                    </div>
                </div>
                : url.startsWith("http://") || url.startsWith("https://") ?
                    <div className='element'>
                        <div className='black-hole'>
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>
                        <div className={isHovered ? 'roundButton-hovered' : 'roundButton-not-hovered'}
                            onClick={handleClick}
                            onMouseEnter={() => {
                                if (isMobile) {
                                    handleTouchMoble();
                                } else {
                                    setIsHovered(true);
                                }
                            }}
                            onMouseLeave={() => {
                                if (!isMobile) {
                                    setIsHovered(false);
                                }
                            }}
                        >
                            {icon}
                        </div>
                    </div>
                    :
                    <div className='element'>
                        <div className='black-hole'>
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>
                        <a href={url} download
                            className={isHovered ? 'roundButton-hovered' : 'roundButton-not-hovered'}
                            onMouseEnter={() => {
                                if (isMobile) {
                                    handleTouchMoble();
                                } else {
                                    setIsHovered(true);
                                }
                            }}
                            onMouseLeave={() => {
                                if (!isMobile) {
                                    setIsHovered(false);
                                }
                            }}
                        >
                            {icon}
                        </a>
                    </div>
            }
            {title && <div className={`titleContainer ${isHovered ? 'visible' : ''}`}>
                {title}
            </div>}
        </div>
    );
}

const TextButton = ({ text, url }) => {
    const handleClick = () => {
        window.open(url, '_blank');
    };

    return (
        url === undefined || url === null ? <button className="text-btn">
            {text}
        </button> : <button className="text-btn" onClick={handleClick}>
            {text}
        </button>
    );
}

const ImageButton = ({ imageUrl, url }) => {
    const handleClick = () => {
        window.open(url, '_blank');
    };

    return (
        url === undefined || url === null ? <button className="image-btn">
            <img src={imageUrl} alt="button" />
        </button> : <button className="image-btn" onClick={handleClick}>
            <img src={imageUrl} alt="button" />
        </button>
    );
}

export { IconRoundButton, TextButton, ImageButton };