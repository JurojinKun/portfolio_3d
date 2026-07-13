import { useFrame, useThree } from "@react-three/fiber";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  CatmullRomCurve3,
  Color,
  EdgesGeometry,
  ExtrudeGeometry,
  LineBasicMaterial,
  MathUtils,
  MeshPhongMaterial,
  Shape,
  Vector3,
  type Group,
} from "three";

import { satelliteNavigationItems } from "@/data/navigation";

import { OrbitingSatellite } from "./OrbitingSatellite";
import { generateHexSphereTiles, type ScenePosition } from "./sceneUtils";
import {
  getSceneColorElapsedTime,
  getScenePulseColor,
  sceneEndColorHex,
  sceneStartColorHex,
} from "./sceneColor";

const cameraFov = 50;
const cameraZPosition = 10;
const baseSatelliteZPosition = 1.25;
const backDepthAmplitude = 1.25;
const frontDepthAmplitude = 2.75;
const backgroundSpherePosition = [0, 0.05, -2.8] satisfies ScenePosition;
const backgroundSphereRadius = 2;
const backgroundSphereScale = 0.64;
const backgroundSphereTileCount = 425;
const backgroundSphereRotationSpeed = 0.00022;
const backgroundTileStyle = {
  depth: 0.1,
  edgeOpacity: 0.22,
  foregroundGlowStart: 0.66,
  maxEmissiveIntensity: 0.06,
  maxOpacity: 0.18,
  minOpacity: 0.028,
  radius: 0.15,
} as const;
const collisionCooldownDuration = 1.45;
const mobileSatellitePathDefinitions = [
  {
    phase: 0.02,
    speed: 0.014,
    points: [
      [-0.96, 0.78, -0.72],
      [-0.42, 0.96, -0.18],
      [0.16, 0.42, 0.96],
      [0.92, 0.64, 0.18],
      [0.78, -0.16, -0.62],
      [-0.08, -0.02, 1],
      [-0.88, -0.56, 0.08],
      [0.18, -0.9, -0.88],
    ],
  },
  {
    phase: 0.25,
    speed: 0.0125,
    points: [
      [0.92, 0.86, -0.42],
      [0.12, 0.72, -0.86],
      [-0.88, 0.88, -0.08],
      [-0.62, 0.12, 0.56],
      [0.08, -0.1, 1],
      [0.86, -0.62, 0.1],
      [-0.2, -0.88, -0.58],
      [-0.94, -0.22, -0.92],
    ],
  },
  {
    phase: 0.45,
    speed: 0.013,
    points: [
      [-0.78, -0.86, 0.72],
      [-0.96, -0.12, 0.22],
      [-0.18, 0.1, -0.62],
      [-0.6, 0.78, -0.98],
      [0.28, 0.92, -0.26],
      [0.96, 0.26, 0.44],
      [0.08, -0.08, 1],
      [0.64, -0.44, 0.76],
      [-0.12, -0.64, 0.1],
    ],
  },
  {
    phase: 0.66,
    speed: 0.0115,
    points: [
      [0.76, -0.84, -0.76],
      [0.98, -0.08, -0.18],
      [0.16, 0.08, 0.92],
      [0.54, 0.82, 0.74],
      [-0.28, 0.9, 0.08],
      [-0.96, 0.3, -0.58],
      [-0.58, -0.5, -0.96],
      [0.1, -0.7, -0.18],
    ],
  },
  {
    phase: 0.83,
    speed: 0.012,
    points: [
      [-0.12, 0.88, 0.08],
      [0.72, 0.68, -0.66],
      [0.96, -0.02, -0.98],
      [0.3, -0.2, -0.22],
      [0.76, -0.88, 0.46],
      [-0.06, -0.08, 1],
      [-0.32, -0.8, 0.76],
      [-0.96, -0.02, 0.22],
      [-0.5, 0.46, -0.48],
    ],
  },
  {
    phase: 0.58,
    speed: 0.0128,
    points: [
      [0.34, 0.92, -0.28],
      [0.98, 0.34, 0.42],
      [0.42, -0.16, 1],
      [0.9, -0.78, 0.02],
      [0.06, -0.92, -0.58],
      [-0.9, -0.48, -0.16],
      [-0.64, 0.18, 0.74],
      [-0.08, 0.04, 0.98],
      [-0.82, 0.78, -0.44],
    ],
  },
] as const;
const backgroundTempNormal = new Vector3();
const backgroundTempPosition = new Vector3();
const backgroundTempToCamera = new Vector3();

