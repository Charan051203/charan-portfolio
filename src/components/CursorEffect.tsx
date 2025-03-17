
import React, { useEffect, useRef, useState } from 'react';

interface CursorDot {
  x: number;
  y: number;
  opacity: number;
  scale?: number;
}

const CursorEffect: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<CursorDot[]>([]);
  const trailLength = 10; // Increased number of trailing dots
  const requestRef = useRef<number>();
  const positionRef = useRef({ x: -100, y: -100 });
  const prevTimeRef = useRef<number>(0);
  const lastPositionsRef = useRef<{x: number, y: number}[]>([]);
  
  useEffect(() => {
    // Enhanced animation using requestAnimationFrame with timestamp
    const updateCursor = (time: number) => {
      // Only update on frame intervals (throttling for smoother performance)
      if (time - prevTimeRef.current > 12) { // ~83fps for smoother animation
        setCursorPosition(positionRef.current);
        
        // Store last positions for smoother trail effect
        lastPositionsRef.current.unshift({ ...positionRef.current });
        lastPositionsRef.current = lastPositionsRef.current.slice(0, trailLength * 2);
        
        // Update trail with smoother interpolation
        setTrail(prevTrail => {
          const newTrail: CursorDot[] = [];
          
          // Generate trail dots with proper spacing
          for (let i = 0; i < trailLength; i++) {
            const position = lastPositionsRef.current[Math.min(i * 2, lastPositionsRef.current.length - 1)] || positionRef.current;
            
            newTrail.push({
              x: position.x,
              y: position.y,
              opacity: 1 - (i / trailLength),
              scale: 1 - (i * 0.05)
            });
          }
          
          return newTrail;
        });
        
        prevTimeRef.current = time;
      }
      
      requestRef.current = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      // Reset trail positions when re-entering to avoid jumps
      lastPositionsRef.current = [];
    };

    // Start the animation loop with timestamp
    requestRef.current = requestAnimationFrame(updateCursor);
    
    // Add event listeners with passive flag for better performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, trailLength]);

  // Don't show on touch devices
  if ('ontouchstart' in window) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div 
        className="cursor-dot" 
        style={{ 
          opacity: isVisible ? 1 : 0,
          left: cursorPosition.x,
          top: cursorPosition.y,
        }}
      />
      
      {/* Trailing dots - enhanced with scale and glow */}
      {trail.map((dot, index) => (
        <div 
          key={index}
          className="cursor-trail-dot"
          style={{
            left: dot.x,
            top: dot.y,
            opacity: dot.opacity * (isVisible ? 0.8 : 0),
            width: `${Math.max(2, 6 - index * 0.5)}px`,
            height: `${Math.max(2, 6 - index * 0.5)}px`,
            transform: `translate(-50%, -50%) scale(${dot.scale || 1})`,
            filter: index < 3 ? `blur(${index * 0.5}px)` : 'none',
          }}
        />
      ))}
      
      {/* Cursor outline with pulse effect */}
      <div 
        className="cursor-outline" 
        style={{ 
          opacity: isVisible ? 0.6 : 0,
          left: cursorPosition.x,
          top: cursorPosition.y,
          animation: isVisible ? 'pulse-light 2s ease-in-out infinite' : 'none'
        }}
      />
    </>
  );
};

export default CursorEffect;
