// src/types/experience.ts

export interface Experience {
    id: number;
    title: string;
    company: string;
    duration: string;
    description: string;
    isCurrentJob: boolean;
    logo: string;
  }
  
  export interface ExperienceCardProps {
    experience: Experience;
    position: 'left' | 'right';
    onInView: () => void;
  }
  
  export interface TimelineNodeProps {
    isCurrentJob: boolean;
    isVisible: boolean;
    logo: string;
  }