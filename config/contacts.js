import { FaGithub, FaLinkedinIn, FaPhone } from 'react-icons/fa';

export const contacts = [
  {
    name: 'Phone',
    icon: <FaPhone aria-label='Phone Number' />,
    text: '+33 (0) 6 88 07 41 87',
    href: 'tel:+33688074187',
  },
  {
    name: 'GitHub',
    icon: <FaGithub aria-label='GitHub' />,
    text: 'github.com/stivluc',
    href: 'https://github.com/stivluc',
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedinIn aria-label='LinkedIn' />,
    text: 'linkedin.com/in/stivluc',
    href: 'https://www.linkedin.com/in/stivluc',
  },
];
