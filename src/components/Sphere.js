import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Color,
  EdgesGeometry,
  ExtrudeGeometry,
  LineBasicMaterial,
  Matrix4,
  MeshPhongMaterial,
  Quaternion,
  Shape,
  Vector3,
} from "three";

import OrbitingSatellite from "./OrbitingSatellite";
import { easeInOutCubic } from "../utils/utils";

const SATELLITE_REVEAL_PROGRESS = 0.18;
const HEX_TILE_STYLE = Object.freeze({
  depth: 0.1,
  radius: 0.15,
  baseOpacity: 1,
  edgeOpacity: 1,
});
const HEX_LAYOUT = Object.freeze({
  tileCount: 600,
});
const VECTOR_UP = new Vector3(0, 1, 0);
const VECTOR_RIGHT = new Vector3(1, 0, 0);

const clampProgress = (value) => {
  if (!Number.isFinite(value)) {
    return 0;
  }
  if (value >= 0.995) {
    return 1;
  }
  if (value <= 0.005) {
    return 0;
  }
  return value;
};

const createHexGeometry = () => {
  const shape = new Shape();
  const sides = 6;
  const radius = HEX_TILE_STYLE.radius;

  shape.moveTo(radius, 0);
  for (let i = 1; i <= sides; i += 1) {
    const theta = (i / sides) * Math.PI * 2;
    shape.lineTo(radius * Math.cos(theta), radius * Math.sin(theta));
  }

  const geometry = new ExtrudeGeometry(shape, {
    depth: HEX_TILE_STYLE.depth,
    bevelEnabled: false,
  });
  geometry.center();
  return geometry;
};

const createOrientation = (normal) => {
  const reference =
    Math.abs(normal.dot(VECTOR_UP)) > 0.9 ? VECTOR_RIGHT : VECTOR_UP;
  const tangent = reference.clone().cross(normal).normalize();
  const bitangent = normal.clone().cross(tangent).normalize();
  const orientationMatrix = new Matrix4().makeBasis(tangent, bitangent, normal);
  return new Quaternion().setFromRotationMatrix(orientationMatrix);
};

const generateHexSphereTiles = (count, radius) => {
  const tiles = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i += 1) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * increment;
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;

    const normal = new Vector3(x, y, z).normalize();

    tiles.push({
      position: normal.clone().multiplyScalar(radius),
      quaternion: createOrientation(normal),
      normal,
    });
  }

  return tiles;
};

const selectSatelliteTiles = (tiles, count) => {
  if (tiles.length <= count) {
    return tiles.map((_, index) => index);
  }

  const result = [];
  const step = Math.floor(tiles.length / count);

  for (let i = 0; i < tiles.length && result.length < count; i += step) {
    result.push(i);
  }

  let fallbackIndex = tiles.length - 1;
  while (result.length < count && fallbackIndex >= 0) {
    if (!result.includes(fallbackIndex)) {
      result.push(fallbackIndex);
    }
    fallbackIndex -= 1;
  }

  return result;
};

