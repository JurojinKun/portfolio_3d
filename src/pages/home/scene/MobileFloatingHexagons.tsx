import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { Color, MathUtils, Vector3, type Group } from "three";

import { satelliteNavigationItems } from "@/data/navigation";

import { OrbitingSatellite } from "./OrbitingSatellite";
import { type ScenePosition } from "./sceneUtils";
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
const frontDepthAmplitude = 2.25;
const mobileSatelliteBaseSpeed = 0.034;
const mobileSatelliteSpeedVariance = 0.008;
const mobileSatelliteDepthAmplitude = 0.52;
const mobileSatelliteDepthBase = 0.02;
const mobileSatelliteDepthSpeedMin = 0.1;
const mobileSatelliteDepthSpeedVariance = 0.05;
const mobileSatelliteNaturalTurnStrength = 0.2;
const mobileSatelliteMaxFrameDelta = 0.034;
const mobileSatelliteCollisionTangentBias = 0.16;
const mobileSatelliteCollisionRandomness = 0.1;
const mobileSatelliteHexVisualRadius = 0.17;
const mobileSatelliteInitialXLimit = 1;
const mobileSatelliteInitialYLimit = 0.8;
const mobileSatelliteInitialSpacing = 0.42;
const mobileSatelliteLabelLineHeightFactor = 1.28;
const mobileSatelliteLabelMaxWidth = 0.92;

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

interface MobileSatelliteVisualBounds {
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
}

interface MobileSatelliteVisualExtents {
  bottom: number;
  halfWidth: number;
  top: number;
}

interface MobileSatelliteInitialPosition {
  xRatio: number;
  yRatio: number;
}

interface MobileSatelliteMotionState {
  collisionPhase: number;
  depthPhase: number;
  depthSpeed: number;
  speed: number;
  turnPhase: number;
  turnSpeed: number;
  velocityX: number;
  velocityY: number;
  xRatio: number;
  yRatio: number;
}

interface MobileSatelliteCollisionImpulse {
  count: number;
  x: number;
  y: number;
}

function getSatelliteZFromDepthValue(depthValue: number) {
  const clampedDepthValue = MathUtils.clamp(depthValue, -1, 1);

  if (clampedDepthValue >= 0) {
    return baseSatelliteZPosition + clampedDepthValue * frontDepthAmplitude;
  }

  return baseSatelliteZPosition + clampedDepthValue * backDepthAmplitude;
}

function getSatelliteDepthScale(depthValue: number) {
  return MathUtils.mapLinear(depthValue, -1, 1, 0.86, 1.58);
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

function getMobileSatelliteVisualExtents({
  satelliteScale,
  viewportHeight,
  viewportWidth,
}: {
  satelliteScale: number;
  viewportHeight: number;
  viewportWidth: number;
}): MobileSatelliteVisualExtents {
  const labelFontSize = getMobileLabelFontSize(viewportWidth, viewportHeight);
  const labelOffsetY = Math.abs(
    getMobileLabelOffsetY(viewportWidth, viewportHeight),
  );

  return {
    bottom:
      (labelOffsetY + labelFontSize * mobileSatelliteLabelLineHeightFactor) *
      satelliteScale,
    halfWidth:
      Math.max(
        mobileSatelliteHexVisualRadius,
        mobileSatelliteLabelMaxWidth / 2,
      ) * satelliteScale,
    top: mobileSatelliteHexVisualRadius * satelliteScale,
  };
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
  const visualExtents = getMobileSatelliteVisualExtents({
    satelliteScale,
    viewportHeight,
    viewportWidth,
  });
  const headerChromeClearance =
    (viewportHeight <= 520 ? 76 : 92) * worldPerPixelY;
  const footerChromeClearance =
    (viewportHeight <= 520 ? 72 : 84) * worldPerPixelY;

  return {
    maxX: halfWidth - visualExtents.halfWidth,
    maxY: halfHeight - headerChromeClearance - visualExtents.top,
    minX: -halfWidth + visualExtents.halfWidth,
    minY: -halfHeight + footerChromeClearance + visualExtents.bottom,
  };
}

function getSafeCoordinate(
  minValue: number,
  maxValue: number,
  progress: number,
) {
  if (minValue > maxValue) {
    return (minValue + maxValue) / 2;
  }

  return MathUtils.lerp(minValue, maxValue, progress);
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
    getSafeCoordinate(bounds.minX, bounds.maxX, xProgress),
    getSafeCoordinate(bounds.minY, bounds.maxY, yProgress),
    objectZ,
  );
}

