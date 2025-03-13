
import React, { useState, useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const CursorEffect: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hidden, setHidden] = useState(true);
  const particleIdRef = useRef(0);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const followerPolygonsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Generate random shapes for the follower
  const shapes = Array.from({ length: 20 }, (_, i) => {
    const size = Math.random() * 50 + 20; // Larger shapes
    const xPos = Math.random() * 300 - 150;
    const yPos = Math.random() * 300 - 150;
    const opacity = Math.random() * 0.3 + 0.05; // More subtle opacity
    
    return {
      size,
      x: xPos,
      y: yPos,
      opacity,
      rotate: Math.random() * 360,
      // Add more fluid animation properties
      floatAmplitude: Math.random() * 20 + 10,
      floatSpeed: Math.random() * 3 + 2,
      delay: Math.random() * 5
    };
  });

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setHidden(false);
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add particle effect on movement (throttled)
      if (Math.random() > 0.9) {
        const newParticle = {
          id: particleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 4,
          color: `hsla(${Math.random() * 360}, 80%, 60%, 0.6)`
        };
        
        setParticles(prev => [...prev, newParticle]);
        
        // Remove particle after animation
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 1000);
      }
    };

    // Handle pointer events
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

    // Clean up
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Apply cursor movement with smooth animation
  useEffect(() => {
    if (cursorDotRef.current && cursorOutlineRef.current && followerRef.current) {
      // Main cursor dot follows exactly
      cursorDotRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
      
      // Cursor outline follows with slight delay
      cursorOutlineRef.current.style.transform = `translate(${position.x - 12}px, ${position.y - 12}px)`;
      
      // Scale effect when hovering interactive elements
      if (isPointer) {
        cursorDotRef.current.style.transform = `translate(${position.x}px, ${position.y}px) scale(1.5)`;
        cursorOutlineRef.current.style.transform = `translate(${position.x - 12}px, ${position.y - 12}px) scale(1.5)`;
      }
      
      // Follower effect with more subtle delay - more fluid movement
      followerRef.current.style.transform = `translate(${position.x - 150}px, ${position.y - 150}px)`;
    }
    
    // Update polygon positions for more fluid movement
    followerPolygonsRef.current.forEach((polygon, index) => {
      if (polygon) {
        // Create more variation in the movement
        const shape = shapes[index];
        const delay = shape.delay * 0.01;
        polygon.style.transitionDelay = `${delay}s`;
        polygon.style.transitionDuration = `0.7s`;
        polygon.style.transitionTimingFunction = `cubic-bezier(0.34, 1.56, 0.64, 1)`;
      }
    });
  }, [position, isPointer, shapes]);

  return (
    <>
      {/* Main cursor dot */}
      <div 
        ref={cursorDotRef} 
        className={`cursor-dot bg-primary ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      />
      
      {/* Cursor outline */}
      <div 
        ref={cursorOutlineRef} 
        className={`cursor-outline border-primary ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ transform: `translate(${position.x - 12}px, ${position.y - 12}px)` }}
      />
      
      {/* Follower geometric shapes */}
      <div 
        ref={followerRef} 
        className={`cursor-follower w-[300px] h-[300px] ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ transform: `translate(${position.x - 150}px, ${position.y - 150}px)` }}
      >
        {shapes.map((shape, index) => {
          // Create more triangular shapes
          const isTriangle = Math.random() > 0.4;
          const isShard = Math.random() > 0.7;
          
          let shapeClass = "";
          if (isTriangle) {
            shapeClass = "clip-path-triangle";
          } else if (isShard) {
            shapeClass = "clip-path-shard";
          } else {
            shapeClass = "rounded-full";
          }
          
          return (
            <div
              key={index}
              ref={el => followerPolygonsRef.current[index] = el}
              className={`absolute ${shapeClass} animate-float blur-[1px]`}
              style={{
                width: `${shape.size}px`,
                height: `${shape.size}px`,
                backgroundColor: `hsla(${191}, 82%, 59%, ${shape.opacity})`,
                left: `${shape.x + 150}px`,
                top: `${shape.y + 150}px`,
                opacity: shape.opacity,
                transform: `rotate(${shape.rotate}deg)`,
                animationDuration: `${shape.floatSpeed}s`,
                animationDelay: `${shape.delay}s`
              }}
            />
          );
        })}
      </div>
      
      {/* Particles effect */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            left: `${particle.x}px`,
            top: `${particle.y}px`
          }}
        />
      ))}
    </>
  );
};

export default CursorEffect;
