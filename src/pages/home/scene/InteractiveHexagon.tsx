import { useLoader } from "@react-three/fiber";
import { useMemo, type RefObject } from "react";
import {
  DoubleSide,
  ExtrudeGeometry,
  MeshBasicMaterial,
  PlaneGeometry,
  Shape,
  TextureLoader,
  type ColorRepresentation,
  type Group,
} from "three";

interface InteractiveHexagonProps {
  hexagonColor: ColorRepresentation;
  hexagonRef?: RefObject<Group | null>;
  iconPath: string;
  onClick: () => void;
}

const satelliteVisualStyle = {
  bodyOpacity: 0.56,
  outlineOpacity: 1,
} as const;

function createHexagonShape(radius: number) {
  const shape = new Shape();

  shape.moveTo(radius, 0);

  for (let index = 1; index <= 6; index += 1) {
    const angle = (index / 6) * Math.PI * 2;
    shape.lineTo(radius * Math.cos(angle), radius * Math.sin(angle));
  }

  return shape;
}

function setPointerCursor(cursor: "auto" | "pointer") {
  if (typeof document === "undefined") {
    return;
  }

  document.body.style.cursor = cursor;
}

export function InteractiveHexagon({
  hexagonColor,
  hexagonRef,
  iconPath,
  onClick,
}: InteractiveHexagonProps) {
  const iconTexture = useLoader(TextureLoader, iconPath);
  const groupRef = hexagonRef ?? null;
  const hexagonGeometry = useMemo(() => {
    const geometry = new ExtrudeGeometry(createHexagonShape(0.15), {
      bevelEnabled: false,
      depth: 0.1,
    });

    return geometry;
  }, []);
  const iconGeometry = useMemo(() => new PlaneGeometry(0.15, 0.15), []);
  const iconMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        map: iconTexture,
        opacity: 1,
        side: DoubleSide,
        transparent: true,
      }),
    [iconTexture],
  );

  return (
    <group ref={groupRef}>
      <mesh
        geometry={hexagonGeometry}
        onClick={onClick}
        onPointerOut={() => {
          setPointerCursor("auto");
        }}
        onPointerOver={() => {
          setPointerCursor("pointer");
        }}
      >
        <meshBasicMaterial visible={false} />
      </mesh>

      <group>
        <mesh geometry={hexagonGeometry}>
          <meshPhongMaterial
            color={hexagonColor}
            opacity={satelliteVisualStyle.bodyOpacity}
            transparent
          />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[hexagonGeometry]} />
          <lineBasicMaterial
            color={hexagonColor}
            depthTest={false}
            depthWrite={false}
            opacity={satelliteVisualStyle.outlineOpacity}
            toneMapped={false}
            transparent={false}
          />
        </lineSegments>
      </group>

      <mesh
        geometry={iconGeometry}
        material={iconMaterial}
        position={[0, 0, 0.049]}
      />
      <mesh
        geometry={iconGeometry}
        material={iconMaterial}
        position={[0, 0, 0.051]}
      />
    </group>
  );
}
