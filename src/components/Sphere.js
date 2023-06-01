import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Satellite from './Satellite';
import { selectValues } from '../redux/selectors/valueSelector';
import { updateValues } from '../redux/slices/valueSlice';

const SphereCustom = ({ scroll }) => {
    const { t } = useTranslation();
    const meshRef = useRef();
    const lightRef = useRef();
    const [color, setColor] = useState('white');
    const [satellitePositions, setSatellitePositions] = useState(Array(5).fill([0, 0, 0]));
    const [satellitesVisible, setSatellitesVisible] = useState(false);

    const dispatch = useDispatch();
    const [x, y, z] = useSelector(selectValues);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if ((x !== meshRef.current.position.x || y !== meshRef.current.position.y || z !== meshRef.current.position.z)) {
                dispatch(updateValues([meshRef.current.position.x, meshRef.current.position.y, meshRef.current.position.z]));
            }
        }, 500);

        return () => {
            clearTimeout(timeout);
        };
    }, [scroll.offset, x, y, z, dispatch]);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();

        if (meshRef.current && lightRef.current) {
            meshRef.current.rotation.y += 0.0001;
            meshRef.current.rotation.z += 0.0001;

            // Change sphere color over time
            setColor(new THREE.Color(`hsl(${elapsedTime * 10 % 360}, 50%, 50%)`));

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
                        const angle = (2 * Math.PI / satellitePositions.length) * index + elapsedTime * 0.03;
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

    const sphereRadius = 2;
    const sphereDetail = 25;

    return (
        <>
            <mesh ref={meshRef} position={[x, y, z]}>
                <sphereGeometry args={[sphereRadius, sphereDetail, sphereDetail]} />
                <meshBasicMaterial wireframe color={color} />
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
