import React, { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, ScrollControls, PerspectiveCamera, useScroll } from '@react-three/drei';
import gsap from 'gsap';

function SpinningBox() {
  const meshRef = useRef();

  useFrame(() => {
    // if (meshRef.current) {
    //   meshRef.current.rotation.x += 0.01;
    //   meshRef.current.rotation.y += 0.01;
    // }
  });

  return (
    <Box ref={meshRef}>
      <meshStandardMaterial color="blue" />
    </Box>
  );
}

function ScrollableCamera() {
  const cameraRef = useRef();
  const scroll = useScroll();

  const radius = 5; // la distance de la caméra par rapport à l'origine (le cube)

  useFrame(() => {
    if (cameraRef.current) {
      const theta = 2 * Math.PI * scroll.offset; // convertit l'offset de défilement en un angle de rotation
      cameraRef.current.position.x = radius * Math.sin(theta);
      cameraRef.current.position.z = radius * Math.cos(theta);
      // cameraRef.current.lookAt(0, 0, 0); // s'assure que la caméra est toujours tournée vers le cube
    }
  });

  return <PerspectiveCamera ref={cameraRef} position={[0, 0, radius]} />;
}

function App() {
  return (
    <Canvas style={{ height: '100%', width: '100%', overflow: 'hidden', position: 'absolute' }}>
      <ambientLight intensity={0.5} />
      <ScrollControls pages={3} damping={0.25}>
        <SpinningBox />
        <ScrollableCamera />
      </ScrollControls>
    </Canvas>
  );
}

export default App;

