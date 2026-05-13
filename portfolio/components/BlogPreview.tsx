"use client";

import { motion } from "framer-motion";
import { profile } from "../data/profile";
import Link from "next/link";

export default function BlogPreview() {
  if (!profile.blog || profile.blog.length === 0) return null;

  return (
    <section id="blog" className="py-24 px-6 max-w-4xl mx-auto border-t border-border/60">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[10px] uppercase tracking-[0.18em] text-muted font-bold">
            LATEST FROM THE BLOG
          </h3>
          <Link href="/blog" className="text-[11px] font-semibold text-muted hover:text-foreground transition-colors">
            View all posts &rarr;
          </Link>
        </div>
        
        <div className="w-full flex flex-col gap-4">
          {profile.blog.map((post, index) => (
            <Link key={index} href={post.url} className="group block">
              <div className="p-6 rounded-xl bg-surface border border-transparent group-hover:border-border group-hover:shadow-sm transition-all">
                <div className="text-xs font-mono font-semibold text-muted mb-3">{post.date}</div>
                <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-foreground/80 transition-colors">{post.title}</h4>
                <p className="text-sm text-foreground/70 mb-4 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="text-xs font-bold text-muted flex items-center gap-1 group-hover:text-foreground transition-colors">
                  Read article &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
