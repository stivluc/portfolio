'use client';

import React, { useMemo } from 'react';
import styles from './HeroSection.module.scss';
import ProfileCard from './UI/ProfileCard';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { handleScrollToSection } from '@/utils/handleScrollToSection';
import Availability from './UI/Availability';
import { useTranslations } from 'next-intl';

const HeroSection = () => {
  const t = useTranslations('hero');
  // Memoize sentence parts to prevent recreating array on each render
  const sentenceParts = useMemo(
    () => [
      { text: `${t('greeting')} ` },
      { text: `${t('intro')}` },
      { text: `${t('name')}`, className: styles.name },
      { isLineBreak: true },
      { text: `${t('a')}` },
      { text: `${t('role')}`, className: styles.job },
      { text: `${t('location')}` },
      { isLineBreak: true },
      { text: `${t('cta')}` },
    ],
    [t]
  );

  // Memoize animations for better performance
  const backgroundVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 0.7 },
  };

  const textVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  const declarationVariants = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className={styles.heroWrapper}>
        <motion.img
          initial='initial'
          animate='animate'
          variants={backgroundVariants}
          transition={{ duration: 2, delay: 0 }}
          src='/backgroundImg.jpeg'
          alt='Background Image'
          className={styles.backgroundImage}
          loading='eager'
          style={{
            willChange: 'opacity',
            transform: 'translate3d(0,0,0)',
          }}
        />

        <section
          className={styles.hero}
          id='hero'
          style={{
            willChange: 'transform',
            transform: 'translate3d(0,0,0)',
          }}
        >
          <div className={styles.profileCardContainer}>
            <ProfileCard />
          </div>

          <div className={styles.mainContent}>
            <div className={styles.text}>
              <h1>
                {sentenceParts.map((part, index) => {
                  if (part.isLineBreak) {
                    return <div key={`br-${index}`} style={{ width: '100%' }} />;
                  }

                  return (
                    <motion.span
                      key={index}
                      variants={textVariants}
                      initial='initial'
                      animate='animate'
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + index * 0.1,
                        ease: 'easeOut',
                      }}
                      className={part.className || ''}
                      style={{
                        willChange: 'opacity',
                        display: 'inline-block',
                      }}
                    >
                      {part.text}
                    </motion.span>
                  );
                })}
              </h1>
            </div>
          </div>

          <Availability />

          <div className={styles.declarationContainer}>
            <motion.p
              className={styles.declaration}
              variants={declarationVariants}
              initial='initial'
              animate='animate'
              transition={{ duration: 0.5, delay: 1.5, ease: 'easeOut' }}
              style={{
                willChange: 'transform, opacity',
                transform: 'translate3d(0,0,0)',
              }}
            >
              {t('description')}
            </motion.p>

            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              href='#services'
              className={styles.ctaButton}
              onClick={(e) => handleScrollToSection(e, 'services', 800)}
              style={{
                textDecoration: 'none',
                willChange: 'opacity',
                transform: 'translate3d(0,0,0)',
              }}
            >
              {t('seeWhatICan')} <FiArrowUpRight className={styles.arrowIcon} />
            </motion.a>
          </div>

          <div className={styles.illustrations}>
            <div className={`${styles.circle} fadeInAndFloat`} />
            <div className={`${styles.square} fadeInAndFloat`} />
          </div>
        </section>
      </div>
    </LazyMotion>
  );
};

// Prevent unnecessary re-renders
export default React.memo(HeroSection);
