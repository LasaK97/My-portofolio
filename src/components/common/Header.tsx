// src/components/common/Header.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Home, Code, GraduationCap, Briefcase, FileCode, Terminal, Mail, Download, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '../../contexts/AnimationContext';

export const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { animationState, transitionDirection, isFirstLoad } = useAnimation();
  
  // Check if we're on the home/intro section
  const isOnIntro = activeSection === 'home';

  const sections = useMemo(() => [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: Code, label: 'About' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'education', icon: GraduationCap, label: 'Education' },
    { id: 'skills', icon: Terminal, label: 'Skills' },
    { id: 'projects', icon: FileCode, label: 'Projects' },
    { id: 'contact', icon: Mail, label: 'Contact' }
  ], []);
  
  useEffect(() => {
    // Function to calculate which section is in view
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }));

      const currentSection = sectionElements.find(({ element }) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        // Consider a section "active" when it takes up most of the viewport
        return rect.top <= 100 && rect.bottom >= window.innerHeight / 2;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Add smooth scrolling behavior with wheel events
  useEffect(() => {
    let isScrolling = false;
    let lastScrollTime = 0;
    const scrollCooldown = 1000; // 1 second cooldown between scrolls

    const handleWheel = (e: WheelEvent) => {
      const currentTime = Date.now();
      if (isScrolling || currentTime - lastScrollTime < scrollCooldown) {
        e.preventDefault();
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      const currentIndex = sections.findIndex(section => section.id === activeSection);
      const nextIndex = currentIndex + direction;

      if (nextIndex >= 0 && nextIndex < sections.length) {
        isScrolling = true;
        lastScrollTime = currentTime;

        const nextSection = document.getElementById(sections[nextIndex].id);
        if (nextSection) {
          e.preventDefault();
          nextSection.scrollIntoView({ behavior: 'smooth' });

          // Reset scrolling flag after animation
          setTimeout(() => {
            isScrolling = false;
          }, 1000);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSection, sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume/Lasantha_Kulasooriya_Resume.pdf';
    link.download = 'Lasantha_Kulasooriya_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.header
      className="fixed top-6 left-0 right-0 z-50 flex justify-center"
      initial={{ opacity: 0, y: -150 }}
      animate={{ 
        opacity: 1, 
        y: 0
      }}
      transition={{ 
        duration: 1.2, 
        delay: isFirstLoad ? 2.5 : 0,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <motion.nav
        className="relative backdrop-blur-md bg-black/20 border border-white/10 shadow-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05) inset',
          borderRadius: '12px',
        }}
        animate={{
          width: isOnIntro ? 'calc(100vw - 48px)' : '1200px',
          height: '60px'
        }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        <div className={`flex items-center h-full justify-between ${isOnIntro ? 'px-4 sm:px-8' : 'px-4 sm:px-8'}`}>
          {/* Mobile Layout - Resume on left, logo center, hamburger right */}
          <div className="flex lg:hidden items-center justify-between w-full">
            {/* Resume Button - Mobile (Icon only on left) */}
            <motion.button
              onClick={downloadResume}
              className="p-2 rounded-lg bg-gradient-to-r from-neon-orange to-neon-purple text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
            </motion.button>

            {/* Logo - Center on mobile */}
            <button
              onClick={() => scrollToSection('home')}
              className="absolute left-1/2 -translate-x-1/2"
            >
              <div className="relative w-12 h-12">
                <Image
                  src="/images/icon-logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </button>

            {/* Hamburger Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Desktop Layout - Original */}
          <div className="hidden lg:flex items-center justify-between w-full">
            {/* Logo */}
            <motion.div
              className="flex items-center flex-shrink-0"
              animate={{
                scale: isOnIntro ? 1 : 0.9
              }}
              transition={{ duration: 0.6 }}
            >
              <button
                onClick={() => scrollToSection('home')}
                className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
              >
                <div className="relative w-20 h-20">
                  <Image
                    src="/images/icon-logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </button>
            </motion.div>

            {/* Desktop Navigation Items */}
            <motion.div
              className="flex items-center overflow-hidden"
              animate={{
                gap: '47px'
              }}
              transition={{ 
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
            {sections.map(({ id, icon: Icon, label }, index) => (
              <motion.button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`relative text-base font-medium transition-all duration-300 whitespace-nowrap overflow-visible group ${
                  activeSection === id
                    ? 'text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text'
                    : 'text-white/70 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 hover:bg-clip-text'
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  opacity: 1, 
                  x: 0 
                }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.8 + index * 0.1
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={isOnIntro ? 'inline' : 'hidden lg:inline text-base'}>{label}</span>
                <Icon size={16} className={isOnIntro ? 'hidden' : 'lg:hidden'} />
                {activeSection === id && (
                  <motion.div 
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-neon-orange to-neon-purple rounded-full"
                    initial={{ scaleX: 0.5 }}
                    animate={{ scaleX: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: 'center' }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

            {/* Desktop Resume Button */}
            <motion.div
              className="flex-shrink-0"
            >
              <motion.button
                onClick={downloadResume}
                className="flex items-center space-x-1 bg-gradient-to-r from-neon-orange to-neon-purple rounded-lg text-white text-base font-semibold hover:scale-105 transition-all duration-300 whitespace-nowrap"
                animate={{
                  paddingLeft: isOnIntro ? '24px' : '16px',
                  paddingRight: isOnIntro ? '24px' : '16px',
                  paddingTop: '8px',
                  paddingBottom: '8px'
                }}
                transition={{ duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(6, 182, 212, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={16} />
                <span className="inline text-base">
                  {isOnIntro ? 'Download Resume' : 'Resume'}
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-20 left-4 right-4 z-40 backdrop-blur-md bg-black/80 border border-white/10 rounded-lg p-4"
          >
            <div className="flex flex-col space-y-2">
              {sections.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                    activeSection === id
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={20} className={activeSection === id ? 'text-blue-500' : ''} />
                  <span className="text-base">{label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
};