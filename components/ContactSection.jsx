import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContactSection.module.scss';
import { FiSend } from 'react-icons/fi';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import SectionTitle from './UI/SectionTitle';
import ProfileCard from './UI/ProfileCard';
import Availability from './UI/Availability';
import { contacts } from '@/config/contacts';
import { useTranslations } from 'next-intl';

const ContactSection = () => {
  const t = useTranslations('contact');
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, success: false, error: '' });

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia('(max-width: 881px)');
    setIsMobile(mediaQuery.matches);

    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
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

      if (res.status === 201) {
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
        <SectionTitle title={t('title')} align='right' />
        <div className={styles.contactGrid}>
          {/* Left Side */}
          <div className={styles.contactDetails}>
            <div>
              <ProfileCard bgColor={'#f3f4f6'} />
              {isMounted && isMobile && (
                <div style={{ marginTop: '2rem' }}>
                  <Availability />
                </div>
              )}
              <motion.hr
                initial={{ x: 10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={styles.horizontalRule}
              />
              <motion.p
                initial={{ x: 10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={styles.description}
              >
                {t('intro')}
              </motion.p>
              {!isMounted || !isMobile ? (
                <motion.div className={styles.contactInfo}>
                  {contacts.map((contact) => (
                    <motion.p
                      key={contact.name}
                      initial={{ x: 10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {contact.icon} <a href={contact.href}>{contact.text}</a>
                    </motion.p>
                  ))}
                </motion.div>
              ) : null}
            </div>
            {!isMounted || !isMobile ? (
              <div>
                <Availability />
              </div>
            ) : null}
            {isMounted && isMobile && (
              <div className={styles.contactIcons}>
                {contacts.map((contact, index) => (
                  <motion.a
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.3 * (index + 1) }}
                    key={contact.name}
                    href={contact.href}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {contact.icon}
                  </motion.a>
                ))}
              </div>
            )}
          </div>
          {/* Right Side */}
          <motion.div
            className={styles.contactFormWrapper}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className={styles.formCard}>
              <form className={styles.contactForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor='name'>{t('form.name')}</label>
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
                  <label htmlFor='email'>{t('form.email')}</label>
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
                  <label htmlFor='message'>{t('form.message')}</label>
                  <textarea
                    name='message'
                    id='message'
                    rows='5'
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                {/* Custom Send Button */}
                <button
                  type='submit'
                  className={styles.sendButton}
                  disabled={status.submitting || status.success}
                  onClick={handleSubmit}
                >
                  <AnimatePresence initial={false} mode='wait'>
                    {status.submitting ? (
                      <motion.span key='loading' className={styles.buttonContent}>
                        {t('form.sending')}
                        <motion.div className={styles.loader}></motion.div>
                      </motion.span>
                    ) : status.success ? (
                      <motion.span key='success' className={styles.buttonContent}>
                        {t('form.sent')}
                        <FaCheckCircle className={styles.icon} aria-hidden='true' />
                      </motion.span>
                    ) : (
                      <motion.span key='default' className={styles.buttonContent}>
                        {t('form.send')}
                        <FiSend className={styles.sendIcon} aria-hidden='true' />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                {status.error && (
                  <motion.p className={styles.errorMessage}>
                    <FaTimesCircle aria-hidden='true' />
                    {t('form.error')}
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
