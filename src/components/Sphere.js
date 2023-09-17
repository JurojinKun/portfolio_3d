import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color } from 'three';

import Satellite from './Satellite';
import SatelliteBug from './SatelliteBug';

const SphereCustom = ({ scroll }) => {
    const sphereRadius = 2;
    const sphereDetail = 30;

    const meshRef = useRef();
    const lightRef = useRef();

    const startColor = new Color('#47CDD6');
    const endColor = new Color('#9D4DC4');

    const getColor = (elapsedTime) => {
        const proportion = Math.abs(Math.sin(elapsedTime * 0.1));
        return new Color().copy(startColor).lerp(endColor, proportion);
    };

    const [color, setColor] = useState(getColor(0));
    const [satellitePositions, setSatellitePositions] = useState(Array(6).fill([0, 0, 0]));
    const [satellitesVisible, setSatellitesVisible] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();

        if (meshRef.current && lightRef.current) {
            meshRef.current.rotation.y += 0.0003;
            meshRef.current.rotation.z += 0.0003;

            // Change sphere color over time
            // setColor(new Color(`hsl(${elapsedTime * 10 % 360}, 50%, 50%)`));
            setColor(getColor(elapsedTime));

            if (scroll.offset > 0) {
                const startPosition = [1.5, -1, 7];
                var endPosition;
                if (windowWidth <= 600) {
                    endPosition = [0, 0.1, -3.5];
                } else if (windowWidth <= 1000) {
                    endPosition = [0, 0.1, 0.5];
                } else {
                    endPosition = [0, 0.1, 2.5];
                }

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
                        const angle = (2 * Math.PI / satellitePositions.length) * index + elapsedTime * 0.03;
                        const distance = 2.5;
                        return [
                            distance * Math.cos(angle),
                            distance * Math.sin(angle),
                            meshRef.current.position.z + 1.3
                        ];
                    });
                    setSatellitePositions(newPositions);
                }
            }
        }
    });

    return (
        <>
            <mesh ref={meshRef} position={[1.5, -1, 7]}>
                <sphereGeometry args={[sphereRadius, sphereDetail, sphereDetail]} />
                <meshBasicMaterial wireframe color={color} />
            </mesh>
            {satellitePositions.map((pos, i) => (
                i === 5 ?
                    <SatelliteBug
                        key={i}
                        color={color}
                        visible={satellitesVisible}
                        position={pos}
                    />
                    :
                    <Satellite
                        key={i}
                        color={color}
                        visible={satellitesVisible}
                        position={pos}
                        index={i}
                    />
            ))}
            <ambientLight ref={lightRef} intensity={0.4} />
        </>
    );
}

export default SphereCustom;
