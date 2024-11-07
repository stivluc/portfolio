import React from 'react';
import styles from './Footer.module.scss';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>© {new Date().getFullYear()} Steven Lucas. All rights reserved.</p>
        <p className={styles.text}>SIRET 848 022 091 00021</p>
        <p className={styles.text}>Developed with NextJS & SCSS.</p>
      </div>
    </footer>
  );
};

export default Footer;
