import '../css/index.css';
import MainSceneCanvas from '../canvas/MainSceneCanvas';
import StarsCanvas from '../canvas/StarsCanvas';
import FixedHeader from '../components/FixedHeader';

const Home3D = () => {
    return (
        <div className='parent'>
            <FixedHeader />
            <StarsCanvas />
            <MainSceneCanvas />
        </div>
    );
}

export default Home3D;