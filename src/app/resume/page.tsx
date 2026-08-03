"use client";

import { profileConfig } from "@/config/profile";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  BookOpen, 
  Layers, 
  Briefcase, 
  Shield, 
  Cpu, 
  Sparkles,
  ExternalLink
} from "lucide-react";

export default function ResumePage() {
  const personal = profileConfig.personal;

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 md:py-12 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto bg-white border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-2xl p-6 sm:p-10 md:p-12 print:border-none print:shadow-none print:rounded-none print:p-0 font-sans text-slate-800 print:text-black">
        
        {/* Header */}
        <header className="border-b-2 border-emerald-600 pb-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-1">
                {personal.name}
              </h1>
              <p className="text-sm sm:text-base font-bold text-emerald-700 tracking-wider uppercase">
                {personal.title}
              </p>
            </div>
            {/* Print Button (Only visible on screen) */}
            <div className="print:hidden">
              <button 
                onClick={() => window.print()}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer flex items-center gap-1.5 pointer-events-auto"
              >
                <span>Print to PDF</span>
                <ExternalLink size={12} />
              </button>
            </div>
          </div>

          {/* Subtitle Tagline */}
          <p className="text-xs sm:text-sm text-slate-500 italic mt-2.5 max-w-2xl font-medium leading-relaxed">
            &ldquo;{personal.tagline}&rdquo;
          </p>
          
          {/* Executive Contact Info (Horizontal Line Bar) */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs sm:text-sm text-slate-500 font-semibold border-t border-slate-100 pt-3">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <a href={`mailto:${personal.email}`} className="hover:underline hover:text-emerald-700 transition-colors">{personal.email}</a>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <a href={`tel:${personal.phone}`} className="hover:underline hover:text-emerald-700 transition-colors">{personal.phone}</a>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{personal.location}</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="hover:underline hover:text-emerald-700 transition-colors">LinkedIn</a>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <a href={personal.github} target="_blank" rel="noreferrer" className="hover:underline hover:text-emerald-700 transition-colors">GitHub</a>
            </span>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="mb-8">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Hands-on technical leader with a track record of building and managing complex production web applications from 0-1. 
            Specialized in deploying self-orchestrated voice and text AI conversation agents (hybrid local/cloud, optimized STT/TTS), engineering high-security HIPAA-compliant local-first architectures (AES-256), 
            and collaborating directly with end-users in the field to translate operational requirements into scalable systems.
          </p>
        </section>

        {/* Technical Capabilities & Skills Section */}
        <section className="mb-8 bg-slate-50/50 rounded-xl p-5 border border-slate-200/40 print:bg-slate-50/10 print:border-zinc-200">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200/80 pb-2 mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" /> Core Capabilities & Tech Stack
          </h2>
          
          {/* Tiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="bg-white border border-slate-200/50 p-4 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-1.5">
              <p className="font-bold text-emerald-800 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> AI & Real-Time Conversational Systems Skills
              </p>
              <p className="text-slate-600 leading-relaxed font-medium">
                Self-orchestrated voice & text AI agents & RAG pipelines, hybrid execution (local & backend cloud LLMs), optimized hybrid STT/TTS configurations for ultra-low latency & cost efficiency, real-time WebRTC/WebSockets, MongoDB.
              </p>
            </div>
            
            <div className="bg-white border border-slate-200/50 p-4 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-1.5">
              <p className="font-bold text-emerald-800 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Local-First Architecture & Security Skills
              </p>
              <p className="text-slate-600 leading-relaxed font-medium">
                High-security HIPAA compliance, AES-256 encryption (AES-GCM at application layer via Web Crypto API), OPFS (Origin Private File System), wa-sqlite, PWA hard-caching.
              </p>
            </div>
            
            <div className="bg-white border border-slate-200/50 p-4 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-1.5">
              <p className="font-bold text-emerald-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Frontend & Modern Ecosystems Skills
              </p>
              <p className="text-slate-600 leading-relaxed font-medium">
                TypeScript, React / Next.js (SSR), React micro-frontends with Module Federation, Turborepo builds, Rspack bundling, File System Access API.
              </p>
            </div>
            
            <div className="bg-white border border-slate-200/50 p-4 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-1.5">
              <p className="font-bold text-emerald-800 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> 0-1 Product Delivery & Engineering Skills
              </p>
              <p className="text-slate-600 leading-relaxed font-medium">
                End-to-end scoping, customer-facing systems design, field-based user validation, internal dashboard tooling, CI/CD pipelines, MERN Stack (MongoDB, Express, React, Node.js), GraphQL APIs.
              </p>
            </div>
          </div>

          {/* Dynamic Technical Skills Pill Tags */}
          <div className="mt-5 pt-4 border-t border-slate-200/80">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Key Technologies & Expertise</p>
            <div className="flex flex-wrap gap-1.5">
              {profileConfig.skills.map((skill) => {
                const displaySkill = skill.endsWith(" Skills") ? skill.slice(0, -7) : skill;
                return (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-slate-100 border border-slate-200/60 rounded-full text-[10px] text-slate-600 font-bold tracking-wide uppercase hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 transition-colors"
                  >
                    {displaySkill}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured AI & Local-First Products Section */}
        <section className="mb-8">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2 mb-5 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" /> Featured AI & Local-First Products (0-1 Builds)
          </h2>
          <div className="flex flex-col gap-5">
            {profileConfig.projects.slice(0, 3).map((proj, idx) => (
              <div key={idx} className="border-l-2 border-emerald-600 pl-4.5 space-y-1.5 py-0.5">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">{proj.name}</h3>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-emerald-600 hover:underline font-semibold block mt-0.5"
                      >
                        {proj.link}
                      </a>
                    )}
                  </div>
                  <span className="text-[10px] tracking-wider uppercase font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/50 rounded-full px-2.5 py-0.5 shrink-0">{proj.period}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: proj.description }} />
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience Section */}
        <section className="mb-8">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2 mb-5 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-600" /> Professional Experience
          </h2>
          <div className="flex flex-col gap-6">
            {profileConfig.experience.map((exp, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">{exp.role}</h3>
                    <p className="text-xs text-slate-400 font-bold tracking-wide uppercase">{exp.company}</p>
                  </div>
                  <div className="text-left md:text-right shrink-0">
                    <span className="text-[10px] tracking-wider uppercase font-bold text-emerald-800 bg-slate-50 border border-slate-200/60 rounded-full px-2.5 py-0.5 block mb-1 w-fit md:ml-auto">{exp.period}</span>
                    <span className="text-[10px] text-slate-400 font-semibold block">{exp.location}</span>
                  </div>
                </div>
                {exp.description && (
                  <p className="text-xs text-slate-500 italic font-medium">{exp.description}</p>
                )}
                <ul className="list-disc pl-4.5 flex flex-col gap-1.5 text-xs text-slate-600 font-medium">
                  {exp.achievements.map((ach, aIdx) => (
                    <li key={aIdx} dangerouslySetInnerHTML={{ __html: ach }} className="leading-relaxed" />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Info Section */}
        <section className="border-t border-slate-200 pt-5 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            {/* Education */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> Education
              </h4>
              {profileConfig.education.map((edu, idx) => (
                <div key={idx} className="space-y-0.5">
                  <p className="font-bold text-slate-800">{edu.degree}</p>
                  <p className="text-slate-500 text-[11px] font-medium">{edu.institution} | {edu.period}</p>
                  <p className="text-[10px] text-emerald-700 font-bold tracking-wide uppercase">Minor: {edu.minor}</p>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-600" /> Languages
              </h4>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                {profileConfig.languages.map((lang) => (
                  <div key={lang.name} className="flex justify-between items-center text-[11px] pr-2 font-medium">
                    <span className="font-bold text-slate-700">{lang.name}</span>
                    <span className="text-slate-400">{lang.proficiency}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Interests & Hobbies
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {profileConfig.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-2.5 py-0.5 bg-slate-50 rounded-full text-[10px] text-slate-500 border border-slate-200/50 font-bold tracking-wide uppercase"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Print Tip (only visible on screen) */}
        <div className="mt-8 p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-800 print:hidden flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="font-bold">📄 PDF Export Ready</span>
            <span className="text-[10px] text-emerald-700">Perfectly optimized for standard 1-page single-column printing or saving to PDF.</span>
          </div>
          <button 
            onClick={() => window.print()}
            className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition-all shadow-sm hover:shadow active:scale-95 pointer-events-auto cursor-pointer"
          >
            Print Resume
          </button>
        </div>

      </div>
    </div>
  );
}
