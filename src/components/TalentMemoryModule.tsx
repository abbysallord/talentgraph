'use client';

import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  BookmarkCheck, 
  ArrowRight, 
  ShieldCheck 
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
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-950 font-display">
                Longitudinal Talent Memory
              </h2>
              <span className="text-2xs font-mono text-zinc-500">
                Persistent candidate intelligence and verified proofs across openings
              </span>
            </div>
          </div>

          <span className="text-2xs font-mono text-zinc-600 bg-zinc-100 px-3 py-1 rounded-md border border-zinc-200 self-start sm:self-auto">
            {memoryRecords.length} Retained Records
          </span>
        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search vault by builder name, systems architecture, or verified proof..."
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:border-zinc-400 focus:outline-none transition-all font-medium"
          />
        </div>
      </div>

      {/* Memory Records List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-12 text-center space-y-2 shadow-2xs">
            <BookmarkCheck className="w-8 h-8 text-zinc-400 mx-auto" />
            <h3 className="text-xs font-bold text-zinc-900 font-display">No Matching Records</h3>
            <p className="text-2xs text-zinc-500 max-w-sm mx-auto">
              No profiles match &quot;{searchTerm}&quot;. Save evaluations to populate this vault.
            </p>
          </div>
        ) : (
          filtered.map((rec, idx) => (
            <div
              key={idx}
              className="bg-white border border-zinc-200/80 rounded-2xl p-4 sm:p-5 space-y-4 hover:border-zinc-300 transition-all shadow-2xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-zinc-950 text-white font-bold text-sm flex items-center justify-center font-display">
                    {rec.candidate.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-bold text-zinc-950 font-display">
                        {rec.candidate.name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200">
                        {rec.synthesis.overallScore}% Fit
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {rec.candidate.role} &bull; {rec.candidate.experienceYears}y exp
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectCandidateForRole(rec.candidate)}
                  className="bg-zinc-950 hover:bg-zinc-800 text-white font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs self-start sm:self-auto"
                >
                  <span>Map to Current Role</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-200/80 text-xs text-zinc-700 leading-relaxed font-mono">
                {rec.synthesis.executiveSummary}
              </div>

              {rec.synthesis.recruiterSignoff && (
                <div className="flex items-center justify-between text-2xs text-zinc-500 pt-1">
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
                    <span>Approved by {rec.synthesis.recruiterSignoff.reviewerNotes}</span>
                  </div>
                  <span className="font-mono">
                    {rec.synthesis.recruiterSignoff.timestamp ? new Date(rec.synthesis.recruiterSignoff.timestamp).toLocaleDateString() : ''}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
