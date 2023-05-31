import React from "react";
import { ExtrudeGeometry, Shape } from "three";

const createStarGeometry = () => {
    const starShape = new Shape();

    const spikes = 5;
    const outerRadius = 0.15;
    const innerRadius = outerRadius * 0.5;

    starShape.moveTo(0, outerRadius);

    for (let i = 0; i < spikes; i++) {
        let angle = (i / spikes) * Math.PI * 2;

        starShape.lineTo(innerRadius * Math.sin(angle + Math.PI / spikes),
            innerRadius * Math.cos(angle + Math.PI / spikes));

        starShape.lineTo(outerRadius * Math.sin(angle + Math.PI / spikes * 2),
            outerRadius * Math.cos(angle + Math.PI / spikes * 2));
    }

    starShape.lineTo(0, outerRadius);

    return new ExtrudeGeometry(starShape, {
        depth: 0.05,
        bevelEnabled: false,
    });
}

const Star = ({ starRef, starColor }) => {
    return (
        <mesh
            ref={starRef}
            geometry={createStarGeometry()}
        >
            <meshPhongMaterial color={starColor} />
        </mesh>
    );
}

export default Star;