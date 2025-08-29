// src/app/page.tsx
'use client';

import NeuralBackground from '../components/animations/NeuralBackground';
import { Header } from '../components/common/Header';
import HeroSection from '../components/sections/HeroSection';
import { AnimationProvider } from '../contexts/AnimationContext';
import { LoadingProvider } from '../components/providers/LoadingProvider';
import { AboutSection } from '../components/sections/AboutSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import EducationSection from '@/components/sections/EducationSection';
import SkillsSection from '@/components/sections/SkillsSection';

export default function Home() {

  return (
    <LoadingProvider>
      <AnimationProvider>
        <div className="min-h-screen bg-void-black relative">
          <NeuralBackground />
          <div className="relative z-10">
            <Header />

        {/* Hero Section */}
        <HeroSection />

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
      </AnimationProvider>
    </LoadingProvider>
  );
}