import '../css/index.css';
import CanvasPicture from '../canvas/PictureCanvas';
import MainSceneCanvas from '../canvas/MainSceneCanvas';
import StarsCanvas from '../canvas/StarsCanvas';

const Home = () => {
    return (
        <div className='parent'>
            <header className="App-header">
                <CanvasPicture />
                <h2>0ruj | 3D Portfolio</h2>
            </header>
            <StarsCanvas />
            <MainSceneCanvas />
        </div>
    );
}

export default Home;