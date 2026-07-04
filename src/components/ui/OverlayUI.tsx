"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Heart,
  Award,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  FileText,
  Terminal
} from "lucide-react";
import { profileConfig } from "@/config/profile";
import { PhotoViewer } from "./PhotoViewer";

interface OverlayUIProps {
  currentSection: number;
  onSectionChange: (index: number) => void;
  onToggleTerminal: () => void;
}

const slideVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
} as const;

export default function OverlayUI({ currentSection, onSectionChange, onToggleTerminal }: OverlayUIProps) {
  const sections = ["Home", "Experience", "Projects", "Skills & Education"];
  const [activeExpTab, setActiveExpTab] = useState(0); // 0 = Samprithi Farms, 1 = RoaDo
  const [activeProj, setActiveProj] = useState(0);
  const [photoViewerOpen, setPhotoViewerOpen] = useState(false);
  const [photoViewerImages, setPhotoViewerImages] = useState<string[]>([]);
  const [photoViewerStartIndex, setPhotoViewerStartIndex] = useState(0);

  const personal = profileConfig.personal;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-4 sm:p-8 md:p-12">
      {/* Header (Logo & Contact Info) */}
      <header className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pointer-events-auto shrink-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-xl font-bold bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent tracking-wider">
            SANDEEP HALYAL
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent-green animate-pulse" />
        </motion.div>

        {/* Short Contacts overlay */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-[10px] sm:text-xs text-zinc-400"
        >
          <a href={`mailto:${personal.email}`} className="flex items-center gap-1 hover:text-white transition-colors">
            <Mail size={10} className="text-accent-green sm:w-3 sm:h-3" /> {personal.email}
          </a>
          <a href={`tel:${personal.phone}`} className="hidden md:flex items-center gap-1 hover:text-white transition-colors">
            <Phone size={12} className="text-accent-blue" /> {personal.phone}
          </a>
          <span className="hidden lg:flex items-center gap-1">
            <MapPin size={12} className="text-zinc-500" /> {personal.location}
          </span>
          <button 
            onClick={onToggleTerminal}
            className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-zinc-950/40 hover:bg-zinc-900/60 border border-zinc-800/50 text-accent-blue hover:text-white transition-all font-semibold pointer-events-auto"
          >
            <Terminal size={10} className="sm:w-3 sm:h-3" /> Terminal CLI
          </button>
          <a 
            href="/resume" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/50 text-accent-green hover:text-white transition-all font-semibold"
          >
            <FileText size={10} className="sm:w-3 sm:h-3" /> Download PDF
          </a>
        </motion.div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center w-full my-4 md:my-8 max-w-4xl min-h-0">
        <AnimatePresence mode="wait">
          {currentSection === 0 && (
            <motion.div
              key="hero"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="glass-panel-glow pointer-events-auto p-5 sm:p-8 rounded-2xl max-w-xl flex flex-col gap-4 sm:gap-6"
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] sm:text-xs font-semibold text-accent-green tracking-widest uppercase">
                  Welcome to my Space
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-none">
                  {personal.name}
                </h1>
                <p className="text-sm sm:text-lg text-zinc-400 font-medium">
                  {personal.title}
                </p>
              </div>

              <blockquote className="border-l-2 border-accent-green pl-4 italic text-zinc-300">
                &ldquo;{personal.tagline}&rdquo;
              </blockquote>

              <p className="text-sm text-zinc-400 leading-relaxed">
                A Full stack Developer with an organic side. Transitioning between complex micro-frontends, AI integrations, and raising over 1500+ chickens at Samprithi Farms. Impeccable passion drives my technical and entrepreneurial adventures.
              </p>

              {/* Social Buttons */}
              <div className="flex gap-3 mt-2">
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-accent-green transition-all flex items-center justify-center"
                >
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-accent-green transition-all flex items-center justify-center"
                >
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href={personal.quora}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Quora"
                  className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-accent-green transition-all flex items-center justify-center"
                >
                  <span className="font-extrabold text-sm px-1">Q</span>
                </a>
              </div>
            </motion.div>
          )}

          {currentSection === 1 && (
            <motion.div
              key="experience"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="glass-panel-glow pointer-events-auto p-5 sm:p-8 rounded-2xl w-full flex flex-col gap-4 sm:gap-6 max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                <h2 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-1.5 sm:gap-2">
                  <Award className="text-accent-green" size={24} /> Work Experience
                </h2>
                {/* Tabs */}
                <div className="flex gap-2">
                  {profileConfig.experience.map((exp, idx) => (
                    <button
                      key={exp.company}
                      onClick={() => setActiveExpTab(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        activeExpTab === idx
                          ? "bg-accent-green text-black"
                          : "bg-zinc-900 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {exp.company.split(" - ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Exp Content */}
              {profileConfig.experience.map((exp, idx) => {
                if (idx !== activeExpTab) return null;
                return (
                  <motion.div
                    key={exp.company}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-white">{exp.role}</h3>
                          <p className="text-xs sm:text-sm text-accent-green">{exp.company} | {exp.period}</p>
                        </div>
                        {exp.link && (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-accent-green hover:underline flex items-center gap-1 mt-1 shrink-0 pointer-events-auto"
                          >
                            Visit Farm <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                      {exp.description && (
                        <p className="text-xs sm:text-sm text-zinc-400 mt-1 italic">{exp.description}</p>
                      )}
                    </div>

                    <ul className="flex flex-col gap-2">
                      {exp.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2">
                          <span className="text-accent-blue mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                          <span dangerouslySetInnerHTML={{ __html: ach }} />
                        </li>
                      ))}
                    </ul>

                    {/* Image handling & hint for farm images */}
                    {idx === 1 && (
                      <div className="mt-4 border-t border-zinc-800 pt-4">
                        <h4 className="text-xs font-bold text-zinc-400 mb-2 flex items-center gap-1.5">
                          <Sparkles size={14} className="text-accent-green" /> Samprithi Farms Photo Gallery
                        </h4>
                        
                        {exp.images && exp.images.length > 0 ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {/* First 2 photos (if they exist) */}
                            {exp.images.slice(0, 2).map((img, iIdx) => (
                              <div 
                                key={iIdx} 
                                className="relative rounded-lg overflow-hidden border border-zinc-800 aspect-video group cursor-pointer pointer-events-auto"
                                onClick={() => {
                                  setPhotoViewerImages(exp.images || []);
                                  setPhotoViewerStartIndex(iIdx);
                                  setPhotoViewerOpen(true);
                                }}
                              >
                                <img
                                  src={img}
                                  alt={`Farm image ${iIdx + 1}`}
                                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            ))}
                            
                            {/* 3rd card button (if there are more than 2 photos) */}
                            {exp.images.length > 2 && (
                              <div 
                                className="relative rounded-lg overflow-hidden border border-zinc-800 aspect-video group cursor-pointer pointer-events-auto"
                                onClick={() => {
                                  setPhotoViewerImages(exp.images || []);
                                  setPhotoViewerStartIndex(2);
                                  setPhotoViewerOpen(true);
                                }}
                              >
                                {/* Background Image */}
                                <img
                                  src={exp.images[2]}
                                  alt="More farm images"
                                  className="object-cover w-full h-full filter blur-[1px] group-hover:scale-105 transition-transform duration-300"
                                />
                                {/* Overlay Mask */}
                                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center p-2 group-hover:bg-black/60 transition-colors duration-200">
                                  <span className="text-sm font-bold text-accent-green">
                                    +{exp.images.length - 2} more
                                  </span>
                                  <span className="text-[10px] text-zinc-400 font-medium mt-0.5">
                                    click to view
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="rounded-xl border border-dashed border-zinc-800 p-4 text-center bg-zinc-950/50 flex flex-col items-center gap-2">
                            <Info size={16} className="text-accent-green" />
                            <p className="text-xs text-zinc-400 max-w-sm">
                              No photos added yet. You can easily drag and drop your farm photos into <code className="text-accent-green bg-zinc-900 px-1 rounded">public/images/farm/</code>, add the file paths in <code className="text-accent-green bg-zinc-900 px-1 rounded">src/config/profile.ts</code>, and they will load here and in 3D dynamically!
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {currentSection === 2 && (
            <motion.div
              key="projects"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="glass-panel-glow pointer-events-auto p-5 sm:p-8 rounded-2xl w-full flex flex-col gap-4 sm:gap-6 max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] overflow-y-auto"
            >
              <h2 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-1.5 sm:gap-2">
                <BookOpen className="text-accent-blue" size={24} /> Personal Projects
              </h2>

              <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
                {/* Project selector side */}
                <div className="flex flex-row md:flex-col gap-1.5 md:col-span-1 border-b md:border-b-0 md:border-r border-zinc-800/50 pb-2.5 md:pb-0 md:pr-2 overflow-x-auto whitespace-nowrap scrollbar-none shrink-0 pointer-events-auto">
                  {profileConfig.projects.map((proj, idx) => (
                    <button
                      key={proj.name}
                      onClick={() => setActiveProj(idx)}
                      className={`text-left p-2 sm:p-3 rounded-lg transition-all flex items-center justify-between gap-2 shrink-0 group ${
                        activeProj === idx
                          ? "bg-zinc-900 border-b-2 md:border-b-0 md:border-l-2 border-accent-blue text-white"
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-semibold">{proj.name}</span>
                      <ChevronRight size={14} className="hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>

                {/* Project details area */}
                <div className="md:col-span-2 flex flex-col justify-between gap-3 min-h-0">
                  {profileConfig.projects.map((proj, idx) => {
                    if (idx !== activeProj) return null;
                    return (
                      <motion.div
                        key={proj.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-2"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-white">{proj.name}</h3>
                          <span className="text-[10px] sm:text-xs text-accent-blue font-semibold shrink-0">{proj.period}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                          {proj.description}
                        </p>

                        {/* Project Link */}
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-accent-green hover:underline inline-flex items-center gap-1 mt-2 pointer-events-auto w-fit"
                          >
                            Visit Website <ExternalLink size={12} />
                          </a>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {currentSection === 3 && (
            <motion.div
              key="skills-education"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="glass-panel-glow pointer-events-auto p-5 sm:p-8 rounded-2xl w-full flex flex-col gap-4 sm:gap-6 max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] overflow-y-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Languages and Interests */}
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                      <Heart className="text-accent-green" size={18} /> Languages
                    </h3>
                    <div className="flex flex-col gap-3">
                      {profileConfig.languages.map((lang) => (
                        <div key={lang.name} className="flex flex-col gap-1">
                          <div className="flex justify-between text-xs text-zinc-300 font-medium">
                            <span>{lang.name}</span>
                            <span>{lang.proficiency}/100</span>
                          </div>
                          <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${lang.proficiency}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-accent-green rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Sparkles className="text-accent-blue" size={18} /> Interests & Hobbies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profileConfig.interests.map((interest) => (
                        <span
                          key={interest}
                          className="px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:border-accent-blue hover:text-white transition-all cursor-default"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Education & Core Skills Summary */}
                <div className="flex flex-col gap-6 border-t md:border-t-0 md:border-l border-zinc-800/40 pt-6 md:pt-0 pl-0 md:pl-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                      <BookOpen className="text-accent-blue" size={18} /> Education
                    </h3>
                    {profileConfig.education.map((edu) => (
                      <div key={edu.degree} className="flex flex-col gap-1 border-l-2 border-accent-blue pl-4 py-1">
                        <h4 className="text-xs sm:text-sm font-bold text-white">{edu.degree}</h4>
                        <p className="text-[10px] sm:text-xs text-zinc-400">{edu.institution} | {edu.period}</p>
                        <p className="text-[10px] sm:text-xs text-accent-blue font-semibold">Minor: {edu.minor}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Award className="text-accent-green" size={18} /> Skills Summary
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {profileConfig.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md bg-zinc-950/60 border border-zinc-900 text-[10px] sm:text-xs text-accent-green"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Navigation */}
      <footer className="w-full flex justify-between items-center pointer-events-auto">
        {/* Next/Prev Navigation */}
        <div className="flex gap-3">
          <button
            onClick={() => onSectionChange(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className={`p-3 rounded-full border transition-all ${
              currentSection === 0
                ? "border-zinc-800 text-zinc-700 cursor-not-allowed"
                : "border-zinc-800 text-zinc-300 hover:text-white hover:border-accent-green bg-zinc-900/40"
            }`}
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => onSectionChange(Math.min(sections.length - 1, currentSection + 1))}
            disabled={currentSection === sections.length - 1}
            className={`p-3 rounded-full border transition-all ${
              currentSection === sections.length - 1
                ? "border-zinc-800 text-zinc-700 cursor-not-allowed"
                : "border-zinc-800 text-zinc-300 hover:text-white hover:border-accent-green bg-zinc-900/40"
            }`}
          >
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Section Indicators */}
        <div className="flex items-center gap-3">
          {sections.map((sec, idx) => (
            <button
              key={sec}
              onClick={() => onSectionChange(idx)}
              className={`flex items-center gap-2 group transition-all`}
            >
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSection === idx
                    ? "w-8 bg-accent-green"
                    : "w-2 bg-zinc-800 group-hover:bg-zinc-600"
                }`}
              />
              <span
                className={`text-xs font-semibold transition-all duration-300 hidden md:inline ${
                  currentSection === idx ? "text-white opacity-100" : "text-zinc-600 opacity-0 group-hover:opacity-100"
                }`}
              >
                {sec}
              </span>
            </button>
          ))}
        </div>
      </footer>

      <PhotoViewer
        isOpen={photoViewerOpen}
        images={photoViewerImages}
        initialIndex={photoViewerStartIndex}
        onClose={() => setPhotoViewerOpen(false)}
      />
    </div>
  );
}
