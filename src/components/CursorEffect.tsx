import React, { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { motion, useMotionValue } from 'framer-motion';

interface CursorEffectProps {
  cursorVariant: 'default' | 'hover' | 'click';
}

const CursorEffect: React.FC<CursorEffectProps> = ({ cursorVariant }) => {
  const [particles, setParticles] = useState<{
    x: number;
    y: number;
    size: number;
    opacity: number;
    id: number;
    color: string;
  }[]>([]);
  
  const [isActive, setIsActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  
  // Mouse position for tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Particle colors
  const colors = [
    "hsla(var(--primary), 0.8)",
    "hsla(var(--primary), 0.6)",
    "rgba(72, 149, 239, 0.7)",
    "rgba(20, 184, 166, 0.7)",
    "rgba(139, 92, 246, 0.7)"
  ];

  useEffect(() => {
    if (isMobile) return;
    
    let lastPositionX = 0;
    let lastPositionY = 0;
    let currentParticleId = 0;
    let animationFrameId: number;
    
    const updateParticles = () => {
      setParticles(prevParticles => 
        prevParticles
          .map(particle => ({
            ...particle,
            opacity: particle.opacity - 0.035, // Faster fade out
          }))
          .filter(particle => particle.opacity > 0)
      );
      animationFrameId = requestAnimationFrame(updateParticles);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      mouseX.set(clientX);
      mouseY.set(clientY);
      setMousePosition({ x: clientX, y: clientY });
      
      const dx = clientX - lastPositionX;
      const dy = clientY - lastPositionY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      
      if (speed > 2) {
        const particlesToAdd = Math.min(2, Math.floor(speed / 10)) || 1;
        
        for (let i = 0; i < particlesToAdd; i++) {
          currentParticleId++;
          
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 5;
          const size = Math.random() * 4 + 2;
          const colorIndex = Math.floor(Math.random() * colors.length);
          
          setParticles(prevParticles => [
            ...prevParticles,
            {
              x: clientX + Math.cos(angle) * distance,
              y: clientY + Math.sin(angle) * distance,
              size,
              opacity: 0.6,
              id: currentParticleId,
              color: colors[colorIndex]
            }
          ]);
        }
      }
      
      lastPositionX = clientX;
      lastPositionY = clientY;
      setIsActive(true);
    };
    
    // Start animation loop
    animationFrameId = requestAnimationFrame(updateParticles);
    
    // Add event listener for mouse movement
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      setParticles([]); // Clear particles on cleanup
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{ opacity: particle.opacity, scale: 1.1 }}
          animate={{ 
            opacity: particle.opacity,
            scale: 0.8
          }}
          exit={{ opacity: 0, scale: 0 }}
          style={{
            position: 'fixed',
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9996,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </>
  );
};

export default CursorEffect;