'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
   INDIA MAP — Accurate Handcrafted SVG Silhouette (512x512)
   All paths are sourced from the user's exact provided SVG.
   Manipur sits at approximately cx=445, cy=197.
   ───────────────────────────────────────────────────────────── */

const INDIA_PATHS = [
  // North / Saffron region
  'm211.883 152.199 6.499-24.785a5.176 5.176 0 0 0-3.329-6.209l-5.01-1.716a5.17 5.17 0 0 1-2.654-2.063l-17.191-26.281c-1.954-2.988-.368-7.011 3.1-7.86 3.339-.818 4.968-4.602 3.266-7.589l-2.301-4.039a5.18 5.18 0 0 1-.156-4.829l17.108-35.121a5.175 5.175 0 0 0-1.983-6.7l-11.116-6.694a5.2 5.2 0 0 0-2.943-.734l-34.512 1.826a5.2 5.2 0 0 1-2.352-.429L116.021.436a5.18 5.18 0 0 0-4.737.3L95.962 9.908c-3.012 1.803-3.393 6.018-.754 8.332l8.998 7.887a5.18 5.18 0 0 1 1.762 3.763l.718 28.926a5.17 5.17 0 0 0 1.362 3.372l22.072 24.035a5.175 5.175 0 0 1 .714 6.011l-18.581 33.496c-1.635 2.949.399 6.654-2.062 9.359l-24.87 27.335 76.288 11.434 74.226-11.434z',
  // South region
  'm185.944 324.485-86.786 11.434 22.16 59.893 39.799 107.571c2.546 6.882 10.221 10.363 17.077 7.744a13.3 13.3 0 0 0 6.883-6.025c.957-1.754 1.714-3.564 2.973-5.141 1.829-2.291 3.718-4.539 5.576-6.808l12.49-14.979a13.2 13.2 0 0 0 2.856-6.138l6.574-36.968a13.2 13.2 0 0 0-.465-6.458l-2.573-7.764a13.2 13.2 0 0 1-.002-8.291l6.814-20.599a13.2 13.2 0 0 1 5.6-7.086l4.239-2.614a13.2 13.2 0 0 1 5.375-1.872l1.468-.174a13.2 13.2 0 0 0 9.089-5.296c1.984-2.703 3.832-5.588 5.985-8.157 3.758-4.486 9.442-4.745 13.424-8.729l10.01-10.014a13.2 13.2 0 0 0 2.852-4.264l3.254-7.834z',
  // South Edge
  'm121.316 395.813 39.799 107.571c2.546 6.882 10.221 10.363 17.077 7.744a13.3 13.3 0 0 0 6.883-6.025c.957-1.754 1.714-3.564 2.973-5.141 1.829-2.291 3.718-4.539 5.576-6.808l12.49-14.979a13.2 13.2 0 0 0 2.856-6.138l6.574-36.968a13.2 13.2 0 0 0-.465-6.458l-2.573-7.764a13.2 13.2 0 0 1-.002-8.291l6.814-20.599a13.2 13.2 0 0 1 5.601-7.086l4.239-2.614a13.2 13.2 0 0 1 5.375-1.872l1.468-.174a13.2 13.2 0 0 0 9.089-5.296c1.984-2.703 3.832-5.588 5.985-8.157 3.758-4.486 9.442-4.745 13.424-8.729l10.01-10.014a13.2 13.2 0 0 0 2.852-4.264l3.254-7.834h-60.367c-27.309 27.32-61.129 48.125-98.932 59.896',
  // East / Northeast region
  'm476.494 162.424-7.908-11.647a4.49 4.49 0 0 0-3.83-1.966l-27.52.72a4.49 4.49 0 0 0-3.614 1.994l-2.472 3.702a4.5 4.5 0 0 1-1.313 1.288l-9.232 5.908-23.15 14.815a4.48 4.48 0 0 0-2.049 3.363l-.87 9.319a4.49 4.49 0 0 1-4.468 4.071h-18.179a4.5 4.5 0 0 1-2.835-1.009l-22.212-18.096c-2.273-1.851-5.682-1.062-6.91 1.599l-9.884 21.416a4.49 4.49 0 0 1-5.837 2.247l-34.12-14.566c-4.901 58.534-30.661 111.138-69.843 150.334h60.366l1.427-3.436a4.5 4.5 0 0 1 1.983-2.211l29.741-16.344a4.5 4.5 0 0 0 2.293-3.382l1.421-11.483a4.5 4.5 0 0 1 1.728-3.014l14.236-10.889a4.5 4.5 0 0 1 3.603-.837l10.002 1.992c3.27.651 6.083-2.363 5.207-5.581l-13.619-50.025a4.49 4.49 0 0 1 2.612-5.325l23.214-9.623a4.49 4.49 0 0 1 4.173.389l13.199 8.625a4.5 4.5 0 0 0 1.966.704l14.753 1.619c3.359.368 5.121 4.177 3.228 6.976l-8.943 13.223c-2.072 3.064.244 7.178 3.938 6.998a4.49 4.49 0 0 1 3.785 1.755l10.585 13.83c2.397 3.132 7.379 1.871 7.997-2.024l3.102-19.535a4.49 4.49 0 0 1 5.277-3.705l6.798 1.302a4.49 4.49 0 0 0 5.277-3.702l4.092-25.693c.549-3.444 4.479-5.659 5.621-8.902 1.198-3.402-.38-9.262 4-10.784l25.214-8.761a4.49 4.49 0 0 0 2.918-3.309l2.038-9.614a4.5 4.5 0 0 0-.678-3.452z',
  // Saffron transition
  'M220.246 335.919H99.158l22.16 59.893c37.801-11.77 71.621-32.575 98.928-59.893',
  // West / Central region
  'm85.321 162.424-9.795 10.764a3.65 3.65 0 0 1-3.812 1.019l-15.667-5.02a3.65 3.65 0 0 0-4.567 2.297l-6.841 20.06a3.65 3.65 0 0 0 1.236 4.075l3.396 2.598c.449.344.813.788 1.061 1.295l12.585 25.756c.234.48.361 1.006.37 1.541l.164 9.796a3.65 3.65 0 0 1-2.417 3.495l-30.188 10.821c-3.036 1.089-3.27 5.292-.374 6.711l11.606 5.686c2.685 1.315 2.735 5.124.086 6.51l-3.936 2.059a3.65 3.65 0 0 0-1.338 5.267l10.265 15.288c.356.529.843.956 1.414 1.238l17.646 8.705a3.65 3.65 0 0 0 4.514-1.059l14.137-18.532c2.151-2.819 6.651-1.223 6.547 2.32l-.101 3.433a3.6 3.6 0 0 0 .286 1.525l6.987 16.557a3.65 3.65 0 0 1 .223 2.1L95.7 325.077a3.67 3.67 0 0 0 .162 1.947l3.291 8.895h121.089c39.182-39.197 64.942-91.8 69.843-150.334l-54.253-23.161z',
];

