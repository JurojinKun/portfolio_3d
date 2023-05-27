import '../css/index.css';
import MainSceneCanvas from '../canvas/MainSceneCanvas';
import StarsCanvas from '../canvas/StarsCanvas';
import FixedHeader from '../components/FixedHeader';

const Home = () => {
    return (
        <div className='parent'>
            <FixedHeader />
            <StarsCanvas />
            <MainSceneCanvas />
        </div>
    );
}

export default Home;