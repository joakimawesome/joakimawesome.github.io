import { Github, Linkedin, Mail, Sparkles } from 'lucide-react';

interface FooterProps {
  onTalkToJoakim?: () => void;
}

export default function Footer({ onTalkToJoakim }: FooterProps) {
  return (
    <footer id="contact" className="py-12 border-t border-zinc-800/50 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="font-serif text-xl font-medium text-zinc-100">Joakim H. Nguyen</p>
          <p className="text-sm text-zinc-500">AI Researcher & Engineer</p>
          {onTalkToJoakim && (
            <button 
              onClick={onTalkToJoakim}
              className="mt-3 inline-flex items-center gap-1.5 bg-zinc-900/40 border border-zinc-800/80 hover:border-indigo-500/30 text-zinc-300 hover:text-zinc-100 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] group cursor-pointer"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
              </span>
              Talk to Joakim (AI)
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-12 transition-transform" />
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-6">
          <a href="https://github.com/joakimawesome" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <Github className="w-5 h-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://linkedin.com/in/joakimnguyen" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <Linkedin className="w-5 h-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="mailto:joakim.nguyen99@gmail.com" className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <Mail className="w-5 h-5" />
            <span className="sr-only">Email</span>
          </a>
        </div>
        
        <div className="text-sm text-zinc-600 text-center md:text-right" suppressHydrationWarning>
          &copy; {new Date().getFullYear()} Joakim H. Nguyen.<br/>All rights reserved.
        </div>
      </div>
    </footer>
  );
}