// Targetable Manipur path in 512x512 space (lower-right quadrant of Northeast region)
const MANIPUR_PATH = `
  M 436,191
  C 440,187 447,185 451,189
  C 455,193 457,199 454,204
  C 450,207 443,207 439,204
  C 436,200 434,195 436,191 Z
`;

const MANIPUR_CX = 445;
const MANIPUR_CY = 197;

// Internal grids & curves to generate premium depth inside clipping path
const TOPO_LINES = [
  'M 120,80 Q 180,60 240,75 Q 300,90 360,75',
  'M 100,120 Q 170,105 230,115 Q 300,125 370,110',
  'M 80,170 Q 150,155 220,165 Q 290,175 360,150',
  'M 70,220 Q 140,210 210,215 Q 280,220 350,200',
  'M 80,270 Q 150,260 215,268 Q 285,275 350,250',
  'M 90,320 Q 150,310 210,318 Q 275,325 340,300',
  'M 100,370 Q 160,360 220,368 Q 275,375 330,350',
  'M 110,420 Q 165,410 220,418 Q 270,425 320,400',
  'M 130,470 Q 175,460 220,468 Q 260,475 300,450',
];

const VERTICAL_LINES = [120, 160, 200, 240, 280, 320, 360, 400, 440];
const HORIZONTAL_LINES = [60, 110, 160, 210, 260, 310, 360, 410, 460];

const RINGS = [
  { delay: 0, duration: 3.5 },
  { delay: 1.1, duration: 3.5 },
  { delay: 2.2, duration: 3.5 },
];

