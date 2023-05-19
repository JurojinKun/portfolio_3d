import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Sphere } from '@react-three/drei';

const SphereCustom = ({ scroll }) => {
    const meshRef = useRef();
    const lightRef = useRef();
    const materialRefs = useMemo(() => Array(2000).fill(0).map(() => React.createRef()), []);

    useFrame(({ clock }) => {
        if (meshRef.current && lightRef.current) {
            meshRef.current.rotation.y += 0.001;
            meshRef.current.rotation.z += 0.001

            // Change sphere color over time
            const elapsedTime = clock.getElapsedTime();
            const color = new THREE.Color(`hsl(${elapsedTime * 10 % 360}, 50%, 50%)`);
            materialRefs.forEach(ref => ref.current && ref.current.color.set(color));

            // meshRef.current.position.x = scroll.offset * 5;
            // meshRef.current.position.z = scroll.offset * 5;
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
                <meshPhongMaterial ref={materialRefs[i]} color="white" />
            </Sphere>
        );
    }

    return (
        <>
            <mesh ref={meshRef} position={[2, -1.25, 7]}>
                {spheres}
            </mesh>
            <ambientLight ref={lightRef} intensity={0.4} />
        </>
    );
}

export default SphereCustom;

