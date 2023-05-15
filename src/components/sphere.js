import React, { useEffect, useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Sphere } from '@react-three/drei';

function SphereCustom() {
  const meshRef = useRef();
  const lightRef = useRef();
  const scrollYRef = useRef(window.scrollY);

  useFrame(({ clock }) => {
    if (meshRef.current && lightRef.current) {
      meshRef.current.rotation.y += 0.001;

      // Change light color over time
      const elapsedTime = clock.getElapsedTime();
      const color = new THREE.Color(`hsl(${elapsedTime * 10 % 360}, 50%, 50%)`);
      lightRef.current.color.set(color);
    }
  });

  const sphereRadius = 2;
  const numSpheres = 2000;
  const smallSphereRadius = 0.02;

  const spheres = [];
  const offset = 2 / numSpheres;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < numSpheres; i++) {
    const y = i * offset - 1 + (offset / 2);
    const radius = Math.sqrt(1 - Math.pow(y, 2));

    const phi = ((i + 1) % numSpheres) * increment;

    const x = Math.cos(phi) * radius;
    const z = Math.sin(phi) * radius;

    spheres.push(
      <Sphere args={[smallSphereRadius]} position={[x * sphereRadius, y * sphereRadius, z * sphereRadius]} key={i}>
        <meshPhongMaterial color="white" />
      </Sphere>
    );
  }

  const { size } = useThree();
  const position = useMemo(() => [size.width > 1000 ? 3 : 2, -0.5, 1], [size.width]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScrollY = document.body.scrollHeight - window.innerHeight;
      const scrollRatio = scrollY / maxScrollY;

      // Update the mesh position based on scroll ratio
      if (meshRef.current) {
        meshRef.current.position.x = 3 - scrollRatio * 3;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <mesh ref={meshRef} position={position}>
        {spheres}
      </mesh>
      <ambientLight ref={lightRef} color="white" intensity={1} />
    </>
  );
}



export default SphereCustom;
