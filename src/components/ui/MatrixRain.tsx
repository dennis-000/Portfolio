"use client";

import { useEffect, useRef } from "react";
import { usePortfolioStore } from "@/store/portfolio";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const matrixRainActive = usePortfolioStore((s) => s.matrixRainActive);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!matrixRainActive) {
      // Clear the canvas and return if inactive
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters: katakana, numbers, latin uppercase
    const chars = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charArray = chars.split("");

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const drops: number[] = Array(columns).fill(1);

    let animationFrameId: number;

    const draw = () => {
      // Semi-transparent black background to create trail effect
      ctx.fillStyle = "rgba(10, 10, 10, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text font and color (classic neon matrix green)
      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = "#0f0";

      for (let i = 0; i < drops.length; i++) {
        // Get random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Render the character
        ctx.fillText(char, x, y);

        // Randomly reset drop to the top to add dispersion
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment drop position
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [matrixRainActive]);

  if (!matrixRainActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-20"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
