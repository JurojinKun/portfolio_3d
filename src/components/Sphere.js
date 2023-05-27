import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Sphere } from '@react-three/drei';
import { useTranslation } from 'react-i18next';

import Satellite from './Satellite';

const SphereCustom = ({ scroll }) => {
    const { t } = useTranslation();
    const meshRef = useRef();
    const lightRef = useRef();
    const materialRefs = useMemo(() => Array(2000).fill(0).map(() => React.createRef()), []);

    const [color, setColor] = useState('white');
    const [satellitePositions, setSatellitePositions] = useState(Array(5).fill([0, 0, 0]));
    const [satellitesVisible, setSatellitesVisible] = useState(false);


    const satelliteSection = (index) => {
        let section;

        switch (index) {
            case 0:
                section = t("satellites.about_me");
                break;
            case 1:
                section = t("satellites.skills");
                break;
            case 2:
                section = t("satellites.experiences");
                break;
            case 3:
                section = t("satellites.projects");
                break;
            case 4:
                section = t("satellites.contact_me");
                break;
            default:
                section = "Satellite";
                break;
        }

        return section;
    }

    const onSatelliteClick = (index) => {
        console.log(`Satellite ${index} clicked`);
    }

    useFrame(({ clock }) => {
        if (meshRef.current && lightRef.current) {
            meshRef.current.rotation.y += 0.001;
            meshRef.current.rotation.z += 0.001;

            // Change sphere color over time
            const elapsedTime = clock.getElapsedTime();
            setColor(new THREE.Color(`hsl(${elapsedTime * 10 % 360}, 50%, 50%)`));
            materialRefs.forEach(ref => ref.current && ref.current.color.set(color));

            if (scroll.offset > 0) {
                const startPosition = [1.5, -1, 7];
                const endPosition = [0, 0.1, 3.5];

                // Linear interpolation between start and end positions based on offset
                meshRef.current.position.x = (startPosition[0] + scroll.offset * (endPosition[0] - startPosition[0]));
                meshRef.current.position.y = (startPosition[1] + scroll.offset * (endPosition[1] - startPosition[1]));
                meshRef.current.position.z = (startPosition[2] + scroll.offset * (endPosition[2] - startPosition[2]));

                // Check whether satellites should be visible
                const shouldSatellitesBeVisible = (
                    meshRef.current.position.x <= (endPosition[0] + 0.2) &&
                    meshRef.current.position.y <= (endPosition[1] + 0.2) &&
                    meshRef.current.position.z <= (endPosition[2] + 0.2)
                );
                setSatellitesVisible(shouldSatellitesBeVisible);

                if (shouldSatellitesBeVisible) {
                    // Calculate satellite positions and update the state
                    const newPositions = satellitePositions.map((_, index) => {
                        const angle = (2 * Math.PI / satellitePositions.length) * index + clock.getElapsedTime() * 0.2;
                        const distance = 2.7;
                        return [
                            distance * Math.cos(angle),
                            distance * Math.sin(angle),
                            meshRef.current.position.z
                        ];
                    });
                    setSatellitePositions(newPositions);
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
            {satellitePositions.map((pos, i) => (
                <Satellite
                    key={i}
                    color={color}
                    visible={satellitesVisible}
                    position={pos}
                    onClick={() => onSatelliteClick(i)}
                    sectionName={satelliteSection(i)}
                />
            ))}
            <ambientLight ref={lightRef} intensity={0.4} />
        </>
    );
}

export default SphereCustom;


