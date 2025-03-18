
import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface CursorEffectProps {
  cursorVariant?: 'default' | 'hover' | 'click';
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  life: number;
  maxLife: number;
}

const CursorEffect: React.FC<CursorEffectProps> = ({ cursorVariant = 'default' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHidden, setIsHidden] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleRef = useRef<Particle[]>([]);
  const requestRef = useRef<number | null>(null);
  const prevMousePosition = useRef({ x: 0, y: 0 });
  const trailCounter = useRef(0);
  
  // Use motion values and springs for smoother cursor movement
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  // Check if device supports touch 
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
      if (isTouch) return; // Don't continue with cursor effect on touch devices
      
      // Show cursor after initial load
      const timer = setTimeout(() => setIsHidden(false), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Create and update particles
  useEffect(() => {
    if (isTouchDevice) return;

    // Function to generate new particles
    const generateParticle = (x: number, y: number, moving: boolean) => {
      const speedFactor = moving ? 0.7 : 0.3;
      
      // Only add particles occasionally when the mouse is moving
      trailCounter.current += 1;
      if (moving && trailCounter.current % 2 !== 0) return;
      
      // Generate a new particle
      const particle: Particle = {
        id: Math.random(),
        x: x,
        y: y,
        size: Math.random() * 4 + 1,
        color: `hsla(191, 82%, ${Math.random() * 30 + 60}%, ${Math.random() * 0.6 + 0.4})`,
        speed: Math.random() * 0.5 + 0.1 * speedFactor,
        life: 0,
        maxLife: Math.random() * 40 + 20,
      };
      
      particleRef.current = [...particleRef.current, particle];
      if (particleRef.current.length > 50) {
        particleRef.current = particleRef.current.slice(-50);
      }
      setParticles([...particleRef.current]);
    };

    // Animation loop for particles
    const animateParticles = () => {
      if (particleRef.current.length === 0) {
        requestRef.current = requestAnimationFrame(animateParticles);
        return;
      }
      
      // Update particle positions and lifetimes
      const updatedParticles = particleRef.current.map(p => {
        // Calculate direction towards cursor
        const dx = mousePosition.x - p.x;
        const dy = mousePosition.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Update particle position
        if (distance > 5) {
          p.x += (dx / distance) * p.speed;
          p.y += (dy / distance) * p.speed;
        }
        
        // Update lifetime
        p.life += 1;
        
        return p;
      }).filter(p => p.life < p.maxLife);
      
      particleRef.current = updatedParticles;
      setParticles(updatedParticles);
      
      requestRef.current = requestAnimationFrame(animateParticles);
    };

    // Track mouse movement and generate particles
    const updateMousePosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      
      // Update spring values for smooth cursor movement
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Determine if mouse is moving significantly
      const dx = Math.abs(newPosition.x - prevMousePosition.current.x);
      const dy = Math.abs(newPosition.y - prevMousePosition.current.y);
      const isMoving = dx > 1 || dy > 1;
      
      // Generate particles based on movement
      if (isMoving) {
        generateParticle(e.clientX, e.clientY, true);
      } else if (Math.random() < 0.05) {
        // Occasionally generate particles even when not moving
        generateParticle(e.clientX, e.clientY, false);
      }
      
      prevMousePosition.current = newPosition;
    };

    // Mouse event listeners
    window.addEventListener('mousemove', updateMousePosition);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);
    
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    
    // Start animation loop
    requestRef.current = requestAnimationFrame(animateParticles);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isTouchDevice, cursorX, cursorY, mousePosition]);
  
  // Variants for cursor animations
  const cursorVariants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: 'rgba(72, 149, 239, 0.2)',
      mixBlendMode: 'difference' as 'difference',
      borderWidth: '1px',
      borderColor: 'rgba(72, 149, 239, 0.5)',
      boxShadow: '0 0 15px rgba(72, 149, 239, 0.3), 0 0 5px rgba(72, 149, 239, 0.2) inset',
      opacity: isHidden ? 0 : 0.6
    },
    hover: {
      height: 48,
      width: 48,
      backgroundColor: 'rgba(72, 149, 239, 0.3)',
      borderWidth: '1.5px',
      borderColor: 'rgba(72, 149, 239, 0.7)',
      boxShadow: '0 0 20px rgba(72, 149, 239, 0.5), 0 0 10px rgba(72, 149, 239, 0.3) inset',
      opacity: isHidden ? 0 : 0.8
    },
    click: {
      height: 32,
      width: 32,
      backgroundColor: 'rgba(72, 149, 239, 0.5)',
      borderWidth: '2px',
      borderColor: 'rgba(72, 149, 239, 1)',
      boxShadow: '0 0 25px rgba(72, 149, 239, 0.7), 0 0 15px rgba(72, 149, 239, 0.5) inset',
      opacity: isHidden ? 0 : 1,
      scale: 0.9
    }
  };
  
  // Dot inside the cursor
  const dotVariants = {
    default: {
      opacity: 0.6,
      scale: 0.3,
      backgroundColor: 'rgba(72, 149, 239, 0.8)'
    },
    hover: {
      opacity: 0.8,
      scale: 0.4,
      backgroundColor: 'rgba(72, 149, 239, 0.9)'
    },
    click: {
      opacity: 1,
      scale: 0.5,
      backgroundColor: 'rgba(72, 149, 239, 1)'
    }
  };

  // Outer glow effect
  const glowVariants = {
    default: {
      opacity: 0.2,
      scale: 1.5,
      backgroundColor: 'transparent',
      boxShadow: '0 0 15px 5px rgba(72, 149, 239, 0.15)'
    },
    hover: {
      opacity: 0.3,
      scale: 1.8,
      backgroundColor: 'transparent',
      boxShadow: '0 0 20px 8px rgba(72, 149, 239, 0.25)'
    },
    click: {
      opacity: 0.4,
      scale: 1.4,
      backgroundColor: 'transparent',
      boxShadow: '0 0 25px 10px rgba(72, 149, 239, 0.35)'
    }
  };

  // Don't show custom cursor on touch devices
  if (isTouchDevice) return null;

  return (
    <div className="cursor-container">
      {/* Render particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="fixed pointer-events-none z-[49] rounded-full"
          style={{
            position: 'fixed',
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: 1 - (particle.life / particle.maxLife),
            pointerEvents: 'none'
          }}
          animate={{
            scale: [1, 0.5],
          }}
          transition={{
            duration: particle.maxLife / 60,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Outer glow effect */}
      <motion.div
        className="cursor-glow fixed pointer-events-none z-[49] rounded-full"
        style={{
          left: springX,
          top: springY,
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
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%"
        }}
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          variants={dotVariants}
          animate={cursorVariant}
          style={{ width: '6px', height: '6px' }}
        />
      </motion.div>
    </div>
  );
};

export default CursorEffect;
