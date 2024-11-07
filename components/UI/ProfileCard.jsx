import { motion } from 'framer-motion';
import styles from './ProfileCard.module.scss';
import Image from 'next/image';

const ProfileCard = () => {
  return (
    <div className={styles.profileWrapper}>
      <div className={styles.slices}>
        {/* Slices animations */}
        <motion.div
          className={`${styles.slice} ${styles.slice3}`}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        />
        <motion.div
          className={`${styles.slice} ${styles.slice2}`}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        />
        <motion.div
          className={`${styles.slice} ${styles.slice1}`}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        />
      </div>

      <motion.div
        className={styles.profileImageContainer}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.8 }}
      >
        <div className={styles.profileBackgroundCircle}></div>
        <div className={styles.profileImage}>
          <Image width={90} height={90} src='/profile.png' alt='Profile' priority />
        </div>
      </motion.div>

      <motion.div
        initial={{ backgroundColor: '#f7f8f9' }}
        animate={{ backgroundColor: '#f7f8f900' }}
        transition={{ delay: 1 }}
        className={styles.textContainer}
      >
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 1.2 }}
        >
          <h3>Steven Lucas</h3>
          <p>Full-Stack Engineer</p>
        </motion.div>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.2 }}
        >
          <a href='mailto:contact@stivluc.com' className={styles.email}>
            contact@stivluc.com
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ProfileCard;
