// src/components/sections/experience/TimelineNode.tsx
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TimelineNodeProps } from '@/types/experience';

const TimelineNode: React.FC<TimelineNodeProps> = ({ 
  isCurrentJob,  
  logo 
}) => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, type: "spring" }}
        className="relative"
      >
        <div className="relative w-12 h-12">
          {/* Pulsing effect for current job */}
          {isCurrentJob && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 rounded-full bg-cyan-500 exp-circle-ping" />
              <div className="absolute inset-0 rounded-full bg-cyan-500 exp-circle-ping-delay-1" />
              <div className="absolute inset-0 rounded-full bg-cyan-500 exp-circle-ping-delay-2" />
            </div>
          )}

          {/* Main Circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-white/50 flex items-center justify-center">
              <div className="relative w-8 h-8">
                <Image
                  src={logo}
                  alt="Company logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineNode;