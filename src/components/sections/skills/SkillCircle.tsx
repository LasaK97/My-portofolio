// src/components/sections/skills/SkillCircle.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SkillCircleProps } from '@/types/skills';

const SkillCircle: React.FC<SkillCircleProps> = ({ name, logo, percentage, delay, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const circleSize = 70;
  const strokeWidth = 3;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div 
      className="flex flex-col items-center relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, delay }}
        className="relative cursor-pointer"
      >
        <svg 
          width={circleSize} 
          height={circleSize} 
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(6, 182, 212, 0.1)"
            strokeWidth={strokeWidth}
          />
          
          {/* Progress circle with gradient animation */}
          <motion.circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="transparent"
            stroke={`url(#gradient-${index})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, delay }}
          />

          {/* Animated gradient */}
          <defs>
            <linearGradient 
              id={`gradient-${index}`}
              x1="0%" 
              y1="0%" 
              x2="100%" 
              y2="0%"
            >
              <stop offset="0%" stopColor="#06b6d4">
                <animate
                  attributeName="stop-color"
                  values="#06b6d4; #3b82f6; #a855f7; #06b6d4"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#3b82f6">
                <animate
                  attributeName="stop-color"
                  values="#3b82f6; #a855f7; #06b6d4; #3b82f6"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
        </svg>

        {/* Skill Logo and Percentage overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-10 h-10 flex items-center justify-center">
            {!isHovered ? (
              <div className="relative w-full h-full">
                <Image
                  src={logo}
                  alt={name}
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 rounded-full">
                <span className="text-sm font-bold text-cyan-400">
                  {percentage}%
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Skill Name */}
      <span className="mt-2 text-xs text-gray-400 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
};

export default SkillCircle;