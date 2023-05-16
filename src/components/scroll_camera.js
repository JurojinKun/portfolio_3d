import { PerspectiveCamera, useScroll } from "@react-three/drei";

function ScrollCamera() {
    const { viewportHeight, scroll } = useScroll();
    return (
      <PerspectiveCamera 
        makeDefault 
        position={[0, 0, 9]} // adjust the multiplier here to control the movement range
      />
    );
  }

export default ScrollCamera;