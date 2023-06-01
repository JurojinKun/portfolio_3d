import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LanguageSwitcher from './LanguageSwitcher';
import CanvasPicture from '../canvas/PictureCanvas';
import { resetAnimation, startAnimation } from '../redux/slices/animationSphereSlice';
import { selectShouldAnimate } from '../redux/selectors/animationSphereSelector';

const FixedHeader = () => {
    const dispatch = useDispatch();
    const shouldSphereAnimate = useSelector(selectShouldAnimate);

    return (
        <header className="App-header">
            <div style={{
                display: "flex",
                alignItems: "center",
                marginLeft: 100
            }}>
                <div style={{
                    pointerEvents: 'auto'
                }} onClick={() => {
                    if (!shouldSphereAnimate) {
                        dispatch(startAnimation());
                    } else {
                        dispatch(resetAnimation());
                    }
                }}>
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
