'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

const experiences = [
  {
    title: "Graduate Researcher",
    company: "AI Health Lab, UT Austin",
    date: "Mar 2025 – Present",
    description: "Lead the pediatric brain tumor research initiative, overseeing project development, coordinating multidisciplinary teams, and driving milestones to advance AI/ML for pediatric oncology. Developed production-ready multi-agent LLM framework for automated thematic analysis of clinical interviews using LangChain; built scalable, modular codebase for reproducibility and auditability.",
    tags: ["Pediatric Oncology", "Multi-Agent LLMs", "Computational Pathology"]
  },
  {
    title: "Learning Facilitator",
    company: "AI in Healthcare (Graduate Course), UT Austin",
    date: "Jan 2025 – May 2026",
    description: "Led facilitation for 400+ graduate students. Provided direct mentorship, grading, and course material development. Enhanced platform infrastructure through backend troubleshooting and automation, improving scalability and UX for large-scale course delivery.",
    tags: ["AI Education", "Mentorship", "Backend Automation"]
  },
  {
    title: "AI Consultant",
    company: "HealthQuest Capital, Austin, TX",
    date: "Oct 2025 – Mar 2026",
    description: "Architected and deployed agentic LLM workflows on Azure for automated document triage and portfolio analysis in private equity data room operations using OpenAI Agents SDK and Streamlit.",
    tags: ["Agentic Workflows", "Azure Cloud", "Data Rooms"]
  },
  {
    title: "Machine Learning Engineer",
    company: "NanoMood Tech, San Diego, CA",
    date: "Jan 2024 – Sep 2024",
    description: "Developed robust, scalable ML framework for sleep state classification using HRV biosignals with MLflow. Optimized predictive models, achieving 70–95% accuracy. Developed theoretical framework for multimodal AI combining ML models with LLMs; submitted as a grant proposal for healthcare applications.",
    tags: ["ML Engineering", "Biosignal Processing", "Multimodal AI"]
  },
  {
    title: "Data Science & AI Intern",
    company: "Axaitech, Cape Town, South South Africa",
    date: "Jun 2022 – Aug 2022",
    description: "Trained and validated predictive analytics models using bus ticket data from Nairobi and temporally corresponding Uber data. Partnered with CEO and CTO to interpret liquid biopsy data, contributing to potential breakthroughs in classifying and screening for 7 distinct cancer types using advanced ML techniques.",
    tags: ["Predictive Analytics", "Liquid Biopsy", "Cancer Classification"]
  },
  {
    title: "Private Tutor",
    company: "San Diego, CA",
    date: "Aug 2019 – May 2023",
    description: "Provided long-term academic tutoring across STEM subjects; developed communication and pedagogical skills over nearly 4 years.",
    tags: ["STEM Tutoring", "Pedagogy", "Communication"]
  },
  {
    title: "B.S. Cognitive Science",
    company: "UC San Diego",
    date: "Sep 2018 – Dec 2022",
    description: "Specialization in Machine Learning & Neural Computation. GPA: 3.5. Originally on a pre-med track, giving exposure to medicine and healthcare which shaped current AI focus.",
    tags: ["Cognitive Science", "Machine Learning", "Neural Computation"]
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

      const containerRect = container.getBoundingClientRect();
      
      // Track mouse scrolling when within the bounds of the timeline and cards
      const isInSliderRegion =
        e.clientY >= containerRect.top &&
        e.clientY <= containerRect.bottom &&
        e.clientX >= containerRect.left &&
        e.clientX <= containerRect.right;

      if (isInSliderRegion) {
        if (!isHovering.current) {
          isHovering.current = true;
          // Sync current scroll to avoid jumping when mouse enters the slider
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
    <section ref={sectionRef} id="experience" className="py-16 md:py-24 relative">
      <div className="mb-10 md:mb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-zinc-100 mb-3">Experience & Roles</h2>
        <p className="text-base text-zinc-400 max-w-2xl">A blend of academic research, technical leadership, and industry engineering.</p>
      </div>

      <div className="relative group/slider cursor-none">
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
              className="min-w-[260px] md:min-w-[320px] max-w-[320px] flex-shrink-0 relative flex flex-col"
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
              
              <div 
                data-timeline-card
                className="group bg-zinc-900/40 border border-zinc-800/60 p-4 rounded-2xl h-[200px] flex flex-col hover:bg-zinc-900/80 hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden shadow-lg hover:shadow-indigo-500/5"
              >
                
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
