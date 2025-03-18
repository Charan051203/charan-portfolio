
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  image, 
  technologies, 
  link, 
  index 
}) => {
  const [hovered, setHovered] = useState(false);
  
  const handleCardClick = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-card border border-border interactive-project cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleCardClick}
    >
      {/* Image container */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{
            transform: hovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        
        {/* Overlay */}
        <div className="project-overlay">
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-primary/90 text-primary-foreground rounded-full font-medium hover:bg-primary transition-colors border border-primary/20"
            onClick={(e) => e.stopPropagation()}
          >
            View Project
          </a>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gradient">{title}</h3>
        <p className="text-muted-foreground mb-4 text-sm">{description}</p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, i) => (
            <span 
              key={i} 
              className="px-3 py-1 text-xs rounded-full bg-secondary/40 text-foreground/80"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
