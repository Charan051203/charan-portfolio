
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, FileText, Mail, Github, Linkedin, Instagram, Twitter } from 'lucide-react';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission (replace with actual email sending code)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Email service would send to charanrk5123@gmail.com
      console.log('Sending email to charanrk5123@gmail.com', formData);
      
      // In a real implementation, you'd connect to a backend service or use a service like EmailJS
      // const serviceId = 'your_service_id';
      // const templateId = 'your_template_id';
      // const userId = 'your_user_id';
      // await emailjs.send(serviceId, templateId, { 
      //   to_name: 'Charan',
      //   from_name: formData.name,
      //   from_email: formData.email,
      //   message: formData.message,
      //   reply_to: formData.email 
      // }, userId);
      
      setFormData({ name: '', email: '', message: '' });
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadResume = () => {
    // Replace with your actual resume file path
    const link = document.createElement('a');
    link.href = '/Charan_Resume.pdf';
    link.download = 'Charan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const childVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="py-24 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-background to-background/50 opacity-80" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
        
        {/* Animated particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
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
          <h3 className="text-4xl font-bold mb-6">Get In Touch</h3>
          <div className="w-20 h-1 bg-primary/30 mx-auto rounded-full">
            <div className="w-10 h-1 bg-primary rounded-full" />
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-7 glassmorphism rounded-2xl p-8 border border-primary/20 shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-xl" />
            
            <motion.h4 
              className="text-2xl font-bold mb-6 text-gradient relative z-10"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Send Me A Message
            </motion.h4>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <motion.div
                variants={childVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <label htmlFor="name" className="block text-foreground/80 mb-2 text-sm font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-card/50 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-foreground/40"
                  placeholder="John Doe"
                />
              </motion.div>
              
              <motion.div
                variants={childVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <label htmlFor="email" className="block text-foreground/80 mb-2 text-sm font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-card/50 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-foreground/40"
                  placeholder="john@example.com"
                />
              </motion.div>
              
              <motion.div
                variants={childVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <label htmlFor="message" className="block text-foreground/80 mb-2 text-sm font-medium">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-card/50 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none placeholder-foreground/40"
                  placeholder="Hello, I'd like to discuss a project..."
                />
              </motion.div>
              
              <motion.button
                type="submit"
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                variants={childVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="lg:col-span-5 glassmorphism rounded-2xl p-8 border border-primary/20 shadow-lg relative overflow-hidden flex flex-col justify-between"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-xl" />
            
            <div className="relative z-10 mb-10">
              <motion.h4 
                className="text-2xl font-bold mb-6 text-gradient"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Contact Information
              </motion.h4>
              
              <motion.p 
                className="text-foreground/70 mb-8"
                variants={childVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Feel free to reach out if you have any questions or would like to work together on interesting projects.
              </motion.p>
              
              <motion.ul 
                className="space-y-4"
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.li 
                  className="flex items-start space-x-3"
                  variants={childVariant}
                >
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:charanrk5123@gmail.com" className="text-foreground/70 hover:text-primary transition-colors">
                      charanrk5123@gmail.com
                    </a>
                  </div>
                </motion.li>
                
                <motion.li 
                  className="flex items-start space-x-3"
                  variants={childVariant}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-5 h-5 text-primary mt-1" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+918660570019" className="text-foreground/70 hover:text-primary transition-colors">
                      +91 86605 70019
                    </a>
                  </div>
                </motion.li>
                
                <motion.li 
                  className="flex items-start space-x-3"
                  variants={childVariant}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-5 h-5 text-primary mt-1" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-foreground/70">
                      Bengaluru, KA, India
                    </p>
                  </div>
                </motion.li>
              </motion.ul>
            </div>
            
            <motion.div
              className="relative z-10 mt-auto"
              variants={childVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.button
                onClick={handleDownloadResume}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-lg border border-primary/30 hover:bg-primary/10 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-medium">Download Resume</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Social Media Links */}
        <motion.div 
          className="mt-16 flex justify-center space-x-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <a href="https://www.linkedin.com/in/charan051203/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <motion.div 
              className="w-12 h-12 rounded-full bg-card border border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="w-5 h-5 text-primary" />
            </motion.div>
          </a>
          
          <a href="https://github.com/Charan051203" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <motion.div 
              className="w-12 h-12 rounded-full bg-card border border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5 text-primary" />
            </motion.div>
          </a>
          
          <a href="https://www.instagram.com/chrn_._/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <motion.div 
              className="w-12 h-12 rounded-full bg-card border border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Instagram className="w-5 h-5 text-primary" />
            </motion.div>
          </a>
          
          <a href="https://x.com/charan_5123" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <motion.div 
              className="w-12 h-12 rounded-full bg-card border border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg 
                className="w-5 h-5 text-primary" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
