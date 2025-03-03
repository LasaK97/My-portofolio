// src/components/sections/education/EducationTimelineNode.tsx
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { EducationTimelineNodeProps } from '@/types/education';

const EducationTimelineNode: React.FC<EducationTimelineNodeProps> = ({ 
  isVisible, 
  logo 
}) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, type: "spring" }}
      className="relative w-12 h-12"
    >
      {/* Main Circle */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-[2px]">
        <div className="w-full h-full rounded-full bg-white/50 flex items-center justify-center">
          <div className="relative w-8 h-8">
            <Image
              src={logo}
              alt="Institution logo"
              fill
              className="object-contain p-1"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EducationTimelineNode;