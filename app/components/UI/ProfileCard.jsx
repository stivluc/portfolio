import { motion } from 'framer-motion';
import { FaTwitter, FaInstagram, FaDribbble } from 'react-icons/fa';
import styles from './ProfileCard.module.scss';

const ProfileCard = () => {
  return (
    <div className={styles.profileWrapper}>
      {/* Slices animation */}
      <div className={styles.slices}>
        <motion.div
          className={`${styles.slice} ${styles.slice3}`}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />
        <motion.div
          className={`${styles.slice} ${styles.slice2}`}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
        <motion.div
          className={`${styles.slice} ${styles.slice1}`}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
        <motion.div
          className={`${styles.profileImageContainer}`}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className={styles.profileBackgroundCircle}></div>
          <div className={styles.profileImage}>
            <img src='/profile.png' alt='Profile' />
          </div>
        </motion.div>
      </div>

      {/* Profile Image with a background circle */}

      {/* Text and Icons */}
      <div className={styles.textContainer}>
        <h3>Andrew Scott</h3>
        <p>Web-designer, developer</p>
        <div className={styles.socialIcons}>
          <FaTwitter className={styles.icon} />
          <FaInstagram className={styles.icon} />
          <FaDribbble className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
