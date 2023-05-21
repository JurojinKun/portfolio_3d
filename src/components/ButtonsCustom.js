import React from 'react';
import '../css/Buttons.css';

const IconRoundButton = ({ icon, url }) => {
    const handleClick = () => {
        window.open(url, '_blank');
    };

    return (
        <button className="round-btn" onClick={handleClick}>
             <i class="fas fa-coffee"></i>
        </button>
    );
}

const TextButton = ({ text, url }) => {
    const handleClick = () => {
        window.open(url, '_blank');
    };

    return (
        <button className="text-btn" onClick={handleClick}>
            {text}
        </button>
    );
}

const ImageButton = ({ imageUrl, url }) => {
    const handleClick = () => {
        window.open(url, '_blank');
    };

    return (
        <button className="image-btn" onClick={handleClick}>
            <img src={imageUrl} alt="button" />
        </button>
    );
}

export { IconRoundButton, TextButton, ImageButton };