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
  
  // Fixed number of particles that will rotate around the cursor
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i / 8) * Math.PI * 2,
    color: `hsla(var(--primary), ${0.3 + (i % 3) * 0.2})`
  }));

  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
      setMousePosition({ x: clientX, y: clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  const radius = cursorVariant === 'hover' ? 20 : 15;
  const scale = cursorVariant === 'click' ? 0.8 : 1;

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            position: 'fixed',
            left: mousePosition.x,
            top: mousePosition.y,
            width: 4,
            height: 4,
            backgroundColor: particle.color,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9996,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: Math.cos(particle.angle) * radius * scale,
            y: Math.sin(particle.angle) * radius * scale,
            scale: scale,
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </>
  );
};

export default CursorEffect;