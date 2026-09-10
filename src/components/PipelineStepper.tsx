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
  Sparkles
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
    label: '1. Role Intake', 
    tagline: 'Conversational JD & Rubric',
    icon: FileEdit 
  },
  { 
    id: 'evidence', 
    number: 2, 
    label: '2. Evidence Graph', 
    tagline: 'Verified Codebase Signals',
    icon: Network 
  },
  { 
    id: 'scoring', 
    number: 3, 
    label: '3. Reasoning Engine', 
    tagline: 'Multi-Dimension Fit Score',
    icon: Scale 
  },
  { 
    id: 'screening', 
    number: 4, 
    label: '4. Adaptive Screening', 
    tagline: 'Tailored Technical Probes',
    icon: HelpCircle 
  },
  { 
    id: 'synthesis', 
    number: 5, 
    label: '5. Executive Synthesis', 
    tagline: 'Decision Dossier & Offer',
    icon: CheckCircle2 
  },
  { 
    id: 'memory', 
    number: 6, 
    label: '6. Talent Memory', 
    tagline: 'Cross-Requisition Vault',
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
}) => {
  const currentStepIndex = PIPELINE_STEPS.findIndex((s) => s.id === activeTab);

  const getStepGuide = (tabId: string) => {
    switch (tabId) {
      case 'intake':
        return {
          title: 'Stage 1: Define Role & Evidence Rubric',
          description: 'Describe the engineering profile in plain English. The AI agent parses unstructured requirements into mandatory competencies, architectural depth criteria, and calibrated scoring weights.',
          nextActionText: 'Proceed to Step 2: Inspect Evidence Graph',
          nextTabId: 'evidence'
        };
      case 'evidence':
        return {
          title: 'Stage 2: Candidate Evidence Graph',
          description: 'Traditional ATS filters scan for keywords; TalentGraph scans for verified proof. Inspect real GitHub repos, production outcomes, and systems architecture extracted directly from candidate codebases.',
          nextActionText: 'Proceed to Step 3: Run AI Reasoning Scorer',
          nextTabId: 'scoring'
        };
      case 'scoring':
        return {
          title: 'Stage 3: Explainable Reasoning Engine',
          description: 'No black-box mystery numbers. Groq analyzes candidate evidence against the role rubric to generate transparent, multi-dimensional scores accompanied by full written analytical rationale.',
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
      <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-xs">
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
                    ? 'bg-emerald-50/80 border border-emerald-200 shadow-xs'
                    : isCompleted
                    ? 'bg-slate-50 border border-slate-200 hover:border-slate-300'
                    : 'bg-white border border-slate-150 opacity-70 hover:opacity-100 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isCompleted
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                </div>

                <span className={`text-xs font-bold leading-tight ${isActive ? 'text-emerald-950 font-display' : 'text-slate-800'}`}>
                  {step.label}
                </span>
                <span className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">
                  {step.tagline}
                </span>

                {isActive && (
                  <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Stage Guidance Callout */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Stage {currentStepIndex + 1} of 6
            </span>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight font-display">
              {guide.title}
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
            {guide.description}
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setActiveTab(guide.nextTabId)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-md shadow-emerald-600/15 cursor-pointer"
          >
            <span>{guide.nextActionText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
