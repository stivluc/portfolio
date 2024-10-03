'use client';

import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaPhone, FaSun, FaMoon, FaBars, FaTimes, FaEnvelope } from 'react-icons/fa';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import { navSections } from '../config/navSections';
import { toKebabCase } from '../utils/toKebabCase';
import { socialIcons } from '../config/socialIcons';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 880);

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
          <a href='#about'>
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
              width={isMobile ? 140 : 70}
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
          {/* Theme Switcher */}
          <button onClick={toggleTheme} className={`${styles.iconButton} ${styles.themeSwitcher}`}>
            {theme === 'light' ? <FaSun /> : <FaMoon />}
          </button>
          {/* Separator */}
          <div className={styles.separator}></div>
          {/* Social Icons */}
          {!isMobile &&
            socialIcons
              .filter((icon) => !icon.isMobileOnly)
              .map((icon) => {
                return (
                  <a
                    key={icon.label}
                    href={icon.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`${styles.iconButton} ${styles.socialIcon}`}
                  >
                    {icon.icon}
                  </a>
                );
              })}
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
            {socialIcons.map((icon) => {
              if (isMobile && !icon.isMobileOnly && icon.icon === 'FaPhone') return null;
              return (
                <a
                  key={icon.label}
                  href={icon.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.mobileSocialIcon}
                >
                  {icon.icon}
                  <span>{icon.label}</span>
                </a>
              );
            })}
          </div>
          <div className={styles.mobileFooter}>
            <p>
              <span style={{ fontFamily: 'Helvetica, sans-serif' }}>©</span> {new Date().getFullYear()} Steven Lucas
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
