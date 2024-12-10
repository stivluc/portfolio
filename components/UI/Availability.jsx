import React from 'react';
import { motion } from 'framer-motion';
import styles from './Availability.module.scss';
import { useTranslations } from 'next-intl';

const Availability = () => {
  const t = useTranslations('availability');

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={styles.additionalText}
    >
      {t('dates')}
      <div className={styles.availability}>
        <span className={styles.dot}></span> {t('status')}
      </div>
    </motion.div>
  );
};

export default Availability;
