'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldCheck, 
  UserCheck, 
  Database, 
  BarChart2, 
  FileCheck, 
  BookmarkPlus,
  ArrowRight,
  Sparkles,
  Zap,
  Award
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
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
          <FileCheck className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">No Evaluation Synthesized Yet for {candidate.name}</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            You can complete the Adaptive Screening module to evaluate custom responses, or run an instant AI evaluation below.
          </p>
        </div>
        <button
          onClick={onGenerateQuickSynthesis}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-2xl text-xs inline-flex items-center space-x-2 transition-all shadow-xl shadow-emerald-500/20 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Synthesize Benchmark Evaluation Now</span>
        </button>
      </div>
    );
  }

  const getRecommendationBadge = (rec: InterviewSynthesis['recommendation']) => {
    switch (rec) {
      case 'STRONG_HIRE':
        return { label: 'STRONG HIRE — FAST TRACK', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', icon: CheckCircle2 };
      case 'HIRE':
        return { label: 'RECOMMENDED FOR HIRE', color: 'bg-teal-500/10 text-teal-400 border-teal-500/30', icon: CheckCircle2 };
      case 'RE_EVALUATE':
        return { label: 'REQUIRES SECOND TECHNICAL ROUND', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30', icon: AlertTriangle };
      case 'REJECT':
        return { label: 'NOT ALIGNED — ARCHIVE TO TALENT MEMORY', color: 'bg-rose-500/10 text-rose-400 border-rose-500/30', icon: XCircle };
    }
  };

  const recBadge = getRecommendationBadge(synthesis.recommendation);
  const RecIcon = recBadge.icon;

  const handleSave = () => {
    onSaveToTalentMemory({
      ...synthesis,
      recruiterSignoff: {
        approved: true,
        reviewerNotes: recruiterNotes || 'Approved by Hiring Team. Verified code proofs and live deployments.',
        timestamp: new Date().toISOString(),
      },
    });
    setIsSaved(true);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Human-in-the-Loop Decision Gating</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Executive Hiring Synthesis for {candidate.name}
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
              AI evaluates candidate evidence and technical responses, while human engineering managers maintain sovereign sign-off over every hiring decision.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={handleSave}
              disabled={isSaved}
              className={`px-5 py-3 rounded-2xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                isSaved
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 cursor-default'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xl shadow-emerald-500/20'
              }`}
            >
              <BookmarkPlus className="w-4 h-4" />
              <span>{isSaved ? 'Decision Saved to Memory Vault' : 'Sign-Off & Save Decision'}</span>
            </button>

            <button
              onClick={onProceedToMemory}
              className="bg-slate-950 hover:bg-slate-850 text-slate-200 border border-slate-800 px-5 py-3 rounded-2xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <span>View Talent Vault</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Top Recommendation Banner */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-2xl border ${recBadge.color}`}>
              <RecIcon className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block">
                Final Synthesis Outcome
              </span>
              <h3 className="text-xl font-extrabold text-white mt-0.5">
                {recBadge.label}
              </h3>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block">
              Aggregate Synthesis Score
            </span>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">
              {synthesis.overallScore} <span className="text-sm text-slate-500 font-normal">/ 100</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Executive Summary for Hiring Committee
          </span>
          <p className="text-sm text-slate-200 leading-relaxed">
            {synthesis.executiveSummary}
          </p>
        </div>

        {/* 4 Dimension Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {[
            { label: 'Technical Execution', score: synthesis.dimensionBreakdown.technicalExecution, color: 'bg-emerald-500' },
            { label: 'System Architecture', score: synthesis.dimensionBreakdown.systemArchitecture, color: 'bg-teal-500' },
            { label: 'Communication Clarity', score: synthesis.dimensionBreakdown.communicationClarity, color: 'bg-indigo-500' },
            { label: 'Builder Ownership', score: synthesis.dimensionBreakdown.builderOwnership, color: 'bg-purple-500' },
          ].map((dim, i) => (
            <div key={i} className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-2">
              <span className="text-xs text-slate-400 font-medium block truncate">{dim.label}</span>
              <div className="text-2xl font-bold text-white font-mono">{dim.score}%</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className={`${dim.color} h-full rounded-full`} style={{ width: `${dim.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recruiter Sign-Off Form */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 space-y-6">
        <div className="flex items-center space-x-2">
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Recruiter Gating &amp; Formal Decision Sign-Off
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              Recruiter &amp; Technical Reviewer Notes:
            </label>
            <textarea
              rows={3}
              value={recruiterNotes}
              onChange={(e) => setRecruiterNotes(e.target.value)}
              placeholder="e.g., Codebase evidence verified on GitHub. Live deployments confirmed on agronova.in. Approved to proceed directly to team pairing..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-100 placeholder-slate-600 focus:border-emerald-500 focus:outline-none leading-relaxed"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-xs text-slate-400">
              Approved decisions are persisted longitudinally to company talent memory.
            </span>

            <button
              onClick={handleSave}
              disabled={isSaved}
              className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                isSaved
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xl shadow-emerald-500/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSaved ? 'Decision Formally Recorded' : 'Approve & Sign Off Candidate'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
