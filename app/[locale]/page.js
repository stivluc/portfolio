'use client';

import ContactSection from '@/components/ContactSection';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import ResumeSection from '@/components/ResumeSection';
import ServicesSection from '@/components/ServicesSection';
import React from 'react';

export default function Home() {
  return (
    <React.Fragment>
      <HeroSection />
      <ServicesSection />
      <ResumeSection />
      <ProjectsSection />
      <ContactSection />
    </React.Fragment>
  );
}
