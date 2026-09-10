'use client';

import React, { useState, useEffect } from 'react';
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
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Play,
  Layers,
  Zap,
  Activity,
  XCircle,
  Network,
  Users
} from 'lucide-react';

export default function Home() {
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

  // Instant 1-Click Interactive Demo Walkthrough
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
      {/* Top Navigation */}
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

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Banner Section */}
        <div className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Cpu className="w-3.5 h-3.5" />
              <span>Autonomous Technical Recruiting Intelligence</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
              Hire for What They Built.<br />
              <span className="text-indigo-600">
                Not What They Claim.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Traditional ATS filters reject up to 78% of high-caliber engineers because resumes lack exact buzzwords. TalentGraph constructs an objective candidate evidence graph from public code repositories, architecture RFCs, and verified commits — paired with transparent, auditable AI reasoning.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleRunDemoWalkthrough}
                disabled={isDemoRunning}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-md shadow-indigo-600/15 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isDemoRunning ? 'Running Walkthrough...' : 'One-Click AI Demo Walkthrough'}</span>
              </button>

              <button
                onClick={() => setActiveTab(activeTab === 'cockpit' ? 'evidence' : 'cockpit')}
                className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-5 py-3 rounded-xl text-xs font-bold flex items-center space-x-2 transition-colors cursor-pointer shadow-2xs"
              >
                <Activity className="w-4 h-4 text-indigo-600" />
                <span>{activeTab === 'cockpit' ? 'Switch to Pipeline' : 'Open Analytics Cockpit'}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Candidate Profiles</span>
              <div className="text-xl font-bold text-slate-900 font-display">{candidates.length} Showcase Profiles</div>
              <p className="text-[11px] text-slate-500">Verified codebase proofs</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inference Speed</span>
              <div className="text-xl font-bold text-indigo-600 font-mono">&lt;500ms</div>
              <p className="text-[11px] text-slate-500">Sub-second Groq backbone</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verification Model</span>
              <div className="text-xl font-bold text-emerald-700 font-display">100% Code-Backed</div>
              <p className="text-[11px] text-slate-500">Zero keyword hallucination</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Human Control</span>
              <div className="text-xl font-bold text-purple-700 font-display">Sovereign Recruiter</div>
              <p className="text-[11px] text-slate-500">Full audit trail &amp; gating</p>
            </div>
          </div>
        </div>

        {/* Live Demo Notification Banner */}
        {demoBannerMessage && (
          <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 px-5 py-3.5 rounded-2xl text-xs flex items-center space-x-3 animate-pulse shadow-xs font-semibold">
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

      {/* Modern Light Mode Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-900 font-display">TalentGraph</span>
            <span>•</span>
            <span>Autonomous Technical Recruiting Engine &amp; Evidence Graph</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('cockpit')}
              className="hover:text-indigo-600 font-semibold transition-colors"
            >
              Analytics Cockpit
            </button>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-slate-600 font-semibold">
              Engineered by Dhanush Shenoy H
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
