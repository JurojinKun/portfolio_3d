import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect } from 'react';

function BackgroundGradient() {
    const { gl, scene, size } = useThree();

    useEffect(() => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Définir la taille du canvas en fonction de la taille de la scène
        canvas.width = size.width;
        canvas.height = size.height;

        // Créer le gradient
        const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#150B2E');
        gradient.addColorStop(0.5, '#02020D');
        gradient.addColorStop(1, '#010107');

        // Dessiner le gradient sur le canvas
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Créer une texture à partir du canvas
        const texture = new THREE.CanvasTexture(canvas);

        // Définir la texture comme arrière-plan de la scène
        scene.background = texture;
    }, [gl, scene, size]);

    return null;
}

export default BackgroundGradient;