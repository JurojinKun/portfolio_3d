import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Sphere, Text } from '@react-three/drei';

const SphereCustom = ({ scroll }) => {
    const meshRef = useRef();
    const lightRef = useRef();
    const materialRefs = useMemo(() => Array(2000).fill(0).map(() => React.createRef()), []);

    const satellitesRef = useRef([]);

    const satelliteSection = (index) => {
        let section;

        switch (index) {
            case 0:
                section = "About Me";
                break;
            case 1:
                section = "Skills";
                break;
            case 2:
                section = "Experiences";
                break;
            case 3:
                section = "Portfolio";
                break;
            case 4:
                section = "Contact Me";
                break;
            default:
                section = "Satellite";
                break;
        }

        return section;
    }

    const onSatelliteClick = (index) => {
        console.log(`Satellite ${index} clicked`);
        //  TODO ajout logique click satellite
    }

    useFrame(({ clock }) => {
        if (meshRef.current && lightRef.current) {
            // meshRef.current.rotation.x += 0.001;
            meshRef.current.rotation.y += 0.001;
            meshRef.current.rotation.z += 0.001;

            // Change sphere color over time
            const elapsedTime = clock.getElapsedTime();
            const color = new THREE.Color(`hsl(${elapsedTime * 10 % 360}, 50%, 50%)`);
            materialRefs.forEach(ref => ref.current && ref.current.color.set(color));

            if (scroll.offset > 0) {
                const startPosition = [1.5, -1, 7];
                const endPosition = [0, 0.1, 3.5];

                // Interpolation linéaire entre les positions de départ et de fin en fonction de offset
                meshRef.current.position.x = (startPosition[0] + scroll.offset * (endPosition[0] - startPosition[0]));
                meshRef.current.position.y = (startPosition[1] + scroll.offset * (endPosition[1] - startPosition[1]));
                meshRef.current.position.z = (startPosition[2] + scroll.offset * (endPosition[2] - startPosition[2]));


                // Déplacez les satellites autour de la sphère si la sphère est à sa position finale
                if (meshRef.current.position.x <= (endPosition[0] + 0.2) &&
                    meshRef.current.position.y <= (endPosition[1] + 0.2) &&
                    meshRef.current.position.z <= (endPosition[2] + 0.2)) {
                    satellitesRef.current.children.forEach((satellite, index) => {
                        satellite.visible = true;
                        const angle = (2 * Math.PI / satellitesRef.current.children.length) * index + clock.getElapsedTime() * 0.2;
                        const distance = 2.7; // distance from the center of the sphere
                        satellite.position.x = meshRef.current.position.x + distance * Math.cos(angle);
                        satellite.position.y = meshRef.current.position.y + distance * Math.sin(angle);
                        satellite.position.z = meshRef.current.position.z;
                        satellite.material.color.set(color);
                    });
                } else {
                    satellitesRef.current.children.forEach((satellite) => {
                        satellite.visible = false;
                    });
                }
            }
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
            <mesh ref={meshRef} position={[1.5, -1, 7]}>
                {spheres}
            </mesh>
            <group ref={satellitesRef}>
                {[...Array(5)].map((_, i) => (
                    <mesh
                        key={i}
                        visible={false}
                        onClick={() => onSatelliteClick(i)}
                    >
                        <sphereGeometry args={[0.15, 32, 32]} />
                        <meshPhongMaterial color="white" />
                        <Text
                            position={[0, -0.3, 0]}
                            fontSize={0.12}
                            color="white"
                            textAlign="center"
                            fontWeight="bold"
                        >
                            {satelliteSection(i)}
                        </Text>
                    </mesh>
                ))}
            </group>
            <ambientLight ref={lightRef} intensity={0.4} />
        </>
    );
}

export default SphereCustom;