function createRandomInitialSatellitePosition(
  existingPositions: readonly MobileSatelliteInitialPosition[],
): MobileSatelliteInitialPosition {
  let candidate = {
    xRatio: MathUtils.randFloat(
      -mobileSatelliteInitialXLimit,
      mobileSatelliteInitialXLimit,
    ),
    yRatio: MathUtils.randFloat(
      -mobileSatelliteInitialYLimit,
      mobileSatelliteInitialYLimit,
    ),
  };

  for (let attempt = 0; attempt < 18; attempt += 1) {
    const hasEnoughSpace = existingPositions.every((position) => {
      const deltaX = candidate.xRatio - position.xRatio;
      const deltaY = candidate.yRatio - position.yRatio;

      return Math.hypot(deltaX, deltaY) >= mobileSatelliteInitialSpacing;
    });

    if (hasEnoughSpace) {
      return candidate;
    }

    candidate = {
      xRatio: MathUtils.randFloat(
        -mobileSatelliteInitialXLimit,
        mobileSatelliteInitialXLimit,
      ),
      yRatio: MathUtils.randFloat(
        -mobileSatelliteInitialYLimit,
        mobileSatelliteInitialYLimit,
      ),
    };
  }

  return candidate;
}

function createMobileSatelliteMotionState(
  initialPosition: MobileSatelliteInitialPosition,
): MobileSatelliteMotionState {
  const motionAngle = Math.random() * Math.PI * 2;
  const speed =
    mobileSatelliteBaseSpeed +
    (Math.random() - 0.5) * mobileSatelliteSpeedVariance;

  return {
    collisionPhase: Math.random() * Math.PI * 2,
    depthPhase: Math.random() * Math.PI * 2,
    depthSpeed:
      mobileSatelliteDepthSpeedMin +
      Math.random() * mobileSatelliteDepthSpeedVariance,
    speed,
    turnPhase: Math.random() * Math.PI * 2,
    turnSpeed: 0.26 + Math.random() * 0.22,
    velocityX: Math.cos(motionAngle) * speed,
    velocityY: Math.sin(motionAngle) * speed,
    xRatio: initialPosition.xRatio,
    yRatio: initialPosition.yRatio,
  };
}

function createMobileSatelliteMotionStates(satelliteCount: number) {
  const initialPositions: MobileSatelliteInitialPosition[] = [];

  return Array.from({ length: satelliteCount }, () => {
    const initialPosition =
      createRandomInitialSatellitePosition(initialPositions);

    initialPositions.push(initialPosition);
    return createMobileSatelliteMotionState(initialPosition);
  });
}

function getMobileSatelliteDepthValue(
  motionState: MobileSatelliteMotionState,
  elapsedTime: number,
) {
  return MathUtils.clamp(
    mobileSatelliteDepthBase +
      Math.sin(elapsedTime * motionState.depthSpeed + motionState.depthPhase) *
        mobileSatelliteDepthAmplitude,
    -0.58,
    0.72,
  );
}

function getMobileSatellitePlacement({
  elapsedTime,
  motionState,
  satelliteScale,
  viewportHeight,
  viewportWidth,
}: {
  elapsedTime: number;
  motionState: MobileSatelliteMotionState;
  satelliteScale: number;
  viewportHeight: number;
  viewportWidth: number;
}): MobileSatellitePlacement {
  const depthValue = getMobileSatelliteDepthValue(motionState, elapsedTime);
  const point = getMobilePointFromViewportRatio({
    satelliteScale,
    viewportHeight,
    viewportWidth,
    xRatio: motionState.xRatio,
    yRatio: motionState.yRatio,
    zRatio: depthValue,
  });
  const position = [point.x, point.y, point.z] satisfies ScenePosition;

  return { depthValue, position };
}

