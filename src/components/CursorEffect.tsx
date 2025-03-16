
import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

const CursorEffect: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [hidden, setHidden] = useState(true);
  
  // Cursor framer-motion values
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring physics for smoother cursor movement
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Trail effects
  const [trails, setTrails] = useState<Position[]>([]);
  const trailLength = 5;

  // Handle mouse movement with clean effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setHidden(false);
      setPosition({ x: clientX, y: clientY });
      
      // Update spring values
      cursorX.set(clientX);
      cursorY.set(clientY);
      
      // Update trail
      setTrails(prev => {
        const newTrail = { x: clientX, y: clientY };
        const updatedTrails = [newTrail, ...prev].slice(0, trailLength);
        return updatedTrails;
      });
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
    
    // Clean up
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Simple cursor trail effect */}
      {trails.map((trail, index) => {
        const size = 8 - index * 1;
        const opacity = 0.8 - (index / trailLength);
        
        return (
          <motion.div
            key={`trail-${index}`}
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] mix-blend-screen"
            style={{
              width: size,
              height: size,
              backgroundColor: `rgba(255, 255, 255, ${opacity})`,
              x: trail.x - size/2,
              y: trail.y - size/2,
              boxShadow: `0 0 ${5 + index * 2}px rgba(255, 255, 255, ${opacity * 0.4})`,
            }}
          />
        );
      })}
      
      {/* Main cursor dot - with spring physics for smoother movement */}
      <motion.div 
        className={`fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9999,
          scale: isPointer ? 1.5 : 1,
          mixBlendMode: 'screen',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)'
        }}
      />
      
      {/* Cursor outline with glow effect */}
      <motion.div 
        className={`fixed top-0 left-0 w-8 h-8 border-2 border-primary rounded-full pointer-events-none ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9998,
          scale: isPointer ? 1.5 : 1,
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
        }}
      />
    </>
  );
};

export default CursorEffect;
