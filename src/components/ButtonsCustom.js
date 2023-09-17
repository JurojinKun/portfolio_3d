import React from 'react';
import '../css/Buttons.css';

const IconRoundButton = ({ icon, url, title }) => {

    const handleClick = () => {
        window.open(url, '_blank');
    };

    return (
        <div className="container">
            {url === undefined || url === null ? <button className='roundButton'>{icon}</button> : url.startsWith("http://") || url.startsWith("https://") ? <button className="roundButton" onClick={handleClick}> {icon}
            </button> : <a href={url} download className='roundButton'>
                {icon}
            </a>
            }
            {title && <div className="titleContainer">
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