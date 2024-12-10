import React from 'react';
import styles from './ServicesSection.module.scss';
import { domAnimation, LazyMotion, motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import FAQItem from './UI/FAQitem';
import { questions, services } from '@/config/servicesContent';
import SectionTitle from './UI/SectionTitle';
import Image from 'next/image';
import { handleScrollToSection } from '@/utils/handleScrollToSection';
import { useTranslations } from 'next-intl';

const ServicesSection = () => {
  const t = useTranslations('services');
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });

  const handleCtaClick = (e) => {
    handleScrollToSection(e, 'contact', 1600);
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className={`sectionContainer bgBackground`} id='services'>
        <div className={`section`}>
          <SectionTitle title={t('title')} align='left' />
          <div className={styles.cardsContainer}>
            {services.map((service, index) => (
              <motion.div
                className={styles.serviceCard}
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: isMobile ? 0.3 : index * 0.5 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <Image
                  height={200}
                  width={200}
                  src={service.image}
                  alt={service.title}
                  className={styles.cardImage}
                  priority
                />
                <h3 className={styles.cardTitle}>{t(`${service.key}.title`)}</h3>
                <p className={styles.cardDescription}>{t(`${service.key}.description`)}</p>
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.5 }}
            className={`secondary alignCenter`}
          >
            {t('specificDemand')} <br />
            {t('feelFree')}
            <a href='#contact' onClick={handleCtaClick}>
              {t('sendMessage')}
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
            {t('questionsTitle')}
          </motion.h3>
          {questions.map((q, i) => (
            <FAQItem {...q} key={i} />
          ))}
        </div>
      </section>
    </LazyMotion>
  );
};

export default ServicesSection;
