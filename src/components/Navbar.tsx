
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

  // Check for sidebar visibility
  useEffect(() => {
    const checkSidebar = () => {
      // If we're on mobile (not mobile), check if we should show social icons in navbar
      // We don't show them if the sidebar is visible (which is on desktop, lg: breakpoint)
      const shouldShowIcons = showIcons && (isMobile || window.innerWidth < 1024);
      setShowSocialIcons(shouldShowIcons);
    };

    checkSidebar();
    window.addEventListener('resize', checkSidebar);
    return () => window.removeEventListener('resize', checkSidebar);
  }, [isMobile, showIcons]);

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
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/charan051203/", label: "LinkedIn" },
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/Charan051203", label: "GitHub" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/chrn_._/", label: "Instagram" },
    { 
      icon: <Twitter className="w-5 h-5" />, 
      href: "https://x.com/charan_5123", 
      label: "Twitter" 
    }
  ];

  // Animation variants for mobile menu
  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      x: '-100%',
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'glassmorphism py-2 px-3 sm:py-3 sm:px-4' : 'bg-transparent py-3 px-3 sm:py-6 sm:px-4'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <a href="#home" className="text-lg sm:text-xl md:text-2xl font-bold">
            <span className="text-gradient">CHARAN</span>
            <span className="text-white shadow-glow">RK</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex space-x-6 lg:space-x-8">
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
          </div>

          {/* Desktop Social Icons - Only visible when sidebar icons are not visible */}
          {showSocialIcons && (
            <div className="hidden md:flex items-center space-x-4">
              {socialLinks.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-all"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  aria-label={item.label}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          )}
          
          {/* Mobile menu button - MORE VISIBLE with gamepad icon and larger size */}
          <div className="md:hidden">
            <motion.button 
              className="w-12 h-12 glassmorphism rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(72,149,239,0.4)]"
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? 
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-primary" />
                  </motion.div> : 
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                  >
                    <Menu className="w-6 h-6 text-primary" />
                  </motion.div>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile menu with improved animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-lg z-40 md:hidden flex flex-col items-center justify-center"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col items-center space-y-6">
              {/* Gaming icon at the top of the menu */}
              <motion.div
                className="mb-4 text-primary"
                variants={menuItemVariants}
              >
                <Gamepad className="w-10 h-10" />
              </motion.div>
              
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="text-xl font-medium text-foreground hover:text-primary transition-colors px-4 py-2"
                  variants={menuItemVariants}
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
              
              {/* Social Icons in mobile menu - always visible in mobile menu with improved animation */}
              <motion.div 
                className="flex space-x-5 mt-6 pt-6 border-t border-border/30 w-64 justify-center"
                variants={menuItemVariants}
              >
                {socialLinks.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center text-foreground hover:text-primary"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
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
