
import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

interface CursorEffectProps {
  cursorVariant?: 'default' | 'hover' | 'click';
}

const CursorEffect: React.FC<CursorEffectProps> = ({ cursorVariant = 'default' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHidden, setIsHidden] = useState(true);
  
  // Use spring animations for smoother cursor movement
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    // Show cursor after initial load
    const timer = setTimeout(() => setIsHidden(false), 1000);
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Update spring values for smooth movement
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', updateMousePosition);
    
    // Hide cursor when mouse leaves the window
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);
    
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(timer);
    };
  }, [cursorX, cursorY]);
  
  // Variants for cursor animations
  const cursorVariants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: 'rgba(var(--cursor-color), 0.2)',
      mixBlendMode: 'difference' as 'difference',
      borderWidth: '1px',
      borderColor: 'rgba(var(--cursor-color), 0.5)',
      boxShadow: '0 0 15px rgba(var(--cursor-color), 0.3), 0 0 5px rgba(var(--cursor-color), 0.2) inset',
      opacity: isHidden ? 0 : 0.6
    },
    hover: {
      height: 48,
      width: 48,
      backgroundColor: 'rgba(var(--cursor-color), 0.3)',
      borderWidth: '1.5px',
      borderColor: 'rgba(var(--cursor-color), 0.7)',
      boxShadow: '0 0 20px rgba(var(--cursor-color), 0.5), 0 0 10px rgba(var(--cursor-color), 0.3) inset',
      opacity: isHidden ? 0 : 0.8
    },
    click: {
      height: 32,
      width: 32,
      backgroundColor: 'rgba(var(--cursor-color), 0.5)',
      borderWidth: '2px',
      borderColor: 'rgba(var(--cursor-color), 1)',
      boxShadow: '0 0 25px rgba(var(--cursor-color), 0.7), 0 0 15px rgba(var(--cursor-color), 0.5) inset',
      opacity: isHidden ? 0 : 1,
      scale: 0.9
    }
  };
  
  // Dot inside the cursor
  const dotVariants = {
    default: {
      opacity: 0.6,
      scale: 0.3,
      backgroundColor: 'rgba(var(--cursor-color), 0.8)'
    },
    hover: {
      opacity: 0.8,
      scale: 0.4,
      backgroundColor: 'rgba(var(--cursor-color), 0.9)'
    },
    click: {
      opacity: 1,
      scale: 0.5,
      backgroundColor: 'rgba(var(--cursor-color), 1)'
    }
  };

  // Outer glow effect
  const glowVariants = {
    default: {
      opacity: 0.2,
      scale: 1.5,
      backgroundColor: 'transparent',
      boxShadow: '0 0 15px 5px rgba(var(--cursor-color), 0.15)'
    },
    hover: {
      opacity: 0.3,
      scale: 1.8,
      backgroundColor: 'transparent',
      boxShadow: '0 0 20px 8px rgba(var(--cursor-color), 0.25)'
    },
    click: {
      opacity: 0.4,
      scale: 1.4,
      backgroundColor: 'transparent',
      boxShadow: '0 0 25px 10px rgba(var(--cursor-color), 0.35)'
    }
  };

  // Don't show custom cursor on touch devices
  if (typeof window !== 'undefined' && 
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <div className="cursor-container" style={{ '--cursor-color': '255, 255, 255' } as React.CSSProperties}>
      {/* Outer glow effect */}
      <motion.div
        className="cursor-glow fixed pointer-events-none z-[49] rounded-full"
        style={{
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%"
        }}
        variants={glowVariants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
      
      {/* Main cursor circle */}
      <motion.div
        className="cursor-outer fixed pointer-events-none z-50 rounded-full border"
        style={{
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%"
        }}
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          variants={dotVariants}
          animate={cursorVariant}
          style={{ width: '6px', height: '6px' }}
        />
      </motion.div>
    </div>
  );
};

export default CursorEffect;
