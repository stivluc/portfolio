import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FAQitem.module.scss';
import { useTranslations } from 'next-intl';

const FAQItem = ({ questionKey, answerKey, index }) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.div
      className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div
        onClick={toggleOpen}
        className={styles.questionWrapper}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <div>
          <motion.span className={styles.questionIndex}>{`0${index}/`}</motion.span>
          <motion.span className={styles.question}>{t(questionKey)}</motion.span>
        </div>
        <motion.div
          className={styles.iconWrapper}
          animate={{ rotate: isOpen ? 45 : 0 }}
          whileHover={{ rotate: 45 }}
          transition={{ duration: 0.1 }}
        >
          <span className={styles.icon}>+</span>
        </motion.div>
      </motion.div>
      <AnimatePresence initial={true}>
        {isOpen && (
          <motion.div
            className={styles.faqAnswer}
            initial={{ height: 0, marginTop: 0, opacity: 0 }}
            animate={{ height: 'auto', marginTop: '16px', opacity: 1 }}
            exit={{ height: 0, marginTop: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {t(answerKey)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQItem;
