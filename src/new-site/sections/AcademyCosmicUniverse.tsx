import React, { useEffect, useRef } from 'react';
import styles from './AcademySection.module.css';

interface AcademyCosmicUniverseProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  phase: number;
  speed: number;
  color: string;
  vx: number;
  vy: number;
}

interface DustMote {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

interface ShootingStar {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
  maxLife: number;
  cooldown: number;
}

const COSMIC_ENERGY_PATH =
  'M 642 292 ' +
  'C 695 104, 888 22, 1076 58 ' +
  'C 1164 74, 1170 156, 1084 182 ' +
  'C 1196 138, 1318 172, 1316 246 ' +
  'C 1314 310, 1184 320, 1044 294 ' +
  'C 886 266, 782 310, 816 376 ' +
  'C 848 438, 998 442, 1134 408 ' +
  'C 1254 378, 1320 424, 1312 490 ' +
  'C 1304 556, 1166 570, 1036 538 ' +
  'C 888 502, 752 544, 774 614 ' +
  'C 796 680, 994 684, 1152 630 ' +
  'C 1206 612, 1252 588, 1296 558';

const SECONDARY_ORBIT_ARC_1 =
  'M 664 348 C 788 186, 1032 108, 1326 164';

const SECONDARY_ORBIT_ARC_2 =
  'M 692 478 C 846 392, 1094 338, 1328 386';

const SECONDARY_ORBIT_ARC_3 =
  'M 710 594 C 864 684, 1110 668, 1334 560';

const FOREGROUND_SPARKLES = [
  { id: 'f1', cx: 794, cy: 118, r: 2.3, dur: '17s', delay: '-2s', desktopOnly: false },
  { id: 'f2', cx: 920, cy: 62, r: 1.9, dur: '21s', delay: '-6s', desktopOnly: true },
  { id: 'f3', cx: 1104, cy: 138, r: 2.5, dur: '16s', delay: '-4s', desktopOnly: false },
  { id: 'f4', cx: 1286, cy: 204, r: 2.0, dur: '19s', delay: '-9s', desktopOnly: true },
  { id: 'f5', cx: 1148, cy: 298, r: 2.4, dur: '18s', delay: '-3s', desktopOnly: false },
  { id: 'f6', cx: 814, cy: 332, r: 2.2, dur: '20s', delay: '-7s', desktopOnly: false },
  { id: 'f7', cx: 1044, cy: 424, r: 2.6, dur: '15.5s', delay: '-1s', desktopOnly: false },
  { id: 'f8', cx: 1292, cy: 468, r: 2.0, dur: '22s', delay: '-11s', desktopOnly: true },
  { id: 'f9', cx: 808, cy: 564, r: 2.3, dur: '18.5s', delay: '-5s', desktopOnly: false },
  { id: 'f10', cx: 992, cy: 654, r: 2.6, dur: '16.5s', delay: '-8s', desktopOnly: false },
  { id: 'f11', cx: 1184, cy: 594, r: 2.1, dur: '23s', delay: '-13s', desktopOnly: true },
  { id: 'f12', cx: 726, cy: 224, r: 2.0, dur: '19.5s', delay: '-10s', desktopOnly: true },
];

function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * 13-Layer Divine Cosmic Universe Academy Live Wallpaper:
 * - Layer 03/05: Feathered deep-space nebula backdrop (light violet -> deep cosmic indigo/violet)
 * - Layer 04: Adaptive HTML5 Canvas twinkling starfield, outward cosmic dust & occasional shooting stars
 * - Layer 06: Rotating (84s) & gently expanding (32s) photorealistic Hubble-grade spiral galaxy
 * - Layer 07: Orbiting upper marbled planet, distant moons & glowing bottom-right planetary horizon
 * - Layer 08: Multi-spectrum golden/violet/sapphire curved orbital energy streams (14s sequential loop)
 * - Layer 09: Warm divine golden & celestial cosmic aura behind static Krishna & Arjuna
 * - Layer 12: Subtle foreground golden/cyan cosmic dust motes (thinned automatically on mobile)
 */
export const AcademyCosmicUniverse: React.FC<AcademyCosmicUniverseProps> = ({
  isPlaying,
  reducedMotion,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const playingRef = useRef<boolean>(isPlaying);

  useEffect(() => {
    playingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let rafId: number | null = null;
    let width = 0;
    let height = 0;
    let isMobileLayout = false;
    let stars: Star[] = [];
    let dust: DustMote[] = [];
    let shooter: ShootingStar = {
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      len: 70,
      life: 0,
      maxLife: 1,
      cooldown: 4.5,
    };

    const initScene = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      isMobileLayout = width <= 860;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rand = seededRandom(28112026);
      const starCount = isMobileLayout ? 48 : 96;
      const dustCount = isMobileLayout ? 14 : 28;

      const starColors = ['#ffffff', '#fff4d6', '#d8e9ff', '#e8d0ff', '#ffdca4'];
      stars = Array.from({ length: starCount }, () => {
        // Keep stars strictly in cosmic zone: right 62% on desktop, lower 56% on mobile
        const sx = isMobileLayout
          ? rand() * width
          : width * (0.39 + rand() * 0.61);
        const sy = isMobileLayout
          ? height * (0.45 + rand() * 0.55)
          : rand() * height;
        return {
          x: sx,
          y: sy,
          r: 0.55 + rand() * 1.45,
          baseAlpha: 0.25 + rand() * 0.72,
          phase: rand() * Math.PI * 2,
          speed: 0.7 + rand() * 1.15, // ~4–8s twinkling cycle
          color: starColors[Math.floor(rand() * starColors.length)],
          vx: (0.04 + rand() * 0.08) * (isMobileLayout ? 0.4 : 1),
          vy: (rand() - 0.5) * 0.04,
        };
      });

      const dustColors = ['#ffdf8e', '#fff6d8', '#cfa8ff', '#8ad2ff'];
      dust = Array.from({ length: dustCount }, () => {
        const dx = isMobileLayout
          ? width * (0.1 + rand() * 0.8)
          : width * (0.44 + rand() * 0.54);
        const dy = isMobileLayout
          ? height * (0.48 + rand() * 0.5)
          : height * (0.08 + rand() * 0.84);
        return {
          x: dx,
          y: dy,
          r: 0.8 + rand() * 1.7,
          vx: isMobileLayout ? (rand() - 0.5) * 0.14 : 0.16 + rand() * 0.28,
          vy: isMobileLayout ? 0.14 + rand() * 0.24 : (rand() - 0.5) * 0.12,
          alpha: 0.22 + rand() * 0.55,
          color: dustColors[Math.floor(rand() * dustColors.length)],
        };
      });
    };

    const drawFrame = (dtSec: number, tSec: number) => {
      ctx.clearRect(0, 0, width, height);

      // Draw distant twinkling stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (dtSec > 0) {
          s.x += s.vx * dtSec * 12;
          s.y += s.vy * dtSec * 12;
          if (s.x > width + 4) s.x = isMobileLayout ? 0 : width * 0.4;
          if (s.y < -4) s.y = height + 2;
          if (s.y > height + 4) s.y = isMobileLayout ? height * 0.46 : 0;
        }
        // Soft edge fade near left cosmic boundary on desktop (or top boundary on mobile)
        const edgeFade = isMobileLayout
          ? Math.max(0, Math.min(1, (s.y - height * 0.45) / (height * 0.1)))
          : Math.max(0, Math.min(1, (s.x - width * 0.39) / (width * 0.12)));

        const twinkle = 0.55 + 0.45 * Math.sin(tSec * s.speed + s.phase);
        const alpha = s.baseAlpha * twinkle * edgeFade;
        if (alpha <= 0.02) continue;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        // Occasional delicate 4-point star glint on brightest stars
        if (s.r > 1.55 && twinkle > 0.82) {
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.6;
          ctx.globalAlpha = alpha * 0.7;
          const arm = s.r * 3.1;
          ctx.beginPath();
          ctx.moveTo(s.x - arm, s.y);
          ctx.lineTo(s.x + arm, s.y);
          ctx.moveTo(s.x, s.y - arm);
          ctx.lineTo(s.x, s.y + arm);
          ctx.stroke();
        }
      }

      // Draw outward-expanding golden/violet cosmic dust from behind Krishna
      for (let i = 0; i < dust.length; i++) {
        const d = dust[i];
        if (dtSec > 0) {
          d.x += d.vx * dtSec * 22;
          d.y += d.vy * dtSec * 22;
          if (!isMobileLayout && d.x > width + 8) {
            d.x = width * 0.46;
            d.y = height * (0.14 + ((i * 37) % 72) / 100);
          } else if (isMobileLayout && d.y > height + 8) {
            d.y = height * 0.48;
            d.x = width * (0.12 + ((i * 41) % 76) / 100);
          }
        }
        const edgeFade = isMobileLayout
          ? Math.max(0, Math.min(1, (d.y - height * 0.46) / (height * 0.1)))
          : Math.max(0, Math.min(1, (d.x - width * 0.44) / (width * 0.1)));
        ctx.globalAlpha = d.alpha * edgeFade;
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Occasional subtle shooting star in deep-space upper-right quadrant
      if (dtSec > 0 && !reducedMotion) {
        if (!shooter.active) {
          shooter.cooldown -= dtSec;
          if (shooter.cooldown <= 0) {
            shooter.active = true;
            shooter.x = isMobileLayout ? width * 0.18 : width * (0.62 + (Math.sin(tSec * 1.7) * 0.12 + 0.12));
            shooter.y = isMobileLayout ? height * 0.54 : height * (0.08 + (Math.cos(tSec * 1.3) * 0.08 + 0.08));
            shooter.vx = isMobileLayout ? 180 : 280;
            shooter.vy = isMobileLayout ? 95 : 118;
            shooter.len = isMobileLayout ? 48 : 74;
            shooter.life = 0;
            shooter.maxLife = 0.85;
            shooter.cooldown = 6.5 + ((Math.abs(Math.sin(tSec)) * 3.5));
          }
        } else {
          shooter.life += dtSec;
          shooter.x += shooter.vx * dtSec;
          shooter.y += shooter.vy * dtSec;
          const progress = shooter.life / shooter.maxLife;
          if (progress >= 1) {
            shooter.active = false;
          } else {
            const fade = Math.sin(progress * Math.PI);
            const norm = Math.hypot(shooter.vx, shooter.vy) || 1;
            const tx = shooter.x - (shooter.vx / norm) * shooter.len;
            const ty = shooter.y - (shooter.vy / norm) * shooter.len;
            const grad = ctx.createLinearGradient(tx, ty, shooter.x, shooter.y);
            grad.addColorStop(0, 'rgba(255, 245, 210, 0)');
            grad.addColorStop(0.7, `rgba(176, 224, 255, ${(0.5 * fade).toFixed(3)})`);
            grad.addColorStop(1, `rgba(255, 252, 236, ${(0.95 * fade).toFixed(3)})`);
            ctx.globalAlpha = 1;
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(tx, ty);
            ctx.lineTo(shooter.x, shooter.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
    };

    initScene();
    drawFrame(0, 0);

    let lastTime = performance.now();
    let elapsedTotal = 0;
    let drawAccum = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - lastTime) / 1000));
      lastTime = now;
      if (playingRef.current) {
        elapsedTotal += dt;
        drawAccum += dt;
        // Smooth ~30 Hz canvas paint cadence preserves silky 55–60 FPS page compositing
        if (drawAccum >= 0.032) {
          drawFrame(drawAccum, elapsedTotal);
          drawAccum = 0;
        }
      }
      rafId = window.requestAnimationFrame(tick);
    };

    if (!reducedMotion) {
      rafId = window.requestAnimationFrame(tick);
    }

    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            initScene();
            drawFrame(0, elapsedTotal);
          })
        : null;
    ro?.observe(canvas);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      ro?.disconnect();
    };
  }, [reducedMotion]);

  return (
    <div
      className={styles.cosmicRoot}
      aria-hidden="true"
      data-testid="academy-cosmic-universe"
    >
      {/* LAYER 03 & LAYER 05 — Feathered Deep-Space Cosmos + Animated Nebula Clouds */}
      <div className={styles.cosmicSpaceMask} data-testid="academy-cosmic-nebula">
        <div className={styles.cosmicSpaceBase} />
        <img
          src="/assets/new-site/enterprise/academy/cosmic-nebula-backdrop.webp"
          alt=""
          className={styles.cosmicNebulaImg}
          loading="eager"
        />
        <div className={styles.cosmicNebulaDrift} />
      </div>

      {/* LAYER 04 — Adaptive HTML5 Canvas Twinkling Starfield, Outward Dust & Shooting Stars */}
      <canvas
        ref={canvasRef}
        className={styles.starfieldCanvas}
        data-testid="academy-starfield-canvas"
      />

      {/* LAYER 06 — Slowly Rotating (84s) & Expanding (32s) Photorealistic Spiral Galaxy */}
      <div className={styles.galaxyExpandStage} data-testid="academy-spiral-galaxy">
        <div className={styles.galaxyTiltPlane}>
          <img
            src="/assets/new-site/enterprise/academy/cosmic-spiral-galaxy.webp"
            alt=""
            className={styles.galaxySpinImg}
            loading="eager"
          />
          <span className={styles.galaxyCorePulse} />
        </div>
      </div>

      {/* LAYER 07 — Planetary Systems (Upper Marbled Planet, Distant Moons & Glowing Bottom Horizon) */}
      <div className={styles.planetUpperOrbit} data-testid="academy-planet-upper">
        <span className={styles.planetUpperRimGlow} />
        <img
          src="/assets/new-site/enterprise/academy/cosmic-planet-upper.webp"
          alt=""
          className={styles.planetUpperImg}
          loading="lazy"
        />
      </div>

      <div className={styles.planetHorizonOrbit} data-testid="academy-planet-horizon">
        <img
          src="/assets/new-site/enterprise/academy/cosmic-planet-horizon.webp"
          alt=""
          className={styles.planetHorizonImg}
          loading="lazy"
        />
      </div>

      {/* Subtle Distant Planetary Moons (Depth Accents matching reference) */}
      <span className={styles.distantMoonMid} />
      <span className={styles.distantMoonRight} />

      {/* LAYER 08 — Curved Golden, Violet & Electric-Blue Cosmic Energy Streams (14s sequential loop) */}
      <svg
        className={styles.cosmicEnergySvg}
        viewBox="0 0 1340 688"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
        focusable="false"
        data-testid="academy-golden-energy-trails"
      >
        <defs>
          <linearGradient id="nnCosmicVioletStream" x1="0%" y1="10%" x2="100%" y2="90%">
            <stop offset="0%" stopColor="#ffd97d" stopOpacity="0.88" />
            <stop offset="28%" stopColor="#d16bff" stopOpacity="0.82" />
            <stop offset="62%" stopColor="#65b2ff" stopOpacity="0.78" />
            <stop offset="100%" stopColor="#ff9ce0" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="nnCosmicElectricBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff6d4" stopOpacity="0.92" />
            <stop offset="40%" stopColor="#72c2ff" stopOpacity="0.85" />
            <stop offset="76%" stopColor="#c77cff" stopOpacity="0.78" />
            <stop offset="100%" stopColor="#ffe188" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="nnCosmicGoldTravel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffef5" stopOpacity="1" />
            <stop offset="48%" stopColor="#ffdc7a" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#f59e42" stopOpacity="0.92" />
          </linearGradient>

          <radialGradient id="nnCosmicNodeFlare" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fffef4" stopOpacity="0.92" />
            <stop offset="35%" stopColor="#ffd97d" stopOpacity="0.48" />
            <stop offset="70%" stopColor="#b876ff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#b876ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Wide Ambient Violet & Electric-Blue Orbital Stream */}
        <g className={styles.energyOrbitalGroup}>
          <path
            d={COSMIC_ENERGY_PATH}
            fill="none"
            stroke="url(#nnCosmicVioletStream)"
            strokeWidth="22"
            strokeOpacity="0.16"
            strokeLinecap="round"
          />
          <path
            d={COSMIC_ENERGY_PATH}
            fill="none"
            stroke="url(#nnCosmicElectricBlue)"
            strokeWidth="8"
            strokeOpacity="0.28"
            strokeLinecap="round"
          />
          <path
            d={COSMIC_ENERGY_PATH}
            fill="none"
            stroke="#ffe6a8"
            strokeWidth="1.6"
            strokeOpacity="0.58"
            strokeLinecap="round"
          />

          {/* Sweeping Secondary Planetary Orbital Arcs */}
          <path
            d={SECONDARY_ORBIT_ARC_1}
            fill="none"
            stroke="url(#nnCosmicElectricBlue)"
            strokeWidth="4.5"
            strokeOpacity="0.26"
            strokeLinecap="round"
          />
          <path
            d={SECONDARY_ORBIT_ARC_1}
            pathLength={400}
            fill="none"
            stroke="#c6e8ff"
            strokeWidth="1.5"
            strokeOpacity="0.72"
            strokeLinecap="round"
            className={styles.cosmicSecondaryGlint}
          />
          <path
            d={SECONDARY_ORBIT_ARC_2}
            fill="none"
            stroke="url(#nnCosmicVioletStream)"
            strokeWidth="4"
            strokeOpacity="0.24"
            strokeLinecap="round"
          />
          <path
            d={SECONDARY_ORBIT_ARC_3}
            fill="none"
            stroke="url(#nnCosmicElectricBlue)"
            strokeWidth="5"
            strokeOpacity="0.28"
            strokeLinecap="round"
          />
          <path
            d={SECONDARY_ORBIT_ARC_3}
            pathLength={400}
            fill="none"
            stroke="#ffe69e"
            strokeWidth="1.8"
            strokeOpacity="0.76"
            strokeLinecap="round"
            className={styles.cosmicSecondaryGlintSlow}
          />
        </g>

        {/* Continuous Sequential Golden Travelling Cosmic Energy Pulse (14s synced to 5 glimpses) */}
        <g>
          <path
            d={COSMIC_ENERGY_PATH}
            pathLength={1000}
            fill="none"
            stroke="#c878ff"
            strokeWidth="24"
            strokeOpacity="0.22"
            strokeLinecap="round"
            className={styles.cosmicBeamOuter}
          />
          <path
            d={COSMIC_ENERGY_PATH}
            pathLength={1000}
            fill="none"
            stroke="url(#nnCosmicGoldTravel)"
            strokeWidth="8.5"
            strokeOpacity="0.78"
            strokeLinecap="round"
            className={styles.cosmicBeamOuter}
          />
          <path
            d={COSMIC_ENERGY_PATH}
            pathLength={1000}
            fill="none"
            stroke="#fffef6"
            strokeWidth="2.8"
            strokeLinecap="round"
            className={styles.cosmicBeamCore}
          />
        </g>

        {/* Subtle Luminous Energy Flares Along Curved Ribbon Turns */}
        <ellipse cx="972" cy="48" rx="92" ry="22" fill="url(#nnCosmicNodeFlare)" opacity="0.65" />
        <ellipse cx="1178" cy="294" rx="100" ry="24" fill="url(#nnCosmicNodeFlare)" opacity="0.68" />
        <ellipse cx="964" cy="656" rx="112" ry="24" fill="url(#nnCosmicNodeFlare)" opacity="0.72" />
      </svg>

      {/* LAYER 09 — Krishna's Soft Golden Divine Aura & Cosmic Portal Glow (8s breathing) */}
      <div className={styles.krishnaDivineAura} data-testid="academy-divine-aura" />

      {/* LAYER 12 — Subtle Foreground Decorative Cosmic Light Particles */}
      <svg
        className={styles.foregroundParticlesSvg}
        viewBox="0 0 1340 688"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
        focusable="false"
        data-testid="academy-foreground-particles"
      >
        {FOREGROUND_SPARKLES.map((sp) => {
          const s = sp.r * 2.5;
          return (
            <g
              key={sp.id}
              className={`${styles.cosmicSparkleNode} ${
                sp.desktopOnly ? styles.particleDesktopOnly : ''
              }`}
              style={{ animationDuration: sp.dur, animationDelay: sp.delay }}
            >
              <path
                d={`M ${sp.cx} ${sp.cy - s} Q ${sp.cx} ${sp.cy} ${sp.cx + s} ${sp.cy} Q ${sp.cx} ${sp.cy} ${sp.cx} ${sp.cy + s} Q ${sp.cx} ${sp.cy} ${sp.cx - s} ${sp.cy} Q ${sp.cx} ${sp.cy} ${sp.cx} ${sp.cy - s} Z`}
                fill="#fffdf2"
                opacity="0.92"
              />
              <circle cx={sp.cx} cy={sp.cy} r={sp.r * 0.9} fill="#ffd982" opacity="0.68" />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
