import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Color,
  EdgesGeometry,
  ExtrudeGeometry,
  LineBasicMaterial,
  MeshBasicMaterial,
  MathUtils,
  MeshPhongMaterial,
  Quaternion,
  Shape,
  SphereGeometry,
  Vector3,
  type Camera,
  type Group,
  type Object3D,
} from "three";

import { OrbitingSatellite } from "./OrbitingSatellite";
import {
  generateHexSphereTiles,
  selectSatelliteTiles,
  type HexTile,
  type ScenePosition,
} from "./sceneUtils";
import {
  desktopSatelliteZOffset,
  getHexSphereLayout,
  getHexSphereOrbitRadii,
  getSafeSceneViewportSize,
  hexSphereRadius,
  type SceneViewportSize,
} from "./hexSphereLayout";
import {
  getSceneColorElapsedTime,
  getScenePulseColor,
  sceneEndColorHex,
  sceneStartColorHex,
} from "./sceneColor";

const sphereRotationSpeed = 0.0003;
const satelliteOrbitSpeed = 0.03;
const sphereBaseSpinAxis = new Vector3(0, 1, 1).normalize();
const sphereBaseSpinSpeed = Math.hypot(
  sphereRotationSpeed,
  sphereRotationSpeed,
);
const sphereInteractionClickDuration = 260;
const sphereInteractionDragDistance = 6;
const sphereInteractionDragRotationSensitivity = 4.85;
const sphereInteractionMaxFrameRotation = 0.16;
const sphereInteractionMaxSpinSpeed = 0.08;
const sphereInteractionMinPointerBasis = 320;
const sphereInteractionPulseDuration = 1.2;
const sphereInteractionPulseIntensity = 0.82;
const sphereInteractionPulseSpeed = 2.65;
const sphereInteractionPulseWidth = 0.42;
const sphereInteractionSpinReturn = 0.018;
const sphereColliderUserDataKey = "sphereCollider";
const sphereTileIndexUserDataKey = "sphereTileIndex";
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
const tempCameraRight = new Vector3();
const tempCameraUp = new Vector3();
const tempDragAxis = new Vector3();
const tempDragQuaternion = new Quaternion();
const tempPulseLocalNormal = new Vector3();
const tempSpinQuaternion = new Quaternion();
const identityQuaternion = new Quaternion();

interface SphereInteractionState {
  activePointerId: number | null;
  dragDistance: number;
  dragStartedAt: number;
  isDragging: boolean;
  isPointerOver: boolean;
  lastPointerTime: number;
  lastPointerX: number;
  lastPointerY: number;
  pendingPulse: boolean;
  pulseOriginTileIndex: number | null;
  pulsePosition: Vector3;
  pulseStartedAt: number;
  spinAxis: Vector3;
  spinSpeed: number;
}

interface PointerCaptureTarget extends EventTarget {
  hasPointerCapture?: (pointerId: number) => boolean;
  releasePointerCapture?: (pointerId: number) => void;
  setPointerCapture?: (pointerId: number) => void;
}

interface SphereHit {
  localPoint: Vector3;
  tileIndex: number | null;
}

function setPointerCursor(cursor: "auto" | "grab" | "grabbing") {
  if (typeof document === "undefined") {
    return;
  }

  document.body.style.cursor = cursor;
}

function getInteractionNow() {
  return typeof performance === "undefined" ? Date.now() : performance.now();
}

function isObjectDescendantOf(object: Object3D, parent: Object3D) {
  let current: Object3D | null = object;

  while (current) {
    if (current === parent) {
      return true;
    }

    current = current.parent;
  }

  return false;
}

function getSphereTileIndex(object: Object3D) {
  let current: Object3D | null = object;

  while (current) {
    const userData = current.userData as Record<string, unknown>;
    const tileIndex = userData[sphereTileIndexUserDataKey];

    if (typeof tileIndex === "number") {
      return tileIndex;
    }

    current = current.parent;
  }

  return null;
}

function isSphereCollider(object: Object3D) {
  let current: Object3D | null = object;

  while (current) {
    const userData = current.userData as Record<string, unknown>;

    if (userData[sphereColliderUserDataKey] === true) {
      return true;
    }

    current = current.parent;
  }

  return false;
}

