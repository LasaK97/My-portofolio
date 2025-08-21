// src/components/animations/LoadingAnimation.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const LoadingAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(0);

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

      constructor(width: number, height: number) {
        this.x = width / 2 + (Math.random() - 0.5) * width * 0.5;
        this.y = height / 2 + (Math.random() - 0.5) * height * 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.5 + 0.2;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.size = Math.random() * 2 + 1;
        
        // Professional 3-color system for consistency
        const colors = [
          'rgba(59, 130, 246, 0.8)',   // professional-blue
          'rgba(6, 182, 212, 0.7)',    // professional-cyan  
          'rgba(139, 92, 246, 0.7)',   // professional-purple
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(isExploding: boolean, width: number, height: number) {
        if (isExploding) {
          const dx = this.x - width / 2;
          const dy = this.y - height / 2;
          const angle = Math.atan2(dy, dx);
          
          this.explosionSpeed += 0.2;
          this.x += Math.cos(angle) * this.explosionSpeed;
          this.y += Math.sin(angle) * this.explosionSpeed;
        } else {
          this.x += this.vx;
          this.y += this.vy;

          const padding = 10;
          if (this.x < padding || this.x > width - padding) this.vx *= -1;
          if (this.y < padding || this.y > height - padding) this.vy *= -1;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Enhanced glow effect for cyberpunk loading
        ctx.save();
        
        // Outer glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.8, 0, Math.PI * 2);
        ctx.fill();
        
        // Core particle
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    const particles: Particle[] = Array.from(
      { length: 25 }, 
      () => new Particle(canvas.width, canvas.height)
    );
    
    let isExploding = false;
    let explosionProgress = 0;

    const startExplosion = () => {
      isExploding = true;
      setTimeout(() => {
        onComplete();
      }, 1000);
    };

    setTimeout(startExplosion, 2000);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update(isExploding, canvas.width, canvas.height);
        particle.draw(ctx);
      });

      if (!isExploding) {
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
              gradient.addColorStop(0, p1.color.replace(/0\.[789]/, '0.4'));
              gradient.addColorStop(1, p2.color.replace(/0\.[789]/, '0.4'));
              
              // Add glow to connections
              ctx.shadowBlur = 5;
              ctx.shadowColor = p1.color;
              ctx.strokeStyle = gradient;
              
              ctx.stroke();
            }
          });
        });
      }

      if (isExploding) {
        explosionProgress += 0.02;
        ctx.globalAlpha = Math.max(1 - explosionProgress, 0); 
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void-black">
      {/* Neural grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 107, 53, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 107, 53, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 2, opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="relative w-[60vw] h-[60vw] max-w-[200px] max-h-[200px] z-10"
      >
        {/* Loading text */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-neon-orange font-orbitron font-bold text-lg mb-2"
          >
            NEURAL LOADING
          </motion.div>
          <div className="flex space-x-1 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 bg-cyber-cyan rounded-full"
              />
            ))}
          </div>
        </div>
        
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 0 20px rgba(255, 107, 53, 0.3))' }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;