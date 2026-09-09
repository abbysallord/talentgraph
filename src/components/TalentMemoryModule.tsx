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
  Sparkles
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
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
              <Database className="w-3.5 h-3.5" />
              <span>Module 6: Longitudinal Talent Memory</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Cross-Requisition Candidate Memory & Re-Engagement Engine
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Persists candidate intelligence, verified evidence nodes, and evaluation rationales across requisitions. Re-surfaces top historical talent whenever new roles open up.
            </p>
          </div>

          <div className="text-xs font-mono text-emerald-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            {memoryRecords.length} Active Records In Datastore
          </div>
        </div>

        {/* Search Input */}
        <div className="mt-5 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search talent memory by candidate name, skill, or verified project..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-emerald-500 outline-none"
          />
        </div>
      </div>

      {/* Memory Records Grid */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-xs">
            No talent records found matching &quot;{searchTerm}&quot;. Complete an evaluation in Module 5 and click &quot;Save to Talent Memory&quot; to populate the datastore.
          </div>
        ) : (
          filtered.map((rec, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-white text-base">
                    {rec.candidate.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{rec.candidate.name}</h3>
                    <p className="text-xs text-slate-400">
                      {rec.candidate.role} • {rec.candidate.education}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800">
                    Fit Score: {rec.synthesis.overallScore}%
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {rec.synthesis.recommendation}
                  </span>
                </div>
              </div>

              {/* Memory Summary */}
              <div className="text-xs text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800 leading-relaxed">
                <span className="text-slate-400 font-semibold block mb-1">Synthesized Profile Memory:</span>
                {rec.synthesis.executiveSummary}
              </div>

              {/* Recruiter Reviewer Notes */}
              {rec.synthesis.recruiterSignoff?.reviewerNotes && (
                <div className="text-[11px] text-slate-400 flex items-center space-x-2">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Reviewer Sign-off:</strong> {rec.synthesis.recruiterSignoff.reviewerNotes}
                  </span>
                </div>
              )}

              {/* Bottom Re-match Action */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Recorded: {new Date(rec.savedAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => onSelectCandidateForRole(rec.candidate)}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-800/80 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Re-evaluate for Active Role ({activeRequisition.title.slice(0, 24)}...)</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
