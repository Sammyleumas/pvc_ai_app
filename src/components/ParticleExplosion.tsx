/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  decay: number;
  gravity: number;
}

export default function ParticleExplosion() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Fit canvas to viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      '#22d3ee', // Cyan
      '#3b82f6', // blue
      '#a855f7', // purple
      '#fbbf24', // gold-amber
      '#10b981'  // emerald
    ];

    // Seed initial burst in center-ish of current screen heights
    const createBurst = (cx: number, cy: number) => {
      const count = 75;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 8;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5, // slightly upwards bias
          radius: 1.5 + Math.random() * 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: 0.015 + Math.random() * 0.02,
          gravity: 0.12
        });
      }
    };

    // Trigger dual blasts
    createBurst(canvas.width * 0.25, canvas.height * 0.4);
    createBurst(canvas.width * 0.75, canvas.height * 0.4);

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.alpha -= p.decay;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Filter out finished particles
        if (p.alpha <= 0) {
          particles.splice(idx, 1);
        }
      });

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(updateAndDraw);
      }
    };

    updateAndDraw();

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
}
