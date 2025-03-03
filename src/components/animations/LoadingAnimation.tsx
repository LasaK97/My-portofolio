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
        
        const colors = ['rgba(6, 182, 212, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(168, 85, 247, 0.8)'];
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
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
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
              gradient.addColorStop(0, p1.color.replace('0.8', '0.3'));
              gradient.addColorStop(1, p2.color.replace('0.8', '0.3'));
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 2, opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="relative w-[60vw] h-[60vw] max-w-[200px] max-h-[200px]"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;