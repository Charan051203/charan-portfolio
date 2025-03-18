
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Send, Mail, MapPin, Linkedin, Github, Instagram, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulating form submission - in a real app, you'd make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success message
      toast.success("Message sent successfully! I'll get back to you soon.");
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-16 md:py-20 lg:py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm uppercase tracking-wider text-primary mb-3">Contact</h2>
          <h3 className="text-4xl font-bold mb-6">Get In Touch</h3>
          <div className="w-20 h-1 bg-primary/30 mx-auto rounded-full">
            <div className="w-10 h-1 bg-primary rounded-full" />
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 lg:gap-12">
          {/* Contact Form - Now on the left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h4 className="text-2xl font-bold mb-6 text-gradient">Send Message</h4>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-muted-foreground mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-secondary/30 border border-white/5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-muted-foreground mb-2">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-secondary/30 border border-white/5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 rounded-md bg-secondary/30 border border-white/5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="Your message here..."
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center space-x-2 w-full md:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
          
          {/* Contact Information - Now on the right */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div>
              <h4 className="text-2xl font-bold mb-6 text-gradient">Contact Information</h4>
              <div className="space-y-6 mt-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground contact-label text-left">Email</p>
                    <p className="font-medium text-lg contact-value text-center">charanrk5123@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground contact-label text-left">Location</p>
                    <p className="font-medium text-lg contact-value text-center">Bengaluru, Karnataka<br/>India</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media Icons */}
            <div>
              <h4 className="text-xl font-bold mb-4">Connect With Me</h4>
              <div className="flex space-x-4 mt-4">
                {[
                  { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/charan051203/", label: "LinkedIn" },
                  { icon: <Github className="w-5 h-5" />, href: "https://github.com/Charan051203", label: "GitHub" },
                  { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/chrn_._/", label: "Instagram" },
                  { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/charan_5123", label: "Twitter" }
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center text-foreground hover:text-primary hover:border-primary border border-border/50 transition-all social-icon"
                    whileHover={{ scale: 1.2, y: -5 }}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* Quick Links section */}
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</a>
                <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</a>
                <a href="#experience" className="text-muted-foreground hover:text-primary transition-colors">Experience</a>
                <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">Skills</a>
                <a href="#education" className="text-muted-foreground hover:text-primary transition-colors">Education</a>
                <a href="/Resume CHARAN RK.pdf" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Resume</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
