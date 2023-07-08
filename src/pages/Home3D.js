import '../css/index.css';
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
}

export default Home3D;