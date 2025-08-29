// src/components/sections/AboutSection.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [highlightedWords, setHighlightedWords] = useState<Set<string>>(new Set());

  const techWords = {
    row1: ["Data Science", "Machine Learning", "NLP", "Deep Learning"],
    row2: ["Computer Vision", "Artificial Intelligence", "MLOps", "Big Data Analytics"],
    row3: ["Data Mining", "Forecasting", "Pattern Recognition", "Robotics"],
    mobile: ["Data Science", "Machine Learning", "NLP", "Deep Learning", "Computer Vision", "Artificial Intelligence", "MLOps", "Big Data Analytics", "Data Mining", "Forecasting", "Pattern Recognition", "Robotics"]
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Set visibility based on intersection
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Randomly highlight words effect
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        const newHighlights = new Set<string>();
        
        const randomRow1 = techWords.row1[Math.floor(Math.random() * techWords.row1.length)];
        const randomRow2 = techWords.row2[Math.floor(Math.random() * techWords.row2.length)];
        const randomRow3 = techWords.row3[Math.floor(Math.random() * techWords.row3.length)];
        
        newHighlights.add(randomRow1);
        newHighlights.add(randomRow2);
        newHighlights.add(randomRow3);
        
        setHighlightedWords(newHighlights);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 md:py-20 lg:py-24"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            y: isVisible ? 0 : -30 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-2 mb-5 md:mb-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent font-orbitron uppercase tracking-wide"
        >
          About Me
        </motion.h2>
        
        {/* Main Content Layout */}
        <div className="mt-8 lg:mt-16">
          {/* Desktop Layout - Two Columns */}
          <div className="hidden lg:block max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center mb-12">
              {/* Left Panel - Image Only */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, x: -60 }}
                animate={{ 
                  opacity: isVisible ? 1 : 0, 
                  scale: isVisible ? 1 : 0.95, 
                  x: isVisible ? 0 : -60 
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className="relative w-full max-w-sm mx-auto">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
                    {/* Animated gradient border */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-tertiary rounded-2xl blur-sm opacity-75 group-hover:opacity-100 animate-gradient-x transition-opacity duration-300" />
                    
                    {/* Image container with glassmorphism effect */}
                    <div className="relative h-full rounded-2xl overflow-hidden bg-dark-slate/90 backdrop-blur-sm border border-border-gray/30">
                      <Image
                        src="/images/about-photo.jpg"
                        alt="Lasantha's Profile"
                        fill
                        className="object-cover object-center hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 40vw"
                        priority
                      />
                      
                      {/* Gradient overlay for depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-slate/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Panel - Text Content Only */}
              <motion.div 
                initial={{ opacity: 0, x: 60 }}
                animate={{ 
                  opacity: isVisible ? 1 : 0, 
                  x: isVisible ? 0 : 60 
                }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              >
                <div className="space-y-4 text-gray-300 font-roboto">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
                    Hi, I&apos;m Lasantha
                  </h3>
                  <p className="text-base lg:text-lg leading-relaxed text-justify">
                    I am a Data Scientist and AI Engineer with over a year of experience, 
                    passionate about transforming AI research into real-world applications. My work 
                    focuses on developing intelligent systems that solve complex problems and drive meaningful impact.
                  </p>
                  <p className="text-base lg:text-lg leading-relaxed text-justify">
                    With hands-on experience in building AI models, I have worked on projects 
                    that deepen my understanding 
                    of machine learning, deep learning, and data-driven decision-making. 
                    I am committed to exploring advancements in AI, ensuring that cutting-edge research 
                    translates into practical and scalable solutions.
                  </p>
                  <p className="text-base lg:text-lg leading-relaxed text-justify">
                    Currently, I am focused on developing AI-driven systems that 
                    enhance accessibility and efficiency in real-world applications.
                    My goal is to bridge the gap between theory and practice, creating 
                    innovative solutions that make a tangible difference.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Desktop Tech Keywords Panel - Spans Full Width */}
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                y: isVisible ? 0 : 60 
              }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              <div className="relative overflow-hidden">
                {/* Tapered Line Borders with White Glassy Look */}
                {/* Top border line - thicker with tapering */}
                <div className="absolute top-0 left-0 right-0 h-1 flex items-center">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent backdrop-blur-sm" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md" />
                </div>
                
                {/* Bottom border line - thicker with tapering */}
                <div className="absolute bottom-0 left-0 right-0 h-1 flex items-center">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent backdrop-blur-sm" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md" />
                </div>
                
                {/* Content */}
                <div className="relative p-8 lg:p-12">
                  {/* Tech words in 3 rows */}
                  <div className="space-y-6 overflow-hidden">
                    {/* Row 1 - Moving Left */}
                    <div className="relative h-12 lg:h-16 overflow-hidden">
                      <div className="absolute flex gap-8 lg:gap-12 animate-scroll-left whitespace-nowrap">
                        {[...techWords.row1, ...techWords.row1, ...techWords.row1].map((word, index) => (
                          <span
                            key={`row1-${index}`}
                            className={`inline-block text-xl lg:text-2xl xl:text-3xl font-bold font-orbitron transition-all duration-500 ${
                              highlightedWords.has(word)
                                ? 'text-transparent bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text scale-110 drop-shadow-2xl'
                                : 'text-gray-200/90 drop-shadow-lg'
                            }`}
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Row 2 - Moving Right */}
                    <div className="relative h-12 lg:h-16 overflow-hidden">
                      <div className="absolute flex gap-8 lg:gap-12 animate-scroll-right whitespace-nowrap">
                        {[...techWords.row2, ...techWords.row2, ...techWords.row2].map((word, index) => (
                          <span
                            key={`row2-${index}`}
                            className={`inline-block text-xl lg:text-2xl xl:text-3xl font-bold font-orbitron transition-all duration-500 ${
                              highlightedWords.has(word)
                                ? 'text-transparent bg-gradient-to-r from-tertiary via-primary to-secondary bg-clip-text scale-110 drop-shadow-2xl'
                                : 'text-gray-200/90 drop-shadow-lg'
                            }`}
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Row 3 - Moving Left */}
                    <div className="relative h-12 lg:h-16 overflow-hidden">
                      <div className="absolute flex gap-8 lg:gap-12 animate-scroll-left whitespace-nowrap">
                        {[...techWords.row3, ...techWords.row3, ...techWords.row3].map((word, index) => (
                          <span
                            key={`row3-${index}`}
                            className={`inline-block text-xl lg:text-2xl xl:text-3xl font-bold font-orbitron transition-all duration-500 ${
                              highlightedWords.has(word)
                                ? 'text-transparent bg-gradient-to-r from-secondary via-tertiary to-primary bg-clip-text scale-110 drop-shadow-2xl'
                                : 'text-gray-200/90 drop-shadow-lg'
                            }`}
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Edge Fade Effects - Seamless Blend */}
                <div className="absolute inset-y-0 left-0 w-32 lg:w-48 bg-gradient-to-r from-void-black via-void-black/60 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 lg:w-48 bg-gradient-to-l from-void-black via-void-black/60 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>

          {/* Mobile and Tablet Layout */}
          <div className="lg:hidden space-y-8 max-w-2xl mx-auto">
            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: -40 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                scale: isVisible ? 1 : 0.95, 
                x: isVisible ? 0 : -40 
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex justify-center"
            >
              <div className="relative w-64 sm:w-80 md:w-96">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden group">
                  {/* Animated gradient border */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-tertiary rounded-xl blur-sm opacity-75 group-hover:opacity-100 animate-gradient-x transition-opacity duration-300" />
                  
                  {/* Image container */}
                  <div className="relative h-full rounded-xl overflow-hidden bg-dark-slate/90 backdrop-blur-sm border border-border-gray/30">
                    <Image
                      src="/images/about-photo.jpg"
                      alt="Lasantha's Profile"
                      fill
                      className="object-cover object-center hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                      priority
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-slate/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Description */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                x: isVisible ? 0 : 40 
              }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              <div className="space-y-4 text-gray-300 font-roboto text-justify px-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                  Hi, I&apos;m Lasantha
                </h3>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-justify">
                  I am a Data Scientist and AI Engineer with over a year of experience, 
                  passionate about transforming AI research into real-world applications. My work 
                  focuses on developing intelligent systems that solve complex problems and drive meaningful impact.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-justify">
                  With hands-on experience in building AI models, I have worked on projects 
                  that deepen my understanding of machine learning, deep learning, and data-driven decision-making.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-justify">
                  Currently, I am focused on developing AI-driven systems that 
                  enhance accessibility and efficiency in real-world applications.
                </p>
              </div>
            </motion.div>

            {/* Mobile Tech Keywords - Single Row */}
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                y: isVisible ? 0 : 60 
              }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              <div className="relative overflow-hidden mx-2">
                {/* Mobile Tapered Line Borders with White Glassy Look */}
                {/* Top border line - thicker with tapering */}
                <div className="absolute top-0 left-0 right-0 h-1 flex items-center">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent backdrop-blur-sm" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md" />
                </div>
                
                {/* Bottom border line - thicker with tapering */}
                <div className="absolute bottom-0 left-0 right-0 h-1 flex items-center">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent backdrop-blur-sm" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md" />
                </div>
                
                {/* Content */}
                <div className="relative p-6">
                  {/* Single row for mobile */}
                  <div className="relative h-10 sm:h-12 overflow-hidden">
                    <div className="absolute flex gap-8 animate-scroll-left whitespace-nowrap">
                      {[...techWords.mobile, ...techWords.mobile].map((word, index) => (
                        <span
                          key={`mobile-${index}`}
                          className={`inline-block text-base sm:text-lg md:text-xl font-bold font-orbitron transition-all duration-500 ${
                            highlightedWords.has(word)
                              ? 'text-transparent bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text scale-110 drop-shadow-2xl'
                              : 'text-gray-200/90 drop-shadow-lg'
                          }`}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile Enhanced Edge fade */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-void-black via-void-black/60 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-void-black via-void-black/60 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};