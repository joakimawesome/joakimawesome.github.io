'use client';

import { motion } from 'motion/react';
import { useActiveSection } from '@/hooks/useActiveSection';

export default function Nav() {
  const activeSection = useActiveSection(['hero', 'experience', 'projects', 'publications', 'skills', 'contact']);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/50"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a href="/" className="font-serif text-xl font-medium text-zinc-100 tracking-tight">
          JHN.
        </a>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a 
            href="/#experience" 
            className={`transition-colors relative py-1 ${activeSection === 'experience' ? 'text-indigo-400 font-semibold' : 'hover:text-zinc-100'}`}
          >
            Experience
            {activeSection === 'experience' && (
              <motion.span layoutId="activeNavIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
            )}
          </a>
          <a 
            href="/#projects" 
            className={`transition-colors relative py-1 ${activeSection === 'projects' ? 'text-indigo-400 font-semibold' : 'hover:text-zinc-100'}`}
          >
            Projects
            {activeSection === 'projects' && (
              <motion.span layoutId="activeNavIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
            )}
          </a>
          <a 
            href="/#publications" 
            className={`transition-colors relative py-1 ${activeSection === 'publications' ? 'text-indigo-400 font-semibold' : 'hover:text-zinc-100'}`}
          >
            Publications
            {activeSection === 'publications' && (
              <motion.span layoutId="activeNavIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
            )}
          </a>
          <a 
            href="/#skills" 
            className={`transition-colors relative py-1 ${activeSection === 'skills' ? 'text-indigo-400 font-semibold' : 'hover:text-zinc-100'}`}
          >
            Skills
            {activeSection === 'skills' && (
              <motion.span layoutId="activeNavIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
            )}
          </a>
        </nav>
        
        <a 
          href="/#contact" 
          className={`text-sm font-medium transition-colors ${activeSection === 'contact' ? 'text-indigo-400 font-semibold' : 'text-indigo-400 hover:text-indigo-300'}`}
        >
          Contact
        </a>
      </div>
    </motion.header>
  );
}
