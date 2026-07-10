import { Matrix4, Quaternion, Vector3 } from "three";

const vectorUp = new Vector3(0, 1, 0);
const vectorRight = new Vector3(1, 0, 0);
const vectorForward = new Vector3(0, 0, 1);

export interface HexTile {
  normal: Vector3;
  position: Vector3;
  quaternion: Quaternion;
}

export type ScenePosition = [number, number, number];

export function createOrientation(normal: Vector3) {
  const projected = vectorForward
    .clone()
    .sub(normal.clone().multiplyScalar(vectorForward.dot(normal)));
  let tangentSource = projected;

  if (tangentSource.lengthSq() < 1e-6) {
    tangentSource = vectorRight
      .clone()
      .sub(normal.clone().multiplyScalar(vectorRight.dot(normal)));

    if (tangentSource.lengthSq() < 1e-6) {
      tangentSource = vectorUp
        .clone()
        .sub(normal.clone().multiplyScalar(vectorUp.dot(normal)));
    }
  }

  const tangent = tangentSource.normalize();
  const bitangent = normal.clone().cross(tangent).normalize();
  const orientationMatrix = new Matrix4().makeBasis(tangent, bitangent, normal);

  return new Quaternion().setFromRotationMatrix(orientationMatrix);
}

export function generateHexSphereTiles(count: number, radius: number) {
  const tiles: HexTile[] = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));

  for (let index = 0; index < count; index += 1) {
    const y = index * offset - 1 + offset / 2;
    const localRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = index * increment;
    const x = Math.cos(phi) * localRadius;
    const z = Math.sin(phi) * localRadius;
    const normal = new Vector3(x, y, z).normalize();

    tiles.push({
      normal,
      position: normal.clone().multiplyScalar(radius),
      quaternion: createOrientation(normal),
    });
  }

  return tiles;
}

export function selectSatelliteTiles(tiles: readonly HexTile[], count: number) {
  if (tiles.length <= count) {
    return tiles.map((_, index) => index);
  }

  const result: number[] = [];
  const step = Math.max(1, Math.floor(tiles.length / count));

  for (
    let index = 0;
    index < tiles.length && result.length < count;
    index += step
  ) {
    result.push(index);
  }

  let fallbackIndex = tiles.length - 1;

  while (result.length < count && fallbackIndex >= 0) {
    if (!result.includes(fallbackIndex)) {
      result.push(fallbackIndex);
    }

    fallbackIndex -= 1;
  }

  return result;
}
