import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { OBJLoader } from 'three-stdlib';
import { Box3, Vector3 } from 'three';

const Satellite = ({ color, visible, position, onClick, sectionName, modelPath }) => {
  const satelliteRef = useRef();
  const obj = useLoader(OBJLoader, modelPath);

  // Redimensionner et centrer l'objet
  useMemo(() => {
    const box = new Box3().setFromObject(obj);
    const size = box.getSize(new Vector3()).length();
    const center = box.getCenter(new Vector3());
    
    obj.position.x += (obj.position.x - center.x);
    obj.position.y += (obj.position.y - center.y);
    obj.position.z += (obj.position.z - center.z);
    obj.scale.multiplyScalar(1 / size);
  }, [obj]);

  useFrame(() => {
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y += 0.02;
      satelliteRef.current.rotation.z += 0.02;
    }
  });

  return (
    <group position={position} visible={visible} onClick={onClick}>
      <primitive
        ref={satelliteRef}
        object={obj}
      >
        {/* <meshPhongMaterial color={color} /> */}
      </primitive>
      <Text
        position={[0, -0.25, 0]}
        fontSize={0.10}
        color="white"
        textAlign="center"
        fontWeight="bold"
      >
        {sectionName}
      </Text>
    </group>
  );
}

export default Satellite;

// import React, { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { Text } from '@react-three/drei';
// import { ExtrudeGeometry, Shape } from 'three';

// const createStarGeometry = () => {
//     const starShape = new Shape();

//     const spikes = 5;
//     const outerRadius = 0.15;
//     const innerRadius = outerRadius * 0.5;

//     starShape.moveTo(0, outerRadius);

//     for (let i = 0; i < spikes; i++) {
//         let angle = (i / spikes) * Math.PI * 2;

//         starShape.lineTo(innerRadius * Math.sin(angle + Math.PI / spikes),
//             innerRadius * Math.cos(angle + Math.PI / spikes));

//         starShape.lineTo(outerRadius * Math.sin(angle + Math.PI / spikes * 2),
//             outerRadius * Math.cos(angle + Math.PI / spikes * 2));
//     }

//     starShape.lineTo(0, outerRadius);

//     return new ExtrudeGeometry(starShape, {
//         depth: 0.05,
//         bevelEnabled: false,
//     });
// }

// const Satellite = ({ color, visible, position, onClick, sectionName }) => {
//     const satelliteRef = useRef();

//     useFrame(() => {
//         if (satelliteRef.current) {
//             satelliteRef.current.rotation.y += 0.01;
//             satelliteRef.current.rotation.z += 0.01;
//         }
//     });

//     return (
//         <group position={position} visible={visible} onClick={onClick}>
//             <mesh
//                 ref={satelliteRef}
//                 geometry={createStarGeometry()}
//             >
//                 <meshPhongMaterial color={color} />
//             </mesh>
//             <Text
//                 position={[0, -0.25, 0]}
//                 fontSize={0.10}
//                 color="white"
//                 textAlign="center"
//                 fontWeight="bold"
//             >
//                 {sectionName}
//             </Text>
//         </group>
//     );
// }

// export default Satellite;