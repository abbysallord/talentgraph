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
  Sparkles,
  ArrowRight,
  GitBranch,
  Globe
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
        return { label: 'Shipped Outcome', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', icon: Award };
      case 'architecture':
        return { label: 'System Architecture', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', icon: Layers };
      case 'skill':
        return { label: 'Verified Codebase Skill', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: Code2 };
      case 'public_signal':
        return { label: 'Verified Signal', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20', icon: Network };
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Candidate Selector */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
              <Network className="w-3.5 h-3.5" />
              <span>Evidence Graph Extraction</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Verified Proof Over Resume Claims
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
              TalentGraph scans public code repositories, git history, live deployments, and architectural tradeoffs to construct an objective proof-of-work graph.
            </p>
          </div>

          <button
            onClick={onProceedToScoring}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-2xl text-xs flex items-center space-x-2 transition-all shadow-xl shadow-emerald-500/20 shrink-0 cursor-pointer"
          >
            <span>Next Step: Run AI Reasoning Scorer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Candidate Selector Cards */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider block">
            Select Candidate to Inspect Evidence Graph:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {candidates.map((cand) => {
              const isSelected = cand.id === selectedCandidate.id;
              return (
                <button
                  key={cand.id}
                  onClick={() => setSelectedCandidate(cand)}
                  className={`p-5 rounded-2xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500/80 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white">{cand.name}</span>
                    {isSelected ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Inspecting
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500">Click to load</span>
                    )}
                  </div>
                  <div className="text-xs text-slate-300 font-medium truncate">{cand.role}</div>
                  <div className="text-[11px] text-slate-500 mt-1 truncate">{cand.education}</div>
                  <div className="mt-3 flex items-center justify-between text-[11px] border-t border-slate-850 pt-2">
                    <span className="text-emerald-400 font-mono font-semibold">
                      {cand.evidenceGraph.length} Evidence Nodes
                    </span>
                    <span className="text-slate-400">{cand.experienceYears}y exp</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Candidate Detail Card */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 space-y-8">
        {/* Candidate Profile Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-slate-950 font-extrabold text-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
              {selectedCandidate.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-bold text-white">{selectedCandidate.name}</h3>
                <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                  {selectedCandidate.location}
                </span>
              </div>
              <p className="text-xs text-emerald-400 font-medium mt-0.5">
                {selectedCandidate.role} • {selectedCandidate.education}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {selectedCandidate.githubUrl && (
              <a
                href={selectedCandidate.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>GitHub Codebase</span>
              </a>
            )}
            {selectedCandidate.portfolioUrl && (
              <a
                href={selectedCandidate.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-teal-400" />
                <span>Live Portfolio</span>
              </a>
            )}
          </div>
        </div>

        {/* Bio Extraction */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Candidate Overview &amp; Verification Summary
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {selectedCandidate.rawBio}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Proof Points' },
              { id: 'outcome', label: 'Shipped Outcomes' },
              { id: 'architecture', label: 'System Architecture' },
              { id: 'skill', label: 'Verified Code Skills' },
              { id: 'public_signal', label: 'Public Signals' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filterCategory === tab.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500 font-mono">
            Showing {filteredNodes.length} of {selectedCandidate.evidenceGraph.length} verified nodes
          </span>
        </div>

        {/* Evidence Graph Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNodes.map((node) => {
            const badge = getCategoryBadge(node.category);
            const BadgeIcon = badge.icon;
            return (
              <div
                key={node.id}
                className="bg-slate-950 border border-slate-800/80 hover:border-slate-700 p-5 rounded-2xl space-y-3 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center space-x-1.5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border ${badge.color}`}>
                      <BadgeIcon className="w-3 h-3" />
                      <span>{badge.label}</span>
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {node.confidence}% Confidence
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white leading-snug">
                    {node.label}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {node.detail}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate max-w-[240px] text-slate-500">
                    Source: {node.sourceContext}
                  </span>
                  {node.verifiedProofUrl && (
                    <a
                      href={node.verifiedProofUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center space-x-1 shrink-0"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation Ribbon */}
        <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Evidence graph verified. Ready for multi-dimensional AI scoring.
          </span>
          <button
            onClick={onProceedToScoring}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-2xl text-xs flex items-center space-x-2 transition-all shadow-xl shadow-emerald-500/20 cursor-pointer"
          >
            <span>Proceed to AI Reasoning Scorer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
