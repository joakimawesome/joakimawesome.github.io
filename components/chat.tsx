'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, User, Cpu, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';
import { chatNodes, ChatNode, SuggestedPrompt } from '@/lib/chat-data';

// Import all portfolio components
import Hero from '@/components/hero';
import Experience from '@/components/experience';
import Projects from '@/components/projects';
import Skills from '@/components/skills';
import Publications from '@/components/publications';

type Message = {
  id: string;
  role: 'ai' | 'user';
  content?: string; // For user messages
  thinkingSteps?: string[]; // For AI messages
  componentName?: string | null; // For AI messages
  text?: string; // For AI messages (optional)
  nodeId?: string; // Links message to the node that produced it
};

const COMPONENT_MAP: Record<string, React.FC> = {
  'Hero': Hero,
  'Experience': Experience,
  'Projects': Projects,
  'Skills': Skills,
  'Publications': Publications,
};

function ThinkingProcess({ steps, isComplete }: { steps: string[], isComplete: boolean }) {
  return (
    <div className="flex flex-col gap-2 mb-4 font-mono text-[13px] text-zinc-500">
      {steps.map((step, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          {isComplete || idx < steps.length - 1 ? (
            <CheckCircle2 className="w-3 h-3 text-emerald-500/70" />
          ) : (
            <Loader2 className="w-3 h-3 text-indigo-400 animate-spin" />
          )}
          <span>{step}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeThinking, setActiveThinking] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestedPrompt[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever messages or thinking steps change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeThinking, suggestions]);

  useEffect(() => {
    triggerNode('welcome');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerNode = (nodeId: string, userText?: string) => {
    // Remove previous occurrences of this node to prevent infinite vertical scrolling
    // and immediately append the corresponding user message.
    setMessages((prev) => {
      let nextMessages = prev.filter((msg) => msg.nodeId !== nodeId);
      if (userText) {
        nextMessages = [
          ...nextMessages,
          { id: Date.now().toString() + '-user', role: 'user', content: userText, nodeId },
        ];
      }
      return nextMessages;
    });

    const node = chatNodes[nodeId];
    if (!node) return;

    setSuggestions([]);
    setIsGenerating(true);
    setActiveThinking([node.thinkingSteps[0]]);

    let stepIndex = 1;
    const interval = setInterval(() => {
      if (stepIndex < node.thinkingSteps.length) {
        setActiveThinking((prev) => [...prev, node.thinkingSteps[stepIndex]]);
        stepIndex++;
      } else {
        clearInterval(interval);
        // Small delay before rendering final component for a realistic feel
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString() + '-ai',
              role: 'ai',
              thinkingSteps: node.thinkingSteps,
              componentName: node.componentName,
              text: node.text,
              nodeId
            },
          ]);
          setIsGenerating(false);
          setActiveThinking([]);
          setSuggestions(node.suggestions);
        }, 300);
      }
    }, 400); // 400ms per thinking step
  };

  const handleSuggestionClick = (suggestion: SuggestedPrompt) => {
    if (isGenerating) return;
    triggerNode(suggestion.action, suggestion.label);
  };

  const renderAiContent = (msg: Message, isComplete: boolean) => {
    const ComponentToRender = msg.componentName ? COMPONENT_MAP[msg.componentName] : null;

    return (
      <div className="flex flex-col w-full">
        <ThinkingProcess steps={msg.thinkingSteps || []} isComplete={isComplete} />
        
        {isComplete && msg.text && (
          <p className="text-zinc-300 font-mono text-sm mb-4">{msg.text}</p>
        )}

        {isComplete && ComponentToRender && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-zinc-950/50 border border-zinc-800/80 rounded-3xl overflow-hidden mt-2 relative chat-component-wrapper"
          >
            {/* The component is rendered inside a wrapper. We might need to override padding in the future 
                if the original components have too much padding for a chat bubble. */}
            <ComponentToRender />
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto min-h-[80vh] flex flex-col pt-12 pb-6 px-4 sm:px-6 relative">
      <div className="flex items-center gap-3 mb-8 border-b border-zinc-800/50 pb-4">
        <Terminal className="w-6 h-6 text-indigo-400" />
        <h1 className="font-mono text-lg font-medium text-zinc-100 tracking-wider">
          JHN_AGENT_CORE v2.0.0
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Online</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-6 flex flex-col gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row w-full'}`}
            >
              <div
                className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border mt-1 ${
                  msg.role === 'user'
                    ? 'bg-zinc-800 border-zinc-700 text-zinc-300'
                    : 'bg-indigo-950/50 border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
              </div>
              
              <div
                className={`flex-1 ${
                  msg.role === 'user'
                    ? 'px-5 py-4 rounded-3xl max-w-[85%] sm:max-w-[75%] font-mono text-sm leading-relaxed whitespace-pre-wrap bg-zinc-800/80 text-zinc-200 rounded-tr-sm'
                    : 'w-full' /* AI container takes full width for components */
                }`}
              >
                {msg.role === 'user' ? msg.content : renderAiContent(msg, true)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isGenerating && activeThinking.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4 flex-row w-full"
          >
            <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center border bg-indigo-950/50 border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.15)] mt-1">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <ThinkingProcess steps={activeThinking} isComplete={false} />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      <div className="mt-auto relative z-20">
        <div className="absolute top-0 left-0 right-0 h-10 -translate-y-full bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none"></div>
        
        <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800/80 p-4 sm:p-6 shadow-2xl">
          {!isGenerating && suggestions.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-indigo-500/30 text-zinc-300 text-sm font-medium transition-all group shadow-sm hover:shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                >
                  {suggestion.label}
                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                </button>
              ))}
            </motion.div>
          ) : (
             <div className="h-[52px] flex items-center px-4">
              <span className="text-zinc-600 font-mono text-sm inline-flex items-center gap-2">
                {isGenerating ? "Agent is processing..." : "Awaiting input..."}
                {isGenerating && <span className="inline-block w-2 h-4 bg-zinc-600 animate-pulse"></span>}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