function ensureMotionStates({
  motionStates,
  satelliteCount,
}: {
  motionStates: MobileSatelliteMotionState[];
  satelliteCount: number;
}) {
  while (motionStates.length < satelliteCount) {
    const initialPosition = createRandomInitialSatellitePosition(motionStates);

    motionStates.push(createMobileSatelliteMotionState(initialPosition));
  }

  motionStates.length = satelliteCount;
}

function setVelocityFromDirection(
  motionState: MobileSatelliteMotionState,
  directionX: number,
  directionY: number,
) {
  const directionLength = Math.hypot(directionX, directionY);

  if (directionLength <= 0.0001) {
    return;
  }

  motionState.velocityX = (directionX / directionLength) * motionState.speed;
  motionState.velocityY = (directionY / directionLength) * motionState.speed;
}

function bounceMobileSatelliteFromBounds(
  motionState: MobileSatelliteMotionState,
) {
  if (motionState.xRatio <= -1) {
    motionState.xRatio = -1;
    motionState.velocityX = Math.abs(motionState.velocityX);
  } else if (motionState.xRatio >= 1) {
    motionState.xRatio = 1;
    motionState.velocityX = -Math.abs(motionState.velocityX);
  }

  if (motionState.yRatio <= -1) {
    motionState.yRatio = -1;
    motionState.velocityY = Math.abs(motionState.velocityY);
  } else if (motionState.yRatio >= 1) {
    motionState.yRatio = 1;
    motionState.velocityY = -Math.abs(motionState.velocityY);
  }
}

function advanceMotionStates({
  delta,
  elapsedTime,
  motionStates,
}: {
  delta: number;
  elapsedTime: number;
  motionStates: MobileSatelliteMotionState[];
}) {
  const stableDelta = Math.min(delta, mobileSatelliteMaxFrameDelta);

  motionStates.forEach((motionState) => {
    const turnAmount =
      Math.sin(elapsedTime * motionState.turnSpeed + motionState.turnPhase) *
      mobileSatelliteNaturalTurnStrength *
      stableDelta;
    const nextVelocityX =
      motionState.velocityX * Math.cos(turnAmount) -
      motionState.velocityY * Math.sin(turnAmount);
    const nextVelocityY =
      motionState.velocityX * Math.sin(turnAmount) +
      motionState.velocityY * Math.cos(turnAmount);

    setVelocityFromDirection(motionState, nextVelocityX, nextVelocityY);
    motionState.xRatio += motionState.velocityX * stableDelta;
    motionState.yRatio += motionState.velocityY * stableDelta;
    bounceMobileSatelliteFromBounds(motionState);
  });
}

function getMobileSatellitePlacements({
  elapsedTime,
  motionStates,
  satelliteScale,
  viewportHeight,
  viewportWidth,
}: {
  elapsedTime: number;
  motionStates: MobileSatelliteMotionState[];
  satelliteScale: number;
  viewportHeight: number;
  viewportWidth: number;
}) {
  return motionStates.map((motionState) =>
    getMobileSatellitePlacement({
      elapsedTime,
      motionState,
      satelliteScale,
      viewportHeight,
      viewportWidth,
    }),
  );
}

function getMobileSatelliteVisualBounds({
  placement,
  satelliteScale,
  viewportHeight,
  viewportWidth,
}: {
  placement: MobileSatellitePlacement;
  satelliteScale: number;
  viewportHeight: number;
  viewportWidth: number;
}): MobileSatelliteVisualBounds {
  const visualScale =
    satelliteScale * getSatelliteDepthScale(placement.depthValue);
  const visualExtents = getMobileSatelliteVisualExtents({
    satelliteScale: visualScale,
    viewportHeight,
    viewportWidth,
  });
  const [positionX, positionY] = placement.position;

  return {
    maxX: positionX + visualExtents.halfWidth,
    maxY: positionY + visualExtents.top,
    minX: positionX - visualExtents.halfWidth,
    minY: positionY - visualExtents.bottom,
  };
}

