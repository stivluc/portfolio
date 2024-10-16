import React from 'react';
import styles from './ServicesSection.module.scss';
import { motion } from 'framer-motion';

const ServicesSection = () => {
  const services = [
    {
      image: 'WebDevelopment.svg',
      title: 'Web Development',
      description: 'Building responsive and high-performing websites tailored to your needs.',
    },
    {
      image: 'MobileDevelopment.svg',
      title: 'Mobile Apps',
      description: 'Creating user-friendly mobile applications for both iOS and Android platforms.',
    },
    {
      image: 'CICD.svg',
      title: 'CI/CD Setup',
      description: 'Designing intuitive user interfaces and engaging user experiences.',
    },
  ];

  return (
    <section className={styles.services} id='services'>
      <h2 className={styles.title}>Services</h2>
      <div className={styles.cardsContainer}>
        {services.map((service, index) => (
          <motion.div
            className={styles.card}
            key={index}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.3 }}
          >
            <img src={service.image} alt={service.title} className={styles.cardImage} />
            <h3 className={styles.cardTitle}>{service.title}</h3>
            <p className={styles.cardDescription}>{service.description}</p>
          </motion.div>
        ))}
      </div>
      <p className={styles.ctaText}>
        Have a specific demand? Feel free to{' '}
        <a href='#contact' className={styles.ctaLink}>
          send a message
        </a>
        .
      </p>
    </section>
  );
};

export default ServicesSection;
