
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CursorEffectProps {
  cursorVariant?: 'default' | 'hover' | 'click';
}

const CursorEffect: React.FC<CursorEffectProps> = ({ cursorVariant = 'default' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Show cursor after initial load
    const timer = setTimeout(() => setIsHidden(false), 1000);
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
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
  }, []);
  
  // Variants for cursor animations
  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(var(--cursor-color), 0.3)',
      mixBlendMode: 'difference' as 'difference',
      borderWidth: '1px',
      borderColor: 'rgba(var(--cursor-color), 0.5)',
      boxShadow: '0 0 15px rgba(var(--cursor-color), 0.3), 0 0 5px rgba(var(--cursor-color), 0.2) inset',
      opacity: isHidden ? 0 : 0.6
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: 'rgba(var(--cursor-color), 0.4)',
      borderWidth: '1.5px',
      borderColor: 'rgba(var(--cursor-color), 0.7)',
      boxShadow: '0 0 20px rgba(var(--cursor-color), 0.5), 0 0 10px rgba(var(--cursor-color), 0.3) inset',
      opacity: isHidden ? 0 : 0.8,
      transition: { type: 'spring', stiffness: 500, damping: 28 }
    },
    click: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(var(--cursor-color), 0.6)',
      borderWidth: '2px',
      borderColor: 'rgba(var(--cursor-color), 1)',
      boxShadow: '0 0 25px rgba(var(--cursor-color), 0.7), 0 0 15px rgba(var(--cursor-color), 0.5) inset',
      opacity: isHidden ? 0 : 1,
      scale: 0.9,
      transition: { type: 'spring', stiffness: 700, damping: 15 }
    }
  };
  
  // Dot inside the cursor
  const dotVariants = {
    default: {
      opacity: 0,
      scale: 0
    },
    hover: {
      opacity: 0.8,
      scale: 0.3
    },
    click: {
      opacity: 1,
      scale: 0.6,
      backgroundColor: 'rgba(var(--cursor-color), 1)'
    }
  };

  // Don't show custom cursor on touch devices
  if (typeof window !== 'undefined' && 
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <div className="cursor-container" style={{ '--cursor-color': '255, 255, 255' } as React.CSSProperties}>
      <motion.div
        className="cursor-outer fixed pointer-events-none z-50 rounded-full border"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
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
