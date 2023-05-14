import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';

// import Stars from "./components/stars";
import BackgroundGradient from "./components/background";
import './App.css';
import SphereCustom from "./components/sphere";

function App() {
  return (
    <div>
      <header className="App-header">
      <img src="/pictures/profile_picture.png" alt="Logo" className="logo" />
        <h2>0ruj Portfolio</h2>
      </header>
      <Canvas 
    style={{ height: '100%', width: '100%', position: 'absolute', overflow: 'hidden', background: "black" }}>
      <BackgroundGradient />
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} near={0.1} far={1000} />
      <OrbitControls enableZoom={false} />
      {/* <Image pathPicture={"/pictures/profile_picture.png"} />
      <Text
        position={[0, -2, 0]}
        fontSize={0.8}
        color="white"
        textAlign="center"
      >
        Hi, I'm 0ruj{'\n'}Welcome to my world
      </Text> */}
      {/* <Stars count={20} /> */}
      <SphereCustom/>
    </Canvas>
    </div>
  );
}

export default App;
