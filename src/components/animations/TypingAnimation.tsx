// src/components/animations/TypingAnimation.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, Sparkles, ArrowRight } from 'lucide-react';
import CyberButton from '../ui/CyberButton';

export const TypingAnimation = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const fullName = "Lasantha Kulasooriya";
  const phrases = useMemo(() =>[
    "I am a Data Scientist & AI Engineer.",
    "I turn data into intelligent solutions.",
    "I discover meaningful patterns in data.",
    "I build and optimize AI models.",
    "I solve complex problems through code."
],[]);


  const techWords = [
    "Data Science",
    "Machine Learning",
    "NLP",
    "Deep Learning",
    "Computer Vision",
    "Artificial Intelligence",
    "MLOps",
    "Big Data Analytics",
    "Data Mining",
    "Forecasting",
    "Pattern Recognition",
    "Robotics",
  ];

  // Name typing effect
  useEffect(() => {
    if (name.length < fullName.length) {
      const timeoutId = setTimeout(() => {
        setName(fullName.slice(0, name.length + 1));
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [name]);

  // Phrase typing effect
  useEffect(() => {
    if (name !== fullName) return;

    const currentPhrase = phrases[loopNum % phrases.length];
    const shouldType = !isDeleting && text.length < currentPhrase.length;
    const shouldDelete = isDeleting && text.length > 0;

    if (shouldType) {
      const timeoutId = setTimeout(() => {
        setText(currentPhrase.slice(0, text.length + 1));
      }, 50);
      return () => clearTimeout(timeoutId);
    }

    if (shouldDelete) {
      const timeoutId = setTimeout(() => {
        setText(currentPhrase.slice(0, text.length - 1));
      }, 30);
      return () => clearTimeout(timeoutId);
    }

    if (!isDeleting && text === currentPhrase) {
      const timeoutId = setTimeout(() => setIsDeleting(true), 1500);
      return () => clearTimeout(timeoutId);
    }

    if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(prev => prev + 1);
    }
  }, [text, isDeleting, loopNum, name]);

  // Cursor blink effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(intervalId);
  }, [phrases]);

  // Random keyword highlight effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newIndex = Math.floor(Math.random() * techWords.length);
      setActiveWordIndex(newIndex);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [techWords.length]);

  return (
    <div className="space-y-3">
      {/* Name */}
      <h1 className="text-4xl md:text-6xl font-bold font-orbitron">
        <span className="text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text">
          {name}
        </span>
        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-primary-accent animate-neural-pulse`}>|</span>
      </h1>
      
      {/* Dynamic Text */}
      <div className="h-14">
        <p className="text-xl md:text-2xl text-off-white font-medium">
          {text}
          <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-secondary-accent animate-neural-pulse`}>|</span>
        </p>
      </div>

      {/* Professional Skill Tags */}
      <div className="flex flex-wrap gap-2 mt-6 justify-center">
        {techWords.map((word, index) => (
          <motion.div
            key={word}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`px-3 py-1 rounded-full text-sm transition-all duration-500 cursor-default
              ${index === activeWordIndex 
                ? 'bg-primary-accent/20 text-primary-accent border border-primary-accent/40 shadow-lg' 
                : 'bg-white/5 text-medium-gray border border-white/10'
              }
              hover:bg-secondary-accent/10 hover:text-secondary-accent hover:border-secondary-accent/30
            `}
          >
            {word}
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="flex flex-col sm:flex-row gap-4 mt-8"
      >
        <CyberButton 
          variant="primary" 
          size="lg"
          icon={<Sparkles size={20} />}
          className="group"
          onClick={() => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
              projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Explore AI Projects
          <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </CyberButton>
        
        <CyberButton 
          variant="secondary" 
          size="lg"
          icon={<Download size={20} />}
          href="/resume/Lasantha_Kulasooriya_Resume.pdf"
        >
          Download Resume
        </CyberButton>
      </motion.div>

      {/* Status Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="flex items-center gap-2 mt-6 text-sm text-medium-gray"
      >
        <div className="w-2 h-2 bg-green-400 rounded-full animate-neural-pulse" />
        <span>Available for AI/ML opportunities</span>
      </motion.div>
    </div>
  );
};

export default TypingAnimation;