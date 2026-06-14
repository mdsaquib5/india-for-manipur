'use client';
import { motion } from 'framer-motion';

export default function SectionHeading({
  preTitle,
  title,
  subtitle,
  center = false,
  className = '',
}) {
  return (
    <div
      className={`section-heading ${center ? 'section-heading--center' : ''} ${className}`}
    >
      {preTitle && (
        <motion.p
          className="pre-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {preTitle}
        </motion.p>
      )}

      <motion.h2
        className="section-title"
        style={{ whiteSpace: 'pre-line' }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
      >
        {title}
      </motion.h2>

      <motion.div
        className={`flag-bar ${center ? 'flag-bar--center' : ''}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
        style={{ transformOrigin: center ? 'center' : 'left' }}
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
      </motion.div>

      {subtitle && (
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
