import React, { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { motion, useMotionValue } from 'framer-motion';

interface CursorEffectProps {
  cursorVariant: 'default' | 'hover' | 'click';
}

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  id: number;
  color: string;
  velocityX: number;
  velocityY: number;
}

const CursorEffect: React.FC<CursorEffectProps> = ({ cursorVariant }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
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
            x: particle.x + particle.velocityX,
            y: particle.y + particle.velocityY,
            velocityX: particle.velocityX * 0.98, // Gradually slow down
            velocityY: particle.velocityY * 0.98,
            opacity: particle.opacity - 0.04 // Faster fade out
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
      
      if (speed > 1) {
        // Create new particles based on cursor movement
        const angle = Math.atan2(dy, dx);
        const particlesToAdd = Math.min(2, Math.floor(speed / 8)) || 1;
        
        for (let i = 0; i < particlesToAdd; i++) {
          currentParticleId++;
          
          const randomAngleOffset = (Math.random() - 0.5) * Math.PI / 2;
          const finalAngle = angle + randomAngleOffset;
          const velocity = speed * 0.15;
          
          setParticles(prevParticles => [
            ...prevParticles,
            {
              x: clientX,
              y: clientY,
              size: Math.random() * 3 + 2,
              opacity: 0.8,
              id: currentParticleId,
              color: colors[Math.floor(Math.random() * colors.length)],
              velocityX: Math.cos(finalAngle) * velocity,
              velocityY: Math.sin(finalAngle) * velocity
            }
          ]);
        }
      }
      
      lastPositionX = clientX;
      lastPositionY = clientY;
      setIsActive(true);
    };
    
    animationFrameId = requestAnimationFrame(updateParticles);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      setParticles([]);
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