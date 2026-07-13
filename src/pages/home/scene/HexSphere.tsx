import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Color,
  EdgesGeometry,
  ExtrudeGeometry,
  LineBasicMaterial,
  MathUtils,
  MeshPhongMaterial,
  Quaternion,
  Shape,
  Vector3,
  type Group,
} from "three";

import { OrbitingSatellite } from "./OrbitingSatellite";
import {
  generateHexSphereTiles,
  selectSatelliteTiles,
  type ScenePosition,
} from "./sceneUtils";
import {
  getSceneColorElapsedTime,
  getScenePulseColor,
  sceneEndColorHex,
  sceneStartColorHex,
} from "./sceneColor";

const sphereRotationSpeed = 0.0003;
const satelliteOrbitSpeed = 0.03;
const cameraFov = 50;
const cameraZPosition = 10;
const sphereRadius = 2;
const satelliteZOffset = 1.3;
const tileStyle = {
  baseOpacity: 1,
  depth: 0.1,
  edgeOpacity: 1,
  foregroundGlowStart: 0.66,
  maxEmissiveIntensity: 0.28,
  maxOpacity: 0.94,
  minOpacity: 0.2,
  radius: 0.15,
} as const;
const tempNormal = new Vector3();
const tempPosition = new Vector3();
const tempToCamera = new Vector3();
const tempColor = new Color();
const identityQuaternion = new Quaternion();

interface WindowSize {
  height: number;
  width: number;
}

function isPortraitTabletViewport({ height, width }: WindowSize) {
  return width > 720 && width <= 1180 && height > width;
}

