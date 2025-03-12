
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechVision',
    content: 'Working with this developer was an absolute pleasure. They delivered the project on time and exceeded our expectations with their attention to detail and innovative solutions.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CEO',
    company: 'DigitalCraft',
    content: 'One of the most talented developers I\'ve worked with. They have an incredible eye for design and the technical skills to match. Our website traffic increased by 150% after the redesign.',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Marketing Director',
    company: 'GrowthHub',
    content: 'The developer understood our vision perfectly and transformed it into a stunning website. Their communication was clear throughout the project, making collaboration effortless.',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-background/50 opacity-80" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm uppercase tracking-wider text-primary mb-3">Testimonials</h2>
          <h3 className="text-4xl font-bold mb-6">What My Clients Are Saying</h3>
          <div className="w-20 h-1 bg-primary/30 mx-auto rounded-full">
            <div className="w-10 h-1 bg-primary rounded-full" />
          </div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="transition-all duration-700 ease-out flex"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    className="min-w-full p-8"
                  >
                    <div className="bg-card border border-border rounded-2xl p-8 glassmorphism">
                      <div className="mb-6 relative">
                        <svg className="absolute top-0 left-0 w-16 h-16 text-primary/10 transform -translate-x-6 -translate-y-6" 
                          fill="currentColor" viewBox="0 0 32 32">
                          <path d="M10,8H2V0h8V8z M20,0h-8v8h8V0z M10,18h8v-8h-8V18z M0,18h8v-8H0V18z"></path>
                        </svg>
                        <p className="text-foreground/90 relative z-10">"{testimonial.content}"</p>
                      </div>
                      
                      <div className="flex items-center">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                          <p className="text-foreground/60 text-sm">{testimonial.role}, {testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-primary w-8' : 'bg-primary/30'
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
