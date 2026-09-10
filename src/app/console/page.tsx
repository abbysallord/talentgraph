'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { PipelineStepper } from '@/components/PipelineStepper';
import { IntakeModule } from '@/components/IntakeModule';
import { EvidenceGraphModule } from '@/components/EvidenceGraphModule';
import { ReasoningScorerModule } from '@/components/ReasoningScorerModule';
import { ScreeningModule } from '@/components/ScreeningModule';
import { SynthesisModule } from '@/components/SynthesisModule';
import { TalentMemoryModule } from '@/components/TalentMemoryModule';
import { AdminCockpit } from '@/components/AdminCockpit';
import { 
  initialRequisitions, 
  initialCandidates 
} from '@/lib/mockData';
import { 
  Requisition, 
  CandidateProfile, 
  InterviewSynthesis 
} from '@/lib/types';
import { 
  ArrowLeft,
  Activity,
  Zap,
  Briefcase
} from 'lucide-react';

export default function ConsolePage() {
  const [requisitions, setRequisitions] = useState<Requisition[]>(initialRequisitions);
  const [selectedRequisition, setSelectedRequisition] = useState<Requisition>(initialRequisitions[0]);

  const [candidates, setCandidates] = useState<CandidateProfile[]>(initialCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile>(initialCandidates[0]);

  const [activeTab, setActiveTab] = useState<string>('evidence');
  const [currentSynthesis, setCurrentSynthesis] = useState<InterviewSynthesis | null>(null);
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [demoBannerMessage, setDemoBannerMessage] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Check auth session on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.user) {
          setCurrentUser(data.user);
        }
      } catch (err) {
        console.error('Session check error:', err);
      }
    }
    checkAuth();
  }, []);

  const [talentMemory, setTalentMemory] = useState<
    { candidate: CandidateProfile; synthesis: InterviewSynthesis; savedAt: string }[]
  >([
    {
      candidate: initialCandidates[0],
      synthesis: {
        candidateId: initialCandidates[0].id,
        requisitionId: initialRequisitions[0].id,
        overallScore: 94,
        recommendation: 'STRONG_HIRE',
        executiveSummary: 'Dhanush Shenoy H demonstrated verified full-stack shipping velocity with AgroNova (<1.2s leaf pathology classification, OpenAI Buildathon Top 90) and Oppy (SQLite WAL concurrency and ATS fuzzy matching). Deep architectural depth across FastAPI AsyncIO, Docker Compose isolation, and autonomous Groq LLM pipelines. Highly recommended for immediate founding sprint deployment.',
        dimensionBreakdown: {
          technicalExecution: 95,
          systemArchitecture: 94,
          communicationClarity: 90,
          builderOwnership: 97,
        },
        recruiterSignoff: {
          approved: true,
          reviewerNotes: 'Verified live Vercel deployments and public GitHub codebases. Fast-track directly to team pairing.',
          timestamp: '2026-09-09T14:30:00Z',
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

  const handleRunDemoWalkthrough = async () => {
    setIsDemoRunning(true);
    setDemoBannerMessage('Step 1: Loading candidate evidence graph from public GitHub repositories...');
    setSelectedCandidate(initialCandidates[0]);
    setSelectedRequisition(initialRequisitions[0]);
    setActiveTab('evidence');

    setTimeout(() => {
      setDemoBannerMessage('Step 2: Executing multi-dimensional reasoning engine with transparent written rationale...');
      setActiveTab('scoring');
    }, 2000);

    setTimeout(() => {
      setDemoBannerMessage('Step 3: Synthesizing adaptive technical screening probes calibrated to candidate projects...');
      setActiveTab('screening');
    }, 4000);

    setTimeout(() => {
      setDemoBannerMessage('Step 4: Compiling executive hiring synthesis and sovereign recruiter gating...');
      setCurrentSynthesis(talentMemory[0].synthesis);
      setActiveTab('synthesis');
      setIsDemoRunning(false);
      setTimeout(() => setDemoBannerMessage(null), 5000);
    }, 6000);
  };

  const handleQuickSynthesis = () => {
    setCurrentSynthesis(talentMemory[0].synthesis);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-body selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        requisitions={requisitions}
        selectedRequisition={selectedRequisition}
        setSelectedRequisition={setSelectedRequisition}
        onRunDemoWalkthrough={handleRunDemoWalkthrough}
        isDemoRunning={isDemoRunning}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      {/* Main Console Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Breadcrumb / Context Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </Link>

          <div className="flex items-center space-x-3 text-xs">
            <span className="text-slate-500 font-medium">Workspace:</span>
            <span className="font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
              {selectedRequisition.title}
            </span>
          </div>
        </div>

        {/* Live Demo Notification Banner */}
        {demoBannerMessage && (
          <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 px-5 py-3 rounded-2xl text-xs flex items-center space-x-3 animate-pulse shadow-xs font-semibold">
            <Zap className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>{demoBannerMessage}</span>
          </div>
        )}

        {/* View Switch: Cockpit vs Pipeline */}
        {activeTab === 'cockpit' ? (
          <AdminCockpit />
        ) : (
          <>
            {/* 6-Stage Interactive Pipeline Stepper */}
            <PipelineStepper
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onRunDemoWalkthrough={handleRunDemoWalkthrough}
              isDemoRunning={isDemoRunning}
            />

            {/* Active Stage Module Content */}
            <div className="pt-2">
              {activeTab === 'intake' && (
                <IntakeModule
                  currentRequisition={selectedRequisition}
                  onRequisitionCreated={handleRequisitionCreated}
                  onProceedToEvidence={() => setActiveTab('evidence')}
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
                  onProceedToMemory={() => setActiveTab('memory')}
                  onGenerateQuickSynthesis={handleQuickSynthesis}
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
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-900 font-display">TalentGraph Console</span>
            <span>•</span>
            <span>Enterprise Technical Recruiting Intelligence</span>
          </div>
          <span className="font-mono text-slate-600 font-semibold">
            Engineered by Dhanush Shenoy H
          </span>
        </div>
      </footer>
    </div>
  );
}
