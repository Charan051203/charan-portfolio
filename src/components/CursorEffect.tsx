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
    angle: number;
    velocity: number;
  }[]>([]);
  
  const [isActive, setIsActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  
  // Mouse position for tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Particle colors with more vibrant options
  const colors = [
    "hsla(var(--primary), 0.8)",
    "hsla(var(--primary), 0.7)",
    "rgba(72, 149, 239, 0.8)",
    "rgba(20, 184, 166, 0.8)",
    "rgba(139, 92, 246, 0.8)",
    "rgba(99, 102, 241, 0.8)",
    "rgba(236, 72, 153, 0.8)"
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
          .map(particle => {
            // Move particles along their trajectory
            const newX = particle.x + Math.cos(particle.angle) * particle.velocity;
            const newY = particle.y + Math.sin(particle.angle) * particle.velocity;
            
            return {
              ...particle,
              x: newX,
              y: newY,
              opacity: particle.opacity - 0.025, // Slightly slower fade for better trail
              velocity: particle.velocity * 0.98 // Gradually slow down
            };
          })
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
      const moveAngle = Math.atan2(dy, dx);
      
      // Create more particles when moving faster
      if (speed > 1) {
        const particlesToAdd = Math.min(5, Math.floor(speed / 3)) || 1;
        
        for (let i = 0; i < particlesToAdd; i++) {
          currentParticleId++;
          
          // Create particles in a cone behind the cursor movement
          const spreadAngle = moveAngle + (Math.random() - 0.5) * Math.PI / 2;
          const distance = Math.random() * 10;
          const size = Math.random() * 6 + 3;
          const colorIndex = Math.floor(Math.random() * colors.length);
          
          setParticles(prevParticles => [
            ...prevParticles,
            {
              x: clientX + Math.cos(spreadAngle) * distance,
              y: clientY + Math.sin(spreadAngle) * distance,
              size,
              opacity: 0.8,
              id: currentParticleId,
              color: colors[colorIndex],
              angle: spreadAngle + Math.PI, // Particles move in opposite direction
              velocity: speed * 0.2 * (Math.random() * 0.5 + 0.5) // Varied speeds
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
          initial={{ opacity: particle.opacity, scale: 1.2 }}
          animate={{ 
            opacity: particle.opacity,
            scale: 0.8,
            x: particle.x,
            y: particle.y
          }}
          exit={{ opacity: 0, scale: 0 }}
          style={{
            position: 'fixed',
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9996,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
        />
      ))}
    </>
  );
};

export default CursorEffect;