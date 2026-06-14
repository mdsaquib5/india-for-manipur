'use client';
import { motion } from 'framer-motion';
import { silenceData } from '@/constants/websiteData';

const lines = [
  { key: 'line1', text: silenceData.line1, cls: '' },
  { key: 'line2', text: silenceData.line2, cls: 'silence__line--em' },
  { key: 'line3', text: silenceData.line3, cls: 'silence__line--divider' },
  { key: 'line4', text: silenceData.line4, cls: '' },
];

export default function Silence() {
  return (
    <section
      className="silence"
      id="silence"
      aria-labelledby="silence-heading"
    >
      <div className="silence__content">
        {lines.map((line, index) => (
          <motion.span
            key={line.key}
            className={`silence__line ${line.cls}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: index * 0.28, ease: [0.22, 1, 0.36, 1] }}
            id={index === 0 ? 'silence-heading' : undefined}
          >
            {line.text}
          </motion.span>
        ))}

        <motion.p
          className="silence__subtext"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, delay: 1.4 }}
        >
          {silenceData.subtext}
        </motion.p>
      </div>
    </section>
  );
}
