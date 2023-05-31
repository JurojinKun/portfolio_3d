import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

import Hexagon from './Hexagon';

const Satellite = ({ color, visible, position, onClick, sectionName }) => {
  const satelliteRef = useRef();

  useFrame(() => {
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y += 0.01;
      satelliteRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group position={position} visible={visible} onClick={onClick}>
      <Hexagon hexagonRef={satelliteRef} hexagonColor={color} />
      <Text
        position={[0, -0.25, 0]}
        fontSize={0.10}
        color="white"
        textAlign="center"
        fontWeight="bold"
      >
        {sectionName}
      </Text>
    </group>
  );
}

export default Satellite;