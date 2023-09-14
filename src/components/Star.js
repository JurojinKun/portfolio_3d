import React, { useMemo } from "react";
import { ExtrudeGeometry, Shape } from "three";

const Star = ({ starRef, starColor, onClick }) => {

    const starShape = useMemo(() => {
        const shape = new Shape();

        const spikes = 5;
        const outerRadius = 0.15;
        const innerRadius = outerRadius * 0.5;

        shape.moveTo(0, outerRadius);

        for (let i = 0; i < spikes; i++) {
            let angle = (i / spikes) * Math.PI * 2;

            shape.lineTo(innerRadius * Math.sin(angle + Math.PI / spikes),
                innerRadius * Math.cos(angle + Math.PI / spikes));

            shape.lineTo(outerRadius * Math.sin(angle + Math.PI / spikes * 2),
                outerRadius * Math.cos(angle + Math.PI / spikes * 2));
        }

        shape.lineTo(0, outerRadius);

        return shape;
    }, []);

    const starGeometry = useMemo(() => new ExtrudeGeometry(starShape, {
        depth: 0.05,
        bevelEnabled: false,
    }), [starShape]);

    return (
        <mesh
            ref={starRef}
            geometry={starGeometry}
            onClick={onClick}
        >
            <meshPhongMaterial color={starColor} />
        </mesh>
    );
}

export default Star;