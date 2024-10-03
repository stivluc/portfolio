// components/HeroSection.jsx

'use client';

import React from 'react';
import styles from './HeroSection.module.scss';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h1>{`You're one call away from your pixel-perfect app`}</h1>
          <p>{`Hi, I'm Steven Lucas, a passionate full-stack engineer and avid learner.`}</p>
          <br />
          <p>{`Let's build your solution together.`}</p>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src='/BuildTogether.svg' // Remplacez par votre image
            alt='Steven Lucas'
            width={300}
            height={300}
            className={styles.mainIllustration}
            priority
          />
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
