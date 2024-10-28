import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ title, align }) => {
  return (
    <motion.h2
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true, amount: 0.5 }}
      className={`sectionTitle ${align === 'left' ? `alignLeft` : `alignRight`}`}
    >
      {title}
      <motion.span
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 0.06 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {title}
      </motion.span>
    </motion.h2>
  );
};

export default SectionTitle;
