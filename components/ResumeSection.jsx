import React from 'react';
import styles from './ResumeSection.module.scss';
import { motion } from 'framer-motion';

const ResumeSection = () => {
  return (
    <section className={styles.resumeContainer} id='resume'>
      <div className={styles.resume}>
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.title}
        >
          Resume
          <span>Resume</span>
        </motion.h2>
      </div>
    </section>
  );
};

export default ResumeSection;
