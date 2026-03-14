'use client';

import { motion } from 'motion/react';

export default function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/50"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a href="#" className="font-serif text-xl font-medium text-zinc-100 tracking-tight">
          JHN.
        </a>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#experience" className="hover:text-zinc-100 transition-colors">Experience</a>
          <a href="#projects" className="hover:text-zinc-100 transition-colors">Projects</a>
          <a href="#publications" className="hover:text-zinc-100 transition-colors">Publications</a>
          <a href="#skills" className="hover:text-zinc-100 transition-colors">Skills</a>
        </nav>
        
        <a href="#contact" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
          Contact
        </a>
      </div>
    </motion.header>
  );
}
