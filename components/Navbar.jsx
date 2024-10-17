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
  const [theme, setTheme] = useState('light');
  const [isMobile, setIsMobile] = useState(false);

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 880);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, [theme]);

  return (
    <nav className={`${styles.navbar} ${mobileOpen ? styles.open : ''}`}>
      <div className={styles.navContent}>
        {/* Logo */}
        <div className={styles.logo}>
          <a href='#hero'>
            <Image
              src={
                isMobile
                  ? theme === 'light'
                    ? '/StivlucNoir.svg'
                    : '/StivlucBlanc.svg'
                  : theme === 'light'
                  ? '/Logo.svg'
                  : '/WhiteLogo.svg'
              }
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
              <a href={`#${toKebabCase(section)}`}>{section}</a>
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
                <FaPhone />
              </a>
              <button className={styles.menuButton} onClick={handleMobileToggle}>
                {mobileOpen ? <FaTimes /> : <FaBars />}
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
                <a href={`#${toKebabCase(section)}`} onClick={handleMobileToggle}>
                  {section}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.separator}></div>
          <div className={styles.mobileSocialIcons}>
            {/* Social Icons alignés horizontalement sans texte */}
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
            {/* Garder le bouton de téléphone uniquement sur mobile */}
            {isMobile && (
              <a href='tel:+33688074187' className={styles.mobileSocialIcon}>
                <FaPhone />
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
