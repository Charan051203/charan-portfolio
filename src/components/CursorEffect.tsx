import React, { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { motion, useMotionValue } from 'framer-motion';

interface CursorEffectProps {
  cursorVariant: 'default' | 'hover' | 'click';
}

const CursorEffect: React.FC<CursorEffectProps> = ({ cursorVariant }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create particles with different sizes and colors
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i / 12) * Math.PI * 2,
    size: 4 + (i % 3) * 2, // Varying sizes
    color: `hsla(var(--primary), ${0.4 + (i % 3) * 0.2})`,
    speed: 1 + (i % 3) * 0.5 // Varying speeds
  }));

  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  if (isMobile) return null;

  // Adjust radius and scale based on cursor state
  const baseRadius = cursorVariant === 'hover' ? 25 : 20;
  const scale = cursorVariant === 'click' ? 0.7 : 1;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: mousePosition.x,
          top: mousePosition.y,
          width: 8,
          height: 8,
          backgroundColor: 'hsl(var(--primary))',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: scale,
          opacity: 1
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25
        }}
      />

      {/* Outer glow */}
      <motion.div
        style={{
          position: 'fixed',
          left: mousePosition.x,
          top: mousePosition.y,
          width: 24,
          height: 24,
          backgroundColor: 'transparent',
          border: '2px solid hsl(var(--primary))',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: scale * 1.2,
          opacity: 0.5
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20
        }}
      />

      {/* Rotating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            position: 'fixed',
            left: mousePosition.x,
            top: mousePosition.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9997,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: Math.cos(particle.angle) * baseRadius * scale,
            y: Math.sin(particle.angle) * baseRadius * scale,
            scale: scale,
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2 / particle.speed,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </>
  );
};

export default CursorEffect;