import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion, useAnimation, useInView } from 'framer-motion';
import styles from './ResumeFAB.module.scss';

const ResumeFAB = ({ sectionRef }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [showText, setShowText] = useState(true);

  const isInView = useInView(sectionRef, { margin: '-60% 0px -90% 0px' }); // Adjusted margins
  const controls = useAnimation();

  // Hide text after scrolling a bit
  const handleScroll = useCallback(() => {
    if (sectionRef.current) {
      const sectionTop = sectionRef.current.getBoundingClientRect().top;

      if (sectionTop > 0) {
        //* 0 équivaut à la distance entre le top de la section et le haut de l'écran. On met de la marge pour prendre en compte la navbar.
        setShowText(true);
      } else {
        setShowText(false);
      }
    }
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInView, controls, sectionRef, handleScroll]);

  const handleDownloadClick = async () => {
    if (isDownloading) return;

    setIsDownloading(true);

    // Fake loading animation
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate 1-second download

    // Continue the state updates after initiating the download
    setIsDownloading(false);
    setDownloadComplete(true);

    // Reset downloadComplete after a delay
    setTimeout(() => {
      setDownloadComplete(false);
    }, 2000);
  };

  // Variants for text animation
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  // Variants for width animation
  const widthVariants = {
    expanded: { width: 'auto' },
    collapsed: { width: '0px' },
  };

  return (
    <motion.div
      className={styles.fabContainer}
      animate={controls}
      initial='hidden'
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 },
      }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setShowText(true)}
      onHoverEnd={handleScroll}
    >
      <motion.button
        className={`${styles.fabButton} ${isDownloading ? styles.downloading : ''} ${
          downloadComplete ? styles.downloadComplete : ''
        }`}
        onClick={handleDownloadClick}
        disabled={isDownloading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={styles.spark}></span>
        <span className={styles.spark}></span>
        <span className={styles.backdrop}></span>
        {downloadComplete ? (
          <svg
            className={`${styles.fabSvg} ${styles.downloadCompleteIcon}`}
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle className={styles.downloadCompleteCircle} cx='12' cy='12' r='10' stroke='#fff' strokeWidth='1.5' />
            <path
              className={styles.downloadCompleteCheck}
              d='M8.5 12.5L10.5 14.5L15.5 9.5'
              stroke='#fff'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        ) : isDownloading ? (
          <svg xmlns='http://www.w3.org/2000/svg' className={`${styles.fabSvg} ${styles.loader}`} viewBox='0 0 50 50'>
            <circle className={styles.loaderCircle} cx='25' cy='25' r='20' fill='none' stroke='#fff' strokeWidth='4' />
          </svg>
        ) : (
          <svg
            className={`${styles.fabSvg} ${styles.sparkle}`}
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749'
              stroke='#000'
              strokeWidth='1.5'
              strokeLinecap='round'
            />
            <path
              d='M12 2L12 15M12 15L9 11.5M12 15L15 11.5'
              stroke='#000'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        )}
        {/* Text with animation */}
        <motion.div
          initial='collapsed'
          animate={showText ? 'expanded' : 'collapsed'}
          variants={widthVariants}
          transition={{ duration: 0.3 }}
          className={styles.textContainer}
        >
          <AnimatePresence mode='wait'>
            {showText && (
              <motion.a
                key={isDownloading ? 'downloading' : downloadComplete ? 'downloaded' : 'default'}
                href='/resumeStevenLucas.pdf'
                download
                className={`${styles.fabText}`}
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={textVariants}
                transition={{ duration: 0.3 }}
              >
                {isDownloading ? 'Downloading...' : downloadComplete ? 'Downloaded!' : 'Download my resume'}
              </motion.a>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default ResumeFAB;
