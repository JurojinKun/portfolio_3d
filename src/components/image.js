import { useTexture } from "@react-three/drei";

function Image({ pathPicture }) {
    const texture = useTexture(pathPicture);

    return (
        <mesh position={[0, 2, -1]}>
            <planeGeometry attach="geometry" args={[5, 5]} />
            <meshBasicMaterial attach="material" map={texture} />
        </mesh>
    );
}

export default Image;