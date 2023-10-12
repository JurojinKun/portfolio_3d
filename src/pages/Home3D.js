import '../css/Home3D.css';

import MainSceneCanvas from '../canvas/MainSceneCanvas';
import StarsCanvas from '../canvas/StarsCanvas';
import FixedHeader from '../components/FixedHeader';
import { useEffect } from 'react';

const Home3D = () => {

    useEffect(() => {
        document.body.style.overflow = "hidden";
    }, []);

    return (
        <div className='parent'>
            <FixedHeader />
            <StarsCanvas />
            <MainSceneCanvas />
        </div>
    );

    // throw TypeError("Uncaught TypeError: Cannot read properties of null (reading 'indexOf') at new Zf (three.module.js:22245:17) at Te (three.module.js:27907:12) at new e (three.module.js:27943:3) at AA (index-22ee0173.esm.js:1699:69) at Object.configure (index-22ee0173.esm.js:1792:18) at react-three-fiber.esm.js:150:20 at il (react-dom.production.min.js:244:332) at wl (react-dom.production.min.js:261:147) at bl (react-dom.production.min.js:260:446) at Al (react-dom.production.min.js:259:431)");
    // return <></>;
}

export default Home3D;