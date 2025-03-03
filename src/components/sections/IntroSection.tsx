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
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between px-4">
        {/* Left side - Profile Image (adjusted to align more to the left) */}
        <div className="lg:w-5/12 flex justify-start lg:justify-start">
          <div className="relative w-64 h-64 md:w-72 md:h-72 lg:ml-0">
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

        {/* Right side - Text */}
        <div className="lg:w-6/12 pt-6 lg:pt-0">
          <TypingAnimation />
        </div>
      </div>
    </section>
  );
};