'use client';

import React from 'react';
import { Download, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnimation } from '../../contexts/AnimationContext';

export const Header = () => {
  const { animationState, transitionDirection, isFirstLoad } = useAnimation();
  
  const handleDownloadResume = () => {
    // Create an anchor element
    const link = document.createElement('a');
    link.href = '/resume/Lasantha_Kulasooriya_Resume.pdf';
    link.setAttribute('download', 'Lasantha_Kulasooriya_Resume.pdf'); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-4">
      <div className="flex justify-end items-center">
        {/* Download Resume Button */}
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -100 }}
          animate={{
            opacity: animationState === 'visible' ? 1 : 0,
            x: animationState === 'visible' ? 0 : 
               animationState === 'hidden' ? 100 : 
               (transitionDirection === 'fromAbout' ? -100 : -100)
          }}
          transition={{ 
            duration: 1, 
            delay: animationState === 'visible' ? (isFirstLoad ? 0.5 : 0.2) : 0,
            ease: "easeOut" 
          }}
        >
          {/* Download Resume Button */}
          <motion.button
            onClick={handleDownloadResume}
            className="bg-gradient-to-r from-neon-orange to-neon-purple text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg 
            font-semibold flex items-center gap-2 transition-all duration-500 transform"
            whileHover={{ 
              scale: 1.08,
              boxShadow: "0 15px 35px rgba(6, 182, 212, 0.4)",
              y: -3
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <Download size={18} />
            <span className="sm:inline hidden">Download My Resume</span>
          </motion.button>
        </motion.div>
      </div>
    </header>
  );
};