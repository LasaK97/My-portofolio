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
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Lasantha Kulasooriya",
    "alternateName": "Lasantha",
    "description": "AI Engineer and Data Scientist specializing in Machine Learning, Computer Vision, and Natural Language Processing",
    "jobTitle": ["AI Engineer", "Data Scientist", "Machine Learning Engineer"],
    "url": "https://lk-ai.vercel.app",
    "image": "https://lk-ai.vercel.app/images/about-photo.jpg",
    "sameAs": [
      "https://linkedin.com/in/lasantha-kulasooriya",
      "https://github.com/LasaK97"
    ],
    "knowsAbout": [
      "Machine Learning",
      "Artificial Intelligence", 
      "Data Science",
      "Computer Vision",
      "Natural Language Processing",
      "Deep Learning",
      "Python",
      "TensorFlow",
      "PyTorch",
      "Data Analytics"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University of Moratuwa"
    },
    "workLocation": {
      "@type": "Place",
      "name": "Sri Lanka"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "AI Engineer",
      "occupationLocation": {
        "@type": "Country",
        "name": "Sri Lanka"
      }
    }
  };

  return (
    <LoadingProvider>
      <AnimationProvider>
        <div className="min-h-screen bg-void-black relative">
          {/* Structured Data for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          
          <NeuralBackground />
          <div className="relative z-10">
            <header>
              <Header />
            </header>

            <main>
              {/* Hero Section */}
              <section id="home" aria-label="Introduction">
                <HeroSection />
              </section>

              {/* About Section */}
              <section id="about" className="relative min-h-[100dvh] md:min-h-screen" aria-label="About Lasantha Kulasooriya">
                <AboutSection />
              </section>

              {/* Experience Section */}
              <section id="experience" className="relative min-h-[100dvh] md:min-h-screen" aria-label="Professional Experience">
                <ExperienceSection />
              </section>

              {/* Education Section */}
              <section id="education" className="relative min-h-[100dvh] md:min-h-screen" aria-label="Education Background">
                <EducationSection />
              </section>

              {/* Skills Section */}
              <section id="skills" className="relative min-h-[100dvh] md:min-h-screen" aria-label="Technical Skills and Expertise">
                <SkillsSection />
              </section>

              {/* Projects Section */}
              <section id="projects" className="relative min-h-[100dvh] md:min-h-screen" aria-label="Portfolio Projects">
                <ProjectsSection />
              </section>

              {/* Contact Section */}
              <section id="contact" className="relative min-h-[100dvh] md:min-h-screen" aria-label="Contact Information">
                <ContactSection />
              </section>
            </main>
          </div>
        </div>
      </AnimationProvider>
    </LoadingProvider>
  );
}