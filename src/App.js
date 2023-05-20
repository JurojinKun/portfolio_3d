import './index.css';
import CanvasPicture from './canvas/PictureCanvas';
import MainSceneCanvas from './canvas/MainSceneCanvas';
import StarsCanvas from './canvas/StarsCanvas';

const App = () => {
  return (
    <div className='parent'>
      <header className="App-header">
        <CanvasPicture />
        <h2>0ruj | 3D Portfolio</h2>
      </header>
      <StarsCanvas />
      <MainSceneCanvas />
      {/* <div className="overlay-content">
        <h1>Mon contenu superposé</h1>
        <p>Ceci est du texte superposé sur une scène 3D.</p>
      </div> */}
    </div>
  );
};

export default App;
