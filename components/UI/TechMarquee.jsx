import React from 'react';
import styles from './TechMarquee.module.scss';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const TechMarquee = ({ technologies, isMobile }) => {
  const t = useTranslations();

  return (
    <div className={styles.marqueeSection}>
      <Marquee
        gradient={true}
        gradientColor={'#f3f4f6'}
        gradientWidth={50}
        speed={50}
        style={isMobile ? { position: 'absolute', left: 0, width: '100vw' } : { height: '100px' }}
      >
        {technologies.map((tech, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            className={styles.techLogo}
            key={index}
          >
            <Image src={tech.src} alt={tech.alt} title={tech.alt} width={60} height={60} />
            <p className={styles.techName}>{tech.alt}</p>
          </motion.div>
        ))}
      </Marquee>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true, amount: 0.3 }}
        className={styles.text}
      >
        {t('resume.technologies.description')} <br /> {t('resume.technologies.keepLearning')}
      </motion.p>
    </div>
  );
};

export default TechMarquee;
