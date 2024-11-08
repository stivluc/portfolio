import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';

export const socialIcons = [
  {
    href: 'https://linkedin.com/in/stivluc',
    icon: <FaLinkedin aria-label='LinkedIn' />,
    label: 'LinkedIn',
    isMobileOnly: false,
  },
  {
    href: 'https://github.com/stivluc',
    icon: <FaGithub aria-label='GitHub' />,
    label: 'GitHub',
    isMobileOnly: false,
  },
  {
    href: 'mailto:contact@stivluc.com',
    icon: <FaEnvelope aria-label='Email' />,
    label: 'Email',
    isMobileOnly: false,
  },
  {
    href: 'tel:+33688074187',
    icon: <FaPhone aria-label='Phone Number' />,
    label: 'Call',
    isMobileOnly: true,
  },
];
