
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad } from 'lucide-react';

const Hero: React.FC = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const roles = ["AI Engineer", "Data Scientist", "Game Developer", "Prompt Engineer", "Gamer"];
  const greetings = [{
    text: "Hello",
    language: "English"
  }, {
    text: "Hola",
    language: "Spanish"
  }, {
    text: "Bonjour",
    language: "French"
  }, {
    text: "Namaste",
    language: "Hindi"
  }, {
    text: "Konnichiwa",
    language: "Japanese"
  }];

  // Set random greeting on page load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    setGreetingIndex(randomIndex);
  }, []);

  // Cycle through roles with improved animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex(prev => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-16 relative overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background to-background/80" />
        
        {/* Improved background design with subtle grid pattern */}
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), 
                              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Subtle animated gradient orbs */}
        {Array.from({length: 6}).map((_, index) => {
          const size = Math.random() * 300 + 100;
          const posX = Math.random() * 100;
          const posY = Math.random() * 100;
          return (
            <motion.div 
              key={index}
              className="absolute rounded-full blur-[100px]"
              style={{
                background: `radial-gradient(circle at center, rgba(72, 149, 239, 0.15), rgba(20, 184, 166, 0.08))`,
                width: `${size}px`,
                height: `${size}px`,
                left: `${posX}%`,
                top: `${posY}%`,
              }}
              animate={{
                x: [0, 30, 0, -30, 0],
                y: [0, -30, 0, 30, 0],
              }}
              transition={{
                duration: 25 + index * 5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          );
        })}
      </div>
      
      {/* On mobile, show scroll indicator ABOVE content with more space - IMPROVED POSITIONING */}
      <motion.div 
        className="flex md:hidden mb-4 mt-16 flex-col items-center z-20 absolute top-16 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div 
          className="w-8 h-12 border-2 border-primary/50 rounded-full flex justify-center p-2 shadow-[0_0_15px_rgba(72,149,239,0.5)]" 
        >
          <motion.div 
            className="w-1 h-2 bg-primary rounded-full" 
            animate={{
              y: [0, 12, 0],
              opacity: [0.6, 1, 0.6]
            }} 
            transition={{
              repeat: Infinity,
              duration: 1.5
            }} 
          />
        </motion.div>
        <motion.p 
          className="mt-2 text-sm text-foreground/90 font-medium"
        >
          Scroll Down
        </motion.p>
      </motion.div>
      
      <div className="container px-4 sm:px-6 mx-auto mt-10 sm:mt-0">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left content */}
          <motion.div className="w-full lg:w-1/2" 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p className="text-primary font-medium mb-3" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {greetings[greetingIndex].text}, I'm
            </motion.p>
            
            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              CHARAN RK
            </motion.h1>
            
            {/* Gaming element - controller icon next to role */}
            <div className="h-8 mb-6 relative flex items-center">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={roles[currentRoleIndex]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl text-sky-600 absolute flex items-center"
                >
                  {roles[currentRoleIndex]}
                  {roles[currentRoleIndex].toLowerCase().includes('game') && (
                    <motion.span 
                      className="ml-2 text-primary"
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Gamepad className="w-5 h-5" />
                    </motion.span>
                  )}
                </motion.p>
              </AnimatePresence>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }} 
              className="mb-8 max-w-xl text-slate-50 text-sm sm:text-base"
            >
              AI Engineer and Data Scientist skilled in Machine Learning, Deep Learning, Prompt Engineering and Data Analytics. Proficient in predictive modeling, AI-driven solutions, and optimization techniques. As a game enthusiast, I love spending my free time exploring virtual worlds and playing video games.
            </motion.p>
            
            <motion.div className="flex flex-wrap gap-4" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <a href="#projects" className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base shadow-[0_0_15px_rgba(72,149,239,0.5)]">
                View Work
              </a>
              
              <a href="/Resume CHARAN RK.pdf" download className="px-4 sm:px-6 py-2 sm:py-3 border border-primary/30 text-foreground rounded-full font-medium hover:bg-primary/10 transition-colors text-sm sm:text-base">
                Download Resume
              </a>
            </motion.div>
          </motion.div>
          
          {/* Right content - Profile Photo with hover effect (responsive size) */}
          <motion.div className="w-full lg:w-1/2 flex justify-center" 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] transition-all duration-300 ease-out"
              whileHover={{ scale: 1.05 }}
            >
              {/* Enhanced glowing effects */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-primary/30 via-blue-500/20 to-purple-500/30 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.7, 0.4],
                  rotate: [0, 15, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut"
                }}
              />
              
              {/* Gaming-themed orbital particles */}
              {Array.from({length: 8}).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const delay = i * 0.2;
                const radius = Math.min(window.innerWidth / 7, 150); // More responsive radius
                const colors = ["#48f", "#0ff", "#0f8", "#f0f"]; // Gaming-themed colors
                const color = colors[i % colors.length];
                
                return (
                  <motion.div
                    key={`orbit-${i}`}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      margin: '-1px',
                      backgroundColor: color,
                      boxShadow: `0 0 10px ${color}`
                    }}
                    animate={{
                      x: [Math.cos(angle) * radius, Math.cos(angle + Math.PI) * radius, Math.cos(angle + Math.PI * 2) * radius],
                      y: [Math.sin(angle) * radius, Math.sin(angle + Math.PI) * radius, Math.sin(angle + Math.PI * 2) * radius],
                      opacity: [0.4, 1, 0.4],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 8,
                      delay,
                      ease: "linear"
                    }}
                  />
                )
              })}

              <motion.div 
                className="absolute inset-0 w-full h-full rounded-full overflow-hidden border-4 border-primary/30 profile-image" 
                animate={{
                  y: [0, -10, 0]
                }} 
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut"
                }}
              >
                <img 
                  src="/profile2.png" 
                  alt="Charan RK" 
                  className="w-full h-full object-cover" 
                  loading="eager" 
                  onError={e => {
                    // Fallback if image doesn't load
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }} 
                />
                
                {/* Enhanced overlay gradient with dynamic effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" 
                  animate={{
                    opacity: [0.6, 0.8, 0.6],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut"
                  }}
                />

                {/* Scan line effect - gaming style */}
                <motion.div
                  className="absolute w-full h-8 bg-primary/20 blur-sm"
                  animate={{
                    y: [-400, 400],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "linear"
                  }}
                />
                
                {/* Pixelated effect overlay for gaming theme */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                  style={{
                    backgroundImage: `linear-gradient(to right, rgba(72,149,239,0.1) 1px, transparent 1px), 
                                      linear-gradient(to bottom, rgba(72,149,239,0.1) 1px, transparent 1px)`,
                    backgroundSize: '8px 8px'
                  }}
                />
              </motion.div>
              
              {/* Decorative elements around the photo - Gaming themed */}
              <motion.div 
                className="absolute -top-4 -right-4 w-8 h-8 sm:w-12 sm:h-12 bg-cyan-500/40 rounded-full blur-md" 
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }} 
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  delay: 0.5
                }} 
              />
              <motion.div 
                className="absolute -bottom-4 -left-4 w-10 h-10 sm:w-16 sm:h-16 bg-fuchsia-500/30 rounded-full blur-md" 
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5]
                }} 
                transition={{
                  repeat: Infinity,
                  duration: 4
                }} 
              />
              <motion.div 
                className="absolute top-1/2 -right-4 w-6 h-6 sm:w-8 sm:h-8 bg-green-500/40 rounded-full blur-sm" 
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.7, 0.3]
                }} 
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: 1
                }} 
              />
              <motion.div 
                className="absolute bottom-1/4 -left-4 w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/30 rounded-full blur-sm" 
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }} 
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  delay: 1.5
                }} 
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Desktop scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center">
        <motion.div 
          className="w-8 h-12 border-2 border-primary/50 rounded-full flex justify-center p-2 shadow-[0_0_15px_rgba(72,149,239,0.5)]" 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div 
            className="w-1 h-2 bg-primary rounded-full" 
            animate={{
              y: [0, 12, 0],
              opacity: [0.6, 1, 0.6]
            }} 
            transition={{
              repeat: Infinity,
              duration: 1.5
            }} 
          />
        </motion.div>
        <motion.p 
          className="mt-2 text-sm text-foreground/60" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          Scroll Down
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
