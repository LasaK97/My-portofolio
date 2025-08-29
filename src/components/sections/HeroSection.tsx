// src/components/sections/HeroSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ExternalLink, BookOpen } from 'lucide-react';
import { useAnimation } from '../../contexts/AnimationContext';

const HeroSection = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [currentTypeText, setCurrentTypeText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const { currentSection, animationState, transitionDirection, isFirstLoad } = useAnimation();

  const typeTexts = ['Data Scientist', 'AI/ML Engineer'];
  const rotatingPhrases = [
    "I am a Data Scientist & AI Engineer.",
    "I turn data into intelligent solutions.",
    "I discover meaningful patterns in data.",
    "I build and optimize AI models.",
    "I solve complex problems through code."
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;
    let isDeleting = false;
    let textIndex = 0;

    const typeEffect = () => {
      const fullText = typeTexts[textIndex];
      
      if (isDeleting) {
        currentText = fullText.substring(0, currentIndex - 1);
        currentIndex--;
      } else {
        currentText = fullText.substring(0, currentIndex + 1);
        currentIndex++;
      }

      setCurrentTypeText(currentText);

      if (!isDeleting && currentIndex === fullText.length) {
        setTimeout(() => {
          isDeleting = true;
        }, 2000);
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typeTexts.length;
      }
    };

    const typeInterval = setInterval(typeEffect, isDeleting ? 50 : 100);
    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhraseIndex(prev => (prev + 1) % rotatingPhrases.length);
    }, 4000);
    return () => clearInterval(phraseInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('home');
      if (homeSection) {
        const rect = homeSection.getBoundingClientRect();
        const isHomeVisible = rect.bottom > 100;
        setShowScrollIndicator(isHomeVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    { icon: Github, href: "https://github.com/LasaK97", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/lasantha-kulasooriya", label: "LinkedIn" },
    { icon: BookOpen, href: "#", label: "Medium" }
  ];

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ fontFamily: 'Heeli, sans-serif' }}>
      <div className="w-full lg:w-1/2 px-4 md:px-8 lg:pl-12 lg:pr-8 xl:pl-20 xl:pr-12 relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full flex justify-center lg:justify-end">
          {/* Left side - Content */}
          <div className="w-full max-w-xl text-center lg:text-left">
              {/* Greeting */}
              <motion.p 
                className="text-cyber-cyan text-lg md:text-xl font-orbitron font-medium mb-4"
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                animate={{
                  opacity: animationState === 'visible' ? 1 : 0,
                  y: animationState === 'visible' ? 0 : animationState === 'hidden' ? -50 : 50,
                  filter: animationState === 'visible' ? "blur(0px)" : "blur(10px)"
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: animationState === 'visible' ? (isFirstLoad ? 0.3 : 0.1) : 0, 
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                Hello, I&apos;m
              </motion.p>

              {/* Name - ONLY NAME IS ENLARGED */}
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 font-orbitron bg-gradient-to-r from-neon-orange via-hot-pink to-cyber-cyan bg-clip-text text-transparent leading-tight animate-gradient-x"
              initial={{ opacity: 0, y: 80, scale: 0.8, filter: "blur(15px)" }}
              animate={{
                opacity: animationState === 'visible' ? 1 : 0,
                y: animationState === 'visible' ? 0 : animationState === 'hidden' ? -80 : 80,
                scale: animationState === 'visible' ? 1 : 0.8,
                filter: animationState === 'visible' ? "blur(0px)" : "blur(15px)"
              }}
              transition={{ 
                duration: 1, 
                delay: animationState === 'visible' ? (isFirstLoad ? 0.5 : 0.2) : 0, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
                Lasantha<br />Kulasooriya
              </motion.h1>

              {/* Title with Typing Animation - NORMAL SIZE */}
              <motion.h2 
                className="text-lg md:text-xl lg:text-2xl font-semibold text-off-white mb-6 h-10 md:h-12 flex items-center justify-center lg:justify-start"
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
              animate={{
                opacity: animationState === 'visible' ? 1 : 0,
                y: animationState === 'visible' ? 0 : animationState === 'hidden' ? -60 : 60,
                filter: animationState === 'visible' ? "blur(0px)" : "blur(10px)"
              }}
              transition={{ 
                duration: 0.8, 
                delay: animationState === 'visible' ? (isFirstLoad ? 0.7 : 0.3) : 0, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <span>And I&apos;m a </span>
              <span className="text-cyber-cyan ml-2">
                {currentTypeText}
              </span>
              {showCursor && <span className="animate-pulse text-cyber-cyan ml-1 text-xl md:text-2xl lg:text-3xl">|</span>}
              </motion.h2>

              {/* Rotating Phrases */}
              <motion.div 
                className="h-8 md:h-10 mb-6 overflow-hidden"
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{
                opacity: animationState === 'visible' ? 1 : 0,
                y: animationState === 'visible' ? 0 : animationState === 'hidden' ? -40 : 40,
                filter: animationState === 'visible' ? "blur(0px)" : "blur(8px)"
              }}
              transition={{ 
                duration: 0.8, 
                delay: animationState === 'visible' ? (isFirstLoad ? 0.9 : 0.4) : 0, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <AnimatePresence mode="wait">
                <motion.p 
                  key={currentPhraseIndex}
                  className="text-light-gray text-base md:text-lg leading-relaxed flex items-center justify-center lg:justify-start h-full"
                  initial={{ x: -50, opacity: 0, filter: "blur(5px)" }}
                  animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ x: 50, opacity: 0, filter: "blur(5px)" }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {rotatingPhrases[currentPhraseIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

              {/* Small Description */}
              <motion.p 
                className="text-light-gray text-sm md:text-base leading-relaxed mb-6 text-justify max-w-lg"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{
                opacity: animationState === 'visible' ? 1 : 0,
                y: animationState === 'visible' ? 0 : animationState === 'hidden' ? -30 : 30,
                filter: animationState === 'visible' ? "blur(0px)" : "blur(8px)"
              }}
              transition={{ 
                duration: 0.8, 
                delay: animationState === 'visible' ? (isFirstLoad ? 1.1 : 0.5) : 0, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              I specialize in developing AI solutions for advanced robotics, integrating machine learning, 
              computer vision, and sensor fusion to enhance autonomy and real-world adaptability.
            </motion.p>

              {/* Social Links */}
              <motion.div 
                className="flex justify-center lg:justify-start gap-4 mb-8"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{
                opacity: animationState === 'visible' ? 1 : 0,
                y: animationState === 'visible' ? 0 : animationState === 'hidden' ? -40 : 40,
                scale: animationState === 'visible' ? 1 : 0.9
              }}
              transition={{ 
                duration: 0.8, 
                delay: animationState === 'visible' ? (isFirstLoad ? 1.3 : 0.6) : 0, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-12 h-12 bg-gradient-to-r from-neon-orange to-hot-pink rounded-lg flex items-center justify-center text-white transition-all duration-500"
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={{ 
                    opacity: animationState === 'visible' ? 1 : 0,
                    scale: animationState === 'visible' ? 1 : 0.5,
                    y: animationState === 'visible' ? 0 : 50
                  }}
                  transition={{
                    duration: 0.5, 
                    delay: (isFirstLoad ? 1.4 : 0.7) + index * 0.1, 
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -3,
                    boxShadow: "0 15px 35px rgba(6, 182, 212, 0.4)",
                    transition: { type: "spring", stiffness: 500, damping: 15 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">
                    <social.icon size={20} />
                  </span>
                </motion.a>
              ))}
            </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{
                opacity: animationState === 'visible' ? 1 : 0,
                y: animationState === 'visible' ? 0 : animationState === 'hidden' ? -50 : 50,
                scale: animationState === 'visible' ? 1 : 0.9
              }}
              transition={{ 
                duration: 0.8, 
                delay: animationState === 'visible' ? (isFirstLoad ? 1.5 : 0.7) : 0, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <motion.button
                onClick={scrollToProjects}
                className="w-full sm:w-56 bg-gradient-to-r from-neon-orange to-neon-purple text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-500"
                whileHover={{ 
                  scale: 1.08, 
                  y: -3,
                  boxShadow: "0 15px 35px rgba(6, 182, 212, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ x: -30, opacity: 0 }}
                animate={{ 
                  x: animationState === 'visible' ? 0 : -30,
                  opacity: animationState === 'visible' ? 1 : 0
                }}
                transition={{ 
                  delay: isFirstLoad ? 1.6 : 0.8,
                  type: "spring", 
                  stiffness: 500, 
                  damping: 15
                }}
              >
                <ExternalLink size={18} />
                <span>Explore Projects</span>
              </motion.button>
              
              <div className="relative p-0.5 bg-gradient-to-r from-neon-orange to-neon-purple rounded-lg animate-gradient-x w-full sm:w-56">
                <motion.a
                  href="#contact"
                  className="w-full bg-void-black px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-500"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ 
                    x: animationState === 'visible' ? 0 : 30,
                    opacity: animationState === 'visible' ? 1 : 0
                  }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -3,
                    boxShadow: "0 15px 35px rgba(139, 92, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    delay: isFirstLoad ? 1.7 : 0.9,
                    type: "spring", 
                    stiffness: 500, 
                    damping: 15
                  }}
                >
                  <Mail size={18} className="text-neon-orange" style={{ filter: 'drop-shadow(0 0 2px #8b5cf6)' }} />
                  <span className="bg-gradient-to-r from-neon-orange to-neon-purple bg-clip-text text-transparent">Contact Me</span>
                </motion.a>
              </div>
            </motion.div>

              {/* Available for opportunities */}
              <motion.div 
                className="flex items-center justify-center lg:justify-start gap-2 mb-8"
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{
                opacity: animationState === 'visible' ? 1 : 0,
                y: animationState === 'visible' ? 0 : animationState === 'hidden' ? -20 : 20,
                filter: animationState === 'visible' ? "blur(0px)" : "blur(5px)"
              }}
              transition={{ 
                duration: 0.8, 
                delay: animationState === 'visible' ? (isFirstLoad ? 1.8 : 0.8) : 0, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full" style={{animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}></div>
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full opacity-75" style={{animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite'}}></div>
              </div>
              <span className="text-light-gray text-sm">Available for AI/ML opportunities</span>
            </motion.div>
          </div>

        </div>
      </div>
      
      {/* Image positioned absolutely to align with page edges */}
      <div className="hidden lg:block absolute bottom-0 right-0 h-screen" style={{ width: '50%' }}>
        <motion.div 
          className="relative w-full h-full flex items-end justify-start pl-8"
          initial={{ x: '100%', opacity: 0 }}
          animate={{ 
            x: animationState === 'visible' ? 0 : animationState === 'hidden' ? '100%' : '100%',
            opacity: animationState === 'visible' ? 1 : 0
          }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ 
            duration: 1.2, 
            delay: animationState === 'visible' ? (isFirstLoad ? 0.3 : 0.1) : 0,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <Image
            src="/images/intro-page-pic.png"
            alt="AI Technology Visualization"
            fill
            className="object-contain object-bottom"
            priority
            sizes="(min-width: 1024px) 50vw"
            style={{ objectPosition: 'bottom left' }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator - only show on home section */}
      {showScrollIndicator && (
        <motion.div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-medium-gray z-40"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{
              opacity: animationState === 'visible' ? 1 : 0,
              y: animationState === 'visible' ? 0 : animationState === 'hidden' ? 50 : 50,
              scale: animationState === 'visible' ? 1 : 0.8
            }}
            transition={{ 
              duration: 0.8, 
              delay: animationState === 'visible' ? (isFirstLoad ? 2.0 : 1.0) : 0,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <motion.div 
              className="flex flex-col items-center gap-2"
            >
              <div className="flex flex-col items-center">
                <motion.div 
                  className="relative mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm uppercase tracking-wide">Scroll to explore</span>
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-orange to-neon-purple rounded-full -mb-1"
                    animate={{ scaleX: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
                <motion.div 
                  className="w-px h-8 bg-gradient-to-b from-secondary-accent to-transparent"
                  animate={{ 
                    y: [0, 6, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 0.3
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
    </section>
  );
};

export default HeroSection;