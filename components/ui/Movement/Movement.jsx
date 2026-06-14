'use client';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading/SectionHeading';
import { movementData } from '@/constants/websiteData';
import IndiaMap from '@/components/ui/Hero/IndiaMap';

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
