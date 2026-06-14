'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import SectionHeading from '@/components/shared/SectionHeading/SectionHeading';
import { voiceData } from '@/constants/websiteData';

export default function Voices() {
  const voices = voiceData.voices;
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (next) => {
      setDirection(next > active ? 1 : -1);
      setActive(next);
    },
    [active]
  );

  const prev = () => go(active === 0 ? voices.length - 1 : active - 1);
  const next = () => go(active === voices.length - 1 ? 0 : active + 1);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActive((a) => (a === voices.length - 1 ? 0 : a + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [voices.length]);

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir * -40 }),
  };

  return (
    <section
      className="voices section section--secondary"
      id="voices"
      aria-labelledby="voices-heading"
    >
      <div className="container">
        <div className="voices__header">
          <SectionHeading
            preTitle={voiceData.preTitle}
            title={voiceData.headline}
            subtitle={voiceData.subheadline}
            center
          />
        </div>

        <div
          className="voices__carousel-wrap"
          role="region"
          aria-label="Testimonials carousel"
          aria-live="polite"
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <article className="voices__card">
                <blockquote>
                  <p className="voices__quote">{voices[active].quote}</p>
                </blockquote>
                <div
                  className="voices__avatar"
                  aria-hidden="true"
                >
                  {voices[active].initial}
                </div>
                <p className="voices__name">{voices[active].name}</p>
                <p className="voices__role">{voices[active].role}</p>
              </article>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="voices__controls">
            <button
              className="voices__btn"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <MdChevronLeft />
            </button>

            <div className="voices__dots" role="tablist" aria-label="Select testimonial">
              {voices.map((_, i) => (
                <button
                  key={i}
                  className={`voices__dot ${i === active ? 'active' : ''}`}
                  onClick={() => go(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  aria-selected={i === active}
                  role="tab"
                />
              ))}
            </div>

            <button
              className="voices__btn"
              onClick={next}
              aria-label="Next testimonial"
            >
              <MdChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
