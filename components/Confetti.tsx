
import React, { useEffect, useRef } from 'react';

export const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces: { x: number; y: number; color: string; size: number; velocity: { x: number; y: number }; rotation: number; rotationSpeed: number }[] = [];
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

    // Create particles
    for (let i = 0; i < 150; i++) {
      pieces.push({
        x: canvas.width / 2,
        y: canvas.height / 2, // Start from center
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        velocity: {
          x: (Math.random() - 0.5) * 15, // Explode outward
          y: (Math.random() - 0.5) * 15 - 5 // Tend to go up slightly first
        },
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }

    let animationId: number;

    const update = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pieces.forEach((p, index) => {
        // Physics
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        p.velocity.y += 0.3; // Gravity
        p.velocity.x *= 0.96; // Air resistance
        p.rotation += p.rotationSpeed;

        // Draw
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        // Remove off-screen particles
        if (p.y > canvas.height) {
           pieces.splice(index, 1);
        }
      });

      if (pieces.length > 0) {
        animationId = requestAnimationFrame(update);
      }
    };

    update();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[100] pointer-events-none"
    />
  );
};
