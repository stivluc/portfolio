import React from 'react';
import styles from './HeroSection.module.scss';
import ProfileCard from './UI/ProfileCard';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const sentenceParts = [
    { text: 'Hi! ' },
    { text: "I'm" },
    { text: 'Steven Lucas', className: styles.name },
    { isLineBreak: true },
    { text: 'a' },
    { text: 'Full-Stack Engineer', className: styles.job },
    { text: 'from' },
    { text: 'France.' },
    { isLineBreak: true },
    { text: "Let's" },
    { text: 'build' },
    { text: 'your' },
    { text: 'solution' },
    { text: 'together.' },
  ];

  let wordIndex = 0;

  return (
    <section className={styles.hero} id='hero'>
      <div className={styles.profileCardContainer}>
        <ProfileCard />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.text}>
          <h1>
            {sentenceParts.map((part, index) => {
              if (part.isLineBreak) {
                return <div key={`br-${index}`} style={{ width: '100%' }}></div>; // Forces a new line
              }
              const delay = wordIndex * 0.1;
              wordIndex += 1;
              return (
                <motion.span
                  key={index}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay }}
                  className={part.className || ''}
                >
                  {part.text}
                </motion.span>
              );
            })}
          </h1>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            {`I’m dedicated to crafting solutions that perfectly meet your needs, combining design and development to
            deliver fast, impactful results.`}
          </motion.p>
        </div>
      </div>
      <div className={styles.illustrations}>
        <div className={styles.circle} />
        <div className={styles.square} />
      </div>
    </section>
  );
};

export default HeroSection;
