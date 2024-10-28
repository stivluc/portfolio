// ProjectsSection.jsx
import React, { useState, useEffect } from 'react';
import styles from './ProjectsSection.module.scss';
import { motion } from 'framer-motion';
import { projects } from '@/config/projectsContent';
import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';

const ProjectsSection = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayedProjects = isMobile && !showAllProjects ? projects.slice(0, 2) : projects;

  return (
    <section className={styles.projectsContainer} id='projects'>
      <div className={styles.projects}>
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.title}
        >
          Projects
          <span>Projects</span>
        </motion.h2>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.introText}
        >
          Here are some of the main projects I've completed.
        </motion.p>
        <div className={styles.projectsGrid}>
          {displayedProjects.map((project, index) => (
            <motion.div
              className={`${styles.projectCard} ${project.href ? styles.clickable : ''}`}
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              {project.href ? (
                <a href={project.href} target='_blank' rel='noopener noreferrer' className={styles.projectLinkWrapper}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={300}
                      className={styles.projectImage}
                    />
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <span className={styles.projectLink}>
                    {project.hrefText || `Visit ${new URL(project.href).hostname}`}{' '}
                    <FiArrowUpRight className={styles.icon} />
                  </span>
                </a>
              ) : (
                <div className={styles.projectLinkWrapper}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      layout='responsive'
                      width={400}
                      height={300}
                      className={styles.projectImage}
                    />
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <span className={styles.projectNotOnline}>{project.noHrefText || 'Not Online'}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        {isMobile && !showAllProjects && projects.length > 2 && (
          <button onClick={() => setShowAllProjects(true)} className={styles.showMoreButton}>
            ... and {projects.length - 2} more
          </button>
        )}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.note}
        >
          Due to client confidentiality, some projects are not displayed.
          <br />
          Oh, and yours could be next!
        </motion.p>
      </div>
    </section>
  );
};

export default ProjectsSection;
