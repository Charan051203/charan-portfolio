import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad, MousePointerClick, ChevronDown } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const Hero: React.FC = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const isMobile = useIsMobile();
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

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    setGreetingIndex(randomIndex);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex(prev => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-8 md:py-0">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background to-background/80" />
        
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, rgba(72,149,239,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(72,149,239,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 100%, rgba(72,149,239,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 0%, rgba(72,149,239,0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      
      <div className="container px-4 sm:px-6 mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
          <motion.div className="w-full lg:w-1/2 text-left" 
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
            
            <motion.div className="flex flex-wrap items-center gap-3 sm:gap-4" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <a href="#projects" className="interactive-element px-3 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base shadow-[0_0_15px_rgba(72,149,239,0.5)]">
                View Work
              </a>
              
              <div className="flex items-center gap-2">
                <a href="/Resume CHARAN RK.pdf" download className="interactive-element px-3 sm:px-6 py-2 sm:py-3 border border-primary/30 text-foreground rounded-full font-medium hover:bg-primary/10 transition-colors text-sm sm:text-base">
                  Download Resume
                </a>
                
                <motion.button
                  onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                  className="flex items-center justify-center p-2 text-primary hover:text-primary/80 transition-colors"
                  animate={{
                    y: [0, -5, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  }}
                >
                  <ChevronDown className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div className="w-full lg:w-1/2 flex justify-center" 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="relative w-[180px] h-[180px] xs:w-[200px] xs:h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] transition-all duration-300 ease-out"
              whileHover={{ scale: 1.05 }}
            >
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
                />
                
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
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;