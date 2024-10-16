import React from 'react';
import { motion } from 'framer-motion';
import styles from './TechStack.module.scss';

const techStack = [
  { src: '/icons/react.svg', alt: 'React' },
  { src: '/icons/nodejs-logo.svg', alt: 'Node.js' },
  { src: '/icons/express.svg', alt: 'Express.js' },
  { src: '/icons/nextjs-icon.svg', alt: 'Next.js' },
  { src: '/icons/azure-1-logo.svg', alt: 'Azure' },
  { src: '/icons/jest.svg', alt: 'Jest' },
  { src: '/icons/mongodb.svg', alt: 'MongoDB' },
  { src: '/icons/postgresql-logo.svg', alt: 'PostgreSQL' },
  { src: '/icons/vue.svg', alt: 'Vue.js' },
];

const TechStack = () => {
  return (
    <div className={styles.techStack}>
      {techStack.map((tech, index) => (
        <motion.img
          key={index}
          src={tech.src}
          alt={tech.alt}
          className={styles.icon}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default TechStack;
