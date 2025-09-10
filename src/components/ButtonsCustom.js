import "../css/Home3D.css";

import { useState, useRef } from "react";

const IconRoundButton = ({ icon, url, title }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const touchEndTimeout = useRef(null);

  const handleClick = () => {
    if (url) {
      if (url.startsWith("http://") || url.startsWith("https://")) {
        window.open(url, "_blank");
      }
    }
  };

  const handleTouchMobile = () => {
    setShowTooltip(true);
    if (touchEndTimeout.current) {
      clearTimeout(touchEndTimeout.current);
    }
    touchEndTimeout.current = setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  const commonEvents = {
  onMouseEnter: () => {
    if (window.matchMedia("(hover: hover)").matches) {
      setShowTooltip(true);
    }
  },
  onMouseLeave: () => {
    if (window.matchMedia("(hover: hover)").matches) {
      setShowTooltip(false);
    }
  },
  onTouchStart: handleTouchMobile,
};

  return (
    <div className="element" {...commonEvents}>
      <div className="black-hole">
        <span />
        <span />
        <span />
        <span />
      </div>

      {url === undefined || url === null ? (
        <div className="roundButton-blur" onClick={handleClick}>
          {icon}
        </div>
      ) : url.startsWith("http://") || url.startsWith("https://") ? (
        <div className="roundButton-blur" onClick={handleClick}>
          {icon}
        </div>
      ) : (
        <a href={url} download className="roundButton-blur">
          {icon}
        </a>
      )}
      {showTooltip && <div className="tooltip-blur">{title}</div>}
    </div>
  );
};

const TextButton = ({ text, url }) => {
  const handleClick = () => {
    window.open(url, "_blank");
  };

  return url === undefined || url === null ? (
    <button className="text-btn">{text}</button>
  ) : (
    <button className="text-btn" onClick={handleClick}>
      {text}
    </button>
  );
};

const ImageButton = ({ imageUrl, url }) => {
  const handleClick = () => {
    window.open(url, "_blank");
  };

  return url === undefined || url === null ? (
    <button className="image-btn">
      <img src={imageUrl} alt="button" />
    </button>
  ) : (
    <button className="image-btn" onClick={handleClick}>
      <img src={imageUrl} alt="button" />
    </button>
  );
};

export { IconRoundButton, TextButton, ImageButton };
