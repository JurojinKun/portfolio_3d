import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";

import MainScene from "../pages/MainScene";

const MainSceneCanvas = ({ scroll }) => {
    return (
        <Canvas
            style={{
                backgroundColor: 'transparent',
                height: '100%',
                width: '100%',
                overflow: 'hidden', position: 'absolute'
            }}>
            <ScrollControls pages={6} damping={0.25}>
                <MainScene />
            </ScrollControls>
        </Canvas>
    );
}

export default MainSceneCanvas;