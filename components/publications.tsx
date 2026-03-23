'use client';

import { motion } from 'motion/react';
import { FileText, ExternalLink } from 'lucide-react';

const publications = [
  {
    title: "Automated Thematic Analysis for Clinical Qualitative Data: Iterative Codebook Refinement with Full Provenance",
    status: "arXiv preprint",
    role: "2nd author",
    topics: [],
    link: "https://doi.org/10.48550/arXiv.2603.08989"
  },  
  {
    title: "PathMoE: Interpretable Multimodal Interaction Experts for Pediatric Brain Tumor Classification",
    status: "arXiv preprint",
    role: "Team Lead",
    topics: ["Pathology", "Mixture of Experts", "Multimodality", "Interpretability", "Cell Graph Network"],
    link: "https://doi.org/10.48550/arXiv.2603.01547"
  },
  {
    title: "Clinically-Informed Modeling for Pediatric Brain Tumor Classification from Whole-Slide Histopathology Images",
    status: "arXiv preprint",
    role: "1st author",
    topics: ["Pathology", "Multiple Instance Learning", "Contrastive Learning"],
    link: "#"
  },
  {
    title: "Auto-TA: Towards Scalable Automated Thematic Analysis via Multi-Agent LLMs with RL",
    status: "arXiv preprint",
    role: "2nd author",
    topics: ["LLM-driven qualitative analysis", "multi-agent collaboration", "reinforcement learning"],
    link: "https://doi.org/10.48550/arXiv.2506.23998"
  },
  {
    title: "Position: Thematic Analysis of Unstructured Clinical Transcripts with Large Language Models",
    status: "arXiv preprint",
    role: "2nd author",
    topics: [],
    link: "https://doi.org/10.48550/arXiv.2509.14597"
  },  
  {
    title: "SFT-TA: Supervised Fine-Tuned Agents in Multi-Agent LLMs for Automated Inductive Thematic Analysis",
    status: "arXiv preprint",
    role: "2nd author",
    topics: [],
    link: "https://doi.org/10.48550/arXiv.2509.17167"
  },    
];

export default function Publications() {
  return (
    <section id="publications" className="py-16 md:py-24 border-t border-zinc-800/50">
      <div className="mb-10 md:mb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-zinc-100 mb-3">Publications & Papers</h2>
        <p className="text-base text-zinc-400 max-w-2xl">Current work in preparation and preprints.</p>
      </div>

      <div className="space-y-8">
        {publications.map((pub, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/80 hover:bg-zinc-900/50 transition-colors"
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
              
              <h3 className="text-lg font-medium text-zinc-100 mb-2 leading-snug">
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
