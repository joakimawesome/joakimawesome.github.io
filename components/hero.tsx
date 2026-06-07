'use client';

import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

interface HeroProps {
  onTalkToJoakim?: () => void;
}

export default function Hero({ onTalkToJoakim }: HeroProps) {
  return (
    <section id="hero" className="min-h-[80vh] flex flex-col justify-center pt-20 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-indigo-500"></span>
          <span className="font-mono text-sm tracking-wider text-indigo-400 uppercase">AI Researcher & Engineer</span>
        </div>
        
        <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-zinc-100 mb-3 leading-[1.1]">
          Joakim H. Nguyen
        </h1>
        
        <p className="text-base text-zinc-400 max-w-xl mb-6 leading-relaxed">
          M.S. in <strong className="font-medium text-zinc-200">Artificial Intelligence</strong> at UT Austin and B.S. in <strong className="font-medium text-zinc-200">Cognitive Science</strong> (specialization in <strong className="font-medium text-zinc-200">Machine Learning</strong> &amp; <strong className="font-medium text-zinc-200">Neural Computation</strong>) from UC San Diego. With a <strong className="font-medium text-zinc-200">pre-med background</strong>, I bridge cognitive science and machine learning to advance healthcare applications.
        </p>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <a href="#contact" className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-950 px-6 py-3 rounded-full font-medium hover:bg-white transition-colors">
            Get in touch <ArrowRight className="w-4 h-4" />
          </a>
          
          {onTalkToJoakim && (
            <button
              onClick={onTalkToJoakim}
              className="inline-flex items-center gap-2.5 bg-zinc-900/40 border border-zinc-800/80 hover:border-indigo-500/30 text-zinc-300 hover:text-zinc-100 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] group cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Talk to Joakim
              <Sparkles className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
            </button>
          )}
          
          <div className="flex items-center gap-4">
            <a href="https://github.com/joakimawesome" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors rounded-full hover:bg-zinc-800/50">
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://linkedin.com/in/joakimnguyen" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors rounded-full hover:bg-zinc-800/50">
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="mailto:joakim.nguyen99@gmail.com" className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors rounded-full hover:bg-zinc-800/50">
              <Mail className="w-5 h-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
