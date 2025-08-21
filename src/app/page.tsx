// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { TypingAnimation } from '../components/animations/TypingAnimation';
import { FaceDetection } from '../components/animations/FaceDetection';
import NeuralBackground from '../components/animations/NeuralBackground';
import { Navigation } from '../components/common/Navigation';
import { Header } from '../components/common/Header';
import { AboutSection } from '../components/sections/AboutSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import EducationSection from '@/components/sections/EducationSection';
import SkillsSection from '@/components/sections/SkillsSection';

export default function Home() {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-void-black relative">
      <NeuralBackground />
      <div className="relative z-10">
        <Header />
        <Navigation />

      {/* Home Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-16 md:pt-20">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255, 107, 53, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 107, 53, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left side - Profile Image */}
            <div className="lg:w-5/12 flex justify-center lg:justify-start">
              <div className="relative group">
                {/* Animated border container */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon-orange via-hot-pink to-cyber-cyan rounded-2xl animate-gradient-x" />
                <div className="absolute inset-0 bg-gradient-to-r from-neon-orange via-hot-pink to-cyber-cyan rounded-2xl animate-gradient-x blur-xl opacity-50" />
                
                {/* Image container */}
                <div className="relative m-1 bg-charcoal rounded-2xl overflow-hidden w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
                  <Image
                    src="/images/profile.jpg"
                    alt="Lasantha Kulasooriya - AI Engineer"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                  <FaceDetection isActive={showAnimation} />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-void-black/50 via-transparent to-transparent" />
                </div>
                
                {/* Floating elements - Hidden on small mobile */}
                <div className="hidden sm:block absolute -top-4 -right-4 w-6 h-6 md:w-8 md:h-8 bg-neon-orange rounded-full animate-neural-pulse" />
                <div className="hidden sm:block absolute -bottom-4 -left-4 w-4 h-4 md:w-6 md:h-6 bg-cyber-cyan rounded-full animate-float" />
              </div>
            </div>

            {/* Right side - Content */}
            <div className="lg:w-7/12 text-center lg:text-left">
              <TypingAnimation />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-medium-gray animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-wide">Scroll to explore</span>
            <div className="w-px h-8 bg-gradient-to-b from-neon-orange to-transparent" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative min-h-screen">
        <AboutSection />
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative min-h-screen">
        <ExperienceSection />
      </section>

      {/* Education Section */}
      <section id="education" className="relative min-h-screen">
        <EducationSection />
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative min-h-screen">
        <SkillsSection />
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative min-h-screen">
        <ProjectsSection />
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative min-h-screen">
        <ContactSection />
      </section>
      </div>
    </div>
  );
}