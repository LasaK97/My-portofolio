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
        {/* 15% transparency gradient border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-orange via-hot-pink to-cyber-cyan rounded-lg opacity-15 animate-gradient-x blur-sm" />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-orange via-hot-pink to-cyber-cyan rounded-lg opacity-15 animate-gradient-x" />
        {/* 15% transparency glass card */}
        <div className="relative bg-black/15 backdrop-blur-sm border border-white/15 shadow-sm p-6 rounded-lg hover:bg-black/25 hover:border-white/25 transition-all duration-700">
          {/* Title and Company */}
          <h3 className="flex flex-col lg:flex-row items-baseline gap-2 lg:gap-3 text-lg">
            <span className="font-bold text-neon-orange font-orbitron">{experience.title}</span>
            
          </h3>
          <span className="text-cyber-cyan text-lg font-medium">{experience.company}</span>
          {/* Duration */}
          <p className="text-hot-pink text-sm flex items-center mt-2 mb-3 font-medium">
            <Calendar size={14} className='mr-2' />
            {experience.duration}
          </p>
          
          {/* Description */}
          <p className="text-light-gray mt-3 text-sm leading-relaxed">{experience.description}</p>
        </div>
      </div>
      
      {/* Connecting Line - Only visible on desktop */}
      <motion.div
        className="connecting-line hidden lg:block absolute top-1/2 -translate-y-1/2"
        style={{
          [position === 'left' ? 'right' : 'left']: '0',
          width: '2rem',
          height: '2px',
          background: 'linear-gradient(90deg, rgb(59, 130, 246) 0%, rgb(139, 92, 246) 50%, rgb(6, 182, 212) 100%)',
          backgroundSize: '200% 100%',
          animation: 'gradientFlowHorizontal 3s ease-in-out infinite alternate',
          boxShadow: '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)'
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