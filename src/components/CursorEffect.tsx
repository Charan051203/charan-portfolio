
import React, { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

type CursorVariant = 'default' | 'hover' | 'click';

interface CursorEffectProps {
  cursorVariant: CursorVariant;
}

const CursorEffect: React.FC<CursorEffectProps> = ({ cursorVariant }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; opacity: number; id: number }[]>([]);
  const [isActive, setIsActive] = useState(false);
  const isMobile = useIsMobile();
  const particleCount = 10;
  
  // More refined springs for smoother motion
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smoother cursor with spring physics
  const springConfig = { damping: 25, stiffness: 300 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  
  // Even smoother outer cursor
  const outerX = useSpring(cursorX, { damping: 30, stiffness: 200 });
  const outerY = useSpring(cursorY, { damping: 30, stiffness: 200 });
  
  // Glow effect with different spring config
  const glowX = useSpring(cursorX, { damping: 40, stiffness: 150 });
  const glowY = useSpring(cursorY, { damping: 40, stiffness: 150 });

  // Update particles when mouse moves
  useEffect(() => {
    if (isMobile) return;
    
    let mouseMoveTimeout: NodeJS.Timeout;
    let mouseStoppedTimeout: NodeJS.Timeout;
    let particleInterval: NodeJS.Timeout;
    let currentParticleId = 0;
    
    const updateParticlePositions = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          opacity: particle.opacity - 0.025,
        })).filter(particle => particle.opacity > 0)
      );
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Update cursor position with motion values for smoother animation
      cursorX.set(clientX);
      cursorY.set(clientY);
      
      // Store the position for particle creation
      setMousePosition({ x: clientX, y: clientY });
      
      // Clear existing timeouts
      clearTimeout(mouseMoveTimeout);
      clearTimeout(mouseStoppedTimeout);
      
      // Set active state for particles
      setIsActive(true);
      
      // Create a new particle at intervals only when moving
      if (isActive) {
        const now = Date.now();
        
        // Add new particle
        if (particles.length < particleCount) {
          currentParticleId++;
          const size = Math.random() * 3 + 1;
          setParticles(prevParticles => [
            ...prevParticles,
            {
              x: clientX + (Math.random() * 10 - 5),
              y: clientY + (Math.random() * 10 - 5),
              size,
              opacity: 0.7,
              id: currentParticleId
            }
          ]);
        }
      }
      
      // Set timeout to determine when mouse has stopped
      mouseStoppedTimeout = setTimeout(() => {
        setIsActive(false);
      }, 100);
    };
    
    // Start particle animation
    particleInterval = setInterval(updateParticlePositions, 30);
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mouseMoveTimeout);
      clearTimeout(mouseStoppedTimeout);
      clearInterval(particleInterval);
    };
  }, [isMobile, isActive, particles.length]);

  // Don't render cursor effect on mobile
  if (isMobile) return null;
  
  // Define cursor variants for different states
  const dotVariants = {
    default: {
      width: 12,
      height: 12,
      borderColor: 'rgba(255, 255, 255, 0.8)',
      borderWidth: '1px',
      backgroundColor: 'hsla(var(--primary))',
      opacity: 0.8,
      boxShadow: '0 0 10px hsla(var(--primary), 0.6), 0 0 20px hsla(var(--primary), 0.3)',
    },
    hover: {
      width: 18,
      height: 18,
      borderColor: 'rgba(255, 255, 255, 0.8)',
      backgroundColor: 'hsla(var(--primary), 0.8)',
      opacity: 1,
      boxShadow: '0 0 15px hsla(var(--primary), 0.8), 0 0 30px hsla(var(--primary), 0.4)',
    },
    click: {
      width: 14,
      height: 14,
      borderColor: 'white',
      backgroundColor: 'transparent',
      border: '2px solid hsla(var(--primary))',
      opacity: 0.6,
    },
  };
  
  const outerVariants = {
    default: {
      width: 32,
      height: 32,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: '1px',
      opacity: 0.4,
      backgroundColor: 'transparent',
    },
    hover: {
      width: 48,
      height: 48,
      borderColor: 'hsla(var(--primary), 0.5)',
      borderWidth: '1px',
      opacity: 0.5,
      backgroundColor: 'transparent',
    },
    click: {
      width: 36,
      height: 36,
      borderColor: 'hsla(var(--primary), 0.8)',
      opacity: 0.8,
      scale: 0.9,
    },
  };
  
  const glowVariants = {
    default: {
      width: 80,
      height: 80,
      backgroundColor: 'hsla(var(--primary), 0.03)',
      opacity: 0.3,
    },
    hover: {
      width: 120,
      height: 120,
      backgroundColor: 'hsla(var(--primary), 0.07)',
      opacity: 0.4,
    },
    click: {
      width: 100,
      height: 100,
      backgroundColor: 'hsla(var(--primary), 0.05)',
      opacity: 0.3,
      scale: 0.9,
    },
  };
  
  return (
    <>
      {/* Glow effect */}
      <motion.div
        className="cursor-glow"
        style={{
          left: glowX,
          top: glowY,
        }}
        animate={cursorVariant}
        variants={glowVariants}
        transition={{ duration: 0.2 }}
      />
      
      {/* Outer cursor */}
      <motion.div 
        className="cursor-outer"
        style={{
          left: outerX,
          top: outerY,
          border: '1px solid hsla(var(--primary), 0.3)',
        }}
        animate={cursorVariant}
        variants={outerVariants}
        transition={{ duration: 0.1 }}
      />
      
      {/* Main cursor dot */}
      <motion.div 
        className="cursor-dot"
        style={{
          left: smoothX,
          top: smoothY,
        }}
        animate={cursorVariant}
        variants={dotVariants}
        transition={{ duration: 0.1 }}
      />
      
      {/* Particles that follow the cursor */}
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ opacity: particle.opacity, scale: 1 }}
            animate={{ opacity: particle.opacity, scale: 0.8 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              position: 'fixed',
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              backgroundColor: 'hsla(var(--primary))',
              boxShadow: '0 0 5px hsla(var(--primary), 0.3)',
              zIndex: 9998,
              pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default CursorEffect;
