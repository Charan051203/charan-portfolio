
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
  const particleCount = 12; // Increased particles
  
  // More refined springs for smoother motion
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smoother cursor with spring physics
  const springConfig = { damping: 22, stiffness: 320 }; // Improved springiness
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  
  // Even smoother outer cursor
  const outerX = useSpring(cursorX, { damping: 28, stiffness: 180 });
  const outerY = useSpring(cursorY, { damping: 28, stiffness: 180 });
  
  // Glow effect with different spring config
  const glowX = useSpring(cursorX, { damping: 35, stiffness: 120 });
  const glowY = useSpring(cursorY, { damping: 35, stiffness: 120 });

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
        // Add new particle
        if (particles.length < particleCount) {
          currentParticleId++;
          const size = Math.random() * 3 + 1;
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 10;
          setParticles(prevParticles => [
            ...prevParticles,
            {
              x: clientX + Math.cos(angle) * distance,
              y: clientY + Math.sin(angle) * distance,
              size,
              opacity: 0.8, // Increased starting opacity
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
    particleInterval = setInterval(updateParticlePositions, 25); // Faster particle updates
    
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
  
  // Define cursor variants for different states with enhanced visual effects
  const dotVariants = {
    default: {
      width: 12,
      height: 12,
      borderColor: 'hsla(var(--primary), 0.8)',
      borderWidth: '1.5px',
      backgroundColor: 'hsla(var(--primary), 0.7)',
      opacity: 0.9,
      boxShadow: '0 0 12px hsla(var(--primary), 0.6), 0 0 20px hsla(var(--primary), 0.3)',
    },
    hover: {
      width: 20, // Larger on hover
      height: 20,
      borderColor: 'white',
      backgroundColor: 'hsla(var(--primary), 0.9)',
      opacity: 1,
      boxShadow: '0 0 20px hsla(var(--primary), 0.8), 0 0 30px hsla(var(--primary), 0.5)',
      scale: 1.1,
    },
    click: {
      width: 16,
      height: 16,
      borderColor: 'white',
      backgroundColor: 'transparent',
      border: '2px solid hsla(var(--primary))',
      opacity: 0.8,
      scale: 0.9,
    },
  };
  
  const outerVariants = {
    default: {
      width: 36,
      height: 36,
      borderColor: 'hsla(var(--primary), 0.3)',
      borderWidth: '1px',
      opacity: 0.5,
      backgroundColor: 'transparent',
    },
    hover: {
      width: 56, // Larger on hover
      height: 56,
      borderColor: 'hsla(var(--primary), 0.7)',
      borderWidth: '2px',
      opacity: 0.6,
      backgroundColor: 'hsla(var(--primary), 0.05)',
      scale: 1.1,
    },
    click: {
      width: 40,
      height: 40,
      borderColor: 'hsla(var(--primary), 0.9)',
      opacity: 0.9,
      scale: 0.85,
    },
  };
  
  const glowVariants = {
    default: {
      width: 90,
      height: 90,
      backgroundColor: 'hsla(var(--primary), 0.04)',
      opacity: 0.4,
    },
    hover: {
      width: 150, // Larger glow on hover
      height: 150,
      backgroundColor: 'hsla(var(--primary), 0.09)',
      opacity: 0.6,
      scale: 1.1,
    },
    click: {
      width: 120,
      height: 120,
      backgroundColor: 'hsla(var(--primary), 0.07)',
      opacity: 0.5,
      scale: 0.8,
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
          border: '1px solid hsla(var(--primary), 0.5)',
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
            initial={{ opacity: particle.opacity, scale: 1 }}
            animate={{ opacity: particle.opacity, scale: 0.7 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              position: 'fixed',
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              backgroundColor: 'hsla(var(--primary))',
              boxShadow: '0 0 6px hsla(var(--primary), 0.4)',
              zIndex: 9998,
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
