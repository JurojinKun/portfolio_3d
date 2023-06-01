import { Scroll, PerspectiveCamera, useScroll } from '@react-three/drei';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Provider } from 'react-redux';

import SphereCustom from '../components/Sphere';
import Overview from '../components/Overview';
import store from "../redux/store";

const MainScene = () => {
    const scroll = useScroll();
    const cameraRef = useRef();

    const [opacityOverview, setOpacityOverview] = useState(1);

    useFrame(() => {
        setOpacityOverview(1 - scroll.range(0, 1 / 2));
    });

    return (
        <>
            <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 10]}>
                <pointLight position={[10, 10, 10]} />
            </PerspectiveCamera>
            <ambientLight />
            <SphereCustom scroll={scroll} />
            <Scroll html>
                <Provider store={store}>
                    <Overview opacity={opacityOverview} />
                </Provider>
            </Scroll>
        </>
    );
}

export default MainScene;