import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, useScroll } from '@react-three/drei';
import { useRef } from 'react';
import SphereCustom from '../components/Sphere';

const MainScene = () => {
    const scroll = useScroll();
    const cameraRef = useRef();

    useFrame((state, delta) => {
        if (cameraRef.current) {
            // La caméra tourne en fonction du défilement 
            // cameraRef.current.position.x = scroll.offset * 5;
            // cameraRef.current.position.y = scroll.offset * 5;
            // cameraRef.current.position.z = scroll.offset * (-0.5);
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 10]} >
                <pointLight position={[10, 10, 10]} />
            </PerspectiveCamera>
            <ambientLight />
            <SphereCustom scroll={scroll} />
        </>
    );
}

export default MainScene;