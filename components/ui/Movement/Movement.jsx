'use client';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading/SectionHeading';
import { movementData } from '@/constants/websiteData';

// Simplified India SVG with Manipur highlighted
// Manipur is roughly in the northeast region
function IndiaMap() {
  return (
    <svg
      className="movement__svg"
      viewBox="0 0 500 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Map of India with Manipur highlighted in the northeast"
    >
      {/* India outline — simplified path */}
      <path
        d="M200,30 L220,25 L255,30 L275,20 L300,28 L320,22 L340,30 L355,25 L370,35 L380,45 L375,60 L385,75 L390,90 L385,105 L395,120 L390,140 L400,155 L395,175 L405,195 L400,215 L410,230 L405,250 L395,265 L400,285 L390,300 L385,320 L375,335 L370,355 L360,370 L350,385 L340,395 L330,410 L320,420 L315,430 L310,445 L305,460 L300,470 L295,480 L290,490 L285,495 L280,490 L275,480 L270,468 L265,455 L260,445 L255,458 L250,470 L245,480 L240,490 L235,498 L230,505 L225,510 L220,500 L215,488 L210,475 L205,462 L200,450 L195,438 L190,425 L185,412 L180,400 L175,388 L170,376 L165,365 L160,352 L155,340 L148,328 L142,315 L138,302 L135,290 L132,278 L128,265 L130,252 L125,240 L120,228 L118,215 L120,200 L115,185 L110,170 L108,155 L112,140 L115,125 L118,110 L115,95 L118,80 L125,65 L135,52 L148,42 L162,35 L178,30 L195,28 Z"
        fill="rgba(212,175,55,0.06)"
        stroke="rgba(212,175,55,0.35)"
        strokeWidth="1.5"
      />

      {/* State borders — simplified internal lines */}
      <path
        d="M200,30 L200,150 M250,50 L250,200 M300,60 L300,200 M150,150 L380,150 M140,250 L390,250 M160,350 L370,350"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="0.8"
      />

      {/* Manipur — northeast highlight */}
      <ellipse
        cx="370"
        cy="285"
        rx="22"
        ry="28"
        fill="rgba(212,175,55,0.25)"
        stroke="var(--accent-gold)"
        strokeWidth="2"
      />

      {/* Glow pulse around Manipur */}
      <motion.ellipse
        cx="370"
        cy="285"
        rx="22"
        ry="28"
        fill="none"
        stroke="var(--accent-gold)"
        strokeWidth="2"
        initial={{ scale: 1, opacity: 0.8 }}
        animate={{ scale: 2.5, opacity: 0 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
        style={{ transformOrigin: '370px 285px' }}
      />
      <motion.ellipse
        cx="370"
        cy="285"
        rx="22"
        ry="28"
        fill="none"
        stroke="var(--accent-saffron)"
        strokeWidth="1"
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
        style={{ transformOrigin: '370px 285px' }}
      />

      {/* Animated light particles from across India toward Manipur */}
      {[
        { x: 200, y: 280, delay: 0 },
        { x: 160, y: 200, delay: 0.4 },
        { x: 240, y: 180, delay: 0.8 },
        { x: 150, y: 340, delay: 1.2 },
        { x: 300, y: 160, delay: 0.2 },
        { x: 280, y: 340, delay: 1.6 },
        { x: 200, y: 380, delay: 0.6 },
        { x: 250, y: 420, delay: 1.0 },
        { x: 180, y: 150, delay: 0.3 },
        { x: 330, y: 240, delay: 1.4 },
        { x: 220, y: 480, delay: 2.0 },
        { x: 140, y: 260, delay: 0.7 },
      ].map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3"
          fill="var(--accent-gold)"
          initial={{ cx: p.x, cy: p.y, opacity: 0, scale: 0 }}
          animate={{
            cx: [p.x, 370],
            cy: [p.y, 285],
            opacity: [0, 0.9, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: p.delay,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Manipur label */}
      <text
        x="370"
        y="325"
        textAnchor="middle"
        fill="var(--accent-gold)"
        fontSize="11"
        fontFamily="'Khand', sans-serif"
        fontWeight="600"
        letterSpacing="1"
      >
        MANIPUR
      </text>

      {/* India label */}
      <text
        x="240"
        y="260"
        textAnchor="middle"
        fill="rgba(245,245,245,0.2)"
        fontSize="18"
        fontFamily="'Cinzel', serif"
        fontWeight="400"
      >
        INDIA
      </text>
    </svg>
  );
}

export default function Movement() {
  return (
    <section
      className="movement section section--secondary"
      id="movement"
      aria-labelledby="movement-heading"
    >
      <div className="container">
        <div className="movement__header">
          <SectionHeading
            preTitle={movementData.preTitle}
            title={movementData.headline}
            subtitle={movementData.subheadline}
            center
          />
        </div>

        <motion.div
          className="movement__map-container"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <IndiaMap />
        </motion.div>

        <motion.div
          className="movement__body"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="movement__text">{movementData.body}</p>
          <p className="movement__stat">{movementData.stat}</p>
        </motion.div>
      </div>
    </section>
  );
}
