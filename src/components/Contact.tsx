
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const Contact: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Contact Me</h2>
          <p className="text-foreground/70 max-w-xl mx-auto">
            Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {/* Contact Information */}
          <motion.div
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-center md:text-left mb-6">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-foreground">Contact Information</h3>
              <p className="text-foreground/70">
                I'm currently available for freelance work and full-time positions.
              </p>
            </div>

            {/* Email */}
            <motion.div 
              className={isMobile ? "text-center mb-6" : "md:flex items-center gap-3 mb-6 contact-info-desktop"}
              whileHover={{ x: isMobile ? 0 : 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className={isMobile ? "mb-2" : "contact-info-icon-desktop"}>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto md:mx-0">
                  <Mail className="text-primary w-5 h-5" />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Email</h4>
                <a 
                  href="mailto:charanravela5@gmail.com" 
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  charanravela5@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div 
              className={isMobile ? "text-center mb-6" : "md:flex items-center gap-3 mb-6 contact-info-desktop"}
              whileHover={{ x: isMobile ? 0 : 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className={isMobile ? "mb-2" : "contact-info-icon-desktop"}>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto md:mx-0">
                  <MapPin className="text-primary w-5 h-5" />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Location</h4>
                <p className="text-foreground/70">San Jose, California</p>
              </div>
            </motion.div>

            {/* Social Media (Optional) */}
            {/* ... */}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-secondary/5 p-6 rounded-lg border border-secondary/10"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-foreground text-center md:text-left">Send Message</h3>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 rounded-md bg-secondary/10 border border-secondary/20 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-foreground"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 rounded-md bg-secondary/10 border border-secondary/20 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-foreground"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground/70 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full px-4 py-2 rounded-md bg-secondary/10 border border-secondary/20 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-foreground"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <motion.button 
                type="submit"
                className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
