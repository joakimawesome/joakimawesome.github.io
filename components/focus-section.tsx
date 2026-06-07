'use client';

import React from 'react';
import { motion } from 'motion/react';

interface FocusSectionProps {
  id: string;
  isActive: boolean;
  children: React.ReactNode;
}

export default function FocusSection({ id, isActive, children }: FocusSectionProps) {
  return (
    <div 
      id={id}
      className={`relative transition-all duration-700 ease-out ${
        isActive 
          ? 'opacity-100 blur-0 scale-100 grayscale-0' 
          : 'opacity-35 blur-[0.4px] scale-[0.99] grayscale-[15%]'
      }`}
    >
      {/* Background spotlight radial gradient */}
      <div 
        className={`absolute -inset-x-12 -inset-y-16 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.04)_0%,transparent_70%)] rounded-[40px] pointer-events-none -z-10 transition-opacity duration-1000 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Sleek, minimalistic metadata badge */}
      {isActive && id !== 'hero' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-3 right-0 flex items-center justify-center pointer-events-none select-none bg-zinc-950/80 backdrop-blur-sm p-2 rounded-full border border-indigo-500/20 shadow-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
          </span>
        </motion.div>
      )}

      {children}
    </div>
  );
}
