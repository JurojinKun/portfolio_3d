import { Sphere } from '@react-three/drei';

function Stars() {
    const numSpheres = 200;
    const spheres = [];
  
    for (let i = 0; i < numSpheres; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
  
      spheres.push(
        <Sphere key={i} args={[0.01]} position={[x, y, z]}>
          <meshBasicMaterial color="white" />
        </Sphere>
      );
    }
  
    return <>{spheres}</>;
  }
  

export default Stars;

