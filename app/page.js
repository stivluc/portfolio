'use client';

import React from 'react';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';

export default function Home() {
  return (
    <React.Fragment>
      <HeroSection />
      <ServicesSection />
    </React.Fragment>
  );
}
