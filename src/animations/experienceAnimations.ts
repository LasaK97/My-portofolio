// src/animations/experienceAnimations.ts
import { Variants } from 'framer-motion';

export const cardVariants: Variants = {
  hidden: (position: 'left' | 'right') => ({
    x: position === 'left' ? -80 : 80,
    scale: 0.9,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }),
  visible: {
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: 'easeOut'
    }
  },
  exit: (position: 'left' | 'right') => ({
    x: position === 'left' ? -80 : 80,
    scale: 0.9,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  })
};

export const nodeVariants: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

export const lineVariants: Variants = {
  hidden: {
    scaleY: 0,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: {
    scaleY: 0,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

export const connectingLineVariants: Variants = {
  hidden: (position: 'left' | 'right') => ({
    scaleX: 0,
    opacity: 0,
    originX: position === 'left' ? 1 : 0,
    transition: {
      duration: 0.3
    }
  }),
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: (position: 'left' | 'right') => ({
    scaleX: 0,
    opacity: 0,
    originX: position === 'left' ? 0 : 1,
    transition: {
      duration: 0.3
    }
  })
};

// Animation for the expanding circles effect
export const expandingCircleVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 0.8,
  },
  animate: {
    scale: 2,
    opacity: 0,
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: 'easeOut',
    },
  },
};