function applyMobileSatelliteCollisionImpulse({
  impulse,
  motionState,
}: {
  impulse: MobileSatelliteCollisionImpulse;
  motionState: MobileSatelliteMotionState;
}) {
  if (impulse.count === 0) {
    return;
  }

  const impulseLength = Math.hypot(impulse.x, impulse.y);
  const fallbackAngle =
    impulse.count > 1
      ? motionState.collisionPhase
      : Math.atan2(motionState.velocityY, motionState.velocityX);
  const awayX =
    impulseLength > 0.0001
      ? impulse.x / impulseLength
      : Math.cos(fallbackAngle);
  const awayY =
    impulseLength > 0.0001
      ? impulse.y / impulseLength
      : Math.sin(fallbackAngle);
  const tangentX = -awayY;
  const tangentY = awayX;
  const currentTangent =
    motionState.velocityX * tangentX + motionState.velocityY * tangentY;
  const tangentDirection = currentTangent >= 0 ? 1 : -1;
  const baseTangentBias =
    impulse.count > 1
      ? mobileSatelliteCollisionTangentBias * 0.45
      : mobileSatelliteCollisionTangentBias;
  const tangentBias =
    tangentDirection *
    (baseTangentBias +
      (Math.random() - 0.5) * mobileSatelliteCollisionRandomness);

  setVelocityFromDirection(
    motionState,
    awayX + tangentX * tangentBias,
    awayY + tangentY * tangentBias,
  );
}

function resolveMobileSatelliteCollisions({
  motionStates,
  placements,
  satelliteScale,
  viewportHeight,
  viewportWidth,
}: {
  motionStates: MobileSatelliteMotionState[];
  placements: MobileSatellitePlacement[];
  satelliteScale: number;
  viewportHeight: number;
  viewportWidth: number;
}) {
  const impulses = motionStates.map(
    () => ({ count: 0, x: 0, y: 0 }) satisfies MobileSatelliteCollisionImpulse,
  );

  for (let index = 0; index < placements.length; index += 1) {
    for (
      let nextIndex = index + 1;
      nextIndex < placements.length;
      nextIndex += 1
    ) {
      const currentPlacement = placements[index];
      const nextPlacement = placements[nextIndex];
      const currentState = motionStates[index];
      const nextState = motionStates[nextIndex];
      const currentImpulse = impulses[index];
      const nextImpulse = impulses[nextIndex];
      const currentVisualBounds = currentPlacement
        ? getMobileSatelliteVisualBounds({
            placement: currentPlacement,
            satelliteScale,
            viewportHeight,
            viewportWidth,
          })
        : null;
      const nextVisualBounds = nextPlacement
        ? getMobileSatelliteVisualBounds({
            placement: nextPlacement,
            satelliteScale,
            viewportHeight,
            viewportWidth,
          })
        : null;

      if (
        !currentPlacement ||
        !nextPlacement ||
        !currentState ||
        !nextState ||
        !currentImpulse ||
        !nextImpulse ||
        !currentVisualBounds ||
        !nextVisualBounds
      ) {
        continue;
      }

      const overlapX =
        Math.min(currentVisualBounds.maxX, nextVisualBounds.maxX) -
        Math.max(currentVisualBounds.minX, nextVisualBounds.minX);
      const overlapY =
        Math.min(currentVisualBounds.maxY, nextVisualBounds.maxY) -
        Math.max(currentVisualBounds.minY, nextVisualBounds.minY);

      if (overlapX <= 0 || overlapY <= 0) {
        continue;
      }

      const ratioDeltaX = nextState.xRatio - currentState.xRatio;
      const ratioDeltaY = nextState.yRatio - currentState.yRatio;
      const ratioDistance = Math.hypot(ratioDeltaX, ratioDeltaY);
      const fallbackAngle = (index + 1) * (nextIndex + 2) * 0.73;
      const normalX =
        ratioDistance > 0.0001
          ? ratioDeltaX / ratioDistance
          : Math.cos(fallbackAngle);
      const normalY =
        ratioDistance > 0.0001
          ? ratioDeltaY / ratioDistance
          : Math.sin(fallbackAngle);
      const overlap = Math.min(overlapX, overlapY);

      currentImpulse.x -= normalX * overlap;
      currentImpulse.y -= normalY * overlap;
      currentImpulse.count += 1;
      nextImpulse.x += normalX * overlap;
      nextImpulse.y += normalY * overlap;
      nextImpulse.count += 1;
    }
  }

  motionStates.forEach((motionState, index) => {
    const impulse = impulses[index];

    if (!impulse) {
      return;
    }

    applyMobileSatelliteCollisionImpulse({ impulse, motionState });
    bounceMobileSatelliteFromBounds(motionState);
  });
}

