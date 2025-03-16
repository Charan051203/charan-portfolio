
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
  
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      requestRef.current = requestAnimationFrame(() => {
        const newPosition = { x: e.clientX, y: e.clientY };
        setCursorPosition(newPosition);
        
        // Update trail
        setTrail(prevTrail => {
          // Add current position to the beginning
          const newTrail = [
            { x: newPosition.x, y: newPosition.y, opacity: 1 },
            ...prevTrail.slice(0, trailLength - 1)
          ];
          
          // Adjust opacity for each dot in the trail
          return newTrail.map((dot, index) => ({
            ...dot,
            opacity: 1 - (index / trailLength)
          }));
        });
        
        if (!isVisible) setIsVisible(true);
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', updateCursorPosition);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('mousemove', updateCursorPosition);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

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
      
      {/* Trailing dots */}
      {trail.map((dot, index) => (
        <div 
          key={index}
          className="cursor-trail-dot"
          style={{
            left: dot.x,
            top: dot.y,
            opacity: dot.opacity * (isVisible ? 0.8 : 0),
            width: `${8 - index}px`,
            height: `${8 - index}px`,
            position: 'fixed',
            borderRadius: '50%',
            backgroundColor: 'hsla(var(--primary))',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 50,
            mixBlendMode: 'exclusion',
            transition: 'opacity 0.3s ease-out',
            willChange: 'transform, left, top, opacity',
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
          transition: 'transform 0.15s ease-out, opacity 0.3s ease-out',
          transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.8})`,
        }}
      />
    </>
  );
};

export default CursorEffect;
