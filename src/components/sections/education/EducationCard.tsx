// src/components/sections/education/EducationCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { EducationCardProps } from '@/types/education';
import { Calendar } from 'lucide-react'; 

const EducationCard: React.FC<EducationCardProps> = ({ education, onInView }) => {
  return (
    <motion.div
      className="w-full"
      initial={{ y: 50, scale: 0.9 }}
      whileInView={{ y: 0, scale: 1 }}
      exit={{ y: -50, scale: 0.9 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false, margin: "-100px" }}
      onAnimationComplete={onInView}
    >
      <div className="relative w-full max-w-md mx-auto">
        {/* 15% transparency gradient border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-orange via-hot-pink to-cyber-cyan rounded-lg opacity-15 animate-gradient-x blur-sm" />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-orange via-hot-pink to-cyber-cyan rounded-lg opacity-15 animate-gradient-x" />
        {/* 15% transparency glass card */}
        <div className="relative bg-black/15 backdrop-blur-sm border border-white/15 shadow-sm p-6 rounded-lg hover:bg-black/25 hover:border-white/25 transition-all duration-700">
          {/* Degree and Institution */}
          <h3 className="flex flex-col lg:flex-row items-baseline gap-2 lg:gap-3 text-lg mb-2">
            <span className="font-bold text-neon-orange font-orbitron">{education.degree}</span>
          </h3>
      
          <span className="text-cyber-cyan text-lg font-medium">{education.institution}</span>
        
          
          {/* Duration */}
          <p className="text-hot-pink text-sm flex items-center mt-2 mb-3 font-medium">
            <Calendar size={14} className='mr-2' />
            {education.duration}
          </p>
          
          {/* Description */}
          <p className="text-light-gray mt-3 text-sm leading-relaxed">{education.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default EducationCard;