import React from 'react'

import LanguageSwitcher from './LanguageSwitcher';
import CanvasPicture from '../canvas/PictureCanvas';

const FixedHeader = () => {
    return (
        <header className="App-header">
            <div style={{
                display: "flex",
                alignItems: "center",
                marginLeft: 100
            }}>
                <div style={{
                    pointerEvents: 'auto'
                }} onClick={() => console.log("reset animation sphere")}>
                    <CanvasPicture />
                </div>
                <h2>0ruj | 3D Portfolio</h2>
            </div>
            <div style={{
                pointerEvents: 'auto'
            }}>
                <LanguageSwitcher />
            </div>
        </header>
    )
}

export default FixedHeader;
