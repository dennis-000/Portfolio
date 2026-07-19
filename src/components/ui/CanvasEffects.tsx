"use client";

import { useEffect, useRef } from "react";
import { usePortfolioStore } from "@/store/portfolio";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
  gravity?: number;
  drag?: number;
  shape?: "circle" | "square" | "triangle";
  rotation?: number;
  rotationSpeed?: number;
}

export default function CanvasEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiTrigger = usePortfolioStore((s) => s.confettiTrigger);
  const particlesRef = useRef<Particle[]>([]);
  const lastTriggerRef = useRef(confettiTrigger);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Update physics
        p.vx *= p.drag ?? 0.99;
        p.vy *= p.drag ?? 0.99;
        if (p.gravity) {
          p.vy += p.gravity;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.rotation !== undefined && p.rotationSpeed !== undefined) {
          p.rotation += p.rotationSpeed;
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        
        if (p.rotation !== undefined) {
          ctx.rotate(p.rotation);
        }

        if (p.shape === "square") {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else if (p.shape === "triangle") {
          ctx.beginPath();
          ctx.moveTo(0, -p.size / 2);
          ctx.lineTo(p.size / 2, p.size / 2);
          ctx.lineTo(-p.size / 2, p.size / 2);
          ctx.closePath();
          ctx.fill();
        } else {
          // Circle
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Remove dead particles
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Register global handler for direct custom particles
    // @ts-ignore
    window.__spawnDennisParticles = (opts: { count?: number; speed?: number; color?: string; x?: number; y?: number }) => {
      const count = opts.count ?? 50;
      const speed = opts.speed ?? 6;
      const color = opts.color ?? "var(--accent)";
      const startX = opts.x ?? window.innerWidth / 2;
      const startY = opts.y ?? window.innerHeight / 2;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = (0.2 + Math.random() * 0.8) * speed;
        particlesRef.current.push({
          x: startX,
          y: startY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          color,
          size: 4 + Math.random() * 8,
          alpha: 1,
          decay: 0.01 + Math.random() * 0.015,
          drag: 0.95,
          gravity: 0.1,
          shape: Math.random() > 0.5 ? "circle" : "square",
        });
      }
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      // @ts-ignore
      delete window.__spawnDennisParticles;
    };
  }, []);

  // Watch confetti trigger
  useEffect(() => {
    if (confettiTrigger === 0) return;
    
    // Spawn standard celebratory confetti
    const colors = ["#ff2a5f", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93", "#ff6b6b", "#4ecdc4"];
    const count = 180;
    const particles = particlesRef.current;

    // Spawn from left and right edges shooting inwards/upwards
    for (let i = 0; i < count; i++) {
      const fromLeft = Math.random() > 0.5;
      const x = fromLeft ? 0 : window.innerWidth;
      const y = window.innerHeight * 0.7;

      const angle = fromLeft 
        ? -Math.PI / 4 - Math.random() * (Math.PI / 6) // -45 to -75 deg
        : -3 * Math.PI / 4 + Math.random() * (Math.PI / 6); // -135 to -105 deg

      const speed = 12 + Math.random() * 16;

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 12,
        alpha: 1,
        decay: 0.008 + Math.random() * 0.006,
        drag: 0.97,
        gravity: 0.25,
        shape: Math.random() > 0.6 ? "triangle" : Math.random() > 0.3 ? "square" : "circle",
        rotation: Math.random() * Math.PI,
        rotationSpeed: -0.1 + Math.random() * 0.2,
      });
    }
  }, [confettiTrigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    />
  );
}