interface MobileBounds {
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
}

interface MobileSatellitePlacement {
  depthValue: number;
  position: ScenePosition;
}

interface MobileSatelliteTrack {
  curve: CatmullRomCurve3;
  phase: number;
  speed: number;
}

type MotionDirection = -1 | 1;

interface MobileSatelliteMotionState {
  direction: MotionDirection;
  progress: number;
}

function getSatelliteZFromDepthValue(depthValue: number) {
  const clampedDepthValue = MathUtils.clamp(depthValue, -1, 1);

  if (clampedDepthValue >= 0) {
    return baseSatelliteZPosition + clampedDepthValue * frontDepthAmplitude;
  }

  return baseSatelliteZPosition + clampedDepthValue * backDepthAmplitude;
}

function getDepthValueFromSatelliteZ(positionZ: number) {
  const deltaZ = positionZ - baseSatelliteZPosition;
  const amplitude = deltaZ >= 0 ? frontDepthAmplitude : backDepthAmplitude;

  return MathUtils.clamp(deltaZ / amplitude, -1, 1);
}

function getSatelliteDepthScale(depthValue: number) {
  return MathUtils.mapLinear(depthValue, -1, 1, 0.86, 1.84);
}

function getVisibleHalfExtents({
  objectZ,
  viewportHeight,
  viewportWidth,
}: {
  objectZ: number;
  viewportHeight: number;
  viewportWidth: number;
}) {
  const distanceFromCamera = Math.max(cameraZPosition - objectZ, 0.1);
  const halfHeight = Math.tan((cameraFov * Math.PI) / 360) * distanceFromCamera;
  const halfWidth = halfHeight * (viewportWidth / viewportHeight);

  return { halfHeight, halfWidth };
}

function getMobileSatelliteScale(
  viewportWidth: number,
  viewportHeight: number,
) {
  const shortestSide = Math.min(viewportWidth, viewportHeight);

  if (shortestSide <= 360) {
    return 1.08;
  }

  if (viewportWidth <= 480) {
    return 1.18;
  }

  if (viewportWidth <= 720 || viewportHeight <= 560) {
    return 1.16;
  }

  return 1.08;
}

function getMobileLabelFontSize(viewportWidth: number, viewportHeight: number) {
  const shortestSide = Math.min(viewportWidth, viewportHeight);

  if (shortestSide <= 360) {
    return 0.1;
  }

  if (viewportWidth <= 480) {
    return 0.108;
  }

  return 0.104;
}

function getMobileLabelOffsetY(viewportWidth: number, viewportHeight: number) {
  if (Math.min(viewportWidth, viewportHeight) <= 360) {
    return -0.35;
  }

  return -0.36;
}

function getMobileBounds({
  objectZ,
  satelliteScale,
  viewportHeight,
  viewportWidth,
}: {
  objectZ: number;
  satelliteScale: number;
  viewportHeight: number;
  viewportWidth: number;
}): MobileBounds {
  const { halfHeight, halfWidth } = getVisibleHalfExtents({
    objectZ,
    viewportHeight,
    viewportWidth,
  });
  const worldPerPixelY = (halfHeight * 2) / viewportHeight;
  const worldPerPixelX = (halfWidth * 2) / viewportWidth;
  const horizontalClearance = 0.34 * satelliteScale + 10 * worldPerPixelX;
  const verticalClearance = 0.5 * satelliteScale;
  const topChromeClearance = (viewportHeight <= 520 ? 70 : 84) * worldPerPixelY;
  const bottomChromeClearance =
    (viewportHeight <= 520 ? 68 : 80) * worldPerPixelY;

  return {
    maxX: halfWidth - horizontalClearance,
    maxY: halfHeight - topChromeClearance - verticalClearance,
    minX: -halfWidth + horizontalClearance,
    minY: -halfHeight + bottomChromeClearance + verticalClearance,
  };
}

