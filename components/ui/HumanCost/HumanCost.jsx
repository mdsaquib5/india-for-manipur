'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading/SectionHeading';
import { humanCostData } from '@/constants/websiteData';

function CountUp({ target, suffix, inView }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const duration = 2200;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span>
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

export default function HumanCost() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      className="human-cost section"
      id="human-cost"
      aria-labelledby="human-cost-heading"
      ref={ref}
    >
      <div className="container">
        <div className="human-cost__header">
          <SectionHeading
            preTitle={humanCostData.preTitle}
            title={humanCostData.headline}
            subtitle={humanCostData.subheadline}
            center
          />
        </div>

        <div className="human-cost__grid">
          {humanCostData.stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="human-cost__card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
            >
              <p className="human-cost__number" aria-label={`${stat.number.toLocaleString('en-IN')}${stat.suffix} ${stat.label}`}>
                <CountUp target={stat.number} suffix={stat.suffix} inView={inView} />
              </p>
              <p className="human-cost__label">{stat.label}</p>
              <p className="human-cost__desc">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
