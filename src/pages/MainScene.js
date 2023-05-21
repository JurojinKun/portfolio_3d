import { Html, PerspectiveCamera, useScroll } from '@react-three/drei';
import { useRef } from 'react';
import SphereCustom from '../components/Sphere';
import Overview from '../components/Overview';

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
            <Html
                // portal={{ current: scroll.fixed }}
                position={[-9, 3, 0]}
                style={{
                    width: "600px",
                }}><Overview />
            </Html>
        </>
    );
}

export default MainScene;