'use client';

import React, { useState } from 'react';
import { 
  Database, 
  RotateCcw, 
  Search, 
  ExternalLink, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  UserCheck, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookmarkCheck
} from 'lucide-react';
import { CandidateProfile, Requisition, InterviewSynthesis } from '@/lib/types';

interface TalentMemoryRecord {
  candidate: CandidateProfile;
  synthesis: InterviewSynthesis;
  savedAt: string;
}

interface TalentMemoryModuleProps {
  memoryRecords: TalentMemoryRecord[];
  activeRequisition: Requisition;
  onSelectCandidateForRole: (candidate: CandidateProfile) => void;
}

export const TalentMemoryModule: React.FC<TalentMemoryModuleProps> = ({
  memoryRecords,
  activeRequisition,
  onSelectCandidateForRole,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = memoryRecords.filter(
    (r) =>
      r.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.candidate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.synthesis.executiveSummary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
              <Database className="w-3.5 h-3.5" />
              <span>Longitudinal Talent Intelligence</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Cross-Requisition Talent Memory Vault
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Never lose track of exceptional technical talent. Candidate intelligence, code verifications, and interview notes persist across company openings, re-surfacing top builders as new technical needs emerge.
            </p>
          </div>

          <div className="text-xs font-mono text-emerald-400 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 shrink-0">
            {memoryRecords.length} Retained Engineering Records
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search talent vault by candidate name, architecture keyword, or project proof..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none leading-relaxed"
          />
        </div>
      </div>

      {/* Memory Records List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-16 text-center space-y-3">
            <BookmarkCheck className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No Matching Records in Vault</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              No talent profiles match &quot;{searchTerm}&quot;. Save evaluations from Step 5 to populate the permanent talent intelligence datastore.
            </p>
          </div>
        ) : (
          filtered.map((rec, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 space-y-6 hover:border-slate-750 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-extrabold text-lg flex items-center justify-center shadow-lg shadow-indigo-600/20 shrink-0">
                    {rec.candidate.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{rec.candidate.name}</h3>
                    <p className="text-xs text-slate-400">
                      {rec.candidate.role} • {rec.candidate.education}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span
                    className={`text-xs font-mono font-bold px-3 py-1 rounded-xl border ${
                      rec.synthesis.recommendation === 'STRONG_HIRE'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-teal-500/10 text-teal-400 border-teal-500/30'
                    }`}
                  >
                    {rec.synthesis.recommendation}
                  </span>

                  <button
                    onClick={() => onSelectCandidateForRole(rec.candidate)}
                    className="bg-slate-950 hover:bg-slate-850 text-slate-200 border border-slate-800 px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <span>Re-evaluate for Active Role</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  </button>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Preserved Technical Synthesis
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {rec.synthesis.executiveSummary}
                </p>
              </div>

              {/* Recruiter Reviewer Notes */}
              {rec.synthesis.recruiterSignoff && (
                <div className="flex items-start space-x-3 text-xs text-slate-400 bg-slate-950/60 p-4 rounded-xl border border-slate-850">
                  <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-300">Recruiter Sign-Off Note: </span>
                    <span>{rec.synthesis.recruiterSignoff.reviewerNotes}</span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
