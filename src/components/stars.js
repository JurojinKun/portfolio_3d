import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

function Star() {
    const meshRef = useRef();
    const speed = useRef({
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
    });

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.position.x += speed.current.x;
            meshRef.current.position.y += speed.current.y;
            meshRef.current.position.z += speed.current.z;

            if (meshRef.current.position.x < -10 || meshRef.current.position.x > 10) {
                speed.current.x = -speed.current.x;
            }
            if (meshRef.current.position.y < -10 || meshRef.current.position.y > 10) {
                speed.current.y = -speed.current.y;
            }
            if (meshRef.current.position.z < -10 || meshRef.current.position.z > 10) {
                speed.current.z = -speed.current.z;
            }
        }
    });

    const [x, y, z] = useMemo(() => [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20], []);
    const texture = useTexture("/pictures/profile_picture.png");

    return (
        <mesh ref={meshRef}  position={[x, y, z]} >
            <boxGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
            <meshBasicMaterial attach="material" map={texture} />
        </mesh>
    );
}

function Stars({ count }) {
    return (
        <>
            {new Array(count).fill().map((_, i) => (
                <Star key={i} />
            ))}
        </>
    );
}

export default Stars;

