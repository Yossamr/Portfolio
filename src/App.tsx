/**
 * Portfolio Website for Yossief Amr Shehata
 * Environment: React + Vite + Tailwind CSS + Framer Motion
 * (Drop-in ready for Next.js App Router layouts/pages with minor use client tweaks)
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValue, useTransform } from "motion/react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Cpu,
  Terminal,
  PenTool,
  ChevronRight,
  Briefcase,
  GraduationCap,
  ExternalLink,
  ArrowRight,
  Download,
  Sun,
  Moon,
} from "lucide-react";

// --- ANIMATION VARIANTS ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.5 } }
};

const fadeLeftItem = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "tween", ease: "easeOut", duration: 0.5 } }
};

const scaleItem = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { type: "tween", ease: "easeOut", duration: 0.5 } }
};

// --- DATA ---

const SKILLS = [
  {
    category: "Domain Skills",
    icon: <Cpu className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-accent" />,
    items: [
      "Embedded Systems Engineering",
      "Full-Stack Web Development",
      "IoT",
      "UI/UX Design",
      "Product Lifecycle Management",
      "Brand Strategy & Visual Identity",
      "E-commerce Management",
    ],
  },
  {
    category: "Technical Skills",
    icon: <Terminal className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-accent" />,
    items: [
      "C / Embedded C",
      "Next.js & TypeScript",
      "Python & JavaScript",
      "ESP32 & IoT Ecosystems",
      "Linux & Git",
      "Vercel & Shopify",
    ],
  },
  {
    category: "Soft Skills",
    icon: <PenTool className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-accent" />,
    items: [
      "Project Management",
      "Cross-functional Leadership",
      "Complex Problem Solving",
    ],
  },
];

const PROJECTS = [
  {
    title: "BingeMasr",
    description:
      "A comprehensive full-stack digital movie encyclopedia and streaming platform. Engineered core web architecture utilizing Next.js and integrated TMDB API for dynamic content fetching and data management. Designed an intuitive cinematic UI/UX.",
    tags: ["Next.js", "TMDB API", "UI/UX", "Cinematic"],
    github: "https://github.com/Yossamr",
    live: "",
  },
  {
    title: "Tactical Micro-Drone Signal Sensing",
    description:
      "Advanced IoT and signal processing initiative focused on developing a SIGINT-based tracking system. Engineered signal sensing architecture utilizing ESP32 nodes to detect and track local signals without Wi-Fi connections.",
    tags: ["ESP32", "SIGINT", "CSI Data", "Hardware"],
    github: "https://github.com/Yossamr",
    live: "",
  },
  {
    title: "Nexus (Smart Home)",
    description:
      "Engineered an offline-first smart home ecosystem using ESP32 microcontroller to monitor electricity consumption. Invented “Free Key” technology for wall switches and developed a proprietary 1KB protocol with 1ms response.",
    tags: ["ESP32", "Embedded C", "IoT", "ZMPT101B"],
    github: "https://github.com/Yossamr",
    live: "",
  },
  {
    title: "Masar Platform",
    description:
      "Highly specialized administrative platform tailored for strict student tracking and data management. Designed and structured core logic and backend architecture, improving administrative workflow efficiency by 25%.",
    tags: ["Next.js", "Supabase", "Education", "Systems"],
    github: "https://github.com/Yossamr",
    live: "",
  },
];

const EXPERIENCE = [
  {
    type: "work",
    title: "Embedded Systems Engineer",
    org: "Nexus",
    date: "March 2025 - Present",
    description: "Engineered an offline-first smart home ecosystem using ESP32 to monitor electricity consumption; Invented “Free Key” technology enabling dynamic reprogramming of switches; Developed a proprietary 1KB protocol achieving 1ms response times.",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    type: "work",
    title: "Software Developer / Project Lead",
    org: "Masar",
    date: "March 2026 - Present",
    description: "Led strategic pivot into “Masar,” a highly specialized administrative platform; Designed core logic and backend architecture improving workflow efficiency by 25%; Built full-stack app with Next.js and Supabase.",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    type: "work",
    title: "Founder & Creative Director",
    org: "Cutscene",
    date: "September 2025 - Present",
    description: "Managed complete apparel product lifecycle reaching $2,400 in initial brand revenue; Engineered automated file management workflow using Python and Selenium; Produced 8K upscaled vector-accurate visual assets.",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    type: "work",
    title: "Junior Graphic Designer",
    org: "ICPC EST Minya",
    date: "February 2025 - October 2025",
    description: "Developed comprehensive visual identity and brand guidelines for the student community; Established cohesive professional brand image that improved recognition by 20%; Delivered marketing collateral for remote events.",
    icon: <Briefcase className="w-5 h-5" />,
  },
];

const EDUCATION = [
  {
    type: "edu",
    title: "Bachelor of Science in Electrical and Communications Engineering",
    org: "Damanhour University",
    date: "September 2023 - Present",
    description: "GPA: 3.57 / 4.0. Relevant Coursework: Electrical Machines, Microprocessors, Digital Electronics.",
    icon: <GraduationCap className="w-5 h-5" />,
  },
];

const CERTIFICATIONS = [
  {
    title: "Damanhour City Hackathon",
    org: "Damanhour Hub",
    date: "2025-12",
  },
  {
    title: "The Seventh Computers and Information Olympics",
    org: "Faculty of Computers and Information",
    date: "2025-09",
  },
  {
    title: "Robotics Course",
    org: "Beheira Engineers Syndicate & MAKERS",
    date: "2025-02",
  },
  {
    title: "OSHA 10 Hours Course in Residential Construction",
    org: "Orascom Construction",
    date: "2024-08",
  },
];

// --- CREATIVE COMPONENTS ---
const HackerText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$*&%";
  const intervalRef = useRef<number | null>(null);

  const triggerEffect = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            if (letter === " ") return " ";
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );
      if (iteration >= text.length) {
        clearInterval(intervalRef.current!);
      }
      iteration += 1 / 2;
    }, 30);
  };

  const words = text.split(" ");
  let charIndexOffset = 0;

  return (
    <span onMouseEnter={triggerEffect} className={`cursor-default inline-block ${className || ""}`}>
      {words.map((word, wIndex) => {
        const wordNode = (
          <span key={wIndex} className="inline-block whitespace-nowrap">
            {word.split("").map((origChar, cIndex) => {
              const absoluteIndex = charIndexOffset + cIndex;
              return (
                <span key={cIndex} className="relative inline-flex justify-center">
                  <span className="opacity-0">{origChar}</span>
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 text-inherit">
                    {displayText[absoluteIndex]}
                  </span>
                </span>
              );
            })}
          </span>
        );
        charIndexOffset += word.length + 1; // +1 for the space
        return (
          <React.Fragment key={wIndex}>
            {wordNode}
            {wIndex < words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </span>
  );
};

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
       className="hidden md:flex fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99999] items-center justify-center -translate-x-1/2 -translate-y-1/2"
       animate={{
         x: mousePosition.x,
         y: mousePosition.y,
       }}
       transition={{ type: "tween", ease: "linear", duration: 0 }}
    >
      <motion.div 
        className="bg-slate-900 dark:bg-white rounded-full"
        style={{ opacity: 0.8 }}
        animate={{ 
          width: isHovering ? 48 : 12, 
          height: isHovering ? 48 : 12,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      />
    </motion.div>
  );
};

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
        document.body.style.overflow = "hidden";
    }
    
    // Start exit animation slightly before unmounting
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3200); 

    // Actually unmount and show main app
    const unmountTimer = setTimeout(() => {
       document.body.style.overflow = "auto";
       onComplete();
    }, 4000); 
    
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
      if (typeof window !== "undefined") {
        document.body.style.overflow = "auto";
      }
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 bg-bg-main z-[100000] flex flex-col justify-center items-center overflow-hidden"
        >
          {/* Deep Ambient Glow Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[800px] md:h-[800px] bg-accent/10 blur-[120px] md:blur-[180px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '3s' }}></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col items-center z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.7 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent w-full mb-6 sm:mb-8 md:mb-12"
            />
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-[8rem] font-space font-bold text-white tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.2em] text-center uppercase leading-tight flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 drop-shadow-2xl">
              <span>Welcome</span>
              <span className="text-accent/90">To My</span>
              <span>Portfolio</span>
            </h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
              className="mt-6 sm:mt-8 md:mt-12 text-slate-400 font-mono tracking-[0.15em] sm:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm uppercase flex items-center justify-center gap-3 sm:gap-6 w-full opacity-80"
            >
              <span className="hidden sm:block w-8 sm:w-16 md:w-32 h-[1px] bg-slate-400/30"></span>
              <span className="text-center w-full sm:w-auto">Youssief Amr Shehata</span>
              <span className="hidden sm:block w-8 sm:w-16 md:w-32 h-[1px] bg-slate-400/30"></span>
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.7 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent w-full mt-6 sm:mt-8 md:mt-12"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const HeroImageCard = ({ projectsCount }: { projectsCount: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-200, 200], [10, -10]);
  const rotateY = useTransform(x, [-200, 200], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="w-full h-[300px] sm:h-[380px] md:h-[550px] max-w-md mx-auto lg:max-w-md lg:ml-auto z-20 mt-8 lg:mt-0">
      <motion.div 
         style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         className="w-full h-full rounded-3xl relative transition-all duration-300 ease-out group"
      >
         <div className="absolute inset-0 rounded-3xl overflow-hidden surface">
           <img 
             src="https://media.licdn.com/dms/image/v2/D4D03AQEBjR4O9FITfg/profile-displayphoto-crop_800_800/B4DZgsnd.VHsAI-/0/1753095226975?e=1780531200&v=beta&t=SnkWXvLcMB4NiEtcslHrqm3A8RKtYONUL4_ysbKDg-4" 
             alt="Yossief Amr Shehata" 
             className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-bg-main/90 via-bg-main/20 to-transparent pointer-events-none" />
         </div>
         
         <motion.div style={{ transform: "translateZ(60px)" }} className="absolute bottom-6 left-6 right-6 flex justify-between text-white drop-shadow-md z-10 pointer-events-none">
            <div>
               <p className="font-bold font-space text-lg text-accent">1+ years</p>
               <p className="text-sm opacity-80">Experience</p>
            </div>
            <div className="text-right">
               <p className="font-bold font-space text-lg text-accent">{projectsCount} projects</p>
               <p className="text-sm opacity-80">Completed</p>
            </div>
         </motion.div>
      </motion.div>
    </div>
  );
};

// --- APP COMPONENT ---

export default function App() {
  const [booting, setBooting] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem('booted');
    }
    return true;
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") !== "light";
    }
    return true;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [activeSkillTab, setActiveSkillTab] = useState(0);
  const [activeJourneyTab, setActiveJourneyTab] = useState<'experience' | 'education' | 'certs'>('experience');
  const [activeProjectTab, setActiveProjectTab] = useState(0);

  const handleBootComplete = () => {
    sessionStorage.setItem('booted', 'true');
    setBooting(false);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/mlgvegrd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch (err) {
      setFormStatus("error");
    }
  };

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

  return (
    <>
    <CustomCursor />
    {booting && <BootSequence onComplete={handleBootComplete} />}
    <div className="min-h-screen relative font-sans" aria-hidden={booting ? "true" : "false"}>
      {/* Background */}
      <div className="fixed inset-0 z-[-1] bg-bg-main overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-white/5 blur-[120px] animate-float pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-white/10 blur-[150px] animate-float-delayed pointer-events-none" />
      </div>

      {/* --- NAVBAR --- */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-bg-main/80 backdrop-blur-md py-4 border-b border-white/5 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex flex-col">
            <a href="#" className="font-bold text-xl tracking-tight text-white flex flex-col font-space">
              <HackerText text="Yossief Amr." />
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
            <button
              onClick={() => setIsDark(!isDark)}
              className="text-slate-900 dark:text-white hover:text-accent transition-colors p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a
              href="#contact"
              className="px-5 py-2.5 bg-accent text-bg-main font-semibold rounded-full hover:bg-accent-hover transition-all"
            >
              Start Your Project &rarr;
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setIsDark(!isDark)}
              className="text-slate-900 dark:text-white p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="text-slate-300 p-2 z-50 relative focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden fixed inset-0 top-[72px] bg-bg-main/95 backdrop-blur-xl border-t border-white/5 overflow-hidden z-40 h-[calc(100dvh-72px)] flex flex-col"
            >
              <div className="flex flex-col p-8 gap-8 items-center justify-center h-full pb-32">
                {NAV_LINKS.map((link, idx) => (
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-space font-bold text-slate-300 hover:text-accent transition-colors"
                  >
                    {link}
                  </motion.a>
                ))}
                
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.1 }}
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-8 px-8 py-4 bg-accent text-bg-main font-bold rounded-full hover:bg-accent-hover transition-all text-xl"
                >
                  Start Your Project
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-12 md:pt-48 md:pb-32 px-4 sm:px-6 flex items-center min-h-[85svh] lg:min-h-[90svh]">
        <div className="max-w-7xl mx-auto w-full flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-8 items-center z-10">
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.h1
              variants={fadeUpItem}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-space text-white tracking-tight leading-[1.12] mb-6"
            >
              Engineering the Future of IoT & Full-Stack Systems.
            </motion.h1>

            <motion.p
              variants={fadeUpItem}
              className="text-base sm:text-lg text-slate-400 mb-10 max-w-lg leading-relaxed px-4 md:px-0"
            >
              Electrical Engineering student at Damanhour University specializing in embedded systems and full-stack development. Proven ability to deliver end-to-end technical products from concept to deployment.
            </motion.p>

            <motion.div
              variants={fadeUpItem}
              className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto"
            >
              <a
                href="https://drive.google.com/uc?export=download&id=1rcAjdJx9Smauqat4RujtFR1KtFgyIQVw"
                download="Yossief_Amr_CV.pdf"
                className="bg-accent text-bg-main font-bold px-8 py-4 md:py-3.5 rounded-full hover:bg-accent-hover transition-all flex items-center justify-center gap-2 group w-full sm:w-auto text-lg md:text-base shadow-xl shadow-accent/20"
              >
                Download CV <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </a>
              <a
                href="#projects"
                className="border border-white/20 text-white font-semibold px-8 py-4 md:py-3.5 rounded-full hover:bg-white/5 transition-all flex items-center justify-center w-full sm:w-auto text-lg md:text-base backdrop-blur-sm"
              >
                View My Work
              </a>
            </motion.div>
          </motion.div>

          <HeroImageCard projectsCount={PROJECTS.length} />
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-12 md:py-24 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col lg:flex-row gap-12 items-center"
          >
            <div className="w-full lg:w-1/2">
               <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">My Story & Experience</h3>
               <h2 className="text-3xl md:text-5xl font-bold font-space text-white mb-6 leading-tight">
                 <HackerText text="Bridging Hardware & Web." />
               </h2>
               <div className="space-y-4 text-slate-400 text-base leading-relaxed">
                 <p>
                   I am an Electrical Engineering student at Damanhour University, specializing in embedded systems and full-stack development. My expertise lies in crafting seamless integrations between hardware components and modern digital interfaces.
                 </p>
                 <p>
                   With a background in IoT ecosystems and UI/UX design, I focus on delivering end-to-end technical products that are both functional and visually compelling.
                 </p>
               </div>
               
               <div className="mt-8 pt-6 border-t border-white/10 flex gap-12">
                  <div>
                     <p className="text-sm text-slate-500 mb-1">Languages</p>
                     <p className="font-medium text-white">Arabic (Native), English (Fluent)</p>
                  </div>
               </div>
            </div>

            <motion.div 
               whileHover={{ scale: 1.02 }}
               className="hidden lg:block w-full lg:w-1/2 rounded-3xl overflow-hidden h-[250px] sm:h-[350px] md:h-[400px] relative surface mt-8 lg:mt-0"
            >
               <img 
                 src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" 
                 alt="Workspace" 
                 className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700" 
               />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className="py-12 md:py-24 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpItem}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-space text-white mb-4">
              <HackerText text="Core Arsenal" />
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">The tools and technologies I use to build scalable products.</p>
          </motion.div>

          {/* Desktop Grid (Hidden on Mobile) */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="hidden md:grid md:grid-cols-3 gap-6"
          >
            {SKILLS.map((set, idx) => (
              <motion.div
                key={set.category}
                variants={scaleItem}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="surface surface-hover p-8 group relative overflow-hidden"
              >
                <div className="relative z-10 text-accent mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                   {set.icon}
                </div>
                <h3 className="text-xl font-bold font-space text-white mb-6 group-hover:text-accent transition-colors">
                  {set.category}
                </h3>
                <ul className="space-y-4">
                  {set.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-slate-300 text-sm transition-colors group-hover:text-white">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white group-hover:bg-accent transition-colors shrink-0" />
                      <span className="leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Interactive Tabs View */}
          <div className="md:hidden flex flex-col gap-4">
             <div className="flex bg-white/5 border border-white/10 rounded-full p-1 overflow-x-auto hide-scrollbar w-full max-w-sm mx-auto">
                {SKILLS.map((set, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSkillTab(idx)}
                    className={`flex-1 text-xs py-3 px-2 rounded-full transition-all font-space whitespace-nowrap ${
                      activeSkillTab === idx ? "bg-accent text-bg-main font-bold shadow-lg" : "text-slate-400"
                    }`}
                  >
                    {set.category.split(" & ")[0]}
                  </button>
                ))}
             </div>
             
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkillTab}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="surface p-6 rounded-3xl relative mt-2"
                >
                  <div className="text-accent mb-4">
                    {SKILLS[activeSkillTab].icon}
                  </div>
                  <h3 className="text-xl font-bold font-space text-white mb-4">
                    {SKILLS[activeSkillTab].category}
                  </h3>
                  <ul className="space-y-3">
                    {SKILLS[activeSkillTab].items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-300 text-[14px]">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-12 md:py-24 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
             initial="hidden"
             whileInView="show"
             viewport={{ once: true, margin: "-100px" }}
             variants={fadeUpItem}
             className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6"
          >
            <div>
              <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Featured Work</h3>
              <h2 className="text-3xl md:text-5xl font-bold font-space text-white"><HackerText text="Recent Projects" /></h2>
            </div>
            <span className="text-sm font-medium text-slate-500 mt-4 md:mt-0">{String(PROJECTS.length).padStart(2, "0")} Total</span>
          </motion.div>

          {/* Desktop Projects Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="hidden md:grid md:grid-cols-2 gap-6"
          >
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.title}
                variants={scaleItem}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group surface surface-hover p-8 flex flex-col justify-between h-full"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="font-bold text-2xl font-space text-white group-hover:text-accent transition-colors pr-4">
                      {project.title}
                    </h4>
                    <span className="text-sm font-medium opacity-50 text-slate-500">0{idx + 1}</span>
                  </div>
                  <p className="text-base text-slate-400 mb-8 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
                
                <div className="relative z-10 flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{ 
                          y: -2, 
                          scale: 1.05,
                        }}
                        className="px-3 py-1.5 bg-white/5 rounded-full text-xs font-medium text-slate-300 border border-white/5 hover:border-accent/40 hover:text-accent hover:bg-accent/5 cursor-default transition-colors shadow-sm"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex gap-3 shrink-0 ml-4">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Interactive Project Cards View */}
          <div className="md:hidden flex flex-col gap-6">
             <div className="flex bg-white/5 border border-white/10 rounded-full p-1 overflow-x-auto hide-scrollbar w-full max-w-[200px] mx-auto">
               {PROJECTS.map((_, idx) => (
                 <button
                   key={idx}
                   onClick={() => setActiveProjectTab(idx)}
                   className={`flex-1 text-xs py-2 px-2 rounded-full transition-all font-space whitespace-nowrap ${
                     activeProjectTab === idx ? "bg-accent text-bg-main font-bold shadow-lg" : "text-slate-400"
                   }`}
                   aria-label={`View Project ${idx + 1}`}
                 >
                   0{idx + 1}
                 </button>
               ))}
             </div>
             
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeProjectTab}
                 initial={{ opacity: 0, scale: 0.95, y: 10 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95, y: -10 }}
                 transition={{ duration: 0.2 }}
                 className="surface p-6 rounded-3xl flex flex-col justify-between min-h-[280px]"
               >
                 <div className="relative z-10">
                   <div className="flex justify-between items-start mb-4">
                     <h4 className="font-bold text-xl font-space text-white pr-4 leading-tight border-l-2 border-accent pl-3">
                       {PROJECTS[activeProjectTab].title}
                     </h4>
                   </div>
                   <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                     {PROJECTS[activeProjectTab].description}
                   </p>
                 </div>
                 
                 <div className="relative z-10 flex flex-col mt-auto pt-4 border-t border-white/5 gap-4">
                   <div className="flex flex-wrap gap-2">
                     {PROJECTS[activeProjectTab].tags.map((tag) => (
                       <span
                         key={tag}
                         className="px-3 py-1.5 bg-white/5 rounded-full text-[11px] font-medium text-slate-300 border border-white/5 active:border-accent/30 active:text-accent shadow-sm"
                       >
                         {tag}
                       </span>
                     ))}
                   </div>
                   <div className="flex gap-2 self-end mt-2">
                     {PROJECTS[activeProjectTab].github && (
                       <a href={PROJECTS[activeProjectTab].github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                         <Github className="w-4 h-4" />
                       </a>
                     )}
                     {PROJECTS[activeProjectTab].live && (
                       <a href={PROJECTS[activeProjectTab].live} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                         <ExternalLink className="w-4 h-4" />
                       </a>
                     )}
                   </div>
                 </div>
               </motion.div>
             </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 flex flex-col items-center justify-center text-center"
          >
            <p className="text-slate-400 mb-6 font-space">Interested in seeing more or working together?</p>
            <a 
              href="#contact" 
              className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg-main font-bold rounded-full hover:scale-105 transition-all active:scale-95 shadow-xl shadow-accent/20"
            >
              Let's Build Something
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- EXPERIENCE & EDUCATION --- */}
      <section id="experience" className="py-12 md:py-24 px-4 sm:px-6 relative border-t border-white/5 bg-bg-main">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpItem}
            className="mb-12 md:mb-16 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-space text-white mb-4">
              <HackerText text="My Journey" />
            </h2>
            <p className="text-slate-400">Experience & Education</p>
          </motion.div>

          {/* Mobile Tabbed Timeline View */}
          <div className="md:hidden flex flex-col gap-6">
             <div className="flex bg-white/5 border border-white/10 rounded-full p-1 w-full max-w-lg mx-auto">
               <button 
                 onClick={() => setActiveJourneyTab('experience')} 
                 className={`flex-1 py-3 text-xs font-space rounded-full transition-all ${activeJourneyTab === 'experience' ? "bg-accent text-bg-main font-bold shadow" : "text-slate-400"}`}
               >
                 Work
               </button>
               <button 
                 onClick={() => setActiveJourneyTab('education')} 
                 className={`flex-1 py-3 text-xs font-space rounded-full transition-all ${activeJourneyTab === 'education' ? "bg-accent text-bg-main font-bold shadow" : "text-slate-400"}`}
               >
                 Edu
               </button>
               <button 
                 onClick={() => setActiveJourneyTab('certs')} 
                 className={`flex-1 py-3 text-xs font-space rounded-full transition-all ${activeJourneyTab === 'certs' ? "bg-accent text-bg-main font-bold shadow" : "text-slate-400"}`}
               >
                 Certs
               </button>
             </div>
             
             <div className="min-h-[650px]">
               <AnimatePresence mode="wait">
                 {activeJourneyTab === 'experience' ? (
                   <motion.div 
                     key="experience" 
                     initial={{ opacity: 0, x: -10 }} 
                     animate={{ opacity: 1, x: 0 }} 
                     exit={{ opacity: 0, x: 10 }}
                     className="space-y-6"
                   >
                   {EXPERIENCE.map((exp, idx) => (
                      <div key={idx} className="relative group p-[1px] rounded-[17px] overflow-hidden mb-2">
                        <div className="absolute inset-0 bg-white/10 z-0 group-hover:opacity-0 transition-opacity"></div>
                        <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_70%,var(--color-accent)_100%)] transition-opacity duration-500 z-0 pointer-events-none"></div>
                        <div className="relative z-10 bg-bg-card group-hover:bg-bg-card-hover p-6 rounded-2xl border-none border-l-[4px] border-l-accent transition-colors w-full h-full">
                          <div className="flex justify-between items-start mb-2">
                             <h4 className="text-lg font-bold font-space text-white mb-1">{exp.title}</h4>
                          </div>
                          <div className="text-sm font-medium text-accent mb-2">
                            {exp.org} • <span className="text-slate-500 font-normal">{exp.date}</span>
                          </div>
                          {exp.description && (
                            <p className="text-sm text-slate-300 leading-relaxed">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      </div>
                   ))}
                 </motion.div>
               ) : activeJourneyTab === 'education' ? (
                 <motion.div 
                   key="education" 
                   initial={{ opacity: 0, x: -10 }} 
                   animate={{ opacity: 1, x: 0 }} 
                   exit={{ opacity: 0, x: 10 }}
                   className="space-y-6"
                 >
                   {EDUCATION.map((edu, idx) => (
                      <div key={idx} className="relative group p-[1px] rounded-[17px] overflow-hidden mb-2">
                        <div className="absolute inset-0 bg-white/10 z-0 group-hover:opacity-0 transition-opacity"></div>
                        <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_70%,var(--color-accent)_100%)] transition-opacity duration-500 z-0 pointer-events-none"></div>
                        <div className="relative z-10 bg-bg-card group-hover:bg-bg-card-hover p-6 rounded-2xl border-none border-l-[4px] border-l-slate-500 group-hover:border-l-accent transition-colors w-full h-full">
                          <h4 className="text-lg font-bold font-space text-white mb-1">{edu.title}</h4>
                          <div className="text-sm font-medium text-slate-300 mb-2">
                            {edu.org}
                          </div>
                          <p className="text-sm font-medium text-slate-500 mb-1">{edu.date}</p>
                          {edu.description && (
                            <p className="text-xs text-slate-400 italic">{edu.description}</p>
                          )}
                        </div>
                      </div>
                   ))}
                 </motion.div>
               ) : (
                 <motion.div 
                   key="certs" 
                   initial={{ opacity: 0, x: -10 }} 
                   animate={{ opacity: 1, x: 0 }} 
                   exit={{ opacity: 0, x: 10 }}
                   className="space-y-6"
                 >
                   {CERTIFICATIONS.map((cert, idx) => (
                      <div key={idx} className="relative group p-[1px] rounded-[17px] overflow-hidden mb-2">
                        <div className="absolute inset-0 bg-white/10 z-0 group-hover:opacity-0 transition-opacity"></div>
                        <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_70%,var(--color-accent)_100%)] transition-opacity duration-500 z-0 pointer-events-none"></div>
                        <div className="relative z-10 bg-bg-card group-hover:bg-bg-card-hover p-6 rounded-2xl border-none border-l-[4px] border-l-accent transition-colors w-full h-full">
                          <h4 className="text-lg font-bold font-space text-white mb-1">{cert.title}</h4>
                          <div className="text-sm font-medium text-slate-300 mb-1">
                            {cert.org}
                          </div>
                          <p className="text-sm font-medium text-slate-500">{cert.date}</p>
                        </div>
                      </div>
                   ))}
                 </motion.div>
               )}
             </AnimatePresence>
             </div>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden md:block relative border-l border-white/10 pl-12 ml-2 space-y-16">
            
            {/* Experience Block */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <motion.h3 variants={fadeLeftItem} className="text-xl font-bold font-space text-accent mb-8">Work Experience</motion.h3>
              <div className="space-y-6">
                {EXPERIENCE.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeLeftItem}
                    whileHover={{ x: 10, transition: { duration: 0.3 } }}
                    className="relative group mb-8"
                  >
                    <div className="absolute left-[-52px] top-[30px] h-2.5 w-2.5 rounded-full bg-slate-900 dark:bg-white group-hover:bg-accent group-hover:scale-125 transition-all hidden md:block z-20"></div>
                     
                    <div className="relative p-[1px] rounded-3xl overflow-hidden shadow-sm">
                        <div className="absolute inset-0 bg-white/10 z-0 group-hover:opacity-0 transition-opacity"></div>
                        <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_70%,var(--color-accent)_100%)] transition-opacity duration-500 z-0 pointer-events-none"></div>
                        
                        <div className="relative z-10 bg-bg-card group-hover:bg-bg-card-hover p-8 md:p-8 rounded-[23px] transition-colors w-full h-full border-none border-l-[4px]">
                           <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                              <h4 className="text-lg font-bold font-space text-white mb-1 group-hover:text-accent transition-colors">{exp.title}</h4>
                              <p className="text-sm font-medium text-slate-500 mb-2 md:mb-0 whitespace-nowrap">{exp.date}</p>
                           </div>
                          <div className="text-sm font-medium text-slate-400 mb-4">
                            {exp.org}
                          </div>
                          {exp.description && (
                            <p className="text-sm text-slate-300 leading-relaxed">
                              {exp.description}
                            </p>
                          )}
                        </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education & Certs Blocks */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="relative pt-8"
            >
              <div className="grid md:grid-cols-2 gap-12">
                 <div>
                    <motion.h3 variants={fadeLeftItem} className="text-xl font-bold font-space text-slate-400 mb-8 border-l-2 border-slate-500 pl-4 uppercase tracking-widest text-sm">Education</motion.h3>
                    <div className="space-y-8">
                       {EDUCATION.map((edu, idx) => (
                          <motion.div key={idx} variants={fadeLeftItem} className="relative">
                            <div className="absolute left-[-60px] top-[10px] h-2 w-2 rounded-full bg-slate-700"></div>
                            <h4 className="text-lg font-bold font-space text-white mb-1">{edu.title}</h4>
                            <p className="text-sm font-medium text-slate-300 mb-1">{edu.org}</p>
                            <p className="text-xs text-slate-500 mb-3">{edu.date}</p>
                            {edu.description && <p className="text-sm text-slate-400 leading-relaxed italic">{edu.description}</p>}
                          </motion.div>
                       ))}
                    </div>
                 </div>
                 <div>
                    <motion.h3 variants={fadeLeftItem} className="text-xl font-bold font-space text-slate-400 mb-8 border-l-2 border-accent pl-4 uppercase tracking-widest text-sm">Certifications</motion.h3>
                    <div className="space-y-6">
                       {CERTIFICATIONS.map((cert, idx) => (
                          <motion.div key={idx} variants={fadeLeftItem} className="relative">
                            <div className="absolute left-[-60px] top-[10px] h-2 w-2 rounded-full bg-accent/40"></div>
                            <h4 className="text-base font-bold font-space text-white mb-0.5">{cert.title}</h4>
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-slate-400">{cert.org}</p>
                              <p className="text-xs text-slate-600 font-mono">{cert.date}</p>
                            </div>
                          </motion.div>
                       ))}
                    </div>
                 </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-12 md:py-24 px-4 sm:px-6 relative border-t border-white/5 bg-bg-main">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center md:items-start relative z-10">
          
          <div className="w-full md:w-1/2">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              <motion.h3 variants={fadeUpItem} className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">Contact</motion.h3>
              <motion.h2 variants={fadeUpItem} className="text-4xl md:text-5xl font-bold font-space text-white mb-6">
                <HackerText text="Let's Build " /> <br/>
                <span className="text-accent"><HackerText text="Together." /></span>
              </motion.h2>
              <motion.p variants={fadeUpItem} className="text-base text-slate-400 mb-8 max-w-sm">
                Open to collaborations, inquiries, and turning ambitious concepts into polished products.<br/><br/>
                <span className="text-white hover:text-accent transition-colors"><a href="mailto:yossplays9714@gmail.com">yossplays9714@gmail.com</a></span><br/>
                <span className="text-white hover:text-accent transition-colors">+20 101 886 6315</span>
              </motion.p>
              
              <motion.div variants={fadeUpItem} className="flex gap-4">
                <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} href="https://github.com/Yossamr" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full surface flex items-center justify-center text-slate-300 hover:border-accent hover:text-accent transition-colors">
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} href="https://linkedin.com/in/yossief-amr-720696239" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full surface flex items-center justify-center text-slate-300 hover:border-accent hover:text-accent transition-colors">
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} href="mailto:yossplays9714@gmail.com" className="w-12 h-12 rounded-full surface flex items-center justify-center text-slate-300 hover:border-accent hover:text-accent transition-colors">
                  <Mail className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          <div className="w-full md:w-1/2">
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              className="surface p-8"
              onSubmit={handleFormSubmit}
            >
              <div className="space-y-4">
                {formStatus === "success" && (
                  <div className="p-4 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 text-sm mb-4 text-center">
                    Message sent! I'll get back to you soon.
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm mb-4 text-center">
                    Something went wrong. Please email me directly.
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-bg-card border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    placeholder="John Doe"
                    disabled={formStatus === "loading"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-bg-card border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    placeholder="john@example.com"
                    disabled={formStatus === "loading"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-bg-card border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                    placeholder="What's on your mind?"
                    disabled={formStatus === "loading"}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full px-6 py-4 bg-accent text-bg-main font-bold text-sm rounded-xl mt-4 hover:bg-accent-hover transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === "loading" ? "Sending..." : (
                    <>Send Message <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/></>
                  )}
                </button>
              </div>
            </motion.form>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center border-t border-white/5 text-slate-500 text-sm bg-bg-main mt-auto">
        <p>© {new Date().getFullYear()} Yossief Amr Shehata Abd-Elhady. All rights reserved.</p>
        <p className="mt-2 text-[10px] opacity-50">Built with React + Vite + Tailwind</p>
      </footer>
    </div>
    </>
  );
}
