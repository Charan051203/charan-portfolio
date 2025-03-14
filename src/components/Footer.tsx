
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];
  
  return (
    <footer className="py-12 relative bg-background border-t border-border/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <a href="#home" className="text-2xl font-bold text-gradient mb-4 inline-block">
              Charan RK
            </a>
            <p className="text-foreground/70 mt-4 max-w-md">
              AI Engineer and Data Scientist skilled in Machine Learning, Deep Learning, and Data Analytics. Proficient in predictive modeling, AI-driven solutions, and optimization techniques.
            </p>
          </div>
          
          {/* Quick links */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-6 text-gradient">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-foreground/70 hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/50 text-sm">
            © {currentYear} Charan RK. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
