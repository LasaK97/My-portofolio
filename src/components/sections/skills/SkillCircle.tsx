// src/components/sections/skills/SkillCircle.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SkillCircleProps } from '@/types/skills';

const SkillCircle: React.FC<SkillCircleProps> = ({ name, logo, percentage, delay, index, isVisible = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPercentage, setShowPercentage] = useState(false);
  const [flipInterval, setFlipInterval] = useState<NodeJS.Timeout | null>(null);
  const circleSize = 70;
  const strokeWidth = 3;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Randomized flip timing
  useEffect(() => {
    const randomInterval = 2000 + Math.random() * 3000 + (index * 200); // 2-5 seconds + stagger
    const interval = setInterval(() => {
      setShowPercentage(prev => !prev);
    }, randomInterval);
    setFlipInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [index]);

  // Cleanup interval
  useEffect(() => {
    return () => {
      if (flipInterval) clearInterval(flipInterval);
    };
  }, [flipInterval]);

  return (
    <div 
      className="flex flex-col items-center relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: isHovered ? 1.05 : 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, delay }}
        className="relative cursor-pointer hover:drop-shadow-lg"
      >
        <svg 
          width={circleSize} 
          height={circleSize} 
          className="transform -rotate-90"
        >
          {/* Background circle - Neural cyberpunk style */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth={strokeWidth}
          />
          
          {/* Progress circle with gradient animation */}
          <motion.circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="transparent"
            stroke="#3b82f6"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ 
              strokeDashoffset: isVisible ? offset : circumference 
            }}
            transition={{ duration: 1.5, delay: isVisible ? delay : 0 }}
          />
        </svg>

        {/* Flip Content - Icon OR Percentage (not both) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            key={showPercentage || isHovered ? 'percentage' : 'icon'}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center"
          >
            {(showPercentage || isHovered) ? (
              // Show Percentage
              <div className="text-lg font-bold text-blue-400">
                {percentage}%
              </div>
            ) : (
              // Show Icon
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                  src={logo}
                  alt={name}
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Skill Name */}
      <motion.span 
        className="mt-3 text-xs whitespace-nowrap font-medium transition-all duration-300"
        animate={{
          color: isHovered ? '#3b82f6' : '#9e9ea7',
          scale: isHovered ? 1.05 : 1,
          y: isHovered ? -2 : 0
        }}
      >
        {name}
      </motion.span>
    </div>
  );
};

export default SkillCircle;