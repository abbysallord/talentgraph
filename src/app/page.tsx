'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { IntakeModule } from '@/components/IntakeModule';
import { EvidenceGraphModule } from '@/components/EvidenceGraphModule';
import { ReasoningScorerModule } from '@/components/ReasoningScorerModule';
import { ScreeningModule } from '@/components/ScreeningModule';
import { SynthesisModule } from '@/components/SynthesisModule';
import { TalentMemoryModule } from '@/components/TalentMemoryModule';
import { 
  initialRequisitions, 
  initialCandidates 
} from '@/lib/mockData';
import { 
  Requisition, 
  CandidateProfile, 
  InterviewSynthesis 
} from '@/lib/types';

export default function Home() {
  const [requisitions, setRequisitions] = useState<Requisition[]>(initialRequisitions);
  const [selectedRequisition, setSelectedRequisition] = useState<Requisition>(initialRequisitions[0]);

  const [candidates, setCandidates] = useState<CandidateProfile[]>(initialCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile>(initialCandidates[0]);

  const [activeTab, setActiveTab] = useState<string>('evidence');
  const [currentSynthesis, setCurrentSynthesis] = useState<InterviewSynthesis | null>(null);

  const [talentMemory, setTalentMemory] = useState<
    { candidate: CandidateProfile; synthesis: InterviewSynthesis; savedAt: string }[]
  >([
    {
      candidate: initialCandidates[0],
      synthesis: {
        candidateId: initialCandidates[0].id,
        requisitionId: initialRequisitions[0].id,
        overallScore: 92,
        recommendation: 'STRONG_HIRE',
        executiveSummary: 'Dhanush Shenoy H demonstrated verified full-stack shipping velocity with AgroNova and Oppy. Deep familiarity with FastAPI, SQLite WAL, and edge microservices. Strong candidate for high-speed client delivery.',
        dimensionBreakdown: {
          technicalExecution: 94,
          systemArchitecture: 90,
          communicationClarity: 88,
          builderOwnership: 96,
        },
        recruiterSignoff: {
          approved: true,
          reviewerNotes: 'Verified GitHub codebase and live Vercel deployments. Fast-track to sprint team.',
          timestamp: new Date().toISOString(),
        },
      },
      savedAt: '2026-09-09T14:30:00Z',
    },
  ]);

  const handleRequisitionCreated = (newReq: Requisition) => {
    setRequisitions([newReq, ...requisitions]);
    setSelectedRequisition(newReq);
    setActiveTab('evidence');
  };

  const handleSaveToTalentMemory = (synthesis: InterviewSynthesis) => {
    setTalentMemory((prev) => [
      {
        candidate: selectedCandidate,
        synthesis,
        savedAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        requisitions={requisitions}
        selectedRequisition={selectedRequisition}
        setSelectedRequisition={setSelectedRequisition}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'intake' && (
          <IntakeModule
            currentRequisition={selectedRequisition}
            onRequisitionCreated={handleRequisitionCreated}
          />
        )}

        {activeTab === 'evidence' && (
          <EvidenceGraphModule
            candidates={candidates}
            selectedCandidate={selectedCandidate}
            setSelectedCandidate={setSelectedCandidate}
            onProceedToScoring={() => setActiveTab('scoring')}
          />
        )}

        {activeTab === 'scoring' && (
          <ReasoningScorerModule
            candidate={selectedCandidate}
            requisition={selectedRequisition}
            onProceedToScreening={() => setActiveTab('screening')}
          />
        )}

        {activeTab === 'screening' && (
          <ScreeningModule
            candidate={selectedCandidate}
            requisition={selectedRequisition}
            onSynthesisComplete={(synth) => {
              setCurrentSynthesis(synth);
              setActiveTab('synthesis');
            }}
          />
        )}

        {activeTab === 'synthesis' && (
          <SynthesisModule
            candidate={selectedCandidate}
            requisition={selectedRequisition}
            synthesis={currentSynthesis}
            onSaveToTalentMemory={handleSaveToTalentMemory}
          />
        )}

        {activeTab === 'memory' && (
          <TalentMemoryModule
            memoryRecords={talentMemory}
            activeRequisition={selectedRequisition}
            onSelectCandidateForRole={(cand) => {
              setSelectedCandidate(cand);
              setActiveTab('evidence');
            }}
          />
        )}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>TalentGraph — AI-Native Recruiting Engine & Candidate Evidence Graph</span>
          <span className="font-mono">Engineered for MINT Forward Deployed Review • Dhanush Shenoy H</span>
        </div>
      </footer>
    </div>
  );
}
