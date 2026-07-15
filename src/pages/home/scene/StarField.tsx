import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import {
  CanvasTexture,
  MathUtils,
  type BufferGeometry,
  type Points,
  type Texture,
} from "three";

import { getVisibleHalfExtents } from "./hexSphereLayout";

const referenceViewportArea = 1440 * 900;
const minimumStarCount = 2200;
const maximumStarCount = 14000;
const starCountStep = 100;
const viewportAreaScalePower = 0.62;
const viewportCoverageMargin = 1.45;

interface StarFieldProps {
  color?: string;
  count?: number;
  depth?: number;
  position?: [number, number, number];
  size?: number;
}

interface StarFieldScale {
  x: number;
  y: number;
}

function createStarPositions(count: number) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const vectorIndex = index * 3;

    positions[vectorIndex] = MathUtils.randFloatSpread(2);
    positions[vectorIndex + 1] = MathUtils.randFloatSpread(2);
    positions[vectorIndex + 2] = MathUtils.randFloat(-0.5, 0.5);
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

function getResponsiveStarCount({
  baseCount,
  viewportHeight,
  viewportWidth,
}: {
  baseCount: number;
  viewportHeight: number;
  viewportWidth: number;
}) {
  const viewportArea = Math.max(1, viewportHeight * viewportWidth);
  const scaledCount =
    baseCount *
    Math.pow(viewportArea / referenceViewportArea, viewportAreaScalePower);
  const lowerBound = Math.min(baseCount, minimumStarCount);

  const clampedCount = MathUtils.clamp(
    scaledCount,
    lowerBound,
    maximumStarCount,
  );

  return MathUtils.clamp(
    Math.round(clampedCount / starCountStep) * starCountStep,
    lowerBound,
    maximumStarCount,
  );
}

export function StarField({
  color = "#f272c8",
  count = 1400,
  depth = 8,
  position = [0, 0, 0],
  size = 0.018,
}: StarFieldProps) {
  const pointsRef = useRef<Points>(null);
  const geometryRef = useRef<BufferGeometry>(null);
  const canvasSize = useThree((state) => state.size);
  const fieldZ = position[2];
  const fieldScale = useMemo<StarFieldScale>(() => {
    const { halfHeight, halfWidth } = getVisibleHalfExtents({
      objectZ: fieldZ - depth / 2,
      viewportSize: {
        height: canvasSize.height,
        width: canvasSize.width,
      },
    });

    return {
      x: Math.ceil(halfWidth * viewportCoverageMargin * 2) / 2,
      y: Math.ceil(halfHeight * viewportCoverageMargin * 2) / 2,
    };
  }, [canvasSize.height, canvasSize.width, depth, fieldZ]);
  const responsiveCount = useMemo(
    () =>
      getResponsiveStarCount({
        baseCount: count,
        viewportHeight: canvasSize.height,
        viewportWidth: canvasSize.width,
      }),
    [canvasSize.height, canvasSize.width, count],
  );
  const texture = useMemo(() => createRoundStarTexture(), []);
  const positions = useMemo(() => createStarPositions(maximumStarCount), []);

  useLayoutEffect(() => {
    geometryRef.current?.setDrawRange(0, responsiveCount);
  }, [responsiveCount]);

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

    pointsRef.current.rotation.x -= delta / 150;
    pointsRef.current.rotation.y -= delta / 180;
    pointsRef.current.rotation.z -= delta / 220;
  });

  return (
    <points
      ref={pointsRef}
      position={position}
      rotation={[0, 0, Math.PI / 4]}
      scale={[fieldScale.x, fieldScale.y, depth]}
    >
      <bufferGeometry ref={geometryRef}>
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
