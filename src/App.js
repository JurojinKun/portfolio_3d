import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, ScrollControls, useScroll, Box } from '@react-three/drei';
import { useRef } from 'react';

const Scene = () => {
  const scroll = useScroll();
  const cameraRef = useRef();

  useFrame((state, delta) => {
    console.log(scroll.offset);
    // La caméra tourne en fonction du défilement
    // cameraRef.current.rotation.y = scroll.offset * Math.PI * 2;
    // cameraRef.current.rotation.z = scroll.offset * Math.PI * 2;
    // cameraRef.current.lookAt(0, 0, 0);

  }, [scroll]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} ref={cameraRef}>
        <pointLight position={[10, 10, 10]} />
      </PerspectiveCamera>
      <ambientLight />
      <Cube scroll={scroll} />
    </>
  );
}

const Cube = ({ scroll }) => {
  const cubeRef = useRef();

  useFrame((state, delta) => {
    // Faire bouger le cube en fonction du scroll
    cubeRef.current.position.x = scroll.offset * 2;
    cubeRef.current.position.z = scroll.offset * 5;
  }, [scroll]);

  return (
    <Box ref={cubeRef} position={[0, 0, 10]}>
      <meshStandardMaterial color="orange" />
    </Box>
  );
};

const App = () => {
  return (
    <Canvas style={{
      backgroundColor: 'black',
      height: "100%",
      width: '100%',
      overflow: 'hidden', position: 'absolute'
    }}>
      <ScrollControls pages={6} damping={0.25}>
        <Scene />
      </ScrollControls>
    </Canvas>
  );
};

export default App;
