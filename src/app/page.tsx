'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { PipelineStepper } from '@/components/PipelineStepper';
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
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Play,
  Layers,
  Zap
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
    setDemoBannerMessage('Loading verified evidence graph for Dhanush Shenoy H...');
    setSelectedCandidate(initialCandidates[0]);
    setSelectedRequisition(initialRequisitions[0]);
    setActiveTab('evidence');

    setTimeout(() => {
      setDemoBannerMessage('Executing Groq LLM reasoning engine across codebase signals...');
      setActiveTab('scoring');
    }, 1800);

    setTimeout(() => {
      setDemoBannerMessage('Synthesizing adaptive technical screening probes...');
      setActiveTab('screening');
    }, 3600);

    setTimeout(() => {
      setDemoBannerMessage('Compiling executive hiring synthesis and recruiter console...');
      setCurrentSynthesis(talentMemory[0].synthesis);
      setActiveTab('synthesis');
      setIsDemoRunning(false);
      setTimeout(() => setDemoBannerMessage(null), 5000);
    }, 5400);
  };

  const handleQuickSynthesis = () => {
    setCurrentSynthesis(talentMemory[0].synthesis);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        requisitions={requisitions}
        selectedRequisition={selectedRequisition}
        setSelectedRequisition={setSelectedRequisition}
        onRunDemoWalkthrough={handleRunDemoWalkthrough}
        isDemoRunning={isDemoRunning}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Hero Onboarding Section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-12 shadow-2xl">
          {/* Subtle Accent Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Cpu className="w-3.5 h-3.5" />
              <span>Autonomous Recruitment Intelligence</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Hire for What They Built.<br />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Not What They Claim.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              Traditional ATS filters reject 78% of top technical builders because resumes lack exact keywords. TalentGraph inspects verified GitHub repositories, production deployments, and systems architecture with transparent Groq LLM reasoning.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleRunDemoWalkthrough}
                disabled={isDemoRunning}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-2xl text-xs flex items-center space-x-2.5 transition-all shadow-xl shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isDemoRunning ? 'Running Walkthrough...' : 'One-Click AI Demo Walkthrough'}</span>
              </button>

              <button
                onClick={() => setActiveTab('intake')}
                className="bg-slate-950 hover:bg-slate-850 text-slate-200 border border-slate-800 px-6 py-3.5 rounded-2xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer"
              >
                <span>Define a Custom Role</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-10 pt-8 border-t border-slate-850 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-slate-400">Showcase Candidates</span>
              <div className="text-xl font-bold text-white font-mono">{candidates.length} Profiles</div>
              <p className="text-[11px] text-slate-500">Verified code proofs</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400">Inference Turnaround</span>
              <div className="text-xl font-bold text-emerald-400 font-mono">&lt;500ms</div>
              <p className="text-[11px] text-slate-500">Groq LLM Acceleration</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400">Evidence Extraction</span>
              <div className="text-xl font-bold text-teal-400 font-mono">100% Code-Backed</div>
              <p className="text-[11px] text-slate-500">Zero keyword fluff</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400">Human Gating</span>
              <div className="text-xl font-bold text-indigo-400 font-mono">Recruiter Sovereign</div>
              <p className="text-[11px] text-slate-500">Full audit trail</p>
            </div>
          </div>
        </div>

        {/* Live Demo Notification Toast */}
        {demoBannerMessage && (
          <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 px-6 py-4 rounded-2xl text-xs flex items-center space-x-3 animate-pulse shadow-xl shadow-emerald-500/10">
            <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">{demoBannerMessage}</span>
          </div>
        )}

        {/* 6-Stage Interactive Pipeline Ribbon */}
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
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">TalentGraph</span>
            <span>•</span>
            <span>AI-Native Recruitment Intelligence &amp; Candidate Evidence Graph</span>
          </div>
          <span className="font-mono text-slate-400">
            Engineered by Dhanush Shenoy H
          </span>
        </div>
      </footer>
    </div>
  );
}
