'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLoading } from '../components/providers/LoadingProvider';

interface AnimationContextType {
  currentSection: string;
  animationState: 'initial' | 'visible' | 'hidden';
  transitionDirection: 'fromAbout' | 'toAbout' | 'initial';
  isFirstLoad: boolean;
  setCurrentSection: (section: string) => void;
  setAnimationState: (state: 'initial' | 'visible' | 'hidden') => void;
  setTransitionDirection: (direction: 'fromAbout' | 'toAbout' | 'initial') => void;
  setIsFirstLoad: (isFirst: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoading();
  const [currentSection, setCurrentSection] = useState('home');
  const [animationState, setAnimationState] = useState<'initial' | 'visible' | 'hidden'>('initial');
  const [transitionDirection, setTransitionDirection] = useState<'fromAbout' | 'toAbout' | 'initial'>('initial');
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Trigger first load animation when loading completes
  useEffect(() => {
    if (!isLoading && isFirstLoad && animationState === 'initial') {
      // Small delay to allow page to render
      const timer = setTimeout(() => {
        setAnimationState('visible');
        setTransitionDirection('initial');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isFirstLoad, animationState]);

  useEffect(() => {
    // Skip if still loading
    if (isLoading) return;

    const handleScroll = () => {
      const homeSection = document.getElementById('home');
      const aboutSection = document.getElementById('about');
      
      if (!homeSection || !aboutSection) return;

      const homeRect = homeSection.getBoundingClientRect();
      const aboutRect = aboutSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // More precise section detection
      const scrollCenter = viewportHeight / 2;
      const isHomeInView = homeRect.top <= scrollCenter && homeRect.bottom >= scrollCenter;
      const isAboutInView = aboutRect.top <= scrollCenter && aboutRect.bottom >= scrollCenter;
      
      let newSection = currentSection;
      
      // Determine which section is currently in view
      if (isHomeInView) {
        newSection = 'home';
      } else if (isAboutInView) {
        newSection = 'about';
      }
      
      // Handle section transitions
      if (newSection !== currentSection) {
        const prevSection = currentSection;
        setCurrentSection(newSection);
        
        // Reset firstLoad flag after initial load
        if (isFirstLoad && prevSection === 'home') {
          setIsFirstLoad(false);
        }
        
        // Transition animations based on direction
        if (prevSection === 'home' && newSection === 'about') {
          // Going from Home to About
          setAnimationState('hidden');
          setTransitionDirection('toAbout');
        } else if (prevSection === 'about' && newSection === 'home') {
          // Going from About back to Home
          setAnimationState('visible');
          setTransitionDirection('fromAbout');
        } else if (!prevSection && newSection === 'home') {
          // Initial scroll to home (shouldn't happen after loading)
          setAnimationState('visible');
          setTransitionDirection('initial');
        }
      }
    };

    // Initial check after a small delay
    const timer = setTimeout(() => {
      handleScroll();
    }, 300);

    // Add scroll listener with throttling for better performance
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 50);
    };

    window.addEventListener('scroll', throttledScroll);
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(timer);
      clearTimeout(scrollTimeout);
    };
  }, [currentSection, isFirstLoad, isLoading]);

  const value = {
    currentSection,
    animationState,
    transitionDirection,
    isFirstLoad,
    setCurrentSection,
    setAnimationState,
    setTransitionDirection,
    setIsFirstLoad
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};