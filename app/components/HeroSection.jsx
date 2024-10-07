import React from 'react';
import styles from './HeroSection.module.scss';
import ProfileCard from './UI/ProfileCard';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const sentenceParts = [
    { text: "Hi! I'm " },
    { text: 'Steven Lucas', className: styles.name },
    { text: ', a ' },
    { text: 'Full-Stack Engineer', className: styles.job },
    { text: " from France. Let's build your solution together." },
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.profileCardContainer}>
        <ProfileCard />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.text}>
          <h1>
            {sentenceParts.map((part, index) =>
              part.className ? (
                <motion.span
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={part.className}
                >
                  {part.text}
                </motion.span>
              ) : (
                <span key={index}>{part.text}</span>
              )
            )}
          </h1>
          <p>
            I’m dedicated to crafting solutions that perfectly meet your needs, combining design and development to
            deliver fast, impactful results.
          </p>
        </div>
      </div>
      <div className={styles.illustrations}>
        <div className={styles.circle}></div>
        <div className={styles.square}></div>
      </div>
    </section>
  );
};

export default HeroSection;
