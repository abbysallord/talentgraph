'use client';

import React, { useState } from 'react';
import { 
  Network, 
  Award, 
  Layers, 
  Code2, 
  ExternalLink, 
  ShieldCheck, 
  ArrowRight, 
  GitBranch, 
  Globe,
  Grid,
  Share2
} from 'lucide-react';
import { CandidateProfile, EvidenceNode } from '@/lib/types';
import { ExpandableCard } from './ui/ExpandableCard';
import { InteractiveEvidenceCanvas } from './ui/InteractiveEvidenceCanvas';

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
  const [viewMode, setViewMode] = useState<'cards' | 'mesh'>('cards');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredNodes = filterCategory === 'all' 
    ? selectedCandidate.evidenceGraph 
    : selectedCandidate.evidenceGraph.filter((n) => n.category === filterCategory);

  const getCategoryBadge = (category: EvidenceNode['category']) => {
    switch (category) {
      case 'outcome':
        return { label: 'Shipped Outcome', color: 'text-zinc-800 bg-zinc-100 border-zinc-200', icon: Award };
      case 'architecture':
        return { label: 'System Architecture', color: 'text-blue-700 bg-blue-50 border-blue-200', icon: Layers };
      case 'skill':
        return { label: 'Codebase Skill', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: Code2 };
      case 'public_signal':
        return { label: 'Public Signal', color: 'text-purple-700 bg-purple-50 border-purple-200', icon: Network };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header: Minimal Candidate Selector & View Switcher */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center">
              <Network className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-950 font-display">
                Candidate Evidence Graph
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Toggle */}
            <div className="flex p-0.5 rounded-lg bg-zinc-100 border border-zinc-200 text-xs">
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-white text-zinc-950 shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Cards</span>
              </button>
              <button
                onClick={() => setViewMode('mesh')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  viewMode === 'mesh'
                    ? 'bg-white text-zinc-950 shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Mesh</span>
              </button>
            </div>

            <button
              onClick={onProceedToScoring}
              className="bg-zinc-950 hover:bg-zinc-800 text-white font-semibold px-4 py-1.5 rounded-lg text-xs flex items-center space-x-2 transition-all cursor-pointer shrink-0"
            >
              <span>Next: Scorer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Candidate Switcher Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-zinc-100">
          {candidates.map((cand) => {
            const isSelected = cand.id === selectedCandidate.id;
            return (
              <button
                key={cand.id}
                onClick={() => setSelectedCandidate(cand)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                    : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold font-display ${isSelected ? 'text-white' : 'text-zinc-900'}`}>
                    {cand.name}
                  </span>
                  <span className={`text-[10px] font-mono ${isSelected ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {cand.evidenceGraph.length} nodes
                  </span>
                </div>
                <div className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {cand.role}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Candidate Profile Bar */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white font-bold text-sm flex items-center justify-center font-display shrink-0">
            {selectedCandidate.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-zinc-950 font-display">
                {selectedCandidate.name}
              </h3>
              <span className="text-[10px] font-mono text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                {selectedCandidate.location}
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              {selectedCandidate.role} &bull; {selectedCandidate.experienceYears}y exp
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {selectedCandidate.githubUrl && (
            <a
              href={selectedCandidate.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-xs font-semibold text-zinc-700 transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5 text-zinc-500" />
              <span>GitHub</span>
            </a>
          )}
          {selectedCandidate.portfolioUrl && (
            <a
              href={selectedCandidate.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-xs font-semibold text-zinc-700 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-zinc-500" />
              <span>Live Deployment</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Evidence Content: Mesh vs Cards */}
      {viewMode === 'mesh' ? (
        <div className="double-bezel-outer">
          <div className="double-bezel-inner overflow-hidden">
            <InteractiveEvidenceCanvas candidate={selectedCandidate} />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All Proof' },
                { id: 'outcome', label: 'Outcomes' },
                { id: 'architecture', label: 'Architecture' },
                { id: 'skill', label: 'Code Skills' },
                { id: 'public_signal', label: 'Public Signals' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterCategory(tab.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    filterCategory === tab.id
                      ? 'bg-zinc-950 text-white shadow-2xs'
                      : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span className="text-[11px] text-zinc-500 font-mono">
              {filteredNodes.length} verified signals
            </span>
          </div>

          {/* Evidence Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredNodes.map((node, index) => {
              const badge = getCategoryBadge(node.category);
              return (
                <ExpandableCard
                  key={node.id}
                  title={node.label}
                  badge={badge}
                  confidence={node.confidence}
                  summary={node.detail}
                  sourceContext={node.sourceContext}
                  verifiedProofUrl={node.verifiedProofUrl}
                  defaultExpanded={false}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
