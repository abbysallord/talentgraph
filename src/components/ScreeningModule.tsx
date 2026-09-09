'use client';

import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  Sparkles, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Layers, 
  Code,
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import { CandidateProfile, Requisition, AdaptiveQuestion, InterviewSynthesis } from '@/lib/types';

interface ScreeningModuleProps {
  candidate: CandidateProfile;
  requisition: Requisition;
  onSynthesisComplete: (synthesis: InterviewSynthesis) => void;
}

export const ScreeningModule: React.FC<ScreeningModuleProps> = ({
  candidate,
  requisition,
  onSynthesisComplete,
}) => {
  const [questions, setQuestions] = useState<AdaptiveQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [qId: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/screening', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate, requisition }),
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setQuestions(data);
        const initialAnswers: { [k: string]: string } = {};
        data.forEach((q) => {
          initialAnswers[q.id] = '';
        });
        setAnswers(initialAnswers);
      }
    } catch (err) {
      console.error('Failed to load screening questions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [candidate.id, requisition.id]);

  const loadSampleAnswer = (qId: string, type: 'exceptional' | 'poor') => {
    const q = questions.find((x) => x.id === qId);
    if (!q) return;

    if (type === 'exceptional') {
      setAnswers((prev) => ({
        ...prev,
        [qId]: `In our implementation, we decoupled the ingestion pipeline using an asynchronous worker queue. For state persistence, we configured SQLite in Write-Ahead Logging (WAL) mode to allow concurrent non-blocking reads while handling serialized writes. To mitigate rural network latency, we cached model weights in memory and utilized optimistic local updates with exponential backoff on retries.`,
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [qId]: `We used standard try/catch blocks and sent HTTP requests to the backend. If it failed, the user had to refresh the page.`,
      }));
    }
  };

  const handleSynthesize = async () => {
    setIsSubmitting(true);
    try {
      const qaResponses = questions.map((q) => ({
        questionText: q.questionText,
        candidateAnswer: answers[q.id] || 'No response provided.',
        rubric: q.evaluationRubric,
      }));

      const res = await fetch('/api/synthesis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate, requisition, qaResponses }),
      });
      const data = await res.json();
      if (!data.error) {
        onSynthesisComplete(data);
      }
    } catch (err) {
      console.error('Failed to synthesize interview:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Module 4: Adaptive Screening Agent</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Project-Specific Technical Question Generator & Live Simulator
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Generates custom interview questions that directly interrogate the candidate&apos;s declared architecture, edge cases, and failure modes to verify authentic engineering authorship.
            </p>
          </div>

          <button
            onClick={handleSynthesize}
            disabled={isSubmitting || questions.length === 0}
            className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/10 shrink-0"
          >
            <span>{isSubmitting ? 'Synthesizing Evaluation...' : 'Complete Evaluation Synthesis'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center">
          <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-sm font-bold text-white">Generating Adaptive Technical Questions...</h3>
          <p className="text-xs text-slate-400 mt-1">Interrogating {candidate.name}&apos;s declared repositories and architecture claims</p>
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
                <div className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-mono font-bold text-emerald-400 border border-slate-700">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-slate-400">Target Project: </span>
                    <span className="text-xs font-bold text-white">{q.projectTargeted}</span>
                  </div>
                </div>
                <div className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-950/60 text-blue-400 border border-blue-800/80">
                  Concept: {q.technicalConcept}
                </div>
              </div>

              {/* Question Text */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                <h4 className="text-sm font-bold text-slate-100 leading-snug">{q.questionText}</h4>
                <div className="mt-2 flex items-start space-x-2 text-xs text-slate-400">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Why this question matters:</strong> {q.probingRationale}</span>
                </div>
              </div>

              {/* Rubric Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-rose-950/20 border border-rose-900/40 p-3 rounded-lg">
                  <span className="font-bold text-rose-400 block mb-1">Poor Signal (0-50%):</span>
                  <p className="text-slate-400 leading-relaxed">{q.evaluationRubric.poor}</p>
                </div>
                <div className="bg-amber-950/20 border border-amber-900/40 p-3 rounded-lg">
                  <span className="font-bold text-amber-400 block mb-1">Acceptable Signal (60-80%):</span>
                  <p className="text-slate-400 leading-relaxed">{q.evaluationRubric.acceptable}</p>
                </div>
                <div className="bg-emerald-950/20 border border-emerald-900/40 p-3 rounded-lg">
                  <span className="font-bold text-emerald-400 block mb-1">Exceptional Signal (90-100%):</span>
                  <p className="text-slate-400 leading-relaxed">{q.evaluationRubric.exceptional}</p>
                </div>
              </div>

              {/* Interactive Candidate Response Simulator */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-300">Candidate Response Simulation:</label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => loadSampleAnswer(q.id, 'exceptional')}
                      className="text-[11px] font-semibold text-emerald-400 hover:underline"
                    >
                      + Load Strong Answer
                    </button>
                    <span className="text-slate-600 text-xs">•</span>
                    <button
                      onClick={() => loadSampleAnswer(q.id, 'poor')}
                      className="text-[11px] font-semibold text-rose-400 hover:underline"
                    >
                      + Load Weak Answer
                    </button>
                  </div>
                </div>
                <textarea
                  rows={3}
                  value={answers[q.id] || ''}
                  onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                  placeholder="Record or simulate candidate response..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>
            </div>
          ))}

          {/* Bottom Action */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleSynthesize}
              disabled={isSubmitting}
              className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/10"
            >
              <span>{isSubmitting ? 'Synthesizing Decision...' : 'Generate Final Evaluation & Hire Synthesis'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
