import React from 'react';
import styles from './ProjectsSection.module.scss';
import { motion } from 'framer-motion';
import { projects } from '@/config/projectsContent';

const ProjectsSection = () => {
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
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <motion.div
              className={styles.projectCard}
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <img src={project.image} alt={project.title} className={styles.projectImage} />
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>
              {project.href ? (
                <a href={project.href} target='_blank' rel='noopener noreferrer' className={styles.projectLink}>
                  Visit {new URL(project.href).hostname}
                </a>
              ) : (
                <span className={styles.projectNotOnline}>Not Online</span>
              )}
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.note}
        >
          Due to client confidentiality, some projects are not displayed. <br />
          Oh, and it also misses yours!
        </motion.p>
      </div>
    </section>
  );
};

export default ProjectsSection;
