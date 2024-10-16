'use client';

import React from 'react';
import HeroSection from './components/HeroSection';
import ProfileCard from './components/UI/ProfileCard';
import ContactSection from './components/ContactSection';

export default function Home() {
  return (
    <React.Fragment>
      <HeroSection />
      <ContactSection />
    </React.Fragment>
  );
}
