'use client';
import { motion } from 'framer-motion';
import { ctaData } from '@/constants/websiteData';

const sequenceVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.35 } },
};

const lineVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const headlineVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CTA() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'India For Manipur',
          text: 'They Carried India\'s Pride. Let Us Carry Their Voice. Learn about the people of Manipur.',
          url: window.location.href,
        });
      } catch (e) {
        // User cancelled or not supported
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard! Share it to spread awareness.');
      } catch (e) {
        console.error('Copy failed', e);
      }
    }
  };

  const handleJoin = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      className="cta"
      id="cta"
      aria-labelledby="cta-heading"
    >
      <div className="cta__inner">
        {/* Text sequence */}
        <motion.div
          className="cta__sequence"
          variants={sequenceVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {ctaData.sequence.map((line, i) => (
            <motion.span
              key={i}
              className={`cta__line ${i % 2 === 0 ? 'cta__line--light' : 'cta__line--strong'}`}
              variants={lineVariants}
            >
              {line}
            </motion.span>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="cta__headline"
          id="cta-heading"
          variants={headlineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {ctaData.headline}
        </motion.h2>

        {/* Tagline */}
        <motion.p
          className="cta__tagline"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {ctaData.tagline}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="cta__buttons"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          {ctaData.buttons.map((btn) => (
            <button
              key={btn.id}
              id={btn.id}
              className={`btn btn-${btn.type}`}
              onClick={btn.label.includes('Share') ? handleShare : handleJoin}
              aria-label={btn.label}
            >
              {btn.label}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
