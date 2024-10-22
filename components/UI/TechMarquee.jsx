import React from 'react';
import { motion } from 'framer-motion';
import styles from './TechMarquee.module.scss';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';

const TechMarquee = ({ technologies, isMobile }) => {
  return (
    <div className={styles.marqueeSection}>
      <Marquee
        gradient={true}
        gradientColor={'#f3f4f6'}
        gradientWidth={50}
        speed={50}
        style={isMobile ? { position: 'absolute', left: 0, width: '100vw' } : { height: '100px' }}
      >
        {technologies.map((tech, index) => (
          <div className={styles.techLogo} key={index}>
            <Image src={tech.src} alt={tech.alt} title={tech.alt} width={60} height={60} />
            <p className={styles.techName}>{tech.alt}</p>
          </div>
        ))}
      </Marquee>
      <p className={styles.text}>
        Frameworks, databases, and services I'm mostly used to working with. <br /> Always keep learning to stay up to
        date!
      </p>
    </div>
  );
};

export default TechMarquee;