export function MobileFloatingHexagons() {
  const { height, width } = useThree((state) => state.size);
  const startColor = useMemo(() => new Color(sceneStartColorHex), []);
  const endColor = useMemo(() => new Color(sceneEndColorHex), []);
  const currentColor = useMemo(() => startColor.clone(), [startColor]);
  const initialMotionStates = useMemo(
    () => createMobileSatelliteMotionStates(satelliteNavigationItems.length),
    [],
  );
  const [color, setColor] = useState(() =>
    getScenePulseColor({
      elapsedTime: getSceneColorElapsedTime(),
      endColor,
      startColor,
      targetColor: startColor.clone(),
    }),
  );
  const lastColorStateUpdateRef = useRef(0);
  const motionStatesRef =
    useRef<MobileSatelliteMotionState[]>(initialMotionStates);
  const satelliteRefs = useRef<(Group | null)[]>([]);
  const satelliteScale = getMobileSatelliteScale(width, height);
  const labelFontSize = getMobileLabelFontSize(width, height);
  const labelMaxWidth = mobileSatelliteLabelMaxWidth;
  const labelOffsetY = getMobileLabelOffsetY(width, height);
  const initialSatellitePlacements = useMemo(
    () =>
      initialMotionStates.map((motionState) =>
        getMobileSatellitePlacement({
          elapsedTime: 0,
          motionState,
          satelliteScale,
          viewportHeight: height,
          viewportWidth: width,
        }),
      ),
    [height, initialMotionStates, satelliteScale, width],
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
      satelliteCount: satelliteNavigationItems.length,
    });
    advanceMotionStates({
      delta,
      elapsedTime,
      motionStates: motionStatesRef.current,
    });
    let placements = getMobileSatellitePlacements({
      elapsedTime,
      motionStates: motionStatesRef.current,
      satelliteScale,
      viewportHeight: height,
      viewportWidth: width,
    });

    resolveMobileSatelliteCollisions({
      motionStates: motionStatesRef.current,
      placements,
      satelliteScale,
      viewportHeight: height,
      viewportWidth: width,
    });
    placements = getMobileSatellitePlacements({
      elapsedTime,
      motionStates: motionStatesRef.current,
      satelliteScale,
      viewportHeight: height,
      viewportWidth: width,
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
      {satelliteNavigationItems.map((item, index) => (
        <OrbitingSatellite
          key={item.id}
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
            getMobileSatellitePlacement({
              elapsedTime: 0,
              motionState:
                initialMotionStates[index] ??
                createMobileSatelliteMotionState(
                  createRandomInitialSatellitePosition(initialMotionStates),
                ),
              satelliteScale,
              viewportHeight: height,
              viewportWidth: width,
            }).position
          }
          tileScale={satelliteScale}
        />
      ))}
    </>
  );
}