function getMobilePointFromViewportRatio({
  satelliteScale,
  viewportHeight,
  viewportWidth,
  xRatio,
  yRatio,
  zRatio,
}: {
  satelliteScale: number;
  viewportHeight: number;
  viewportWidth: number;
  xRatio: number;
  yRatio: number;
  zRatio: number;
}) {
  const depthValue = MathUtils.clamp(zRatio, -1, 1);
  const objectZ = getSatelliteZFromDepthValue(depthValue);
  const pointScale = satelliteScale * getSatelliteDepthScale(depthValue);
  const bounds = getMobileBounds({
    objectZ,
    satelliteScale: pointScale,
    viewportHeight,
    viewportWidth,
  });
  const xProgress = (MathUtils.clamp(xRatio, -1, 1) + 1) / 2;
  const yProgress = (MathUtils.clamp(yRatio, -1, 1) + 1) / 2;

  return new Vector3(
    MathUtils.lerp(bounds.minX, bounds.maxX, xProgress),
    MathUtils.lerp(bounds.minY, bounds.maxY, yProgress),
    objectZ,
  );
}

function getMinimumSatelliteDistance(
  satelliteScale: number,
  viewportHeight: number,
  viewportWidth: number,
) {
  const shortestSide = Math.min(viewportHeight, viewportWidth);

  if (shortestSide <= 360) {
    return satelliteScale * 0.62;
  }

  if (viewportWidth <= 480) {
    return satelliteScale * 0.72;
  }

  return satelliteScale * 0.8;
}

function createRandomTrackPhases(satelliteCount: number) {
  return Array.from({ length: satelliteCount }, () => Math.random());
}

function createMobileSatelliteTracks({
  phaseOffsets,
  satelliteScale,
  satelliteCount,
  viewportHeight,
  viewportWidth,
}: {
  phaseOffsets: readonly number[];
  satelliteScale: number;
  satelliteCount: number;
  viewportHeight: number;
  viewportWidth: number;
}) {
  return Array.from({ length: satelliteCount }, (_, index) => {
    const pathDefinition =
      mobileSatellitePathDefinitions[
        index % mobileSatellitePathDefinitions.length
      ] ?? mobileSatellitePathDefinitions[0];
    const pathPoints = pathDefinition.points.map(([x, y, z]) =>
      getMobilePointFromViewportRatio({
        satelliteScale,
        viewportHeight,
        viewportWidth,
        xRatio: x,
        yRatio: y,
        zRatio: z,
      }),
    );

    return {
      curve: new CatmullRomCurve3(pathPoints, true, "catmullrom", 0.55),
      phase:
        (pathDefinition.phase + (phaseOffsets[index] ?? Math.random())) % 1,
      speed: pathDefinition.speed,
    } satisfies MobileSatelliteTrack;
  });
}

function wrapProgress(progress: number) {
  return ((progress % 1) + 1) % 1;
}

function getMobileSatellitePosition({
  progress,
  track,
}: {
  progress: number;
  track: MobileSatelliteTrack;
}): MobileSatellitePlacement {
  const wrappedProgress = wrapProgress(progress);
  const point = track.curve.getPointAt(wrappedProgress);
  const depthValue = getDepthValueFromSatelliteZ(point.z);
  const position = [point.x, point.y, point.z] satisfies ScenePosition;

  return { depthValue, position };
}

function getPairKey(firstIndex: number, secondIndex: number) {
  return `${String(firstIndex)}:${String(secondIndex)}`;
}

function getPlacementVisualScale(
  placement: MobileSatellitePlacement,
  satelliteScale: number,
) {
  return satelliteScale * getSatelliteDepthScale(placement.depthValue);
}

function cleanupCollisionCooldowns({
  collisionCooldowns,
  elapsedTime,
}: {
  collisionCooldowns: Map<string, number>;
  elapsedTime: number;
}) {
  collisionCooldowns.forEach((startedAt, key) => {
    if (elapsedTime - startedAt > collisionCooldownDuration) {
      collisionCooldowns.delete(key);
    }
  });
}

function getDirectionAwayFromCollision({
  awayVector,
  progress,
  track,
}: {
  awayVector: Vector3;
  progress: number;
  track: MobileSatelliteTrack;
}): MotionDirection {
  const tangent = track.curve.getTangentAt(wrapProgress(progress));
  const forwardScore = tangent.x * awayVector.x + tangent.y * awayVector.y;

  return forwardScore >= 0 ? 1 : -1;
}

