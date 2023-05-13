import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from '@react-three/drei';

import Stars from "./components/stars";

function App() {
  return (
    <Canvas
      style={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        overflow: 'hidden',
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} near={0.1} far={1000} />
      <Stars count={2000} />
    </Canvas>
  );
}

export default App;