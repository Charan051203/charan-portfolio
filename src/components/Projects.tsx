
import React from 'react';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';

// Placeholder images
const projectImages = [
  '/Suppluchain.jpg'
  '/CarParking.png',
  '/Sentiment.png',
  '/AutoComplete.png',
  '/Fruit.png',
  '/Pothole.png',
  //'/Weather.png',
  '/Malware.png',
  '/Dementia.png'
];

const projectsData = [
  {
    title: 'BlockTrack - Blockchain-Enabled Supply Chain Management System',
    description: 'BlockTrack is a decentralized web application that enhances supply chain transparency and traceability using Blockchain (Ethereum Smart Contracts) and RFID technology.',
    image: projectImages[0],
    technologies: ['Solidity', 'Ethereum', 'Web3.js', 'RFID'],
    link: 'https://github.com/Charan051203/BlockTrack'
  },
  {
    title: 'Car Parking Space Detector',
    description: 'A real-time object detection system that identifies available and occupied parking spaces using YOLOv8n. Ideal for smart cities, shopping malls, and automated parking systems.',
    image: projectImages[1],
    technologies: ['Computer Vision', 'YOLOV8', 'Deep Learning', 'Python'],
    link: 'https://github.com/Charan051203/Car_Parking_Space_Detector_YOLOv8'
  },
  {
    title: 'Multilingual Sentiment Analysis ',
    description: 'This project implements Multilingual Sentiment Analysis using XML-RoBERTa. It classifies tweets into positive, negative, or neutral sentiment while handling language translation for unsupported languages.',
    image: projectImages[2],
    technologies: ['Transformers', 'NLP', 'XML-roBERTa','Python'],
    link: 'https://github.com/Charan051203/Multilingual-Sentiment-Analysis'
  },
  {
    title: 'Sentence Auto-Completion using LSTM',
    description: 'This project implements a Sentence Auto-Completion model using a LSTM neural network. The model is trained on the Holmes.txt dataset from Kaggle to predict and complete sentences based on input text.',
    image: projectImages[3],
    technologies: ['LSTM', 'NLP', 'TensorFlow', 'Python'],
    link: 'https://github.com/Charan051203/Sentence-Auto-Completion-LSTM'
  },
  {
    title: 'Fruit detection using Imagesegmentation',
    description: 'An Image Segmentation and Fruit Counting project using Deep Learning. This model detects fruits (apples, oranges, and more) in an image, places bounding boxes around them, and counts the total number of detected fruits.',
    image: projectImages[4],
    technologies: ['OpenCV', 'TensorFlow', 'Matplotlib', 'Python'],
    link: 'https://github.com/Charan051203/Counting-fruits-Image-segmentation'
  },
  {
    title: 'Pothole Detection Using various CNN architecture',
    description: 'This Project focused on detecting potholes using different CNN architectures. The project aims to identify and classify road conditions by leveraging the power of deep learning techniques, specifically CNNs.',
    image: projectImages[5],
    technologies: ['CNN', 'TensorFlow', 'ShaP', 'Python'],
    link: 'https://github.com/Charan051203/Pothole-Detection-Using-various-CNN-architecture'
  },
  /*{
    title: 'Weather app using HTML CSS JavaScript',
    description: 'This project focused on simple yet functional weather application built using HTML, CSS, and JavaScript. The app allows users to retrieve and display real-time weather information for any city.',
    image: projectImages[5],
    technologies: ['HTML', 'CSS', 'JavaScript', 'OpenWeather API'],
    link: 'https://github.com/Charan051203/Weather-app-using-HTML-CSS-JavaScript'
  },*/
  {
    title: 'Malware classification using ANN',
    description: 'This project focused on classifying malware using Artificial Neural Networks (ANN). The project aims to accurately identify and categorize various types of malware by leveraging the capabilities of ANN models.',
    image: projectImages[6],
    technologies: ['ANN', 'ScikitLearn', 'Keras', 'Python'],
    link: 'https://github.com/Charan051203/Malware-classification-using-ANN'
  },
  {
    title: 'Classification of Dementia using ML Models',
    description: 'This project focuses on classifying dementia using various Machine Learning (ML) models. It includes prediction models and interprets their results using LIME (Local Interpretable Model-Agnostic Explanations) and SHAP (SHapley Additive exPlanations)',
    image: projectImages[7],
    technologies: ['Boosting Techniques', 'HyperParameter Tuning', 'SHaP','Python'],
    link: 'https://github.com/Charan051203/Classification-of-Dementia-using-ML-Models'
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
