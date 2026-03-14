'use client';

import { motion } from 'motion/react';
import { FileText, ExternalLink } from 'lucide-react';

const publications = [
  {
    title: "Auto-TA: Towards Scalable Automated Thematic Analysis via Multi-Agent LLMs with RL",
    status: "arXiv preprint",
    role: "2nd author",
    topics: ["LLM-driven qualitative analysis", "multi-agent collaboration", "reinforcement learning"],
    link: "#"
  },
  {
    title: "Multimodal Models for Pediatric Brain Tumor Classification",
    status: "In Preparation (MICCAI)",
    role: "Lead Researcher",
    topics: ["WSIs", "Graph Features", "Multimodal Fusion", "Computational Pathology"],
    link: "#"
  }
];

export default function Publications() {
  return (
    <section id="publications" className="py-24 border-t border-zinc-800/50">
      <div className="mb-16">
        <h2 className="font-serif text-3xl sm:text-4xl text-zinc-100 mb-4">Publications & Papers</h2>
        <p className="text-zinc-400 max-w-2xl">Current work in preparation and preprints.</p>
      </div>

      <div className="space-y-6">
        {publications.map((pub, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 hover:bg-zinc-900/50 transition-colors"
          >
            <div className="flex-shrink-0 pt-1">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <FileText className="w-6 h-6" />
              </div>
            </div>
            
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="px-2.5 py-1 text-xs font-mono rounded-md bg-zinc-800 text-zinc-300">
                  {pub.status}
                </span>
                <span className="text-sm text-zinc-500 font-medium">{pub.role}</span>
              </div>
              
              <h3 className="text-xl font-medium text-zinc-100 mb-3 leading-snug">
                {pub.title}
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {pub.topics.map((topic, topicIdx) => (
                  <span key={topicIdx} className="text-sm text-zinc-400">
                    {topic}{topicIdx < pub.topics.length - 1 ? " • " : ""}
                  </span>
                ))}
              </div>
              
              <a href={pub.link} className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                Read Paper <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
