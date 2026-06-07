'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useActiveSection } from '@/hooks/useActiveSection';
import { Sparkles, User } from 'lucide-react';

interface NavProps {
  isChatMode?: boolean;
  onToggleChatMode?: (mode: boolean) => void;
}

export default function Nav({ isChatMode = false, onToggleChatMode }: NavProps) {
  const router = useRouter();
  const activeSection = useActiveSection(['hero', 'experience', 'projects', 'publications', 'skills', 'contact']);

  const handleChatToggle = () => {
    if (onToggleChatMode) {
      onToggleChatMode(!isChatMode);
    } else {
      localStorage.setItem('portfolio-chat-mode', 'true');
      router.push('/');
    }
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (isChatMode && onToggleChatMode) {
      onToggleChatMode(false);
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/50"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          onClick={(e) => {
            if (isChatMode && onToggleChatMode) {
              e.preventDefault();
              onToggleChatMode(false);
            }
          }}
          className="font-serif text-xl font-medium text-zinc-100 tracking-tight"
        >
          JHN.
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link 
            href="/#experience" 
            onClick={(e) => handleNavLinkClick(e, 'experience')}
            className={`transition-colors relative py-1 ${!isChatMode && activeSection === 'experience' ? 'text-indigo-400 font-semibold' : 'hover:text-zinc-100'}`}
          >
            Experience
            {!isChatMode && activeSection === 'experience' && (
              <motion.span layoutId="activeNavIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
            )}
          </Link>
          <Link 
            href="/#projects" 
            onClick={(e) => handleNavLinkClick(e, 'projects')}
            className={`transition-colors relative py-1 ${!isChatMode && activeSection === 'projects' ? 'text-indigo-400 font-semibold' : 'hover:text-zinc-100'}`}
          >
            Projects
            {!isChatMode && activeSection === 'projects' && (
              <motion.span layoutId="activeNavIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
            )}
          </Link>
          <Link 
            href="/#publications" 
            onClick={(e) => handleNavLinkClick(e, 'publications')}
            className={`transition-colors relative py-1 ${!isChatMode && activeSection === 'publications' ? 'text-indigo-400 font-semibold' : 'hover:text-zinc-100'}`}
          >
            Publications
            {!isChatMode && activeSection === 'publications' && (
              <motion.span layoutId="activeNavIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
            )}
          </Link>
          <Link 
            href="/#skills" 
            onClick={(e) => handleNavLinkClick(e, 'skills')}
            className={`transition-colors relative py-1 ${!isChatMode && activeSection === 'skills' ? 'text-indigo-400 font-semibold' : 'hover:text-zinc-100'}`}
          >
            Skills
            {!isChatMode && activeSection === 'skills' && (
              <motion.span layoutId="activeNavIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
            )}
          </Link>
        </nav>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={handleChatToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] focus:outline-none cursor-pointer select-none bg-zinc-900/40 hover:bg-zinc-800/80 border-zinc-800/80 hover:border-indigo-500/30 text-zinc-300"
            aria-label="Talk to Joakim"
          >
            {isChatMode ? (
              <>
                <User className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Portfolio View</span>
              </>
            ) : (
              <>
                <span className="relative flex h-2 w-2 mr-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Talk to Joakim</span>
              </>
            )}
          </button>

          <Link 
            href="/#contact" 
            onClick={(e) => handleNavLinkClick(e, 'contact')}
            className={`text-sm font-medium transition-colors ${!isChatMode && activeSection === 'contact' ? 'text-indigo-400 font-semibold' : 'text-indigo-400 hover:text-indigo-300'}`}
          >
            Contact
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
