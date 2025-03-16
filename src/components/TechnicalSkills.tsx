
import React from 'react';
import { motion } from 'framer-motion';

const TechnicalSkills: React.FC = () => {
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
      category: "AI & Machine Learning",
      items: [
        { name: "TensorFlow", icon: "/Tensorflow_logo.png" },
        { name: "PyTorch", icon: "/Pytorch.png" },
        { name: "Scikit-learn", icon: "/scikit-learn.png" },
        { name: "NLTK", icon: "/NLTK.png" },
        { name: "Pandas", icon: "/Pandas.png" },
        { name: "NumPy", icon: "/Numpy.png" },
        { name: "Keras", icon: "/Keras.png" },
        { name: "Matplotlib", icon: "/Matplotlib.png" },
        { name: "LIME", icon: "/LIME.png" },
        { name: "SHAP", icon: "/SHaP.svg" }
      ]
    },

    {
      category: "Game Development",
      items: [
        { name: "PyGame", icon: "/PyGame" },
        { name: "Unity", icon: "/Unity.png" },
        { name: "Unreal Engine", icon: "/Unreal.jpg" },
        { name: "Blender", icon: "/Blender.png" },
      ]
    },
    {
      category: "Tools & Platforms",
      items: [
        { name: "Git", icon: "/GIt.png" },
        { name: "GitHub", icon: "/GitHub-logo.png" },
        { name: "Copilot", icon: "/Copilot.jpg" },
        { name: "ChatGPT", icon: "/Chatgpt.png" },
        { name: "Excel", icon: "/Excel.png" },
        { name: "MySQL", icon: "/mysql.png" },
        { name: "PowerBI", icon: "/PowerBI.png" },
        { name: "Tableau", icon: "/Tableau-Logo.png" },
        { name: "Microsoft Azure", icon: "/azure.png" },
        { name: "Google Cloud", icon: "/Google Cloud.svg" },
        { name: "Jupyter", icon: "/Jupyter.svg" }
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
                    className="glassmorphism rounded-lg p-3 flex flex-col items-center justify-center"
                    whileHover={{ y: -5, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-10 h-10 mb-2 flex items-center justify-center">
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback if image doesn't load
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/40x40.png?text=${skill.name.charAt(0)}`;
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
