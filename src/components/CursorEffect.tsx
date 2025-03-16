
import React, { useEffect, useState } from 'react';

const CursorEffect: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother animation
      requestAnimationFrame(() => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
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
      window.removeEventListener('mousemove', updateCursorPosition);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Don't show on touch devices
  if ('ontouchstart' in window) return null;

  return (
    <>
      <div 
        className="cursor-dot" 
        style={{ 
          opacity: isVisible ? 1 : 0,
          left: cursorPosition.x,
          top: cursorPosition.y,
          transition: 'opacity 0.3s ease-out',
        }}
      />
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
