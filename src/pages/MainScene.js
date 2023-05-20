import { PerspectiveCamera, useScroll } from '@react-three/drei';
import { useRef } from 'react';
import SphereCustom from '../components/Sphere';

const MainScene = () => {
    const scroll = useScroll();
    const cameraRef = useRef();

    return (
        <>
            <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 10]}>
                <pointLight position={[10, 10, 10]} />
            </PerspectiveCamera>
            <ambientLight />
            <SphereCustom scroll={scroll} />
        </>
    );
}

export default MainScene;