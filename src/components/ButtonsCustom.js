import React, { useState } from 'react';
import '../css/Home3D.css';

const IconRoundButton = ({ icon, url, title }) => {

    const [isHovered, setHovered] = useState(false);

    const handleClick = () => {
        window.open(url, '_blank');
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
                    <div className="roundButton">
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
                        <div className="roundButton"
                            onClick={handleClick}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}>
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
                            className='roundButton'
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}>
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