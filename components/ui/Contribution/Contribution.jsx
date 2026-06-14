'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading/SectionHeading';
import { contributionData } from '@/constants/websiteData';

export default function Contribution() {
  return (
    <section
      className="contribution section section--secondary"
      id="contribution"
      aria-labelledby="contribution-heading"
    >
      <div className="container">
        {/* Header */}
        <div className="contribution__header">
          <SectionHeading
            preTitle={contributionData.preTitle}
            title={contributionData.headline}
            subtitle={contributionData.subheadline}
          />
        </div>

        {/* Items */}
        <div className="contribution__items">
          {contributionData.items.map((item, index) => {
            const isReverse = index % 2 !== 0;
            return (
              <motion.article
                key={item.id}
                className={`contribution__item ${isReverse ? 'contribution__item--reverse' : ''}`}
                initial={{ opacity: 0, x: isReverse ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                aria-label={`${item.name} — ${item.role}`}
              >
                {/* Image */}
                <div className="contribution__image-wrap">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="contribution__img"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>

                {/* Content */}
                <div className="contribution__text">
                  <span className="tag contribution__tag">{item.tag}</span>
                  <h3 className="contribution__name">{item.name}</h3>
                  <p className="contribution__role">{item.role}</p>
                  <p className="contribution__desc">{item.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
