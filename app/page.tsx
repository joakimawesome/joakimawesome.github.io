'use client';

import { useState, useEffect } from 'react';
import Nav from '@/components/nav';
import Hero from '@/components/hero';
import Experience from '@/components/experience';
import Projects from '@/components/projects';
import Publications from '@/components/publications';
import Skills from '@/components/skills';
import Footer from '@/components/footer';
import FocusSection from '@/components/focus-section';
import Chat from '@/components/chat';
import { useActiveSection } from '@/hooks/useActiveSection';

export default function Home() {
  const activeSection = useActiveSection(['hero', 'experience', 'projects', 'publications', 'skills', 'contact']);
  const [isChatMode, setIsChatMode] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Sync state with localStorage on mount and prevent hydration mismatch
  useEffect(() => {
    const savedMode = localStorage.getItem('portfolio-chat-mode');
    if (savedMode === 'true') {
      setIsChatMode(true);
    }
    setIsMounted(true);
  }, []);

  const handleToggleChatMode = (mode: boolean) => {
    setIsChatMode(mode);
    localStorage.setItem('portfolio-chat-mode', String(mode));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-indigo-500/30 relative flex flex-col">
      {/* Subtle technical background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-zinc-950 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_40%,#09090b_100%)] pointer-events-none z-0"></div>
      
      <div className="relative z-10 flex-1 flex flex-col">
        <Nav isChatMode={isChatMode} onToggleChatMode={handleToggleChatMode} />
        
        {isMounted && (
          isChatMode ? (
            <main className="flex-1 w-full flex flex-col">
              <Chat />
            </main>
          ) : (
            <>
              <main className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-8">
                <FocusSection id="hero" isActive={activeSection === 'hero'}>
                  <Hero onTalkToJoakim={() => handleToggleChatMode(true)} />
                </FocusSection>

                <FocusSection id="experience" isActive={activeSection === 'experience'}>
                  <Experience />
                </FocusSection>

                <FocusSection id="projects" isActive={activeSection === 'projects'}>
                  <Projects />
                </FocusSection>

                <FocusSection id="publications" isActive={activeSection === 'publications'}>
                  <Publications />
                </FocusSection>

                <FocusSection id="skills" isActive={activeSection === 'skills'}>
                  <Skills />
                </FocusSection>
              </main>
              <Footer onTalkToJoakim={() => handleToggleChatMode(true)} />
            </>
          )
        )}
      </div>
    </div>
  );
}
