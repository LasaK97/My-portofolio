// src/components/common/Navigation.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Home, Code, GraduationCap, Briefcase, FileCode, Terminal, Mail } from 'lucide-react';

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');

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
    <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col space-y-4">
        {sections.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`group flex items-center space-x-2 transition-all`}
          >
            <span className="relative">
              <Icon 
                size={20} 
                className={`transition-all ${
                  activeSection === id 
                    ? 'text-cyan-400 scale-125' 
                    : 'text-gray-400'
                }`} 
              />
              {activeSection === id && (
                <span className="absolute inset-0 animate-ping">
                  <Icon size={20} className="text-cyan-500" />
                </span>
              )}
            </span>
            <span 
              className={`opacity-0 group-hover:opacity-100 transition-opacity absolute right-full mr-2 whitespace-nowrap text-sm ${
                activeSection === id ? 'text-cyan-400' : 'text-gray-400'
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};