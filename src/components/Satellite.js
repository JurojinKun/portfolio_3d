import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Hexagon from './Hexagon';

const SATELLITE_CONFIG = [
  {
    translationKey: 'satellites.about_me',
    iconPath: '/icons/about_me.svg',
    route: '/portfolio/aboutme',
  },
  {
    translationKey: 'satellites.skills',
    iconPath: '/icons/skills.svg',
    route: '/portfolio/skills',
  },
  {
    translationKey: 'satellites.experiences',
    iconPath: '/icons/experiences.svg',
    route: '/portfolio/experiences',
  },
  {
    translationKey: 'satellites.projects',
    iconPath: '/icons/projects.svg',
    route: '/portfolio/projects',
  },
  {
    translationKey: 'satellites.contact_me',
    iconPath: '/icons/contact_me.svg',
    route: '/portfolio/contactme',
  },
];

const resetCursor = () => {
  if (typeof document !== 'undefined' && document.body.style.cursor === 'pointer') {
    document.body.style.cursor = 'auto';
  }
};

const Satellite = ({ color, visible, position, index }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const satelliteRef = useRef();

  const config = SATELLITE_CONFIG[index];
  const label = config ? t(config.translationKey).toUpperCase() : '';
  const iconPath = config ? config.iconPath : '';
  const route = config ? config.route : '/portfolio';

  const handleNavigate = () => {
    navigate(route);
    resetCursor();
  };

  useFrame(() => {
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y += 0.003;
      satelliteRef.current.rotation.z += 0.003;
    }
  });

  return (
    <group position={position} visible={visible}>
      <Hexagon
        hexagonRef={satelliteRef}
        hexagonColor={color}
        onClick={handleNavigate}
        iconPath={iconPath}
        visible={visible}
      />
      <Text
        position={[0, -0.27, 0]}
        fontSize={0.10}
        color="white"
        textAlign="center"
        fontWeight="bold"
        font="/fonts/SpaceMono-Bold.ttf"
        onClick={visible ? handleNavigate : undefined}
      >
        {label}
      </Text>
    </group>
  );
};

export default Satellite;
