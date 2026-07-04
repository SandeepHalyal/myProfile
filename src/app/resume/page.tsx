"use client";

import { profileConfig } from "@/config/profile";
import { Mail, Phone, MapPin, Globe, Award, BookOpen, Layers } from "lucide-react";

export default function ResumePage() {
  const personal = profileConfig.personal;

  return (
    <div className="min-h-screen bg-white text-slate-800 p-8 sm:p-12 max-w-4xl mx-auto font-sans print:p-0 print:text-black">
      {/* Header */}
      <header className="border-b-2 border-emerald-600 pb-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-1">
            {personal.name}
          </h1>
          <p className="text-lg font-semibold text-emerald-700">
            {personal.title}
          </p>
          <p className="text-sm text-slate-500 italic mt-1 max-w-xl">
            &ldquo;{personal.tagline}&rdquo;
          </p>
        </div>
        <div className="flex flex-col gap-1.5 text-xs sm:text-sm text-slate-600 shrink-0">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-600" />
            <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            <a href={`tel:${personal.phone}`} className="hover:underline">{personal.phone}</a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{personal.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            <a href={personal.website} target="_blank" rel="noreferrer" className="hover:underline">sandeephalyal.vercel.app</a>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn Profile</a>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column (Skills, Languages, Interests, Education) */}
        <div className="md:col-span-1 flex flex-col gap-6">
          {/* Education */}
          <section>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" /> Education
            </h2>
            {profileConfig.education.map((edu, idx) => (
              <div key={idx} className="text-sm">
                <h3 className="font-semibold text-slate-800">{edu.degree}</h3>
                <p className="text-xs text-slate-600">{edu.institution}</p>
                <p className="text-xs text-emerald-700 font-medium">{edu.period}</p>
                <p className="text-xs text-slate-500 mt-0.5">Minor: {edu.minor}</p>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" /> Technical Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {profileConfig.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-700 font-medium border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600" /> Languages
            </h2>
            <div className="flex flex-col gap-2">
              {profileConfig.languages.map((lang) => (
                <div key={lang.name} className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700">{lang.name}</span>
                  <span className="text-slate-500">{lang.proficiency}/100</span>
                </div>
              ))}
            </div>
          </section>

          {/* Interests */}
          <section>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" /> Interests
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {profileConfig.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-2 py-0.5 bg-slate-50 rounded text-xs text-slate-600 border border-slate-100"
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>

          {/* Print Tip (only visible on screen) */}
          <div className="mt-8 p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-800 print:hidden flex flex-col gap-1">
            <span className="font-bold">📄 PDF Export Ready</span>
            <button 
              onClick={() => window.print()}
              className="mt-2 w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-semibold transition-colors"
            >
              Print
            </button>
          </div>
        </div>

        {/* Right Column (Experience, Projects) */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Work Experience */}
          <section>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5 mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" /> Work Experience
            </h2>
            <div className="flex flex-col gap-5">
              {profileConfig.experience.map((exp, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-800 text-base">{exp.role}</h3>
                    <span className="text-xs text-emerald-700 font-bold shrink-0">{exp.period}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-500 font-semibold mb-1">
                    <span>{exp.company}</span>
                    <span>{exp.location}</span>
                  </div>
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-emerald-600 hover:underline font-semibold mb-1.5 w-fit"
                    >
                      {exp.link}
                    </a>
                  )}
                  {exp.description && (
                    <p className="text-xs text-slate-600 italic mb-1.5">{exp.description}</p>
                  )}
                  <ul className="list-disc pl-4 flex flex-col gap-1 text-xs text-slate-700">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} dangerouslySetInnerHTML={{ __html: ach }} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Personal Projects */}
          <section>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" /> Personal Projects
            </h2>
            <div className="flex flex-col gap-4">
              {profileConfig.projects.map((proj, idx) => (
                <div key={idx} className="flex flex-col gap-0.5">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-800 text-sm">{proj.name}</h3>
                    <span className="text-xs text-emerald-700 font-semibold shrink-0">{proj.period}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {proj.description}
                  </p>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-emerald-600 hover:underline font-semibold mt-0.5 w-fit"
                    >
                      {proj.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
