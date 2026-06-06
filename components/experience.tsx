'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

const experiences = [
  {
    title: "Graduate Researcher",
    company: "AI Health Lab, UT Austin",
    shortCompany: "AI Health Lab",
    date: "Mar 2025 – Present",
    year: "2025",
    description: "Lead the pediatric brain tumor research initiative, overseeing project development, coordinating multidisciplinary teams, and driving milestones to advance AI/ML for pediatric oncology. Developed production-ready multi-agent LLM framework for automated thematic analysis of clinical interviews using LangChain; built scalable, modular codebase for reproducibility and auditability.",
    tags: ["Pediatric Oncology", "Multi-Agent LLMs", "Computational Pathology"]
  },
  {
    title: "Learning Facilitator",
    company: "AI in Healthcare (Graduate Course), UT Austin",
    shortCompany: "UT Austin (TA)",
    date: "Jan 2025 – May 2026",
    year: "2025",
    description: "Led facilitation for 400+ graduate students. Provided direct mentorship, grading, and course material development. Enhanced platform infrastructure through backend troubleshooting and automation, improving scalability and UX for large-scale course delivery.",
    tags: ["AI Education", "Mentorship", "Backend Automation"]
  },
  {
    title: "AI Consultant",
    company: "HealthQuest Capital, Austin, TX",
    shortCompany: "HealthQuest",
    date: "Oct 2025 – Mar 2026",
    year: "2025",
    description: "Architected and deployed agentic LLM workflows on Azure for automated document triage and portfolio analysis in private equity data room operations using OpenAI Agents SDK and Streamlit.",
    tags: ["Agentic Workflows", "Azure Cloud", "Data Rooms"]
  },
  {
    title: "Machine Learning Engineer",
    company: "NanoMood Tech, San Diego, CA",
    shortCompany: "NanoMood",
    date: "Jan 2024 – Sep 2024",
    year: "2024",
    description: "Developed robust, scalable ML framework for sleep state classification using HRV biosignals with MLflow. Optimized predictive models, achieving 70–95% accuracy. Developed theoretical framework for multimodal AI combining ML models with LLMs; submitted as a grant proposal for healthcare applications.",
    tags: ["ML Engineering", "Biosignal Processing", "Multimodal AI"]
  },
  {
    title: "Data Science & AI Intern",
    company: "Axaitech, Cape Town, South South Africa",
    shortCompany: "Axaitech",
    date: "Jun 2022 – Aug 2022",
    year: "2022",
    description: "Trained and validated predictive analytics models using bus ticket data from Nairobi and temporally corresponding Uber data. Partnered with CEO and CTO to interpret liquid biopsy data, contributing to potential breakthroughs in classifying and screening for 7 distinct cancer types using advanced ML techniques.",
    tags: ["Predictive Analytics", "Liquid Biopsy", "Cancer Classification"]
  },
  {
    title: "Private Tutor",
    company: "San Diego, CA",
    shortCompany: "Tutor",
    date: "Aug 2019 – May 2023",
    year: "2019",
    description: "Provided long-term academic tutoring across STEM subjects; developed communication and pedagogical skills over nearly 4 years.",
    tags: ["STEM Tutoring", "Pedagogy", "Communication"]
  }
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const isHovering = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Joystick scroll states and refs
  const [mouseDisplacement, setMouseDisplacement] = useState(0);
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const mouseDisplacementRef = useRef(0);

  const scrollToCard = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('[data-timeline-card]');
    const card = cards[index];
    if (!card) return;

    const cardRect = card.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Card position relative to container's left edge
    const relativeLeft = container.scrollLeft + cardRect.left - containerRect.left;
    
    // Center the card in the viewport
    const target = relativeLeft - (containerRect.width - cardRect.width) / 2;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const clampedTarget = Math.max(0, Math.min(maxScroll, target));

    // Update targeting refs
    targetScroll.current = clampedTarget;
    currentScroll.current = clampedTarget;
    setActiveIndex(index);

    container.scrollTo({
      left: clampedTarget,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    // Sync refs if user scrolled via other means (touch/trackpad)
    if (!isHovering.current) {
      currentScroll.current = container.scrollLeft;
      targetScroll.current = container.scrollLeft;
    }

    // Determine the active card closest to the container's center
    const cards = container.querySelectorAll('[data-timeline-card]');
    let closestIndex = 0;
    let minDistance = Infinity;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      const container = scrollRef.current;
      if (!section || !container) return;

      const containerRect = container.getBoundingClientRect();
      
      // Keep scrolling active anywhere along the horizontal axis within the vertical timeline band
      const isInTimelineRegion =
        e.clientY >= containerRect.top &&
        e.clientY <= containerRect.bottom;

      if (isInTimelineRegion) {
        if (!isHovering.current) {
          isHovering.current = true;
          setShowCustomCursor(true);
          // Sync current scroll
          currentScroll.current = container.scrollLeft;
          targetScroll.current = container.scrollLeft;
        }

        const centerX = containerRect.left + containerRect.width / 2;
        const maxDisplacement = containerRect.width / 2;
        const displacement = e.clientX - centerX;

        // Clamp normalized displacement between -1 and 1
        const normalized = Math.max(-1, Math.min(1, displacement / maxDisplacement));
        mouseDisplacementRef.current = normalized;
        setMouseDisplacement(normalized);
      } else {
        if (isHovering.current) {
          isHovering.current = false;
          setShowCustomCursor(false);
          mouseDisplacementRef.current = 0;
          setMouseDisplacement(0);
        }
      }
    };

    const handleMouseLeave = () => {
      if (isHovering.current) {
        isHovering.current = false;
        setShowCustomCursor(false);
        mouseDisplacementRef.current = 0;
        setMouseDisplacement(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const loop = () => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (isHovering.current) {
          // Continuous scroll speed based on displacement (up to 22px per frame)
          const velocity = mouseDisplacementRef.current * 22;
          targetScroll.current = Math.max(0, Math.min(maxScroll, targetScroll.current + velocity));
        }

        const diff = targetScroll.current - currentScroll.current;
        if (Math.abs(diff) > 0.5) {
          currentScroll.current += diff * 0.08;
          container.scrollLeft = currentScroll.current;
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

      {/* Silhouette Timeline Map Navigator */}
      <div className="flex flex-col items-center mb-10 w-full select-none">
        <div className="relative flex items-center justify-between w-full max-w-3xl px-4 sm:px-12">
          {experiences.map((exp, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => scrollToCard(idx)}
                className="group/mini relative flex flex-col items-center focus:outline-none rounded-lg p-1 transition-all duration-300"
                aria-label={`Go to ${exp.title} at ${exp.company}`}
              >
                {/* Silhouette Card */}
                <div 
                  className={`w-10 h-6 sm:w-16 sm:h-10 md:w-20 md:h-12 rounded-md border flex flex-col p-1 sm:p-1.5 transition-all duration-500 relative overflow-hidden bg-zinc-900/30 cursor-pointer ${
                    isActive 
                      ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.25)] scale-105 sm:scale-110' 
                      : 'border-zinc-800/80 hover:border-zinc-500/50 hover:bg-zinc-800/30'
                  }`}
                >
                  {/* Tiny Skeleton lines representing card text */}
                  <div className={`h-0.5 sm:h-1 w-[70%] rounded-full transition-colors duration-500 mb-0.5 sm:mb-1 ${
                    isActive ? 'bg-indigo-400' : 'bg-zinc-700/60 group-hover/mini:bg-zinc-600'
                  }`}></div>
                  <div className={`h-0.5 w-[50%] rounded-full transition-colors duration-500 mb-0.5 sm:mb-2 ${
                    isActive ? 'bg-indigo-500/50' : 'bg-zinc-800/80'
                  }`}></div>
                  <div className={`h-0.5 w-[85%] rounded-full transition-colors duration-500 ${
                    isActive ? 'bg-indigo-500/20' : 'bg-zinc-800/40'
                  }`}></div>
                  
                  {/* Glass/Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : ''
                  }`} />
                </div>

                {/* Date/Year Label */}
                <span className={`text-[9px] sm:text-xs font-mono font-medium mt-2 transition-colors duration-500 ${
                  isActive ? 'text-indigo-400 font-semibold' : 'text-zinc-600 group-hover/mini:text-zinc-400'
                }`}>
                  {exp.year}
                </span>

                {/* Tooltip on Hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-zinc-900/95 border border-zinc-800 text-[10px] font-mono text-zinc-300 font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover/mini:opacity-100 transition-opacity duration-300 shadow-xl z-50 backdrop-blur-sm">
                  <div className="text-zinc-100 font-medium">{exp.shortCompany}</div>
                  <div className="text-zinc-500 text-[9px]">{exp.title}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative group/slider cursor-ew-resize">
        {showCustomCursor && (
          <div className="absolute top-[24px] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 flex items-center justify-center">
            {/* Outer Pulsing Glow */}
            <div className="absolute w-6 h-6 rounded-full border border-indigo-500/30 bg-indigo-500/5 animate-ping duration-1000" />
            
            {/* Center Lock Ring */}
            <div className="w-4 h-4 rounded-full border border-indigo-400 bg-zinc-950/90 shadow-[0_0_10px_rgba(99,102,241,0.6)] flex items-center justify-center z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            </div>
            
            {/* Left/Right Directional Trail */}
            <div 
              style={{
                width: `${Math.abs(mouseDisplacement) * 120}px`,
                transform: `scaleX(${mouseDisplacement < 0 ? -1 : 1})`,
                transformOrigin: 'left center'
              }}
              className="absolute left-1/2 h-[2px] bg-gradient-to-r from-indigo-500 to-transparent opacity-80"
            />
            
            {/* Small glowing head at the end of the trail */}
            {Math.abs(mouseDisplacement) > 0.05 && (
              <div 
                style={{
                  transform: `translateX(${mouseDisplacement * 120}px)`,
                }}
                className="absolute w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)] transition-transform duration-75"
              />
            )}
          </div>
        )}
        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-8 pt-4 px-4 -mx-4 items-start [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {/* Left Spacer to allow centering first card */}
          <div className="w-[calc(50%-154px)] md:w-[calc(50%-184px)] flex-shrink-0" />

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
                <div className={`w-4 h-4 rounded-full bg-zinc-950 border-2 transition-all duration-500 z-10 ${
                  idx === activeIndex
                    ? 'border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] scale-110'
                    : 'border-zinc-700'
                }`}></div>
                {/* Connecting line */}
                <div className={`h-px bg-zinc-800 flex-grow -ml-2 ${idx === experiences.length - 1 ? 'bg-gradient-to-r from-zinc-800 to-transparent' : ''}`}></div>
              </div>

              <div className={`text-sm font-mono mb-4 px-2 transition-colors duration-500 ${
                idx === activeIndex ? 'text-indigo-400' : 'text-zinc-500'
              }`}>
                {exp.date}
              </div>
              
              <div 
                data-timeline-card
                className={`group bg-zinc-900/40 border p-4 rounded-2xl h-[230px] flex flex-col hover:bg-zinc-900/80 transition-all duration-500 relative overflow-hidden shadow-lg hover:shadow-indigo-500/5 cursor-default ${
                  idx === activeIndex
                    ? 'border-indigo-500/50 shadow-indigo-500/5'
                    : 'border-zinc-800/60 hover:border-indigo-500/30'
                }`}
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
          {/* Right Spacer to allow centering last card */}
          <div className="w-[calc(50%-154px)] md:w-[calc(50%-184px)] flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}
