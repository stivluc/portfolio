import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';

export const socialIcons = [
  {
    href: 'https://linkedin.com/in/stivluc',
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    isMobileOnly: false,
  },
  {
    href: 'https://github.com/stivluc',
    icon: <FaGithub />,
    label: 'GitHub',
    isMobileOnly: false,
  },
  {
    href: 'mailto:contact@stivluc.com',
    icon: <FaEnvelope />,
    label: 'Email',
    isMobileOnly: false,
  },
  {
    href: 'tel:+33688074187',
    icon: <FaPhone />,
    label: 'Call',
    isMobileOnly: true,
  },
];
