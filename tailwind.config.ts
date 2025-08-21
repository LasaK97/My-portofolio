/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
      colors: {
        // Professional Color System
        'void-black': 'var(--void-black)',
        'midnight': 'var(--midnight)',
        'dark-slate': 'var(--dark-slate)',
        'charcoal': 'var(--charcoal)',
        'storm': 'var(--storm)',
        'ash': 'var(--ash)',
        
        // Primary Professional Colors
        'primary': 'var(--primary-accent)',
        'primary-light': 'var(--primary-light)',
        'primary-dark': 'var(--primary-dark)',
        'secondary': 'var(--secondary-accent)',
        'secondary-light': 'var(--secondary-light)',
        'secondary-dark': 'var(--secondary-dark)',
        'tertiary': 'var(--tertiary-accent)',
        'tertiary-light': 'var(--tertiary-light)',
        'tertiary-dark': 'var(--tertiary-dark)',
        
        // Legacy compatibility
        'neon-orange': 'var(--neon-orange)',
        'electric-orange': 'var(--electric-orange)',
        'burnt-orange': 'var(--burnt-orange)',
        'cyber-cyan': 'var(--cyber-cyan)',
        'electric-blue': 'var(--electric-blue)',
        'neon-purple': 'var(--neon-purple)',
        'hot-pink': 'var(--hot-pink)',
        'lime-green': 'var(--lime-green)',
        'golden-yellow': 'var(--golden-yellow)',
        
        // Supporting colors
        'off-white': 'var(--off-white)',
        'light-gray': 'var(--light-gray)',
        'medium-gray': 'var(--medium-gray)',
        'dark-gray': 'var(--dark-gray)',
        'border-gray': 'var(--border-gray)',
        'text-muted': 'var(--text-muted)',
      },
      animation: {
        'slide-in-left': 'slide-in-left 1s ease-out forwards',
        'slide-in-right': 'slide-in-right 1s ease-out forwards',
        'gradient-rotate': 'gradientRotate 3s linear infinite',
        'pulse-expand': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x': 'gradient-x 3s linear infinite',
        'neon-glow': 'neon-glow 2s ease-in-out infinite alternate',
        'neural-pulse': 'neural-pulse 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'matrix-fall': 'matrix-fall 3s linear infinite',
      },
      keyframes: {
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        gradientRotate: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulse: {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'neon-glow': {
          '0%, 100%': {
            'text-shadow': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor'
          },
          '50%': {
            'text-shadow': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor'
          },
        },
        'neural-pulse': {
          '0%, 100%': {
            opacity: '0.3',
            transform: 'scale(1)'
          },
          '50%': {
            opacity: '0.8', 
            transform: 'scale(1.1)'
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          },
        },
        'matrix-fall': {
          '0%': {
            transform: 'translateY(-100vh)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateY(100vh)',
            opacity: '0'
          },
        },
      },
      
    },
  },
  plugins: [],
};
