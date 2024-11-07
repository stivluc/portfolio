// ContactSection.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContactSection.module.scss';
import { FiSend } from 'react-icons/fi';
import { FaCheckCircle, FaGithub, FaLinkedin, FaTimesCircle } from 'react-icons/fa';
import SectionTitle from './UI/SectionTitle';
import ProfileCard from './UI/ProfileCard';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, success: false, error: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 200) {
        setFormData({ name: '', email: '', message: '' });
        setStatus({ submitting: false, success: true, error: '' });

        // Reset status after 2 seconds
        setTimeout(() => {
          setStatus({ submitting: false, success: false, error: '' });
        }, 2000);
      } else {
        const { error } = await res.json();
        setStatus({ submitting: false, success: false, error: error || 'Something went wrong.' });
      }
    } catch (err) {
      setStatus({ submitting: false, success: false, error: 'Something went wrong.' });
    }
  };

  return (
    <section className={'sectionContainer'} id='contact'>
      <div className={'section'}>
        <SectionTitle title={'Contact'} align='right' />
        <div className={styles.contactGrid}>
          {/* Left Side */}
          <div className={styles.contactDetails}>
            <ProfileCard bgColor={'#f3f4f6'} />

            <motion.p
              initial={{ x: 10, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={styles.description}
            >
              {`Let's collaborate and create something amazing together.`}
              <br />
              {` Feel free to reach out!`}
            </motion.p>
            <motion.div className={styles.contactInfo}>
              <motion.p
                initial={{ x: 10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <strong>Phone:</strong> <a href='tel:+33688074187'>+33 (0) 6 88 07 41 87</a>
              </motion.p>
            </motion.div>
            <motion.div className={styles.socialLinks}>
              <a href='https://github.com/stivluc' target='_blank' rel='noopener noreferrer'>
                <FaGithub />
              </a>
              <a href='https://www.linkedin.com/in/stivluc' target='_blank' rel='noopener noreferrer'>
                <FaLinkedin />
              </a>
            </motion.div>
          </div>
          {/* Right Side */}
          <motion.div
            className={styles.contactFormWrapper}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className={styles.formCard}>
              <motion.form className={styles.contactForm} onSubmit={handleSubmit}>
                <motion.div className={styles.formGroup}>
                  <label htmlFor='name'>Name</label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </motion.div>
                <motion.div className={styles.formGroup}>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </motion.div>
                <motion.div className={styles.formGroup}>
                  <label htmlFor='message'>Message</label>
                  <textarea
                    name='message'
                    id='message'
                    rows='5'
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </motion.div>
                {/* Custom Send Button */}
                <motion.button
                  type='submit'
                  className={styles.sendButton}
                  disabled={status.submitting || status.success}
                  onClick={handleSubmit}
                >
                  <AnimatePresence initial={false} mode='wait'>
                    {status.submitting ? (
                      <motion.span
                        key='loading'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.buttonContent}
                      >
                        Sending...
                        <motion.div
                          className={styles.loader}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        ></motion.div>
                      </motion.span>
                    ) : status.success ? (
                      <motion.span
                        key='success'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.buttonContent}
                      >
                        Message sent!
                        <FaCheckCircle className={styles.icon} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key='default'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.buttonContent}
                      >
                        Send Message
                        <FiSend className={styles.sendIcon} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
                {status.error && (
                  <motion.p className={styles.errorMessage} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <FaTimesCircle /> {status.error}
                  </motion.p>
                )}
              </motion.form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
