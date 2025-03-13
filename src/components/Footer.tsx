
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
  
  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/charan051203/',
      icon: <span className="i-lucide-linkedin" />
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Charan051203',
      icon: <span className="i-lucide-github" />
    },
    {
      name: 'Twitter',
      href: 'https://x.com/charan_5123',
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
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/chrn_._/',
      icon: <span className="i-lucide-instagram" />
    }
  ];
  
  return (
    <footer className="py-12 relative bg-background border-t border-border/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <a href="#home" className="text-2xl font-bold text-gradient mb-4 inline-block">
              Charan Nandyala
            </a>
            <p className="text-foreground/70 mt-4 max-w-md">
              Computer science student specializing in AI, data science, and game development. Building elegant digital experiences with attention to detail.
            </p>
            
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center hover:bg-primary/20 transition-colors" 
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
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
          
          {/* Contact */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-6 text-gradient">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="i-lucide-mail-check mr-2 text-primary" />
                <a href="mailto:charan052003@gmail.com" className="text-foreground/70 hover:text-primary transition-colors">
                  charan052003@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <span className="i-lucide-phone mr-2 text-primary" />
                <a href="tel:+918639408013" className="text-foreground/70 hover:text-primary transition-colors">
                  +91 8639408013
                </a>
              </li>
              <li className="flex items-start">
                <span className="i-lucide-map-pin mt-1 mr-2 text-primary" />
                <span className="text-foreground/70">
                  Chennai, Tamil Nadu, India
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/50 text-sm">
            © {currentYear} Charan Nandyala. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
