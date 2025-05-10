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
import { Home, Linkedin, Github, Instagram, Twitter } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

const Index: React.FC = () => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "click">("default");

  const handleMouseOver = useCallback(() => setCursorVariant("hover"), []);
  const handleMouseOut = useCallback(() => setCursorVariant("default"), []);
  const handleMouseDown = useCallback(() => setCursorVariant("click"), []);
  const handleMouseUp = useCallback(() => setCursorVariant("hover"), []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isMobile && !prefersReducedMotion) {
      const interactiveElements = document.querySelectorAll(
        "a, button, .interactive-project, [role='button']"
      );
      
      interactiveElements.forEach((element) => {
        element.addEventListener("mouseover", handleMouseOver);
        element.addEventListener("mouseout", handleMouseOut);
        element.addEventListener("mousedown", handleMouseDown);
        element.addEventListener("mouseup", handleMouseUp);
      });

      return () => {
        interactiveElements.forEach((element) => {
          element.removeEventListener("mouseover", handleMouseOver);
          element.removeEventListener("mouseout", handleMouseOut);
          element.removeEventListener("mousedown", handleMouseDown);
          element.removeEventListener("mouseup", handleMouseUp);
        });
      };
    }
  }, [isMobile, handleMouseOver, handleMouseOut, handleMouseDown, handleMouseUp]);

  useEffect(() => {
    const checkSidebar = () => {
      setShowSidebar(window.innerWidth >= 1024);
    };
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkSidebar, 100);
    };
    checkSidebar();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <CursorEffect cursorVariant={cursorVariant} />
      <Navbar showIcons={!showSidebar} />

      <main className="min-h-screen">
        <Hero />
        <TechnicalSkills />
        <WorkExperience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />

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
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 1.5 }}
              whileHover={{ scale: 1.2, y: -5 }}
              aria-label={item.label}
              style={{ boxShadow: "0 0 15px hsla(var(--primary), 0.4)" }}
            >
              {item.icon}
            </motion.a>
          ))}
          <motion.div
            className="w-px h-16 sm:h-24 bg-border/50 mx-auto mt-2"
            initial={{ height: 0 }}
            animate={{ height: isMobile ? 64 : 96 }}
            transition={{ delay: 2 }}
          />
        </div>
      )}

      {hasScrolled && !isMobile && (
        <motion.a
          href="#home"
          className="fixed bottom-4 right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-all z-50 border-2 border-primary/30 back-to-top interactive-element"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ y: -5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
          style={{ boxShadow: "0 0 20px hsla(var(--primary), 0.8)" }}
        >
          <Home
            className="text-primary-foreground w-4 h-4"
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut}
          />
        </motion.a>
      )}
    </div>
  );
};

export default Index;