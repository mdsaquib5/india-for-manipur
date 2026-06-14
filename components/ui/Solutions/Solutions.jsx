'use client';
import { motion } from 'framer-motion';
import {
  MdSecurity,
  MdHomeWork,
  MdSchool,
  MdLocalHospital,
  MdHandshake,
  MdFavorite,
} from 'react-icons/md';
import SectionHeading from '@/components/shared/SectionHeading/SectionHeading';
import { solutionsData } from '@/constants/websiteData';

const iconMap = {
  MdSecurity,
  MdHomeWork,
  MdSchool,
  MdLocalHospital,
  MdHandshake,
  MdFavorite,
};

export default function Solutions() {
  return (
    <section
      className="solutions section section--dark"
      id="solutions"
      aria-labelledby="solutions-heading"
    >
      <div className="container">
        <div className="solutions__header">
          <SectionHeading
            preTitle={solutionsData.preTitle}
            title={solutionsData.headline}
            subtitle={solutionsData.subheadline}
            center
          />
        </div>

        <div className="solutions__grid">
          {solutionsData.solutions.map((sol, index) => {
            const Icon = iconMap[sol.icon];
            return (
              <motion.div
                key={sol.id}
                className="solutions__card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
              >
                <div className="solutions__icon" aria-hidden="true">
                  {Icon && <Icon size={24} />}
                </div>
                <h3 className="solutions__title">{sol.title}</h3>
                <p className="solutions__desc">{sol.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
