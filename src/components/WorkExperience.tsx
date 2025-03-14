
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { BadgeCheck, Calendar, Building } from 'lucide-react';

// This data structure allows for easy addition of more experiences in the future
const experiences = [
  {
    title: "Internship Position",
    company: "Company Name",
    duration: "September 2024 - December 2024",
    description: "Description of your responsibilities and achievements during the internship.",
    skills: ["Skill 1", "Skill 2", "Skill 3"],
  },
  // Structure ready for more experiences to be added in the future
];

const WorkExperience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative">
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
          <h2 className="text-sm uppercase tracking-wider text-primary mb-3">Experience</h2>
          <h3 className="text-4xl font-bold mb-6">Work Experience</h3>
          <div className="w-20 h-1 bg-primary/30 mx-auto rounded-full">
            <div className="w-10 h-1 bg-primary rounded-full" />
          </div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-8"
            >
              <Card className="glassmorphism border-border/50 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-foreground flex items-center">
                          {exp.title}
                        </h4>
                        <div className="flex items-center mt-2 text-foreground/70">
                          <Building className="h-4 w-4 mr-2" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 md:mt-0 text-primary/80">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">{exp.duration}</span>
                      </div>
                    </div>
                    
                    <p className="mb-4 text-foreground/80">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs flex items-center"
                        >
                          <BadgeCheck className="w-3 h-3 mr-1" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
