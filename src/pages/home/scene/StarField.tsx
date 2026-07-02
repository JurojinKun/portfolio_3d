import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { CanvasTexture, type Points, type Texture } from "three";

interface StarFieldProps {
  color?: string;
  count?: number;
  radius?: number;
  size?: number;
}

function createStarPositions(count: number, radius: number) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const vectorIndex = index * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const distance = radius * Math.cbrt(Math.random());

    positions[vectorIndex] = distance * Math.sin(phi) * Math.cos(theta);
    positions[vectorIndex + 1] = distance * Math.sin(phi) * Math.sin(theta);
    positions[vectorIndex + 2] = distance * Math.cos(phi);
  }

  return positions;
}

function createRoundStarTexture(): Texture | null {
  if (typeof document === "undefined") {
    return null;
  }

  const canvas = document.createElement("canvas");
  const size = 64;
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.45, "rgba(255, 255, 255, 0.95)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  return new CanvasTexture(canvas);
}

export function StarField({
  color = "#f272c8",
  count = 1400,
  radius = 7,
  size = 0.018,
}: StarFieldProps) {
  const pointsRef = useRef<Points>(null);
  const texture = useMemo(() => createRoundStarTexture(), []);
  const positions = useMemo(
    () => createStarPositions(count, radius),
    [count, radius],
  );

  useEffect(
    () => () => {
      texture?.dispose();
    },
    [texture],
  );

  useFrame((_, delta) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.x -= delta / 120;
    pointsRef.current.rotation.y -= delta / 140;
  });

  return (
    <points ref={pointsRef} rotation={[0, 0, Math.PI / 4]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      {texture ? (
        <pointsMaterial
          alphaTest={0.02}
          color={color}
          depthWrite={false}
          map={texture}
          size={size}
          sizeAttenuation
          transparent
        />
      ) : (
        <pointsMaterial
          color={color}
          depthWrite={false}
          size={size}
          sizeAttenuation
          transparent
        />
      )}
    </points>
  );
}
