// src/components/sections/experience/ExperienceSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Experience } from '@/types/experience';
import ExperienceCard from './experience/ExperienceCard';
import TimelineNode from './experience/TimelineNode';

const ExperienceSection: React.FC = () => {
  const [visibleNodes, setVisibleNodes] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const experiences: Experience[] = [
    {
      id: 1,
      title: "Data Scientist",
      company: "Hype Invention",
      duration: "2023/10 - Present",
      description: "Working on developing AI solutions for advanced robotics, integrating machine learning, computer vision, and sensor fusion to enhance autonomy and real-world adaptability.",
      isCurrentJob: true,
      logo: "/images/work/hype.png"
    },
    {
      id: 2,
      title: "Data Science & AI Engineer - Associate",
      company: "Janashakthi Insurance",
      duration: "2023/07 - 2023/10",
      description: "I have developed machine learning models for claim prediction and insurance recommendations, enhancing risk assessment and decision-making.",
      isCurrentJob: false,
      logo: "/images/work/janashakthi.png"
    },
    {
      id: 3,
      title: "Data Science & AI Engineer - Internship",
      company: "Janashakthi Insurance",
      duration: "2023/01 - 2023/07",
      description: "I developed and implemented an all-in-one insurance dashboard to track and analyze daily data, improving insights and decision-making.",
      isCurrentJob: false,
      logo: "/images/work/janashakthi.png"
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleNodes([...Array(experiences.length).keys()]);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [experiences.length]);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-16 md:py-20 lg:py-24">
      <div className="text-center mb-24">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-2 mb-5 md:mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent font-orbitron uppercase tracking-wide">
        Professional Journey
        </h2>
        <p className="text-medium-gray mt-2 text-lg">
         Building AI solutions in the real world
        </p>
      </div>
      {/* Timeline container */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Vertical Timeline Line with Tapered Edges */}
        <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 hidden lg:block">
          {/* Main tapered line */}
          <div className="relative h-full w-1 flex flex-col items-center">
            {/* Top taper - transparent to gradient colors */}
            <div className="h-20 w-full" style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, rgba(59, 130, 246, 0.8) 100%)',
              backdropFilter: 'blur(4px)'
            }} />
            <div className="absolute top-0 h-20 w-full blur-sm" style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.2) 50%, rgba(59, 130, 246, 0.5) 100%)'
            }} />
            <div className="absolute top-0 h-20 w-full blur-md" style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, rgba(59, 130, 246, 0.3) 100%)'
            }} />
            
            {/* Middle section - full thickness with gradient */}
            <div className="flex-1 w-full" style={{
              background: 'linear-gradient(180deg, rgb(59, 130, 246) 0%, rgb(139, 92, 246) 50%, rgb(6, 182, 212) 100%)',
              backgroundSize: '100% 200%',
              animation: 'gradientFlow 4s ease-in-out infinite alternate',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.4)'
            }} />
            
            {/* Bottom taper - gradient colors to transparent */}
            <div className="h-20 w-full" style={{
              background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.8) 0%, rgba(6, 182, 212, 0.3) 50%, transparent 100%)',
              backdropFilter: 'blur(4px)'
            }} />
            <div className="absolute bottom-0 h-20 w-full blur-sm" style={{
              background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.5) 0%, rgba(6, 182, 212, 0.2) 50%, transparent 100%)'
            }} />
            <div className="absolute bottom-0 h-20 w-full blur-md" style={{
              background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.3) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%)'
            }} />
          </div>
        </div>

        <div className="relative space-y-18">
          <AnimatePresence mode="wait">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative">
                <ExperienceCard
                  experience={exp}
                  position={index % 2 === 0 ? 'left' : 'right'}
                  onInView={() => setVisibleNodes([...visibleNodes, index])}
                />
                <TimelineNode
                  isCurrentJob={exp.isCurrentJob}
                  isVisible={visibleNodes.includes(index)}
                  logo={exp.logo}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;