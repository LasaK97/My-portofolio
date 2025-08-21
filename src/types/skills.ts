// src/types/skills.ts
export interface Skill {
    name: string;
    logo: string;
    percentage: number;
  }
  
  export interface SkillGroup {
    category: string;
    skills: Skill[];
  }
  
  export interface SkillCircleProps {
    name: string;
    logo: string;
    percentage: number;
    delay: number;
    index: number;
    isVisible?: boolean;
  }