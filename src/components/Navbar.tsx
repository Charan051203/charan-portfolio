
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Github, Twitter } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];
  
  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/yourusername', icon: <Instagram className="w-5 h-5" /> },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/yourusername', icon: <Linkedin className="w-5 h-5" /> },
    { name: 'GitHub', href: 'https://github.com/yourusername', icon: <Github className="w-5 h-5" /> },
    { name: 'Twitter', href: 'https://twitter.com/yourusername', icon: <Twitter className="w-5 h-5" /> }
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glassmorphism py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-gradient">
          YourName
        </a>
        
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              className="navbar-link text-foreground hover:text-primary transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              {link.name}
            </motion.a>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full glassmorphism flex items-center justify-center hover:bg-primary/20 transition-colors"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + 0.05 * index }}
              aria-label={link.name}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
        
        <div className="md:hidden">
          <button 
            className="w-10 h-10 glassmorphism rounded-full flex items-center justify-center"
            aria-label="Menu"
          >
            <span className="i-lucide-menu text-foreground" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
