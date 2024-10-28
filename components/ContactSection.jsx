import React from 'react';
import { motion } from 'framer-motion';
import styles from './ContactSection.module.scss';

const ContactSection = () => {
  return (
    <section className={styles.contactContainer} id='contact'>
      <div className={styles.contact}>
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.title}
        >
          Contact
          <span>Contact</span>
        </motion.h2>
      </div>
    </section>
  );
};

export default ContactSection;
