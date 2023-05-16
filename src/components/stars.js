import { Sphere } from '@react-three/drei';

function Stars() {
  const numSpheres = 200;
  const spheres = [];

  const spherePosition = [3, -0.5, 5]; // Centre de la sphère
  const sphereRadius = 2; // Rayon de la sphère (2*10 pour ajuster l'échelle)

  for (let i = 0; i < numSpheres; i++) {
    let x, y, z;
    do {
      x = (Math.random() - 0.5) * 10;
      y = (Math.random() - 0.5) * 10;
      z = (Math.random() - 0.5) * 10;
    } while (Math.sqrt(Math.pow(x - spherePosition[0], 2) + Math.pow(y - spherePosition[1], 2) + Math.pow(z - spherePosition[2], 2)) <= sphereRadius)

    spheres.push(
      <Sphere key={i} args={[0.01]} position={[x, y, z]}>
        <meshBasicMaterial color="white" />
      </Sphere>
    );
  }

  return <>{spheres}</>;
}

export default Stars;


