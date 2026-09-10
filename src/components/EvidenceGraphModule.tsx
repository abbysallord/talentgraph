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
import { ExpandableCard } from './ui/ExpandableCard';

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
        return { label: 'Shipped Outcome', color: 'text-amber-800 bg-amber-50 border-amber-200', icon: Award };
      case 'architecture':
        return { label: 'System Architecture', color: 'text-blue-800 bg-blue-50 border-blue-200', icon: Layers };
      case 'skill':
        return { label: 'Verified Codebase Skill', color: 'text-indigo-800 bg-indigo-50 border-indigo-200', icon: Code2 };
      case 'public_signal':
        return { label: 'Public Signal', color: 'text-purple-800 bg-purple-50 border-purple-200', icon: Network };
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Candidate Selector */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 mb-3">
              <Network className="w-3.5 h-3.5" />
              <span>Evidence Graph Extraction</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Verified Proof Over Resume Claims
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              TalentGraph scans public code repositories, git commit history, and architectural tradeoffs to construct an objective proof-of-work graph.
            </p>
          </div>

          <button
            onClick={onProceedToScoring}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-md shadow-indigo-600/15 shrink-0 cursor-pointer self-start md:self-auto"
          >
            <span>Next: Run AI Reasoning Scorer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Candidate Selector Cards */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase text-slate-500 tracking-wider block">
            Select Candidate to Inspect Evidence Graph:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {candidates.map((cand) => {
              const isSelected = cand.id === selectedCandidate.id;
              return (
                <button
                  key={cand.id}
                  onClick={() => setSelectedCandidate(cand)}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/50 border-indigo-600 shadow-xs ring-1 ring-indigo-500/20'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-900 font-display">{cand.name}</span>
                    {isSelected ? (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">
                        Inspecting
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium">Click to select</span>
                    )}
                  </div>
                  <div className="text-xs text-slate-700 font-medium truncate">{cand.role}</div>
                  <div className="text-[11px] text-slate-500 mt-1 truncate">{cand.education}</div>
                  <div className="mt-3 flex items-center justify-between text-[11px] border-t border-slate-200/80 pt-2">
                    <span className="text-indigo-600 font-mono font-bold">
                      {cand.evidenceGraph.length} Verified Nodes
                    </span>
                    <span className="text-slate-500 font-semibold">{cand.experienceYears}y exp</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Candidate Detail Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
        {/* Candidate Profile Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-indigo-600/20 shrink-0 font-display">
              {selectedCandidate.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-bold text-slate-900 font-display">{selectedCandidate.name}</h3>
                <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                  {selectedCandidate.location}
                </span>
              </div>
              <p className="text-xs text-indigo-600 font-semibold mt-0.5">
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
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-colors shadow-2xs"
              >
                <GitBranch className="w-3.5 h-3.5 text-slate-500" />
                <span>GitHub Codebase</span>
              </a>
            )}
            {selectedCandidate.portfolioUrl && (
              <a
                href={selectedCandidate.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-colors shadow-2xs"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-600" />
                <span>Live Portfolio</span>
              </a>
            )}
          </div>
        </div>

        {/* Bio Extraction */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Candidate Overview &amp; Verification Summary
          </span>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterCategory === tab.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
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

        {/* Evidence Graph Nodes Grid with Expandable Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNodes.map((node, index) => {
            const badge = getCategoryBadge(node.category);
            return (
              <ExpandableCard
                key={node.id}
                title={node.label}
                badge={badge}
                confidence={node.confidence}
                summary={node.detail}
                detail={node.detail}
                sourceContext={node.sourceContext}
                verifiedProofUrl={node.verifiedProofUrl}
                defaultExpanded={index === 0}
              />
            );
          })}
        </div>

        {/* Bottom Navigation Ribbon */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs text-slate-500 font-medium">
            Evidence graph verified. Ready for multi-dimensional AI scoring against role rubric.
          </span>
          <button
            onClick={onProceedToScoring}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-md shadow-indigo-600/15 cursor-pointer self-end sm:self-auto"
          >
            <span>Proceed to Step 3: Run AI Reasoning Scorer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
