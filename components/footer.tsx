import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="py-12 border-t border-zinc-800/50 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="font-serif text-xl font-medium text-zinc-100">Joakim H. Nguyen</p>
          <p className="text-sm text-zinc-500">M.S. in AI @ UT Austin</p>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <Github className="w-5 h-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <Linkedin className="w-5 h-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors">
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
