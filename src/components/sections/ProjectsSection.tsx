// src/components/sections/ProjectsSection.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  technologies: string[];
}

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Laptop Price Predictor [Model + Webapp]",
      description: "This project predicts laptop prices based on various features and specifications.",
      image: "/images/projects/laptop_price_predictor.jpeg",
      githubUrl: "https://github.com/LasaK97/Laptop_price_predictor_using_machine_learning_with_webapp",
      technologies: ["Python", "PyTorch", "Streamlit"]
    },
    {
      id: 2,
      title: "AI Robo",
      description: "An intelligent chatbot platform built with Python and TensorFlow, featuring natural language processing and machine learning capabilities.",
      image: "/images/projects/chatbot.jpg",
      githubUrl: "https://github.com/yourusername/chatbot",
      technologies: ["Python", "PyTorch", "OpenCV", "FastAPI", "Redis", "Docker"]
    },
    {
      id: 3,
      title: "AI Vision",
      description: "An intelligent chatbot platform built with Python and TensorFlow, featuring natural language processing and machine learning capabilities.",
      image: "/images/projects/chatbot.jpg",
      githubUrl: "https://github.com/yourusername/chatbot",
      technologies: ["Python", "PyTorch", "OpenCV", "FastAPI", "Redis", "Docker"]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto slideshow effect
  useEffect(() => {
    let slideTimer: NodeJS.Timeout;
    
    // Only run the timer if the section is visible
    if (isVisible) {
      slideTimer = setTimeout(() => {
        setCurrentIndex(prevIndex => 
          prevIndex === projects.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000); // Changed to 10 seconds
    }
    
    // Clean up timer when component unmounts or dependencies change
    return () => {
      clearTimeout(slideTimer);
    };
  }, [currentIndex, isVisible, projects.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="min-h-screen py-16 relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-2 mb-5 md:mb-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent font-orbitron uppercase tracking-wide">
          Projects
        </h2>
        <p className="text-gray-400 text-center mb-8">
          My independent projects & contributions
        </p>

        {/* Projects Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute -left-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-500 transition-colors z-10"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-500 transition-colors z-10"
          >
            <ChevronRight size={32} />
          </button>

          {/* Project Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Gradient Border */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 exp-gradient-rotate" />
              <div className="relative m-[2px] bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex flex-col md:flex-row items-stretch">
                  {/* Project Image */}
                  <div className="md:w-1/2 relative aspect-[16/9] md:aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={projects[currentIndex].image}
                      alt={projects[currentIndex].title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Project Info */}
                  <div className="md:w-1/2 p-4 md:p-6 flex flex-col">
                    <h3 className="flex flex-col lg:flex-row items-baseline gap-2 lg:gap-3 text-lg">
                      <span className="font-bold text-cyan-400">{projects[currentIndex].title}</span>
                    </h3>
                    <p className="text-gray-300 text-sm mt-3">
                      {projects[currentIndex].description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {projects[currentIndex].technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="text-sm px-3 py-1 rounded-full bg-gray-800/50 text-purple-400 backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    
                    <a  href={projects[currentIndex].githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-2 rounded-lg
                              hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 
                              shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 animate-gradient-x mt-4 w-fit"
                    >
                      <ExternalLink size={16} />
                      View Project
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Navigation */}
          <div className="flex justify-center space-x-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className="relative"
              >
                <div
                  className={`w-2 h-2 rounded-full transition-colors duration-300 
                    ${index === currentIndex 
                      ? 'bg-cyan-500' 
                      : 'bg-gray-600 hover:bg-gray-500'}`}
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 rounded-full bg-cyan-500 animate-ping" />
                )}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;