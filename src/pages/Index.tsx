
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CursorEffect from '../components/CursorEffect';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import WorkExperience from '../components/WorkExperience';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import TechnicalSkills from '../components/TechnicalSkills';
import { toast } from 'sonner';
import { Home, Linkedin, Github, Instagram, Twitter } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
  "Why don't programmers like nature? It has too many bugs and no debugging tool.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "What's a programmer's favorite place? Function junction.",
  "Why did the developer go broke? Because they lost their domain.",
  "What do you call a programmer from Finland? Nerdic.",
  "I would tell you a UDP joke, but you might not get it.",
  "Why was the JavaScript developer sad? Because they didn't know how to 'null' their feelings.",
  "The programmer got stuck in the shower because the instructions on the shampoo bottle said: Lather, Rinse, Repeat."
];

const Index: React.FC = () => {
  const [randomJoke, setRandomJoke] = useState('');
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // Check window size for sidebar visibility
    const checkSidebar = () => {
      setShowSidebar(window.innerWidth >= 1024); // lg breakpoint in Tailwind
    };
    
    checkSidebar();
    window.addEventListener('resize', checkSidebar);
    
    // Get random joke
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    setRandomJoke(joke);

    // Welcome toast
    setTimeout(() => {
      toast("Welcome to my portfolio", {
        description: joke,
        duration: 5000
      });
    }, 2000);
    
    return () => window.removeEventListener('resize', checkSidebar);
  }, []);

  // Fix scrollbar issue - ensure body height isn't exceeded
  useEffect(() => {
    // Remove any overflow issues
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    
    // Fix the body height issue
    const handleResize = () => {
      const body = document.body;
      const html = document.documentElement;
      const documentHeight = Math.max(
        body.scrollHeight,
        html.scrollHeight,
        body.offsetHeight,
        html.offsetHeight,
        body.clientHeight,
        html.clientHeight
      );
      body.style.height = `${documentHeight}px`;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.height = '';
      document.body.style.overflowX = '';
      document.documentElement.style.overflowX = '';
    };
  }, []);

  return (
    <div className="relative">
      <CursorEffect />
      <Navbar />
      
      <main>
        <Hero />
        <TechnicalSkills />
        <WorkExperience />
        <Projects />
        <Education />
        <Contact />
      </main>
      
      <Footer />
      
      {/* Fixed social media sidebar - Only visible on desktop */}
      {showSidebar && (
        <div className="fixed left-6 bottom-1/2 transform translate-y-1/2 flex flex-col gap-4 z-30 hidden lg:flex">
          {[
            { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/charan051203/", label: "LinkedIn" },
            { icon: <Github className="w-5 h-5" />, href: "https://github.com/Charan051203", label: "GitHub" },
            { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/chrn_._/", label: "Instagram" },
            { 
              icon: <Twitter className="w-5 h-5" />, 
              href: "https://x.com/charan_5123", 
              label: "Twitter" 
            }
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center text-foreground hover:text-primary hover:border-primary border border-border/50 transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 1.5 }}
              whileHover={{ scale: 1.2, y: -5 }}
              aria-label={item.label}
            >
              {item.icon}
            </motion.a>
          ))}
          <motion.div 
            className="w-px h-24 bg-border/50 mx-auto mt-2"
            initial={{ height: 0 }}
            animate={{ height: 96 }}
            transition={{ delay: 2 }}
          />
        </div>
      )}
      
      {/* Back to top button */}
      <motion.a
        href="#home"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-all z-30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
        aria-label="Back to top"
      >
        <Home className="text-primary-foreground w-5 h-5" />
      </motion.a>
    </div>
  );
};

export default Index;
