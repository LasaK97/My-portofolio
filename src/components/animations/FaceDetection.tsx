// src/components/animations/FaceDetection.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

interface FaceDetectionProps {
  isActive: boolean;
}

export const FaceDetection: React.FC<FaceDetectionProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    let animationFrame: number;
    let startTime = Date.now();

    // Box Configuration
    const boxConfig = {
      x: canvas.width * 0.17,
      y: canvas.height * 0.10,
      width: canvas.width * 0.60,
      height: canvas.height * 0.75
    };
    interface BoxConfig {
      x: number;
      y: number;
      width: number;
      height: number;
    }
    
    // Keypoint Configuration
    const keypoints = [
      // Eyes
      { x: boxConfig.x + boxConfig.width * 0.30, y: boxConfig.y + boxConfig.height * 0.37 },
      { x: boxConfig.x + boxConfig.width * 0.65, y: boxConfig.y + boxConfig.height * 0.37 },
      
      // Eye corners
      { x: boxConfig.x + boxConfig.width * 0.25, y: boxConfig.y + boxConfig.height * 0.37 },
      { x: boxConfig.x + boxConfig.width * 0.35, y: boxConfig.y + boxConfig.height * 0.37 },
      { x: boxConfig.x + boxConfig.width * 0.69, y: boxConfig.y + boxConfig.height * 0.37 },
      { x: boxConfig.x + boxConfig.width * 0.73, y: boxConfig.y + boxConfig.height * 0.37 },
      
      // Eyebrows
      { x: boxConfig.x + boxConfig.width * 0.21, y: boxConfig.y + boxConfig.height * 0.26 },  // Left outer
      { x: boxConfig.x + boxConfig.width * 0.27, y: boxConfig.y + boxConfig.height * 0.26 },  // Left middle-outer
      { x: boxConfig.x + boxConfig.width * 0.33, y: boxConfig.y + boxConfig.height * 0.27 },  // Left middle
      { x: boxConfig.x + boxConfig.width * 0.39, y: boxConfig.y + boxConfig.height * 0.28 },  // Left inner
      { x: boxConfig.x + boxConfig.width * 0.59, y: boxConfig.y + boxConfig.height * 0.28 },  // Right inner
      { x: boxConfig.x + boxConfig.width * 0.63, y: boxConfig.y + boxConfig.height * 0.27 },  // Right middle
      { x: boxConfig.x + boxConfig.width * 0.67, y: boxConfig.y + boxConfig.height * 0.26 },  // Right middle-outer
      { x: boxConfig.x + boxConfig.width * 0.73, y: boxConfig.y + boxConfig.height * 0.25 },  // Right outer
      { x: boxConfig.x + boxConfig.width * 0.78, y: boxConfig.y + boxConfig.height * 0.28 },
      { x: boxConfig.x + boxConfig.width * 0.81, y: boxConfig.y + boxConfig.height * 0.30 },
      
      // Nose
      { x: boxConfig.x + boxConfig.width * 0.5, y: boxConfig.y + boxConfig.height * 0.52 },
      { x: boxConfig.x + boxConfig.width * 0.43, y: boxConfig.y + boxConfig.height * 0.48 },
      { x: boxConfig.x + boxConfig.width * 0.55, y: boxConfig.y + boxConfig.height * 0.49 },
      
      // Mouth
      { x: boxConfig.x + boxConfig.width * 0.35, y: boxConfig.y + boxConfig.height * 0.63 },
      { x: boxConfig.x + boxConfig.width * 0.65, y: boxConfig.y + boxConfig.height * 0.63 },
      { x: boxConfig.x + boxConfig.width * 0.5, y: boxConfig.y + boxConfig.height * 0.68 },
      { x: boxConfig.x + boxConfig.width * 0.5, y: boxConfig.y + boxConfig.height * 0.60 },
      
      // Jaw/Beard outline - more points added while keeping the same bottom curve
      { x: boxConfig.x + boxConfig.width * 0.15, y: boxConfig.y + boxConfig.height * 0.85 },   // Far Left start
      { x: boxConfig.x + boxConfig.width * 0.20, y: boxConfig.y + boxConfig.height * 0.87 },  // Left upper
      { x: boxConfig.x + boxConfig.width * 0.3, y: boxConfig.y + boxConfig.height * 0.94 },   // Left
      { x: boxConfig.x + boxConfig.width * 0.35, y: boxConfig.y + boxConfig.height * 0.96 },  // Left-middle upper
      { x: boxConfig.x + boxConfig.width * 0.4, y: boxConfig.y + boxConfig.height * 0.98 },   // Left-middle
      { x: boxConfig.x + boxConfig.width * 0.45, y: boxConfig.y + boxConfig.height * 0.985 }, // Left-center
      { x: boxConfig.x + boxConfig.width * 0.5, y: boxConfig.y + boxConfig.height * 0.995 },   // Center
      { x: boxConfig.x + boxConfig.width * 0.55, y: boxConfig.y + boxConfig.height * 0.985 }, // Right-center
      { x: boxConfig.x + boxConfig.width * 0.6, y: boxConfig.y + boxConfig.height * 0.98 },   // Right-middle
      { x: boxConfig.x + boxConfig.width * 0.65, y: boxConfig.y + boxConfig.height * 0.96 },  // Right-middle upper
      { x: boxConfig.x + boxConfig.width * 0.7, y: boxConfig.y + boxConfig.height * 0.94 },   // Right
      { x: boxConfig.x + boxConfig.width * 0.81, y: boxConfig.y + boxConfig.height * 0.87 },  // Right upper
      { x: boxConfig.x + boxConfig.width * 0.85, y: boxConfig.y + boxConfig.height * 0.85 },   // Far Right end

      // Face contour points - more points and adjusted positions
      { x: boxConfig.x + boxConfig.width * 0.08, y: boxConfig.y + boxConfig.height * 0.45 },   // Left top
      { x: boxConfig.x + boxConfig.width * 0.085, y: boxConfig.y + boxConfig.height * 0.55 },  // Left upper-middle
      { x: boxConfig.x + boxConfig.width * 0.09, y: boxConfig.y + boxConfig.height * 0.65 },   // Left lower-middle
      { x: boxConfig.x + boxConfig.width * 0.11, y: boxConfig.y + boxConfig.height * 0.75 },  // Left bottom

      { x: boxConfig.x + boxConfig.width * 0.98, y: boxConfig.y + boxConfig.height * 0.45 },   // Right top
      { x: boxConfig.x + boxConfig.width * 0.99, y: boxConfig.y + boxConfig.height * 0.55 },  // Right upper-middle
      { x: boxConfig.x + boxConfig.width * 0.95, y: boxConfig.y + boxConfig.height * 0.65 },   // Right lower-middle
      { x: boxConfig.x + boxConfig.width * 0.92, y: boxConfig.y + boxConfig.height * 0.75 },  // Right bottom
    ];

    function drawCorners(scale = 1, zoomLevel = 1) {
      const cornerLength = Math.min(boxConfig.width, boxConfig.height) * 0.25;
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 3;

      const adjustedBox = {
        x: boxConfig.x + (boxConfig.width * (1 - zoomLevel)) / 2,
        y: boxConfig.y + (boxConfig.height * (1 - zoomLevel)) / 2,
        width: boxConfig.width * zoomLevel,
        height: boxConfig.height * zoomLevel
      };

      // Add glow effect
      ctx.shadowColor = 'rgba(0, 255, 255, 0.5)';
      ctx.shadowBlur = 5;

      // Draw corners
      // Top-left
      ctx.beginPath();
      ctx.moveTo(adjustedBox.x, adjustedBox.y + (cornerLength * scale));
      ctx.lineTo(adjustedBox.x, adjustedBox.y);
      ctx.lineTo(adjustedBox.x + (cornerLength * scale), adjustedBox.y);
      ctx.stroke();

      // Top-right
      ctx.beginPath();
      ctx.moveTo(adjustedBox.x + adjustedBox.width - (cornerLength * scale), adjustedBox.y);
      ctx.lineTo(adjustedBox.x + adjustedBox.width, adjustedBox.y);
      ctx.lineTo(adjustedBox.x + adjustedBox.width, adjustedBox.y + (cornerLength * scale));
      ctx.stroke();

      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(adjustedBox.x, adjustedBox.y + adjustedBox.height - (cornerLength * scale));
      ctx.lineTo(adjustedBox.x, adjustedBox.y + adjustedBox.height);
      ctx.lineTo(adjustedBox.x + (cornerLength * scale), adjustedBox.y + adjustedBox.height);
      ctx.stroke();

      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(adjustedBox.x + adjustedBox.width - (cornerLength * scale), adjustedBox.y + adjustedBox.height);
      ctx.lineTo(adjustedBox.x + adjustedBox.width, adjustedBox.y + adjustedBox.height);
      ctx.lineTo(adjustedBox.x + adjustedBox.width, adjustedBox.y + adjustedBox.height - (cornerLength * scale));
      ctx.stroke();

      // Reset shadow
      ctx.shadowBlur = 0;

      return adjustedBox;
    }

    function drawScanLine(progress: number, adjustedBox: BoxConfig) {
      const scanY = adjustedBox.y + (adjustedBox.height * progress);
      const gradient = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
      gradient.addColorStop(0, 'rgba(0, 255, 255, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(adjustedBox.x, scanY - 20, adjustedBox.width, 40);
    }

    function drawKeypoints(progress: number, adjustedBox: BoxConfig) {
      // Adjust keypoint positions based on zoom level
      const adjustedKeypoints = keypoints.map(point => ({
        x: adjustedBox.x + (point.x - boxConfig.x) * (adjustedBox.width / boxConfig.width),
        y: adjustedBox.y + (point.y - boxConfig.y) * (adjustedBox.height / boxConfig.height)
      }));

      const visiblePoints = Math.floor(adjustedKeypoints.length * progress);
      
      // Draw connections
      ctx.lineWidth = 0.8;
      for (let i = 0; i < visiblePoints; i++) {
        const point = adjustedKeypoints[i];
        for (let j = i + 1; j < visiblePoints; j++) {
          const nextPoint = adjustedKeypoints[j];
          const distance = Math.hypot(point.x - nextPoint.x, point.y - nextPoint.y);
          
          if (distance < adjustedBox.width * 0.3) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(nextPoint.x, nextPoint.y);
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.2 - (distance / (adjustedBox.width * 0.3)) * 0.2})`;
            ctx.stroke();
          }
        }
      }

      // Draw points with glow
      ctx.shadowColor = 'rgba(0, 255, 255, 0.5)';
      ctx.shadowBlur = 3;
      for (let i = 0; i < visiblePoints; i++) {
        const point = adjustedKeypoints[i];
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#00ffff';
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    function drawVerification(progress: number) {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 40;

      // Draw circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2 * progress);
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Fill with glow
      ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.shadowColor = 'rgba(0, 255, 255, 0.5)';
      ctx.shadowBlur = 10;
      ctx.fill();

      // Draw checkmark
      if (progress > 0.5) {
        const checkProgress = (progress - 0.5) * 2;
        ctx.beginPath();
        ctx.moveTo(centerX - radius/2, centerY);
        
        if (checkProgress > 0.5) {
          ctx.lineTo(centerX - radius/6, centerY + radius/2);
          if (checkProgress > 0.75) {
            ctx.lineTo(centerX + radius/2, centerY - radius/2);
          }
        }
        
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 4;
        ctx.stroke();
      }
      
      ctx.shadowBlur = 0;
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000;
      const phaseProgress = (elapsed % 3) / 3;
    
      let currentZoom;
      
      if (phase === 0) {
        // Initial zoom animation
        currentZoom = 1 + Math.sin(elapsed * 2) * 0.2;
        if (phaseProgress > 0.65) {
          const transitionProgress = (phaseProgress - 0.65) / 0.35;
          currentZoom = currentZoom * (1 - transitionProgress) + 0.8 * transitionProgress;
        }
      } else {
        // Fixed zoom for all other phases
        currentZoom = 0.8;
      }
    
      const adjustedBox = drawCorners(1, currentZoom);
    
      switch(phase) {
        case 1:
          drawScanLine(phaseProgress, adjustedBox);
          break;
        case 2:
          drawKeypoints(phaseProgress, adjustedBox);
          break;
        case 3:
          drawVerification(phaseProgress);
          break;
      }
    
      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    const phaseInterval = setInterval(() => {
      setPhase((prev) => (prev + 1) % 4);
      startTime = Date.now();
    }, 3000);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearInterval(phaseInterval);
    };
  }, [isActive, phase]);

  return (
    <canvas
      ref={canvasRef}
      width={288}
      height={288}
      className="absolute inset-0 w-full h-full z-10"
    />
  );
};