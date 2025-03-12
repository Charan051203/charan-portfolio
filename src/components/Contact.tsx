
import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
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
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact form */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-card border border-border rounded-2xl p-8 glassmorphism">
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-foreground/80 mb-2 text-sm">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-secondary/20 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Project Inquiry"
                  />
                </div>
                
                <div className="mb-6">
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
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors w-full md:w-auto"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
          
          {/* Contact information */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-card border border-border rounded-2xl p-8 h-full glassmorphism">
              <h4 className="text-xl font-semibold mb-6 text-gradient">Contact Information</h4>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                    <span className="text-primary">📧</span>
                  </div>
                  <div>
                    <h5 className="text-foreground font-medium mb-1">Email</h5>
                    <a href="mailto:hello@yourname.com" className="text-foreground/70 hover:text-primary transition-colors">
                      hello@yourname.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                    <span className="text-primary">📱</span>
                  </div>
                  <div>
                    <h5 className="text-foreground font-medium mb-1">Phone</h5>
                    <a href="tel:+1234567890" className="text-foreground/70 hover:text-primary transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                    <span className="text-primary">📍</span>
                  </div>
                  <div>
                    <h5 className="text-foreground font-medium mb-1">Location</h5>
                    <p className="text-foreground/70">
                      New York, NY, United States
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="text-lg font-semibold mb-4 text-gradient">Follow Me</h4>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-lg bg-secondary/30 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <span className="i-lucide-linkedin text-foreground" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-lg bg-secondary/30 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label="Twitter"
                  >
                    <span className="i-lucide-twitter text-foreground" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-lg bg-secondary/30 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label="GitHub"
                  >
                    <span className="i-lucide-github text-foreground" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-lg bg-secondary/30 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label="Instagram"
                  >
                    <span className="i-lucide-instagram text-foreground" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
