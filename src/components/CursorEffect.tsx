
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
  const springConfig = { damping: 25, stiffness: 400 }; // More responsive springs
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
      const timer = setTimeout(() => setIsHidden(false), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Create and update particles
  useEffect(() => {
    if (isTouchDevice) return;

    // Function to generate new particles - improved with gaming theme
    const generateParticle = (x: number, y: number, moving: boolean) => {
      const speedFactor = moving ? 0.9 : 0.4; // Faster particles
      
      // Only add particles occasionally when the mouse is moving
      if (moving) {
        trailCounter.current += 1;
        if (trailCounter.current % 2 !== 0) return;
      }
      
      // Gaming-themed colors
      const colors = [
        `hsla(191, 82%, ${Math.random() * 30 + 60}%, ${Math.random() * 0.6 + 0.4})`, // Cyan
        `hsla(270, 70%, ${Math.random() * 30 + 60}%, ${Math.random() * 0.6 + 0.4})`, // Purple
        `hsla(120, 70%, ${Math.random() * 30 + 60}%, ${Math.random() * 0.6 + 0.4})`, // Green
        `hsla(60, 70%, ${Math.random() * 30 + 60}%, ${Math.random() * 0.6 + 0.4})`,  // Yellow
      ];
      
      // Generate a new particle
      const particle: Particle = {
        id: Math.random(),
        x: x,
        y: y,
        size: Math.random() * 5 + 1, // Larger particles for better visibility
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.7 + 0.2 * speedFactor, // Faster for more dynamic effect
        life: 0,
        maxLife: Math.random() * 50 + 20, // Longer lifetime
      };
      
      particleRef.current = [...particleRef.current, particle];
      if (particleRef.current.length > 70) { // More particles
        particleRef.current = particleRef.current.slice(-70);
      }
      setParticles([...particleRef.current]);
    };

    // Animation loop for particles - improved with smoother behavior
    const animateParticles = () => {
      if (particleRef.current.length === 0) {
        requestRef.current = requestAnimationFrame(animateParticles);
        return;
      }
      
      // Update particle positions and lifetimes with improved following behavior
      const updatedParticles = particleRef.current.map(p => {
        // Calculate direction towards cursor with gravitational pull
        const dx = mousePosition.x - p.x;
        const dy = mousePosition.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Update particle position with gravitational pull effect
        if (distance > 5) {
          const gravityFactor = 1 - Math.min(1, distance / 200); // Stronger pull when closer
          p.x += (dx / distance) * p.speed * (1 + gravityFactor * 2);
          p.y += (dy / distance) * p.speed * (1 + gravityFactor * 2);
        }
        
        // Add slight random movement for more natural effect
        p.x += (Math.random() - 0.5) * 0.3;
        p.y += (Math.random() - 0.5) * 0.3;
        
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
        // Generate multiple particles when moving for fuller trail
        for (let i = 0; i < 3; i++) {
          generateParticle(
            e.clientX + (Math.random() - 0.5) * 10, 
            e.clientY + (Math.random() - 0.5) * 10, 
            true
          );
        }
      } else if (Math.random() < 0.1) { // Occasionally generate particles even when not moving
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
  
  // Enhanced variants for cursor animations with gaming theme
  const cursorVariants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: 'rgba(72, 149, 239, 0.2)',
      mixBlendMode: 'difference' as 'difference',
      borderWidth: '1px',
      borderColor: 'rgba(72, 149, 239, 0.5)',
      boxShadow: '0 0 20px rgba(72, 149, 239, 0.4), 0 0 8px rgba(72, 149, 239, 0.3) inset',
      opacity: isHidden ? 0 : 0.7
    },
    hover: {
      height: 48,
      width: 48,
      backgroundColor: 'rgba(72, 149, 239, 0.3)',
      borderWidth: '1.5px',
      borderColor: 'rgba(72, 149, 239, 0.7)',
      boxShadow: '0 0 25px rgba(72, 149, 239, 0.6), 0 0 12px rgba(72, 149, 239, 0.4) inset',
      opacity: isHidden ? 0 : 0.9
    },
    click: {
      height: 32,
      width: 32,
      backgroundColor: 'rgba(72, 149, 239, 0.5)',
      borderWidth: '2px',
      borderColor: 'rgba(72, 149, 239, 1)',
      boxShadow: '0 0 30px rgba(72, 149, 239, 0.8), 0 0 15px rgba(72, 149, 239, 0.6) inset',
      opacity: isHidden ? 0 : 1,
      scale: 0.9
    }
  };
  
  // Dot inside the cursor
  const dotVariants = {
    default: {
      opacity: 0.7,
      scale: 0.3,
      backgroundColor: 'rgba(72, 149, 239, 0.9)'
    },
    hover: {
      opacity: 0.9,
      scale: 0.4,
      backgroundColor: 'rgba(72, 149, 239, 1)'
    },
    click: {
      opacity: 1,
      scale: 0.5,
      backgroundColor: 'rgba(255, 255, 255, 1)'
    }
  };

  // Outer glow effect - enhanced
  const glowVariants = {
    default: {
      opacity: 0.3,
      scale: 1.7,
      backgroundColor: 'transparent',
      boxShadow: '0 0 20px 8px rgba(72, 149, 239, 0.25)'
    },
    hover: {
      opacity: 0.4,
      scale: 2.0,
      backgroundColor: 'transparent',
      boxShadow: '0 0 25px 10px rgba(72, 149, 239, 0.35)'
    },
    click: {
      opacity: 0.5,
      scale: 1.6,
      backgroundColor: 'transparent',
      boxShadow: '0 0 30px 15px rgba(72, 149, 239, 0.45)'
    }
  };

  // Don't show custom cursor on touch devices
  if (isTouchDevice) return null;

  return (
    <div className="cursor-container">
      {/* Render particles - improved with better transitions */}
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
            pointerEvents: 'none',
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            filter: 'blur(0.5px)'
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
      
      {/* Outer glow effect - enhanced */}
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
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />
      
      {/* Main cursor circle - improved with gaming-themed glow */}
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
        transition={{ type: 'spring', stiffness: 500, damping: 30 }} // More responsive
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
