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
  const MotionComponent = isLink ? motion.a : motion.button;

  return (
    <MotionComponent
      className={`custom-button ${variant} ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? undefined : onClick}
      href={isLink ? href : undefined}
      target={isLink ? '_blank' : undefined}
      rel={isLink ? 'noopener noreferrer' : undefined}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      {...rest}
    >
      <span className='button-text'>{children}</span>
      {Icon && (
        <motion.span className='button-icon' whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
          <Icon />
        </motion.span>
      )}
    </MotionComponent>
  );
};

export default Button;
