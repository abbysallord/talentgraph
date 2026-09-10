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
  Lightbulb,
  CheckCircle2,
  FileCheck2,
  Cpu,
  RotateCcw
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

  // Autofill all answers for instant demo evaluation
  const handleAutofillAll = () => {
    const filled: { [k: string]: string } = {};
    questions.forEach((q, idx) => {
      if (idx === 0) {
        filled[q.id] = `In our production implementation, we decoupled the ingestion pipeline using an asynchronous worker queue. For state persistence, we configured SQLite in Write-Ahead Logging (WAL) mode to allow concurrent non-blocking reads while handling serialized writes. To mitigate network latency, we cached model weights in memory and utilized optimistic local updates with exponential backoff on retries.`;
      } else if (idx === 1) {
        filled[q.id] = `We isolated container privileges by configuring non-root user namespaces and strict memory limits in docker-compose.yml to prevent OOM killer cascade. For inter-service communication, we defined an internal bridge network with automated health checks on port bindings.`;
      } else {
        filled[q.id] = `We structured our FastAPI endpoints using AsyncIO lifespans and Pydantic v2 schemas to ensure zero-overhead validation. For LLM completions, we enforce strict JSON mode schema enforcement and implement graceful fallbacks to cached embeddings if API rate limits trigger.`;
      }
    });
    setAnswers(filled);
  };

  const loadSampleAnswer = (qId: string, type: 'exceptional' | 'poor') => {
    if (type === 'exceptional') {
      setAnswers((prev) => ({
        ...prev,
        [qId]: `In our architecture, we decoupled the ingestion pipeline using an asynchronous worker queue. For state persistence, we configured SQLite in Write-Ahead Logging (WAL) mode to allow concurrent non-blocking reads while handling serialized writes. To mitigate network latency, we cached model weights in memory and utilized optimistic local updates with exponential backoff on retries.`,
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
    <div className="space-y-8">
      {/* Module Header */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Contextual Technical Interviewing</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Adaptive Screening Questions for {candidate.name}
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Standard LeetCode quizzes fail to assess architecture tradeoffs. Groq synthesizes probing questions tailored specifically to {candidate.name}&apos;s verified projects, architecture decisions, and potential gaps.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={handleAutofillAll}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Autofill High-Signal Answers</span>
            </button>

            <button
              onClick={handleSynthesize}
              disabled={isSubmitting || questions.length === 0}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold px-6 py-3 rounded-2xl text-xs flex items-center space-x-2 transition-all shadow-xl shadow-emerald-500/20 cursor-pointer"
            >
              <span>{isSubmitting ? 'Synthesizing Report...' : 'Synthesize Final Recommendation'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-20 text-center space-y-4">
          <div className="w-12 h-12 border-3 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h3 className="text-base font-bold text-white">Synthesizing Adaptive Interview Questions...</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Examining code repositories and architectural proof-points to formulate deep technical probes.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 space-y-5"
            >
              {/* Question Header & Context */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 border-b border-slate-850 pb-5">
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      Question {idx + 1}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Probing Target: {q.technicalConcept || q.projectTargeted}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug pt-1">
                    {q.questionText}
                  </h3>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => loadSampleAnswer(q.id, 'exceptional')}
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 transition-colors cursor-pointer"
                  >
                    Load Strong Answer
                  </button>
                  <button
                    onClick={() => loadSampleAnswer(q.id, 'poor')}
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-850 text-slate-400 border border-slate-800 transition-colors cursor-pointer"
                  >
                    Load Weak Answer
                  </button>
                </div>
              </div>

              {/* Rationale & Rubric */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-1">
                  <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">
                    Why This Question Was Synthesized:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {q.probingRationale}
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-1">
                  <span className="font-bold text-teal-400 uppercase tracking-wider block text-[10px]">
                    Expected Evaluation Rubric:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {typeof q.evaluationRubric === 'object' && q.evaluationRubric !== null
                      ? `Exceptional: ${q.evaluationRubric.exceptional}`
                      : String(q.evaluationRubric)}
                  </p>
                </div>
              </div>

              {/* Response Box */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider block">
                  Candidate Spoken / Written Response:
                </label>
                <textarea
                  rows={4}
                  value={answers[q.id] || ''}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [q.id]: e.target.value,
                    })
                  }
                  placeholder="Candidate verbal or coding response will be recorded here..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-100 placeholder-slate-600 focus:border-teal-500 focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          ))}

          {/* Bottom Action Ribbon */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              {Object.values(answers).filter((a) => a.trim().length > 0).length} of {questions.length} responses captured.
            </span>
            <button
              onClick={handleSynthesize}
              disabled={isSubmitting || questions.length === 0}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold px-6 py-3 rounded-2xl text-xs flex items-center space-x-2 transition-all shadow-xl shadow-emerald-500/20 cursor-pointer"
            >
              <span>{isSubmitting ? 'Synthesizing...' : 'Synthesize Final Recommendation'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
