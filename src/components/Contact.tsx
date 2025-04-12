
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Download } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const Contact: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <section id="contact" className="py-16 md:py-24 bg-background/80">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Get In Touch</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-foreground/70 max-w-xl mx-auto">
            Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-secondary/5 p-6 md:p-8 rounded-lg border border-secondary/10 glassmorphism"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-primary text-center md:text-left">Send Me A Message</h3>
            
            <form className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-1">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 rounded-md bg-secondary/10 border border-secondary/20 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-foreground"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-1">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 rounded-md bg-secondary/10 border border-secondary/20 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-foreground"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground/70 mb-1">Your Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full px-4 py-3 rounded-md bg-secondary/10 border border-secondary/20 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-foreground"
                  placeholder="Hello, I'd like to discuss a project..."
                ></textarea>
              </div>
              
              <motion.button 
                type="submit"
                className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information and Image */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {/* Profile Image */}
            <div className="flex justify-center md:justify-start mb-6">
              <motion.div 
                className="w-48 h-48 rounded-lg overflow-hidden border-4 border-primary/30"
                whileHover={{ scale: 1.03 }}
              >
                <img 
                  src="/profile2.png" 
                  alt="Charan RK" 
                  className="w-full h-full object-cover" 
                />
              </motion.div>
            </div>

            {/* Contact Information */}
            <div className="glassmorphism p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-6 text-primary text-center">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Mail className="text-primary w-5 h-5" />
                  </div>
                  <h4 className="font-medium text-foreground mb-1">Email</h4>
                  <a 
                    href="mailto:charanravela5@gmail.com" 
                    className="text-foreground/70 hover:text-primary transition-colors text-sm text-center"
                  >
                    charanravela5@gmail.com
                  </a>
                </div>

                {/* Location */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <MapPin className="text-primary w-5 h-5" />
                  </div>
                  <h4 className="font-medium text-foreground mb-1">Location</h4>
                  <p className="text-foreground/70 text-sm text-center">San Jose, California</p>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-secondary/20">
                {[
                  { icon: "linkedin", href: "https://www.linkedin.com/in/charan051203/" },
                  { icon: "github", href: "https://github.com/Charan051203" },
                  { icon: "instagram", href: "https://www.instagram.com/chrn_._/" },
                  { icon: "twitter", href: "https://x.com/charan_5123" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/20 text-foreground hover:bg-primary/20 hover:text-primary transition-all"
                    whileHover={{ y: -3 }}
                  >
                    <i className={`icon-${social.icon}`}></i>
                  </motion.a>
                ))}
              </div>
              
              {/* Resume Button */}
              <div className="mt-6 flex justify-center">
                <motion.a
                  href="/Resume CHARAN RK.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-2 border border-primary/30 rounded-md text-foreground hover:bg-primary/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
