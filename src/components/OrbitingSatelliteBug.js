import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

import Hexagon from "./Hexagon";

const OrbitingSatelliteBug = ({
  color,
  iconVisible,
  labelVisible,
  position,
  interactable,
  bodyOpacity = 0.5,
  outlineOpacity = 1,
  iconOpacity = 1,
}) => {
  const navigate = useNavigate();

  const satelliteRef = useRef();

  const [hexagonColor, setHexagonColor] = useState("#252525");

  useEffect(() => {
    let random = Math.random();
    const newColor = random < 0.95 ? "#252525" : color;
    setHexagonColor(newColor);
  }, [color]);

  useFrame(() => {
    if (satelliteRef.current) {
      let random = Math.random();
      if (random < 0.1) {
        satelliteRef.current.rotation.y -= 0.03;
        satelliteRef.current.rotation.z -= 0.03;
      }
    }
  });

  const resetCursor = () => {
    if (
      typeof document !== "undefined" &&
      document.body.style.cursor === "pointer"
    ) {
      document.body.style.cursor = "auto";
    }
  };

  const canInteract = interactable ?? iconVisible;

  return (
    <group position={position} visible={iconVisible}>
      <Hexagon
        hexagonRef={satelliteRef}
        hexagonColor={hexagonColor}
        onClick={() => {
          if (!canInteract) {
            return;
          }
          navigate("/notfound");
          resetCursor();
        }}
        iconPath={"/icons/not_found.svg"}
        visible={iconVisible}
        bodyOpacity={bodyOpacity}
        outlineOpacity={outlineOpacity}
        iconOpacity={iconOpacity}
        showBase={true}
      />
      <Text
        position={[0, -0.27, 0]}
        fontSize={0.1}
        color="white"
        textAlign="center"
        fontWeight="bold"
        font="/fonts/SpaceMono-Bold.ttf"
        visible={labelVisible}
        onClick={
          canInteract
            ? () => {
                navigate("/notfound");
                resetCursor();
              }
            : undefined
        }
      >
        {"ERR 404"}
      </Text>
    </group>
  );
};

export default OrbitingSatelliteBug;
