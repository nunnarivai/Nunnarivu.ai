import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const HeroOrbitalCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;

    const bokehLights = [
      { rx: 0.43, ry: 0.54, r: 22, alpha: 0.3, hue: '235, 142, 84', phase: 0.2 },
      { rx: 0.48, ry: 0.62, r: 26, alpha: 0.38, hue: '242, 152, 92', phase: 1.1 },
      { rx: 0.59, ry: 0.55, r: 28, alpha: 0.4, hue: '244, 158, 98', phase: 2.0 },
      { rx: 0.68, ry: 0.69, r: 24, alpha: 0.34, hue: '235, 138, 80', phase: 2.9 },
      { rx: 0.72, ry: 0.58, r: 19, alpha: 0.3, hue: '245, 165, 105', phase: 3.7 },
      { rx: 0.64, ry: 0.64, r: 17, alpha: 0.24, hue: '238, 148, 90', phase: 4.4 },
      { rx: 0.36, ry: 0.66, r: 22, alpha: 0.22, hue: '225, 138, 84', phase: 5.1 },
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect ? rect.width : window.innerWidth;
      height = rect ? rect.height : 980;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const drawFrame = (time: number) => {
      const t = reducedMotion ? 0 : time * 0.00022;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.49;
      const cy = height * 1.56;
      const planetR = Math.max(width * 0.88, height * 1.55);

      // Feathered planetary disc + soft atmospheric limb (no hard clip edge)
      const limbGrad = ctx.createRadialGradient(
        cx,
        cy,
        planetR * 0.62,
        cx,
        cy,
        planetR * 1.03
      );
      limbGrad.addColorStop(0, '#070d14');
      limbGrad.addColorStop(0.58, '#132232');
      limbGrad.addColorStop(0.84, '#3a5064');
      limbGrad.addColorStop(0.93, 'rgba(132, 152, 168, 0.58)');
      limbGrad.addColorStop(0.97, 'rgba(84, 106, 126, 0.24)');
      limbGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = limbGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, planetR * 1.03, 0, Math.PI * 2);
      ctx.fill();

      // Sunlit upper-left diffused cloud bank
      const cloudPatches = [
        { x: 0.22, y: 0.36, r: 0.38, a: 0.46 },
        { x: 0.38, y: 0.28, r: 0.34, a: 0.42 },
        { x: 0.52, y: 0.24, r: 0.28, a: 0.26 },
        { x: 0.14, y: 0.52, r: 0.32, a: 0.34 },
      ];

      cloudPatches.forEach((cp, idx) => {
        const px = width * cp.x + Math.sin(t + idx) * 20;
        const py = height * cp.y + Math.cos(t * 0.8 + idx) * 8;
        const pr = width * cp.r;
        const g = ctx.createRadialGradient(px, py, pr * 0.05, px, py, pr);
        g.addColorStop(0, `rgba(205, 212, 218, ${cp.a})`);
        g.addColorStop(0.48, `rgba(130, 144, 156, ${cp.a * 0.5})`);
        g.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
      });

      // Dark night ocean shadow pocket on lower-right matching reference contrast
      const nightPocket = ctx.createRadialGradient(
        width * 0.68,
        height * 0.52,
        width * 0.05,
        width * 0.68,
        height * 0.52,
        width * 0.44
      );
      nightPocket.addColorStop(0, 'rgba(7, 13, 22, 0.78)');
      nightPocket.addColorStop(0.65, 'rgba(9, 16, 26, 0.42)');
      nightPocket.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nightPocket;
      ctx.fillRect(0, 0, width, height);

      // Warm out-of-focus city bokeh lights
      bokehLights.forEach((b) => {
        const pulse = 0.9 + 0.1 * Math.sin(t * 3 + b.phase);
        const lx = width * b.rx + Math.cos(t + b.phase) * 6;
        const ly = height * b.ry + Math.sin(t + b.phase) * 4;
        const rad = b.r * Math.max(width / 1440, 0.75) * 1.3;
        const bg = ctx.createRadialGradient(lx, ly, rad * 0.08, lx, ly, rad * 2.1);
        bg.addColorStop(0, `rgba(${b.hue}, ${b.alpha * pulse})`);
        bg.addColorStop(0.45, `rgba(${b.hue}, ${b.alpha * 0.52 * pulse})`);
        bg.addColorStop(1, `rgba(${b.hue}, 0)`);
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(lx, ly, rad * 2.1, 0, Math.PI * 2);
        ctx.fill();
      });

      // Outer space upper corner mask drawn across full canvas so zero sub-rect seam exists
      const spaceCornerLeft = ctx.createRadialGradient(0, 0, 0, 0, 0, width * 0.38);
      spaceCornerLeft.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
      spaceCornerLeft.addColorStop(0.55, 'rgba(0, 0, 0, 0.45)');
      spaceCornerLeft.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = spaceCornerLeft;
      ctx.fillRect(0, 0, width, height);

      const spaceCornerRight = ctx.createRadialGradient(width, 0, 0, width, 0, width * 0.42);
      spaceCornerRight.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
      spaceCornerRight.addColorStop(0.55, 'rgba(0, 0, 0, 0.48)');
      spaceCornerRight.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = spaceCornerRight;
      ctx.fillRect(0, 0, width, height);

      // Bottom fade to pure #000000 behind headline & CTA
      const bottomFade = ctx.createLinearGradient(0, height * 0.54, 0, height);
      bottomFade.addColorStop(0, 'rgba(0, 0, 0, 0)');
      bottomFade.addColorStop(0.68, 'rgba(0, 0, 0, 0.82)');
      bottomFade.addColorStop(1, '#000000');
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, height * 0.54, width, height * 0.46);

      if (!reducedMotion) {
        animId = window.requestAnimationFrame(drawFrame);
      }
    };

    animId = window.requestAnimationFrame(drawFrame);

    return () => {
      window.cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
};
