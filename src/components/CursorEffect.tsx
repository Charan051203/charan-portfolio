import React, { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { motion, useMotionValue } from 'framer-motion';

interface CursorEffectProps {
  cursorVariant: 'default' | 'hover' | 'click';
}

// Define different shapes for particles
const particleShapes = [
  "circle", "square", "triangle", "diamond", "star"
];

const CursorEffect: React.FC<CursorEffectProps> = ({ cursorVariant }) => {
  const [particles, setParticles] = useState<{
    x: number;
    y: number;
    size: number;
    opacity: number;
    id: number;
    color: string;
    shape: string;
    rotation: number;
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

  // Update particles and cursor position when mouse moves
  useEffect(() => {
    if (isMobile) return;
    
    let lastPositionX = 0;
    let lastPositionY = 0;
    let currentParticleId = 0;
    let particleInterval: NodeJS.Timeout;
    
    const updateParticlePositions = () => {
      setParticles(prevParticles => 
        prevParticles
          .map(particle => ({
            ...particle,
            opacity: particle.opacity - 0.02,
          }))
          .filter(particle => particle.opacity > 0)
      );
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Update tracking values
      mouseX.set(clientX);
      mouseY.set(clientY);
      setMousePosition({ x: clientX, y: clientY });
      
      // Create particles based on cursor speed
      const dx = clientX - lastPositionX;
      const dy = clientY - lastPositionY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      
      // Only create particles if the cursor is moving
      if (speed > 2) {
        // Add 1-3 particles based on speed
        const particlesToAdd = Math.min(3, Math.floor(speed / 5)) || 1;
        
        for (let i = 0; i < particlesToAdd; i++) {
          currentParticleId++;
          
          // Random position around cursor
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 10;
          const size = Math.random() * 6 + 2;
          const colorIndex = Math.floor(Math.random() * colors.length);
          const shapeIndex = Math.floor(Math.random() * particleShapes.length);
          
          setParticles(prevParticles => [
            ...prevParticles,
            {
              x: clientX + Math.cos(angle) * distance,
              y: clientY + Math.sin(angle) * distance,
              size,
              opacity: 0.8,
              id: currentParticleId,
              color: colors[colorIndex],
              shape: particleShapes[shapeIndex],
              rotation: Math.random() * 360
            }
          ]);
        }
      }
      
      lastPositionX = clientX;
      lastPositionY = clientY;
      setIsActive(true);
    };
    
    // Start particle animation
    particleInterval = setInterval(updateParticlePositions, 16); 
    
    // Add event listener for mouse movement
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(particleInterval);
    };
  }, [isMobile, isActive, mouseX, mouseY]);

  // Don't render cursor effect on mobile
  if (isMobile) return null;

  // Render the custom shape for each particle
  const renderParticleShape = (shape: string, size: number, rotation: number) => {
    switch (shape) {
      case "square":
        return (
          <div 
            style={{
              width: `${size}px`,
              height: `${size}px`,
              transform: `rotate(${rotation}deg)`
            }}
          />
        );
      case "triangle":
        return (
          <div 
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size/2}px solid transparent`,
              borderRight: `${size/2}px solid transparent`,
              borderBottom: `${size}px solid currentColor`,
              transform: `rotate(${rotation}deg)`
            }}
          />
        );
      case "diamond":
        return (
          <div 
            style={{
              width: `${size}px`,
              height: `${size}px`,
              transform: `rotate(45deg) scale(0.7) rotate(${rotation}deg)`
            }}
          />
        );
      case "star":
        // Simple star appearance
        return (
          <div 
            style={{
              width: `${size}px`,
              height: `${size}px`,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              transform: `rotate(${rotation}deg)`
            }}
          />
        );
      case "circle":
      default:
        return (
          <div 
            style={{
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%'
            }}
          />
        );
    }
  };
  
  return (
    <>
      {/* Only render particles, no cursor overrides */}
      <AnimatedParticles particles={particles} renderParticleShape={renderParticleShape} />
    </>
  );
};

// Separate component for particles to optimize rendering
const AnimatedParticles: React.FC<{
  particles: any[],
  renderParticleShape: (shape: string, size: number, rotation: number) => React.ReactNode
}> = ({ particles, renderParticleShape }) => (
  <>
    {particles.map(particle => (
      <motion.div
        key={particle.id}
        initial={{ opacity: particle.opacity, scale: 1.1 }}
        animate={{ 
          opacity: particle.opacity,
          scale: 0.8,
          rotate: particle.rotation + 180
        }}
        exit={{ opacity: 0, scale: 0 }}
        style={{
          position: 'fixed',
          left: particle.x,
          top: particle.y,
          width: particle.size,
          height: particle.size,
          backgroundColor: particle.color,
          zIndex: 9996,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          color: particle.color
        }}
      >
        {renderParticleShape(particle.shape, particle.size, particle.rotation)}
      </motion.div>
    ))}
  </>
);

export default CursorEffect;