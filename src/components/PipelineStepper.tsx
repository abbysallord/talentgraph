'use client';

import React from 'react';
import { 
  FileEdit, 
  Network, 
  Scale, 
  HelpCircle, 
  CheckCircle2, 
  Database,
  ArrowRight,
  Sparkles,
  Play
} from 'lucide-react';

export interface StepItem {
  id: string;
  number: number;
  label: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const PIPELINE_STEPS: StepItem[] = [
  { 
    id: 'intake', 
    number: 1, 
    label: 'Define Role', 
    tagline: 'Conversational Requisition',
    icon: FileEdit 
  },
  { 
    id: 'evidence', 
    number: 2, 
    label: 'Inspect Evidence', 
    tagline: 'Verified Codebase Graph',
    icon: Network 
  },
  { 
    id: 'scoring', 
    number: 3, 
    label: 'Reason & Score', 
    tagline: 'Explainable LLM Rubric',
    icon: Scale 
  },
  { 
    id: 'screening', 
    number: 4, 
    label: 'Adaptive Interview', 
    tagline: 'Contextual Probing Questions',
    icon: HelpCircle 
  },
  { 
    id: 'synthesis', 
    number: 5, 
    label: 'Executive Decision', 
    tagline: 'Recruiter Sign-Off & Gating',
    icon: CheckCircle2 
  },
  { 
    id: 'memory', 
    number: 6, 
    label: 'Talent Vault', 
    tagline: 'Cross-Role Intelligence Memory',
    icon: Database 
  },
];

interface PipelineStepperProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  onRunDemoWalkthrough: () => void;
  isDemoRunning?: boolean;
}

export const PipelineStepper: React.FC<PipelineStepperProps> = ({
  activeTab,
  setActiveTab,
  onRunDemoWalkthrough,
  isDemoRunning = false
}) => {
  const currentStepIndex = PIPELINE_STEPS.findIndex((s) => s.id === activeTab);
  const currentStep = PIPELINE_STEPS[currentStepIndex] || PIPELINE_STEPS[0];

  const getStepGuide = (tabId: string) => {
    switch (tabId) {
      case 'intake':
        return {
          title: 'Stage 1: Define Role & Evidence Rubric',
          description: 'Describe the engineering profile in plain English. Groq LLM parses unstructured requirements into mandatory competencies, architectural depth criteria, and calibrated scoring weights.',
          nextActionText: 'Proceed to Step 2: Inspect Evidence Graph',
          nextTabId: 'evidence'
        };
      case 'evidence':
        return {
          title: 'Stage 2: Candidate Evidence Graph',
          description: 'Traditional ATS filters scan for keywords; TalentGraph scans for verified proof. Inspect real GitHub repos, production outcomes, and systems architecture extracted directly from codebases.',
          nextActionText: 'Proceed to Step 3: Run AI Reasoning Scorer',
          nextTabId: 'scoring'
        };
      case 'scoring':
        return {
          title: 'Stage 3: Explainable Reasoning Engine',
          description: 'No black-box mystery numbers. Groq analyzes candidate evidence against the role rubric to generate transparent, multi-dimensional scores accompanied by full analytical rationale.',
          nextActionText: 'Proceed to Step 4: Adaptive Technical Screening',
          nextTabId: 'screening'
        };
      case 'screening':
        return {
          title: 'Stage 4: Adaptive Screening Generator',
          description: 'Generic interview checklists fail to test true competence. The agent synthesizes tailored technical questions probing the specific architecture and tradeoffs in the candidate codebase.',
          nextActionText: 'Proceed to Step 5: Recruiter Review & Decision',
          nextTabId: 'synthesis'
        };
      case 'synthesis':
        return {
          title: 'Stage 5: Recruiter Console & Decision Sign-Off',
          description: 'Human recruiters maintain final authority. Review the synthesized hiring recommendation, attach reviewer notes, and approve fast-tracking into sprint teams.',
          nextActionText: 'Proceed to Step 6: View Longitudinal Talent Memory',
          nextTabId: 'memory'
        };
      case 'memory':
        return {
          title: 'Stage 6: Longitudinal Talent Vault',
          description: 'Never lose track of high-signal builders. Talent intelligence persists across company openings, enabling instant re-engagement when new technical roles emerge.',
          nextActionText: 'Restart Full Interactive Pipeline',
          nextTabId: 'intake'
        };
      default:
        return {
          title: 'Talent Intelligence Pipeline',
          description: 'Autonomous end-to-end technical evaluation.',
          nextActionText: 'Next Stage',
          nextTabId: 'evidence'
        };
    }
  };

  const guide = getStepGuide(activeTab);

  return (
    <div className="space-y-6">
      {/* 6-Step Horizontal Pipeline Stepper */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-2.5 backdrop-blur-md shadow-xl shadow-black/20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {PIPELINE_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeTab === step.id;
            const isCompleted = idx < currentStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => setActiveTab(step.id)}
                className={`relative flex flex-col p-3 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/10 border border-emerald-500/40 shadow-md shadow-emerald-500/10'
                    : isCompleted
                    ? 'bg-slate-950/60 border border-slate-800 hover:border-slate-700'
                    : 'bg-slate-950/30 border border-slate-850 opacity-70 hover:opacity-100 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : isCompleted
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isCompleted ? '✓' : step.number}
                  </div>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                </div>

                <span className={`text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {step.label}
                </span>
                <span className="text-[10px] text-slate-400 truncate mt-0.5">
                  {step.tagline}
                </span>

                {isActive && (
                  <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Stage Guidance Callout */}
      <div className="bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800/90 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Stage {currentStepIndex + 1} of 6
            </span>
            <h3 className="text-sm font-bold text-white tracking-tight">
              {guide.title}
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
            {guide.description}
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setActiveTab(guide.nextTabId)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-lg shadow-emerald-500/15 cursor-pointer"
          >
            <span>{guide.nextActionText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
