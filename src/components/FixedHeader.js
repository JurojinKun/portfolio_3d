import React from 'react';

import LanguageSwitcher from './LanguageSwitcher';
import CanvasPicture from '../canvas/PictureCanvas';
import { fontTitleBold } from '../utils/fonts';

const FixedHeader = () => {
    return (
        <header className="App-header">
            <div style={{
                display: "flex",
                alignItems: "center", 
                paddingLeft: "100px" 
            }}>
                <div style={{
                    pointerEvents: 'auto'
                }}
                >
                    <CanvasPicture />
                </div>
                <h2 style={fontTitleBold("26px", "white")}>0ruj | 3D Portfolio</h2>
            </div>
            <div style={{
                pointerEvents: 'auto',
                paddingRight: "100px"
            }}>
                <LanguageSwitcher openingDirection={"bottom"} />
            </div>
        </header>
    )
}

export default FixedHeader;
