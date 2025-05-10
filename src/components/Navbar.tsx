{/* Previous Navbar.tsx content with updated mobile menu button visibility */}
{/* Only show mobile menu button on mobile devices */}
<motion.button 
  className={`${isMobile ? 'flex' : 'hidden'} fixed top-3 right-3 w-10 h-10 rounded-full glassmorphism items-center justify-center shadow-[0_0_15px_rgba(72,149,239,0.6)] border border-primary/30 z-50 mobile-menu-button`}
  aria-label="Menu"
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  whileTap={{ scale: 0.95 }}
  whileHover={{ scale: 1.05 }}
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
        <X className="w-5 h-5 text-primary" />
      </motion.div> : 
      <motion.div
        key="menu"
        initial={{ rotate: 90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: -90, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Menu className="w-5 h-5 text-primary" />
      </motion.div>
    }
  </AnimatePresence>
</motion.button>