// src/components/sections/HeroSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, BookOpen } from 'lucide-react';
import { FaBrain, FaChartLine, FaCode, FaRobot } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { useAnimation } from '../../contexts/AnimationContext';
import HeroContent from './HeroContent';

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
    { text: "I am a Data Scientist & AI Engineer.", icon: FaBrain },
    { text: "I turn data into intelligent solutions.", icon: HiSparkles },
    { text: "I discover meaningful patterns in data.", icon: FaChartLine },
    { text: "I build and optimize AI models.", icon: FaRobot },
    { text: "I solve complex problems through code.", icon: FaCode }
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

  const heroContentProps = {
    animationState,
    isFirstLoad,
    currentTypeText,
    showCursor,
    currentPhraseIndex,
    rotatingPhrases,
    socialLinks,
    scrollToProjects
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ fontFamily: 'Heeli, sans-serif' }}>
      {/* Desktop Layout */}
      <div className="hidden lg:block w-full min-h-screen relative">
        <div className="w-full min-h-screen flex">
          {/* Left Content Section - Desktop */}
          <div className="w-1/2 flex items-center justify-end px-8 lg:px-12 xl:px-16 relative z-10">
            <div className="w-full max-w-xl text-left lg:mr-8 xl:mr-12">
              <HeroContent {...heroContentProps} isMobile={false} />
            </div>
          </div>

          {/* Right Image Section - Desktop */}
          <div className="w-1/2 relative min-h-screen flex items-end justify-start">
            <motion.div
              className="relative w-full h-[90%] pl-0 lg:pl-4"
              initial={{ x: 100, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1
              }}
              transition={{
                duration: 1.2,
                delay: isFirstLoad ? 0.3 : 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <Image
                src="/images/intro-page-pic.png"
                alt="Lasantha Kulasooriya - AI Engineer and Data Scientist"
                fill
                className="object-contain object-bottom"
                priority
                sizes="50vw"
                style={{ objectPosition: 'bottom left' }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden flex flex-col w-full min-h-screen">
        {/* Mobile Image at Top */}
        <div className="w-full px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-4 sm:pb-6">
          <motion.div
            className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto aspect-[4/3] sm:aspect-[3/2] md:aspect-[16/10]"
            initial={{ y: -50, opacity: 0 }}
            animate={{
              y: animationState === 'visible' ? 0 : -50,
              opacity: animationState === 'visible' ? 1 : 0
            }}
            transition={{
              duration: 0.8,
              delay: animationState === 'visible' ? (isFirstLoad ? 0.3 : 0.1) : 0,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <Image
              src="/images/intro-page-pic.png"
              alt="Lasantha Kulasooriya - AI Engineer and Data Scientist"
              fill
              className="object-contain object-center"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw"
            />
          </motion.div>
        </div>

        {/* Mobile Content Below Image */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 pb-20">
          <HeroContent {...heroContentProps} isMobile={true} />
        </div>
      </div>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <motion.div
          className="fixed bottom-8 left-0 right-0 text-medium-gray z-40 flex justify-center"
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
          <div className="flex flex-col items-center">
            <motion.div
              className="relative flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm uppercase tracking-wide text-center block">Scroll to explore</span>
              <motion.div
                className="h-0.5 bg-gradient-to-r from-neon-orange to-neon-purple rounded-full mt-1 w-32 mx-auto"
                animate={{ scaleX: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: 'center' }}
              />
            </motion.div>
            <motion.div
              className="w-px h-8 bg-gradient-to-b from-secondary-accent to-transparent mt-4 mx-auto"
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
      )}
    </section>
  );
};

export default HeroSection;