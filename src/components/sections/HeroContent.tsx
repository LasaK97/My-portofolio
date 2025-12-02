import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, BookOpen, Download } from 'lucide-react';
import { IconType } from 'react-icons';

interface RotatingPhrase {
    text: string;
    icon: IconType;
}

interface HeroContentProps {
    animationState: string;
    isFirstLoad: boolean;
    currentTypeText: string;
    showCursor: boolean;
    currentPhraseIndex: number;
    rotatingPhrases: RotatingPhrase[];
    socialLinks: { icon: React.ElementType; href: string; label: string }[];
    scrollToProjects: () => void;
    isMobile?: boolean;
}

const HeroContent: React.FC<HeroContentProps> = ({
    animationState,
    isFirstLoad,
    currentTypeText,
    showCursor,
    currentPhraseIndex,
    rotatingPhrases,
    socialLinks,
    scrollToProjects,
    isMobile = false
}) => {
    // Adjust delays and sizes based on mobile/desktop
    const baseDelay = isMobile ? 0 : 0; // Can adjust if needed
    const titleSize = isMobile
        ? "text-2xl sm:text-3xl md:text-4xl"
        : "text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl";

    const subTitleSize = isMobile
        ? "text-sm sm:text-base md:text-lg h-8 sm:h-10 justify-center"
        : "text-lg lg:text-xl xl:text-2xl h-12 justify-start";

    const alignClass = isMobile ? "text-center items-center" : "text-left items-start";
    const flexJustify = isMobile ? "justify-center" : "justify-start";

    return (
        <div className={`w-full max-w-xl ${alignClass} flex flex-col`}>
            {/* Greeting */}
            <motion.p
                className={`text-cyber-cyan font-orbitron font-medium mb-4 ${isMobile ? "text-base sm:text-lg" : "text-lg md:text-xl"}`}
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                animate={{
                    opacity: animationState === 'visible' ? 1 : 0,
                    y: animationState === 'visible' ? 0 : animationState === 'hidden' ? -50 : 50,
                    filter: animationState === 'visible' ? "blur(0px)" : "blur(10px)"
                }}
                transition={{
                    duration: 0.8,
                    delay: animationState === 'visible' ? (isFirstLoad ? 0.3 : 0.1) : 0,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }}
            >
                Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
                className={`${titleSize} font-bold mb-6 font-orbitron bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent leading-tight`}
                initial={{ opacity: 0, y: 80, scale: 0.8, filter: "blur(15px)" }}
                animate={{
                    opacity: animationState === 'visible' ? 1 : 0,
                    y: animationState === 'visible' ? 0 : animationState === 'hidden' ? -80 : 80,
                    scale: animationState === 'visible' ? 1 : 0.8,
                    filter: animationState === 'visible' ? "blur(0px)" : "blur(15px)"
                }}
                transition={{
                    duration: 1,
                    delay: animationState === 'visible' ? (isFirstLoad ? 0.5 : 0.2) : 0,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }}
            >
                Lasantha<br />Kulasooriya
            </motion.h1>

            {/* Title with Typing Animation */}
            <motion.h2
                className={`font-semibold text-off-white mb-6 flex items-center ${subTitleSize}`}
                initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                animate={{
                    opacity: animationState === 'visible' ? 1 : 0,
                    y: animationState === 'visible' ? 0 : animationState === 'hidden' ? -60 : 60,
                    filter: animationState === 'visible' ? "blur(0px)" : "blur(10px)"
                }}
                transition={{
                    duration: 0.8,
                    delay: animationState === 'visible' ? (isFirstLoad ? 0.7 : 0.3) : 0,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }}
            >
                <span>And I&apos;m a </span>
                <span className="text-cyber-cyan ml-2">
                    {currentTypeText}
                </span>
                {showCursor && <span className="animate-pulse text-cyber-cyan ml-1 text-2xl lg:text-3xl">|</span>}
            </motion.h2>

            {/* Rotating Phrases */}
            <motion.div
                className={`mb-6 overflow-hidden ${isMobile ? "h-8 md:h-10" : "h-10"}`}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{
                    opacity: animationState === 'visible' ? 1 : 0,
                    y: animationState === 'visible' ? 0 : animationState === 'hidden' ? -40 : 40,
                    filter: animationState === 'visible' ? "blur(0px)" : "blur(8px)"
                }}
                transition={{
                    duration: 0.8,
                    delay: animationState === 'visible' ? (isFirstLoad ? 0.9 : 0.4) : 0,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPhraseIndex}
                        className={`text-light-gray leading-relaxed flex items-center h-full gap-3 ${isMobile ? "text-base md:text-lg justify-center" : "text-lg justify-start"}`}
                        initial={{ x: -50, opacity: 0, filter: "blur(5px)" }}
                        animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ x: 50, opacity: 0, filter: "blur(5px)" }}
                        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <div className="relative flex items-center justify-center">
                            <svg width="0" height="0" className="absolute">
                                <defs>
                                    <linearGradient id={isMobile ? "icon-gradient-mobile" : "icon-gradient"} x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="50%" stopColor="#06b6d4" />
                                        <stop offset="100%" stopColor="#8b5cf6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            {React.createElement(rotatingPhrases[currentPhraseIndex].icon, {
                                className: `${isMobile ? "text-xl md:text-2xl" : "text-2xl"} relative z-10`,
                                style: {
                                    fill: `url(#${isMobile ? "icon-gradient-mobile" : "icon-gradient"})`,
                                    filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 20px rgba(6, 182, 212, 0.4))'
                                }
                            })}
                        </div>
                        <span>{rotatingPhrases[currentPhraseIndex].text}</span>
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            {/* Small Description */}
            <motion.p
                className={`text-light-gray leading-relaxed mb-6 text-justify ${isMobile ? "text-xs sm:text-sm px-4 sm:px-6" : "text-base max-w-lg"}`}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{
                    opacity: animationState === 'visible' ? 1 : 0,
                    y: animationState === 'visible' ? 0 : animationState === 'hidden' ? -30 : 30,
                    filter: animationState === 'visible' ? "blur(0px)" : "blur(8px)"
                }}
                transition={{
                    duration: 0.8,
                    delay: animationState === 'visible' ? (isFirstLoad ? 1.1 : 0.5) : 0,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }}
            >
                I specialize in developing and deploying intelligent systems, leveraging expertise in machine learning,
                deep learning, and data science to translate complex challenges into impactful, data-driven solutions.
            </motion.p>

            {/* Social Links */}
            <motion.div
                className={`flex ${flexJustify} gap-4 mb-8`}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{
                    opacity: animationState === 'visible' ? 1 : 0,
                    y: animationState === 'visible' ? 0 : animationState === 'hidden' ? -40 : 40,
                    scale: animationState === 'visible' ? 1 : 0.9
                }}
                transition={{
                    duration: 0.8,
                    delay: animationState === 'visible' ? (isFirstLoad ? 1.3 : 0.6) : 0,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }}
            >
                {socialLinks.map((social, index) => (
                    <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`relative ${isMobile ? "w-10 h-10 sm:w-12 sm:h-12" : "w-12 h-12"} bg-gradient-to-r from-neon-orange to-hot-pink rounded-lg flex items-center justify-center text-white transition-all duration-500`}
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{
                            opacity: animationState === 'visible' ? 1 : 0,
                            scale: animationState === 'visible' ? 1 : 0.5,
                            y: animationState === 'visible' ? 0 : 50
                        }}
                        transition={{
                            duration: 0.5,
                            delay: (isFirstLoad ? 1.4 : 0.7) + index * 0.1,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        whileHover={{
                            scale: 1.08,
                            y: -3,
                            boxShadow: "0 15px 35px rgba(6, 182, 212, 0.4)",
                            transition: { type: "spring", stiffness: 500, damping: 15 }
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10">
                            <social.icon size={20} />
                        </span>
                    </motion.a>
                ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
                className={`flex ${isMobile ? "flex-col sm:flex-row justify-center" : "flex-row justify-start"} gap-3 sm:gap-4 mb-4 sm:mb-6`}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{
                    opacity: animationState === 'visible' ? 1 : 0,
                    y: animationState === 'visible' ? 0 : animationState === 'hidden' ? -50 : 50,
                    scale: animationState === 'visible' ? 1 : 0.9
                }}
                transition={{
                    duration: 0.8,
                    delay: animationState === 'visible' ? (isFirstLoad ? 1.5 : 0.7) : 0,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }}
            >
                <motion.button
                    onClick={scrollToProjects}
                    className={`${isMobile ? "w-full sm:w-56 px-4 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base" : "w-56 px-8 py-3 text-base"} bg-gradient-to-r from-neon-orange to-neon-purple text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-500`}
                    whileHover={{
                        scale: 1.08,
                        y: -3,
                        boxShadow: "0 15px 35px rgba(6, 182, 212, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{
                        x: animationState === 'visible' ? 0 : -30,
                        opacity: animationState === 'visible' ? 1 : 0
                    }}
                    transition={{
                        delay: isFirstLoad ? 1.6 : 0.8,
                        type: "spring",
                        stiffness: 500,
                        damping: 15
                    }}
                >
                    <ExternalLink size={18} />
                    <span>Explore Projects</span>
                </motion.button>

                <div className={`relative p-0.5 bg-gradient-to-r from-neon-orange to-neon-purple rounded-lg animate-gradient-x ${isMobile ? "w-full sm:w-56" : "w-56"}`}>
                    <motion.a
                        href="#contact"
                        className={`w-full bg-void-black rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-500 ${isMobile ? "px-4 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base" : "px-8 py-3 text-base"}`}
                        initial={{ x: 30, opacity: 0 }}
                        animate={{
                            x: animationState === 'visible' ? 0 : 30,
                            opacity: animationState === 'visible' ? 1 : 0
                        }}
                        whileHover={{
                            scale: 1.08,
                            y: -3,
                            boxShadow: "0 15px 35px rgba(139, 92, 246, 0.4)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                            delay: isFirstLoad ? 1.7 : 0.9,
                            type: "spring",
                            stiffness: 500,
                            damping: 15
                        }}
                    >
                        <Mail size={18} className="text-neon-orange" style={{ filter: 'drop-shadow(0 0 2px #8b5cf6)' }} />
                        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">Contact Me</span>
                    </motion.a>
                </div>

                {/* Resume Download Button - Placeholder for now */}
                {/* 
        <motion.a
            href="/resume.pdf"
            download
            className="..."
        >
            <Download size={18} />
            <span>Download CV</span>
        </motion.a>
        */}
            </motion.div>

            {/* Available for opportunities */}
            <motion.div
                className={`flex items-center ${flexJustify} gap-2`}
                initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                animate={{
                    opacity: animationState === 'visible' ? 1 : 0,
                    y: animationState === 'visible' ? 0 : animationState === 'hidden' ? -20 : 20,
                    filter: animationState === 'visible' ? "blur(0px)" : "blur(5px)"
                }}
                transition={{
                    duration: 0.8,
                    delay: animationState === 'visible' ? (isFirstLoad ? 1.8 : 0.8) : 0,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }}
            >
                <div className="relative">
                    <div className="w-2 h-2 bg-green-500 rounded-full" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
                    <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full opacity-75" style={{ animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
                </div>
                <span className="text-light-gray text-sm">Available for AI/ML opportunities</span>
            </motion.div>
        </div>
    );
};

export default HeroContent;
