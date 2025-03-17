
import React, { useEffect, useRef, useState } from 'react';

interface CursorDot {
  x: number;
  y: number;
  opacity: number;
}

const CursorEffect: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<CursorDot[]>([]);
  const trailLength = 8; // Number of trailing dots
  const requestRef = useRef<number>();
  const positionRef = useRef({ x: -100, y: -100 });
  
  useEffect(() => {
    // More efficient approach using requestAnimationFrame
    const updateCursor = () => {
      setCursorPosition(positionRef.current);
      
      // Update trail with better performance
      setTrail(prevTrail => {
        const newTrail = [
          { x: positionRef.current.x, y: positionRef.current.y, opacity: 1 },
          ...prevTrail.slice(0, trailLength - 1)
        ];
        
        return newTrail.map((dot, index) => ({
          ...dot,
          opacity: 1 - (index / trailLength)
        }));
      });
      
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
    };

    // Start the animation loop
    requestRef.current = requestAnimationFrame(updateCursor);
    
    // Add event listeners
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
      
      {/* Trailing dots - optimized */}
      {trail.map((dot, index) => (
        <div 
          key={index}
          className="cursor-trail-dot"
          style={{
            left: dot.x,
            top: dot.y,
            opacity: dot.opacity * (isVisible ? 0.7 : 0),
            width: `${Math.max(2, 6 - index * 0.6)}px`,
            height: `${Math.max(2, 6 - index * 0.6)}px`,
          }}
        />
      ))}
      
      {/* Cursor outline */}
      <div 
        className="cursor-outline" 
        style={{ 
          opacity: isVisible ? 0.6 : 0,
          left: cursorPosition.x,
          top: cursorPosition.y,
        }}
      />
    </>
  );
};

export default CursorEffect;
