import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  Terminal,
  Network,
} from "lucide-react";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/Purabsingla", label: "GITHUB" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/purab-singla-081365229/",
      label: "LINKEDIN",
    },
    {
      icon: Mail,
      href: "mailto:purabsingla15@gmail.com?subject=Hiring Inquiry from Portfolio",
      label: "EMAIL",
    },
  ];

  return (
    <footer className="relative bg-void-black pt-20 pb-10 overflow-hidden border-t border-white/10">
      {/* --- BACKGROUND GRID --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      {/* --- GIANT WATERMARK --- */}
      <div className="absolute -bottom-58 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none w-full text-center z-0">
        <h1
          className="text-[15vw] font-black text-white/4 whitespace-nowrap leading-none"
          style={{ fontFamily: '"Oxanium", sans-serif' }}
        >
          TERMINATED
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          {/* COLUMN 1: IDENTITY */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-cyan-400">
              <Terminal size={24} />
              <span className="font-bold text-xl tracking-tight">
                PURAB_SINGLA
              </span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Engineering scalable digital solutions. Specialized in full-stack
              architecture, real-time systems, and high-performance web
              interfaces.
            </p>

            {/* Status Badges */}
            <div className="flex gap-4 pt-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded text-green-400 text-xs font-mono">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                SYSTEM_STABLE
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-blue-400 text-xs font-mono">
                <Network size={12} />
                PING: 14ms
              </div>
            </div>
          </div>

          {/* COLUMN 2: NAVIGATION */}
          <div>
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-cyan-500 rounded-full" />
              NAVIGATION
            </h3>
            <ul className="space-y-4">
              {["Home", "About", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() =>
                      document
                        .getElementById(item.toLowerCase())
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-slate-400 hover:text-cyan-400 hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="text-cyan-500/0 group-hover:text-cyan-500 transition-colors">
                      {">"}
                    </span>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: SOCIALS */}
          <div>
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-500 rounded-full" />
              CONNECT
            </h3>
            <div className="space-y-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="group flex items-center gap-3 p-3 bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 rounded-lg"
                >
                  <div className="p-2 bg-black rounded text-slate-300 group-hover:text-cyan-400 transition-colors">
                    <social.icon size={18} />
                  </div>
                  <span className="text-sm font-mono text-slate-400 group-hover:text-white transition-colors">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* --- FOOTER BOTTOM BAR --- */}
        <div className="pt-8  flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-slate-500 text-sm font-mono">
            © {new Date().getFullYear()} PURAB SINGLA. ALL RIGHTS RESERVED.
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black font-bold rounded hover:bg-cyan-400 transition-colors"
          >
            <ArrowUp
              size={18}
              className="group-hover:-translate-y-1 transition-transform"
            />
            <span>REBOOT_TOP</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
