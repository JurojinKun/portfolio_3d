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
const SATELLITE_BODY_MIN_OPACITY = 0;
const SATELLITE_EDGE_MIN_OPACITY = 0;
const SATELLITE_ROTATION_SPEED = 0.003;

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
  const baseMeshRef = useRef();
  const edgeSegmentsRef = useRef();
  const initialBodyOpacityRef = useRef(baseMaterial?.opacity ?? 1);
  const initialEdgeOpacityRef = useRef(edgeMaterial?.opacity ?? 1);

  const config = SATELLITE_CONFIG[index] || SATELLITE_CONFIG[0];

  const label = config.translationKey
    ? t(config.translationKey).toUpperCase()
    : config.label || "";

  const iconRevealThreshold = 0.75;
  const labelRevealThreshold = 0.98;
  const interactable = detachProgress >= labelRevealThreshold;
  const showIcon = detachProgress >= iconRevealThreshold;
  const showLabel = detachProgress >= labelRevealThreshold;
  const revealRange = Math.max(
    0.001,
    labelRevealThreshold - iconRevealThreshold
  );
  const transitionProgress = MathUtils.clamp(
    (detachProgress - iconRevealThreshold) / revealRange,
    0,
    1
  );

  const orientation = useMemo(() => {
    const eased = easeInOutCubic(Math.min(detachProgress * 1.2, 1));
    return tile.quaternion.clone().slerp(identityQuaternion, eased);
  }, [detachProgress, tile.quaternion]);

  useEffect(() => {
    if (!baseMaterial || !edgeMaterial) {
      return;
    }

    if (transitionProgress < 0.001) {
      initialBodyOpacityRef.current = baseMaterial.opacity;
      initialEdgeOpacityRef.current = edgeMaterial.opacity;
    }

    const baseOpacity = MathUtils.lerp(
      initialBodyOpacityRef.current,
      SATELLITE_BODY_MIN_OPACITY,
      transitionProgress
    );
    const edgeOpacity = MathUtils.lerp(
      initialEdgeOpacityRef.current,
      SATELLITE_EDGE_MIN_OPACITY,
      transitionProgress
    );

    baseMaterial.opacity = baseOpacity;
    baseMaterial.needsUpdate = true;

    edgeMaterial.opacity = edgeOpacity;
    edgeMaterial.needsUpdate = true;
  }, [baseMaterial, edgeMaterial, transitionProgress]);

  useEffect(() => {
    if (!hexagonRef.current) {
      return;
    }
    hexagonRef.current.rotation.set(0, 0, 0);
  }, [showIcon]);

  useFrame(() => {
    const baseOpacity = baseMaterial?.opacity ?? 0;
    const baseVisible = !showIcon && baseOpacity > 0.05;

    if (baseMeshRef.current) {
      baseMeshRef.current.visible = baseVisible;
    }
    if (edgeSegmentsRef.current) {
      edgeSegmentsRef.current.visible = baseVisible;
    }

    if (hexagonRef.current && interactable) {
      hexagonRef.current.rotation.y += SATELLITE_ROTATION_SPEED;
      hexagonRef.current.rotation.z += SATELLITE_ROTATION_SPEED;
    }
  });

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
  const iconOpacity = MathUtils.clamp(transitionProgress, 0, 1);
  const hexagonBodyOpacity = 0.5;
  const outlineOpacity = 1;

  return (
    <group position={position} quaternion={orientation} scale={scale}>
      <mesh ref={baseMeshRef} geometry={hexGeometry} material={baseMaterial} />
      <lineSegments
        ref={edgeSegmentsRef}
        geometry={hexEdgesGeometry}
        material={edgeMaterial}
      />
      {showIcon &&
        (config.bug ? (
          <SatelliteBug
            color={color}
            iconVisible={showIcon}
            labelVisible={showLabel}
            position={[0, 0, 0]}
            interactable={interactable}
            iconOpacity={iconOpacity}
            bodyOpacity={hexagonBodyOpacity}
            outlineOpacity={outlineOpacity}
          />
        ) : (
          <group>
            <Hexagon
              hexagonRef={hexagonRef}
              hexagonColor={color}
              onClick={handleClick}
              iconPath={config.iconPath}
              visible={showIcon}
              bodyOpacity={hexagonBodyOpacity}
              outlineOpacity={outlineOpacity}
              iconOpacity={iconOpacity}
              showBase={true}
            />
            {showLabel && label && (
              <Text
                position={[0, -0.27, 0]}
                fontSize={0.1}
                color="white"
                textAlign="center"
                fontWeight="bold"
                font="/fonts/SpaceMono-Bold.ttf"
                visible={showLabel}
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
