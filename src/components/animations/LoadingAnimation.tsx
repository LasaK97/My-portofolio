// src/components/animations/LoadingAnimation.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(0);
  const [stage, setStage] = useState<'neural-loading' | 'transitioning' | 'welcome'>('neural-loading');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;

    // Set canvas size based on device width
    const size = Math.min(window.innerWidth * 0.6, 200);
    canvas.width = size;
    canvas.height = size;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      angle: number;
      speed: number;
      explosionSpeed: number = 0;
      targetX: number;
      targetY: number;
      isConverging: boolean = false;

      constructor(width: number, height: number) {
        // Start from center area
        this.x = width / 2 + (Math.random() - 0.5) * width * 0.4;
        this.y = height / 2 + (Math.random() - 0.5) * height * 0.4;
        this.targetX = this.x;
        this.targetY = this.y;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.3 + 0.1;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.size = Math.random() * 2 + 1;
        
        // Use only theme colors
        const colors = [
          'rgba(59, 130, 246, 0.9)',   // primary-accent (blue)
          'rgba(6, 182, 212, 0.8)',    // secondary-accent (cyan)
          'rgba(139, 92, 246, 0.8)',   // tertiary-accent (purple)
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      convergeToCenter(centerX: number, centerY: number) {
        this.isConverging = true;
        this.targetX = centerX + (Math.random() - 0.5) * 20;
        this.targetY = centerY + (Math.random() - 0.5) * 20;
      }

      update(isExploding: boolean, width: number, height: number, isConverging: boolean) {
        if (isConverging && this.isConverging) {
          // Smooth convergence to center
          const dx = this.targetX - this.x;
          const dy = this.targetY - this.y;
          this.x += dx * 0.08;
          this.y += dy * 0.08;
          this.size = Math.max(0.5, this.size * 0.98);
        } else if (isExploding) {
          // Explosion effect
          const dx = this.x - width / 2;
          const dy = this.y - height / 2;
          const angle = Math.atan2(dy, dx);
          
          this.explosionSpeed += 0.4;
          this.x += Math.cos(angle) * this.explosionSpeed;
          this.y += Math.sin(angle) * this.explosionSpeed;
          this.size = Math.min(4, this.size * 1.02);
        } else {
          // Normal floating movement
          this.x += this.vx;
          this.y += this.vy;

          // Gentle bouncing
          const padding = 20;
          if (this.x < padding || this.x > width - padding) {
            this.vx *= -1;
            this.x = Math.max(padding, Math.min(width - padding, this.x));
          }
          if (this.y < padding || this.y > height - padding) {
            this.vy *= -1;
            this.y = Math.max(padding, Math.min(height - padding, this.y));
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D, opacity: number = 1) {
        ctx.save();
        ctx.globalAlpha = opacity;
        
        // Soft glow layers
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color.replace(/0\.[89]/, '0.3');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 10;
        ctx.fillStyle = this.color.replace(/0\.[89]/, '0.6');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 5;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    const particles: Particle[] = Array.from(
      { length: 35 }, 
      () => new Particle(canvas.width, canvas.height)
    );
    
    let isExploding = false;
    let isConverging = false;
    let globalOpacity = 1;
    let fadeOut = false;

    // Stage progression with smooth transitions
    const startTransition = () => {
      setStage('transitioning');
      // Start converging particles
      isConverging = true;
      particles.forEach(p => p.convergeToCenter(canvas.width / 2, canvas.height / 2));
      
      setTimeout(() => {
        setStage('welcome');
        // Particles continue normal movement after convergence
        setTimeout(() => {
          isConverging = false;
          particles.forEach(p => p.isConverging = false);
        }, 300);
        
        setTimeout(() => {
          fadeOut = true;
          setTimeout(() => {
            onComplete();
          }, 500);
        }, 800); // Show WELCOME for 0.8s
      }, 400); // Transition time
    };

    // Start transition after 1s of neural loading
    setTimeout(startTransition, 1000);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (fadeOut) {
        globalOpacity = Math.max(0, globalOpacity - 0.03);
      }

      particles.forEach(particle => {
        particle.update(isExploding, canvas.width, canvas.height, isConverging);
        particle.draw(ctx, globalOpacity);
      });

      // Draw connections when not exploding or converging
      if (!isExploding && !isConverging && stage === 'neural-loading') {
        ctx.lineWidth = 1;
        particles.forEach((p1, i) => {
          particles.slice(i + 1).forEach(p2 => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = canvas.width * 0.3;

            if (distance < maxDistance) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              
              const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
              gradient.addColorStop(0, p1.color.replace(/0\.[89]/, '0.3'));
              gradient.addColorStop(1, p2.color.replace(/0\.[89]/, '0.3'));
              
              ctx.strokeStyle = gradient;
              const opacity = (1 - distance / maxDistance) * globalOpacity;
              ctx.globalAlpha = opacity * 0.5;
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          });
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-void-black via-gray-900 to-void-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Subtle animated background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            backgroundPosition: ['0px 0px', '40px 40px'] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} 
        />
      </div>
      
      <div className="relative w-[60vw] h-[60vw] max-w-[200px] max-h-[200px] z-10">
        {/* Text animations */}
        <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-[300px]">
          <div className="relative h-12 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {stage === 'neural-loading' && (
                <motion.div
                  key="neural-loading"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.span
                    animate={{ 
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-primary-accent font-orbitron font-bold text-lg tracking-wider"
                  >
                    NEURAL LOADING
                  </motion.span>
                </motion.div>
              )}
              
              {stage === 'transitioning' && (
                <motion.div
                  key="transitioning"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-8 h-8 border-2 border-cyber-cyan border-t-transparent rounded-full animate-spin" />
                </motion.div>
              )}
              
              {stage === 'welcome' && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, x: 100, scale: 0.7 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    scale: 1,
                  }}
                  exit={{ 
                    opacity: 0,
                    scale: 0.9,
                  }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.span
                    className="text-2xl md:text-3xl font-orbitron font-bold bg-gradient-to-r from-primary-accent via-cyber-cyan to-neon-purple bg-clip-text text-transparent"
                  >
                    WELCOME
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Loading dots - only during neural-loading stage */}
          {stage === 'neural-loading' && (
            <motion.div 
              className="flex space-x-2 justify-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                    y: [0, -4, 0]
                  }}
                  transition={{ 
                    duration: 1.4, 
                    repeat: Infinity, 
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, 
                      ${i === 0 ? '#3b82f6' : i === 1 ? '#06b6d4' : '#8b5cf6'} 0%, 
                      ${i === 0 ? '#06b6d4' : i === 1 ? '#8b5cf6' : '#3b82f6'} 100%)`
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>
        
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))' }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;