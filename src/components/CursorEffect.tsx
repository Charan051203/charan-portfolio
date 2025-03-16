
import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  color: string;
  shape: string;
  rotation: number;
  opacity: number;
  vx: number;
  vy: number;
  isAttracted: boolean;
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
  const trailLength = 8;
  
  // Enhanced particles system
  const [particles, setParticles] = useState<Particle[]>([]);
  const particlesRef = useRef<{[key: string]: HTMLDivElement | null}>({});
  const animationFrameIdRef = useRef<number | null>(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const prevPositionRef = useRef({ x: 0, y: 0 });
  
  // Mouse speed tracking
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });
  const mouseSpeedRef = useRef(0);
  
  // Create a motion value for mouse speed
  const mouseSpeedMotion = useMotionValue(0);
  
  // Generate enhanced background particles
  useEffect(() => {
    const generateParticles = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const shapes = ['circle', 'triangle', 'square', 'diamond', 'shard', 'hexagon'];
      
      // More sophisticated color palette with transparency
      const colorPalette = [
        'hsla(210, 70%, 60%, opacity)',
        'hsla(240, 70%, 60%, opacity)',
        'hsla(270, 70%, 60%, opacity)',
        'hsla(191, 82%, 59%, opacity)', // Primary color
        'hsla(215, 25%, 27%, opacity)',  // Secondary color
      ];
      
      const newParticles: Particle[] = Array.from({ length: 40 }, (_, i) => {
        const x = Math.random() * windowWidth;
        const y = Math.random() * windowHeight;
        const size = Math.random() * 50 + 20; // Smaller particles
        const opacity = Math.random() * 0.15 + 0.05; // More subtle
        const shapeIndex = Math.floor(Math.random() * shapes.length);
        const colorIndex = Math.floor(Math.random() * colorPalette.length);
        const color = colorPalette[colorIndex].replace('opacity', opacity.toString());
        
        return {
          id: `particle-${i}`,
          x,
          y,
          originX: x,
          originY: y,
          size,
          color,
          shape: shapes[shapeIndex],
          rotation: Math.random() * 360,
          opacity,
          vx: 0,
          vy: 0,
          isAttracted: false
        };
      });
      
      setParticles(newParticles);
    };
    
    generateParticles();
    
    // Regenerate particles on window resize
    window.addEventListener('resize', generateParticles);
    return () => {
      window.removeEventListener('resize', generateParticles);
    };
  }, []);

  // Handle mouse movement with enhanced effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setHidden(false);
      setPosition({ x: clientX, y: clientY });
      
      // Update spring values
      cursorX.set(clientX);
      cursorY.set(clientY);
      
      // Calculate mouse speed
      const dx = clientX - lastMousePositionRef.current.x;
      const dy = clientY - lastMousePositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Smooth mouse speed
      mouseSpeedRef.current = mouseSpeedRef.current * 0.8 + (distance * 0.2);
      setMouseSpeed(mouseSpeedRef.current);
      mouseSpeedMotion.set(mouseSpeedRef.current);
      
      // Update trail
      setTrails(prev => {
        const newTrail = { x: clientX, y: clientY };
        const updatedTrails = [newTrail, ...prev].slice(0, trailLength);
        return updatedTrails;
      });
      
      // Calculate velocity
      const velX = clientX - prevPositionRef.current.x;
      const velY = clientY - prevPositionRef.current.y;
      
      // Smooth velocity with damping
      velocityRef.current.x = velocityRef.current.x * 0.8 + velX * 0.2;
      velocityRef.current.y = velocityRef.current.y * 0.8 + velY * 0.2;
      
      // Update position references
      prevPositionRef.current = { x: clientX, y: clientY };
      lastMousePositionRef.current = { x: clientX, y: clientY };
    };

    // Refined particle animation with subtle physics
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Calculate distance from particle to cursor
          const dx = position.x - particle.x;
          const dy = position.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Refined attraction radius - increases slightly with mouse speed
          const baseRadius = 350;
          const attractionRadius = baseRadius + (mouseSpeedRef.current * 50);
          const isInRange = distance < attractionRadius;
          
          // Calculate subtle attraction force
          const baseForce = 0.3;
          const speedMultiplier = 1 + (mouseSpeedRef.current * 1.5);
          const force = isInRange 
            ? (1 - distance / attractionRadius) * baseForce * speedMultiplier 
            : 0;
          
          // Improved spring physics
          const springFactor = 0.03;
          const springX = (particle.originX - particle.x) * springFactor;
          const springY = (particle.originY - particle.y) * springFactor;
          
          // Apply forces with improved damping
          const damping = 0.95;
          let vx = particle.vx * damping;
          let vy = particle.vy * damping;
          
          if (isInRange) {
            // Add attraction force with more subtle effect
            vx += dx * force;
            vy += dy * force;
          }
          
          // Add spring force
          vx += springX;
          vy += springY;
          
          // Add very slight random movement for more organic feel
          vx += (Math.random() - 0.5) * 0.2;
          vy += (Math.random() - 0.5) * 0.2;
          
          // Update position with velocity
          const x = particle.x + vx;
          const y = particle.y + vy;
          
          // Subtle rotation based on velocity and attraction
          const rotationSpeed = isInRange 
            ? Math.sqrt(vx * vx + vy * vy) * 3 + force * 10
            : 0.1;
          
          // Dynamic opacity based on attraction
          const targetOpacity = isInRange 
            ? particle.opacity * 2 * force
            : particle.opacity;
          
          return {
            ...particle,
            x,
            y,
            vx,
            vy,
            isAttracted: isInRange,
            rotation: particle.rotation + rotationSpeed,
            opacity: targetOpacity
          };
        })
      );
      
      animationFrameIdRef.current = requestAnimationFrame(animateParticles);
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
    
    // Start animation
    animateParticles();

    // Clean up
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [position, cursorX, cursorY]);

  // Get shape CSS class based on shape type with refined shapes
  const getShapeClass = (shape: string): string => {
    switch(shape) {
      case 'triangle':
        return 'clip-path-triangle';
      case 'square':
        return 'rounded-md';
      case 'diamond':
        return 'clip-path-diamond';
      case 'shard':
        return 'clip-path-shard';
      case 'hexagon':
        return 'clip-path-hexagon';
      default:
        return 'rounded-full';
    }
  };

  return (
    <>
      {/* Enhanced cursor trail effect */}
      {trails.map((trail, index) => {
        const size = 10 - index * 1;
        const opacity = 1 - (index / trailLength);
        
        return (
          <motion.div
            key={`trail-${index}`}
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] mix-blend-screen"
            style={{
              width: size,
              height: size,
              backgroundColor: `rgba(255, 255, 255, ${opacity * 0.6})`,
              x: trail.x - size/2,
              y: trail.y - size/2,
              boxShadow: `0 0 ${10 + index * 2}px rgba(255, 255, 255, ${opacity * 0.4})`,
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
          transition: 'scale 0.2s ease',
          mixBlendMode: 'screen',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)'
        }}
      />
      
      {/* Enhanced cursor outline with glow effect */}
      <motion.div 
        className={`fixed top-0 left-0 w-8 h-8 border-2 border-primary rounded-full pointer-events-none ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9998,
          scale: isPointer ? 1.5 : mouseSpeed > 0.5 ? 0.8 : 1,
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
          transition: 'scale 0.3s ease'
        }}
      />
      
      {/* Enhanced central glow */}
      <motion.div 
        className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none ${hidden ? 'opacity-0' : 'opacity-60'}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9997,
          background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)',
          filter: 'blur(2px)',
          width: '40px',
          height: '40px'
        }}
      />
      
      {/* Enhanced background particle elements */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          ref={el => particlesRef.current[particle.id] = el}
          className={`absolute pointer-events-none transition-opacity duration-300 ${getShapeClass(particle.shape)}`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: `translate(${particle.x}px, ${particle.y}px) rotate(${particle.rotation}deg)`,
            boxShadow: particle.isAttracted 
              ? `0 0 ${10 + particle.size/8}px ${particle.color.replace('opacity', '0.3')}`
              : 'none',
            zIndex: -1,
            transition: particle.isAttracted ? 'box-shadow 0.3s ease-out' : 'none',
            filter: particle.isAttracted ? 'blur(1px)' : 'blur(0px)'
          }}
        />
      ))}
    </>
  );
};

export default CursorEffect;
