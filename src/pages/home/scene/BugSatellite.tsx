import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Color, Group } from "three";

import { InteractiveHexagon } from "./InteractiveHexagon";
import type { ScenePosition } from "./sceneUtils";

interface BugSatelliteProps {
  color: Color;
  labelFontSize: number;
  labelMaxWidth: number;
  labelOffsetY: number;
  position: ScenePosition;
  renderOrder?: number;
}

const bugInactiveColor = "#252525";
const bugBlinkChance = 0.08;
const bugJitterChance = 0.14;

function resetCursor() {
  if (
    typeof document !== "undefined" &&
    document.body.style.cursor === "pointer"
  ) {
    document.body.style.cursor = "auto";
  }
}

export function BugSatellite({
  color,
  labelFontSize,
  labelMaxWidth,
  labelOffsetY,
  position,
  renderOrder = 0,
}: BugSatelliteProps) {
  const navigate = useNavigate();
  const satelliteRef = useRef<Group>(null);
  const [hexagonColor, setHexagonColor] = useState(bugInactiveColor);

  useFrame(() => {
    if (Math.random() < bugBlinkChance) {
      setHexagonColor(
        Math.random() < 0.42 ? `#${color.getHexString()}` : bugInactiveColor,
      );
    }

    if (satelliteRef.current && Math.random() < bugJitterChance) {
      const direction = Math.random() < 0.5 ? -1 : 1;
      satelliteRef.current.rotation.y +=
        direction * (0.025 + Math.random() * 0.035);
      satelliteRef.current.rotation.z -= 0.025 + Math.random() * 0.035;
    }
  });

  const navigateToNotFound = () => {
    void navigate("/notfound");
    resetCursor();
  };

  return (
    <group position={position} renderOrder={renderOrder}>
      <InteractiveHexagon
        hexagonColor={hexagonColor}
        hexagonRef={satelliteRef}
        iconPath="/icons/not_found.svg"
        onClick={navigateToNotFound}
        renderOrder={renderOrder}
      />
      <Text
        color="white"
        font="/fonts/SpaceGrotesk-Bold.ttf"
        fontSize={labelFontSize}
        maxWidth={labelMaxWidth}
        onClick={navigateToNotFound}
        position={[0, labelOffsetY, 0]}
        renderOrder={renderOrder + 1}
        textAlign="center"
      >
        ERR 404
      </Text>
    </group>
  );
}
