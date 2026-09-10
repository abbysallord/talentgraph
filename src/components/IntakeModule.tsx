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
  Zap,
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
      title: 'Founding Distributed Systems & AI Platform Engineer',
      prompt: 'Need a founding engineer to architect fault-tolerant distributed consensus clusters, low-latency Go/Rust inference runners, and SQLite WAL concurrent engines with zero-loss event streaming.',
      tags: ['Distributed Raft', 'Go / Rust', 'SQLite WAL', 'Kafka Stream', 'Sub-5ms Latency']
    },
    {
      title: 'Low-Latency AI Voice Systems Architect',
      prompt: 'Hiring a voice systems specialist to build sub-second latency conversational voice agents with continuous VAD, in-memory neural TTS (Kokoro/KittenTTS), and Linux audio stream routing.',
      tags: ['Neural TTS', 'Silero VAD', 'WebSocket Streaming', 'PipeWire']
    },
    {
      title: 'High-Scale Platform Infrastructure Lead',
      prompt: 'Looking for a lead platform architect experienced in Kubernetes operators, spot-instance GPU cluster optimization, distributed Ray pipelines, and automated ATS matching algorithms.',
      tags: ['Kubernetes Operators', 'GPU Autoscaling', 'Ray Clusters', 'Data Pipelines']
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
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Conversational Requisition Agent</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Define Your Engineering Role in Plain English
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Skip rigid HR job description templates. Describe your engineering requirements, and the AI agent decomposes your intent into architectural competencies, verified code criteria, and calibrated scoring weights.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl shrink-0 font-mono">
            <Zap className="w-3.5 h-3.5" />
            <span className="font-semibold">Sub-500ms Groq Inference</span>
          </div>
        </div>

        {/* Conversational Input Console */}
        <div className="space-y-4">
          <div className="relative bg-slate-50 rounded-2xl border border-slate-200 p-2 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
            <textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="e.g. We are hiring a Staff Systems Engineer to build our next-generation fault-tolerant event broker. Must have deep experience in Raft consensus, Go or Rust memory management, and Linux epoll/io_uring network sockets..."
              rows={3}
              className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm p-3 focus:outline-none resize-none font-medium"
            />
            <div className="flex items-center justify-between border-t border-slate-200/80 pt-2 px-2">
              <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
                <Code2 className="w-4 h-4 text-emerald-600" />
                <span>AI will extract: Skills, Competency Rubric &amp; Experience Weights</span>
              </div>
              <button
                onClick={() => handleGenerate(promptInput)}
                disabled={isLoading || !promptInput.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 shadow-md shadow-emerald-600/15 transition-all disabled:opacity-40 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Cpu className="w-3.5 h-3.5 animate-spin" />
                    <span>Synthesizing Rubric...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Evidence Rubric</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick-Start Presets */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              1-Click Verified Role Blueprints:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {presets.map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPromptInput(p.prompt);
                    handleGenerate(p.prompt);
                  }}
                  className="text-left p-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 transition-all group cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-900 font-display">
                      {p.title}
                    </span>
                    <Sparkles className="w-3 h-3 text-slate-400 group-hover:text-emerald-600" />
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-2 leading-relaxed">
                    {p.prompt}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {p.tags.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200 font-medium">
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

      {/* Generated Evidence Rubric Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-5 gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Active Requisition Intelligence
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              {currentRequisition.title}
            </h3>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold border border-slate-200">
              {currentRequisition.seniority}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              {currentRequisition.targetCompensation}
            </span>
          </div>
        </div>

        {/* Summary Description */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Role Summary &amp; Architecture Focus:
          </span>
          <p className="text-xs text-slate-700 leading-relaxed">
            {currentRequisition.summary}
          </p>
        </div>

        {/* Grid of Extracted Signals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Required Skills */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Extracted Technical Stack
              </h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(currentRequisition.mustHaveSkills || []).map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Competency Pillars */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Evaluated Competencies
              </h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(currentRequisition.architecturalCompetencies || []).map((comp, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scoring Dimension Weights */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Calibrated Dimension Weights &amp; Criteria
            </h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {(currentRequisition.evidenceRubric || []).map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {item.criterion}
                  </span>
                  <span className="text-xs font-bold font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {item.weight}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Proceed CTA */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Rubric verified and loaded into inference context.</span>
          </div>

          <button
            onClick={onProceedToEvidence}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-md shadow-emerald-600/15 transition-all cursor-pointer self-end sm:self-auto"
          >
            <span>Proceed to Step 2: Inspect Candidate Evidence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
