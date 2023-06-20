import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

import Hexagon from './Hexagon';

const SatelliteBug = ({ color, visible, position }) => {
    let navigate = useNavigate();

    const satelliteRef = useRef();

    const [hexagonColor, setHexagonColor] = useState('gray');

    useEffect(() => {
        let random = Math.random();
        const newColor = random < 0.8 ? 'gray' : color;
        setHexagonColor(newColor);
    }, [color]);

    useFrame(() => {
        if (satelliteRef.current) {
            satelliteRef.current.rotation.y += 0.003;
            satelliteRef.current.rotation.z += 0.003;
        }
    });

    return (
        <group position={position} visible={visible}>
            <Hexagon hexagonRef={satelliteRef} hexagonColor={hexagonColor} onClick={() => navigate("/notfound")} iconPath={"/icons/not_found.svg"} />
            <Text
                position={[0, -0.27, 0]}
                fontSize={0.10}
                color="white"
                textAlign="center"
                fontWeight="bold"
                onClick={() => navigate("/notfound")}
            >
                {"????"}
            </Text>
        </group>
    );
}

export default SatelliteBug;