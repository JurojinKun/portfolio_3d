import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import CubePicture from "../components/PictureCube";

const CanvasPicture = () => {
    return (
        <Canvas
            style={{
                height: 100,
                width: 60,
            }}
        >
            <PerspectiveCamera makeDefault position={[0, 0, 3.5]}></PerspectiveCamera>
            <ambientLight />
            <CubePicture />
        </Canvas>
    );
}

export default CanvasPicture;