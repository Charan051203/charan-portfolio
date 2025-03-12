
import React from 'react';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';

// Placeholder images
const projectImages = [
  'https://via.placeholder.com/800x450/1A1F2C/FFFFFF?text=Project+1',
  'https://via.placeholder.com/800x450/1A1F2C/FFFFFF?text=Project+2',
  'https://via.placeholder.com/800x450/1A1F2C/FFFFFF?text=Project+3',
  'https://via.placeholder.com/800x450/1A1F2C/FFFFFF?text=Project+4',
  'https://via.placeholder.com/800x450/1A1F2C/FFFFFF?text=Project+5',
  'https://via.placeholder.com/800x450/1A1F2C/FFFFFF?text=Project+6',
];

const projectsData = [
  {
    title: 'EasyGrad',
    description: 'Online educational platform for graduate students, featuring course management and interactive learning tools.',
    image: projectImages[0],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    link: '#'
  },
  {
    title: 'Hairguys',
    description: 'A modern booking platform for barber shops with appointment scheduling and management system.',
    image: projectImages[1],
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    link: '#'
  },
  {
    title: 'Web Dev English',
    description: 'Language learning application specifically designed for web developers to improve their English skills.',
    image: projectImages[2],
    technologies: ['React', 'Redux', 'Node.js', 'MongoDB'],
    link: '#'
  },
  {
    title: 'Money Arjan Solutions',
    description: 'Financial management dashboard with budget tracking, expense analysis, and financial goal setting.',
    image: projectImages[3],
    technologies: ['TypeScript', 'React', 'GraphQL', 'PostgreSQL'],
    link: '#'
  },
  {
    title: 'Pioneer Digital',
    description: 'Digital marketing agency website with portfolio showcase, service listings, and client testimonials.',
    image: projectImages[4],
    technologies: ['Gatsby', 'Contentful CMS', 'Tailwind CSS'],
    link: '#'
  },
  {
    title: 'Track My Expense',
    description: 'Mobile-friendly expense tracker with receipt scanning, categorization, and detailed reports.',
    image: projectImages[5],
    technologies: ['React Native', 'Firebase', 'Chart.js'],
    link: '#'
  }
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 left-10 w-60 h-60 bg-primary/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm uppercase tracking-wider text-primary mb-3">Portfolio</h2>
          <h3 className="text-4xl font-bold mb-6">Latest Works</h3>
          <div className="w-20 h-1 bg-primary/30 mx-auto rounded-full">
            <div className="w-10 h-1 bg-primary rounded-full" />
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              link={project.link}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
