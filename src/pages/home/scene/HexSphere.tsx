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
