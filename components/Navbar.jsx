'use client';

import React, { useState, useEffect } from 'react';
import { FaPhone, FaBars, FaTimes } from 'react-icons/fa';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import { navSections } from '@/config/navSections';
import { toKebabCase } from '@/utils/toKebabCase';
import { socialIcons } from '@/config/socialIcons';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 880);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Custom smooth scroll function with easing
  const smoothScrollTo = (targetY, duration = 600) => {
    const startY = window.pageYOffset;
    const distanceY = targetY - startY;
    let startTime = null;

    // Easing function: easeOutQuad
    const easeOutQuad = (t) => t * (2 - t);

    const animationFrame = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easeOutQuad(progress);

      window.scrollTo(0, startY + distanceY * easeProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animationFrame);
      }
    };

    requestAnimationFrame(animationFrame);
  };

  // Function to handle smooth scrolling and offset
  const handleNavLinkClick = (event, section) => {
    event.preventDefault();
    setMobileOpen(false); // Close mobile menu if open
    const element = document.getElementById(toKebabCase(section));
    if (element) {
      const yOffset = -80; // Adjust for navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      // Use custom smoothScrollTo function
      smoothScrollTo(y, 800); // Adjust duration as needed
    }
  };

  return (
    <nav className={`${styles.navbar} ${mobileOpen ? styles.open : ''}`}>
      <div className={styles.navContent}>
        {/* Logo */}
        <div className={styles.logo}>
          <a href='#hero' onClick={(e) => handleNavLinkClick(e, 'Hero')}>
            <Image
              src={isMobile ? '/StivlucNoir.svg' : '/Logo.svg'}
              alt='Logo'
              width={isMobile ? 120 : 45}
              height={40}
              sizes='100vw'
              priority
            />
          </a>
        </div>
        {/* Desktop Menu */}
        <ul className={styles.desktopMenu}>
          {navSections.map((section) => (
            <li key={section}>
              <a href={`#${toKebabCase(section)}`} onClick={(e) => handleNavLinkClick(e, section)}>
                {section}
              </a>
            </li>
          ))}
        </ul>
        {/* Right Side Icons */}
        <div className={styles.rightIcons}>
          {/* Separator */}
          <div className={styles.separator}></div>
          {/* Social Icons */}
          {!isMobile &&
            socialIcons
              .filter((icon) => !icon.isMobileOnly)
              .map((icon) => (
                <a
                  key={icon.label}
                  href={icon.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`${styles.iconButton} ${styles.socialIcon}`}
                >
                  {icon.icon}
                </a>
              ))}
          {/* Mobile Menu Button and Phone Icon */}
          {isMobile && (
            <>
              <a href='tel:+33688074187' className={`${styles.iconButton} ${styles.callButton}`}>
                <FaPhone aria-label='Phone Number' />
              </a>
              <button className={styles.menuButton} onClick={handleMobileToggle}>
                {mobileOpen ? <FaTimes aria-label='Close Menu' /> : <FaBars aria-label='Menu' />}
              </button>
            </>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <ul>
            {navSections.map((section) => (
              <li key={section}>
                <a href={`#${toKebabCase(section)}`} onClick={(e) => handleNavLinkClick(e, section)}>
                  {section}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.separator}></div>
          <div className={styles.mobileSocialIcons}>
            {/* Social Icons aligned horizontally without text */}
            {socialIcons
              .filter((icon) => !icon.isMobileOnly)
              .map((icon) => (
                <a
                  key={icon.label}
                  href={icon.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.mobileSocialIcon}
                >
                  {icon.icon}
                </a>
              ))}
            {/* Keep the phone button only on mobile */}
            {isMobile && (
              <a href='tel:+33688074187' className={styles.mobileSocialIcon}>
                <FaPhone aria-label='Phone Number' />
              </a>
            )}
          </div>
          <div className={styles.mobileFooter}>
            <p>© {new Date().getFullYear()} Steven Lucas</p>
            <p>Developed with NextJS & SCSS</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
