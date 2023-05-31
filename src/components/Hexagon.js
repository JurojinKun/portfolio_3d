import React from "react";
import { ExtrudeGeometry, Shape } from "three";

const createHexagonGeometry = () => {
    const hexagonShape = new Shape();

    const sides = 6;
    const radius = 0.15;  // rayon de l'hexagone

    hexagonShape.moveTo(radius * Math.cos(0), radius * Math.sin(0));

    for (let i = 1; i <= sides; i++) {
        let angle = (i / sides) * Math.PI * 2;
        hexagonShape.lineTo(radius * Math.cos(angle), radius * Math.sin(angle));
    }

    return new ExtrudeGeometry(hexagonShape, {
        depth: 0.05,
        bevelEnabled: false,
    });
}

const Hexagon = ({ hexagonRef, hexagonColor }) => {
    return (
        <mesh ref={hexagonRef} geometry={createHexagonGeometry()}>
            <meshPhongMaterial color={hexagonColor} transparent={true} opacity={0.5} />
            <lineSegments>
                <edgesGeometry attach="geometry" args={[createHexagonGeometry()]} />
                <lineBasicMaterial attach="material" color={hexagonColor} />
            </lineSegments>
        </mesh>
    );
}

export default Hexagon;