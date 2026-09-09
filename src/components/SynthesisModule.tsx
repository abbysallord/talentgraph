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
  BookmarkPlus
} from 'lucide-react';
import { CandidateProfile, Requisition, InterviewSynthesis } from '@/lib/types';

interface SynthesisModuleProps {
  candidate: CandidateProfile;
  requisition: Requisition;
  synthesis: InterviewSynthesis | null;
  onSaveToTalentMemory: (synthesis: InterviewSynthesis) => void;
}

export const SynthesisModule: React.FC<SynthesisModuleProps> = ({
  candidate,
  requisition,
  synthesis,
  onSaveToTalentMemory,
}) => {
  const [recruiterNotes, setRecruiterNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  if (!synthesis) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center space-y-3">
        <FileCheck className="w-12 h-12 text-slate-600 mx-auto" />
        <h3 className="text-base font-bold text-white">No Evaluation Synthesized Yet</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Please complete the Adaptive Screening module first to generate a full interview synthesis and recommendation report.
        </p>
      </div>
    );
  }

  const getRecommendationBadge = (rec: InterviewSynthesis['recommendation']) => {
    switch (rec) {
      case 'STRONG_HIRE':
        return { label: 'STRONG HIRE — FAST TRACK', color: 'bg-emerald-950/80 text-emerald-400 border-emerald-500', icon: CheckCircle2 };
      case 'HIRE':
        return { label: 'RECOMMENDED FOR HIRE', color: 'bg-teal-950/80 text-teal-400 border-teal-500', icon: CheckCircle2 };
      case 'RE_EVALUATE':
        return { label: 'REQUIRES SECOND TECHNICAL ROUND', color: 'bg-amber-950/80 text-amber-400 border-amber-500', icon: AlertTriangle };
      case 'REJECT':
        return { label: 'NOT ALIGNED — ARCHIVE TO TALENT MEMORY', color: 'bg-rose-950/80 text-rose-400 border-rose-500', icon: XCircle };
    }
  };

  const recBadge = getRecommendationBadge(synthesis.recommendation);
  const RecIcon = recBadge.icon;

  const handleSave = () => {
    onSaveToTalentMemory({
      ...synthesis,
      recruiterSignoff: {
        approved: true,
        reviewerNotes: recruiterNotes || 'Approved by Lead Recruiter',
        timestamp: new Date().toISOString(),
      },
    });
    setIsSaved(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded-md bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Module 5: Recruiter Decision Console & Evaluation Synthesis</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Executive Hiring Synthesis & Human-in-the-Loop Signoff
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              AI synthesizes interview responses against role expectations, while keeping human recruiters in absolute control of final hiring decisions and talent pool routing.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaved}
            className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/10 shrink-0"
          >
            <BookmarkPlus className="w-4 h-4" />
            <span>{isSaved ? 'Persisted to Talent Memory' : 'Sign-Off & Save to Talent Memory'}</span>
          </button>
        </div>
      </div>

      {/* Main Verdict Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <span className="text-xs font-semibold text-slate-400">Final Candidate Recommendation:</span>
            <div className="flex items-center space-x-3 mt-1.5">
              <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl border text-sm font-extrabold ${recBadge.color}`}>
                <RecIcon className="w-5 h-5" />
                <span>{recBadge.label}</span>
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 block">Candidate: {candidate.name}</span>
            <span className="text-xs text-slate-400 block font-mono">Requisition: {requisition.title}</span>
          </div>
        </div>

        {/* Executive Summary */}
        <div>
          <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Executive Summary</h4>
          <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800/80 text-sm text-slate-200 leading-relaxed">
            {synthesis.executiveSummary}
          </div>
        </div>

        {/* Dimension Breakdown */}
        <div>
          <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">
            Multi-Round Assessment Breakdown
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Technical Execution', score: synthesis.dimensionBreakdown.technicalExecution },
              { label: 'System Architecture', score: synthesis.dimensionBreakdown.systemArchitecture },
              { label: 'Communication Clarity', score: synthesis.dimensionBreakdown.communicationClarity },
              { label: 'Builder Ownership', score: synthesis.dimensionBreakdown.builderOwnership },
            ].map((dim, idx) => (
              <div key={idx} className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 text-center">
                <span className="text-2xl font-extrabold text-white block font-mono">{dim.score}%</span>
                <span className="text-xs text-slate-400 font-medium mt-1 block">{dim.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Human Recruiter Sign-Off Input */}
        <div className="pt-4 border-t border-slate-800">
          <label className="text-xs font-bold text-slate-300 block mb-2 flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Human Recruiter Final Commentary & Overrides:</span>
          </label>
          <textarea
            rows={3}
            value={recruiterNotes}
            onChange={(e) => setRecruiterNotes(e.target.value)}
            placeholder="Record internal team decision, sprint team allocation, or interview overrides..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
};
