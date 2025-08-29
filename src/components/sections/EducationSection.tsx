// src/components/sections/EducationSection.tsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Education } from '@/types/education';
import EducationCard from './education/EducationCard';
import EducationTimelineNode from './education/EducationTimelineNode';

const EducationSection: React.FC = () => {
  const [visibleNodes, setVisibleNodes] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const educationData: Education[] = [
    {
      id: 1,
      degree: "BSc (Hons) in Data Science",
      institution: "University of Peradeniya",
      duration: "2019 - 2024",
      description: "I graduated with an honors degree in Data Science, gaining expertise through hands-on projects and research.",
      logo: "/images/education/uop.png"
    },
    {
        id: 2,
        degree: "A/L and O/L education",
        institution: "St. Anthony's Boys College, Kandy",
        duration: "2008 - 2017",
        description: "Completed Advanced Level education in the Mathematics stream, with a focus on Combined Mathematics, Physics, and Chemistry.",
        logo: "/images/education/sack.png"
      },
    // Add other education data...
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen py-20 md:py-20 lg:py-24">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-2 mb-5 md:mb-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent font-orbitron uppercase tracking-wide">
          Neural Academy
        </h2>
        <p className="text-medium-gray mt-2 text-base md:text-lg px-4">
          Foundation of AI expertise through academic excellence
        </p>
      </div>

      {/* Mobile Layout - Just Cards */}
      <div className="lg:hidden px-4 sm:px-6">
        <div className="space-y-6">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Mobile Card */}
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-lg opacity-15 animate-gradient-x blur-sm" />
                <div className="relative bg-black/15 backdrop-blur-sm border border-white/15 shadow-sm p-4 sm:p-6 rounded-lg">
                  <h3 className="font-bold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text font-orbitron text-base sm:text-lg">
                    {edu.degree}
                  </h3>
                  <p className="text-cyan-400 text-sm sm:text-base font-medium mt-1">
                    {edu.institution}
                  </p>
                  <p className="text-purple-400 text-xs sm:text-sm mt-2">
                    {edu.duration}
                  </p>
                  <p className="text-light-gray mt-3 text-xs sm:text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop Layout - Original Grid */}
      <div className="hidden lg:block relative mx-auto px-4" style={{
            maxWidth: `${educationData.length === 1 ? '500px' : 
                        educationData.length === 2 ? '900px' : '1200px'}`
            }}>
            <div className={`grid grid-cols-1 ${
                educationData.length === 1 ? 'md:grid-cols-1' :
                educationData.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
            } gap-8 md:gap-12 mx-auto`}>
          <AnimatePresence mode="wait">
            {educationData.map((edu, index) => (
              <div key={edu.id} className="relative">
                {/* Card */}
                <motion.div
  initial={{ y: 100, scale: 0.9 }}
  whileInView={{ 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 1.8,
      delay: index * 0.3
    }
  }}
  viewport={{ once: false }}
  exit={{ 
    y: -100,
    scale: 0.9,
    transition: {
      duration: 0.5
    }
  }}
  className="mb-20 md:mb-24"
>
                  <EducationCard
                    education={edu}
                    onInView={() => setVisibleNodes([...visibleNodes, index])}
                  />
                </motion.div>
                
                {/* Circle and Connecting Line - Only on Desktop */}
                <div className="hidden md:block absolute top--5bottom-0 left-1/2 -translate-x-1/2">
                  {/* Connecting Line */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-[-5rem] left-1/2 w-[2px] h-16 -translate-x-1/2 origin-top"
                    style={{
                      background: 'linear-gradient(180deg, rgb(59, 130, 246) 0%, rgb(139, 92, 246) 50%, rgb(6, 182, 212) 100%)',
                      backgroundSize: '100% 200%',
                      animation: 'gradientFlow 3s ease-in-out infinite alternate',
                      boxShadow: '0 0 15px rgba(59, 130, 246, 0.6), 0 0 30px rgba(139, 92, 246, 0.4)'
                    }}
                  />
                  
                  {/* Circle */}
                  <EducationTimelineNode
                    logo={edu.logo}
                    isVisible={visibleNodes.includes(index)}
                  />
                </div>
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;