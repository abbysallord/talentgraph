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
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 mb-3">
              <Database className="w-3.5 h-3.5" />
              <span>Longitudinal Talent Intelligence</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Cross-Requisition Talent Memory Vault
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Never lose track of exceptional technical talent. Candidate intelligence, code verifications, and interview notes persist across company openings, re-surfacing top builders as new technical needs emerge.
            </p>
          </div>

          <div className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-200 shrink-0 self-start md:self-auto">
            {memoryRecords.length} Retained Engineering Records
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search talent vault by candidate name, architecture keyword, or project proof..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none leading-relaxed transition-all font-medium"
          />
        </div>
      </div>

      {/* Memory Records List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-3 shadow-xs">
            <BookmarkCheck className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 font-display">No Matching Records in Vault</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              No talent profiles match &quot;{searchTerm}&quot;. Save evaluations from Step 5 to populate the permanent talent intelligence datastore.
            </p>
          </div>
        ) : (
          filtered.map((rec, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 hover:border-slate-300 transition-all shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-indigo-600/20 shrink-0 font-display">
                    {rec.candidate.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">{rec.candidate.name}</h3>
                    <p className="text-xs text-slate-500">
                      {rec.candidate.role} • {rec.candidate.education}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span
                    className={`text-xs font-mono font-bold px-3 py-1 rounded-xl border ${
                      rec.synthesis.recommendation === 'STRONG_HIRE'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-indigo-50 text-indigo-800 border-indigo-200'
                    }`}
                  >
                    {rec.synthesis.recommendation}
                  </span>

                  <button
                    onClick={() => onSelectCandidateForRole(rec.candidate)}
                    className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>Re-evaluate for Active Role</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
                  </button>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Preserved Technical Synthesis
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {rec.synthesis.executiveSummary}
                </p>
              </div>

              {/* Recruiter Reviewer Notes */}
              {rec.synthesis.recruiterSignoff && (
                <div className="flex items-start space-x-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <UserCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Recruiter Sign-Off Note: </span>
                    <span className="font-medium">{rec.synthesis.recruiterSignoff.reviewerNotes}</span>
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