function NationalRipple({ cx, cy }) {
  return (
    <>
      {[0, 1.6, 3.2].map((delay, i) => (
        <motion.circle
          key={`ripple-${i}`}
          cx={cx}
          cy={cy}
          r={8}
          fill="none"
          stroke="rgba(212,175,55,0.18)"
          strokeWidth={1.2}
          initial={{ r: 8, opacity: 0.6 }}
          animate={{ r: 240, opacity: 0 }}
          transition={{
            duration: 6,
            delay,
            repeat: Infinity,
            ease: [0.15, 0.45, 0.7, 1],
          }}
        />
      ))}
    </>
  );
}

// Particle details configuration for gathering lights (optimized for performance)
const LIGHTS_COUNT = 90;

export default function IndiaMap() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });
  const mapControls = useAnimation();
  const manipurControls = useAnimation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Stable generation of particles on initial paint
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < LIGHTS_COUNT; i++) {
      // Coordinates distributed across India's active bounds
      const x = Math.random() * 380 + 70; // 70 to 450
      const y = Math.random() * 410 + 40; // 40 to 450
      const duration = Math.random() * 4.2 + 3.2; // 3.2s to 7.4s
      const delay = Math.random() * 7; // staggered entries
      const size = Math.random() * 0.8 + 0.55; // 0.55px to 1.35px
      
      // Calculate a slightly curved midway point to create organic flow paths
      const midX = x + (MANIPUR_CX - x) * 0.45 + (Math.random() * 30 - 15);
      const midY = y + (MANIPUR_CY - y) * 0.45 + (Math.random() * 30 - 15);

      // Relative delta offsets for GPU hardware acceleration
      const dx = MANIPUR_CX - x;
      const dy = MANIPUR_CY - y;
      const midDx = midX - x;
      const midDy = midY - y;

      arr.push({ x, y, dx, dy, midDx, midDy, duration, delay, size });
    }
    return arr;
  }, []);

  useEffect(() => {
    if (isInView) {
      mapControls.start('visible');
      setTimeout(() => manipurControls.start('glow'), 1200);
    }
  }, [isInView, mapControls, manipurControls]);

  const mapVariants = {
    hidden: { opacity: 0, scale: 0.88, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const manipurGlowVariants = {
    idle: {
      filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.3))',
      opacity: 0.85,
    },
    glow: {
      filter: [
        'drop-shadow(0 0 6px rgba(212,175,55,0.35))',
        'drop-shadow(0 0 20px rgba(212,175,55,0.85))',
        'drop-shadow(0 0 11px rgba(212,175,55,0.55))',
        'drop-shadow(0 0 24px rgba(212,175,55,0.9))',
        'drop-shadow(0 0 8px rgba(212,175,55,0.4))',
      ],
      opacity: [0.85, 1, 0.92, 1, 0.88],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const beaconVariants = {
    pulse: {
      scale: [1, 1.15, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="india-map-wrapper" ref={containerRef} aria-label="India map highlighting Manipur with gathering lights">
      <motion.svg
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        className="india-map-svg"
        initial="hidden"
        animate={mapControls}
        variants={mapVariants}
        role="img"
        aria-describedby="map-desc"
      >
        <title>India Map — Gathering Lights to Manipur</title>
        <desc id="map-desc">
          An accurate geographic silhouette of India with thousands of tiny lights flowing from all regions of India to gather around Manipur, showing unity and solidarity.
        </desc>

        {/* ── Defs: Filters & Gradients ── */}
        <defs>
          {/* Gold radial gradient for Manipur fill */}
          <radialGradient id="manipurGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#A67C2D" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#6B4F1A" stopOpacity="0.2" />
          </radialGradient>

          {/* Gold gradient for India fill */}
          <linearGradient id="indiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#A67C2D" stopOpacity="0.03" />
          </linearGradient>

          {/* Glow filter for India outline */}
          <filter id="indiaGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Stronger glow for Manipur */}
          <filter id="manipurGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Beacon core glow */}
          <filter id="beaconGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Clip path for internal details & particles to stay within India */}
          <clipPath id="indiaClip">
            {INDIA_PATHS.map((d, index) => (
              <path key={`clip-${index}`} d={d} />
            ))}
          </clipPath>
        </defs>

        {/* ════════════════════════════════════════
            GROUP 1 — India Map Base
            ════════════════════════════════════════ */}
        <g id="india-map">
          {/* Shadow / depth layer */}
          {INDIA_PATHS.map((d, index) => (
            <path
              key={`shadow-${index}`}
              d={d}
              fill="rgba(0,0,0,0.4)"
              transform="translate(4, 6)"
            />
          ))}

          {/* Main India silhouette regions */}
          {INDIA_PATHS.map((d, index) => (
            <path
              key={`region-${index}`}
              d={d}
              fill="url(#indiaGrad)"
              stroke="#D4AF37"
              strokeWidth="0.85"
              strokeLinejoin="round"
              filter="url(#indiaGlow)"
            />
          ))}
        </g>

        {/* ════════════════════════════════════════
            GROUP 2 — Internal Subtle Details
            ════════════════════════════════════════ */}
        <g id="internal-lines" clipPath="url(#indiaClip)">
          {/* Grid verticals */}
          {VERTICAL_LINES.map((x) => (
            <line
              key={`v-${x}`}
              x1={x} y1="0" x2={x} y2="512"
              stroke="rgba(212,175,55,0.045)"
              strokeWidth="0.5"
            />
          ))}
          {/* Grid horizontals */}
          {HORIZONTAL_LINES.map((y) => (
            <line
              key={`h-${y}`}
              x1="0" y1={y} x2="512" y2={y}
              stroke="rgba(212,175,55,0.045)"
              strokeWidth="0.5"
            />
          ))}
          {/* Topographic / storytelling curves */}
          {TOPO_LINES.map((d, i) => (
            <path
              key={`topo-${i}`}
              d={d}
              fill="none"
              stroke="rgba(212,175,55,0.065)"
              strokeWidth="0.65"
              strokeLinecap="round"
            />
          ))}
          {/* Subtle diagonal network paths */}
          <path
            d="M 120,100 L 220,180 L 180,290 L 260,380 L 180,480"
            fill="none"
            stroke="rgba(212,175,55,0.04)"
            strokeWidth="0.8"
            strokeDasharray="4 8"
          />
          <path
            d="M 280,70 L 160,190 L 230,300 L 150,420"
            fill="none"
            stroke="rgba(212,175,55,0.03)"
            strokeWidth="0.8"
            strokeDasharray="3 10"
          />
          {/* Constellation dots */}
          {[
            [140, 110], [180, 160], [220, 130], [160, 220], [200, 250],
            [240, 200], [150, 300], [190, 330], [230, 300], [170, 390],
            [210, 410], [150, 440], [175, 460],
          ].map(([cx, cy], i) => (
            <circle
              key={`dot-${i}`}
              cx={cx} cy={cy} r="1.1"
              fill="rgba(212,175,55,0.14)"
            />
          ))}
          {/* Connector lines between dots */}
          <path
            d="M 140,110 L 180,160 M 180,160 L 220,130 M 180,160 L 160,220 M 220,130 L 240,200 M 160,220 L 200,250 M 200,250 L 240,200 M 160,220 L 150,300 M 240,200 L 230,300 M 150,300 L 190,330 M 190,330 L 230,300 M 150,300 L 170,390 M 190,330 L 210,410 M 170,390 L 210,410 M 170,390 L 150,440 M 210,410 L 175,460 M 150,440 L 175,460"
            fill="none"
            stroke="rgba(212,175,55,0.05)"
            strokeWidth="0.45"
          />
        </g>

        {/* ════════════════════════════════════════
            GATHERING LIGHTS — Flowing particles
            ════════════════════════════════════════ */}
        {mounted && (
          <g id="gathering-lights" clipPath="url(#indiaClip)">
            {particles.map((p, idx) => (
              <motion.circle
                key={`light-${idx}`}
                cx={p.x}
                cy={p.y}
                r={p.size}
                fill="#FFF5C0"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                animate={{
                  x: [0, p.midDx, p.dx],
                  y: [0, p.midDy, p.dy],
                  opacity: [0, 0.9, 1, 0],
                  scale: [0.5, 1.2, 0.3],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: [0.4, 0.0, 0.2, 1], // easeIn/out blend for organic flight speed
                }}
              />
            ))}
          </g>
        )}

        {/* ════════════════════════════════════════
            GROUP 3 — National Ripple Wave
            ════════════════════════════════════════ */}
        <g id="national-ripple" clipPath="url(#indiaClip)">
          <NationalRipple cx={MANIPUR_CX} cy={MANIPUR_CY} />
        </g>

        {/* ════════════════════════════════════════
            GROUP 4 — Manipur State
            ════════════════════════════════════════ */}
        <g id="manipur-state">
          <motion.path
            id="manipur"
            d={MANIPUR_PATH}
            fill="url(#manipurGrad)"
            stroke="#D4AF37"
            strokeWidth="1.3"
            strokeLinejoin="round"
            filter="url(#manipurGlow)"
            initial="idle"
            animate={manipurControls}
            variants={manipurGlowVariants}
          />
        </g>

        {/* ════════════════════════════════════════
            GROUP 5 — Signal Rings
            ════════════════════════════════════════ */}
        <g id="signal-rings">
          {RINGS.map(({ delay, duration }, i) => (
            <motion.circle
              key={`ring-${i}`}
              cx={MANIPUR_CX}
              cy={MANIPUR_CY}
              r={7}
              fill="none"
              stroke="rgba(212,175,55,0.55)"
              strokeWidth={0.8}
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 3.5, opacity: 0 }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: [0.2, 0.8, 0.6, 1],
              }}
              style={{ transformOrigin: `${MANIPUR_CX}px ${MANIPUR_CY}px` }}
            />
          ))}
        </g>

        {/* ════════════════════════════════════════
            GROUP 6 — Manipur Marker (Luxury Beacon)
            ════════════════════════════════════════ */}
        <g id="manipur-marker">
          {/* Outer ambient halo */}
          <motion.circle
            cx={MANIPUR_CX}
            cy={MANIPUR_CY}
            r={14}
            fill="rgba(212,175,55,0.08)"
            animate={{
              r: [14, 18, 14],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Ring 2 — medium */}
          <motion.circle
            className="ring-2"
            cx={MANIPUR_CX}
            cy={MANIPUR_CY}
            r={9}
            fill="none"
            stroke="rgba(212,175,55,0.35)"
            strokeWidth={0.8}
            animate={{
              r: [9, 11, 9],
              opacity: [0.35, 0.6, 0.35],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />

          {/* Ring 1 — inner */}
          <motion.circle
            className="ring-1"
            cx={MANIPUR_CX}
            cy={MANIPUR_CY}
            r={6}
            fill="rgba(212,175,55,0.12)"
            stroke="rgba(212,175,55,0.65)"
            strokeWidth={0.8}
            animate={{
              r: [6, 7.5, 6],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
          />

          {/* Core dot */}
          <motion.circle
            className="core"
            cx={MANIPUR_CX}
            cy={MANIPUR_CY}
            r={3.2}
            fill="#D4AF37"
            filter="url(#beaconGlow)"
            variants={beaconVariants}
            animate="pulse"
          />

          {/* Inner bright centre */}
          <circle
            cx={MANIPUR_CX}
            cy={MANIPUR_CY}
            r={1.2}
            fill="#FFF5C0"
          />
        </g>

        {/* ════════════════════════════════════════
            GROUP 7 — Labels
            ════════════════════════════════════════ */}
        <g id="labels" style={{ pointerEvents: 'none' }}>
          {/* INDIA label */}
          <text
            x="190"
            y="280"
            fill="rgba(212,175,55,0.18)"
            fontSize="14"
            fontFamily="'Cinzel', serif"
            letterSpacing="0.25em"
            textAnchor="middle"
            fontWeight="600"
          >
            INDIA
          </text>

          {/* MANIPUR label with connector line */}
          <motion.g
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Connector line from label to beacon */}
            <line
              x1={MANIPUR_CX - 12}
              y1={MANIPUR_CY}
              x2={MANIPUR_CX - 45}
              y2={MANIPUR_CY}
              stroke="rgba(212,175,55,0.4)"
              strokeWidth="0.6"
              strokeDasharray="2 3"
            />
            {/* Label background */}
            <rect
              x={MANIPUR_CX - 110}
              y={MANIPUR_CY - 10}
              width="62"
              height="18"
              rx="3"
              fill="rgba(5,5,5,0.85)"
              stroke="rgba(212,175,55,0.25)"
              strokeWidth="0.6"
            />
            <text
              x={MANIPUR_CX - 79}
              y={MANIPUR_CY + 2}
              fill="#D4AF37"
              fontSize="7.5"
              fontFamily="'Khand', sans-serif"
              letterSpacing="0.18em"
              textAnchor="middle"
              fontWeight="600"
            >
              MANIPUR
            </text>
          </motion.g>
        </g>
      </motion.svg>

      {/* ── Ambient background glow beneath map ── */}
      <div className="india-map-glow" aria-hidden="true" />
    </div>
  );
}
