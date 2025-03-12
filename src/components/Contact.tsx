import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Instagram, Linkedin, Github, Twitter, FileText } from 'lucide-react';

const Contact: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const phoneVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" }
    }
  };

  const handleDownloadResume = () => {
    // Replace with your actual resume file path
    const link = document.createElement('a');
    link.href = '/path-to-your-resume.pdf';
    link.download = 'your-name-resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className="py-24 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-background to-background/50 opacity-80" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm uppercase tracking-wider text-primary mb-3">Contact</h2>
          <h3 className="text-4xl font-bold mb-6">Let's Connect</h3>
          <div className="w-20 h-1 bg-primary/30 mx-auto rounded-full">
            <div className="w-10 h-1 bg-primary rounded-full" />
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Animated Phone Icon */}
          {!showForm && (
            <motion.div 
              className="mx-auto w-64 h-64"
              onClick={() => setShowForm(true)}
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full stroke-primary"
                strokeWidth="2"
                fill="none"
              >
                <motion.path
                  d="M20,80 L80,20 M30,20 H80 V70"
                  variants={phoneVariants}
                  initial="initial"
                  animate="animate"
                />
              </svg>
            </motion.div>
          )}

          {/* Contact Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border rounded-2xl p-8 glassmorphism"
              >
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-foreground/80 mb-2 text-sm">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-secondary/20 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-foreground/80 mb-2 text-sm">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-secondary/20 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-foreground/80 mb-2 text-sm">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 bg-secondary/20 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      placeholder="Hello, I'd like to discuss a project..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contact Information & Social Links */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col space-y-4">
              <h3 className="text-2xl font-bold text-gradient">Let's Connect</h3>
              <p className="text-foreground/70">Feel free to reach out through any platform</p>
            </div>

            <div className="flex space-x-4">
              <motion.a
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary/20 hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-6 h-6 text-primary" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary/20 hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-6 h-6 text-primary" />
              </motion.a>
              <motion.a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary/20 hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-6 h-6 text-primary" />
              </motion.a>
              <motion.a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary/20 hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-6 h-6 text-primary" />
              </motion.a>
              <motion.button
                onClick={handleDownloadResume}
                className="p-3 rounded-full bg-secondary/20 hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FileText className="w-6 h-6 text-primary" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
