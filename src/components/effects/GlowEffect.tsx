'use client';

import React from 'react';

interface GlowEffectProps {
  children: React.ReactNode;
  color?: 'orange' | 'cyan' | 'purple' | 'pink' | 'green';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export const GlowEffect: React.FC<GlowEffectProps> = ({ 
  children, 
  color = 'orange', 
  intensity = 'medium',
  className = '' 
}) => {
  const getGlowClasses = () => {
    const colorMap = {
      orange: 'shadow-neon-orange border-neon-orange/30',
      cyan: 'shadow-cyber-cyan border-cyber-cyan/30',
      purple: 'shadow-neon-purple border-neon-purple/30',
      pink: 'shadow-hot-pink border-hot-pink/30',
      green: 'shadow-lime-green border-lime-green/30'
    };

    const intensityMap = {
      low: 'shadow-lg',
      medium: 'shadow-xl',
      high: 'shadow-2xl'
    };

    return `${colorMap[color]} ${intensityMap[intensity]} border transition-all duration-300 hover:shadow-2xl`;
  };

  return (
    <div className={`${getGlowClasses()} ${className} group`}>
      {children}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-inherit bg-gradient-to-r from-transparent via-current to-transparent animate-pulse" />
    </div>
  );
};

export default GlowEffect;