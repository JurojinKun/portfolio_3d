import '../css/index.css';
import CanvasPicture from '../canvas/PictureCanvas';
import MainSceneCanvas from '../canvas/MainSceneCanvas';
import StarsCanvas from '../canvas/StarsCanvas';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Home = () => {
    return (
        <div className='parent'>
            <header className="App-header">
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 100
                }}>
                    <CanvasPicture />
                    <h2>0ruj | 3D Portfolio</h2>
                </div>
                <LanguageSwitcher />
            </header>
            <StarsCanvas />
            <MainSceneCanvas />
        </div>
    );
}

export default Home;