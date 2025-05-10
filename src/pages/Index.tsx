import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import CursorEffect from "../components/CursorEffect";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import WorkExperience from "../components/WorkExperience";
import Education from "../components/Education";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import TechnicalSkills from "../components/TechnicalSkills";
import { toast } from "sonner";
import {
  Home,
  Linkedin,
  Github,
  Instagram,
  Twitter,
  Gamepad,
} from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
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
  "The programmer got stuck in the shower because the instructions on the shampoo bottle said: Lather, Rinse, Repeat.",
];

// Gaming jokes - add some gaming themed humor
const gamingJokes = [
  "I would tell you a joke about lag, but you wouldn't get it until later.",
  "Why don't developers play video games? Because they prefer to debug than to play.",
  "What do you call a game developer's favorite coffee? Java.",
  "Why was the gamer always broke? Too many micro-transactions.",
  "How many gamers does it take to change a light bulb? None, they'll do it when the next patch comes out.",
];
const Index: React.FC = () => {
  const [randomJoke, setRandomJoke] = useState("");
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<
    "default" | "hover" | "click"
  >("default");

  // Use useCallback to improve performance
  const handleMouseOver = useCallback(() => setCursorVariant("hover"), []);
  const handleMouseOut = useCallback(() => setCursorVariant("default"), []);
  const handleMouseDown = useCallback(() => setCursorVariant("click"), []);
  const handleMouseUp = useCallback(() => setCursorVariant("hover"), []);
  useEffect(() => {
    // Performance optimization - reduce animations on mobile
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Add event listener for cursor hover effects - only on desktop
    if (!isMobile && !prefersReducedMotion) {
      // Add these event listeners to interactive elements
      const interactiveElements = document.querySelectorAll(
        "a, button, .interactive-project"
      );
      interactiveElements.forEach((element) => {
        element.addEventListener("mouseover", handleMouseOver);
        element.addEventListener("mouseout", handleMouseOut);
        element.addEventListener("mousedown", handleMouseDown);
        element.addEventListener("mouseup", handleMouseUp);
      });

      // Clean up cursor event listeners
      return () => {
        interactiveElements.forEach((element) => {
          element.removeEventListener("mouseover", handleMouseOver);
          element.removeEventListener("mouseout", handleMouseOut);
          element.removeEventListener("mousedown", handleMouseDown);
          element.removeEventListener("mouseup", handleMouseUp);
        });
      };
    }
  }, [
    isMobile,
    handleMouseOver,
    handleMouseOut,
    handleMouseDown,
    handleMouseUp,
  ]);
  useEffect(() => {
    // Check window size for sidebar visibility with debounced resize handler
    const checkSidebar = () => {
      setShowSidebar(window.innerWidth >= 1024); // lg breakpoint in Tailwind
    };
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkSidebar, 100);
    };
    checkSidebar();
    window.addEventListener("resize", handleResize);

    // Get random joke - Include gaming jokes if they're on desktop
    const allJokes = [...jokes, ...gamingJokes];
    const joke = allJokes[Math.floor(Math.random() * allJokes.length)];
    setRandomJoke(joke);

    // Welcome toast with slight delay for better UX - don't show on slow connections
    // Fix TypeScript error by checking for connection property safely
    const isSlowConnection =
      "connection" in navigator &&
      ((navigator as any).connection?.effectiveType === "2g" ||
        (navigator as any).connection?.saveData);
    if (!isSlowConnection) {
      const toastTimer = setTimeout(() => {
        toast("Welcome to my portfolio", {
          description: joke,
          duration: 7000,
          position: isMobile ? "bottom-center" : "bottom-right",
          // Position based on screen size
          className: "welcome-toast fixed-toast",
        });
      }, 2000);
      return () => clearTimeout(toastTimer);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);
  useEffect(() => {
    // Check if page has scrolled with passive event listener for better performance
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="relative">
      <CursorEffect cursorVariant={cursorVariant} />
      <Navbar showIcons={!showSidebar} />

      <main>
        <Hero />
        <TechnicalSkills />
        <WorkExperience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />

      {/* Fixed social media sidebar - Only visible on desktop */}
      {showSidebar && (
        <div className="fixed left-4 sm:left-6 bottom-1/2 transform translate-y-1/2 flex-col gap-4 sm:gap-5 z-30 hidden lg:flex">
          {[
            {
              icon: <Linkedin className="w-5 h-5" />,
              href: "https://www.linkedin.com/in/charan051203/",
              label: "LinkedIn",
            },
            {
              icon: <Github className="w-5 h-5" />,
              href: "https://github.com/Charan051203",
              label: "GitHub",
            },
            {
              icon: <Instagram className="w-5 h-5" />,
              href: "https://www.instagram.com/chrn_._/",
              label: "Instagram",
            },
            {
              icon: <Twitter className="w-5 h-5" />,
              href: "https://x.com/charan_5123",
              label: "Twitter",
            },
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glassmorphism flex items-center justify-center text-foreground hover:text-primary hover:border-primary border border-border/50 transition-all"
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: i * 0.1 + 1.5,
              }}
              whileHover={{
                scale: 1.2,
                y: -5,
              }}
              aria-label={item.label}
              style={{
                boxShadow: "0 0 15px hsla(var(--primary), 0.4)",
              }}
            >
              {item.icon}
            </motion.a>
          ))}
          <motion.div
            className="w-px h-16 sm:h-24 bg-border/50 mx-auto mt-2"
            initial={{
              height: 0,
            }}
            animate={{
              height: isMobile ? 64 : 96,
            }}
            transition={{
              delay: 2,
            }}
          />
        </div>
      )}

      {/* Back to top button - Enhanced visibility for mobile */}
      <motion.a
        href="#home"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-5 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-all z-30 border-2 border-primary/30 back-to-top"
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: hasScrolled ? 1 : 0,
          scale: hasScrolled ? 1 : 0.8,
          y: hasScrolled ? 0 : 20,
        }}
        transition={{
          duration: 0.3,
        }}
        whileHover={{
          y: -5,
        }}
        aria-label="Back to top"
        style={{
          boxShadow: "0 0 20px hsla(var(--primary), 0.8)",
        }}
      >
        <Home className="text-primary-foreground w-4 h-4 sm:w-5 sm:h-5" />
      </motion.a>
    </div>
  );
};
export default Index;
