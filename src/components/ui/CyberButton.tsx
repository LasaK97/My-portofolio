'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CyberButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const CyberButton: React.FC<CyberButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className = '',
  disabled = false,
  icon
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-neon-orange to-hot-pink text-void-black font-semibold hover:from-electric-orange hover:to-hot-pink border-neon-orange/50 shadow-lg shadow-neon-orange/25';
      case 'secondary':
        return 'bg-gradient-to-r from-cyber-cyan to-electric-blue text-void-black font-semibold hover:from-electric-blue hover:to-cyber-cyan border-cyber-cyan/50 shadow-lg shadow-cyber-cyan/25';
      case 'ghost':
        return 'bg-transparent text-off-white border-medium-gray hover:border-neon-orange hover:text-neon-orange hover:shadow-lg hover:shadow-neon-orange/25';
      default:
        return '';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-3 text-sm min-h-[44px]';  // Enhanced touch target
      case 'md':
        return 'px-6 py-3 text-base min-h-[48px]';
      case 'lg':
        return 'px-8 py-4 text-lg min-h-[52px]';
      default:
        return '';
    }
  };

  const baseClasses = `
    relative overflow-hidden rounded-lg border-2 
    transition-all duration-300 ease-out
    transform hover:scale-105 active:scale-95
    flex items-center justify-center gap-2
    font-orbitron tracking-wide
    touch-manipulation select-none
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

  const Component = href ? 'a' : 'button';

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${getVariantClasses()} ${getSizeClasses()} ${className}`}
    >
      <Component
        href={href}
        onClick={onClick}
        disabled={disabled}
        className="w-full h-full flex items-center justify-center gap-2"
        {...(href && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {/* Background pulse effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-pulse group-hover:translate-x-full transition-transform duration-1000" />
        
        {/* Icon */}
        {icon && (
          <span className="relative z-10">
            {icon}
          </span>
        )}
        
        {/* Text */}
        <span className="relative z-10">
          {children}
        </span>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-current opacity-50" />
        <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-current opacity-50" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-current opacity-50" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-current opacity-50" />
      </Component>
    </motion.div>
  );
};

export default CyberButton;