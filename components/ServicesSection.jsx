import React from 'react';
import styles from './ServicesSection.module.scss';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import FAQItem from './UI/FAQitem';

const ServicesSection = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });

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

  const questions = [
    {
      index: 1,
      question: 'What is your typical project timeline?',
      answer:
        'The timeline for a project typically ranges from 4 to 8 weeks, depending on the scope and complexity. After an initial consultation, I’ll provide a detailed timeline with key milestones so you know what to expect at each stage.',
    },
    {
      index: 2,
      question: `Do you offer ongoing maintenance and support?`,
      answer: `Yes, I offer ongoing maintenance and support packages to ensure your website stays updated and runs smoothly. This includes updates, bug fixes, and any necessary changes as your business grows.`,
    },
    {
      index: 3,
      question: `Can you work with existing brand guidelines?`,
      answer: `Absolutely! I’m experienced in working with existing brand guidelines to ensure your website aligns with your established identity. I can seamlessly incorporate your branding while enhancing your digital presence.`,
    },
    {
      index: 4,
      question: `How do you handle revisions and feedback?`,
      answer: `Revisions and feedback are a crucial part of the process. I typically offer a set number of revision rounds to refine the design based on your input. I ensure clear communication throughout, so your vision is brought to life effectively.`,
    },
  ];

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
