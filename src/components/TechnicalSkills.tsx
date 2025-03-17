
import React from 'react';
import { motion } from 'framer-motion';
import { Separator } from './ui/separator';

// List of skills with categories
const skills = [
  {
    category: "Programming Languages",
    items: [
      { name: "Python", icon: "/python-svgrepo-com.svg" },
      { name: "C", icon: "/C.png" },
      { name: "C#", icon: "/C_sharp.png" },
      { name: "SQL", icon: "/SQL.svg" }
    ]
  },
  {
    category: "Machine Learning & AI",
    items: [
      { name: "TensorFlow", icon: "/Tensorflow_logo.png" },
      { name: "Keras", icon: "/Keras.png" },
      { name: "PyTorch", icon: "/Pytorch.png" },
      { name: "Scikit-learn", icon: "/scikit-learn.png" },
      { name: "LIME", icon: "/LIME.png" },
      { name: "SHAP", icon: "/SHaP.svg" }
    ]
  },
  {
    category: "Data Science",
    items: [
      { name: "Numpy", icon: "/Numpy.png" },
      { name: "Pandas", icon: "/Pandas.png" },
      { name: "Matplotlib", icon: "/Matplotlib.png" },
      { name: "Jupyter", icon: "/Jupyter.svg" },
      { name: "NLTK", icon: "/NLTK.png" }
    ]
  },
  {
    category: "Game Development",
    items: [
      { name: "Unity", icon: "/Unity.png" },
      { name: "Unreal Engine", icon: "/Unreal.jpg" },
      { name: "PyGame", icon: "/PyGame" },
      { name: "Blender", icon: "/Blender.png" }
    ]
  },
  {
    category: "Others",
    items: [
      { name: "GitHub", icon: "/GitHub-logo.png" },
      { name: "Git", icon: "/GIt.png" },
      { name: "Microsoft Azure", icon: "/Microsoft_Azure_Logo.svg.webp" },
      { name: "Google Cloud", icon: "/Google Cloud.svg" },
      { name: "MySQL", icon: "/mysql.png" },
      { name: "Power BI", icon: "/PowerBI.png" },
      { name: "Tableau", icon: "/Tableau-Logo.png" },
      { name: "Excel", icon: "/Excel.png" },
      { name: "ChatGPT", icon: "/Chatgpt.png" },
      { name: "Microsoft Copilot", icon: "/Copilot.jpg" }
    ]
  }
];

const TechnicalSkills: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative">
      {/* Background elements */}
      <motion.div 
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background/10 via-background to-background/90 opacity-80" />
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%)',
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
      </motion.div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm uppercase tracking-wider text-primary mb-3">Skills</h2>
          <h3 className="text-4xl font-bold mb-6">Technical Expertise</h3>
          <div className="w-20 h-1 bg-primary/30 mx-auto rounded-full">
            <div className="w-10 h-1 bg-primary rounded-full" />
          </div>
        </motion.div>
        
        <div className="space-y-10">
          {skills.map((skillCategory, categoryIndex) => (
            <motion.div 
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-6"
            >
              <motion.h4 
                className="text-2xl font-semibold mb-4 text-gradient"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                {skillCategory.category}
              </motion.h4>
              
              <Separator className="mb-6 bg-primary/20" />
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-1 sm:gap-2 justify-items-center">
                {skillCategory.items.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + (index * 0.05) }}
                    viewport={{ once: true }}
                    whileHover={{ y: -2, scale: 1.05 }}
                  >
                    <div className="w-16 h-16 relative flex items-center justify-center mb-2 skill-icon-container">
                      {/* Enhanced glow effect */}
                      <div className="glow-bg absolute inset-0 rounded-sm blur-[6px]" />
                      
                      {/* Skill icon with original size */}
                      <div className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-sm glassmorphism border border-primary/20 p-2 flex items-center justify-center skill-icon overflow-hidden">
                        {/* Inner glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-40" />
                        
                        <img 
                          src={skill.icon} 
                          alt={skill.name} 
                          className="max-w-full max-h-full object-contain relative z-10"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-center font-medium text-foreground/80">{skill.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
