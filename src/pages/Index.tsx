import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { useMobile } from '../hooks/use-mobile';

const Index = () => {
  const isMobile = useMobile();
  const [hasScrolled, setHasScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseOver = () => {
    // Add your mouse over handler logic here if needed
  };

  const handleMouseOut = () => {
    // Add your mouse out handler logic here if needed
  };

  return (
    <div id="home">
      {/* Previous Index.tsx content with updated back-to-top button visibility */}
      {/* Only show back-to-top button on desktop */}
      {!isMobile && hasScrolled && (
        <motion.a
          href="#home"
          className="fixed bottom-4 right-4 w-10 h-10 rounded-full bg-primary hidden md:flex items-center justify-center hover:bg-primary/90 transition-all z-50 border-2 border-primary/30 back-to-top interactive-element"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ y: -5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
          style={{ boxShadow: "0 0 20px hsla(var(--primary), 0.8)" }}
        >
          <Home
            className="text-primary-foreground w-4 h-4"
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut}
          />
        </motion.a>
      )}
    </div>
  );
};

export default Index;