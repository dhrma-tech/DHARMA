"use client";

import { motion } from "framer-motion";
import { profile } from "../data/profile";

export default function WorkExperience() {
  return (
    <section id="work" className="py-24 px-6 max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="mb-10">
          <h3 className="text-[10px] uppercase tracking-[0.18em] text-muted font-bold mb-4">
            WORK EXPERIENCE
          </h3>
          <h2 className="text-4xl md:text-[44px] font-bold tracking-tight text-foreground">
            Career Journey
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.work.map((job, index) => (
            <div key={index} className={index === 0 ? "md:col-span-2" : "col-span-1"}>
              <WorkCard job={job} />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function WorkCard({ job }: { job: typeof profile.work[0] }) {
  return (
    <div 
      className="group relative p-8 rounded-[20px] bg-surface hover:shadow-sm border border-transparent hover:border-border transition-all flex flex-col h-full min-h-[220px]"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center shrink-0 font-bold text-lg text-background shadow-sm">
          {job.letter}
        </div>
        <div>
          <h4 className="font-bold text-foreground text-lg">{job.company}</h4>
          <div className="text-xs font-medium text-muted mt-0.5">{job.role}</div>
        </div>
      </div>
      
      <div className="text-[13px] font-semibold text-muted mb-4">{job.dates}</div>
      
      <p className="text-sm text-foreground/80 leading-relaxed flex-grow">
        {job.description}
      </p>
    </div>
  );
}
