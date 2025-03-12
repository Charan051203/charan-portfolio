import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
const Hero: React.FC = () => {
  const logoRef = useRef<HTMLDivElement>(null);

  // Handle logo animation on mousemove
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (logoRef.current) {
        const {
          clientX,
          clientY
        } = e;
        const {
          innerWidth,
          innerHeight
        } = window;

        // Calculate movement based on mouse position
        const moveX = (clientX - innerWidth / 2) / 50;
        const moveY = (clientY - innerHeight / 2) / 50;

        // Apply transformation for 3D effect
        logoRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-16 relative overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 -z-10">
        {Array.from({
        length: 30
      }).map((_, index) => {
        const size = Math.random() * 100 + 20;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 30 + 15;
        const opacity = Math.random() * 0.12 + 0.03;
        return <div key={index} className={`absolute bg-white/10 ${Math.random() > 0.5 ? 'rounded-xl' : 'rounded-full'}`} style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${posX}%`,
          top: `${posY}%`,
          opacity,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`
        }} />;
      })}
      </div>
      
      <div className="container px-6 mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <motion.div className="w-full lg:w-1/2" initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }}>
            <motion.p className="text-primary font-medium mb-3" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.4,
            duration: 0.8
          }}>
              Hello, I'm
            </motion.p>
            
            <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.6,
            duration: 0.8
          }}>
              Your Name
            </motion.h1>
            
            <motion.p className="text-xl text-muted-foreground mb-6" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.8,
            duration: 0.8
          }}>
              MERN Stack Developer
            </motion.p>
            
            <motion.p className="text-foreground/80 mb-8 max-w-xl" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 1,
            duration: 0.8
          }}>
              Crafting digital experiences with precision and creativity. Specialized in building modern, responsive, and performant web applications.
            </motion.p>
            
            <motion.div className="flex flex-wrap gap-4" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 1.2,
            duration: 0.8
          }}>
              <a href="#projects" className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">
                View Work
              </a>
              
              <a href="#contact" className="px-6 py-3 border border-primary/30 text-foreground rounded-full font-medium hover:bg-primary/10 transition-colors">
                Let's Connect
              </a>
            </motion.div>
          </motion.div>
          
          {/* Right content - Logo */}
          <motion.div className="w-full lg:w-1/2 flex justify-center" initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.8
        }}>
            <div ref={logoRef} className="relative perspective-800 w-[300px] h-[300px] transition-transform duration-300 ease-out">
              <div className="absolute inset-0 w-full h-full">
                
              </div>
              
              {/* Center logo element */}
              
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <motion.div className="w-8 h-12 border-2 border-primary/50 rounded-full flex justify-center p-2" initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 1.5,
        duration: 0.5
      }}>
          <motion.div className="w-1 h-2 bg-primary rounded-full" animate={{
          y: [0, 12, 0],
          opacity: [0.6, 1, 0.6]
        }} transition={{
          repeat: Infinity,
          duration: 1.5
        }} />
        </motion.div>
        <motion.p className="mt-2 text-sm text-foreground/60" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1.6,
        duration: 0.5
      }}>
          Scroll Down
        </motion.p>
      </div>
    </section>;
};
export default Hero;