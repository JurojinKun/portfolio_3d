// import { Text } from '@react-three/drei';
// import { Line } from '@react-three/drei';
// import { useState, useEffect } from 'react';
// import useMeasure from 'react-use-measure';

// const TextUnderline = ({ sectionName }) => {
//     const [ref, bounds] = useMeasure();
//     const [underlineWidth, setUnderlineWidth] = useState(0);

//     useEffect(() => {
//         setUnderlineWidth(bounds.width);
//     }, [bounds]);

//     return (
//         <>
//             <Text
//                 ref={ref}
//                 position={[0, -0.25, 0]}
//                 fontSize={0.10}
//                 color="white"
//                 textAlign="center"
//                 fontWeight="bold"
//             >
//                 {sectionName}
//             </Text>

//             <Line
//                 position={[0, -0.30, 0]} // ajuster la position en fonction de votre texte
//                 points={[[-underlineWidth / 2, 0, 0], [underlineWidth / 2, 0, 0]]} // la longueur de la ligne est basée sur la largeur du texte
//                 color="white"
//             />
//         </>
//     )
// }

// export default TextUnderline;

import { Text, Line } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import { useEffect, useState, useRef } from "react";

const TextUnderline = ({ sectionName }) => {
    const textRef = useRef();
    const [linePoints, setLinePoints] = useState();

    useEffect(() => {
        if (textRef.current) {
            console.log("je passe");
            const box = new Box3().setFromObject(textRef.current);
            const size = new Vector3();
            box.getSize(size);

            console.log('Text dimensions in 3D space:', size);

            // Define line points
            const padding = 0.01;  // Adjust this value to control how much the line extends before and after the text
            const startPoint = [-size.x / 2 - padding, 0, 0];
            const endPoint = [size.x / 2 + padding, 0, 0];

            setLinePoints([startPoint, endPoint]);
        }
    }, [sectionName]);

    return (
        <>
            <Text
                ref={textRef}
                position={[0, -0.25, 0]}
                fontSize={0.10}
                color="white"
                textAlign="center"
                fontWeight="600"
            >
                {sectionName}
            </Text>
            {linePoints && <Line
                position={[0, -0.30, 0]}
                points={linePoints} color="white" />}
        </>
    );
}

export default TextUnderline;
