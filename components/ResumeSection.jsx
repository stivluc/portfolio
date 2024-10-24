import React, { useState } from 'react';
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
import { FaDownload, FaCheck, FaArrowDown } from 'react-icons/fa';

const ResumeSection = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);

  const experiencesToShow = showAllExperiences ? allExperiences : allExperiences.slice(0, 3);
  const certificationsToShow = showAllCertifications ? allCertifications : allCertifications.slice(0, 3);

  return (
    <section className={styles.resumeContainer} id='resume'>
      <div className={styles.resume}>
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.title}
        >
          Resume
          <span>Resume</span>
        </motion.h2>

        <div className={styles.eduExpContainer}>
          <motion.div
            className={`${styles.section} ${styles.eduSection}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className={styles.sectionTitle}>Education</h3>
            {education.map((edu, index) => (
              <motion.div
                className={styles.item}
                key={index}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <h4 className={styles.itemTitle}>{edu.degree}</h4>
                <p className={styles.itemInstitution}>
                  {edu.institution} | {edu.year}
                </p>
                <p className={styles.itemDescription}>{edu.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className={`${styles.section} ${styles.expSection}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className={styles.sectionTitle}>Work Experience</h3>
            {experiencesToShow.map((exp, index) => (
              <motion.div
                className={styles.item}
                key={index}
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <h4 className={styles.itemTitle}>{exp.position}</h4>
                <p className={styles.itemInstitution}>
                  {exp.company} | {exp.year}
                </p>
                <p className={styles.itemDescription}>{exp.description}</p>
              </motion.div>
            ))}
            {!showAllExperiences && allExperiences.length > 3 && (
              <button onClick={() => setShowAllExperiences(true)} className={styles.showMoreButton}>
                ... and {allExperiences.length - 3} others
              </button>
            )}
          </motion.div>
        </div>

        <motion.div
          className={`${styles.section} ${styles.technologiesSection}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className={styles.sectionTitle}>Technologies</h3>
          <TechMarquee technologies={technologies} isMobile={isMobile} />
        </motion.div>

        <motion.div
          className={`${styles.section} ${styles.certificationsSection}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className={styles.sectionTitle}>Certifications</h3>
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
            <button onClick={() => setShowAllCertifications(true)} className={styles.showMoreButton}>
              ... and {allCertifications.length - 3} others
            </button>
          )}
        </motion.div>
        <motion.p
          className={styles.downloadButtonText}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          If you're more old school, you can download my resume below
        </motion.p>
        <motion.div
          className={styles.downloadButtonContainer}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <button className={styles.downloadButton}>Download Resume (PDF)</button>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
