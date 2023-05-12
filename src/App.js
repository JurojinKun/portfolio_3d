import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, PerspectiveCamera } from '@react-three/drei';

function App() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls />
      <Box>
        <meshStandardMaterial color="blue" />
      </Box>
      <directionalLight intensity={1} />
      <ambientLight intensity={0.5} />
    </Canvas>
  );
}

export default App;