function ensureMotionStates({
  motionStates,
  tracks,
}: {
  motionStates: MobileSatelliteMotionState[];
  tracks: MobileSatelliteTrack[];
}) {
  while (motionStates.length < tracks.length) {
    const track = tracks[motionStates.length];

    motionStates.push({
      direction: Math.random() > 0.5 ? 1 : -1,
      progress: track?.phase ?? Math.random(),
    });
  }

  motionStates.length = tracks.length;
}

function advanceMotionStates({
  delta,
  motionStates,
  tracks,
}: {
  delta: number;
  motionStates: MobileSatelliteMotionState[];
  tracks: MobileSatelliteTrack[];
}) {
  const stableDelta = Math.min(delta, 0.05);

  motionStates.forEach((motionState, index) => {
    const track = tracks[index];

    if (!track) {
      return;
    }

    motionState.progress = wrapProgress(
      motionState.progress + motionState.direction * track.speed * stableDelta,
    );
  });
}

function handleSatelliteCollisions({
  collisionCooldowns,
  elapsedTime,
  minimumDistance,
  motionStates,
  placements,
  satelliteScale,
  tracks,
}: {
  collisionCooldowns: Map<string, number>;
  elapsedTime: number;
  minimumDistance: number;
  motionStates: MobileSatelliteMotionState[];
  placements: MobileSatellitePlacement[];
  satelliteScale: number;
  tracks: MobileSatelliteTrack[];
}) {
  cleanupCollisionCooldowns({ collisionCooldowns, elapsedTime });

  for (let index = 0; index < placements.length; index += 1) {
    for (
      let nextIndex = index + 1;
      nextIndex < placements.length;
      nextIndex += 1
    ) {
      const current = placements[index];
      const next = placements[nextIndex];
      const currentMotionState = motionStates[index];
      const nextMotionState = motionStates[nextIndex];
      const currentTrack = tracks[index];
      const nextTrack = tracks[nextIndex];

      if (
        !current ||
        !next ||
        !currentMotionState ||
        !nextMotionState ||
        !currentTrack ||
        !nextTrack
      ) {
        continue;
      }

      const pairKey = getPairKey(index, nextIndex);
      const lastCollisionTime = collisionCooldowns.get(pairKey);

      if (
        lastCollisionTime !== undefined &&
        elapsedTime - lastCollisionTime < collisionCooldownDuration
      ) {
        continue;
      }

      const deltaX = current.position[0] - next.position[0];
      const deltaY = current.position[1] - next.position[1];
      const distance = Math.hypot(deltaX, deltaY);
      const currentVisualScale = getPlacementVisualScale(
        current,
        satelliteScale,
      );
      const nextVisualScale = getPlacementVisualScale(next, satelliteScale);
      const collisionDistance = Math.max(
        minimumDistance,
        (currentVisualScale + nextVisualScale) * 0.42,
      );

      if (distance >= collisionDistance) {
        continue;
      }

      const fallbackAngle = (index + 1) * (nextIndex + 2) * 0.83;
      const normalX =
        distance > 0.001 ? deltaX / distance : Math.cos(fallbackAngle);
      const normalY =
        distance > 0.001 ? deltaY / distance : Math.sin(fallbackAngle);
      const currentAwayVector = new Vector3(normalX, normalY, 0);
      const nextAwayVector = currentAwayVector.clone().multiplyScalar(-1);

      currentMotionState.direction = getDirectionAwayFromCollision({
        awayVector: currentAwayVector,
        progress: currentMotionState.progress,
        track: currentTrack,
      });
      nextMotionState.direction = getDirectionAwayFromCollision({
        awayVector: nextAwayVector,
        progress: nextMotionState.progress,
        track: nextTrack,
      });
      collisionCooldowns.set(pairKey, elapsedTime);
    }
  }
}

function getMobileSatellitePlacements({
  motionStates,
  tracks,
}: {
  motionStates: MobileSatelliteMotionState[];
  tracks: MobileSatelliteTrack[];
}) {
  return tracks.map((track, index) =>
    getMobileSatellitePosition({
      progress: motionStates[index]?.progress ?? track.phase,
      track,
    }),
  );
}

