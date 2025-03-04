// src/components/sections/IntroSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { TypingAnimation } from '../animations/TypingAnimation';
import { FaceDetection } from '../animations/FaceDetection';

export const IntroSection = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-16 pb-8">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
        {/* Profile Image - Centered on mobile, left-aligned on desktop */}
        <div className="w-full flex justify-center lg:justify-start lg:w-5/12 mb-8 lg:mb-0">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72">
            {/* Static border - Using a div with fixed background instead of gradient class */}
            <div 
              className="absolute inset-0 rounded-lg"
              style={{
                background: 'linear-gradient(to right, #0891b2, #3b82f6, #a855f7)',
                transform: 'none',
                animation: 'none'
              }}
            />
            
            {/* Image container with specific margin for border */}
            <div 
              className="absolute rounded-lg overflow-hidden bg-gray-900"
              style={{
                inset: '2px',
                transform: 'none',
                animation: 'none'
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/images/profile.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  style={{
                    transform: 'none',
                    animation: 'none'
                  }}
                  priority
                />
                <FaceDetection isActive={showAnimation} />
              </div>
            </div>
          </div>
        </div>

        {/* Text content - Centered on all screen sizes */}
        <div className="w-full lg:w-6/12 text-center lg:text-left pt-4 lg:pt-0">
          <TypingAnimation />
        </div>
      </div>

      {/* Desktop layout for larger screens */}
      <div className="hidden lg:flex w-full max-w-5xl mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-full flex flex-row items-start justify-between">
          {/* Left side - Profile Image */}
          <div className="w-5/12 flex justify-start">
            {/* This is just a placeholder div for layout, actual image is in the mobile-first layout above */}
            <div className="w-72 h-72 opacity-0"></div>
          </div>

          {/* Right side - Text */}
          <div className="w-6/12">
            {/* This is just a placeholder div for layout, actual content is in the mobile-first layout above */}
            <div className="opacity-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};