function isTileInForeground(tile: HexTile, sphereGroup: Group, camera: Camera) {
  tempNormal.copy(tile.normal).applyQuaternion(sphereGroup.quaternion);
  tempPosition
    .copy(tile.position)
    .applyQuaternion(sphereGroup.quaternion)
    .add(sphereGroup.position);
  tempToCamera.copy(camera.position).sub(tempPosition).normalize();

  return tempNormal.dot(tempToCamera) > 0;
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
  const [windowSize, setWindowSize] = useState<SceneViewportSize>(() =>
    typeof window === "undefined"
      ? { height: 900, width: 1280 }
      : getSafeSceneViewportSize({
          height: window.innerHeight,
          width: window.innerWidth,
        }),
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(
        getSafeSceneViewportSize({
          height: window.innerHeight,
          width: window.innerWidth,
        }),
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
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
  windowSize: SceneViewportSize;
}): ScenePosition {
  const angle =
    ((2 * Math.PI) / satelliteCount) * index +
    elapsedTime * satelliteOrbitSpeed;
  const orbitRadii = getHexSphereOrbitRadii({
    groupPosition,
    labelFontSize,
    labelMaxWidth,
    labelOffsetY,
    sphereScale,
    tileScale,
    viewportSize: windowSize,
  });

  return [
    groupPosition[0] + Math.cos(angle) * orbitRadii.x,
    groupPosition[1] + Math.sin(angle) * orbitRadii.y,
    groupPosition[2] + desktopSatelliteZOffset,
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
  const sphereColliderGeometry = useMemo(
    () => new SphereGeometry(hexSphereRadius + tileStyle.depth, 48, 24),
    [],
  );
  const sphereColliderMaterial = useMemo(() => {
    const material = new MeshBasicMaterial({
      depthWrite: false,
      opacity: 0,
      transparent: true,
    });

    material.visible = false;
    return material;
  }, []);
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
  const tiles = useMemo(() => generateHexSphereTiles(425, hexSphereRadius), []);
  const satelliteRefs = useRef<(Group | null)[]>([]);
  const interactionRef = useRef<SphereInteractionState>({
    activePointerId: null,
    dragDistance: 0,
    dragStartedAt: 0,
    isDragging: false,
    isPointerOver: false,
    lastPointerTime: 0,
    lastPointerX: 0,
    lastPointerY: 0,
    pendingPulse: false,
    pulseOriginTileIndex: null,
    pulsePosition: new Vector3(),
    pulseStartedAt: Number.NEGATIVE_INFINITY,
    spinAxis: sphereBaseSpinAxis.clone(),
    spinSpeed: sphereBaseSpinSpeed,
  });
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
  const sphereLayout = useMemo(
    () => getHexSphereLayout(windowSize),
    [windowSize],
  );
  const { groupPosition, labelFontSize, labelMaxWidth, labelOffsetY } =
    sphereLayout;
  const { satelliteScale, sphereScale } = sphereLayout;
  const sphereTileScale = 1;
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
      setPointerCursor("auto");
      hexGeometry.dispose();
      hexEdgesGeometry.dispose();
      sphereColliderGeometry.dispose();
      sphereColliderMaterial.dispose();
      hexEdgeMaterial.dispose();
      tileMaterials.forEach((material) => {
        material.dispose();
      });
    },
    [
      hexEdgeMaterial,
      hexEdgesGeometry,
      hexGeometry,
      sphereColliderGeometry,
      sphereColliderMaterial,
      tileMaterials,
    ],
  );

  const getNearestTileIndex = useCallback(
    (localPoint: Vector3, sphereGroup: Group, camera: Camera) => {
      tempPulseLocalNormal.copy(localPoint).normalize();

      let closestTileIndex: number | null = null;
      let closestTileScore = Number.NEGATIVE_INFINITY;

      tiles.forEach((tile, index) => {
        if (!isTileInForeground(tile, sphereGroup, camera)) {
          return;
        }

        const tileScore = tile.normal.dot(tempPulseLocalNormal);

        if (tileScore > closestTileScore) {
          closestTileIndex = index;
          closestTileScore = tileScore;
        }
      });

      return closestTileIndex;
    },
    [tiles],
  );

  const getSphereHit = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      const sphereGroup = sphereGroupRef.current;
      let directTileHit: SphereHit | null = null;
      let colliderPoint: Vector3 | null = null;

      if (!sphereGroup) {
        return null;
      }

      for (const intersection of event.intersections) {
        if (!isObjectDescendantOf(intersection.object, sphereGroup)) {
          continue;
        }

        const localPoint = intersection.point.clone();

        sphereGroup.worldToLocal(localPoint);

        const tileIndex = getSphereTileIndex(intersection.object);
        const tile =
          tileIndex === null || tileIndex < 0 || tileIndex >= tiles.length
            ? null
            : tiles[tileIndex];

        if (
          tileIndex !== null &&
          tile &&
          intersection.object.type === "Mesh" &&
          isTileInForeground(tile, sphereGroup, event.camera)
        ) {
          directTileHit = {
            localPoint,
            tileIndex,
          };
          break;
        }

        if (!colliderPoint && isSphereCollider(intersection.object)) {
          colliderPoint = localPoint;
        }
      }

      if (directTileHit) {
        return directTileHit;
      }

      if (colliderPoint) {
        return {
          localPoint: colliderPoint,
          tileIndex: getNearestTileIndex(
            colliderPoint,
            sphereGroup,
            event.camera,
          ),
        } satisfies SphereHit;
      }

      return null;
    },
    [getNearestTileIndex, tiles],
  );

  const setPulseOriginFromHit = useCallback(
    ({ localPoint, tileIndex }: SphereHit) => {
      const interaction = interactionRef.current;
      const originTile =
        tileIndex === null || tileIndex < 0 || tileIndex >= tiles.length
          ? null
          : tiles[tileIndex];

      interaction.pulseOriginTileIndex = tileIndex;
      interaction.pulsePosition.copy(originTile?.position ?? localPoint);
    },
    [tiles],
  );

  const releasePointerCapture = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      const target = event.target as PointerCaptureTarget;

      if (
        target.releasePointerCapture &&
        (!target.hasPointerCapture || target.hasPointerCapture(event.pointerId))
      ) {
        target.releasePointerCapture(event.pointerId);
      }
    },
    [],
  );

  const finishSphereDrag = useCallback(
    (
      event: ThreeEvent<PointerEvent>,
      { allowPulse }: { allowPulse: boolean },
    ) => {
      const interaction = interactionRef.current;

      if (!interaction.isDragging) {
        return;
      }

      const dragDuration = getInteractionNow() - interaction.dragStartedAt;
      const isSimpleClick =
        allowPulse &&
        interaction.dragDistance < sphereInteractionDragDistance &&
        dragDuration <= sphereInteractionClickDuration;

      if (isSimpleClick) {
        interaction.pendingPulse = true;
      }

      interaction.activePointerId = null;
      interaction.dragDistance = 0;
      interaction.isDragging = false;

      releasePointerCapture(event);
      setPointerCursor(interaction.isPointerOver ? "grab" : "auto");
      event.stopPropagation();
    },
    [releasePointerCapture],
  );

  const handleSpherePointerOver = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      const interaction = interactionRef.current;

      if (getSphereHit(event)) {
        interaction.isPointerOver = true;
        setPointerCursor("grab");
      }
    },
    [getSphereHit],
  );

  const handleSpherePointerOut = useCallback(() => {
    const interaction = interactionRef.current;

    interaction.isPointerOver = false;

    if (!interaction.isDragging) {
      setPointerCursor("auto");
    }
  }, []);

  const handleSpherePointerDown = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      const sphereHit = getSphereHit(event);

      if (!sphereHit) {
        return;
      }

      const interaction = interactionRef.current;
      const target = event.target as PointerCaptureTarget;

      interaction.activePointerId = event.pointerId;
      interaction.dragDistance = 0;
      interaction.dragStartedAt = getInteractionNow();
      interaction.isDragging = true;
      interaction.isPointerOver = true;
      interaction.lastPointerTime = interaction.dragStartedAt;
      interaction.lastPointerX = event.clientX;
      interaction.lastPointerY = event.clientY;
      interaction.pendingPulse = false;
      setPulseOriginFromHit(sphereHit);

      target.setPointerCapture?.(event.pointerId);
      event.stopPropagation();
      setPointerCursor("grabbing");
    },
    [getSphereHit, setPulseOriginFromHit],
  );

  const handleSpherePointerMove = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      const sphereGroup = sphereGroupRef.current;
      const interaction = interactionRef.current;

      if (
        !sphereGroup ||
        !interaction.isDragging ||
        interaction.activePointerId !== event.pointerId
      ) {
        return;
      }

      const pointerTime = getInteractionNow();
      const deltaX = event.clientX - interaction.lastPointerX;
      const deltaY = event.clientY - interaction.lastPointerY;

      interaction.lastPointerX = event.clientX;
      interaction.lastPointerY = event.clientY;

      if (deltaX === 0 && deltaY === 0) {
        event.stopPropagation();
        return;
      }

      interaction.dragDistance += Math.hypot(deltaX, deltaY);

      const pointerBasis = Math.max(
        sphereInteractionMinPointerBasis,
        Math.min(windowSize.width, windowSize.height),
      );
      const dragDistance = Math.hypot(deltaX, deltaY);
      const rotationAngle = Math.min(
        (dragDistance / pointerBasis) *
          sphereInteractionDragRotationSensitivity,
        sphereInteractionMaxFrameRotation,
      );

      tempCameraRight
        .set(1, 0, 0)
        .applyQuaternion(event.camera.quaternion)
        .normalize();
      tempCameraUp
        .set(0, 1, 0)
        .applyQuaternion(event.camera.quaternion)
        .normalize();
      tempDragAxis
        .copy(tempCameraRight)
        .multiplyScalar(deltaY)
        .addScaledVector(tempCameraUp, deltaX);

      if (tempDragAxis.lengthSq() === 0) {
        event.stopPropagation();
        return;
      }

      tempDragAxis.normalize();
      tempDragQuaternion.setFromAxisAngle(tempDragAxis, rotationAngle);
      sphereGroup.quaternion.premultiply(tempDragQuaternion);

      const pointerDeltaTime = Math.max(
        (pointerTime - interaction.lastPointerTime) / 1000,
        1 / 120,
      );
      const spinSpeed = rotationAngle / (pointerDeltaTime * 60);

      interaction.lastPointerTime = pointerTime;
      interaction.spinAxis.copy(tempDragAxis);
      interaction.spinSpeed = MathUtils.clamp(
        spinSpeed,
        sphereBaseSpinSpeed,
        sphereInteractionMaxSpinSpeed,
      );

      event.stopPropagation();
    },
    [windowSize],
  );

  const handleSpherePointerUp = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      finishSphereDrag(event, { allowPulse: true });
    },
    [finishSphereDrag],
  );

  const handleSpherePointerCancel = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      finishSphereDrag(event, { allowPulse: false });
    },
    [finishSphereDrag],
  );

  useFrame(({ camera, clock }, delta) => {
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
    const interaction = interactionRef.current;

    if (interaction.pendingPulse) {
      interaction.pulseStartedAt = elapsedTime;
      interaction.pendingPulse = false;
    }

    const frameFactor = MathUtils.clamp(delta * 60, 0.5, 1.8);

    if (!interaction.isDragging) {
      const spinAngle = interaction.spinSpeed * frameFactor;

      tempSpinQuaternion.setFromAxisAngle(interaction.spinAxis, spinAngle);
      sphereGroup.quaternion.premultiply(tempSpinQuaternion);

      const spinReturnFactor =
        1 - Math.pow(1 - sphereInteractionSpinReturn, frameFactor);

      interaction.spinSpeed = MathUtils.lerp(
        interaction.spinSpeed,
        sphereBaseSpinSpeed,
        spinReturnFactor,
      );
    }

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
      const pulseDistance = tile.position.distanceTo(interaction.pulsePosition);
      const pulseAge = elapsedTime - interaction.pulseStartedAt;
      const pulseGlow =
        pulseAge >= 0 && pulseAge <= sphereInteractionPulseDuration
          ? (1 -
              MathUtils.smoothstep(
                Math.abs(
                  pulseDistance - pulseAge * sphereInteractionPulseSpeed,
                ),
                0.02,
                sphereInteractionPulseWidth,
              )) *
            (1 - pulseAge / sphereInteractionPulseDuration)
          : 0;
      const originGlow =
        interaction.pulseOriginTileIndex === index &&
        pulseAge >= 0 &&
        pulseAge <= sphereInteractionPulseDuration
          ? 1 - pulseAge / sphereInteractionPulseDuration
          : 0;
      const interactionGlow =
        Math.max(pulseGlow, originGlow) * sphereInteractionPulseIntensity;
      const boostedOpacity = MathUtils.clamp(
        targetOpacity + interactionGlow * 0.28,
        tileStyle.minOpacity,
        1,
      );
      const boostedEmissiveIntensity =
        tileStyle.maxEmissiveIntensity * foregroundGlow + interactionGlow * 0.7;

      material.color.copy(updatedColor);
      material.emissive.copy(updatedColor);
      material.emissiveIntensity = MathUtils.lerp(
        material.emissiveIntensity,
        boostedEmissiveIntensity,
        0.1,
      );
      material.opacity = MathUtils.lerp(material.opacity, boostedOpacity, 0.1);
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
      <group
        ref={sphereGroupRef}
        onLostPointerCapture={handleSpherePointerCancel}
        onPointerCancel={handleSpherePointerCancel}
        onPointerDown={handleSpherePointerDown}
        onPointerMove={handleSpherePointerMove}
        onPointerOut={handleSpherePointerOut}
        onPointerOver={handleSpherePointerOver}
        onPointerUp={handleSpherePointerUp}
        position={groupPosition}
        scale={sphereScale}
      >
        <mesh
          geometry={sphereColliderGeometry}
          material={sphereColliderMaterial}
          userData={{ [sphereColliderUserDataKey]: true }}
        />
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
              userData={{ [sphereTileIndexUserDataKey]: index }}
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
