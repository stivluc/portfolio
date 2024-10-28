import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ContactSection.module.scss';
import { FiArrowUpRight } from 'react-icons/fi';

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
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.title}
        >
          Contact
          <span>Contact</span>
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.subtitle}
        >
          {`Let's create something amazing together.`}
        </motion.p>
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
          className={styles.contactForm}
          onSubmit={handleSubmit}
        >
          <div className={styles.formGroup}>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' id='name' value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' value={formData.email} onChange={handleInputChange} required />
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
          <button type='submit' disabled={status.submitting} className={styles.submitButton}>
            {status.submitting ? 'Sending...' : 'Send Message'} <FiArrowUpRight className={styles.icon} />
          </button>
          {status.success && <p className={styles.successMessage}>Message sent successfully!</p>}
          {status.error && <p className={styles.errorMessage}>{status.error}</p>}
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
