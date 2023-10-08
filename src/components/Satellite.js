import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Hexagon from './Hexagon';

const Satellite = ({ color, visible, position, index }) => {
  const { t } = useTranslation();
  let navigate = useNavigate();

  const satelliteRef = useRef();

  const satelliteName = (index) => {
    let section;

    switch (index) {
      case 0:
        section = t("satellites.about_me").toUpperCase();
        break;
      case 1:
        section = t("satellites.skills").toUpperCase();
        break;
      case 2:
        section = t("satellites.experiences").toUpperCase();
        break;
      case 3:
        section = t("satellites.projects").toUpperCase();
        break;
      case 4:
        section = t("satellites.contact_me").toUpperCase();
        break;
      default:
        section = "";
        break;
    }

    return section;
  }

  const satelliteIconPath = (index) => {
    let iconPath;

    switch (index) {
      case 0:
        iconPath = "/icons/about_me.svg";
        break;
      case 1:
        iconPath = "/icons/skills.svg";
        break;
      case 2:
        iconPath = "/icons/experiences.svg";
        break;
      case 3:
        iconPath = "/icons/projects.svg";
        break;
      case 4:
        iconPath = "/icons/contact_me.svg";
        break;
      default:
        iconPath = "";
        break;
    }

    return iconPath;
  }

  const onSatelliteClick = (index) => {
    let url;

    switch (index) {
      case 0:
        url = "/portfolio/aboutme";
        break;
      case 1:
        url = "/portfolio/skills";
        break;
      case 2:
        url = "/portfolio/experiences";
        break;
      case 3:
        url = "/portfolio/projects";
        break;
      case 4:
        url = "/portfolio/contactme";
        break;
      default:
        url = "/portfolio";
        break;
    }
    navigate(url);
  }

  useFrame(() => {
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y += 0.003;
      satelliteRef.current.rotation.z += 0.003;
    }
  });

  return (
    <group position={position} visible={visible}>
      <Hexagon hexagonRef={satelliteRef} hexagonColor={color} onClick={() => onSatelliteClick(index)} iconPath={satelliteIconPath(index)} />
      <Text
        position={[0, -0.27, 0]}
        fontSize={0.10}
        color="white"
        textAlign="center"
        fontWeight="bold"
        font="/fonts/SpaceMono-Bold.ttf"
        onClick={visible && (() => onSatelliteClick(index))}
      >
        {satelliteName(index)}
      </Text>
    </group>
  );
}

export default Satellite;