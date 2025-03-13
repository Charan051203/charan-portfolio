
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Instagram, FileText } from 'lucide-react';

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
      icon: <Linkedin className="w-5 h-5" />
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Charan051203',
      icon: <Github className="w-5 h-5" />
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
      icon: <Instagram className="w-5 h-5" />
    }
  ];

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Charan_Resume.pdf';
    link.download = 'Charan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
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
              AI Engineer and Data Scientist skilled in Machine Learning, Deep Learning, and Data Analytics. Proficient in predictive modeling, AI-driven solutions, and optimization techniques.
            </p>
            
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={index} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center hover:bg-primary/20 transition-colors" 
                  aria-label={link.name}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
              
              <motion.button
                onClick={downloadResume}
                className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Download Resume"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FileText className="w-5 h-5" />
              </motion.button>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:charanrk5123@gmail.com" className="text-foreground/70 hover:text-primary transition-colors">
                  charanrk5123@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href="tel:+918660570019" className="text-foreground/70 hover:text-primary transition-colors">
                  +91 8660570019
                </a>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mt-1 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="text-foreground/70">
                  Bengaluru, Karnataka, India
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
