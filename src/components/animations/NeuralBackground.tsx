'use client';

import React, { useEffect, useRef } from 'react';

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with pixel ratio for sharpness
    const setCanvasSize = () => {
      if (!canvas) return;
      const { innerWidth, innerHeight } = window;
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = innerWidth * pixelRatio;
      canvas.height = innerHeight * pixelRatio;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.scale(pixelRatio, pixelRatio);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Define particle count based on screen size - Reduced for better mobile performance
    const getParticleCount = () => {
      const width = window.innerWidth;
      if (width < 768) return 30;   // Mobile - Reduced for performance
      if (width < 1024) return 50;  // Tablet
      return 80;                   // Desktop - Optimized
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      baseSize: number;
      noiseOffset: { x: number, y: number };
      turbulence: number;

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        
        // More varied and subtle movement
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        
        // Add noise offset for more organic movement
        this.noiseOffset = {
          x: Math.random() * 1000,
          y: Math.random() * 1000
        };
        
        // Turbulence factor for more random movement
        this.turbulence = Math.random() * 0.2;
        
        // Base size with more variation
        this.baseSize = Math.random() * 1.5 + 1;
        
        this.size = this.baseSize;

        // Professional 3-color system for consistency
        const colors = [
          'rgba(59, 130, 246, 0.8)',   // professional-blue
          'rgba(6, 182, 212, 0.7)',    // professional-cyan  
          'rgba(139, 92, 246, 0.7)',   // professional-purple
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(canvas: HTMLCanvasElement, time: number) {
        // More organic, noise-based movement
        const noiseScaleX = 0.001;
        const noiseScaleY = 0.001;
        
        // Perlin-like noise simulation
        const noiseX = Math.sin(this.noiseOffset.x + time * noiseScaleX);
        const noiseY = Math.cos(this.noiseOffset.y + time * noiseScaleY);
        
        // Add noise-based movement
        this.x += this.vx + noiseX * this.turbulence;
        this.y += this.vy + noiseY * this.turbulence;

        // Wrap around instead of bouncing
        this.x = (this.x + canvas.width) % canvas.width;
        this.y = (this.y + canvas.height) % canvas.height;

        // Subtle size variation
        this.size = this.baseSize + Math.sin(time * 0.5) * 0.3;
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Enhanced glow effect for better visibility on dark background
        ctx.save();
        
        // Outer glow ring
        ctx.shadowBlur = 30;
        ctx.shadowColor = this.color;
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Middle glow
        ctx.shadowBlur = 20;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.2, 0, Math.PI * 2);
        ctx.fill();
        
        // Core particle - brightest
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Create particles based on screen size
    const particleCount = getParticleCount();
    const particles: Particle[] = Array.from({ length: particleCount }, () => new Particle(canvas));

    // Adaptive connection distance
    const getConnectionDistance = () => {
      return window.innerWidth < 768 ? 200 : 180;
    };

    // Animation function
    let animationFrameId: number;
    const startTime = Date.now();

    const animate = () => {
      if (!ctx || !canvas) return;

      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000; // in seconds

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update(canvas, elapsedTime);
        particle.draw(ctx);
      });

      // Get connection distance based on screen size
      const connectionDistance = getConnectionDistance();

      // Draw connections with gradient colors
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            // Create gradient between two particles
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, p1.color);
            gradient.addColorStop(1, p2.color);
            
            // Enhanced connection visibility
            const opacity = Math.max(0.3, 1 - distance / connectionDistance);
            
            // Add shadow/glow to connections
            ctx.shadowBlur = 8;
            ctx.shadowColor = p1.color;
            ctx.strokeStyle = gradient;
            
            // Dynamic line width
            ctx.lineWidth = Math.max(0.5, (1 - distance / connectionDistance) * 1.5);
            
            ctx.globalAlpha = opacity;
            ctx.stroke();
            
            // Reset shadow
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Handle window resize - recreate particles
    const handleResize = () => {
      setCanvasSize();
      
      // Recreate particles based on new screen size
      const newParticleCount = getParticleCount();
      particles.length = 0;
      for (let i = 0; i < newParticleCount; i++) {
        particles.push(new Particle(canvas));
      }
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'screen' // Makes particles pop against dark background
      }}
    />
  );
};

export default NeuralBackground;