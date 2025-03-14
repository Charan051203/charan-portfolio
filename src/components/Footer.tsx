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
    name: 'Experience',
    href: '#experience'
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
  return <footer className="relative bg-background border-t border-border/30 px-[26px] py-0 my-px mx-[47px]">
      <div className="container mx-auto px-6">
        <div className="text-center mt-8 my-[17px]">
          <h4 className="text-lg font-semibold mb-6 text-gradient text-center">Quick Links</h4>
          <ul className="flex flex-wrap justify-center gap-8 mb-8">
            {footerLinks.map((link, index) => <li key={index}>
                <a href={link.href} className="text-foreground/70 hover:text-primary transition-colors">
                  {link.name}
                </a>
              </li>)}
          </ul>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border/30 flex flex-col md:flex-row justify-center items-center my-0 py-[10px]">
          <p className="text-foreground/50 text-sm mx-0 px-0 my-0">
            © {currentYear} CHARAN RK. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;