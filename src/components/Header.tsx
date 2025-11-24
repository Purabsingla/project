import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Terminal,
  Command,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }, 30);
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-void-black/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* LOGO */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="p-1.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-cyan-400">
            <Command size={20} />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Purab<span className="text-cyan-400">.dev</span>
          </span>
        </motion.div>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              onClick={() => scrollToSection(item.id)}
              className="relative px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group"
            >
              {item.name}
              <span className="absolute inset-x-0 bottom-0 h-px bg-cyan-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </motion.button>
          ))}
        </div>

        {/* SOCIALS & MOBILE TOGGLE */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4 pl-6 border-l border-white/10">
            {[
              { icon: Github, href: "https://github.com/Purabsingla" },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/purab-singla-081365229/",
              },
              {
                icon: Mail,
                href: "mailto:purabsingla15@gmail.com?subject=Hiring Inquiry from Portfolio",
              },
            ].map(({ icon: Icon, href }, index) => (
              <motion.a
                key={index}
                whileHover={{ scale: 1.1, color: "#22d3ee" }}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-void-black border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6">
              <div className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-3 text-lg font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    <Terminal size={16} className="text-cyan-500" />
                    {item.name}
                  </motion.button>
                ))}
              </div>

              <div className="h-px bg-white/10" />

              <div className="flex gap-6">
                {[
                  { icon: Github, href: "https://github.com/Purabsingla" },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/purab-singla-081365229/",
                  },
                  {
                    icon: Mail,
                    href: "mailto:purabsingla15@gmail.com?subject=Hiring Inquiry from Portfolio",
                  },
                ].map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
