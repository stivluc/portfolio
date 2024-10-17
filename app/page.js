'use client';

import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import React from 'react';

export default function Home() {
  return (
    <React.Fragment>
      <HeroSection />
      <ServicesSection />
    </React.Fragment>
  );
}
