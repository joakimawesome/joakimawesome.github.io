'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

const experiences = [
  {
    title: "Graduate Researcher",
    company: "AI Health Lab, UT Austin",
    date: "Present",
    description: "Leading the pediatric brain tumor histopathology AI project under Ying Ding. Focusing on vision foundation models for pathology, whole-slide image analysis, and multimodal AI methods for medical data.",
    tags: ["Computational Pathology", "Vision Foundation Models", "Multimodal AI"]
  },
  {
    title: "Teaching Assistant",
    company: "AI in Healthcare, UT Austin",
    date: "Present",
    description: "Supporting instruction and helping students with ML/AI concepts. Assisting with course materials and evaluation for the AI in Healthcare course.",
    tags: ["Mentorship", "AI Education", "Healthcare"]
  },
  {
    title: "Machine Learning Engineer",
    company: "NanoMood Tech",
    date: "Previous",
    description: "Worked on ML systems for a UCSD-affiliated startup. Collaborated closely with CEO and CTO to structure the ML codebase, organize GitHub-based development processes, and balance engineering workloads.",
    tags: ["ML Engineering", "Startup", "GitHub Workflows"]
  },
  {
    title: "B.S. Cognitive Science",
    company: "UC San Diego",
    date: "Previous",
    description: "Machine Learning & Neural Computation specialization. Originally on a pre-med track, giving exposure to medicine and healthcare which shaped current AI focus.",
    tags: ["Cognitive Science", "Pre-med", "Neural Computation"]
  }
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const isHovering = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      const container = scrollRef.current;
      if (!section || !container) return;

      const rect = section.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Check if mouse is within the vertical bounds of the section
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        if (!isHovering.current) {
          isHovering.current = true;
          // Sync current scroll to avoid jumping when mouse enters the section vertically
          currentScroll.current = container.scrollLeft;
          targetScroll.current = container.scrollLeft;
        }
        
        // Calculate position relative to the container's left edge
        const x = e.clientX - containerRect.left;
        const width = containerRect.width;
        
        // Apply a margin so the user doesn't have to go all the way to the edge
        const margin = Math.min(width * 0.15, 150); // 15% or 150px, whichever is smaller
        const adjustedWidth = width - (margin * 2);
        const adjustedX = x - margin;
        
        // Calculate percentage of mouse position across the adjusted container width
        // Clamp between 0 and 1
        const percentage = Math.max(0, Math.min(1, adjustedX / adjustedWidth));
        
        // Calculate max possible scroll
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // Set the target scroll position based on mouse percentage
        targetScroll.current = percentage * maxScroll;
      } else {
        isHovering.current = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const loop = () => {
      if (scrollRef.current && isHovering.current) {
        // Smooth linear interpolation (lerp) towards the target scroll
        currentScroll.current += (targetScroll.current - currentScroll.current) * 0.05;
        
        // Only update DOM if the change is noticeable to prevent layout thrashing
        if (Math.abs(targetScroll.current - currentScroll.current) > 0.5) {
          scrollRef.current.scrollLeft = currentScroll.current;
        }
      }
      requestRef.current = requestAnimationFrame(loop);
    };
    requestRef.current = requestAnimationFrame(loop);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-2 relative">
      <div className="mb-6">
        <h2 className="font-serif text-xl sm:text-2xl text-zinc-100 mb-2">Experience & Roles</h2>
        <p className="text-sm text-zinc-400 max-w-2xl">A blend of academic research, technical leadership, and industry engineering.</p>
      </div>

      <div className="relative group/slider cursor-ew-resize">
        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-hidden pb-8 pt-4 px-4 -mx-4 items-start [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="min-w-[260px] md:min-w-[320px] max-w-[320px] flex-shrink-0 relative flex flex-col cursor-default"
            >
              {/* Timeline Line & Dot */}
              <div className="flex items-center mb-8 relative">
                <div className="w-4 h-4 rounded-full bg-zinc-950 border-2 border-indigo-500 z-10 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                {/* Connecting line */}
                <div className={`h-px bg-zinc-800 flex-grow -ml-2 ${idx === experiences.length - 1 ? 'bg-gradient-to-r from-zinc-800 to-transparent' : ''}`}></div>
              </div>

              <div className="text-sm font-mono text-indigo-400 mb-4 px-2">
                {exp.date}
              </div>
              
              <div className="group bg-zinc-900/40 border border-zinc-800/60 p-4 rounded-2xl h-[200px] flex flex-col hover:bg-zinc-900/80 hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden shadow-lg hover:shadow-indigo-500/5">
                
                {/* Header (Always visible) */}
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-zinc-100 mb-1">{exp.title}</h3>
                    <p className="text-xs text-zinc-500 font-medium">{exp.company}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-center text-zinc-500 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all duration-500 shrink-0 ml-4">
                    <Plus className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                </div>
                
                {/* Tags (Visible by default, fades out and slides down on hover) */}
                <div className="flex flex-wrap gap-2 mt-auto transition-all duration-500 group-hover:translate-y-8 group-hover:opacity-0">
                  {exp.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className="px-2.5 py-1 text-[11px] uppercase tracking-wider font-mono rounded-md bg-zinc-950 border border-zinc-800/80 text-zinc-300">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description (Hidden by default, slides up and fades in on hover) */}
                <div className="absolute inset-x-4 bottom-4 top-16 pt-2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <p className="text-zinc-300 leading-relaxed text-sm">
                    {exp.description}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
          {/* Spacer to ensure the last item can be scrolled fully into view */}
          <div className="min-w-[10px] md:min-w-[24px] flex-shrink-0"></div>
        </div>
      </div>
    </section>
  );
}
