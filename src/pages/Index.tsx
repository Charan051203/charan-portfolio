
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import CursorEffect from '../components/CursorEffect';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { toast } from 'sonner';

const Index: React.FC = () => {
  useEffect(() => {
    // Welcome toast
    setTimeout(() => {
      toast("Welcome to my portfolio", {
        description: "Feel free to explore and move your cursor to see the interactive effects!",
        duration: 5000
      });
    }, 2000);
  }, []);

  return (
    <div className="relative">
      {/* Cursor effect */}
      <CursorEffect />
      
      {/* Navbar */}
      <Navbar />
      
      <main>
        {/* Hero section */}
        <Hero />
        
        {/* Projects section */}
        <Projects />
        
        {/* Testimonials section */}
        <Testimonials />
        
        {/* Contact section */}
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
      
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
        <span className="i-lucide-chevron-up text-primary-foreground" />
      </motion.a>
    </div>
  );
};

export default Index;
