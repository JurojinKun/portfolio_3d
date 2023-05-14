import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect } from 'react';

function BackgroundGradient() {
    const { gl, scene } = useThree();

    useEffect(() => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Définir la taille du canvas
        canvas.width = 2;
        canvas.height = 2;

        // Créer le gradient
        const gradient = context.createLinearGradient(0, 0, 4, 4);
        gradient.addColorStop(0, '#141427');
        gradient.addColorStop(0.1, '#16162B');
        gradient.addColorStop(0.2, '#18182F');
        gradient.addColorStop(0.3, '#21203A');
        gradient.addColorStop(0.4, '#2B2946');
        gradient.addColorStop(0.5, '#343151');
        gradient.addColorStop(0.6, '#343253');
        gradient.addColorStop(0.7, '#333355');
        gradient.addColorStop(0.8, '#323456');
        gradient.addColorStop(1, '#303457');

        // Dessiner le gradient sur le canvas
        context.fillStyle = gradient;
        context.fillRect(0, 0, 2, 2);

        // Créer une texture à partir du canvas
        const texture = new THREE.CanvasTexture(canvas);

        // Définir la texture comme arrière-plan de la scène
        scene.background = texture;
    }, [gl, scene]);

    return null;
}

export default BackgroundGradient;