const SphereCustom = ({ scroll, offsetOverride }) => {
  const sphereRadius = 2.0;
  const groupRef = useRef();

  const startColor = useMemo(() => new Color("#47CDD6"), []);
  const endColor = useMemo(() => new Color("#9D4DC4"), []);

  const hexGeometry = useMemo(() => createHexGeometry(), []);
  const hexEdgesGeometry = useMemo(
    () => new EdgesGeometry(hexGeometry),
    [hexGeometry]
  );
  const hexMaterialRef = useRef(
    new MeshPhongMaterial({
      color: startColor.clone(),
      transparent: true,
      opacity: HEX_TILE_STYLE.baseOpacity,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    })
  );
  const hexEdgeMaterialRef = useRef(
    new LineBasicMaterial({
      color: startColor.clone(),
      transparent: HEX_TILE_STYLE.edgeOpacity < 1,
      opacity: HEX_TILE_STYLE.edgeOpacity,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    })
  );

  const tiles = useMemo(
    () => generateHexSphereTiles(HEX_LAYOUT.tileCount, sphereRadius),
    [sphereRadius]
  );

  const satelliteIndices = useMemo(
    () => selectSatelliteTiles(tiles, 6),
    [tiles]
  );
  const satelliteIndexSet = useMemo(
    () => new Set(satelliteIndices),
    [satelliteIndices]
  );

  const initialGroupPosition = useMemo(() => new Vector3(1.5, -1, 7), []);

  const [color, setColor] = useState(() => startColor.clone());
  const [satellitePositions, setSatellitePositions] = useState(() =>
    satelliteIndices.map((index) =>
      tiles[index].position.clone().add(initialGroupPosition).toArray()
    )
  );
  const [detachProgressState, setDetachProgressState] = useState(0);
  const tileScale = 0.9;

  useEffect(() => {
    hexMaterialRef.current.color.copy(color);
    hexEdgeMaterialRef.current.color.copy(color);
  }, [color]);

  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getColorAtTime = (elapsedTime) => {
    const proportion = Math.abs(Math.sin(elapsedTime * 0.1));
    return new Color().copy(startColor).lerp(endColor, proportion);
  };

  const holeRevealThreshold = SATELLITE_REVEAL_PROGRESS;

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const baseOffset =
      typeof offsetOverride === "number" ? offsetOverride : scroll.offset;
    const normalizedOffset = clampProgress(baseOffset);
    const elapsedTime = clock.getElapsedTime();

    group.rotation.y += 0.0003;
    group.rotation.z += 0.0003;

    const updatedColor = getColorAtTime(elapsedTime);
    setColor(updatedColor);

    const startPosition = [
      initialGroupPosition.x,
      initialGroupPosition.y,
      initialGroupPosition.z,
    ];
    let endPosition = [0, 0.1, 2.5];

    const windowMappings = [
      { limit: 400, value: [0, 0.1, -5.5] },
      { limit: 600, value: [0, 0.1, -3.5] },
      { limit: 1000, value: [0, 0.1, 0.5] },
    ];

    for (const mapping of windowMappings) {
      if (windowWidth <= mapping.limit) {
        endPosition = mapping.value;
        break;
      }
    }

    group.position.x =
      startPosition[0] + normalizedOffset * (endPosition[0] - startPosition[0]);
    group.position.y =
      startPosition[1] + normalizedOffset * (endPosition[1] - startPosition[1]);
    group.position.z =
      startPosition[2] + normalizedOffset * (endPosition[2] - startPosition[2]);

    const detachStart = 0.12;
    const detachProgress =
      normalizedOffset <= detachStart
        ? 0
        : Math.min((normalizedOffset - detachStart) / (1 - detachStart), 1);

    if (Math.abs(detachProgressState - detachProgress) > 0.01) {
      setDetachProgressState(detachProgress);
    }

    const orbitRadius = 2.5;
    const easedDetach = easeInOutCubic(detachProgress);

    const newPositions = satelliteIndices.map((tileIndex, index) => {
      const tile = tiles[tileIndex];
      const tileWorldPosition = group.localToWorld(tile.position.clone());

      const angle =
        ((2 * Math.PI) / satelliteIndices.length) * index + elapsedTime * 0.03;

      const orbitTarget = new Vector3(
        Math.cos(angle) * orbitRadius,
        Math.sin(angle) * orbitRadius,
        group.position.z + 1.3
      );

      const blendedPosition = tileWorldPosition.lerp(orbitTarget, easedDetach);
      return [blendedPosition.x, blendedPosition.y, blendedPosition.z];
    });

    setSatellitePositions(newPositions);
  });

  return (
    <>
      <group ref={groupRef} position={initialGroupPosition.toArray()}>
        {tiles.map((tile, index) => {
          const hideTile =
            satelliteIndexSet.has(index) &&
            detachProgressState > holeRevealThreshold;

          if (hideTile) {
            return null;
          }

          return (
            <group
              key={index}
              position={tile.position}
              quaternion={tile.quaternion}
              scale={tileScale}
            >
              <mesh geometry={hexGeometry} material={hexMaterialRef.current} />
              <lineSegments
                geometry={hexEdgesGeometry}
                material={hexEdgeMaterialRef.current}
              />
            </group>
          );
        })}
      </group>
      {detachProgressState > SATELLITE_REVEAL_PROGRESS &&
        satelliteIndices.map((tileIndex, index) => (
          <OrbitingSatellite
            key={tileIndex}
            tile={tiles[tileIndex]}
            position={satellitePositions[index]}
            color={color}
            hexGeometry={hexGeometry}
            hexEdgesGeometry={hexEdgesGeometry}
            baseMaterial={hexMaterialRef.current}
            edgeMaterial={hexEdgeMaterialRef.current}
            detachProgress={detachProgressState}
            tileScale={tileScale}
            index={index}
          />
        ))}
      <ambientLight intensity={0.5} />
    </>
  );
};

export default SphereCustom;
