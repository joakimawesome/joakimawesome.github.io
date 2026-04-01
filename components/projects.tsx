'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    title: "Pediatric Histopathology",
    description: "Lead researcher analyzing whole-slide pathology images. Exploring tumor subtype classification, attention heatmaps, and multimodal fusion.",
    tags: ["Computational Pathology", "Whole Slide Images", "Pathology Foundation Models", "Tumor Classification", "Deep Learning"],
    seed: "microscope",
    link: "/projects/pediatric-histopathology"
  },
  {
    title: "Thematica",
    description: "Multi-agent LLM system for qualitative research automation. Features Coder, Sub-Themer, Themer, and Reviewer agents for analyzing clinical interviews.",
    tags: ["LangChain", "LangGraph", "Multi-Agent LLMs", "Hydra"],
    seed: "network",
    link: "/projects/thematica"
  },
  {
    title: "Private Equity LLM Agents",
    description: "",
    tags: ["Healthcare/Finance", "Muti-Agent LLMs", "OpenAI Platform", "Azure Cloud"],
    seed: "neuroscience",
    link: "#"
  },
  {
    title: "Sleep EEG",
    description: "Signal processing techniques to filter and analyze EEG data for sleep pattern recognition.",
    tags: ["Electroencephalography", "Sleep Research", "Signal Processing", "Experiment Tracking", "Time-series Analysis"],
    seed: "neuroscience",
    link: "#"
  },
  {
    title: "Music Analysis via Spotify",
    description: "",
    tags: ["Unsupervised Machine Learning", "Time-series Analysis"],
    seed: "music",
    link: "#"
  }
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="mb-10 md:mb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-zinc-100 mb-3">Research & Projects</h2>
        <p className="text-base text-zinc-400 max-w-2xl">Key initiatives spanning computational pathology and qualitative NLP pipelines.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative items-start">
        
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
              {/* Clickable image area */}
              <a
                href={projects[activeProject].link}
                className="group/card relative w-full aspect-[21/9] rounded-2xl overflow-hidden bg-zinc-900 mb-4 border border-zinc-800/50 shadow-md block cursor-pointer"
              >
                <Image 
                  src={`https://picsum.photos/seed/${projects[activeProject].seed}/800/600`} 
                  alt={projects[activeProject].title} 
                  fill 
                  className="object-cover opacity-80 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-500" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                
                {/* Centered overlay prompt */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                  <span className="bg-zinc-100 text-zinc-950 px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-xl">
                    View Project <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </a>
              
              <h3 className="text-lg sm:text-xl font-medium text-zinc-100 mb-2 leading-tight">
                {projects[activeProject].title}
              </h3>
              
              <p className="text-zinc-400 leading-relaxed mb-4 text-sm">
                {projects[activeProject].description}
              </p>
              
              <div className="relative overflow-hidden w-full group/marquee pointer-events-none rounded-md mask-image-linear-to-r mb-5">
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>
                <motion.div 
                  className="flex gap-2 w-max"
                  animate={{ x: ["0%", "calc(-50% - 0.25rem)"] }}
                  transition={{ ease: "linear", duration: 15, repeat: Infinity }}
                >
                  {[...projects[activeProject].tags, ...projects[activeProject].tags].map((tag, tagIdx) => (
                    <span 
                      key={tagIdx} 
                      className="px-3 py-1.5 text-[11px] uppercase tracking-wider font-mono rounded-md bg-zinc-900/50 border border-zinc-800 text-zinc-300 whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Prominent View Project button */}
              {projects[activeProject].link !== '#' && (
                <a
                  href={projects[activeProject].link}
                  className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-medium hover:bg-indigo-500/20 hover:border-indigo-400/50 hover:text-indigo-300 transition-all duration-300"
                >
                  View Project <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
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
                className={`group py-4 border-b border-zinc-800/50 cursor-pointer transition-all duration-500 ${
                  activeProject === idx ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                }`}
              >
                <div className="flex items-center gap-6 sm:gap-8">
                  <span className="text-sm font-mono text-zinc-600 shrink-0">
                    0{idx + 1}
                  </span>
                  <h3 
                    className={`text-lg sm:text-xl lg:text-2xl font-serif transition-all duration-500 flex-grow ${
                      activeProject === idx ? 'text-indigo-400 translate-x-2 sm:translate-x-4' : 'text-zinc-100'
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
