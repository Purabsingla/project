import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 1. Mouse Position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // 2. Physics Configuration
  // Damping 20/Stiffness 300 = Smooth but responsive
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.tagName === "INPUT" ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  // Hide on mobile
  if (
    typeof navigator !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* 1. THE GLOBAL GLOW (Only visible on dark backgrounds) */}
      <motion.div
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />

      {/* 2. THE FOLLOWER RING */}
      <motion.div
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.8 : 1,
            rotate: isHovered ? 90 : 0,
          }}
          transition={{ duration: 0.2 }}
          // Fixed: Cyan Border with Black Shadow for contrast on white
          className="w-8 h-8 border border-cyan-400 rounded-full opacity-80 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]"
        />
      </motion.div>

      {/* 3. THE HARDPOINT (Diamond) */}
      <motion.div
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
        style={{ x: cursorX, y: cursorY }}
      >
        {/* The Diamond */}
        <motion.div
          animate={{
            scale: isClicked ? 0.8 : isHovered ? 0 : 1,
            rotate: 45,
          }}
          // Fixed: White Core + Cyan Border + Black Shadow ensures visibility everywhere
          className="w-2.5 h-2.5 bg-white border border-cyan-500 shadow-[0_0_4px_rgba(0,0,0,1)]"
        />

        {/* The Crosshair (Appears on Hover) */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.5,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {/* Horizontal Line */}
          <div className="w-10 h-[2px] bg-cyan-400 absolute -translate-x-1/2 -translate-y-1/2 shadow-[0_0_2px_black]"></div>
          {/* Vertical Line */}
          <div className="h-10 w-[2px] bg-cyan-400 absolute -translate-x-1/2 -translate-y-1/2 shadow-[0_0_2px_black]"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CustomCursor;
