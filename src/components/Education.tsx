
import React from 'react';
import { motion } from 'framer-motion';

const timelineItems = [
  {
    year: "2021 - Present",
    degree: "B.E. Artificial Intelligence and Data Science",
    institution: "GLOBAL ACADEMY OF TECHNOLOGY",
    description: "CGPA: 8.0. Focusing on machine learning, deep learning, and data analytics."
  },
  {
    year: "2021",
    degree: "Class 12 (PCMB)",
    institution: "SRI CHAITANYA TECHNO SCHOOL",
    description: "Achieved 87% aggregate in CBSE board exams."
  },
  {
    year: "2019",
    degree: "Class 10",
    institution: "SRI CHAITANYA TECHNO SCHOOL",
    description: "Achieved 82% aggregate in CBSE board exams."
  }
];

const Education: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="education" className="py-24 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-background/50 opacity-80" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
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
        
        {/* Desktop Timeline */}
        <motion.div
          className="max-w-3xl mx-auto relative hidden md:block"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-primary/20 transform -translate-x-1/2" />
          
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative mb-12"
              variants={itemVariants}
            >
              {/* Timeline dot with pulse effect */}
              <motion.div 
                className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-primary z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="absolute inset-0 bg-primary/50 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              
              {/* Content - alternating sides */}
              <div className={`relative ${index % 2 === 0 ? 'text-right pr-16 ml-auto' : 'text-left pl-16'} w-1/2`}>
                <motion.div
                  className="bg-card border border-border rounded-xl p-6 shadow-lg glassmorphism"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm text-primary font-semibold">{item.year}</span>
                  <h4 className="text-xl font-bold mt-2">{item.degree}</h4>
                  <h5 className="text-foreground/70 text-lg">{item.institution}</h5>
                  <p className="mt-3 text-foreground/70">{item.description}</p>
                </motion.div>
                
                {/* Connector line with animation */}
                <motion.div 
                  className={`absolute top-1/2 ${
                    index % 2 === 0 ? 'left-0 right-auto w-16' : 'right-0 left-auto w-16'
                  } h-0.5 bg-primary/40`}
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Mobile Timeline - Vertical only - FIXED for mobile view */}
        <motion.div
          className="md:hidden space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Timeline line - fixed positioning */}
          <div className="absolute left-8 top-[22rem] bottom-24 w-0.5 bg-primary/20 z-0" />
          
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative pl-16 ml-2"
              variants={itemVariants}
            >
              {/* Timeline dot with pulse effect */}
              <motion.div 
                className="absolute left-7 top-7 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="absolute inset-0 bg-primary/50 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              
              {/* Mobile Content */}
              <motion.div
                className="bg-card border border-border rounded-xl p-6 shadow-lg glassmorphism relative z-10"
                whileHover={{ 
                  x: 5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm text-primary font-semibold block mb-1">{item.year}</span>
                <h4 className="text-lg font-bold">{item.degree}</h4>
                <h5 className="text-foreground/70 text-base">{item.institution}</h5>
                <p className="mt-2 text-foreground/70 text-sm">{item.description}</p>
              </motion.div>
              
              {/* Connector line with animation */}
              <motion.div 
                className="absolute top-7 left-7 w-8 h-0.5 bg-primary/40 z-5"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
