import "../css/Home3D.css";

import { useState, useRef, useEffect } from "react";

const isHttpLink = (value) => /^https?:\/\//i.test(value);

const IconRoundButton = ({ icon, url, title, download = false }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const touchEndTimeout = useRef(null);

  useEffect(() => {
    return () => {
      if (touchEndTimeout.current) {
        clearTimeout(touchEndTimeout.current);
      }
    };
  }, []);

  const handleTouchMobile = () => {
    setShowTooltip(true);
    if (touchEndTimeout.current) {
      clearTimeout(touchEndTimeout.current);
    }
    touchEndTimeout.current = setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  const allowHoverTooltip = () =>
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(hover: hover)").matches;

  const commonEvents = {
    onMouseEnter: () => {
      if (allowHoverTooltip()) {
        setShowTooltip(true);
      }
    },
    onMouseLeave: () => {
      if (allowHoverTooltip()) {
        setShowTooltip(false);
      }
    },
    onTouchStart: handleTouchMobile,
  };

  const anchorProps = (() => {
    if (!url) {
      return null;
    }

    if (isHttpLink(url)) {
      return {
        href: url,
        target: "_blank",
        rel: "noopener noreferrer",
      };
    }

    if (download) {
      return {
        href: url,
        download: true,
      };
    }

    return {
      href: url,
    };
  })();

  return (
    <div className="element" {...commonEvents}>
      <div className="black-hole">
        <span />
        <span />
        <span />
        <span />
      </div>

      {anchorProps ? (
        <a
          className="roundButton-blur"
          aria-label={title || undefined}
          {...anchorProps}
        >
          {icon}
        </a>
      ) : (
        <button
          type="button"
          className="roundButton-blur"
          aria-label={title || undefined}
          disabled
        >
          {icon}
        </button>
      )}
      {showTooltip && <div className="tooltip-blur">{title}</div>}
    </div>
  );
};

const TextButton = ({ text, url }) => {
  const handleClick = () => {
    if (!url || typeof window === "undefined") {
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return url === undefined || url === null ? (
    <button type="button" className="text-btn">
      {text}
    </button>
  ) : (
    <button type="button" className="text-btn" onClick={handleClick}>
      {text}
    </button>
  );
};

const ImageButton = ({ imageUrl, url }) => {
  const handleClick = () => {
    if (!url || typeof window === "undefined") {
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return url === undefined || url === null ? (
    <button type="button" className="image-btn">
      <img src={imageUrl} alt="button" />
    </button>
  ) : (
    <button type="button" className="image-btn" onClick={handleClick}>
      <img src={imageUrl} alt="button" />
    </button>
  );
};

export { IconRoundButton, TextButton, ImageButton };
