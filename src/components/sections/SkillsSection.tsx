// src/components/sections/SkillsSection.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import SkillCircle from './skills/SkillCircle';
import { ChevronDown, Code, Database, Brain, Hammer, Camera, BarChart2, Bot, Package } from 'lucide-react';

interface SkillCategory {
  id: string;
  title: string;
  experience: string;
  icon: React.ElementType;
  skills: {
    name: string;
    logo: string;
    percentage: number;
  }[];
}

const SkillsSection = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const skillCategories: SkillCategory[] = [
    {
      id: 'machine-learning',
      title: 'Machine Learning & AI',
      experience: '4+ Years XP',
      icon: Brain,
      skills: [
        { name: "Scikit-learn", logo: "/images/skills/scikit.png", percentage: 85 },
        { name: "PyTorch", logo: "/images/skills/pytorch.png", percentage: 80 },
        { name: "TensorFlow", logo: "/images/skills/tensorflow.png", percentage: 70 },
        { name: "LangChain", logo: "/images/skills/langchain.png", percentage: 65 },
        { name: "Hugging Face", logo: "/images/skills/huggingface.png", percentage: 75 },
        { name: "NLTK", logo: "/images/skills/nltk.png", percentage: 70 },
      ]
    },
    {
      id: 'programming',
      title: 'Programming Languages',
      experience: '5+ Years XP',
      icon: Code,
      skills: [
        { name: "Python", logo: "/images/skills/python.png", percentage: 85 },
        { name: "R", logo: "/images/skills/r.png", percentage: 75 },
        { name: "Java", logo: "/images/skills/java.png", percentage: 70 },
        { name: "C++", logo: "/images/skills/cpp.png", percentage: 65 },
        { name: "C", logo: "/images/skills/c.png", percentage: 60 },
        { name: "HTML", logo: "/images/skills/html.png", percentage: 65 },
        { name: "CSS", logo: "/images/skills/css.png", percentage: 60 },
        { name: "JavaScript", logo: "/images/skills/js.png", percentage: 55 },
      ]
    },
    {
      id: 'databases',
      title: 'Databases',
      experience: '4+ Years XP',
      icon: Database,
      skills: [
        { name: "MySQL", logo: "/images/skills/mysql.png", percentage: 95 },
        { name: "Oracle SQL", logo: "/images/skills/oracle.png", percentage: 90 },
        { name: "MongoDB", logo: "/images/skills/mongodb.png", percentage: 85 },
        { name: "Redis", logo: "/images/skills/redis.png", percentage: 70 },
        { name: "Neo4j", logo: "/images/skills/neo4j.png", percentage: 75 },
        { name: "Pinecone", logo: "/images/skills/pinecone.png", percentage: 75 },
        
      ]
    },
    {
      id: 'computer-vision',
      title: 'Computer Vision & Audio',
      experience: '3+ Years XP',
      icon: Camera,
      skills: [
        { name: "OpenCV", logo: "/images/skills/opencv.png", percentage: 70 },
        { name: "Supervision", logo: "/images/skills/sv.png", percentage: 75 },
        { name: "Librosa", logo: "/images/skills/librosa.png", percentage: 55 },
        { name: "MediaPipe", logo: "/images/skills/mediapipe.png", percentage: 65 },
        { name: "YOLO", logo: "/images/skills/yolo.png", percentage: 70 },
      ]
    },
    {
      id: 'dev-tools',
      title: 'Development & Tools',
      experience: '4+ Years XP',
      icon: Hammer,
      skills: [
        { name: "Git", logo: "/images/skills/git.png", percentage: 80 },
        { name: "Docker", logo: "/images/skills/docker.png", percentage: 70 },
        { name: "Linux", logo: "/images/skills/linux.png", percentage: 70 },
        { name: "AWS", logo: "/images/skills/aws.png", percentage: 65 },
        { name: "Oracle Cloud", logo: "/images/skills/oracle_cloud.png", percentage: 90 },
        { name: "FastAPI", logo: "/images/skills/fastapi.png", percentage: 70 },
        { name: "Flask", logo: "/images/skills/flask.png", percentage: 80 },
        { name: "Streamlit", logo: "/images/skills/streamlit.png", percentage: 90 },
      ]
    },
    {
      id: 'visualization',
      title: 'Data Visualization',
      experience: '4+ Years XP',
      icon: BarChart2,
      skills: [
        { name: "PowerBI", logo: "/images/skills/powerbi.png", percentage: 75 },
        { name: "Excel", logo: "/images/skills/excel.png", percentage: 90 },
        { name: "Plotly", logo: "/images/skills/plotly.png", percentage: 80 },
        { name: "Matplotlib", logo: "/images/skills/matplotlib.png", percentage: 85 },
        { name: "Seaborn", logo: "/images/skills/seaborn.png", percentage: 80 },
      ]
    },
    {
      id: 'robotics',
      title: 'Robotics',
      experience: '2+ Years XP',
      icon: Bot,
      skills: [
        { name: "ROS", logo: "/images/skills/ros.png", percentage: 55 },
        { name: "Rospy", logo: "/images/skills/rospy.png", percentage: 60 },
        { name: "Arduino", logo: "/images/skills/arduino.png", percentage: 65 },
      ]
    },
    {
      id: 'misc',
      title: 'Miscellaneous',
      experience: '3+ Years XP',
      icon: Package,
      skills: [
        { name: "Jupyter", logo: "/images/skills/jupyter.png", percentage: 85 },
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  // Animation variants for the floating effect
  const floatLeftVariants = {
    hidden: { 
      x: -80, 
      scale: 0.9
    },
    visible: (index: number) => ({ 
      x: 0, 
      scale: 1,
      transition: { 
        duration: 0.7, 
        delay: index * 0.1,
        ease: "easeOut"
      } 
    })
  };

  const floatRightVariants = {
    hidden: { 
      x: 80, 
      scale: 0.9
    },
    visible: (index: number) => ({ 
      x: 0, 
      scale: 1,
      transition: { 
        duration: 0.7, 
        delay: index * 0.1,
        ease: "easeOut"
      } 
    })
  };

  return (
    <section id="skills" className="min-h-screen py-16 md:py-20 lg:py-24 relative" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-2 mb-5 md:mb-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent font-orbitron uppercase tracking-wide">
          Technical Arsenal
        </h2>
        <p className="text-medium-gray text-center mb-24 text-lg">
          AI/ML expertise & cutting-edge technologies
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={category.id} 
              className="w-full"
              custom={Math.floor(index / 2)} // Group by pairs for staggered animation
              initial="hidden"
              animate={controls}
              exit={isInView ? "visible" : "hidden"}
              variants={index % 2 === 0 ? floatLeftVariants : floatRightVariants}
            >
              <div
                onClick={() => toggleCategory(category.id)}
                className="relative cursor-pointer"
              >
                {/* 15% transparency gradient border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-orange via-hot-pink to-cyber-cyan rounded-lg opacity-15 animate-gradient-x blur-sm" />
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-orange via-hot-pink to-cyber-cyan rounded-lg opacity-15 animate-gradient-x" />
                {/* 15% transparency glass card */}
                <div className="relative bg-black/15 backdrop-blur-sm border border-white/15 shadow-sm p-6 rounded-lg hover:bg-black/25 hover:border-white/25 transition-all duration-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <category.icon className="w-7 h-7 text-neon-orange" />
                      <div>
                        <h3 className="text-xl font-bold text-off-white font-orbitron">
                          {category.title}
                        </h3>
                        <p className="text-sm text-secondary-accent font-medium">{category.experience}</p>
                      </div>
                    </div>
                    <ChevronDown 
                      className={`w-6 h-6 text-neon-orange transition-all duration-500 ${
                        expandedCategory === category.id ? 'rotate-180' : 'rotate-0 hover:scale-110'
                      }`}
                    />
                  </div>

                  <AnimatePresence>
                    {expandedCategory === category.id && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 mt-6 pt-4 border-t border-neon-orange/20">
                          {category.skills.map((skill, index) => (
                            <SkillCircle
                              key={skill.name}
                              {...skill}
                              delay={index * 0.1}
                              index={index}
                              isVisible={expandedCategory === category.id}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;