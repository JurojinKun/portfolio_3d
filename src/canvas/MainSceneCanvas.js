import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";

import MainScene from "../pages/MainScene";

const canvasStyle = {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 1,
};

const MainSceneCanvas = () => {
    return (
        <Canvas style={canvasStyle}>
            <ScrollControls pages={2} damping={0.25}>
                <MainScene />
            </ScrollControls>
        </Canvas>
    );
};

export default MainSceneCanvas;
