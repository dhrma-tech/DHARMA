"use client";

import { motion, AnimatePresence } from "framer-motion";
import { profile, type Project } from "../data/profile";
import { useState } from "react";

export default function Projects() {
  const [activeTab, setActiveTab] = useState<"AI" | "Web">("AI");

  if (!profile.projects || profile.projects.length === 0) return null;

  const aiProjects = profile.projects.filter(p => p.category === "AI");
  const webProjects = profile.projects.filter(p => p.category === "Web");
  
  const currentProjects = activeTab === "AI" ? aiProjects : webProjects;

  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto border-t border-border/60">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.18em] text-muted font-bold mb-4">
              PORTFOLIO
            </h3>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Projects
            </h2>
          </div>
          
          <div className="flex bg-surface p-1.5 rounded-full border border-border/50 shadow-sm w-fit shrink-0">
            <button
              onClick={() => setActiveTab("AI")}
              className={`px-6 py-2.5 rounded-full text-[13px] tracking-wide font-bold transition-all ${
                activeTab === "AI" 
                  ? "bg-foreground text-background shadow-md" 
                  : "text-muted hover:text-foreground"
              }`}
            >
              AI & WORKFLOWS
            </button>
            <button
              onClick={() => setActiveTab("Web")}
              className={`px-6 py-2.5 rounded-full text-[13px] tracking-wide font-bold transition-all ${
                activeTab === "Web" 
                  ? "bg-foreground text-background shadow-md" 
                  : "text-muted hover:text-foreground"
              }`}
            >
              WEB DEV
            </button>
          </div>
        </div>
        
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {currentProjects.map((project, index) => (
                <div key={index} className={index === 0 && currentProjects.length % 2 !== 0 ? "md:col-span-2" : "col-span-1"}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </motion.div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div 
      className="group relative p-8 rounded-[20px] bg-surface hover:shadow-sm border border-transparent hover:border-border transition-all flex flex-col h-full min-h-[220px]"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center shrink-0 font-bold text-lg text-background shadow-sm">
          {project.letter}
        </div>
        <div>
          <h4 className="font-bold text-foreground text-lg">{project.name}</h4>
          <div className="text-xs font-medium text-muted mt-0.5">{project.role}</div>
        </div>
      </div>
      
      <div className="text-[13px] font-semibold text-muted mb-4">{project.dates}</div>
      
      <p className="text-sm text-foreground/80 leading-relaxed flex-grow">
        {project.description}
      </p>
      
      {project.url ? (
        <a href={project.url} target="_blank" rel="noreferrer" className="text-[11px] font-bold text-accent transition-opacity flex justify-end mt-6 opacity-80 hover:opacity-100">
          View Repository &rarr;
        </a>
      ) : project.private ? (
        <div className="text-[11px] font-bold text-muted flex justify-end mt-6">
          Private Repository
        </div>
      ) : null}
    </div>
  );
}
