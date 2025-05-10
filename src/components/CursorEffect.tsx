
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
  const particleCount = 15; // Increased particles for more visual effect
  
  // More refined springs for extra smooth motion
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Much smoother cursor with optimized spring physics
  const springConfig = { damping: 20, stiffness: 300 }; // Improved springiness
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  
  // Even smoother outer cursor with different spring config
  const outerX = useSpring(cursorX, { damping: 24, stiffness: 150 });
  const outerY = useSpring(cursorY, { damping: 24, stiffness: 150 });
  
  // Glow effect with very soft spring config
  const glowX = useSpring(cursorX, { damping: 30, stiffness: 100 });
  const glowY = useSpring(cursorY, { damping: 30, stiffness: 100 });

  // Update particles and cursor position when mouse moves
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
          opacity: particle.opacity - 0.02, // Slower fade for longer trails
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
        // Add new particle with improved distribution
        if (particles.length < particleCount) {
          currentParticleId++;
          const size = Math.random() * 3 + 1;
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 12; // Increased spread
          setParticles(prevParticles => [
            ...prevParticles,
            {
              x: clientX + Math.cos(angle) * distance,
              y: clientY + Math.sin(angle) * distance,
              size,
              opacity: 0.9, // Increased starting opacity
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
    
    // Start particle animation with faster updates for smoother motion
    particleInterval = setInterval(updateParticlePositions, 20); 
    
    // Add event listener with passive option for better performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mouseMoveTimeout);
      clearTimeout(mouseStoppedTimeout);
      clearInterval(particleInterval);
    };
  }, [isMobile, isActive, particles.length]);

  // Don't render cursor effect on mobile
  if (isMobile) return null;
  
  // Define cursor variants for different states with enhanced visual effects
  const dotVariants = {
    default: {
      width: 12,
      height: 12,
      borderColor: 'hsla(var(--primary), 0.8)',
      borderWidth: '2px',
      backgroundColor: 'hsla(var(--primary), 0.8)',
      opacity: 0.95,
      boxShadow: '0 0 15px hsla(var(--primary), 0.7), 0 0 25px hsla(var(--primary), 0.4)',
    },
    hover: {
      width: 22, // Larger on hover
      height: 22,
      borderColor: 'white',
      backgroundColor: 'hsla(var(--primary), 0.9)',
      opacity: 1,
      boxShadow: '0 0 25px hsla(var(--primary), 0.9), 0 0 35px hsla(var(--primary), 0.6)',
      scale: 1.2,
    },
    click: {
      width: 18,
      height: 18,
      borderColor: 'white',
      backgroundColor: 'transparent',
      border: '2.5px solid hsla(var(--primary))',
      opacity: 0.9,
      scale: 0.85,
    },
  };
  
  const outerVariants = {
    default: {
      width: 40,
      height: 40,
      borderColor: 'hsla(var(--primary), 0.4)',
      borderWidth: '1.5px',
      opacity: 0.6,
      backgroundColor: 'transparent',
    },
    hover: {
      width: 60, // Larger on hover
      height: 60,
      borderColor: 'hsla(var(--primary), 0.8)',
      borderWidth: '2px',
      opacity: 0.7,
      backgroundColor: 'hsla(var(--primary), 0.1)',
      scale: 1.15,
    },
    click: {
      width: 45,
      height: 45,
      borderColor: 'hsla(var(--primary), 0.9)',
      opacity: 0.9,
      scale: 0.8,
    },
  };
  
  const glowVariants = {
    default: {
      width: 100,
      height: 100,
      backgroundColor: 'hsla(var(--primary), 0.05)',
      opacity: 0.5,
    },
    hover: {
      width: 160, // Larger glow on hover
      height: 160,
      backgroundColor: 'hsla(var(--primary), 0.12)',
      opacity: 0.7,
      scale: 1.15,
    },
    click: {
      width: 130,
      height: 130,
      backgroundColor: 'hsla(var(--primary), 0.09)',
      opacity: 0.6,
      scale: 0.75,
    },
  };
  
  return (
    <>
      {/* Glow effect */}
      <motion.div
        className="cursor-glow fixed pointer-events-none rounded-full -translate-x-1/2 -translate-y-1/2 z-[9997]"
        style={{
          left: glowX,
          top: glowY,
          filter: 'blur(12px)',
        }}
        animate={cursorVariant}
        variants={glowVariants}
        transition={{ duration: 0.3 }}
      />
      
      {/* Outer cursor */}
      <motion.div 
        className="cursor-outer fixed pointer-events-none rounded-full -translate-x-1/2 -translate-y-1/2 z-[9998]"
        style={{
          left: outerX,
          top: outerY,
          border: '1.5px solid hsla(var(--primary), 0.6)',
          backdropFilter: 'blur(2px)',
        }}
        animate={cursorVariant}
        variants={outerVariants}
        transition={{ duration: 0.2 }}
      />
      
      {/* Main cursor dot */}
      <motion.div 
        className="cursor-dot fixed pointer-events-none rounded-full -translate-x-1/2 -translate-y-1/2 z-[9999]"
        style={{
          left: smoothX,
          top: smoothY,
          backdropFilter: 'blur(1px)',
        }}
        animate={cursorVariant}
        variants={dotVariants}
        transition={{ duration: 0.15 }}
      />
      
      {/* Enhanced particles that follow the cursor */}
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ opacity: particle.opacity, scale: 1.1 }}
            animate={{ opacity: particle.opacity, scale: 0.8 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              position: 'fixed',
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              backgroundColor: 'hsla(var(--primary), 0.9)',
              boxShadow: '0 0 8px hsla(var(--primary), 0.5)',
              zIndex: 9996,
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default CursorEffect;
