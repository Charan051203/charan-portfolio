import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Linkedin, Github, Instagram, Twitter, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }
    try {
      // Simulate form submission (this would be replaced with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Sending email to charanrk5123@gmail.com', formData);

      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      toast.success("Message sent successfully! I will get back to you soon.");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again or contact directly via email.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDownloadResume = () => {
    // Replace with your actual resume file path
    const link = document.createElement('a');
    link.href = '/Resume CHARAN RK.pdf';
    link.download = 'Charan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return <section id="contact" className="py-16 md:py-20 lg:py-24 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-background to-background/50 opacity-80" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div className="text-center mb-12" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} viewport={{
        once: true,
        margin: "-100px"
      }}>
          <h2 className="text-sm uppercase tracking-wider text-primary mb-3">Contact</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h3>
          <div className="w-20 h-1 bg-primary/30 mx-auto rounded-full">
            <div className="w-10 h-1 bg-primary rounded-full" />
          </div>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div className="glassmorphism rounded-2xl p-6 md:p-8 border border-primary/20 shadow-lg relative overflow-hidden" initial={{
            opacity: 0,
            x: -30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6
          }} viewport={{
            once: true,
            margin: "-100px"
          }}>
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-xl" />
              
              <motion.h4 className="text-xl md:text-2xl font-bold mb-6 text-gradient relative z-10 text-left" initial={{
              opacity: 0,
              y: -10
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} viewport={{
              once: true
            }}>
                Send Me A Message
              </motion.h4>
              
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <motion.div initial={{
                opacity: 0,
                y: 10
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.3
              }} viewport={{
                once: true
              }}>
                  <Label htmlFor="name" className="block text-foreground/80 mb-2 text-left">
                    Your Name
                  </Label>
                  <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 bg-card/50 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-foreground/40" placeholder="John Doe" />
                </motion.div>
                
                <motion.div initial={{
                opacity: 0,
                y: 10
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.4
              }} viewport={{
                once: true
              }}>
                  <Label htmlFor="email" className="block text-foreground/80 mb-2 text-left">
                    Your Email
                  </Label>
                  <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 bg-card/50 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-foreground/40" placeholder="john@example.com" />
                </motion.div>
                
                <motion.div initial={{
                opacity: 0,
                y: 10
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.5
              }} viewport={{
                once: true
              }}>
                  <Label htmlFor="message" className="block text-foreground/80 mb-2 text-left">
                    Your Message
                  </Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full px-4 py-2 bg-card/50 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none placeholder-foreground/40" placeholder="Hello, I'd like to discuss a project..." />
                </motion.div>
                
                <motion.button type="submit" className="w-full px-5 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2 group" whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} disabled={isSubmitting} initial={{
                opacity: 0,
                y: 10
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.6
              }} viewport={{
                once: true
              }}>
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                </motion.button>
              </form>
            </motion.div>
            
            {/* Profile image with animation */}
            <div className="relative flex items-center justify-center h-full min-h-[250px] lg:min-h-[300px]">
              {/* Animated glow behind the image */}
              <motion.div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-3xl" animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5]
            }} transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }} />
              
              {/* The animated floating image - REDUCED SIZE */}
              <motion.div className="relative z-10 w-full max-w-[280px] md:max-w-[320px] rounded-2xl overflow-hidden border-2 border-primary/20" animate={{
              y: [0, -15, 0],
              rotate: [0, 1, 0]
            }} transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut"
            }}>
                {/* Profile image */}
                <motion.img src="/Profile.svg" alt="Profile" className="w-full h-full object-cover" animate={{
                scale: [1, 1.03, 1]
              }} transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut"
              }} />
                
                {/* Overlay effect */}
                <motion.div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" animate={{
                opacity: [0.3, 0.5, 0.3]
              }} transition={{
                repeat: Infinity,
                duration: 4
              }} />
              </motion.div>
            </div>
          </div>
          
          {/* Contact Information Card - Below the message form */}
          <motion.div className="mt-8 glassmorphism rounded-2xl p-6 md:p-8 border border-primary/20 shadow-lg relative overflow-hidden" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} viewport={{
          once: true,
          margin: "-100px"
        }}>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-xl" />
            
            <div className="relative z-10 py-0 my-0 px-[35px] mx-[125px]">
              <motion.h4 className="text-xl md:text-2xl font-bold mb-6 text-center text-gradient" initial={{
              opacity: 0,
              y: -10
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} viewport={{
              once: true
            }}>
                Contact Information
              </motion.h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <motion.div className="flex flex-col md:flex-row items-center md:items-start md:space-x-4 text-center md:text-left" initial={{
                opacity: 0,
                x: -20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 0.3
              }} viewport={{
                once: true
              }} whileHover={{
                x: 5
              }}>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 md:mb-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground/70 text-base">Email</p>
                    <a href="mailto:charanrk5123@gmail.com" className="text-foreground hover:text-primary transition-colors font-medium">
                      charanrk5123@gmail.com
                    </a>
                  </div>
                </motion.div>
                
                <motion.div className="flex flex-col md:flex-row items-center md:items-start md:space-x-4 text-center md:text-left" initial={{
                opacity: 0,
                x: -20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 0.4
              }} viewport={{
                once: true
              }} whileHover={{
                x: 5
              }}>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 md:mb-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground/70 text-base">Location</p>
                    <p className="text-foreground font-medium">
                      Bengaluru, Karnataka, India
                    </p>
                  </div>
                </motion.div>
              </div>
              
              {/* Social Media Icons - Centered */}
              <div className="flex justify-center mt-8 space-x-4">
                {[{
                icon: <Linkedin className="w-5 h-5" />,
                href: "https://www.linkedin.com/in/charan051203/",
                label: "LinkedIn"
              }, {
                icon: <Github className="w-5 h-5" />,
                href: "https://github.com/Charan051203",
                label: "GitHub"
              }, {
                icon: <Instagram className="w-5 h-5" />,
                href: "https://www.instagram.com/chrn_._/",
                label: "Instagram"
              }, {
                icon: <Twitter className="w-5 h-5" />,
                href: "https://x.com/charan_5123",
                label: "Twitter"
              }].map((item, i) => <motion.a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center text-foreground hover:text-primary hover:border-primary border border-border/50 transition-all" whileHover={{
                scale: 1.2,
                y: -5
              }} aria-label={item.label}>
                    {item.icon}
                  </motion.a>)}
              </div>
              
              <motion.div className="flex items-center justify-center mt-6" initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.5
            }} viewport={{
              once: true
            }}>
                <motion.button onClick={handleDownloadResume} className="flex items-center justify-center space-x-3 px-6 py-3 rounded-lg border border-primary/30 hover:bg-primary/10 transition-colors" whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-medium">Download Resume</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Contact;