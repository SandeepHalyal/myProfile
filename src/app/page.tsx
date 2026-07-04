"use client";

import { useState, useEffect } from "react";
import ThreeScene from "@/components/canvas/ThreeScene";
import OverlayUI from "@/components/ui/OverlayUI";
import TerminalMode from "@/components/ui/TerminalMode";
import { Terminal, Monitor, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ExperienceMode = "prompt" | "gui" | "terminal";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [experienceMode, setExperienceMode] = useState<ExperienceMode>("prompt");
  const [isMounted, setIsMounted] = useState(false);

  // Check sessionStorage for previous preference on load
  useEffect(() => {
    setIsMounted(true);
    const savedMode = sessionStorage.getItem("portfolio_mode") as ExperienceMode;
    if (savedMode && ["gui", "terminal"].includes(savedMode)) {
      setExperienceMode(savedMode);
    }
  }, []);

  const selectMode = (mode: "gui" | "terminal") => {
    setExperienceMode(mode);
    sessionStorage.setItem("portfolio_mode", mode);
  };

  // Keyboard shortcut listener to toggle modes
  useEffect(() => {
    const handleToggleKey = (e: KeyboardEvent) => {
      // Toggle key: Backtick ` or Ctrl+~ (or Ctrl+`)
      const isBacktick = e.key === "`";
      const isCtrlTilde = e.ctrlKey && (e.key === "~" || e.key === "`" || e.key === "Tab");

      if (isBacktick || isCtrlTilde) {
        e.preventDefault();
        setExperienceMode((prev) => {
          const nextMode = prev === "terminal" ? "gui" : "terminal";
          sessionStorage.setItem("portfolio_mode", nextMode);
          return nextMode;
        });
      }
    };

    window.addEventListener("keydown", handleToggleKey);
    return () => window.removeEventListener("keydown", handleToggleKey);
  }, []);

  // Mouse wheel scroll to transition sections (only in GUI mode)
  useEffect(() => {
    if (experienceMode !== "gui") return;
    
    let lastScrollTime = 0;
    const throttleDelay = 1200; // 1.2s delay to allow camera transition

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < throttleDelay) return;

      if (Math.abs(e.deltaY) > 25) {
        if (e.deltaY > 0) {
          // Scroll Down -> Next Section
          setCurrentSection((prev) => Math.min(3, prev + 1));
        } else {
          // Scroll Up -> Prev Section
          setCurrentSection((prev) => Math.max(0, prev - 1));
        }
        lastScrollTime = now;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [experienceMode]);

  // Keyboard navigation (only in GUI mode)
  useEffect(() => {
    if (experienceMode !== "gui") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        setCurrentSection((prev) => Math.min(3, prev + 1));
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        setCurrentSection((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [experienceMode]);

  if (!isMounted) {
    return <main className="w-screen h-screen bg-[#030303]" />;
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#030303]">
      <AnimatePresence mode="wait">
        {experienceMode === "prompt" && (
          <motion.div
            key="prompt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#050505] bg-opacity-95"
            style={{
              backgroundImage: "radial-gradient(rgba(16, 185, 129, 0.02) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          >
            <div className="glass-panel-glow max-w-2xl w-full p-6 sm:p-10 rounded-3xl border border-zinc-800/80 bg-zinc-950/80 text-center flex flex-col gap-6 sm:gap-8">
              <div className="flex flex-col items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/30 border border-emerald-800/30 text-[10px] text-accent-green font-semibold uppercase tracking-widest">
                  <Sparkles size={12} className="animate-pulse" /> Welcome to my Space
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight pt-2">
                  Choose Your Experience
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm max-w-md">
                  Explore my work, background, and personal projects using your preferred interface style.
                </p>
              </div>

              {/* Mode Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* 3D GUI Option */}
                <button
                  onClick={() => selectMode("gui")}
                  className="flex flex-col items-center p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-accent-green text-center transition-all group relative overflow-hidden"
                >
                  <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 text-accent-green flex items-center justify-center group-hover:scale-110 transition-transform mb-4">
                    <Monitor size={24} />
                  </div>
                  <h3 className="text-white font-bold text-base mb-1">3D Graphical Mode</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed max-w-[200px]">
                    An immersive, visual slideshow in a responsive 3D space.
                  </p>
                  <div className="absolute inset-0 border border-accent-green/0 group-hover:border-accent-green/20 rounded-2xl pointer-events-none" />
                </button>

                {/* Developer CLI Option */}
                <button
                  onClick={() => selectMode("terminal")}
                  className="flex flex-col items-center p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-accent-blue text-center transition-all group relative overflow-hidden"
                >
                  <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 text-accent-blue flex items-center justify-center group-hover:scale-110 transition-transform mb-4">
                    <Terminal size={24} />
                  </div>
                  <h3 className="text-white font-bold text-base mb-1">Developer CLI</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed max-w-[200px]">
                    Interact using a simulated shell command-line interface.
                  </p>
                  <div className="absolute inset-0 border border-accent-blue/0 group-hover:border-accent-blue/20 rounded-2xl pointer-events-none" />
                </button>
              </div>

              {/* Shortcut Hint */}
              <p className="text-[10px] text-zinc-500 font-mono">
                Hint: You can toggle modes anytime by pressing <span className="bg-zinc-900 px-1 py-0.5 rounded text-zinc-400 font-semibold border border-zinc-800">`</span> or <span className="bg-zinc-900 px-1 py-0.5 rounded text-zinc-400 font-semibold border border-zinc-800">Ctrl + ~</span>.
              </p>
            </div>
          </motion.div>
        )}

        {experienceMode === "terminal" && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50"
          >
            <TerminalMode onClose={() => selectMode("gui")} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D WebGL Canvas Layer */}
      {experienceMode === "gui" && (
        <ThreeScene currentSection={currentSection} onSectionChange={setCurrentSection} />
      )}

      {/* 2D HUD / Interactive HTML Overlay */}
      {experienceMode === "gui" && (
        <OverlayUI 
          currentSection={currentSection} 
          onSectionChange={setCurrentSection} 
          onToggleTerminal={() => selectMode("terminal")}
        />
      )}
    </main>
  );
}
