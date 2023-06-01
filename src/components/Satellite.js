import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useTranslation } from 'react-i18next';

import Hexagon from './Hexagon';

const Satellite = ({ color, visible, position, index }) => {
  const { t } = useTranslation();
  const satelliteRef = useRef();

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

  useFrame(() => {
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y += 0.001;
      satelliteRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group position={position} visible={visible}>
      <Hexagon hexagonRef={satelliteRef} hexagonColor={color} onClick={() => onSatelliteClick(index)} />
      <Text
        position={[0, -0.27, 0]}
        fontSize={0.10}
        color="white"
        textAlign="center"
        fontWeight="bold"
        onClick={() => onSatelliteClick(index)}
      >
        {satelliteSection(index)}
      </Text>
    </group>
  );
}

export default Satellite;