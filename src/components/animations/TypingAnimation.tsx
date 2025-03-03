// src/components/animations/TypingAnimation.tsx
'use client';

import React, { useState, useEffect } from 'react';

export const TypingAnimation = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const fullName = "Lasantha Kulasooriya";
  const phrases = [
    "🚀 I am a Data Scientist & AI Engineer.",
    "💡 I turn data into intelligent solutions.",
    "📊 I love discovering patterns in data.",
    "🤖 I build and optimize AI models.",
    "💻 I enjoy coding and solving complex problems."
];


  const techWords = [
    "Data Science",
    "Machine Learning",
    "NLP",
    "Deep Learning",
    "Computer Vision",
    "Artificial Intelligence",
    "MLOps",
    "Big Data Analytics",
    "Data Mining",
    "Forecasting",
    "Pattern Recognition",
    "Robotics",
  ];

  // Name typing effect
  useEffect(() => {
    if (name.length < fullName.length) {
      const timeoutId = setTimeout(() => {
        setName(fullName.slice(0, name.length + 1));
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [name]);

  // Phrase typing effect
  useEffect(() => {
    if (name !== fullName) return;

    const currentPhrase = phrases[loopNum % phrases.length];
    const shouldType = !isDeleting && text.length < currentPhrase.length;
    const shouldDelete = isDeleting && text.length > 0;

    if (shouldType) {
      const timeoutId = setTimeout(() => {
        setText(currentPhrase.slice(0, text.length + 1));
      }, 50);
      return () => clearTimeout(timeoutId);
    }

    if (shouldDelete) {
      const timeoutId = setTimeout(() => {
        setText(currentPhrase.slice(0, text.length - 1));
      }, 30);
      return () => clearTimeout(timeoutId);
    }

    if (!isDeleting && text === currentPhrase) {
      const timeoutId = setTimeout(() => setIsDeleting(true), 1500);
      return () => clearTimeout(timeoutId);
    }

    if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(prev => prev + 1);
    }
  }, [text, isDeleting, loopNum, name]);

  // Cursor blink effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  // Random keyword highlight effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newIndex = Math.floor(Math.random() * techWords.length);
      setActiveWordIndex(newIndex);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="space-y-3">
      {/* Name */}
      <h1 className="text-4xl md:text-6xl font-bold">
        <span className="bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
          {name}
        </span>
        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-cyan-500`}>|</span>
      </h1>
      
      {/* Dynamic Text */}
      <div className="h-14">
        <p className="text-xl md:text-2xl text-gray-300">
          {text}
          <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-cyan-500`}>|</span>
        </p>
      </div>

      {/* Keywords Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-4">
        {techWords.map((word, index) => (
          <div
            key={word}
            className={`transition-all duration-700 text-center
              ${index === activeWordIndex 
                ? 'scale-125 text-cyan-400 font-medium' 
                : 'scale-100 text-gray-400'
              }
              hover:text-cyan-300 cursor-default
            `}
          >
            <span className="text-sm md:text-base whitespace-nowrap">
              {word}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypingAnimation;