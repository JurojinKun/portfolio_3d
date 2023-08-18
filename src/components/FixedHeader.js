import "../css/Home3D.css";

import React from 'react';

import LanguageSwitcher from './LanguageSwitcher';
import CanvasPicture from '../canvas/PictureCanvas';

const FixedHeader = () => {
    return (
        <header className="App-header">
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "4%"
                }}>
                <CanvasPicture />
                <h2
                    className="title-header">0ruj | 3D Portfolio</h2>
            </div>
            <div style={{
                pointerEvents: 'auto',
                paddingRight: "4%"
            }}>
                <LanguageSwitcher openingDirection={"bottom"} />
            </div>
        </header>
    )
}

export default FixedHeader;
