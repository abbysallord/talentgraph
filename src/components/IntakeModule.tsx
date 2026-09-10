'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Layers, 
  CheckCircle2, 
  Target, 
  ArrowRight, 
  Code2, 
  Cpu, 
  Briefcase 
} from 'lucide-react';
import { Requisition } from '@/lib/types';

interface IntakeModuleProps {
  onRequisitionCreated: (req: Requisition) => void;
  currentRequisition: Requisition;
  onProceedToEvidence: () => void;
}

export const IntakeModule: React.FC<IntakeModuleProps> = ({
  onRequisitionCreated,
  currentRequisition,
  onProceedToEvidence,
}) => {
  const [promptInput, setPromptInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const presets = [
    {
      title: 'Founding Distributed Systems Engineer',
      prompt: 'Need a founding engineer to architect fault-tolerant distributed consensus clusters, low-latency Go/Rust runners, and SQLite WAL engines.',
      tags: ['Raft', 'Go / Rust', 'SQLite WAL', 'Kafka']
    },
    {
      title: 'Low-Latency Voice Systems Architect',
      prompt: 'Hiring a voice systems architect for sub-second voice agents with continuous VAD, neural TTS, and WebSocket streaming.',
      tags: ['Neural TTS', 'Silero VAD', 'WebSockets']
    },
    {
      title: 'Platform Infrastructure Lead',
      prompt: 'Looking for a platform lead experienced in Kubernetes operators, GPU cluster optimization, and Ray distributed pipelines.',
      tags: ['Kubernetes', 'GPU Scaling', 'Ray Pipelines']
    }
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
    <div className="space-y-5">
      {/* Top Input Card */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-950 font-display">
                Conversational Requisition Intake
              </h2>
            </div>
          </div>

          <span className="text-2xs font-mono text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-md border border-zinc-200 self-start sm:self-auto">
            Groq LPU &bull; Sub-500ms
          </span>
        </div>

        {/* Text Input Area */}
        <div className="bg-zinc-50 rounded-xl border border-zinc-200 p-2 focus-within:bg-white focus-within:border-zinc-400 transition-colors">
          <textarea
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="Describe your engineering role (e.g. Staff Distributed Systems Engineer to build Raft consensus in Rust, handling >1M writes/sec with sub-2.4ms p99)..."
            rows={2}
            className="w-full bg-transparent text-zinc-900 placeholder:text-zinc-400 text-xs sm:text-sm p-2 focus:outline-none resize-none font-medium"
          />
          <div className="flex items-center justify-end border-t border-zinc-200/60 pt-2 px-2">
            <button
              onClick={() => handleGenerate(promptInput)}
              disabled={isLoading || !promptInput.trim()}
              className="bg-zinc-950 hover:bg-zinc-800 text-white font-semibold px-3.5 py-1.5 rounded-lg text-xs flex items-center space-x-1.5 transition-all disabled:opacity-40 cursor-pointer shadow-xs"
            >
              {isLoading ? (
                <>
                  <Cpu className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <span>Extract Rubric</span>
                  <Send className="w-3 h-3" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Blueprints */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                setPromptInput(p.prompt);
                handleGenerate(p.prompt);
              }}
              className="text-left p-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200 transition-all cursor-pointer"
            >
              <div className="text-xs font-bold text-zinc-900 truncate font-display">
                {p.title}
              </div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {p.tags.slice(0, 2).map((t, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-zinc-600 border border-zinc-200">
                    {t}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Requisition Dossier */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-100 gap-2">
          <div className="flex items-center space-x-2.5">
            <Briefcase className="w-4 h-4 text-zinc-600" />
            <div>
              <h3 className="text-sm font-bold text-zinc-950 font-display">
                {currentRequisition.title}
              </h3>
              <span className="text-2xs text-zinc-500">
                {currentRequisition.seniority} &bull; {currentRequisition.targetCompensation}
              </span>
            </div>
          </div>

          <button
            onClick={onProceedToEvidence}
            className="bg-zinc-950 hover:bg-zinc-800 text-white font-semibold px-4 py-1.5 rounded-lg text-xs flex items-center space-x-2 transition-all cursor-pointer self-start sm:self-auto shadow-xs"
          >
            <span>Proceed to Evidence Graph</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Competencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Required Skills */}
          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 block">
              Core Technical Competencies
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(currentRequisition.mustHaveSkills || []).map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-xs font-medium text-zinc-800 shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Evidence Calibration */}
          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 block">
              Evaluation Weights
            </span>
            <div className="space-y-1.5 text-xs">
              {(currentRequisition.evidenceRubric || []).slice(0, 3).map((item: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between text-zinc-700">
                  <span className="truncate pr-2 font-medium">{item.criterion || item.competency}</span>
                  <span className="font-mono text-[11px] font-bold text-zinc-900 shrink-0">
                    {Math.round(item.weight > 1 ? item.weight : item.weight * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
