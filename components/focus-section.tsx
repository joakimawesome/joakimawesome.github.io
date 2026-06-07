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


      {children}
    </div>
  );
}
