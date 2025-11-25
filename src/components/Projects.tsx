import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Github, ArrowUpRight, Zap, Terminal } from "lucide-react";

interface projects {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  links: { live: string; code: string };
  color: string;
}

interface bgVariants {
  cyan: string;
  purple: string;
  emerald: string;
}

// --- PARALLAX CARD COMPONENT ---
const ProjectCard = ({
  project,
  index,
}: {
  project: projects;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Parallax Logic: The number moves based on scroll position relative to this card
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // The number moves slower than the card (Parallax)
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  // Dynamic Color Logic for the Numbers
  const getColor = (colorName: string) => {
    switch (colorName) {
      case "cyan":
        return "6,182,212";
      case "purple":
        return "168,85,247";
      case "emerald":
        return "16,185,129";
      default:
        return "255,255,255";
    }
  };

  const rgb = getColor(project.color);
  const getColorHex = (c: string) => {
    if (c === "cyan") return "#06b6d4";
    if (c === "purple") return "#a855f7";
    return "#10b981";
  };
  const glowColor = getColorHex(project.color);

  // Existing variants (Kept as requested)
  const backgroundVariants: bgVariants = {
    cyan: "bg-cyan-500",
    purple: "bg-purple-500",
    emerald: "bg-emerald-500",
  };
  const borderVariants: bgVariants = {
    cyan: "border-cyan-500",
    purple: "border-purple-500",
    emerald: "border-emerald-500",
  };
  const textVariants: bgVariants = {
    cyan: "text-cyan-400",
    purple: "text-purple-400",
    emerald: "text-emerald-400",
  };

  // --- NEW: Explicit Style Map for Transparencies & Hovers ---
  // This solves the Tailwind scanning issue by writing out the full class names.
  const styleConfig = {
    cyan: {
      btnBg: "bg-cyan-500/10",
      btnBorder: "border-cyan-500/20",
      btnHoverBorder: "hover:border-cyan-500/50",
      techHoverBorder: "hover:border-cyan-500/30",
      techHoverText: "hover:text-cyan-400",
      scanline: "bg-cyan-400/80",
    },
    purple: {
      btnBg: "bg-purple-500/10",
      btnBorder: "border-purple-500/20",
      btnHoverBorder: "hover:border-purple-500/50",
      techHoverBorder: "hover:border-purple-500/30",
      techHoverText: "hover:text-purple-400",
      scanline: "bg-purple-400/80",
    },
    emerald: {
      btnBg: "bg-emerald-500/10",
      btnBorder: "border-emerald-500/20",
      btnHoverBorder: "hover:border-emerald-500/50",
      techHoverBorder: "hover:border-emerald-500/30",
      techHoverText: "hover:text-emerald-400",
      scanline: "bg-emerald-400/80",
    },
  };

  const activeStyle =
    styleConfig[project.color as keyof bgVariants] || styleConfig.cyan;

  return (
    <section
      ref={ref}
      className={`relative z-10 flex flex-col lg:flex-row gap-16 items-center mb-40 ${
        index % 2 === 1 ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* --- THE GIANT CYBERPUNK NUMBER (FIXED VISIBILITY) --- */}
      <motion.div
        style={{ y, opacity }}
        className={`absolute -top-16 md:-top-28 ${
          index % 2 === 1 ? "-right-6 md:-right-12" : "-left-6 md:-left-12"
        }
        text-[10rem] md:text-[16rem] font-black leading-none z-0 select-none pointer-events-none`}
      >
        {/* Double Layer for Depth */}
        <span
          className="absolute inset-0 blur-lg opacity-30"
          style={{
            color: `rgba(${rgb}, 0.2)`,
            fontFamily: "monospace",
          }}
        >
          {project.id}
        </span>
        <span
          style={{
            WebkitTextStroke: `2px rgba(${rgb}, 0.6)`,
            color: `rgba(${rgb}, 0.05)`,
            fontFamily: "monospace",
            filter: "drop-shadow(0 0 20px rgba(0,0,0,0.5))",
          }}
        >
          {project.id}
        </span>
      </motion.div>

      {/* --- IMAGE FRAME (SCANNER EFFECT) --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-3/5 relative z-10 group"
      >
        {/* >>>> MECHANICAL CORNER BRACKETS (The "Heavy" Borders) <<<< */}
        {/* Top Left */}
        <div
          className={`absolute -top-2 -left-2 w-12 h-12 border-t-4 border-l-4 ${
            borderVariants[project.color as keyof bgVariants]
          } z-30 transition-all duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2`}
          style={{ boxShadow: `0 0 15px ${glowColor}` }}
        />
        {/* Top Right */}
        <div
          className={`absolute -top-2 -right-2 w-12 h-12 border-t-4 border-r-4 ${
            borderVariants[project.color as keyof bgVariants]
          } z-30 transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2`}
          style={{ boxShadow: `0 0 15px ${glowColor}` }}
        />
        {/* Bottom Left */}
        <div
          className={`absolute -bottom-2 -left-2 w-12 h-12 border-b-4 border-l-4 ${
            borderVariants[project.color as keyof bgVariants]
          } z-30 transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2`}
          style={{ boxShadow: `0 0 15px ${glowColor}` }}
        />
        {/* Bottom Right */}
        <div
          className={`absolute -bottom-2 -right-2 w-12 h-12 border-b-4 border-r-4 ${
            borderVariants[project.color as keyof bgVariants]
          } z-30 transition-all duration-300 group-hover:translate-x-2 group-hover:translate-y-2`}
          style={{ boxShadow: `0 0 15px ${glowColor}` }}
        />

        {/* >>>> IMAGE CONTAINER <<<< */}
        <div className="relative h-[300px] md:h-[420px] w-full overflow-hidden bg-black border-2 border-slate-800 group-hover:border-slate-600 transition-colors">
          {/* The Image with Glitch Scale Effect */}
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-200"
            />

            {/* RGB Split Glitch Effect on Hover */}
            <div className="absolute inset-0 bg-cyan-500/20 mix-blend-screen opacity-0 group-hover:animate-glitch-1" />
            <div className="absolute inset-0 bg-red-500/20 mix-blend-screen opacity-0 group-hover:animate-glitch-2" />
          </div>

          {/* CRT Grid Texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5)_50%,rgba(0,0,0,0)_50%)] bg-size-[100%_4px] pointer-events-none z-10 opacity-20" />

          {/* >>>> HUD UI ELEMENTS <<<< */}
          {/* Top Center Badge */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-black/90 border border-white/20 text-xs font-mono text-white tracking-[0.3em]">
            TARGET_LOCKED
          </div>

          {/* Bottom Loading Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800">
            <div
              className={`h-full ${
                backgroundVariants[project.color as keyof bgVariants]
              } w-0 group-hover:w-full transition-all duration-[1.5s] ease-out shadow-[0_0_10px_${glowColor}]`}
            />
          </div>

          {/* Bottom Right Status */}
          <div
            className={`absolute bottom-4 right-4 px-3 py-1 bg-black/90 border ${
              borderVariants[project.color as keyof bgVariants]
            } ${
              textVariants[project.color as keyof bgVariants]
            } text-xs font-bold font-mono`}
          >
            <span className="animate-pulse mr-2">●</span>SYSTEM_ONLINE
          </div>
        </div>
      </motion.div>

      {/* --- CONTENT --- */}
      <div className="w-full lg:w-2/5 space-y-6 relative z-10 pl-4 lg:pl-0">
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`h-px w-8 ${
                backgroundVariants[project.color as keyof bgVariants]
              }`}
            />
            <span
              className={`${
                textVariants[project.color as keyof bgVariants]
              } font-mono text-sm tracking-wider uppercase`}
            >
              {project.category}
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
            {project.title}
          </h3>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-slate-400 text-lg leading-relaxed"
        >
          {project.description}
        </motion.p>

        {/* Tech Stack - Updated Hover Classes */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech: string, i: number) => (
            <span
              key={i}
              className={`px-3 py-1 bg-slate-800/50 border border-white/5 text-slate-300 text-xs font-mono 
                ${activeStyle.techHoverBorder}
                ${activeStyle.techHoverText}
                transition-colors`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons - Updated with Explicit Variants */}
        <div className="flex items-center gap-6 pt-4">
          <a
            href={project.links.live}
            target="_blank"
            className={`group/btn relative px-6 py-3 font-medium overflow-hidden transition-all border
              ${activeStyle.btnBg} 
              ${activeStyle.btnBorder} 
              ${activeStyle.btnHoverBorder} 
              ${textVariants[project.color as keyof bgVariants]}
            `}
          >
            <div
              className={`absolute inset-0 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300
                ${activeStyle.btnBg}
              `}
            />
            <span className="relative flex items-center gap-2">
              <Zap size={18} /> Initialize Demo
            </span>
          </a>
          <a
            href={project.links.code}
            target="_blank"
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors"
          >
            <Github size={18} /> Source Code
          </a>
        </div>
      </div>
    </section>
  );
};

const Projects: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      id: "01",
      title: "Whiteboard Application",
      category: "Real-Time Application",
      description:
        "A powerful real-time collaborative whiteboard built for seamless teamwork. Draw, brainstorm, and share ideas instantly on a live canvas.",
      image: "assets/whiteboard.png",
      tech: ["React.js", "Tailwind CSS", "Node.js", "MongoDB", "Socket.io"],
      links: {
        live: "https://whiteboard-alpha-nine.vercel.app/",
        code: "https://github.com/Purabsingla/whiteboard",
      },
      color: "cyan",
    },
    {
      id: "02",
      title: "React Pro Kit",
      category: "Productivity & Collaboration",
      description:
        "A professional, customizable, and modern React + Vite + Tailwind CSS template designed to kickstart your frontend projects. It comes pre-configured with powerful tools and UI components using shadcn/ui, TypeScript, and more.",
      image: "assets/npm.png",
      tech: ["React.js", "Vite", "Tailwind CSS", "TypeScript", "shadcn/ui"],
      links: {
        live: "https://www.npmjs.com/package/react-pro-kit",
        code: "https://github.com/Purabsingla/react-pro-kit",
      },
      color: "purple",
    },
    {
      id: "03",
      title: "CineVerse",
      category: "Entertainment & Media Discovery",
      description:
        "Discover your next favorite movie. Browse trending titles, watch trailers, and find global streaming availability all in one immersive hub.",
      image: "assets/cineverse.png",
      tech: ["React.js", "Tailwind CSS", "TMDB API", "IPInfo API"],
      links: {
        live: "https://purabsingla.github.io/CineVerse/",
        code: "https://github.com/Purabsingla/CineVerse",
      },
      color: "emerald",
    },
  ];

  return (
    <section
      ref={ref}
      id="projects"
      className="py-32 relative bg-void-black overflow-hidden"
    >
      {/* --- BACKGROUND MATRIX --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      {/* Side Glow Lines */}
      <div className="absolute left-0 top-0 w-px h-full bg-linear-to-b from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute right-0 top-0 w-px h-full bg-linear-to-b from-transparent via-purple-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="mb-40 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="flex items-center gap-2 mb-4"
          >
            <Terminal className="text-cyan-500" size={20} />
            <span className="text-cyan-500 font-mono text-sm tracking-widest uppercase">
              /root/projects
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight"
          >
            DEPLOYED{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
              SYSTEMS
            </span>
          </motion.h2>
        </div>

        {/* PROJECTS STACK */}
        <div>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <a
          href="https://github.com/Purabsingla?tab=repositories"
          target="_blank"
        >
          <div className="mt-32 text-center">
            <button className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full">
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-cyan-500 to-blue-600 opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="absolute inset-0 w-full h-full border border-cyan-500/30 rounded-full group-hover:border-cyan-500/60 transition-colors" />
              <span className="relative flex items-center gap-2 text-cyan-400 group-hover:text-white transition-colors font-mono font-bold tracking-wider">
                VIEW_ALL_ARCHIVES <ArrowUpRight size={18} />
              </span>
            </button>
          </div>
        </a>
      </div>

      <style>{`
        @keyframes scanline {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scanline {
          animation: scanline 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Projects;
