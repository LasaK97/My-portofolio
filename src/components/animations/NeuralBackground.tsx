'use client';

import React, { useEffect, useRef } from 'react';

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  // Cache for pre-rendered particle sprites
  const spritesRef = useRef<{ [key: string]: HTMLCanvasElement }>({});

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Professional 3-color system
    const colors = [
      'rgba(59, 130, 246, 0.8)',   // professional-blue
      'rgba(6, 182, 212, 0.7)',    // professional-cyan  
      'rgba(139, 92, 246, 0.7)',   // professional-purple
    ];

    // Pre-render sprites for performance
    const initSprites = () => {
      colors.forEach(color => {
        const spriteCanvas = document.createElement('canvas');
        const size = 10; // Base render size
        const padding = 20; // Glow padding
        const center = size + padding;

        spriteCanvas.width = center * 2;
        spriteCanvas.height = center * 2;

        const sCtx = spriteCanvas.getContext('2d');
        if (!sCtx) return;

        // Draw the complex glow effect once per color
        sCtx.save();

        // Outer glow
        sCtx.shadowBlur = 15;
        sCtx.shadowColor = color;
        sCtx.globalAlpha = 0.4; // Increased visibility
        sCtx.fillStyle = color;
        sCtx.beginPath();
        sCtx.arc(center, center, size * 2, 0, Math.PI * 2);
        sCtx.fill();

        // Middle glow
        sCtx.shadowBlur = 10;
        sCtx.globalAlpha = 0.7; // Increased visibility
        sCtx.beginPath();
        sCtx.arc(center, center, size * 1.2, 0, Math.PI * 2);
        sCtx.fill();

        // Core
        sCtx.shadowBlur = 5;
        sCtx.globalAlpha = 1;
        sCtx.beginPath();
        sCtx.arc(center, center, size, 0, Math.PI * 2);
        sCtx.fill();

        sCtx.restore();

        spritesRef.current[color] = spriteCanvas;
      });
    };

    initSprites();

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

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const getParticleCount = () => {
      const width = window.innerWidth;
      if (width < 768) return 40;  // Increased for mobile
      if (width < 1024) return 70; // Increased for tablet
      return 100;                  // Increased for desktop (More Networks)
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

      // Physics
      pushX: number;
      pushY: number;
      friction: number;

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        // Moderate speed for drifting
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;

        this.noiseOffset = {
          x: Math.random() * 1000,
          y: Math.random() * 1000
        };

        this.turbulence = Math.random() * 0.5;
        this.baseSize = Math.random() * 1.5 + 1;
        this.size = this.baseSize;

        this.pushX = 0;
        this.pushY = 0;
        this.friction = 0.95; // Standard friction

        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(canvas: HTMLCanvasElement, time: number) {
        // Noise movement
        const noiseScale = 0.001;
        const noiseX = Math.sin(this.noiseOffset.x + time * noiseScale);
        const noiseY = Math.cos(this.noiseOffset.y + time * noiseScale);

        // Mouse Repulsion
        if (mouseRef.current) {
          const dx = this.x - mouseRef.current.x;
          const dy = this.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceRadius = 250; // Interaction radius

          if (distance < forceRadius) {
            const force = (forceRadius - distance) / forceRadius;
            const angle = Math.atan2(dy, dx);
            const pushStrength = 4; // Strong push

            this.pushX += Math.cos(angle) * force * pushStrength;
            this.pushY += Math.sin(angle) * force * pushStrength;
          }
        }

        // Apply friction
        this.pushX *= this.friction;
        this.pushY *= this.friction;

        // Update position
        this.x += this.vx + (noiseX * this.turbulence) + this.pushX;
        this.y += this.vy + (noiseY * this.turbulence) + this.pushY;

        // Wrap around screen (Free floating)
        this.x = (this.x + canvas.width) % canvas.width;
        this.y = (this.y + canvas.height) % canvas.height;

        // Pulse size
        this.size = this.baseSize + Math.sin(time * 2) * 0.5;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const sprite = spritesRef.current[this.color];
        if (!sprite) return;

        // Draw using pre-rendered sprite
        const scale = this.size / 10;
        const size = sprite.width * scale;
        const offset = size / 2;

        ctx.drawImage(sprite, this.x - offset, this.y - offset, size, size);
      }
    }

    let particles: Particle[] = [];

    const initParticles = () => {
      const count = getParticleCount();
      particles = Array.from({ length: count }, () => new Particle(canvas));
    };

    initParticles();

    const getConnectionDistance = () => {
      // Increased connection distance for more networks
      return window.innerWidth < 768 ? 180 : 250;
    };

    let animationFrameId: number;
    const startTime = Date.now();

    const animate = () => {
      if (!ctx || !canvas) return;

      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update(canvas, elapsedTime);
        particle.draw(ctx);
      });

      const connectionDistance = getConnectionDistance();

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const connDistSq = connectionDistance * connectionDistance;

          if (distSq < connDistSq) {
            const distance = Math.sqrt(distSq);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, p1.color);
            gradient.addColorStop(1, p2.color);

            // Increased visibility opacity
            const opacity = Math.max(0.1, (1 - distance / connectionDistance) * 0.8);

            ctx.strokeStyle = gradient;
            // Increased line width
            ctx.lineWidth = Math.max(0.5, (1 - distance / connectionDistance) * 2.5);
            ctx.globalAlpha = opacity;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      setCanvasSize();
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
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
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default NeuralBackground;