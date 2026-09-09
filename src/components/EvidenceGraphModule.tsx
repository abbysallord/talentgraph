'use client';

import React, { useState } from 'react';
import { 
  Network, 
  Award, 
  Layers, 
  Code2, 
  ExternalLink, 
  ShieldCheck, 
  User, 
  CheckCircle2,
  FileSearch,
  Sparkles
} from 'lucide-react';
import { CandidateProfile, EvidenceNode } from '@/lib/types';

interface EvidenceGraphModuleProps {
  candidates: CandidateProfile[];
  selectedCandidate: CandidateProfile;
  setSelectedCandidate: (cand: CandidateProfile) => void;
  onProceedToScoring: () => void;
}

export const EvidenceGraphModule: React.FC<EvidenceGraphModuleProps> = ({
  candidates,
  selectedCandidate,
  setSelectedCandidate,
  onProceedToScoring,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredNodes = filterCategory === 'all' 
    ? selectedCandidate.evidenceGraph 
    : selectedCandidate.evidenceGraph.filter((n) => n.category === filterCategory);

  const getCategoryBadge = (category: EvidenceNode['category']) => {
    switch (category) {
      case 'outcome':
        return { label: 'Outcome / Impact', color: 'text-amber-400 bg-amber-950/40 border-amber-800/60', icon: Award };
      case 'architecture':
        return { label: 'System Architecture', color: 'text-blue-400 bg-blue-950/40 border-blue-800/60', icon: Layers };
      case 'skill':
        return { label: 'Verified Code Skill', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60', icon: Code2 };
      case 'public_signal':
        return { label: 'Public Signal', color: 'text-purple-400 bg-purple-950/40 border-purple-800/60', icon: Network };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Candidate Selector */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
              <Network className="w-3.5 h-3.5" />
              <span>Module 2: Candidate Evidence Graph</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Structured Evidence Mapping & Signal Extraction
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Deconstructs unstructured candidate resumes and GitHub profiles into a verifiable graph of proof-points: architecture complexity, production outcomes, and live deployments.
            </p>
          </div>

          <button
            onClick={onProceedToScoring}
            className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/10 shrink-0"
          >
            <span>Proceed to AI Reasoning Scorer</span>
            <ShieldCheck className="w-4 h-4" />
          </button>
        </div>

        {/* Candidate Selector Cards */}
        <div className="mt-6">
          <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2 block">
            Select Candidate Profile to Inspect:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {candidates.map((cand) => {
              const isSelected = cand.id === selectedCandidate.id;
              return (
                <button
                  key={cand.id}
                  onClick={() => setSelectedCandidate(cand)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-emerald-500 shadow-md shadow-emerald-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">{cand.name}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div className="text-xs text-slate-300 font-medium truncate">{cand.role}</div>
                  <div className="text-[11px] text-slate-500 mt-1 truncate">{cand.education}</div>
                  <div className="mt-2 text-[10px] text-emerald-400 font-mono">
                    {cand.evidenceGraph.length} Verified Evidence Nodes
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Candidate Header & Meta */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
              {selectedCandidate.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-white">{selectedCandidate.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {selectedCandidate.experienceYears} Years Exp
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {selectedCandidate.role} • {selectedCandidate.location}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {selectedCandidate.githubUrl && (
              <a
                href={selectedCandidate.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
              >
                <span>GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            )}
            {selectedCandidate.portfolioUrl && (
              <a
                href={selectedCandidate.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
              >
                <span>Portfolio</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            )}
          </div>
        </div>

        {/* Evidence Graph Filter Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {['all', 'outcome', 'architecture', 'skill', 'public_signal'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-lg capitalize font-medium transition-all ${
                  filterCategory === cat
                    ? 'bg-slate-800 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Evidence Nodes' : cat.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Showing {filteredNodes.length} of {selectedCandidate.evidenceGraph.length} Extracted Proof Points
          </div>
        </div>

        {/* Evidence Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {filteredNodes.map((node) => {
            const badge = getCategoryBadge(node.category);
            const Icon = badge.icon;
            return (
              <div
                key={node.id}
                className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-2.5">
                    <span className={`inline-flex items-center space-x-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${badge.color}`}>
                      <Icon className="w-3 h-3" />
                      <span>{badge.label}</span>
                    </span>
                    <div className="flex items-center space-x-1 text-xs font-mono font-bold text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{node.confidence}% Confidence</span>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1.5">{node.label}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">{node.detail}</p>
                </div>

                <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate max-w-[240px]">Source: {node.sourceContext}</span>
                  {node.verifiedProofUrl && (
                    <a
                      href={node.verifiedProofUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline inline-flex items-center space-x-1 font-semibold"
                    >
                      <span>Verified Proof</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
