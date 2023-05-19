import { Canvas } from "@react-three/fiber";

import Stars from "../components/Stars";


const StarsCanvas = () => {
    return (
        <Canvas 
        style={{
            backgroundColor: '#02020D',
            height: "100%",
            width: '100%',
            overflow: 'hidden', position: 'absolute'
        }}
        camera={{ position: [0, 0, 1] }}>
            <Stars />
        </Canvas>
    );
};

export default StarsCanvas;