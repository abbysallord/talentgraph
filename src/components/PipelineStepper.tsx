'use client';

import React from 'react';
import { 
  FileEdit, 
  Network, 
  Scale, 
  HelpCircle, 
  CheckCircle2, 
  Database,
  ArrowRight
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
    label: 'Role Intake', 
    tagline: 'JD & Rubric',
    icon: FileEdit 
  },
  { 
    id: 'evidence', 
    number: 2, 
    label: 'Evidence Graph', 
    tagline: 'Codebase Signals',
    icon: Network 
  },
  { 
    id: 'scoring', 
    number: 3, 
    label: 'Reasoning', 
    tagline: 'Deterministic Fit',
    icon: Scale 
  },
  { 
    id: 'screening', 
    number: 4, 
    label: 'Screening', 
    tagline: 'Targeted Probes',
    icon: HelpCircle 
  },
  { 
    id: 'synthesis', 
    number: 5, 
    label: 'Synthesis', 
    tagline: 'Executive Gating',
    icon: CheckCircle2 
  },
  { 
    id: 'memory', 
    number: 6, 
    label: 'Talent Memory', 
    tagline: 'Cross-Role Vault',
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
  const nextStep = PIPELINE_STEPS[currentStepIndex + 1] || PIPELINE_STEPS[0];

  return (
    <div className="space-y-3">
      {/* 6-Step Horizontal Pipeline Stepper */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-1.5 shadow-2xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5">
          {PIPELINE_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeTab === step.id;
            const isCompleted = idx < currentStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => setActiveTab(step.id)}
                className={`relative flex items-center space-x-2.5 p-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : isCompleted
                    ? 'bg-zinc-100 text-zinc-800 hover:bg-zinc-150'
                    : 'bg-white text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                    isActive
                      ? 'bg-zinc-800 text-white'
                      : isCompleted
                      ? 'bg-zinc-200 text-zinc-700'
                      : 'bg-zinc-100 text-zinc-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5] text-zinc-800" />
                  ) : (
                    `0${step.number}`
                  )}
                </div>

                <div className="min-w-0">
                  <div className={`text-xs font-bold leading-tight truncate ${isActive ? 'text-white' : 'text-zinc-900'}`}>
                    {step.label}
                  </div>
                  <div className={`text-[10px] font-mono truncate leading-none mt-0.5 ${isActive ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {step.tagline}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ultra-Minimal 1-Line Status Ribbon */}
      <div className="bg-white border border-zinc-200/80 rounded-xl px-4 py-2 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2.5">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-mono text-zinc-500 text-2xs uppercase tracking-wider">
            Stage {currentStepIndex + 1}/6:
          </span>
          <span className="font-semibold text-zinc-900">
            {PIPELINE_STEPS[currentStepIndex]?.label}
          </span>
        </div>

        <button
          onClick={() => setActiveTab(nextStep.id)}
          className="inline-flex items-center space-x-1.5 text-2xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
        >
          <span>Next: {nextStep.label}</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
