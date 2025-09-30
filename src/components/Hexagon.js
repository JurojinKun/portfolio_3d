import { useMemo } from "react";
import {
  ExtrudeGeometry,
  Shape,
  TextureLoader,
  MeshBasicMaterial,
  PlaneGeometry,
  DoubleSide,
} from "three";
import { useLoader } from "@react-three/fiber";

const Hexagon = ({ hexagonRef, hexagonColor, onClick, iconPath, visible }) => {
  const iconTexture = useLoader(TextureLoader, iconPath);

  const iconMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        map: iconTexture,
        transparent: true,
        side: DoubleSide,
      }),
    [iconTexture]
  );

  const hexagonShape = useMemo(() => {
    const shape = new Shape();

    const sides = 6;
    const radius = 0.15;

    shape.moveTo(radius * Math.cos(0), radius * Math.sin(0));

    for (let i = 1; i <= sides; i++) {
      let angle = (i / sides) * Math.PI * 2;
      shape.lineTo(radius * Math.cos(angle), radius * Math.sin(angle));
    }

    return shape;
  }, []);

  const hexagonGeometry = useMemo(
    () =>
      new ExtrudeGeometry(hexagonShape, {
        depth: 0.1,
        bevelEnabled: false,
      }),
    [hexagonShape]
  );

  const iconGeometry = useMemo(() => new PlaneGeometry(0.15, 0.15), []);

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "auto";
  };

  return (
    <group ref={hexagonRef}>
      <mesh
        geometry={hexagonGeometry}
        onClick={onClick}
        onPointerOver={() => {
          if (visible) {
            handlePointerOver();
          }
        }}
        onPointerOut={() => {
          if (visible) {
            handlePointerOut();
          }
        }}
      >
        <meshBasicMaterial visible={false} />
      </mesh>
      <mesh geometry={hexagonGeometry}>
        <meshPhongMaterial
          color={hexagonColor}
          transparent={true}
          opacity={0.5}
        />
        <lineSegments>
          <edgesGeometry attach="geometry" args={[hexagonGeometry]} />
          <lineBasicMaterial attach="material" color={hexagonColor} />
        </lineSegments>
      </mesh>
      <mesh
        position={[0, 0, 0.049]}
        geometry={iconGeometry}
        material={iconMaterial}
      />
      <mesh
        position={[0, 0, 0.051]}
        geometry={iconGeometry}
        material={iconMaterial}
      />
    </group>
  );
};

export default Hexagon;
