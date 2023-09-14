import { Canvas } from "@react-three/fiber";

import Stars from "../components/Stars";


const StarsCanvas = () => {
    return (
        <Canvas
            style={{
                position: 'absolute'
            }}
            camera={{ position: [0, 0, 1] }}>
            <Stars />
        </Canvas>
    );
};

export default StarsCanvas;