
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' }
  ];
  
  return (
    <footer className="py-12 relative bg-background border-t border-border/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <a href="#home" className="text-2xl font-bold text-gradient mb-4 inline-block">
              YourName
            </a>
            <p className="text-foreground/70 mt-4 max-w-md">
              Creating elegant digital experiences with attention to detail and a focus on performance. Let's bring your vision to life.
            </p>
            
            <div className="mt-6 flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="LinkedIn"
              >
                <span className="i-lucide-linkedin text-foreground" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Twitter"
              >
                <span className="i-lucide-twitter text-foreground" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="GitHub"
              >
                <span className="i-lucide-github text-foreground" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Instagram"
              >
                <span className="i-lucide-instagram text-foreground" />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-6 text-gradient">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-6 text-gradient">Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Mobile Development
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Consultation
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-6 text-gradient">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="i-lucide-mail-check mr-2 text-primary" />
                <a href="mailto:hello@yourname.com" className="text-foreground/70 hover:text-primary transition-colors">
                  hello@yourname.com
                </a>
              </li>
              <li className="flex items-center">
                <span className="i-lucide-phone mr-2 text-primary" />
                <a href="tel:+1234567890" className="text-foreground/70 hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start">
                <span className="i-lucide-map-pin mt-1 mr-2 text-primary" />
                <span className="text-foreground/70">
                  New York, NY, United States
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/50 text-sm">
            © {currentYear} YourName. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm">
              <li>
                <a href="#" className="text-foreground/50 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/50 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/50 hover:text-primary transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
