import React from 'react';
import { motion } from 'framer-motion';
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = [{
    name: 'Home',
    href: '#home'
  }, {
    name: 'Skills',
    href: '#skills'
  }, {
    name: 'Projects',
    href: '#projects'
  }, {
    name: 'Education',
    href: '#education'
  }, {
    name: 'Contact',
    href: '#contact'
  }];
  return <footer className="relative bg-background border-t border-border/30 mx-[50px] my-0 px-[26px] py-0">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Logo and description */}
          <div className="md:col-span-1">
            
            
          </div>
          
          {/* Quick links */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-6 text-gradient text-left mx-0">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => <li key={index}>
                  <a href={link.href} className="text-foreground/70 hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>)}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/50 text-sm">
            © {currentYear} Charan RK. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;