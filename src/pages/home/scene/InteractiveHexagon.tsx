import { useLoader } from "@react-three/fiber";
import { useMemo, type ReactNode, type RefObject } from "react";
import {
  Color,
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
  bodyStyle?: "gradient" | "solid";
  hexagonColor: ColorRepresentation;
  hexagonRef?: RefObject<Group | null>;
  iconPath: string;
  onClick?: (() => void) | undefined;
}

interface HexagonCoreProps {
  bodyStyle?: "gradient" | "solid";
  children?: ReactNode;
  hexagonColor: ColorRepresentation;
  hexagonRef?: RefObject<Group | null> | undefined;
  onClick?: (() => void) | undefined;
}

const satelliteVisualStyle = {
  bodyOpacity: 0.56,
  outlineOpacity: 1,
} as const;
const gradientVertexShader = `
  varying vec3 vLocalPosition;

  void main() {
    vLocalPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const gradientFragmentShader = `
  uniform vec3 colorA;
  uniform vec3 colorB;
  uniform float opacity;
  varying vec3 vLocalPosition;

  void main() {
    float mixValue = smoothstep(-0.18, 0.18, vLocalPosition.x + vLocalPosition.y * 0.52);
    vec3 color = mix(colorA, colorB, mixValue);
    float highlight = smoothstep(-0.02, 0.16, vLocalPosition.y);
    color = mix(color, vec3(1.0), highlight * 0.14);
    gl_FragColor = vec4(color, opacity);
  }
`;

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

export function HexagonCore({
  bodyStyle = "solid",
  children,
  hexagonColor,
  hexagonRef,
  onClick,
}: HexagonCoreProps) {
  const hexagonGeometry = useMemo(() => {
    const geometry = new ExtrudeGeometry(createHexagonShape(0.15), {
      bevelEnabled: false,
      depth: 0.1,
    });

    return geometry;
  }, []);
  const gradientUniforms = useMemo(
    () => ({
      colorA: { value: new Color("#47cdd6") },
      colorB: { value: new Color("#9d4dc4") },
      opacity: { value: satelliteVisualStyle.bodyOpacity },
    }),
    [],
  );

  return (
    <group ref={hexagonRef ?? null}>
      {onClick ? (
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
      ) : null}

      <group>
        <mesh geometry={hexagonGeometry}>
          {bodyStyle === "gradient" ? (
            <shaderMaterial
              fragmentShader={gradientFragmentShader}
              uniforms={gradientUniforms}
              vertexShader={gradientVertexShader}
              transparent
            />
          ) : (
            <meshPhongMaterial
              color={hexagonColor}
              opacity={satelliteVisualStyle.bodyOpacity}
              transparent
            />
          )}
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

      {children}
    </group>
  );
}

export function InteractiveHexagon({
  bodyStyle = "solid",
  hexagonColor,
  hexagonRef,
  iconPath,
  onClick,
}: InteractiveHexagonProps) {
  const iconTexture = useLoader(TextureLoader, iconPath);
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
    <HexagonCore
      bodyStyle={bodyStyle}
      hexagonColor={hexagonColor}
      hexagonRef={hexagonRef}
      onClick={onClick}
    >
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
    </HexagonCore>
  );
}
