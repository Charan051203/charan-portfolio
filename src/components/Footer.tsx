import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="relative bg-background border-t border-border/30 py-8">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg font-semibold mb-6 text-cyan-400 text-center">Quick Links</h4>
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8">
            {footerLinks.map((link, index) => (
              <motion.li 
                key={index}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="px-2 py-1"
              >
                <a 
                  href={link.href} 
                  className="text-foreground/70 hover:text-primary transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div 
          className="mt-8 pt-6 border-t border-border/30 flex justify-center items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-foreground/50 text-sm text-center">
            © {currentYear} | With ❤️ by Charan RK | Open-Sourced on GitHub.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;