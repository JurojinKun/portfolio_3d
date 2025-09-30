import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MathUtils, Quaternion } from "three";

import Hexagon from "./Hexagon";
import SatelliteBug from "./OrbitingSatelliteBug";
import { easeInOutCubic } from "../utils/utils";

const identityQuaternion = new Quaternion();

const SATELLITE_CONFIG = [
  {
    translationKey: "satellites.about_me",
    iconPath: "/icons/about_me.svg",
    route: "/portfolio/aboutme",
  },
  {
    translationKey: "satellites.skills",
    iconPath: "/icons/skills.svg",
    route: "/portfolio/skills",
  },
  {
    translationKey: "satellites.experiences",
    iconPath: "/icons/experiences.svg",
    route: "/portfolio/experiences",
  },
  {
    translationKey: "satellites.projects",
    iconPath: "/icons/projects.svg",
    route: "/portfolio/projects",
  },
  {
    translationKey: "satellites.contact_me",
    iconPath: "/icons/contact_me.svg",
    route: "/portfolio/contactme",
  },
  {
    label: "ERR 404",
    iconPath: "/icons/not_found.svg",
    route: "/notfound",
    bug: true,
  },
];

const resetCursor = () => {
  if (
    typeof document !== "undefined" &&
    document.body.style.cursor === "pointer"
  ) {
    document.body.style.cursor = "auto";
  }
};

const OrbitingSatellite = ({
  tile,
  position,
  color,
  hexGeometry,
  hexEdgesGeometry,
  baseMaterial,
  edgeMaterial,
  detachProgress,
  index,
  tileScale,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const hexagonRef = useRef();

  const config = SATELLITE_CONFIG[index] || SATELLITE_CONFIG[0];

  const label = config.translationKey
    ? t(config.translationKey).toUpperCase()
    : config.label || "";

  const iconRevealThreshold = 0.75;
  const labelRevealThreshold = 0.98;
  const interactable = detachProgress >= labelRevealThreshold;
  const showIcon = detachProgress >= iconRevealThreshold;
  const showLabel = detachProgress >= labelRevealThreshold;

  const orientation = useMemo(() => {
    const eased = easeInOutCubic(Math.min(detachProgress * 1.2, 1));
    return tile.quaternion.clone().slerp(identityQuaternion, eased);
  }, [detachProgress, tile.quaternion]);

  useEffect(() => {
    if (!hexagonRef.current) {
      return;
    }
    hexagonRef.current.rotation.set(0, 0, 0);
  }, [showIcon]);

  useFrame(() => {
    if (interactable && hexagonRef.current) {
      hexagonRef.current.rotation.y += 0.003;
      hexagonRef.current.rotation.z += 0.003;
    }
  });

  useEffect(() => {
    if (!baseMaterial || !edgeMaterial) {
      return;
    }
    baseMaterial.color.copy(color);
    edgeMaterial.color.copy(color);
  }, [baseMaterial, edgeMaterial, color]);

  const handleClick = () => {
    if (!interactable) {
      return;
    }
    resetCursor();

    if (config.route) {
      navigate(config.route);
      return;
    }

    if (config.url) {
      window.open(config.url, "_blank", "noopener,noreferrer");
    }
  };

  const scale = MathUtils.lerp(tileScale, 1, detachProgress);

  return (
    <group position={position} quaternion={orientation} scale={scale}>
      <mesh
        geometry={hexGeometry}
        material={baseMaterial}
        visible={!showIcon}
      />
      <lineSegments
        geometry={hexEdgesGeometry}
        material={edgeMaterial}
        visible={!showIcon}
      />
      {showIcon &&
        (config.bug ? (
          <SatelliteBug
            color={color}
            visible={showIcon}
            position={[0, 0, 0]}
            interactable={interactable}
          />
        ) : (
          <group>
            <Hexagon
              hexagonRef={hexagonRef}
              hexagonColor={color}
              onClick={handleClick}
              iconPath={config.iconPath}
              visible={interactable}
            />
            {showLabel && label && (
              <Text
                position={[0, -0.27, 0]}
                fontSize={0.1}
                color="white"
                textAlign="center"
                fontWeight="bold"
                font="/fonts/SpaceMono-Bold.ttf"
              >
                {label}
              </Text>
            )}
          </group>
        ))}
    </group>
  );
};

export default OrbitingSatellite;
