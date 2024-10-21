import React from 'react';
import { motion } from 'framer-motion';
import styles from './TechMarquee.module.scss';
import Marquee from 'react-fast-marquee';

const TechMarquee = ({ technologies }) => {
  return (
    <div className={styles.marquee}>
      <motion.div>
        <Marquee autofill={true}>
          {technologies.map((tech, index) => (
            <div className={styles.techLogo} key={index}>
              <img src={tech.src} alt={tech.alt} title={tech.alt} />
              <p className={styles.techName}>{tech.alt}</p>
            </div>
          ))}
        </Marquee>
      </motion.div>
    </div>
  );
};

export default TechMarquee;
