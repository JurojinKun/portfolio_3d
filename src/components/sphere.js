import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

function SphereCustom() {
    const meshRef = React.useRef();

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.001;
            meshRef.current.rotation.y += 0.001;
        }
    });

    const sphereRadius = 4;
    const numSpheres = 3000;
    const smallSphereRadius = 0.04;

    const spheres = [];
    for (let i = 0; i < numSpheres; i++) {
        const theta = 2 * Math.PI * Math.random(); // Angle around the sphere
        const phi = Math.acos(2 * Math.random() - 1); // Angle from the sphere's pole
        const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
        const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
        const z = sphereRadius * Math.cos(phi);

        spheres.push(
            <Sphere args={[smallSphereRadius]} position={[x, y, z]} key={i}>
                <meshBasicMaterial color="#121223" />
            </Sphere>
        );
    }

    return (
        <mesh ref={meshRef}>
            {spheres}
        </mesh>
    );
}

export default SphereCustom;