function createHexBackdropGeometry() {
  const shape = new Shape();

  shape.moveTo(backgroundTileStyle.radius, 0);

  for (let index = 1; index <= 6; index += 1) {
    const theta = (index / 6) * Math.PI * 2;
    shape.lineTo(
      backgroundTileStyle.radius * Math.cos(theta),
      backgroundTileStyle.radius * Math.sin(theta),
    );
  }

  const geometry = new ExtrudeGeometry(shape, {
    bevelEnabled: false,
    depth: backgroundTileStyle.depth,
  });

  geometry.center();
  return geometry;
}

const MobileHexSphereBackdrop = memo(function MobileHexSphereBackdrop() {
  const sphereRef = useRef<Group>(null);
  const startColor = useMemo(() => new Color(sceneStartColorHex), []);
  const endColor = useMemo(() => new Color(sceneEndColorHex), []);
  const currentColor = useMemo(() => startColor.clone(), [startColor]);
  const hexGeometry = useMemo(() => createHexBackdropGeometry(), []);
  const hexEdgesGeometry = useMemo(
    () => new EdgesGeometry(hexGeometry),
    [hexGeometry],
  );
  const hexEdgeMaterial = useMemo(
    () =>
      new LineBasicMaterial({
        color: startColor.clone(),
        depthTest: true,
        depthWrite: false,
        opacity: backgroundTileStyle.edgeOpacity,
        toneMapped: false,
        transparent: true,
      }),
    [startColor],
  );
  const tiles = useMemo(
    () =>
      generateHexSphereTiles(backgroundSphereTileCount, backgroundSphereRadius),
    [],
  );
  const tileMaterials = useMemo(
    () =>
      tiles.map(
        () =>
          new MeshPhongMaterial({
            color: startColor.clone(),
            emissive: startColor.clone(),
            emissiveIntensity: 0,
            opacity: backgroundTileStyle.minOpacity,
            polygonOffset: true,
            polygonOffsetFactor: -2,
            polygonOffsetUnits: -2,
            transparent: true,
          }),
      ),
    [startColor, tiles],
  );

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

  useFrame(({ camera }) => {
    const sphere = sphereRef.current;

    if (!sphere) {
      return;
    }

    getScenePulseColor({
      elapsedTime: getSceneColorElapsedTime(),
      endColor,
      startColor,
      targetColor: currentColor,
    });
    sphere.rotation.y += backgroundSphereRotationSpeed;
    sphere.rotation.z += backgroundSphereRotationSpeed;
    hexEdgeMaterial.color.copy(currentColor);

    tiles.forEach((tile, index) => {
      const material = tileMaterials[index];

      if (!material) {
        return;
      }

      backgroundTempNormal.copy(tile.normal).applyQuaternion(sphere.quaternion);
      backgroundTempPosition
        .copy(tile.position)
        .applyQuaternion(sphere.quaternion)
        .multiplyScalar(backgroundSphereScale)
        .add(sphere.position);
      backgroundTempToCamera
        .copy(camera.position)
        .sub(backgroundTempPosition)
        .normalize();

      const facing = MathUtils.clamp(
        backgroundTempNormal.dot(backgroundTempToCamera),
        -1,
        1,
      );
      const normalizedFacing = (facing + 1) / 2;
      const opacityFacing = MathUtils.smoothstep(normalizedFacing, 0.18, 0.92);
      const targetOpacity =
        backgroundTileStyle.minOpacity +
        (backgroundTileStyle.maxOpacity - backgroundTileStyle.minOpacity) *
          opacityFacing;
      const foregroundGlow = MathUtils.smoothstep(
        normalizedFacing,
        backgroundTileStyle.foregroundGlowStart,
        1,
      );

      material.color.copy(currentColor);
      material.emissive.copy(currentColor);
      material.emissiveIntensity = MathUtils.lerp(
        material.emissiveIntensity,
        backgroundTileStyle.maxEmissiveIntensity * foregroundGlow,
        0.1,
      );
      material.opacity = MathUtils.lerp(material.opacity, targetOpacity, 0.08);
      material.needsUpdate = true;
    });
  });

  return (
    <group
      ref={sphereRef}
      position={backgroundSpherePosition}
      rotation={[0.2, 0.42, -0.12]}
      scale={backgroundSphereScale}
    >
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
  );
});

