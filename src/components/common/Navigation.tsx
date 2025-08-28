// src/components/common/Navigation.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Home, Code, GraduationCap, Briefcase, FileCode, Terminal, Mail, Brain, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnimation } from '../../contexts/AnimationContext';

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { animationState, transitionDirection, isFirstLoad } = useAnimation();

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

  // Add smooth scrolling behavior
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
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 z-50"
        initial={{ opacity: 0, x: 100 }}
        animate={{
          opacity: 1,
          x: 0
        }}
        transition={{ 
          duration: 1, 
          delay: isFirstLoad ? 1.5 : 0.3,
          ease: "easeOut" 
        }}
      >
        <div className="glassmorphism rounded-2xl p-4 border-neon-orange/20">
          <div className="flex flex-col space-y-4">
          {sections.map(({ id, icon: Icon, label }, index) => (
            <motion.button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`group flex items-center space-x-2 transition-all relative`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                x: -2
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="relative"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Icon 
                  size={20} 
                  className={`transition-all duration-300 ${
                    activeSection === id 
                      ? 'text-neon-orange scale-125 animate-neon-glow' 
                      : 'text-medium-gray hover:text-cyber-cyan'
                  }`} 
                />
                {activeSection === id && (
                  <span className="absolute inset-0 animate-neural-pulse">
                    <Icon size={20} className="text-neon-orange/50" />
                  </span>
                )}
              </motion.span>
              <motion.span 
                className={`opacity-0 group-hover:opacity-100 transition-all absolute right-full mr-3 whitespace-nowrap text-sm px-2 py-1 rounded glassmorphism ${
                  activeSection === id ? 'text-neon-orange' : 'text-off-white'
                }`}
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.span>
            </motion.button>
          ))}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-6 right-6 z-[60] glassmorphism p-3 rounded-full border-neon-orange/30"
          initial={{ opacity: 0, x: 100 }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{ 
            duration: 0.8, 
            delay: isFirstLoad ? 1.2 : 0.3,
            ease: "easeOut" 
          }}
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-neon-orange" />
          ) : (
            <Menu size={24} className="text-off-white" />
          )}
        </motion.button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[55] glassmorphism backdrop-blur-xl">
            <div className="flex flex-col items-center justify-center h-full space-y-6 px-4">
              {sections.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => {
                    scrollToSection(id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex flex-col items-center space-y-2 p-4 rounded-lg transition-all min-h-[70px] min-w-[90px] touch-manipulation ${
                    activeSection === id 
                      ? 'bg-neon-orange/20 border-2 border-neon-orange' 
                      : 'bg-transparent border-2 border-transparent hover:border-cyber-cyan/50'
                  }`}
                >
                  <Icon 
                    size={28} 
                    className={`transition-all duration-300 ${
                      activeSection === id 
                        ? 'text-neon-orange animate-neon-glow' 
                        : 'text-off-white'
                    }`} 
                  />
                  <span className={`text-sm font-medium font-orbitron ${
                    activeSection === id ? 'text-neon-orange' : 'text-off-white'
                  }`}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};