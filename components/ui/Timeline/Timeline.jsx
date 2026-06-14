'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading/SectionHeading';
import { timelineData } from '@/constants/websiteData';

export default function Timeline() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 80%', 'end 20%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      className="timeline section section--secondary"
      id="timeline"
      aria-labelledby="timeline-heading"
    >
      <div className="container">
        <div className="timeline__header">
          <SectionHeading
            preTitle={timelineData.preTitle}
            title={timelineData.headline}
            subtitle={timelineData.subheadline}
            center
          />
        </div>

        <div className="timeline__track" ref={trackRef}>
          {/* Animated vertical line */}
          <div className="timeline__line" aria-hidden="true">
            <motion.div
              className="timeline__line-fill"
              style={{ height: lineHeight }}
            />
          </div>

          {timelineData.events.map((event, index) => (
            <motion.div
              key={event.id}
              className="timeline__event"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Dot */}
              <motion.div
                className="timeline__dot"
                whileInView={{ borderColor: 'var(--accent-gold)', backgroundColor: 'var(--accent-gold)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: index * 0.05 + 0.3 }}
                aria-hidden="true"
              >
                <div className="timeline__dot-inner" />
              </motion.div>

              <p className="timeline__year">{event.year}</p>
              <h3 className="timeline__title">{event.title}</h3>
              <p className="timeline__desc">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
