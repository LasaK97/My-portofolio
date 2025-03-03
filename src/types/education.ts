// src/types/education.ts
export interface Education {
    id: number;
    degree: string;
    institution: string;
    duration: string;
    description: string;
    logo: string;
  }
  
  export interface EducationCardProps {
    education: Education;
    onInView: () => void;
  }
  
  export interface EducationTimelineNodeProps {
    isVisible: boolean;
    logo: string;
  }