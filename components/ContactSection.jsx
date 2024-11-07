// ContactSection.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ContactSection.module.scss';
import { FiArrowUpRight } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import SectionTitle from './UI/SectionTitle';
import Button from './UI/Button';
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
          <motion.div
            className={styles.contactDetails}
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <ProfileCard />

            <motion.p>Let's collaborate and create something amazing together. Feel free to reach out!</motion.p>
            <div className={styles.contactInfo}>
              <p>
                <strong>Email:</strong> <a href='mailto:your.email@example.com'>your.email@example.com</a>
              </p>
              <p>
                <strong>Phone:</strong> <a href='tel:+1234567890'>+1 234 567 890</a>
              </p>
            </div>
            <div className={styles.socialLinks}>
              <a href='https://github.com/stivluc' target='_blank' rel='noopener noreferrer'>
                <FaGithub />
              </a>
              <a href='https://www.linkedin.com/in/stivluc' target='_blank' rel='noopener noreferrer'>
                <FaLinkedin />
              </a>
            </div>
          </motion.div>
          {/* Right Side */}
          <motion.div
            className={styles.contactFormWrapper}
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className={styles.formCard}>
              <form className={styles.contactForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor='name'>Name</label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor='message'>Message</label>
                  <textarea
                    name='message'
                    id='message'
                    rows='5'
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <Button variant='contained' type='submit' onClick={handleSubmit} disabled={status.submitting}>
                  {status.submitting ? 'Sending...' : 'Send message'}
                </Button>
                {status.success && <p className={styles.successMessage}>Message sent successfully!</p>}
                {status.error && <p className={styles.errorMessage}>{status.error}</p>}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
