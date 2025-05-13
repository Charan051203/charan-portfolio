
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Linkedin, Github, Instagram, Twitter, Gamepad } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { isElementInViewport } from '../lib/utils';

interface NavbarProps {
  showIcons?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showIcons = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [showSocialIcons, setShowSocialIcons] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const checkSidebar = () => {
      const shouldShowIcons = showIcons && (isMobile || window.innerWidth < 1024);
      setShowSocialIcons(shouldShowIcons);
    };

    checkSidebar();
    window.addEventListener('resize', checkSidebar);
    return () => window.removeEventListener('resize', checkSidebar);
  }, [isMobile, showIcons]);

  const checkActiveSection = useCallback(() => {
    const sections = ['home', 'skills', 'experience', 'projects', 'education', 'contact'];
    
    // Find the first section that is currently in viewport
    for (const section of sections) {
      if (isElementInViewport(section)) {
        setActiveSection(section);
        break;
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        setHideNavbar(true);
      } else {
        setHideNavbar(false);
      }

      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      setLastScrollY(currentScrollY);
      checkActiveSection();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, checkActiveSection]);

  // Run checkActiveSection on mount and when route changes
  useEffect(() => {
    checkActiveSection();
    
    // Small delay to ensure DOM elements are fully loaded
    const timer = setTimeout(() => {
      checkActiveSection();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [checkActiveSection]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/charan051203/", label: "LinkedIn" },
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/Charan051203", label: "GitHub" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/chrn_._/", label: "Instagram" },
    { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/charan_5123", label: "Twitter" }
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 
            'bg-gradient-to-r from-[#0f172a]/90 via-[#1e293b]/90 to-[#0f172a]/90 backdrop-blur-xl border-b border-indigo-500/20 shadow-lg py-2 px-3 sm:py-3 sm:px-4' : 
            'bg-gradient-to-r from-[#0f172a]/70 via-[#1e293b]/70 to-[#0f172a]/70 backdrop-blur-md py-3 px-3 sm:py-6 sm:px-4'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.a
            href="#home"
            className={`text-lg sm:text-xl md:text-2xl font-bold transition-opacity duration-300 ${hideNavbar && isMobile ? 'opacity-0' : 'opacity-100'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-burtons text-cyan-400">CHARAN</span>
            <span className="font-burtons text-white">RK</span>
          </motion.a>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                <motion.a
                  key={index}
                  href={link.href}
                  className={`relative text-foreground hover:text-primary transition-colors py-1 px-1
                    after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:left-0 after:bottom-0
                    after:transition-all after:duration-300
                    ${isActive 
                      ? 'text-primary after:scale-x-100' 
                      : 'after:scale-x-0 hover:after:scale-x-100'
                    }
                  `}
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.a>
              )})}
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <motion.button 
              className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-primary/20 p-2 rounded-full backdrop-blur-sm border border-primary/20"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-6 h-6 text-primary" />
            </motion.button>
          )}
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-[#1A1F2C]/95 to-[#2d3748]/95 backdrop-blur-lg z-40 md:hidden flex flex-col items-center justify-center"
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center space-y-6">
              <motion.div
                className="mb-4 text-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Gamepad className="w-8 h-8 sm:w-10 sm:h-10" />
              </motion.div>
              
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                <motion.a
                  key={index}
                  href={link.href}
                  className={`text-lg sm:text-xl font-medium transition-colors px-4 py-2 relative
                    ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'}
                    after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:left-0 after:bottom-0
                    after:transition-all after:duration-300
                    ${isActive 
                      ? 'text-primary after:scale-x-100' 
                      : 'after:scale-x-0 hover:after:scale-x-100'
                    }
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              )})}
              
              <motion.div 
                className="flex space-x-5 mt-6 pt-6 border-t border-border/30 w-64 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {socialLinks.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-xl bg-background/50 border border-border/20 flex items-center justify-center text-foreground hover:text-primary"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9 + (i * 0.1) }}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
