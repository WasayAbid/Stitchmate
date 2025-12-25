import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/homepage/Navbar';
import HeroSection from '@/components/homepage/HeroSection';
import FabricFlowSection from '@/components/homepage/FabricFlowSection';
import AIMagicSection from '@/components/homepage/AIMagicSection';
import DesignPreviewSection from '@/components/homepage/DesignPreviewSection';
import WhyStitchMateSection from '@/components/homepage/WhyStitchMateSection';
import FutureVisionSection from '@/components/homepage/FutureVisionSection';
import FooterSection from '@/components/homepage/FooterSection';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger on component mount
    ScrollTrigger.refresh();

    return () => {
      // Cleanup ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fdf8f3] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FabricFlowSection />
      <AIMagicSection />
      <DesignPreviewSection />
      <WhyStitchMateSection />
      <FutureVisionSection />
      <FooterSection />
    </div>
  );
};

export default Index;
