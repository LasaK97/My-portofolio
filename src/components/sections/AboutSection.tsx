// src/components/sections/AboutSection.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Entering view
            imageRef.current?.classList.remove('-translate-x-full', 'opacity-0');
            imageRef.current?.classList.add('translate-x-0', 'opacity-100');
            
            textRef.current?.classList.remove('translate-x-full', 'opacity-0');
            textRef.current?.classList.add('translate-x-0', 'opacity-100');
          } else {
            // Leaving view
            imageRef.current?.classList.remove('translate-x-0', 'opacity-100');
            imageRef.current?.classList.add('-translate-x-full', 'opacity-0');
            
            textRef.current?.classList.remove('translate-x-0', 'opacity-100');
            textRef.current?.classList.add('translate-x-full', 'opacity-0');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-100px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-12 md:py-16"
    >
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-10 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent font-orbitron uppercase tracking-wide">
          About Me
        </h2>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
          {/* Image Container - Reduced spacing */}
          <div
            ref={imageRef}
            className="w-full lg:w-2/5 -translate-x-full opacity-0 transition-all duration-1000 ease-out"
          >
            <div className="relative w-full max-w-[250px] aspect-square mx-auto md:max-w-[320px]">
              {/* Gradient border with rotation */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg exp-gradient-rotate" />
              <div className="absolute inset-[3px] rounded-lg overflow-hidden bg-gray-900/60 backdrop-blur-sm">
                <Image
                  src="/images/about-photo.jpg"
                  alt="About Me"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 250px, 320px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Text Content - Reduced spacing, justified text */}
          <div
            ref={textRef}
            className="w-full lg:w-3/5 translate-x-full opacity-0 transition-all duration-1000 ease-out mt-6 lg:mt-0"
          >
            <div className="space-y-2 md:space-y-3 text-gray-300 font-roboto lg:pr-8">
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-center lg:text-left mb-2">
                Hi, I'm Lasantha
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-justify">
                I am a Data Scientist and AI Engineer with over a year of experience, 
                passionate about transforming AI research into real-world applications. My work 
                focuses on developing intelligent systems that solve complex problems and drive meaningful impact.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-justify">
                With hands-on experience in building AI models, I have worked on projects 
                that deepen my understanding 
                of machine learning, deep learning, and data-driven decision-making. 
                I am committed to exploring advancements in AI, ensuring that cutting-edge research 
                translates into practical and scalable solutions.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-justify">
                Currently, I am focused on developing AI-driven systems that 
                enhance accessibility and efficiency in real-world applications.
                My goal is to bridge the gap between theory and practice, creating 
                innovative solutions that make a tangible difference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};