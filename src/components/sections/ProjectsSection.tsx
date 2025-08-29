// src/components/sections/ProjectsSection.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, PanInfo } from 'framer-motion';
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
      title: "End-to-End Multi-Stage Intelligent Financial Data Extraction System.",
      description: "This project is an AI-powered financial document processing system that automates the extraction of key data from annual reports and financial statements. Designed to preserve the semantic relationships between line items and their explanatory notes, it combines layout-aware document models, multi-strategy LLM extraction, and intelligent validation mechanisms. With a robust backend engine and an intuitive frontend interface, the system offers real-time updates, offline capability, and scalable architecture making it a reliable end-to-end solution for accurate financial data extraction.",
      image: "/images/projects/findataextractor.png",
      githubUrl: "https://github.com/LasaK97/End-to-End-Multi-Stage-Intelligent-Financial-Data-Extraction-System",
      technologies: ["Python", "Transformers", "MongoDB", "TypeScript", "React", "FastAPI"]
    },

    {
      id: 2,
      title: "Customer Segmentation Using Cluster Analysis for Amazon Sales Data with Dashboard",
      description: "This project segments customers based on demographic, geographic, and behavioral attributes using various clustering techniques such as k-means, K-Mode, Gaussian Mixture, Agglomerative, and K-prototype clustering. A dashboard was developed to visualize the identified customer segments.",
      image: "/images/projects/Customer-segmentation-min.jpg",
      githubUrl: "https://github.com/LasaK97/Customer_segmentation_project",
      technologies: ["Python", "Scikit-learn", "Streamlit", "Scipy", "Plotly"]
    },
    {
      id: 3,
      title: "Laptop Price Predictor [Model + Webapp]",
      description: "This project predicts laptop prices based on various features and specifications.",
      image: "/images/projects/laptop_price_predictor.jpeg",
      githubUrl: "https://github.com/LasaK97/Laptop_price_predictor_using_machine_learning_with_webapp",
      technologies: ["Python", "PyTorch", "Streamlit"]
    },
    {
      id: 4,
      title: "Intelligent Robot Navigation Guidance and Control System",
      description: "This intelligent robot navigation system uses AI to detect, track, and analyze human positions and arrangements, enabling robots to determine optimal positioning in dynamic environments. By combining computer vision, spatial reasoning, and environmental awareness, the system continuously adapts to evolving human formations, allowing for intuitive robot navigation that respects human spatial contexts.",
      image: "/images/projects/robot-navi.jpg",
      githubUrl: "https://github.com/LasaK97/Intelligent-Robot-Navigation-Guidance-and-Control-System",
      technologies: ["Python", "YOLO", "OpenCV", "ROS", "PyRealsense2", "Gazebo"]
    },
    {
      id: 5,
      title: "AI-Powered Personalized Insurance Recommendation System",
      description: "This project presents the design and implementation of an AI-powered personalized insurance recommendation system aimed at enhancing the insurance purchasing experience. The system utilizes machine learning models to recommend tailored insurance solutions based on customer profiles and data analysis.",
      image: "/images/projects/ai-insurance.png",
      githubUrl: "https://github.com/LasaK97/AI-Powered-Insurance-recommendation-system",
      technologies: ["Python", "PyTorch", "Streamlit", "Scikit-learn", "Scipy", "Plotly"]
    },
    {
      id: 6,
      title: "Self Portofolio Website",
      description: "This portfolio website showcases my front-end development skills, which complement my primary expertise as a data scientist. While my professional focus is on data analysis, machine learning, and statistical modeling, this project demonstrates my ability to work with modern web technologies.",
      image: "/images/projects/porto.png",
      githubUrl: "https://github.com/LasaK97/My-portofolio",
      technologies: ["Next.js", "Tailwind CSS"]
    },
        {
      id: 7,
      title: "Uncovering Health and Economic Patterns: A Factor Analysis of Global Life Expectancy Data",
      description: "This project applies factor analysis to global health and economic data sourced from WHO and the UN, covering 193 countries between 2000–2015. The objective is to reveal latent variables that explain the complex relationships among 22 health-related indicators, including mortality rates, vaccination coverage, GDP, and more. Through data preprocessing and factor extraction using varimax rotation, five key underlying factors were identified: child mortality, adult mortality, body composition and nutrition, economic status, and vaccination coverage. These insights support more informed health policy analysis, though further refinement is recommended as the model may benefit from additional factors for improved accuracy.",
      image: "/images/projects/factor.jpg",
      githubUrl: "https://github.com/LasaK97/Factor-Analysis-for-the-Life-Expectancy-data-using-R",
      technologies: ["R", "ggplot2", "mice", "psych", "nFactors", "lavaan", "GGally"]
    },
        {
      id: 8,
      title: "Discovering Relationships Between Physiology and Fitness: A Canonical Correlation Analysis of Body Performance Data",
      description: "This project applies Canonical Correlation Analysis (CCA) to explore the relationships between physiological characteristics and physical fitness performance using a real-world dataset from the Korean Sports Promotion Foundation. The dataset, sourced from Kaggle, includes health and performance metrics for individuals aged 20 to 64.",
      image: "/images/projects/cano.png",
      githubUrl: "https://github.com/LasaK97/Canonical-Correlation-Analysis-using-R",
      technologies: ["R", "readr", "dplyr", "ggplot2", "MVN", "CCA", "CCP", "tidyr", "corrr", "psych"]
    },
    
  ];

  const [direction, setDirection] = useState(0);
  const dragX = useMotionValue(0);

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
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prevSlide();
    } else if (info.offset.x < -threshold) {
      nextSlide();
    }
  };

  const handleDotClick = (index: number) => {
    if (index > currentIndex) {
      setDirection(1);
    } else if (index < currentIndex) {
      setDirection(-1);
    }
    setCurrentIndex(index);
  };

  // Simple professional slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 8000; // Reduced for better mobile sensitivity
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  // Mobile-optimized thresholds
  const getMobileThreshold = () => {
    return window.innerWidth < 768 ? 30 : 50; // Lower threshold for mobile
  };

  const handleDragEndWithSwipe = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const swipe = swipePower(offset.x, velocity.x);
    const threshold = getMobileThreshold();

    // Check for fast swipes first (velocity-based)
    if (swipe < -swipeConfidenceThreshold) {
      nextSlide();
    } else if (swipe > swipeConfidenceThreshold) {
      prevSlide();
    } else if (Math.abs(offset.x) > threshold) {
      // Then check for slower but significant movements (distance-based)
      if (offset.x > threshold) {
        prevSlide();
      } else if (offset.x < -threshold) {
        nextSlide();
      }
    }
    // If neither condition is met, the card snaps back to center
  };

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="min-h-screen py-20 md:py-20 lg:py-24 relative"
    >
      <motion.div
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: isVisible ? 0 : 50, scale: isVisible ? 1 : 0.95 }}
        exit={{ y: -50, scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container mx-auto px-4"
      >
        <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-center mt-2 mb-4 md:mb-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent font-orbitron uppercase tracking-wide px-4 sm:px-0">
          Projects
        </h2>
        <p className="text-medium-gray text-center mb-24 text-lg">
          My AI & ML innovations in action
        </p>

        {/* Projects Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          {/* Navigation Arrows - Fixed position */}
          <motion.button
            onClick={prevSlide}
            className="absolute -left-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyber-cyan transition-colors z-10"
            whileHover={{ 
              color: "#06b6d4",
              scale: 1.05
            }}
            whileTap={{ 
              scale: 0.9
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25
            }}
          >
            <ChevronLeft size={32} />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="absolute -right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyber-cyan transition-colors z-10"
            whileHover={{ 
              color: "#06b6d4",
              scale: 1.05
            }}
            whileTap={{ 
              scale: 0.9
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25
            }}
          >
            <ChevronRight size={32} />
          </motion.button>

          {/* Project Card */}
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { duration: 0.5, ease: "easeInOut" },
                opacity: { duration: 0.3 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={handleDragEndWithSwipe}
              className="relative cursor-grab active:cursor-grabbing w-full"
              style={{ touchAction: 'pan-y' }}
            >
            {/* 15% transparency gradient border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-orange via-hot-pink to-cyber-cyan rounded-lg opacity-15 animate-gradient-x blur-sm" />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-orange via-hot-pink to-cyber-cyan rounded-lg opacity-15 animate-gradient-x" />
            {/* 15% transparency glass card */}
            <div className="relative bg-black/15 backdrop-blur-sm border border-white/15 shadow-sm p-6 rounded-lg hover:bg-black/25 hover:border-white/25 transition-all duration-700">
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
                    <span className="font-bold text-neon-orange font-orbitron">{projects[currentIndex].title}</span>
                  </h3>
                  <p className="text-off-white text-sm mt-3 leading-relaxed text-justify">
                    {projects[currentIndex].description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {projects[currentIndex].technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="text-xs px-3 py-1 rounded-full glassmorphism text-cyber-cyan border border-cyber-cyan/30 hover:border-neon-orange/50 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  
                  <motion.a  href={projects[currentIndex].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative bg-gradient-to-r from-neon-orange to-neon-purple text-white px-6 py-3 rounded-lg font-semibold
                            transition-all duration-500 transform
                            inline-flex items-center gap-2 mt-4 w-fit font-orbitron tracking-wide"
                    whileHover={{
                      scale: 1.08,
                      boxShadow: "0 15px 35px rgba(6, 182, 212, 0.4)",
                      y: -3
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <ExternalLink size={16} />
                      Explore Project
                    </span>
                  </motion.a>
                </div>
              </div>
            </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Navigation - Fixed to page bottom with consistent gap */}
        <div className="flex justify-center space-x-2">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <motion.div
                  className={`w-3 h-3 rounded-full transition-all duration-300 border-2
                    ${index === currentIndex 
                      ? 'bg-cyber-cyan border-cyber-cyan shadow-lg shadow-cyber-cyan/50' 
                      : 'bg-transparent border-medium-gray hover:border-cyber-cyan'}`}
                  whileHover={index !== currentIndex ? {
                    borderColor: "#06b6d4",
                    boxShadow: "0 0 10px rgba(6, 182, 212, 0.3)"
                  } : {}}
                />
                {index === currentIndex && (
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-cyber-cyan opacity-50"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </motion.button>
            ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;