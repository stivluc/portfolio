// ProjectsSection.jsx
import React, { useState, useEffect } from 'react';
import styles from './ProjectsSection.module.scss';
import { motion } from 'framer-motion';
import { projects } from '@/config/projectsContent';
import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';
import Button from './UI/Button';

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
    <section className={`sectionContainer bgBackground`} id='projects'>
      <div className={'section'}>
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
          className={'sectionTitle alignLeft'}
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
              className={`card`}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
              key={index}
              onClick={() => {
                window.open(project.href, '_blank').focus();
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.projectLinkWrapper}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className={styles.projectImage}
                    priority
                  />
                </div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>

                {/* Use the Button component */}
                <Button
                  variant='outlined'
                  href={project.href}
                  disabled={!project.href}
                  icon={project.href ? FiArrowUpRight : null}
                  style={{ margin: 'auto 1.2rem 1rem', textDecoration: 'none' }}
                >
                  {project.href
                    ? project.hrefText || `Visit ${new URL(project.href).hostname}`
                    : project.noHrefText || 'Not Online'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        {isMobile && !showAllProjects && projects.length > 2 && (
          <motion.a onClick={() => setShowAllProjects(true)}>... and {projects.length - 2} more</motion.a>
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
          Add your project to the list!
        </motion.p>
      </div>
    </section>
  );
};

export default ProjectsSection;
