'use client';

import React from 'react';
import HeroSection from './components/HeroSection';
import ProfileCard from './components/UI/ProfileCard';

export default function Home() {
  return (
    <React.Fragment>
      <HeroSection />
      <HeroSection />

      <ProfileCard />
    </React.Fragment>
  );
}
