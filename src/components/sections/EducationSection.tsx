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
    <section ref={sectionRef} className="relative min-h-screen py-16">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-2 mb-5 md:mb-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent font-orbitron uppercase tracking-wide">
          Education
        </h2>
        <p className="text-gray-400 mt-2">
          My academic achievements
        </p>
      </div>

      <div className="relative mx-auto px-4" style={{
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
  initial={{ opacity: 0, y: 100 }}
  whileInView={{ 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.2,      // Reduced bounce
      duration: 1.8,    // Increased duration
      delay: index * 0.3 // Increased delay between cards
    }
  }}
  viewport={{ once: false }}
  exit={{ 
    opacity: 0, 
    y: -100,
    transition: {
      duration: 0.5    // Increased exit duration
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
                    initial={{ opacity: 0, scaleY: 0 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-[-5rem] left-1/2 w-[2px] h-16 -translate-x-1/2 origin-top"
                    style={{
                      background: 'linear-gradient(to bottom, rgb(6 182 212), rgb(59 130 246))'
                    }}
                  />
                  
                  {/* Circle */}
                  <EducationTimelineNode
                    isVisible={visibleNodes.includes(index)}
                    logo={edu.logo}
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