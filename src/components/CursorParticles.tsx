import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useIsMobile } from '../hooks/use-mobile';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
}

const CursorParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const maxParticles = 20;

  useEffect(() => {
    if (isMobile) return;

    let animationFrameId: number;
    let lastMousePosition = { x: 0, y: 0 };
    let isMoving = false;
    let moveTimeout: NodeJS.Timeout;

    const createParticle = (x: number, y: number) => {
      const size = Math.random() * 4 + 2;
      const hue = Math.random() * 60 + 190; // Blue to cyan range
      return {
        id: Math.random(),
        x,
        y,
        size,
        color: `hsla(${hue}, 80%, 60%, 0.8)`,
        opacity: 1
      };
    };

    const updateParticles = () => {
      setParticles(prevParticles => {
        // Remove particles that have faded out
        const filteredParticles = prevParticles.filter(p => p.opacity > 0);
        
        // Add new particles if mouse is moving
        const newParticles = isMoving 
          ? [...filteredParticles, createParticle(mousePosition.x, mousePosition.y)]
          : filteredParticles;

        // Update opacity for fade-out effect
        return newParticles.map(particle => ({
          ...particle,
          opacity: particle.opacity - 0.02
        })).slice(-maxParticles);
      });

      animationFrameId = requestAnimationFrame(updateParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Check if mouse has moved significantly
      const distance = Math.hypot(clientX - lastMousePosition.x, clientY - lastMousePosition.y);
      if (distance > 2) {
        isMoving = true;
        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(() => {
          isMoving = false;
        }, 50);

        setMousePosition({ x: clientX, y: clientY });
        lastMousePosition = { x: clientX, y: clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(updateParticles);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(moveTimeout);
    };
  }, [isMobile, mousePosition]);

  if (isMobile) return null;

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            position: 'fixed',
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9999,
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 1 }}
          animate={{ 
            scale: [1, 0.8, 1],
            opacity: [particle.opacity, 0]
          }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
        />
      ))}
    </>
  );
};

export default CursorParticles;