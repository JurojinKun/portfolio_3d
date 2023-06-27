import React, { useEffect, useRef } from 'react';

const StarryBackground = () => {
    const canvasRef = useRef(null);

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Création des étoiles statiques avec des tailles et des opacités variées
        for (let i = 0; i < 200; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 2;
            const opacity = Math.random();

            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.shadowBlur = size * 2;
            ctx.beginPath();
            ctx.arc(x, y, size * opacity * 2, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        }

        // Création des étoiles filantes avec une trainée de gradient
        for (let j = 0; j < 6; j++) {
            const x = Math.random() * canvas.width;
            const y = canvas.height - Math.random() * canvas.height / 2;
            const length = Math.random() * 50 + 50;
            const endX = x + length;
            const endY = y - length;

            const gradient = ctx.createLinearGradient(x, y, endX, endY);
            gradient.addColorStop(0, 'transparent');
            gradient.addColorStop(0.8, 'lightblue');
            gradient.addColorStop(1, 'white');

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.moveTo(x, y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }

        // Ajout des gradients circulaires dans des zones plus petites
        const gradientRadius = Math.min(canvas.width, canvas.height) * 0.5;

        const topLeftGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, gradientRadius);
        topLeftGradient.addColorStop(0, 'rgba(209, 243, 245, 0.8)');
        topLeftGradient.addColorStop(0.25, 'rgba(71, 205, 214, 0.7)');
        topLeftGradient.addColorStop(0.5, 'rgba(157, 77, 196, 0.6)');
        topLeftGradient.addColorStop(1, 'transparent');

        const bottomRightGradient = ctx.createRadialGradient(canvas.width, canvas.height, 0, canvas.width, canvas.height, gradientRadius);
        bottomRightGradient.addColorStop(0, 'rgba(231, 211, 241, 0.8)');
        bottomRightGradient.addColorStop(0.25, 'rgba(157, 77, 196, 0.7)');
        bottomRightGradient.addColorStop(0.5, 'rgba(71, 205, 214, 0.6)');
        bottomRightGradient.addColorStop(1, 'transparent');

        ctx.fillStyle = topLeftGradient;
        ctx.fillRect(0, 0, gradientRadius * 2, gradientRadius * 2);

        ctx.fillStyle = bottomRightGradient;
        ctx.fillRect(canvas.width - gradientRadius * 2, canvas.height - gradientRadius * 2, gradientRadius * 2, gradientRadius * 2);
    };

    useEffect(() => {
        drawCanvas();

        window.addEventListener('resize', drawCanvas);

        // Cleanup
        return () => {
            window.removeEventListener('resize', drawCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'absolute', zIndex: 0 }} />;
};

export default StarryBackground;