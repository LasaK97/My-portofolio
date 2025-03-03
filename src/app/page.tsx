// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { TypingAnimation } from '../components/animations/TypingAnimation';
import { FaceDetection } from '../components/animations/FaceDetection';
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
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Navigation />

      {/* Home Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center lg:gap-8">
          {/* Left side - Smaller Image */}
          <div className="lg:w-5/12 flex justify-end pr-4">
            <div className="relative w-64 h-64 md:w-72 md:h-72">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg animate-" />
              <div className="absolute inset-2 rounded-lg overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/profile.jpg"
                    alt="Profile"
                    fill
                    className="object-cover z-0"
                    priority
                  />
                  <FaceDetection isActive={showAnimation} />
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Text */}
          <div className="lg:w-7/12 lg:pl-4 pt-6 lg:pt-0">
            <TypingAnimation />
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
  );
}