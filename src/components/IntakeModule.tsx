'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Layers, 
  CheckCircle2, 
  FileText,
  Target,
  ArrowRight,
  Code2,
  Cpu,
  ShieldCheck,
  Zap
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
      title: 'Founding Full-Stack & Systems Engineer',
      prompt: 'Need an autonomous founding engineer who can build responsive Next.js frontends and low-latency FastAPI backends, orchestrate Docker containers, integrate Groq LLM structured outputs, and ship production MVPs in 10-day sprints.',
      tags: ['Next.js 16', 'FastAPI', 'SQLite WAL', 'Docker', 'Groq API']
    },
    {
      title: 'Low-Latency AI Voice Systems Architect',
      prompt: 'Hiring a voice systems specialist to build sub-second latency conversational agents with continuous VAD, in-memory neural TTS (Kokoro/KittenTTS), and Linux audio stream routing.',
      tags: ['Neural TTS', 'Silero VAD', 'WebSocket Streaming', 'PipeWire']
    },
    {
      title: 'High-Throughput Distributed Backend Lead',
      prompt: 'Looking for a lead backend systems architect experienced in multi-threaded web crawlers, SQLite Write-Ahead Logging concurrency, connection pool tuning, and automated ATS matching algorithms.',
      tags: ['Concurrency', 'SQLite WAL', 'AsyncIO', 'Data Pipelines']
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
    <div className="space-y-8">
      {/* Top Creation Section */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Conversational Requisition Agent</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Define Your Engineering Role in Plain English
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Skip rigid HR job description templates. Describe your engineering requirements, and the AI agent decomposes your intent into architectural competencies, verified code criteria, and calibrated scoring weights.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-xl shrink-0">
            <Zap className="w-3.5 h-3.5" />
            <span className="font-mono text-[11px] font-medium">Sub-500ms Groq Inference</span>
          </div>
        </div>

        {/* Conversational Input Console */}
        <div className="space-y-4">
          <div className="relative bg-slate-950 rounded-2xl border border-slate-800 p-2 focus-within:border-emerald-500/50 transition-all shadow-inner">
            <textarea
              rows={4}
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="Describe the role: e.g. We need a founding engineer who can architect FastAPI backends, build responsive React frontends, configure Docker Compose, and ship full-stack MVPs autonomously..."
              className="w-full bg-transparent px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none leading-relaxed"
            />
            <div className="flex items-center justify-between px-3 py-2 border-t border-slate-900">
              <span className="text-xs text-slate-500">
                Powered by Groq LLM • Auto-synthesizes technical rubric
              </span>
              <button
                onClick={() => handleGenerate(promptInput)}
                disabled={isLoading || !promptInput.trim()}
                className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <span>{isLoading ? 'Calibrating Role...' : 'Generate Requisition'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Role Presets */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Or Click a Pre-Calibrated Enterprise Scenario:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleGenerate(preset.prompt)}
                  disabled={isLoading}
                  className="bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-4 rounded-2xl text-left transition-all group cursor-pointer"
                >
                  <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {preset.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {preset.prompt}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {preset.tags.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Requisition Specification Sheet */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-mono uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                Active Specification: {currentRequisition.id}
              </span>
              <span className="text-xs text-slate-400">• {currentRequisition.department}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mt-1">
              {currentRequisition.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Seniority: <span className="text-slate-200 font-semibold">{currentRequisition.seniority}</span> • Target Budget: <span className="text-emerald-400 font-mono font-semibold">{currentRequisition.targetCompensation}</span>
            </p>
          </div>

          <button
            onClick={onProceedToEvidence}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-2xl text-xs flex items-center space-x-2 transition-all shadow-xl shadow-emerald-500/20 shrink-0 cursor-pointer"
          >
            <span>Next Step: Inspect Candidate Evidence Graph</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Role Summary */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Synthesized Executive Role Summary
          </span>
          <p className="text-sm text-slate-300 leading-relaxed">
            {currentRequisition.summary}
          </p>
        </div>

        {/* Competency & Skill Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Must Have Technical Skills */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Mandatory Technical Criteria
              </h4>
            </div>
            <div className="space-y-2">
              {currentRequisition.mustHaveSkills.map((skill, idx) => (
                <div key={idx} className="flex items-center space-x-2.5 text-xs text-slate-200 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Competencies */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-teal-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Architectural Competencies
              </h4>
            </div>
            <div className="space-y-2">
              {currentRequisition.architecturalCompetencies.map((comp, idx) => (
                <div key={idx} className="flex items-center space-x-2.5 text-xs text-slate-200 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                  <Target className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calibrated Evidence Rubric */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-indigo-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Calibrated Evidence Scoring Rubric
              </h4>
            </div>
            <span className="text-xs text-slate-400 font-mono">100% Total Weight</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentRequisition.evidenceRubric.map((rubric, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800/60 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{rubric.criterion}</span>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {rubric.weight}% Weight
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${rubric.weight * 2.5}%` }} />
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {rubric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
