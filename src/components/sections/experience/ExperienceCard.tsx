// src/components/sections/experience/ExperienceCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ExperienceCardProps } from '@/types/experience';
import { cardVariants,connectingLineVariants } from '@/animations/experienceAnimations';
import { Calendar } from 'lucide-react';


const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, position, onInView }) => {
  return (
    <motion.div
      className={`relative ${
        position === 'left' 
          ? 'lg:pr-16' 
          : 'lg:pl-16 lg:ml-auto'
      } w-full lg:w-[calc(50%-2rem)]`}
      custom={position}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, margin: "-100px" }}
      onAnimationComplete={onInView}
    >
      <div className="relative">
        {/* Gradient Border */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 exp-gradient-rotate" />
        <div className="relative m-[2px] bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg">
          {/* Title and Company */}
          <h3 className="flex flex-col lg:flex-row items-baseline gap-2 lg:gap-3 text-lg">
            <span className="font-bold text-cyan-400">{experience.title}</span>
            
          </h3>
          {/* <span className="text-gray-400 hidden lg:inline">|</span> */}
          <span className="text-gray-300">{experience.company}</span>
          {/* Duration */}
          <p className="text-gray-400 text-sm flex items-center mt-1 mb-1">
            <Calendar size={14} className='mr-1' />
            {experience.duration}</p>
          
          {/* Description */}
          <p className="text-gray-300 mt-1 text-xs leading-relaxed text-justify">{experience.description}</p>
        </div>
      </div>
      
      {/* Connecting Line - Only visible on desktop */}
      <motion.div
        className="connecting-line hidden lg:block absolute top-1/2 -translate-y-1/2"
        style={{
          [position === 'left' ? 'right' : 'left']: '0',
          width: '2rem',
          height: '2px',
          background: 'linear-gradient(to right, rgb(6 182 212), rgb(59 130 246))'
        }}
        variants={connectingLineVariants}
        custom={position}
        initial="hidden"
        whileInView="visible"
        exit="exit"
      />
    </motion.div>
  );
};

export default ExperienceCard;