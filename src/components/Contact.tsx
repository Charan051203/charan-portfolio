
import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Laptop, Gamepad, Headphones, Joystick, Computer, Speaker } from 'lucide-react';

const Contact: React.FC = () => {
  // Tech & Gaming icons that will appear behind the image
  const backgroundIcons = [
    { icon: <Monitor className="w-full h-full text-primary/70" />, size: 'w-8 h-8 sm:w-10 sm:h-10', position: 'top-[15%] left-[10%]' },
    { icon: <Gamepad className="w-full h-full text-cyan-400/70" />, size: 'w-10 h-10 sm:w-12 sm:h-12', position: 'top-[25%] right-[15%]' },
    { icon: <Headphones className="w-full h-full text-purple-400/70" />, size: 'w-8 h-8 sm:w-9 sm:h-9', position: 'top-[60%] left-[5%]' },
    { icon: <Joystick className="w-full h-full text-rose-400/70" />, size: 'w-7 h-7 sm:w-8 sm:h-8', position: 'bottom-[15%] left-[20%]' },
    { icon: <Computer className="w-full h-full text-yellow-400/70" />, size: 'w-9 h-9 sm:w-11 sm:h-11', position: 'bottom-[10%] right-[10%]' },
    { icon: <Speaker className="w-full h-full text-green-400/70" />, size: 'w-7 h-7 sm:w-9 sm:h-9', position: 'top-[40%] right-[5%]' },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 bg-secondary/5 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient">Contact Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let's connect and discuss how we can work together on your next project. Feel free to reach out through any of the following channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Contact image with tech & gaming icons */}
          <motion.div 
            className="order-2 md:order-1 relative flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full overflow-hidden shadow-[0_0_25px_rgba(72,149,239,0.3)] border-4 border-primary/30">
              {/* Background tech & gaming icons */}
              {backgroundIcons.map((item, index) => (
                <motion.div 
                  key={index}
                  className={`absolute ${item.position} ${item.size} z-10`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [0, 10, -10, 0],
                    filter: "drop-shadow(0 0 8px currentColor)"
                  }}
                >
                  {item.icon}
                </motion.div>
              ))}
              
              {/* Profile image */}
              <img 
                src="/profile2.png" 
                alt="Charan RK" 
                className="w-full h-full object-cover z-0"
              />
              
              {/* Overlay gradient */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* Contact information */}
          <motion.div 
            className="order-1 md:order-2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Get In Touch</h3>
              <p className="text-muted-foreground mb-6">I'd love to hear from you!</p>
            </div>
            
            {/* Contact information grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div 
                className="p-5 rounded-lg glassmorphism flex flex-col items-center justify-center"
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(72,149,239,0.2)" }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium mb-1">Email</h4>
                <a 
                  href="mailto:rk.charan05.12.03@gmail.com" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  rk.charan05.12.03@gmail.com
                </a>
              </motion.div>
              
              <motion.div 
                className="p-5 rounded-lg glassmorphism flex flex-col items-center justify-center"
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(72,149,239,0.2)" }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium mb-1">Phone</h4>
                <a 
                  href="tel:+918667664477" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  +91 8667664477
                </a>
              </motion.div>
              
              <motion.div 
                className="p-5 rounded-lg glassmorphism flex flex-col items-center justify-center"
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(72,149,239,0.2)" }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium mb-1">Location</h4>
                <p className="text-sm text-muted-foreground">
                  Chennai, Tamil Nadu, India
                </p>
              </motion.div>
              
              <motion.div 
                className="p-5 rounded-lg glassmorphism flex flex-col items-center justify-center"
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(72,149,239,0.2)" }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium mb-1">Website</h4>
                <a 
                  href="https://charanrk.vercel.app" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  charanrk.vercel.app
                </a>
              </motion.div>
            </div>
            
            {/* Social links */}
            <div className="flex justify-center md:justify-start gap-4 mt-8">
              {[
                {
                  name: "LinkedIn",
                  href: "https://www.linkedin.com/in/charan051203/",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ),
                },
                {
                  name: "GitHub",
                  href: "https://github.com/Charan051203",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                  ),
                },
                {
                  name: "Instagram",
                  href: "https://www.instagram.com/chrn_._/",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  ),
                },
                {
                  name: "Twitter",
                  href: "https://x.com/charan_5123",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ),
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border/50 text-foreground hover:text-primary hover:border-primary transition-all"
                  whileHover={{ scale: 1.2, y: -5 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
