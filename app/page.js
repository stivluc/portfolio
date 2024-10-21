'use client';

import HeroSection from '@/components/HeroSection';
import ResumeSection from '@/components/ResumeSection';
import ServicesSection from '@/components/ServicesSection';
import React from 'react';

export default function Home() {
  return (
    <React.Fragment>
      <HeroSection />
      <ServicesSection />
      <ResumeSection />
    </React.Fragment>
  );
}
