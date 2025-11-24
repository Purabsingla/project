import React, { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  MapPin,
  Calendar,
  Cpu,
  Terminal,
  ScanFace,
  Zap,
  ShieldAlert,
  Binary,
} from "lucide-react";

// --- 3D TILT CARD COMPONENT (For Profile Image) ---
const HolographicCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative w-[300px] md:w-[350px] aspect-3/4 mx-auto lg:mx-0 cursor-pointer group perspective-1000"
    >
      {/* Mechanical Borders */}
      <div
        className="absolute -inset-4 border-2 border-cyan-500/30 rounded-xl opacity-50 group-hover:border-cyan-400 transition-colors duration-500"
        style={{ transform: "translateZ(-20px)" }}
      />
      <div
        className="absolute -inset-4 border-x-2 border-cyan-500 rounded-xl scale-y-0 group-hover:scale-y-100 transition-transform duration-700"
        style={{ transform: "translateZ(-20px)" }}
      />

      <div className="relative h-full w-full bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shadow-2xl">
        {/* Image */}
        <img
          src="assets/Gemini_Generated_Image_Purab_Image.png"
          alt="Operator"
          className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
        />

        {/* Holographic Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-cyan-500/20 to-purple-500/20 mix-blend-overlay opacity-50" />

        {/* Grid Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

        {/* Scanning Laser */}
        <div className="absolute inset-x-0 h-1 bg-cyan-400 shadow-[0_0_20px_#22d3ee] top-0 animate-scanline opacity-80 pointer-events-none z-20" />

        {/* Interactive Glare */}
        <motion.div
          className="absolute inset-0 w-full h-full z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)`,
          }}
        />

        {/* HUD Elements */}
        <div className="absolute bottom-4 left-4 right-4 z-40">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-[10px] text-cyan-400 font-mono">
                ID_VERIFIED
              </div>
              <div className="text-xl font-bold text-white font-mono">
                PURAB SINGLA
              </div>
            </div>
            <ScanFace className="text-cyan-400 animate-pulse" size={24} />
          </div>
          <div className="w-full h-0.5 bg-cyan-900 mt-2">
            <div className="h-full bg-cyan-400 w-2/3 animate-pulse" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const;

  return (
    <section
      ref={ref}
      id="about"
      className="py-32 relative overflow-hidden bg-void-black"
    >
      {/* --- BACKGROUND MATRIX --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      {/* Giant Background Number (Restored) */}
      <div
        className="absolute top-20 right-[-5%] md:right-10 text-[20rem] font-black leading-none text-transparent z-0 select-none pointer-events-none opacity-10"
        style={{ WebkitTextStroke: "2px #22d3ee", fontFamily: "monospace" }}
      >
        01
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- HEADER --- */}
        <div className="mb-24 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="flex items-center gap-2 mb-4"
          >
            <Terminal className="text-cyan-500" size={20} />
            <span className="text-cyan-500 font-mono text-sm tracking-widest uppercase">
              /secure/dossier
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight"
          >
            OPERATOR{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-600">
              PROFILE
            </span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* --- LEFT: HOLOGRAPHIC CARD --- */}
          <div className="flex justify-center lg:justify-start">
            <HolographicCard />
          </div>

          {/* --- RIGHT: TERMINAL DATA --- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-10"
          >
            {/* BIO TERMINAL */}
            <motion.div
              variants={itemVariants}
              className="relative p-8 bg-slate-900/50 border border-slate-700 backdrop-blur-sm group hover:border-cyan-500/50 transition-colors"
            >
              {/* Decorative Corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500" />

              <div className="flex items-center gap-2 text-slate-500 mb-6 text-xs font-mono">
                <Binary size={14} />
                <span>BIO_DATA_ENCRYPTED</span>
              </div>

              <div className="space-y-4 text-slate-300 font-mono text-sm md:text-base leading-relaxed">
                <p>
                  <span className="text-cyan-500 mr-2">root@purab:~$</span>
                  Initializing operator bio...
                </p>
                {/* <p className="pl-4 border-l-2 border-slate-800">
                  I am{" "}
                  <span className="text-white font-bold">Purab Singla</span>, a
                  Full Stack Engineer engineering scalable digital solutions.
                  Operating out of India, I specialize in constructing
                  high-performance web architecture.
                </p>
                <p className="pl-4 border-l-2 border-slate-800">
                  Currently deploying intelligence at{" "}
                  <span className="text-white font-bold">
                    JDCM College of Engineering
                  </span>{" "}
                  (B.Tech CSE).
                </p> */}
                <p className="pl-4 border-l-2 border-slate-800">
                  I am{" "}
                  <span className="text-white font-bold">Purab Singla</span>, a
                  Full Stack Engineer specializing in{" "}
                  <span className="text-white">real-time web architecture</span>{" "}
                  and{" "}
                  <span className="text-white">open-source development</span>.
                </p>

                {/* The "Flex" - Your Resume Highlights */}
                <p className="pl-4 border-l-2 border-slate-800">
                  Creator of the{" "}
                  <span className="text-white font-bold">react-pro-kit</span>{" "}
                  NPM library and currently architecting low-latency
                  collaborative systems using{" "}
                  <span className="text-white">Socket.io</span> and{" "}
                  <span className="text-white">MongoDB</span>.
                </p>

                {/* Education - Graduated Status */}
                <p className="pl-4 border-l-2 border-slate-800">
                  Computer Science Graduate (B.Tech) from{" "}
                  <span className="text-white font-bold">
                    JCDM College of Engineering
                  </span>
                  .
                </p>
              </div>
            </motion.div>

            {/* PRIORITY ALERT BOX */}
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden p-1 rounded-lg bg-linear-to-r from-red-500/20 to-purple-500/20"
            >
              <div className="bg-black/80 p-4 flex items-center gap-4 relative z-10">
                <div className="p-3 bg-red-500/10 rounded animate-pulse">
                  <ShieldAlert size={24} className="text-red-500" />
                </div>
                <div>
                  <div className="text-[10px] text-red-400 font-mono tracking-wider mb-1">
                    CURRENT_DIRECTIVE
                  </div>
                  <div className="text-white font-bold text-lg">
                    Engineering Real-Time Systems
                  </div>
                </div>
              </div>
              {/* Glitch Line */}
              <div className="absolute inset-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </motion.div>

            {/* HUD STATS GRID */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "CLASS", val: "ENGINEER", icon: Cpu },
                { label: "STATUS", val: "ONLINE", icon: Zap },
                { label: "EXP", val: "FRESHER", icon: Calendar },
                { label: "LOC", val: "INDIA", icon: MapPin },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 border border-slate-800 bg-slate-900/30 hover:bg-cyan-950/20 transition-colors"
                >
                  <stat.icon size={16} className="text-slate-500" />
                  <div>
                    <div className="text-[10px] text-slate-600 font-mono">
                      {stat.label}
                    </div>
                    <div className="text-cyan-400 font-bold text-sm tracking-wide">
                      {stat.val}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes scanline {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scanline {
          animation: scanline 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default About;
