import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { forwardRef, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { type Color, type Group } from "three";

import { satelliteNavigationItems } from "@/data/navigation";

import { BugSatellite } from "./BugSatellite";
import { InteractiveHexagon } from "./InteractiveHexagon";
import type { ScenePosition } from "./sceneUtils";

const satelliteRotationSpeed = 0.003;

interface OrbitingSatelliteProps {
  color: Color;
  index: number;
  labelFontSize: number;
  labelMaxWidth: number;
  labelOffsetY: number;
  position: ScenePosition;
  tileScale: number;
}

function resetCursor() {
  if (
    typeof document !== "undefined" &&
    document.body.style.cursor === "pointer"
  ) {
    document.body.style.cursor = "auto";
  }
}

function setPointerCursor(cursor: "auto" | "pointer") {
  if (typeof document === "undefined") {
    return;
  }

  document.body.style.cursor = cursor;
}

export const OrbitingSatellite = forwardRef<Group, OrbitingSatelliteProps>(
  function OrbitingSatellite(
    {
      color,
      index,
      labelFontSize,
      labelMaxWidth,
      labelOffsetY,
      position,
      tileScale,
    },
    satelliteRef,
  ) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const hexagonRef = useRef<Group>(null);
    const config =
      satelliteNavigationItems[index] ?? satelliteNavigationItems[0];

    const label =
      "labelKey" in config ? t(config.labelKey).toUpperCase() : config.label;

    useFrame(() => {
      if (hexagonRef.current) {
        hexagonRef.current.rotation.y += satelliteRotationSpeed;
        hexagonRef.current.rotation.z += satelliteRotationSpeed;
      }
    });

    const handleClick = () => {
      void navigate(config.route);
      resetCursor();
    };

    return (
      <group ref={satelliteRef} position={position} scale={tileScale}>
        {"isBug" in config ? (
          <BugSatellite
            color={color}
            labelFontSize={labelFontSize}
            labelMaxWidth={labelMaxWidth}
            labelOffsetY={labelOffsetY}
            position={[0, 0, 0]}
          />
        ) : null}
        {!("isBug" in config) ? (
          <group>
            <InteractiveHexagon
              hexagonColor={color}
              hexagonRef={hexagonRef}
              iconPath={config.iconPath}
              onClick={handleClick}
            />
            {label ? (
              <Text
                color="white"
                font="/fonts/SpaceGrotesk-Bold.ttf"
                fontSize={labelFontSize}
                maxWidth={labelMaxWidth}
                onClick={handleClick}
                onPointerOut={() => {
                  setPointerCursor("auto");
                }}
                onPointerOver={() => {
                  setPointerCursor("pointer");
                }}
                position={[0, labelOffsetY, 0]}
                textAlign="center"
              >
                {label}
              </Text>
            ) : null}
          </group>
        ) : null}
      </group>
    );
  },
);
