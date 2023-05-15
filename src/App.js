import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, ScrollControls } from '@react-three/drei';
import { ResizeObserver } from '@juggle/resize-observer';

// import Stars from "./components/stars";
import BackgroundGradient from "./components/background";
import './App.css';
import SphereCustom from "./components/sphere";
import Stars from "./components/stars";

function App() {
  return (
    <div>
      <header className="App-header">
        <img src="/pictures/profile_picture.png" alt="Logo" className="logo" />
        <h2>0ruj Portfolio</h2>
      </header>
      <Canvas
        resize={{ polyfill: ResizeObserver }}
        style={{ height: '100%', width: '100%', position: 'absolute', overflow: 'hidden' }}>
        <ScrollControls pages={5}>
          <BackgroundGradient />
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          {/* <OrbitControls /> */}
          <SphereCustom />
          <Stars />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default App;
