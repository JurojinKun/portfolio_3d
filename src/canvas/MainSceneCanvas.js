import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";

import MainScene from "../pages/MainScene";

const MainSceneCanvas = () => {

    return (
        <Canvas>
            <ScrollControls pages={1} damping={0.25}>
                <MainScene />
            </ScrollControls>
        </Canvas>
    );
}

export default MainSceneCanvas;