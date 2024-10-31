import React from 'react';
import styles from './HeroSection.module.scss';
import ProfileCard from './UI/ProfileCard';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { handleScrollToSection } from '@/utils/handleScrollToSection';

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

  const handleCTAClick = (e) => {
    handleScrollToSection(e, 'services', 800);
  };

  return (
    <React.Fragment>
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 2, delay: 0 }}
        src='/backgroundImg.jpeg'
        alt='Background Image'
        className={styles.backgroundImage}
      />
      <section
        className={styles.hero}
        id='hero'
        initial={{ backgroundColor: '#fafafa' }}
        animate={{ backgroundColor: 'transparent' }}
        transition={{ duration: 2, delay: 10 }}
      >
        <div className={styles.profileCardContainer}>
          <ProfileCard />
        </div>
        <div className={styles.mainContent}>
          <div className={styles.text}>
            <h1>
              {sentenceParts.map((part, index) => {
                if (part.isLineBreak) {
                  return <div key={`br-${index}`} style={{ width: '100%' }}></div>; // Force a line break
                }
                const delay = 0.5 + wordIndex * 0.1;
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
          </div>
        </div>
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
        <div className={styles.declarationContainer}>
          <motion.p
            className={styles.declaration}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            I’m dedicated to crafting solutions that perfectly meet your needs, combining design and development to
            deliver fast, impactful results.
          </motion.p>
          <motion.a
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            href='#services'
            className={styles.ctaButton}
            onClick={handleCTAClick}
          >
            See what I can do <FiArrowUpRight className={styles.arrowIcon} />
          </motion.a>
        </div>

        <div className={styles.illustrations}>
          <div className={`${styles.circle} fadeInAndFloat`}></div>
          <div className={`${styles.square} fadeInAndFloat`}></div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default HeroSection;
