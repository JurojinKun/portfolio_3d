import React from 'react';
import '../css/Buttons.css';

const IconRoundButton = ({ icon, url }) => {
    const handleClick = () => {
        window.open(url, '_blank');
    };

    return (
        url === undefined || url === null ? <button className="round-btn">
            {icon}
        </button> : <button className="round-btn" onClick={handleClick}>
            {icon}
        </button>
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