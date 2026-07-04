"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface PhotoViewerProps {
  isOpen: boolean;
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export function PhotoViewer({ isOpen, images, initialIndex, onClose }: PhotoViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  // Sync initialIndex on open
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsPlaying(true); // default to play auto-carousel when opened
    }
  }, [isOpen, initialIndex]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "Escape") {
        onClose();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images]);

  // Autoplay interval
  useEffect(() => {
    if (!isOpen || !isPlaying || images.length <= 1) {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
        autoplayTimer.current = null;
      }
      return;
    }

    autoplayTimer.current = setInterval(() => {
      nextImage();
    }, 3500); // cycle every 3.5s

    return () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
        autoplayTimer.current = null;
      }
    };
  }, [isOpen, isPlaying, currentIndex, images]);

  if (!isOpen || !images || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between select-none pointer-events-auto"
        onClick={onClose}
      >
        {/* Top bar */}
        <div 
          className="flex justify-between items-center w-full px-6 py-4 z-10 bg-gradient-to-b from-black/60 to-transparent shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-sm font-medium text-zinc-400 font-mono">
            {currentIndex + 1} / {images.length}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              className="text-zinc-400 hover:text-white transition-colors duration-200 p-2 rounded-lg bg-zinc-900/40 hover:bg-zinc-800/40 cursor-pointer border-none"
              title={isPlaying ? "Pause Slideshow (Space)" : "Start Slideshow (Space)"}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors duration-200 p-2 rounded-lg bg-zinc-900/40 hover:bg-zinc-800/40 cursor-pointer border-none"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Main interactive area */}
        <div 
          className="relative flex-1 w-full flex items-center justify-center overflow-hidden px-4 md:px-16"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Arrow */}
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 md:left-6 z-10 bg-zinc-900/50 hover:bg-zinc-800/80 hover:scale-105 border border-zinc-800 text-white rounded-full p-3 transition-all duration-200 cursor-pointer pointer-events-auto"
              title="Previous"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Image Container with framer-motion */}
          <div className="relative max-w-5xl max-h-[80vh] aspect-video w-full h-full flex items-center justify-center pointer-events-none">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Photo ${currentIndex + 1}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-zinc-800/50"
              />
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 md:right-6 z-10 bg-zinc-900/50 hover:bg-zinc-800/80 hover:scale-105 border border-zinc-800 text-white rounded-full p-3 transition-all duration-200 cursor-pointer pointer-events-auto"
              title="Next"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Bottom indicator dots & progress */}
        <div 
          className="flex flex-col items-center gap-3 w-full pb-6 z-10 bg-gradient-to-t from-black/60 to-transparent shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Autoplay progress bar indicator */}
          {images.length > 1 && isPlaying && (
            <div className="w-48 h-0.5 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                key={`${currentIndex}-${isPlaying}`} // triggers re-render/re-animation on change
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3.5, ease: "linear" }}
                className="h-full bg-accent-green"
              />
            </div>
          )}

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto py-1 max-w-full scrollbar-none">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-250 cursor-pointer border-none ${
                    idx === currentIndex 
                      ? "bg-accent-green w-4" 
                      : "bg-zinc-600 hover:bg-zinc-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
