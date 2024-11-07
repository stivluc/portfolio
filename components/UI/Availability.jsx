import React from 'react';
import { motion } from 'framer-motion';
import styles from './Availability.module.scss';

const Availability = () => {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={styles.additionalText}
    >
      (2019 - PRESENT)
      <div className={styles.availability}>
        <span className={styles.dot}></span> Available for freelance
      </div>
    </motion.div>
  );
};

export default Availability;
