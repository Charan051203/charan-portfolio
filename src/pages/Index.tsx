
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CursorEffect from '../components/CursorEffect';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';
import { toast } from 'sonner';
import { Home } from 'lucide-react';

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
  "Why don't programmers like nature? It has too many bugs and no debugging tool.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "What's a programmer's favorite place? Function junction.",
  "Why did the developer go broke? Because they lost their domain.",
  "What do you call a programmer from Finland? Nerdic.",
  "I would tell you a UDP joke, but you might not get it.",
  "Why was the JavaScript developer sad? Because they didn't know how to 'null' their feelings.",
  "The programmer got stuck in the shower because the instructions on the shampoo bottle said: Lather, Rinse, Repeat."
];

const Index: React.FC = () => {
  const [randomJoke, setRandomJoke] = useState('');

  useEffect(() => {
    // Get random joke
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    setRandomJoke(joke);

    // Welcome toast
    setTimeout(() => {
      toast("Welcome to my portfolio", {
        description: joke,
        duration: 5000
      });
    }, 2000);
  }, []);

  return (
    <div className="relative">
      <CursorEffect />
      <Navbar />
      <ThemeToggle />
      
      <main>
        <Hero />
        <Projects />
        <Education />
        <Contact />
      </main>
      
      <Footer />
      
      <motion.a
        href="#home"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-all z-30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
        aria-label="Back to top"
      >
        <Home className="text-primary-foreground w-5 h-5" />
      </motion.a>
    </div>
  );
};

export default Index;
