'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { heroData } from '@/constants/websiteData';
import IndiaMap from './IndiaMap';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleCta = (e) => {
    e.preventDefault();
    document.querySelector('#contribution')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="hero"
      id="story"
      ref={ref}
      aria-label="Hero — India For Manipur"
    >
      {/* Background Image */}
      <motion.div className="hero__bg" style={{ y: bgY }}>
        <Image
          src="/images/hero_before.png"
          alt="Traditional Manipuri women performing Ras Lila dance at a cultural festival"
          fill
          priority
          className="hero__bg-image"
          sizes="100vw"
        />
      </motion.div>
      <div className="hero__overlay" aria-hidden="true" />

      {/* Content */}
      <motion.div
        className="hero__content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ opacity }}
      >
        <motion.p className="hero__pre-title" variants={itemVariants}>
          {heroData.preTitle}
        </motion.p>

        <motion.h1
          className="hero__headline"
          variants={itemVariants}
        >
          {heroData.headline}
        </motion.h1>

        <motion.p className="hero__subheadline" variants={itemVariants}>
          {heroData.subheadline}
        </motion.p>

        <motion.div className="hero__map-wrapper" variants={itemVariants}>
          <IndiaMap />
        </motion.div>

        <motion.div variants={itemVariants}>
          <a
            href="#contribution"
            className="hero__cta"
            onClick={handleCta}
            role="button"
          >
            {heroData.cta}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="hero__scroll" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span>{heroData.scrollLabel}</span>
      </div>
    </section>
  );
}
