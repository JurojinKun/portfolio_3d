import React, { useState, useRef } from 'react';
import '../css/Home3D.css';

const IconRoundButton = ({ icon, url, title }) => {

    const [isHovered, setIsHovered] = useState(false);
    const touchEndTimeout = useRef(null);

    const handleClick = () => {
        window.open(url, '_blank');
    };

    const handleTouchStart = () => {
        console.log("handle touch start");
        setIsHovered(true);
        if (touchEndTimeout.current) {
            clearTimeout(touchEndTimeout.current);
        }
    };

    const handleTouchEnd = () => {
        console.log("handle touch end");
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
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onTouchStart={() => handleTouchStart}
                            onTouchEnd={() => handleTouchEnd}>
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
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onTouchStart={() => handleTouchStart}
                            onTouchEnd={() => handleTouchEnd}
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