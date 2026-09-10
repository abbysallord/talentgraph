'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Database, 
  FileCheck, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';
import { CandidateProfile, Requisition, InterviewSynthesis } from '@/lib/types';

interface SynthesisModuleProps {
  candidate: CandidateProfile;
  requisition: Requisition;
  synthesis: InterviewSynthesis | null;
  onSaveToTalentMemory: (synthesis: InterviewSynthesis) => void;
  onProceedToMemory: () => void;
  onGenerateQuickSynthesis: () => void;
}

export const SynthesisModule: React.FC<SynthesisModuleProps> = ({
  candidate,
  requisition,
  synthesis,
  onSaveToTalentMemory,
  onProceedToMemory,
  onGenerateQuickSynthesis,
}) => {
  const [recruiterNotes, setRecruiterNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  if (!synthesis) {
    return (
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-12 text-center space-y-4 shadow-2xs">
        <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center mx-auto text-zinc-700">
          <FileCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-zinc-950 font-display">No Evaluation Synthesized Yet</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Complete Adaptive Screening or generate an immediate benchmark evaluation.
          </p>
        </div>
        <button
          onClick={onGenerateQuickSynthesis}
          className="bg-zinc-950 hover:bg-zinc-800 text-white font-semibold px-4 py-2 rounded-lg text-xs inline-flex items-center space-x-2 transition-all cursor-pointer shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate Benchmark Dossier</span>
        </button>
      </div>
    );
  }

  const getRecommendationBadge = (rec: InterviewSynthesis['recommendation']) => {
    switch (rec) {
      case 'STRONG_HIRE':
        return { label: 'STRONG HIRE — FAST TRACK', color: 'bg-zinc-950 text-white border-zinc-950', icon: CheckCircle2 };
      case 'HIRE':
        return { label: 'RECOMMENDED FOR HIRE', color: 'bg-zinc-100 text-zinc-900 border-zinc-300', icon: CheckCircle2 };
      case 'RE_EVALUATE':
        return { label: 'REQUIRES SECOND ROUND', color: 'bg-amber-50 text-amber-800 border-amber-200', icon: AlertTriangle };
      case 'REJECT':
        return { label: 'ARCHIVE TO VAULT', color: 'bg-rose-50 text-rose-800 border-rose-200', icon: XCircle };
    }
  };

  const recBadge = getRecommendationBadge(synthesis.recommendation);
  const RecIcon = recBadge.icon;

  const handleSave = () => {
    onSaveToTalentMemory({
      ...synthesis,
      recruiterSignoff: {
        approved: true,
        reviewerNotes: recruiterNotes || 'Approved by Hiring Team. Verified code proofs.',
        timestamp: new Date().toISOString(),
      },
    });
    setIsSaved(true);
  };

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-950 font-display">
                Executive Synthesis &amp; Sovereign Gating
              </h2>
              <span className="text-2xs font-mono text-zinc-500">
                AI synthesizes the dossier; engineering managers retain absolute sign-off
              </span>
            </div>
          </div>

          <button
            onClick={onProceedToMemory}
            className="bg-zinc-950 hover:bg-zinc-800 text-white font-semibold px-4 py-1.5 rounded-lg text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-xs self-start sm:self-auto"
          >
            <span>Talent Memory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Decision Card */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 space-y-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white font-bold text-sm flex items-center justify-center font-display">
              {candidate.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-950 font-display">{candidate.name}</h3>
              <p className="text-xs text-zinc-500">Requisition: {requisition.title}</p>
            </div>
          </div>

          <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-bold border ${recBadge.color}`}>
            <RecIcon className="w-3.5 h-3.5" />
            <span>{recBadge.label}</span>
          </div>
        </div>

        {/* Dimension Breakdown Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(synthesis.dimensionBreakdown).map(([dim, score]) => (
            <div key={dim} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block capitalize truncate">
                {dim.replace(/([A-Z])/g, ' $1')}
              </span>
              <div className="text-xl font-bold font-mono text-zinc-950 mt-1">
                {score}%
              </div>
            </div>
          ))}
        </div>

        {/* Executive Summary */}
        <div className="bg-zinc-50 rounded-xl border border-zinc-200/80 p-4 space-y-1.5">
          <span className="text-2xs font-mono font-bold uppercase tracking-wider text-zinc-500 block">
            Executive Synthesis Dossier
          </span>
          <p className="text-xs text-zinc-700 leading-relaxed font-medium">
            {synthesis.executiveSummary}
          </p>
        </div>

        {/* Recruiter Sign-Off Console */}
        <div className="bg-zinc-100/60 rounded-xl border border-zinc-200 p-4 space-y-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-zinc-700" />
            <span className="text-xs font-bold text-zinc-950 uppercase tracking-wider">
              Recruiter Sovereign Authorization
            </span>
          </div>

          <textarea
            value={recruiterNotes}
            onChange={(e) => setRecruiterNotes(e.target.value)}
            placeholder="Add reviewer notes, team pairing notes, or custom conditions..."
            rows={2}
            className="w-full bg-white border border-zinc-200 rounded-lg p-2.5 text-xs text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 font-mono resize-none"
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-2xs text-zinc-500 font-mono">
              Immutable audit log committed on sign-off
            </span>
            <button
              onClick={handleSave}
              disabled={isSaved}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all ${
                isSaved
                  ? 'bg-zinc-200 text-zinc-600 cursor-default'
                  : 'bg-zinc-950 hover:bg-zinc-800 text-white cursor-pointer shadow-xs'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>{isSaved ? 'Committed to Memory Vault' : 'Approve & Save to Memory'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
