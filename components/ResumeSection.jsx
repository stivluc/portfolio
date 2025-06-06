import React, { useState, useRef } from 'react';
import styles from './ResumeSection.module.scss';
import { motion } from 'framer-motion';
import {
  certifications as allCertifications,
  education,
  experiences as allExperiences,
  technologies,
} from '@/config/resumeContent';
import TechMarquee from './UI/TechMarquee';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import SectionTitle from './UI/SectionTitle';
import ResumeFAB from './UI/ResumeFAB';
import { useTranslations } from 'next-intl';

const ResumeSection = () => {
  const t = useTranslations();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);

  const experiencesToShow = showAllExperiences ? allExperiences : allExperiences.slice(0, 3);
  const certificationsToShow = showAllCertifications ? allCertifications : allCertifications.slice(0, 3);

  const sectionRef = useRef(null);

  return (
    <section className={`sectionContainer bgMuted`} id='resume' ref={sectionRef}>
      <div className={`section`}>
        <SectionTitle title={t('resume.title')} align='right' />

        <div className={styles.eduExpContainer}>
          <motion.div
            className={`${styles.resumeSection} ${styles.eduSection}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h3
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              className={styles.sectionTitle}
            >
              {t('resume.education.title')}
            </motion.h3>
            {education.map((edu, index) => (
              <motion.div
                className={styles.item}
                key={index}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <h4 className={styles.itemTitle}>{t(edu.degreeKey)}</h4>
                <p className={styles.itemInstitution}>
                  {t(edu.institutionKey)} | {t(edu.yearKey)}
                </p>
                <p className={styles.itemDescription}>{t(edu.descriptionKey)}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className={`${styles.resumeSection} ${styles.expSection}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h3
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}
              className={styles.sectionTitle}
            >
              {t('resume.experience.title')}
            </motion.h3>
            {experiencesToShow.map((exp, index) => (
              <motion.div
                className={styles.item}
                key={index}
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <h4 className={styles.itemTitle}>{t(exp.positionKey)}</h4>
                <p className={styles.itemInstitution}>
                  {t(exp.companyKey)} | {t(exp.yearKey)}
                </p>
                <p className={styles.itemDescription}>{t(exp.descriptionKey)}</p>
              </motion.div>
            ))}
            {!showAllExperiences && allExperiences.length > 3 && (
              <motion.a
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true, amount: 0.5 }}
                onClick={() => setShowAllExperiences(true)}
              >
                ... {t('common.andOthers', { count: allExperiences.length - 3 })}
              </motion.a>
            )}
          </motion.div>
        </div>

        <div className={`${styles.resumeSection} ${styles.technologiesSection}`}>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            className={styles.sectionTitle}
          >
            {t('resume.technologies.title')}
          </motion.h3>
          <TechMarquee technologies={technologies} isMobile={isMobile} />
        </div>

        <motion.div
          className={`${styles.resumeSection} ${styles.certificationsSection}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            className={styles.sectionTitle}
          >
            {t('resume.certifications.title')}
          </motion.h3>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            transition={{ duration: 0.2 }}
            className={styles.certificationsGrid}
          >
            {certificationsToShow.map((cert, index) => {
              const certContent = (
                <>
                  <Image src={cert.src} alt={cert.title} className={styles.certLogo} width={50} height={50} />
                  <div className={styles.certInfo}>
                    <h4 className={styles.certTitle}>{cert.title}</h4>
                    <p className={styles.certIssuer}>
                      {cert.issuer} | {cert.year}
                    </p>
                  </div>
                </>
              );

              return cert.href ? (
                <motion.a
                  href={cert.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`${styles.certItem} ${styles.clickableCertItem}`}
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.1 + 0.3 * (index - 1) }}
                  style={{ textDecoration: 'none' }}
                >
                  {certContent}
                </motion.a>
              ) : (
                <motion.div
                  className={styles.certItem}
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.2 * (index - 1) }}
                >
                  {certContent}
                </motion.div>
              );
            })}
          </motion.div>
          {!showAllCertifications && allCertifications.length > 3 && (
            <a onClick={() => setShowAllCertifications(true)}>
              ... {t('common.andOthers', { count: allCertifications.length - 3 })}
            </a>
          )}
        </motion.div>
        <ResumeFAB sectionRef={sectionRef} isMobile={isMobile} />
      </div>
    </section>
  );
};

export default ResumeSection;