function createHexGeometry() {
  const shape = new Shape();
  const radius = tileStyle.radius;

  shape.moveTo(radius, 0);

  for (let index = 1; index <= 6; index += 1) {
    const theta = (index / 6) * Math.PI * 2;
    shape.lineTo(radius * Math.cos(theta), radius * Math.sin(theta));
  }

  const geometry = new ExtrudeGeometry(shape, {
    bevelEnabled: false,
    depth: tileStyle.depth,
  });

  geometry.center();
  return geometry;
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>(() =>
    typeof window === "undefined"
      ? { height: 900, width: 1280 }
      : { height: window.innerHeight, width: window.innerWidth },
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}

function getEndPosition({ height, width }: WindowSize): ScenePosition {
  if (isPortraitTabletViewport({ height, width })) {
    return [0, 0.1, -0.55];
  }

  if (height <= 430) {
    return [0, 0.1, -4.5];
  }

  if (width <= 400) {
    return [0, 0.1, -5.2];
  }

  if (width <= 600) {
    return [0, 0.1, -3.4];
  }

  if (width <= 1000) {
    return [0, 0.1, 0.5];
  }

  return [0, 0.1, 2.5];
}

function getOrbitRadius({ height, width }: WindowSize) {
  const shortestSide = Math.min(height, width);

  if (shortestSide <= 360) {
    return 2.12;
  }

  if (shortestSide <= 430) {
    return 2.22;
  }

  if (width <= 480) {
    return 2.35;
  }

  if (width <= 720) {
    return 2.45;
  }

  return 2.6;
}

function getVisibleHalfExtents({
  objectZ,
  windowSize,
}: {
  objectZ: number;
  windowSize: WindowSize;
}) {
  const distanceFromCamera = Math.max(cameraZPosition - objectZ, 0.1);
  const halfHeight = Math.tan((cameraFov * Math.PI) / 360) * distanceFromCamera;
  const halfWidth = halfHeight * (windowSize.width / windowSize.height);

  return { halfHeight, halfWidth };
}

function getSatelliteScale({ height, width }: WindowSize) {
  const shortestSide = Math.min(height, width);

  if (isPortraitTabletViewport({ height, width })) {
    return 0.92;
  }

  if (shortestSide <= 380) {
    return 0.82;
  }

  if (width <= 480) {
    return 0.88;
  }

  if (width <= 720) {
    return 0.94;
  }

  return 1;
}

function getSphereScale({ height, width }: WindowSize) {
  const shortestSide = Math.min(height, width);

  if (isPortraitTabletViewport({ height, width })) {
    return 0.88;
  }

  if (shortestSide <= 380) {
    return 0.9;
  }

  if (width <= 480) {
    return 0.94;
  }

  if (width <= 720 || height <= 640) {
    return 0.98;
  }

  return 1;
}

function getLabelFontSize({ height, width }: WindowSize) {
  const shortestSide = Math.min(height, width);

  if (shortestSide <= 360) {
    return 0.096;
  }

  if (width <= 480) {
    return 0.104;
  }

  if (width <= 720 || height <= 640) {
    return 0.106;
  }

  return 0.1;
}

function getLabelOffsetY({ height, width }: WindowSize) {
  const shortestSide = Math.min(height, width);

  if (shortestSide <= 360) {
    return -0.28;
  }

  if (width <= 480) {
    return -0.29;
  }

  if (width <= 720 || height <= 640) {
    return -0.3;
  }

  return -0.27;
}

function getLabelMaxWidth({ height, width }: WindowSize) {
  const shortestSide = Math.min(height, width);

  if (isPortraitTabletViewport({ height, width })) {
    return 0.88;
  }

  if (shortestSide <= 360) {
    return 0.76;
  }

  if (width <= 480) {
    return 0.84;
  }

  if (width <= 720 || height <= 640) {
    return 0.92;
  }

  return 0.95;
}

function getSafeOrbitRadius({
  availableRadius,
  baseRadius,
  minimumRadius,
}: {
  availableRadius: number;
  baseRadius: number;
  minimumRadius: number;
}) {
  const safeAvailableRadius = Math.max(0.1, availableRadius);
  const safeMinimumRadius = Math.min(minimumRadius, safeAvailableRadius);

  return Math.min(baseRadius, Math.max(safeMinimumRadius, safeAvailableRadius));
}

function getOrbitRadii({
  groupPosition,
  labelFontSize,
  labelMaxWidth,
  labelOffsetY,
  sphereScale,
  tileScale,
  windowSize,
}: {
  groupPosition: ScenePosition;
  labelFontSize: number;
  labelMaxWidth: number;
  labelOffsetY: number;
  sphereScale: number;
  tileScale: number;
  windowSize: WindowSize;
}) {
  const baseRadius = getOrbitRadius(windowSize);
  const { halfHeight, halfWidth } = getVisibleHalfExtents({
    objectZ: groupPosition[2] + satelliteZOffset,
    windowSize,
  });
  const labelVerticalClearance =
    (Math.abs(labelOffsetY) + labelFontSize * 1.4 + 0.1) * tileScale;
  const labelHorizontalClearance = (labelMaxWidth / 2 + 0.18) * tileScale;
  const minimumRadius = sphereRadius * sphereScale + 0.36 * tileScale;
  const availableRadiusX = halfWidth - labelHorizontalClearance;
  const availableRadiusY = halfHeight - labelVerticalClearance;

  return {
    x: getSafeOrbitRadius({
      availableRadius: availableRadiusX,
      baseRadius,
      minimumRadius,
    }),
    y: getSafeOrbitRadius({
      availableRadius: availableRadiusY,
      baseRadius,
      minimumRadius,
    }),
  };
}

function computeSatellitePosition({
  elapsedTime,
  groupPosition,
  index,
  labelFontSize,
  labelMaxWidth,
  labelOffsetY,
  satelliteCount,
  sphereScale,
  tileScale,
  windowSize,
}: {
  elapsedTime: number;
  groupPosition: ScenePosition;
  index: number;
  labelFontSize: number;
  labelMaxWidth: number;
  labelOffsetY: number;
  satelliteCount: number;
  sphereScale: number;
  tileScale: number;
  windowSize: WindowSize;
}): ScenePosition {
  const angle =
    ((2 * Math.PI) / satelliteCount) * index +
    elapsedTime * satelliteOrbitSpeed;
  const orbitRadii = getOrbitRadii({
    groupPosition,
    labelFontSize,
    labelMaxWidth,
    labelOffsetY,
    sphereScale,
    tileScale,
    windowSize,
  });

  return [
    groupPosition[0] + Math.cos(angle) * orbitRadii.x,
    groupPosition[1] + Math.sin(angle) * orbitRadii.y,
    groupPosition[2] + satelliteZOffset,
  ] satisfies ScenePosition;
}

export function HexSphere() {
  const sphereGroupRef = useRef<Group>(null);
  const windowSize = useWindowSize();
  const startColor = useMemo(() => new Color(sceneStartColorHex), []);
  const endColor = useMemo(() => new Color(sceneEndColorHex), []);
  const hexGeometry = useMemo(() => createHexGeometry(), []);
  const hexEdgesGeometry = useMemo(
    () => new EdgesGeometry(hexGeometry),
    [hexGeometry],
  );
  const hexEdgeMaterial = useMemo(
    () =>
      new LineBasicMaterial({
        color: startColor.clone(),
        depthTest: false,
        depthWrite: false,
        opacity: tileStyle.edgeOpacity,
        toneMapped: false,
        transparent: false,
      }),
    [startColor],
  );
  const tiles = useMemo(() => generateHexSphereTiles(425, sphereRadius), []);
  const satelliteRefs = useRef<(Group | null)[]>([]);
  const tileMaterials = useMemo(
    () =>
      tiles.map(
        () =>
          new MeshPhongMaterial({
            color: startColor.clone(),
            emissive: startColor.clone(),
            emissiveIntensity: 0,
            opacity: tileStyle.baseOpacity,
            polygonOffset: true,
            polygonOffsetFactor: -2,
            polygonOffsetUnits: -2,
            transparent: true,
          }),
      ),
    [startColor, tiles],
  );
  const satelliteIndices = useMemo(
    () => selectSatelliteTiles(tiles, 6),
    [tiles],
  );
  const groupPosition = useMemo(() => getEndPosition(windowSize), [windowSize]);
  const sphereScale = getSphereScale(windowSize);
  const sphereTileScale = 1;
  const satelliteScale = getSatelliteScale(windowSize);
  const labelFontSize = getLabelFontSize(windowSize);
  const labelMaxWidth = getLabelMaxWidth(windowSize);
  const labelOffsetY = getLabelOffsetY(windowSize);
  const [color, setColor] = useState(() =>
    getScenePulseColor({
      elapsedTime: getSceneColorElapsedTime(),
      endColor,
      startColor,
      targetColor: startColor.clone(),
    }),
  );
  const lastColorStateUpdateRef = useRef(0);
  const initialSatellitePositions = useMemo(
    () =>
      satelliteIndices.map((_, index) =>
        computeSatellitePosition({
          elapsedTime: 0,
          groupPosition,
          index,
          labelFontSize,
          labelMaxWidth,
          labelOffsetY,
          satelliteCount: satelliteIndices.length,
          sphereScale,
          tileScale: satelliteScale,
          windowSize,
        }),
      ),
    [
      groupPosition,
      labelFontSize,
      labelMaxWidth,
      labelOffsetY,
      satelliteIndices,
      satelliteScale,
      sphereScale,
      windowSize,
    ],
  );

  useEffect(() => {
    hexEdgeMaterial.color.copy(color);
  }, [color, hexEdgeMaterial]);

  useEffect(
    () => () => {
      hexGeometry.dispose();
      hexEdgesGeometry.dispose();
      hexEdgeMaterial.dispose();
      tileMaterials.forEach((material) => {
        material.dispose();
      });
    },
    [hexEdgeMaterial, hexEdgesGeometry, hexGeometry, tileMaterials],
  );

  useFrame(({ camera, clock }) => {
    const sphereGroup = sphereGroupRef.current;

    if (!sphereGroup) {
      return;
    }

    const elapsedTime = clock.getElapsedTime();
    const updatedColor = getScenePulseColor({
      elapsedTime: getSceneColorElapsedTime(),
      endColor,
      startColor,
      targetColor: tempColor,
    });

    sphereGroup.rotation.y += sphereRotationSpeed;
    sphereGroup.rotation.z += sphereRotationSpeed;
    hexEdgeMaterial.color.copy(updatedColor);

    if (elapsedTime - lastColorStateUpdateRef.current >= 0.08) {
      setColor(updatedColor.clone());
      lastColorStateUpdateRef.current = elapsedTime;
    }

    tiles.forEach((tile, index) => {
      const material = tileMaterials[index];

      if (!material) {
        return;
      }

      tempNormal.copy(tile.normal).applyQuaternion(sphereGroup.quaternion);
      tempPosition
        .copy(tile.position)
        .applyQuaternion(sphereGroup.quaternion)
        .add(sphereGroup.position);
      tempToCamera.copy(camera.position).sub(tempPosition).normalize();

      const facing = MathUtils.clamp(tempNormal.dot(tempToCamera), -1, 1);
      const normalizedFacing = (facing + 1) / 2;
      const targetOpacity =
        tileStyle.minOpacity +
        (tileStyle.maxOpacity - tileStyle.minOpacity) * normalizedFacing;
      const foregroundGlow = MathUtils.smoothstep(
        normalizedFacing,
        tileStyle.foregroundGlowStart,
        1,
      );

      material.color.copy(updatedColor);
      material.emissive.copy(updatedColor);
      material.emissiveIntensity = MathUtils.lerp(
        material.emissiveIntensity,
        tileStyle.maxEmissiveIntensity * foregroundGlow,
        0.1,
      );
      material.opacity = MathUtils.lerp(material.opacity, targetOpacity, 0.1);
      material.needsUpdate = true;
    });

    sphereGroup.position.set(...groupPosition);

    satelliteIndices.forEach((_, index) => {
      const satellite = satelliteRefs.current[index];

      if (!satellite) {
        return;
      }

      const nextPosition = computeSatellitePosition({
        elapsedTime,
        groupPosition,
        index,
        labelFontSize,
        labelMaxWidth,
        labelOffsetY,
        satelliteCount: satelliteIndices.length,
        sphereScale,
        tileScale: satelliteScale,
        windowSize,
      });

      satellite.position.set(...nextPosition);
      satellite.quaternion.copy(identityQuaternion);
      satellite.scale.setScalar(satelliteScale);
      satellite.visible = true;
    });
  });

  return (
    <>
      <group ref={sphereGroupRef} position={groupPosition} scale={sphereScale}>
        {tiles.map((tile, index) => {
          const material = tileMaterials[index];

          if (!material) {
            return null;
          }

          return (
            <group
              key={index}
              position={tile.position}
              quaternion={tile.quaternion}
              scale={sphereTileScale}
            >
              <mesh geometry={hexGeometry} material={material} />
              <lineSegments
                geometry={hexEdgesGeometry}
                material={hexEdgeMaterial}
              />
            </group>
          );
        })}
      </group>

      {satelliteIndices.map((tileIndex, index) => {
        const position = initialSatellitePositions[index];

        if (!position) {
          return null;
        }

        return (
          <OrbitingSatellite
            key={tileIndex}
            ref={(satellite) => {
              satelliteRefs.current[index] = satellite;
            }}
            color={color}
            index={index}
            labelFontSize={labelFontSize}
            labelMaxWidth={labelMaxWidth}
            labelOffsetY={labelOffsetY}
            position={position}
            tileScale={satelliteScale}
          />
        );
      })}
    </>
  );
}
