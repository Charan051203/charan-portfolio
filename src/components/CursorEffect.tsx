
import React, { useState, useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  color: string;
  shape: string;
  rotation: number;
  opacity: number;
  vx: number;
  vy: number;
  isAttracted: boolean;
}

const CursorEffect: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<{[key: string]: HTMLDivElement | null}>({});
  const animationFrameIdRef = useRef<number | null>(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const prevPositionRef = useRef({ x: 0, y: 0 });

  // Generate background particles
  useEffect(() => {
    const generateParticles = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const shapes = ['circle', 'triangle', 'square', 'diamond', 'shard'];
      
      const newParticles: Particle[] = Array.from({ length: 40 }, (_, i) => {
        const x = Math.random() * windowWidth;
        const y = Math.random() * windowHeight;
        const size = Math.random() * 60 + 20;
        const opacity = Math.random() * 0.2 + 0.05;
        const shapeIndex = Math.floor(Math.random() * shapes.length);
        
        return {
          id: `particle-${i}`,
          x,
          y,
          originX: x,
          originY: y,
          size,
          color: `hsla(${Math.random() * 50 + 180}, 80%, 60%, ${opacity})`,
          shape: shapes[shapeIndex],
          rotation: Math.random() * 360,
          opacity,
          vx: 0,
          vy: 0,
          isAttracted: false
        };
      });
      
      setParticles(newParticles);
    };
    
    generateParticles();
    
    // Regenerate particles on window resize
    window.addEventListener('resize', generateParticles);
    return () => {
      window.removeEventListener('resize', generateParticles);
    };
  }, []);

  // Handle mouse movement and particle attraction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setHidden(false);
      setPosition({ x: clientX, y: clientY });
      
      // Calculate velocity
      const dx = clientX - prevPositionRef.current.x;
      const dy = clientY - prevPositionRef.current.y;
      
      // Smooth velocity with damping
      velocityRef.current.x = velocityRef.current.x * 0.9 + dx * 0.1;
      velocityRef.current.y = velocityRef.current.y * 0.9 + dy * 0.1;
      
      prevPositionRef.current = { x: clientX, y: clientY };
    };

    // Animate particles based on cursor position
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Calculate distance from particle to cursor
          const dx = position.x - particle.x;
          const dy = position.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Attraction radius
          const attractionRadius = 300;
          const isInRange = distance < attractionRadius;
          
          // Calculate attraction force (inverse to distance)
          const force = isInRange ? (1 - distance / attractionRadius) * 0.2 : 0;
          
          // Calculate spring force to return to original position
          const springFactor = 0.02;
          const springX = (particle.originX - particle.x) * springFactor;
          const springY = (particle.originY - particle.y) * springFactor;
          
          // Apply forces with damping
          const damping = 0.92;
          let vx = particle.vx * damping;
          let vy = particle.vy * damping;
          
          if (isInRange) {
            // Add attraction force
            vx += dx * force;
            vy += dy * force;
          }
          
          // Add spring force
          vx += springX;
          vy += springY;
          
          // Update position with velocity
          const x = particle.x + vx;
          const y = particle.y + vy;
          
          return {
            ...particle,
            x,
            y,
            vx,
            vy,
            isAttracted: isInRange,
            // Rotate particles based on attraction
            rotation: particle.rotation + (isInRange ? force * 5 : 0.1)
          };
        })
      );
      
      animationFrameIdRef.current = requestAnimationFrame(animateParticles);
    };

    // Handle pointer detection
    const handlePointerDetection = () => {
      const elements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])');
      
      elements.forEach(element => {
        element.addEventListener('mouseenter', () => setIsPointer(true));
        element.addEventListener('mouseleave', () => setIsPointer(false));
      });
    };

    // Hide cursor when it leaves the window
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    handlePointerDetection();
    
    // Start animation
    animateParticles();

    // Clean up
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [position]);

  // Apply cursor movement
  useEffect(() => {
    if (cursorDotRef.current && cursorOutlineRef.current) {
      // Main cursor dot follows exactly
      cursorDotRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
      
      // Cursor outline follows with slight delay
      cursorOutlineRef.current.style.transform = `translate(${position.x - 12}px, ${position.y - 12}px)`;
      
      // Scale effect when hovering interactive elements
      if (isPointer) {
        cursorDotRef.current.style.transform = `translate(${position.x}px, ${position.y}px) scale(1.5)`;
        cursorOutlineRef.current.style.transform = `translate(${position.x - 12}px, ${position.y - 12}px) scale(1.5)`;
      }
      
      // Apply velocity-based trailing effect to cursor outline
      cursorOutlineRef.current.style.transition = 'transform 0.2s ease-out';
    }
  }, [position, isPointer]);

  // Get shape CSS class based on shape type
  const getShapeClass = (shape: string): string => {
    switch(shape) {
      case 'triangle':
        return 'clip-path-triangle';
      case 'square':
        return 'rounded-md';
      case 'diamond':
        return 'clip-path-shard';
      case 'shard':
        return 'clip-path-shard';
      default:
        return 'rounded-full';
    }
  };

  return (
    <>
      {/* Main cursor dot */}
      <div 
        ref={cursorDotRef} 
        className={`cursor-dot bg-primary ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)`,
          zIndex: 9999 
        }}
      />
      
      {/* Cursor outline */}
      <div 
        ref={cursorOutlineRef} 
        className={`cursor-outline border-primary ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
          zIndex: 9998
        }}
      />
      
      {/* Background particle elements */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          ref={el => particlesRef.current[particle.id] = el}
          className={`absolute pointer-events-none transition-opacity duration-300 ${getShapeClass(particle.shape)}`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.isAttracted ? particle.opacity * 1.5 : particle.opacity,
            transform: `translate(${particle.x}px, ${particle.y}px) rotate(${particle.rotation}deg)`,
            boxShadow: particle.isAttracted ? '0 0 15px rgba(100, 255, 255, 0.3)' : 'none',
            zIndex: -1
          }}
        />
      ))}
    </>
  );
};

export default CursorEffect;
