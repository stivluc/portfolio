import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi'; // Import default icon if needed

const Button = ({
  variant = 'contained',
  disabled = false,
  onClick,
  href,
  icon: Icon = FiArrowUpRight, // Default icon
  children,
  ...rest
}) => {
  const isLink = !!href && !disabled;

  return (
    <motion.a
      className={`custom-button ${variant} ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? undefined : onClick}
      href={isLink ? href : undefined}
      target={isLink ? '_blank' : undefined}
      rel={isLink ? 'noopener noreferrer' : undefined}
      {...rest}
    >
      <span className='button-text' style={{ textDecoration: 'none' }}>
        {children}
      </span>
      {Icon && (
        <motion.span className='button-icon' whileHover={{ scale: 1.2 }} transition={{ type: 'spring', duration: 0.3 }}>
          <Icon />
        </motion.span>
      )}
    </motion.a>
  );
};

export default Button;