export function MobileFloatingHexagons() {
  const { height, width } = useThree((state) => state.size);
  const startColor = useMemo(() => new Color(sceneStartColorHex), []);
  const endColor = useMemo(() => new Color(sceneEndColorHex), []);
  const currentColor = useMemo(() => startColor.clone(), [startColor]);
  const [color, setColor] = useState(() =>
    getScenePulseColor({
      elapsedTime: getSceneColorElapsedTime(),
      endColor,
      startColor,
      targetColor: startColor.clone(),
    }),
  );
  const collisionCooldownsRef = useRef(new Map<string, number>());
  const lastColorStateUpdateRef = useRef(0);
  const motionStatesRef = useRef<MobileSatelliteMotionState[]>([]);
  const satelliteRefs = useRef<(Group | null)[]>([]);
  const satelliteScale = getMobileSatelliteScale(width, height);
  const labelFontSize = getMobileLabelFontSize(width, height);
  const labelMaxWidth = 0.92;
  const labelOffsetY = getMobileLabelOffsetY(width, height);
  const minimumSatelliteDistance = getMinimumSatelliteDistance(
    satelliteScale,
    height,
    width,
  );
  const randomTrackPhases = useMemo(
    () => createRandomTrackPhases(satelliteNavigationItems.length),
    [],
  );
  const satelliteTracks = useMemo(
    () =>
      createMobileSatelliteTracks({
        phaseOffsets: randomTrackPhases,
        satelliteScale,
        satelliteCount: satelliteNavigationItems.length,
        viewportHeight: height,
        viewportWidth: width,
      }),
    [height, randomTrackPhases, satelliteScale, width],
  );
  const initialSatellitePlacements = useMemo(
    () =>
      satelliteTracks.map((track) =>
        getMobileSatellitePosition({
          progress: track.phase,
          track,
        }),
      ),
    [satelliteTracks],
  );

  useFrame(({ clock }, delta) => {
    const elapsedTime = clock.getElapsedTime();
    const updatedColor = getScenePulseColor({
      elapsedTime: getSceneColorElapsedTime(),
      endColor,
      startColor,
      targetColor: currentColor,
    });

    if (elapsedTime - lastColorStateUpdateRef.current >= 0.08) {
      setColor(updatedColor.clone());
      lastColorStateUpdateRef.current = elapsedTime;
    }

    ensureMotionStates({
      motionStates: motionStatesRef.current,
      tracks: satelliteTracks,
    });
    advanceMotionStates({
      delta,
      motionStates: motionStatesRef.current,
      tracks: satelliteTracks,
    });
    const placements = getMobileSatellitePlacements({
      motionStates: motionStatesRef.current,
      tracks: satelliteTracks,
    });

    handleSatelliteCollisions({
      collisionCooldowns: collisionCooldownsRef.current,
      elapsedTime,
      minimumDistance: minimumSatelliteDistance,
      motionStates: motionStatesRef.current,
      placements,
      satelliteScale,
      tracks: satelliteTracks,
    });

    placements.forEach((placement, index) => {
      const satellite = satelliteRefs.current[index];
      const depthScale = getSatelliteDepthScale(placement.depthValue);

      if (!satellite) {
        return;
      }

      satellite.position.set(...placement.position);
      satellite.scale.setScalar(satelliteScale * depthScale);
      satellite.visible = true;
    });
  });

  return (
    <>
      <MobileHexSphereBackdrop />
      {satelliteTracks.map((track, index) => (
        <OrbitingSatellite
          key={satelliteNavigationItems[index]?.id ?? index}
          ref={(satellite) => {
            satelliteRefs.current[index] = satellite;
          }}
          color={color}
          index={index}
          labelFontSize={labelFontSize}
          labelMaxWidth={labelMaxWidth}
          labelOffsetY={labelOffsetY}
          position={
            initialSatellitePlacements[index]?.position ??
            getMobileSatellitePosition({
              progress: track.phase,
              track,
            }).position
          }
          tileScale={satelliteScale}
        />
      ))}
    </>
  );
}
