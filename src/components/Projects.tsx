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
            // UPDATED: Much higher opacity (0.6) and thicker stroke for visibility
            WebkitTextStroke: `2px rgba(${rgb}, 0.6)`,
            color: `rgba(${rgb}, 0.05)`, // Slight fill to make it look solid
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
          className={`absolute -top-2 -left-2 w-12 h-12 border-t-4 border-l-4 border-${project.color}-500 z-30 transition-all duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2`}
          style={{ boxShadow: `0 0 15px ${glowColor}` }}
        />
        {/* Top Right */}
        <div
          className={`absolute -top-2 -right-2 w-12 h-12 border-t-4 border-r-4 border-${project.color}-500 z-30 transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2`}
          style={{ boxShadow: `0 0 15px ${glowColor}` }}
        />
        {/* Bottom Left */}
        <div
          className={`absolute -bottom-2 -left-2 w-12 h-12 border-b-4 border-l-4 border-${project.color}-500 z-30 transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2`}
          style={{ boxShadow: `0 0 15px ${glowColor}` }}
        />
        {/* Bottom Right */}
        <div
          className={`absolute -bottom-2 -right-2 w-12 h-12 border-b-4 border-r-4 border-${project.color}-500 z-30 transition-all duration-300 group-hover:translate-x-2 group-hover:translate-y-2`}
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

            {/* RGB Split Glitch Effect on Hover (Pseudo-element style logic) */}
            <div className="absolute inset-0 bg-cyan-500/20 mix-blend-screen opacity-0 group-hover:animate-glitch-1" />
            <div className="absolute inset-0 bg-red-500/20 mix-blend-screen opacity-0 group-hover:animate-glitch-2" />
          </div>

          {/* Heavy Scanline (Thick bar) */}
          <div
            className={`absolute inset-x-0 h-2 bg-${project.color}-400/80 shadow-[0_0_30px_${glowColor}] top-0 group-hover:animate-scanline opacity-0 group-hover:opacity-100 pointer-events-none z-20`}
          />

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
              className={`h-full bg-${project.color}-500 w-0 group-hover:w-full transition-all duration-[1.5s] ease-out shadow-[0_0_10px_${glowColor}]`}
            />
          </div>

          {/* Bottom Right Status */}
          <div
            className={`absolute bottom-4 right-4 px-3 py-1 bg-black/90 border border-${project.color}-500 text-${project.color}-400 text-xs font-bold font-mono`}
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
            <div className={`h-px w-8 bg-${project.color}-500`} />
            <span
              className={`text-${project.color}-400 font-mono text-sm tracking-wider uppercase`}
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

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech: string, i: number) => (
            <span
              key={i}
              className={`px-3 py-1 bg-slate-800/50 border border-white/5 text-slate-300 text-xs font-mono hover:border-${project.color}-500/30 hover:text-${project.color}-400 transition-colors`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-6 pt-4">
          <a
            href={project.links.live}
            className={`group/btn relative px-6 py-3 bg-${project.color}-500/10 border border-${project.color}-500/20 hover:border-${project.color}-500/50 text-${project.color}-400 font-medium overflow-hidden transition-all`}
          >
            <div
              className={`absolute inset-0 translate-y-full group-hover/btn:translate-y-0 bg-${project.color}-500/10 transition-transform duration-300`}
            />
            <span className="relative flex items-center gap-2">
              <Zap size={18} /> Initialize Demo
            </span>
          </a>
          <a
            href={project.links.code}
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
      title: "E-Commerce Core",
      category: "System Architecture",
      description:
        "A high-performance commerce engine. Features real-time inventory tracking, secure Stripe payments, and a custom CMS for product management.",
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1600",
      tech: ["React", "Node.js", "MongoDB", "Redis"],
      links: { live: "#", code: "#" },
      color: "cyan",
    },
    {
      id: "02",
      title: "Task Synergy",
      category: "Real-Time Protocol",
      description:
        "Socket-based project management protocol. Enables teams to drag-and-drop tasks, chat in real-time, and track sprint velocity without refreshing.",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600",
      tech: ["Next.js", "Socket.io", "Prisma", "PostgreSQL"],
      links: { live: "#", code: "#" },
      color: "purple",
    },
    {
      id: "03",
      title: "Analytics Hub",
      category: "Data Visualization",
      description:
        "Transforming raw data into actionable intelligence. Processes 10k+ events/sec and visualizes trends using hardware-accelerated graphs.",
      image:
        "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1600",
      tech: ["React", "D3.js", "Python", "AWS"],
      links: { live: "#", code: "#" },
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
        <div className="mt-32 text-center">
          <button className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full">
            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-cyan-500 to-blue-600 opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="absolute inset-0 w-full h-full border border-cyan-500/30 rounded-full group-hover:border-cyan-500/60 transition-colors" />
            <span className="relative flex items-center gap-2 text-cyan-400 group-hover:text-white transition-colors font-mono font-bold tracking-wider">
              VIEW_ALL_ARCHIVES <ArrowUpRight size={18} />
            </span>
          </button>
        </div>
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
