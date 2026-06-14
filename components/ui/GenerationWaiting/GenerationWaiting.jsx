'use client';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from '@/components/shared/SectionHeading/SectionHeading';
import { generationData } from '@/constants/websiteData';

export default function GenerationWaiting() {
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      className="generation section section--dark"
      id="generation"
      aria-labelledby="generation-heading"
    >
      <div className="generation__inner container">
        {/* Image — parallax */}
        <motion.div
          className="generation__image-wrap"
          ref={imgRef}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div style={{ y: imgY, height: '115%', position: 'relative' }}>
            <Image
              src={generationData.image}
              alt={generationData.imageAlt}
              fill
              className="generation__img"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          <div className="generation__image-overlay" aria-hidden="true" />
        </motion.div>

        {/* Content */}
        <div className="generation__content">
          <motion.p
            className="pre-title" style={{ justifyContent: 'flex-start', marginBottom: '16px' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            {generationData.preTitle}
          </motion.p>

          <motion.h2
            className="generation__headline"
            id="generation-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {generationData.headline}
          </motion.h2>

          <motion.p
            className="generation__subheadline"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {generationData.subheadline}
          </motion.p>

          <motion.div
            className="generation__body"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {generationData.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </motion.div>

          <motion.blockquote
            className="generation__quote"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p>{generationData.quote}</p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
