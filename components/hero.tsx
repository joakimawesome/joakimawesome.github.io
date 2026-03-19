'use client';

import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowRight, ExternalLink } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center pt-20 pb-12">
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
          M.S. in Artificial Intelligence at UT Austin. Bridging cognitive science and machine learning to advance computational pathology and healthcare applications.
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <a href="#contact" className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-950 px-6 py-3 rounded-full font-medium hover:bg-white transition-colors">
            Get in touch <ArrowRight className="w-4 h-4" />
          </a>
          
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors rounded-full hover:bg-zinc-800/50">
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors rounded-full hover:bg-zinc-800/50">
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="#" className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors rounded-full hover:bg-zinc-800/50">
              <Mail className="w-5 h-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
