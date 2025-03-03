// src/components/sections/education/EducationCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { EducationCardProps } from '@/types/education';
import { Calendar } from 'lucide-react'; 

const EducationCard: React.FC<EducationCardProps> = ({ education, onInView }) => {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      viewport={{ once: false, margin: "-100px" }}
      onAnimationComplete={onInView}
    >
      <div className="relative w-full max-w-md mx-auto">
        {/* Gradient Border */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 exp-gradient-rotate" />
        <div className="relative m-[2px] bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg">
          {/* Degree and Institution */}
          <h3 className="flex flex-col lg:flex-row items-baseline gap-2 lg:gap-3 text-lg">
            <span className="font-bold text-cyan-400">{education.degree}</span>
            {/* <span className="text-gray-400 hidden lg:inline">|</span> */}
          </h3>
      
          <span className="text-gray-300">{education.institution}</span>
        
          
          {/* Duration */}
          <p className="text-gray-400 text-sm flex items-center mt-1 mb-1">
            <Calendar size={14} className='mr-1' />
            {education.duration}</p>
          
          {/* Description */}
          <p className="text-gray-300 mt-1 text-xs leading-relaxed text-justify">{education.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default EducationCard;