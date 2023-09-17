import { Canvas, useThree } from "@react-three/fiber";

import Stars from "../components/Stars";
import { useEffect } from "react";

const Scene = () => {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(0, 0, 1);
        camera.updateProjectionMatrix();

        const handleResize = () => {
            if (window.innerHeight <= 500) {
                camera.position.set(0, 0, 0);
            } else {
                camera.position.set(0, 0, 1);
            }
            // force the camera to update
            camera.updateProjectionMatrix();
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [camera]);

    return null;  // Pas de rendu visuel pour ce composant
}

const StarsCanvas = () => {
    return (
        <Canvas style={{ position: 'absolute' }}>
            <Stars />
            <Scene />
        </Canvas>
    );
};

export default StarsCanvas;

