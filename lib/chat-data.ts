import { ReactNode } from 'react';

export type SuggestedPrompt = {
  label: string;
  action: string;
};

export type ChatNode = {
  id: string;
  thinkingSteps: string[];
  componentName: 'Hero' | 'Experience' | 'Projects' | 'Skills' | 'Publications' | null;
  text?: string;
  suggestions: SuggestedPrompt[];
};

export const chatNodes: Record<string, ChatNode> = {
  welcome: {
    id: 'welcome',
    thinkingSteps: [
      "Initializing connection...",
      "Loading user profile...",
      "Ready."
    ],
    componentName: 'Hero',
    text: "Welcome to the JHN Agentic Interface. I can retrieve and render any module you request.",
    suggestions: [
      { label: "Show Experience", action: "experience" },
      { label: "View Projects", action: "projects" },
      { label: "View Skills", action: "skills" },
    ]
  },
  experience: {
    id: 'experience',
    thinkingSteps: [
      "Parsing intent: 'experience'",
      "Querying professional history...",
      "Rendering Experience timeline module."
    ],
    componentName: 'Experience',
    suggestions: [
      { label: "View Projects", action: "projects" },
      { label: "View Skills", action: "skills" },
      { label: "Back to Home", action: "welcome" }
    ]
  },
  projects: {
    id: 'projects',
    thinkingSteps: [
      "Parsing intent: 'projects'",
      "Fetching research and project data...",
      "Rendering Projects dashboard."
    ],
    componentName: 'Projects',
    suggestions: [
      { label: "Show Experience", action: "experience" },
      { label: "View Skills", action: "skills" },
      { label: "Back to Home", action: "welcome" }
    ]
  },
  skills: {
    id: 'skills',
    thinkingSteps: [
      "Parsing intent: 'skills'",
      "Aggregating technical capabilities...",
      "Rendering Skills visualization."
    ],
    componentName: 'Skills',
    suggestions: [
      { label: "Show Experience", action: "experience" },
      { label: "View Projects", action: "projects" },
      { label: "Back to Home", action: "welcome" }
    ]
  }
};
