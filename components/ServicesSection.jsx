import React from 'react';
import styles from './ServicesSection.module.scss';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import FAQItem from './UI/FAQitem';
import { questions, services } from '@/config/servicesContent';

const ServicesSection = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });

  return (
    <section className={styles.servicesContainer} id='services'>
      <div className={styles.services}>
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.title}
        >
          Services
          <span>Services</span>
        </motion.h2>
        <div className={styles.cardsContainer}>
          {services.map((service, index) => (
            <motion.div
              className={styles.card}
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: isMobile ? 0.3 : index * 0.5 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <img src={service.image} alt={service.title} className={styles.cardImage} />
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.ctaText}
        >
          Have a specific demand? <br />
          Feel free to{' '}
          <a href='#contact' className={styles.ctaLink}>
            send a message
          </a>
          .
        </motion.p>
        <motion.h3
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.questionsTitle}
        >
          Common questions
        </motion.h3>
        <div>
          {questions.map((q, i) => (
            <FAQItem {...q} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
