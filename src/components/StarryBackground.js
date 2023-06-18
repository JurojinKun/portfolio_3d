import React, { useEffect, useRef } from 'react';

const StarryBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        for (let i = 0; i < 200; i++) { // Change this value to add more or less stars
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 1.5;

            ctx.fillStyle = 'white';
            ctx.shadowBlur = size * 2;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        }
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'absolute', zIndex: 0 }} />;
};

export default StarryBackground;