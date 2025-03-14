
import React from 'react';
import { motion } from 'framer-motion';

const TechnicalSkills: React.FC = () => {
  const skills = [
    {
      category: "Programming Languages",
      items: [
        { name: "Python", icon: "/icons/python.svg" },
        { name: "SQL", icon: "/icons/sql.svg" },
        { name: "C#", icon: "/icons/csharp.svg" },
        { name: "C++", icon: "/icons/cpp.svg" },
        { name: "Java", icon: "/icons/java.svg" }
      ]
    },
    {
      category: "AI & Machine Learning",
      items: [
        { name: "TensorFlow", icon: "/icons/tensorflow.svg" },
        { name: "PyTorch", icon: "/icons/pytorch.svg" },
        { name: "Scikit-learn", icon: "/icons/scikit-learn.svg" },
        { name: "OpenCV", icon: "/icons/opencv.svg" },
        { name: "NLTK", icon: "/icons/nltk.svg" },
        { name: "Pandas", icon: "/icons/pandas.svg" },
        { name: "NumPy", icon: "/icons/numpy.svg" },
        { name: "Keras", icon: "/icons/keras.svg" },
        { name: "Matplotlib", icon: "/icons/matplotlib.svg" }
      ]
    },
    {
      category: "Prompt Engineering",
      items: [
        { name: "ChatGPT", icon: "/icons/chatgpt.svg" },
        { name: "LLMs", icon: "/icons/llm.svg" },
        { name: "LIME", icon: "/icons/lime.svg" },
        { name: "SHAP", icon: "/icons/shap.svg" }
      ]
    },
    {
      category: "Game Development",
      items: [
        { name: "Unity", icon: "/icons/unity.svg" },
        { name: "Unreal Engine", icon: "/icons/unreal.svg" },
        { name: "Godot", icon: "/icons/godot.svg" },
        { name: "Blender", icon: "/icons/blender.svg" },
      ]
    },
    {
      category: "Tools & Platforms",
      items: [
        { name: "Git", icon: "/icons/git.svg" },
        { name: "GitHub", icon: "/icons/github.svg" },
        { name: "Docker", icon: "/icons/docker.svg" },
        { name: "Excel", icon: "/icons/excel.svg" },
        { name: "MySQL", icon: "/icons/mysql.svg" },
        { name: "PowerBI", icon: "/icons/powerbi.svg" },
        { name: "Tableau", icon: "/icons/tableau.svg" },
        { name: "Microsoft Azure", icon: "/icons/azure.svg" },
        { name: "Google Cloud", icon: "/icons/gcp.svg" },
        { name: "Jupyter", icon: "/icons/jupyter.svg" }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="skills" className="py-16 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-background/50 opacity-80" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-10"
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
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          {skills.map((category, catIndex) => (
            <motion.div key={catIndex} variants={itemVariants} className="mb-6">
              <h4 className="text-xl font-semibold mb-3 text-primary/90 flex items-center">
                <span className="mr-2">{category.category}</span>
                <span className="h-px bg-primary/30 flex-grow ml-4"></span>
              </h4>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {category.items.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="glassmorphism rounded-lg p-2 flex flex-col items-center justify-center"
                    whileHover={{ y: -5, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-8 h-8 mb-2 flex items-center justify-center">
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback if image doesn't load
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/32x32.png?text=${skill.name.charAt(0)}`;
                        }}
                      />
                    </div>
                    <p className="text-xs text-center">{skill.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
