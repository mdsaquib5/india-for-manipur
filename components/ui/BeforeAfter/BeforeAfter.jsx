'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MdSwapHoriz } from 'react-icons/md';
import SectionHeading from '@/components/shared/SectionHeading/SectionHeading';
import { beforeAfterData } from '@/constants/websiteData';

export default function BeforeAfter() {
  const sliderRef = useRef(null);
  const [position, setPosition] = useState(50); // percent
  const [dragging, setDragging] = useState(false);

  const updatePosition = useCallback((clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const pct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onMouseDown = (e) => { setDragging(true); updatePosition(e.clientX); };
  const onTouchStart = (e) => { setDragging(true); updatePosition(e.touches[0].clientX); };

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updatePosition(clientX);
    };
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging, updatePosition]);

  return (
    <section
      className="before-after section section--dark"
      id="before-after"
      aria-labelledby="before-after-heading"
    >
      <div className="container">
        <div className="before-after__header">
          <SectionHeading
            preTitle={beforeAfterData.preTitle}
            title={beforeAfterData.headline}
            subtitle={beforeAfterData.subheadline}
            center
          />
        </div>

        {/* Slider */}
        <motion.div
          className="before-after__slider"
          ref={sliderRef}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Before and after image comparison slider. Drag left or right."
          role="img"
        >
          {/* Before (base) */}
          <Image
            src={beforeAfterData.before.image}
            alt={beforeAfterData.before.imageAlt}
            fill
            className="before-after__img"
            sizes="(max-width: 768px) 100vw, 900px"
          />

          {/* After (clipped) */}
          <Image
            src={beforeAfterData.after.image}
            alt={beforeAfterData.after.imageAlt}
            fill
            className="before-after__img before-after__after"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            sizes="(max-width: 768px) 100vw, 900px"
          />

          {/* Labels */}
          <span className="before-after__label before-after__label--before" aria-hidden="true">
            {beforeAfterData.before.label}
          </span>
          <span className="before-after__label before-after__label--after" aria-hidden="true">
            {beforeAfterData.after.label}
          </span>

          {/* Divider line */}
          <div
            className="before-after__divider"
            style={{ left: `${position}%` }}
            aria-hidden="true"
          >
            <div className="before-after__handle">
              <MdSwapHoriz size={22} />
            </div>
          </div>
        </motion.div>

        {/* Captions */}
        <div className="before-after__captions">
          <p className="before-after__caption before-after__caption--before">
            {beforeAfterData.before.caption}
          </p>
          <p className="before-after__caption before-after__caption--after">
            {beforeAfterData.after.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
