
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Instagram, Linkedin, Github, Twitter } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];
  
  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/chrn_._/', icon: <Instagram className="w-5 h-5" /> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/charan051203/', icon: <Linkedin className="w-5 h-5" /> },
    { name: 'GitHub', href: 'https://github.com/Charan051203', icon: <Github className="w-5 h-5" /> },
    { 
      name: 'Twitter', 
      href: 'https://x.com/charan_5123', 
      // Using a custom X icon since Lucide doesn't have the new X logo
      icon: (
        <svg 
          className="w-5 h-5" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    }
  ];

  return (
    <>
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
            Charan Nandyala
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
          
          <div className="hidden md:flex items-center space-x-4">
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile menu */}
      <motion.div
        className={`fixed inset-0 bg-background/90 backdrop-blur-lg z-40 md:hidden ${mobileMenuOpen ? 'flex' : 'hidden'} flex-col items-center justify-center`}
        initial={{ opacity: 0 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center space-y-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              className="text-xl font-medium text-foreground hover:text-primary transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </motion.a>
          ))}
          
          <div className="flex space-x-6 mt-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center hover:bg-primary/20 transition-colors"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + 0.05 * index }}
                aria-label={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
