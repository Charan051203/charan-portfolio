import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Linkedin, Github, Instagram, Twitter, Gamepad } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

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

  useEffect(() => {
    const checkSidebar = () => {
      const shouldShowIcons = showIcons && (isMobile || window.innerWidth < 1024);
      setShowSocialIcons(shouldShowIcons);
    };

    checkSidebar();
    window.addEventListener('resize', checkSidebar);
    return () => window.removeEventListener('resize', checkSidebar);
  }, [isMobile, showIcons]);

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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
          opacity: hideNavbar ? 0 : 1, 
          y: hideNavbar ? -100 : 0 
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'glassmorphism py-2 px-3 sm:py-3 sm:px-4' : 'bg-transparent py-3 px-3 sm:py-6 sm:px-4'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.a
            href="#home"
            className={`text-lg sm:text-xl md:text-2xl font-bold ${isMobile ? 'ml-4' : 'ml-auto'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-cyan-400">CHARAN</span>
            <span className="text-white animate-pulse-glow">RK</span>
          </motion.a>
        </div>
      </motion.nav>

      {/* Floating Menu Button */}
      <motion.button 
        className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-primary/10 p-2 rounded-full backdrop-blur-sm border border-primary/20"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Menu className="w-6 h-6 text-primary" />
      </motion.button>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-lg z-40 md:hidden flex flex-col items-center justify-center"
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
              
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="text-lg sm:text-xl font-medium text-foreground hover:text-primary transition-colors px-4 py-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
              
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
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full glassmorphism flex items-center justify-center text-foreground hover:text-primary"
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