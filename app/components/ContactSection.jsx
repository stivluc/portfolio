import React, { useRef } from 'react';
import styles from './ContactSection.module.scss';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';

const ContactSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const form = useRef();

  const onSubmit = (data) => {
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID').then(
      (result) => {
        console.log(result.text);
        reset();
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.logoContainer}>
        {/* SVG Logo Here */}
        <svg className={styles.logo}></svg>
      </div>
      <form ref={form} className={styles.contactForm} onSubmit={handleSubmit(onSubmit)}>
        <h2>Contact Me</h2>
        <div className={styles.formGroup}>
          <label>Name</label>
          <input type='text' {...register('name', { required: true })} placeholder='Your Name' />
          {errors.name && <span className={styles.error}>Name is required</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type='email'
            {...register('email', {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
            placeholder='Your Email'
          />
          {errors.email && <span className={styles.error}>Valid email is required</span>}
        </div>
        <div className={styles.formGroup}>
          <label>Message</label>
          <textarea {...register('message', { required: true })} placeholder='Your Message'></textarea>
          {errors.message && <span className={styles.error}>Message is required</span>}
        </div>
        <button type='submit'>Send Message</button>
      </form>
    </section>
  );
};

export default ContactSection;
