'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    title: "Pediatric Brain Tumor",
    description: "Lead researcher analyzing whole-slide pathology images. Exploring tumor subtype classification, attention heatmaps, and multimodal fusion.",
    tags: ["Computational Pathology", "Whole Slide Images", "Pathology Foundation Models", "Interpretability"],
    seed: "microscope",
    link: "#"
  },
  {
    title: "Thematica",
    description: "Multi-agent LLM system for qualitative research automation. Features Coder, Sub-Themer, Themer, and Reviewer agents for analyzing clinical interviews.",
    tags: ["LangChain", "LangGraph", "Multi-Agent LLMs", "Hydra"],
    seed: "network",
    link: "#"
  },
  {
    title: "Pediatric Brain Tumor",
    description: "Pipeline for pathology experiments including WSI segmentation, patch extraction, and feature extraction with PFMs.",
    tags: ["Computational Pathology", "Pathology Foundation Models", "Whole Slide Images"],
    seed: "biology",
    link: "#"
  }
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section id="projects" className="py-24 border-t border-zinc-800/50">
      <div className="mb-16">
        <h2 className="font-serif text-3xl sm:text-4xl text-zinc-100 mb-4">Research & Projects</h2>
        <p className="text-zinc-400 max-w-2xl">Key initiatives spanning computational pathology and qualitative NLP pipelines.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative items-start">
        
        {/* Left: Sticky Details Pane */}
        <div className="w-full lg:w-5/12 lg:sticky lg:top-32 order-2 lg:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-900 mb-8 border border-zinc-800/50 shadow-2xl">
                <Image 
                  src={`https://picsum.photos/seed/${projects[activeProject].seed}/800/600`} 
                  alt={projects[activeProject].title} 
                  fill 
                  className="object-cover opacity-80" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent"></div>
                
                {/* Floating View Button */}
                <a 
                  href={projects[activeProject].link}
                  className="absolute bottom-6 right-6 w-12 h-12 bg-zinc-100 text-zinc-950 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  aria-label="View Project"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
              
              <h3 className="text-2xl font-medium text-zinc-100 mb-4 leading-tight">
                {projects[activeProject].title}
              </h3>
              
              <p className="text-zinc-400 leading-relaxed mb-8 text-lg">
                {projects[activeProject].description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {projects[activeProject].tags.map((tag, tagIdx) => (
                  <span 
                    key={tagIdx} 
                    className="px-3 py-1.5 text-[11px] uppercase tracking-wider font-mono rounded-md bg-zinc-900/50 border border-zinc-800 text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Interactive List */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center order-1 lg:order-2">
          <div className="border-t border-zinc-800/50">
            {projects.map((project, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveProject(idx)}
                onClick={() => setActiveProject(idx)}
                className={`group py-8 border-b border-zinc-800/50 cursor-pointer transition-all duration-500 ${
                  activeProject === idx ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                }`}
              >
                <div className="flex items-center gap-6 sm:gap-8">
                  <span className="text-sm font-mono text-zinc-600 shrink-0">
                    0{idx + 1}
                  </span>
                  <h3 
                    className={`text-2xl sm:text-3xl lg:text-4xl font-serif transition-all duration-500 flex-grow ${
                      activeProject === idx ? 'text-indigo-400 translate-x-2 sm:translate-x-6' : 'text-zinc-100'
                    }`}
                  >
                    {project.title}
                  </h3>
                  <ArrowUpRight 
                    className={`w-6 h-6 shrink-0 transition-all duration-500 ${
                      activeProject === idx ? 'text-indigo-400 opacity-100 translate-x-0' : 'text-zinc-600 opacity-0 -translate-x-4'
                    }`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
