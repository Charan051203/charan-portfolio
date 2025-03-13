
import React from 'react';
import { motion } from 'framer-motion';

const TechnicalSkills: React.FC = () => {
  const skills = [
    {
      category: "Programming Languages",
      items: [
        { name: "Python", icon: "/icons/python.svg" },
        { name: "Java", icon: "/icons/java.svg" },
        { name: "JavaScript", icon: "/icons/javascript.svg" },
        { name: "C++", icon: "/icons/cpp.svg" },
        { name: "C#", icon: "/icons/csharp.svg" }
      ]
    },
    {
      category: "AI & Machine Learning",
      items: [
        { name: "TensorFlow", icon: "/icons/tensorflow.svg" },
        { name: "PyTorch", icon: "/icons/pytorch.svg" },
        { name: "Scikit-learn", icon: "/icons/scikit-learn.svg" },
        { name: "OpenCV", icon: "/icons/opencv.svg" },
        { name: "NLTK", icon: "/icons/nltk.svg" }
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
      category: "Web Development",
      items: [
        { name: "React", icon: "/icons/react.svg" },
        { name: "Node.js", icon: "/icons/nodejs.svg" },
        { name: "HTML5", icon: "/icons/html5.svg" },
        { name: "CSS3", icon: "/icons/css3.svg" },
        { name: "Tailwind CSS", icon: "/icons/tailwind.svg" }
      ]
    },
    {
      category: "Tools & Platforms",
      items: [
        { name: "Git", icon: "/icons/git.svg" },
        { name: "Docker", icon: "/icons/docker.svg" },
        { name: "AWS", icon: "/icons/aws.svg" },
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
    <section id="skills" className="py-24 relative">
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
          className="space-y-12"
        >
          {skills.map((category, catIndex) => (
            <motion.div key={catIndex} variants={itemVariants} className="mb-10">
              <h4 className="text-xl font-semibold mb-4 text-primary/90">{category.category}</h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {category.items.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="glassmorphism rounded-xl p-4 flex flex-col items-center justify-center aspect-square"
                    whileHover={{ y: -5, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback if image doesn't load
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/48x48.png?text=${skill.name.charAt(0)}`;
                        }}
                      />
                    </div>
                    <p className="text-sm text-center">{skill.name}</p>
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
