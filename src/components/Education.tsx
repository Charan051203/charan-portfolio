
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, GraduationCap, Medal, BookOpen } from 'lucide-react';

const timelineItems = [
  {
    year: "2021 - Present",
    degree: "B.E. Artificial Intelligence and Data Science",
    institution: "GLOBAL ACADEMY OF TECHNOLOGY",
    description: "CGPA: 8.3. Focusing on machine learning, deep learning, and data analytics.",
    icon: <GraduationCap className="w-5 h-5" />
  },
  {
    year: "2021",
    degree: "Class 12 (PCMB)",
    institution: "SRI CHAITANYA TECHNO SCHOOL",
    description: "Achieved 87% aggregate in CBSE board exams.",
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    year: "2019",
    degree: "Class 10",
    institution: "SRI CHAITANYA TECHNO SCHOOL",
    description: "Achieved 82% aggregate in CBSE board exams.",
    icon: <Medal className="w-5 h-5" />
  }
];

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-background/50 opacity-80" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
        
        {/* Animated floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 4 + 2,
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
          <h2 className="text-sm uppercase tracking-wider text-primary mb-3">Education</h2>
          <h3 className="text-4xl font-bold mb-6">Academic Journey</h3>
          <div className="w-20 h-1 bg-primary/30 mx-auto rounded-full">
            <div className="w-10 h-1 bg-primary rounded-full" />
          </div>
        </motion.div>
        
        {/* Modern Timeline Design */}
        <div className="max-w-4xl mx-auto">
          {timelineItems.map((item, index) => (
            <motion.div 
              key={index}
              className="mb-12 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="flex items-start gap-6">
                {/* Year Badge */}
                <motion.div 
                  className="hidden md:flex min-w-32 h-12 items-center justify-center bg-primary/10 rounded-full border border-primary/30 backdrop-blur-sm"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Calendar className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm font-semibold">{item.year}</span>
                </motion.div>
                
                {/* Central Icon with glow effect */}
                <div className="relative z-10">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center backdrop-blur-sm"
                    initial={{ scale: 0, rotate: -30 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="text-primary"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        delay: index * 0.5 
                      }}
                    >
                      {item.icon}
                    </motion.div>
                  </motion.div>
                  
                  {/* Vertical line for connection - now for all items */}
                  {index < timelineItems.length && (
                    <motion.div 
                      className="absolute top-12 left-1/2 w-0.5 bg-gradient-to-b from-primary/50 to-primary/5"
                      style={{ height: index < timelineItems.length - 1 ? "calc(100% + 1rem)" : "50px", transform: "translateX(-50%)" }}
                      initial={{ height: 0 }}
                      whileInView={{ height: index < timelineItems.length - 1 ? "calc(100% + 1rem)" : "50px" }}
                      transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                      viewport={{ once: true }}
                    />
                  )}
                </div>
                
                {/* Content Card */}
                <motion.div 
                  className="flex-1 glassmorphism rounded-2xl p-6 border border-primary/10"
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    backgroundColor: "rgba(255, 255, 255, 0.03)"
                  }}
                >
                  {/* Mobile Year display */}
                  <div className="flex items-center md:hidden mb-2">
                    <Calendar className="w-4 h-4 text-primary mr-2" />
                    <span className="text-sm font-semibold text-primary">{item.year}</span>
                  </div>
                  
                  <h4 className="text-xl font-bold">{item.degree}</h4>
                  <div className="flex items-center my-2">
                    <GraduationCap className="w-4 h-4 text-primary/70 mr-2" />
                    <h5 className="text-foreground/80">{item.institution}</h5>
                  </div>
                  <p className="mt-2 text-foreground/70">{item.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
