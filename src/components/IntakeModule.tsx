'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Layers, 
  CheckCircle, 
  Plus, 
  FileText,
  Target,
  ArrowRight
} from 'lucide-react';
import { Requisition } from '@/lib/types';

interface IntakeModuleProps {
  onRequisitionCreated: (req: Requisition) => void;
  currentRequisition: Requisition;
}

export const IntakeModule: React.FC<IntakeModuleProps> = ({
  onRequisitionCreated,
  currentRequisition,
}) => {
  const [promptInput, setPromptInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const presets = [
    'Need a Forward Deployed Engineer who can build React frontends and FastAPI backends, integrate Groq LLMs, and ship production MVPs in 10-day sprints.',
    'Hiring a Speech & Voice Systems Engineer to build sub-second latency voice-to-voice agents with continuous VAD, in-memory KittenTTS, and PipeWire routing.',
    'Looking for a Lead Backend Architect experienced in SQLite WAL concurrency, multi-threaded crawlers, and automated ATS resume compatibility engines.',
  ];

  const handleGenerate = async (query: string) => {
    if (!query.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });
      const data = await res.json();
      if (!data.error) {
        onRequisitionCreated(data);
        setPromptInput('');
      }
    } catch (err) {
      console.error('Failed to intake requisition:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Module 1: Conversational Intake Agent</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Calibrated Requisition & Evidence Rubric Generator
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Describe your role requirements in plain English. The AI agent probes for technical depth, extracts core architectural competencies, and synthesizes a calibrated Evidence Rubric to grade candidate proof-of-work.
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Groq Llama-3.3 Reasoning Active</span>
          </div>
        </div>

        {/* Conversational Input Box */}
        <div className="mt-5">
          <div className="relative">
            <textarea
              rows={3}
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="e.g., We need an autonomous engineer who knows Next.js, FastAPI, Docker, and has built multi-modal computer vision pipelines..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none resize-none"
            />
            <button
              onClick={() => handleGenerate(promptInput)}
              disabled={isLoading || !promptInput.trim()}
              className="absolute right-3 bottom-3 inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-all shadow-md shadow-emerald-500/10"
            >
              <span>{isLoading ? 'Generating Requisition...' : 'Generate Requisition'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Presets */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Quick Prompts:</span>
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPromptInput(preset);
                  handleGenerate(preset);
                }}
                className="text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-md border border-slate-700/60 transition-colors text-left truncate max-w-xs"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Calibrated Requisition Spec Preview */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-white">{currentRequisition.title}</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {currentRequisition.seniority}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {currentRequisition.department} • Compensation Target: {currentRequisition.targetCompensation}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-slate-500">ID: {currentRequisition.id}</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">Role Overview</h4>
            <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              {currentRequisition.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Must Haves */}
            <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase text-emerald-400 mb-3">
                <CheckCircle className="w-4 h-4" />
                <span>Must-Have Technical Stack</span>
              </div>
              <ul className="space-y-2">
                {currentRequisition.mustHaveSkills.map((skill, i) => (
                  <li key={i} className="text-xs text-slate-200 flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architectural Competencies */}
            <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase text-blue-400 mb-3">
                <Layers className="w-4 h-4" />
                <span>Architectural Competencies</span>
              </div>
              <ul className="space-y-2">
                {currentRequisition.architecturalCompetencies.map((comp, i) => (
                  <li key={i} className="text-xs text-slate-200 flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Evidence Rubric */}
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase text-slate-300 mb-3">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Evidence Evaluation Rubric (Weights Applied to Candidate Proof)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentRequisition.evidenceRubric.map((item, idx) => (
                <div key={idx} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">{item.criterion}</span>
                    <span className="text-xs font-mono font-extrabold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      {item.weight}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
