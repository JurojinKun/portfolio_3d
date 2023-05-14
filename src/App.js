import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Text } from '@react-three/drei';

import Stars from "./components/stars";
import Image from "./components/image";

function App() {
  return (
    <Canvas 
    style={{ height: '100%', width: '100%', position: 'absolute', overflow: 'hidden', background: "black" }}>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} near={0.1} far={1000} />
      <OrbitControls enableZoom={false} />
      <Stars count={2000} />
      <Image pathPicture={"/pictures/profile_picture.png"} />
      <Text
        position={[0, -2, 0]}
        fontSize={0.8}
        color="white"
        textAlign="center"
      >
        Hi, I'm 0ruj{'\n'}Welcome to my world
      </Text>
    </Canvas>
  );
}

export default App;