'use client';

import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  Lightbulb, 
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
    <div className="space-y-5">
      {/* Module Header */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-950 font-display">
                Adaptive Technical Screening
              </h2>
              <span className="text-2xs font-mono text-zinc-500">
                Tailored probes calibrated to candidate repositories and systems tradeoffs
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleAutofillAll}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200/70 text-zinc-800 border border-zinc-200 transition-colors flex items-center space-x-1.5 cursor-pointer shadow-2xs"
            >
              <Lightbulb className="w-3.5 h-3.5 text-zinc-600" />
              <span>Autofill Answers</span>
            </button>

            <button
              onClick={handleSynthesize}
              disabled={isSubmitting || questions.length === 0}
              className="bg-zinc-950 hover:bg-zinc-800 disabled:opacity-50 text-white font-semibold px-4 py-1.5 rounded-lg text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-xs"
            >
              <span>{isSubmitting ? 'Synthesizing...' : 'Synthesize Dossier'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-12 text-center space-y-3 shadow-2xs">
          <div className="w-8 h-8 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="text-xs font-bold text-zinc-900 font-display">Formulating Probes...</div>
          <p className="text-2xs text-zinc-400 font-mono">
            Examining codebase architecture for targeted technical inquiry
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-white border border-zinc-200/80 rounded-2xl p-5 space-y-3 shadow-2xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-zinc-100 pb-3">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200">
                      Probe 0{idx + 1}
                    </span>
                    <span className="text-2xs text-zinc-400 font-mono">
                      Target: {q.technicalConcept || q.projectTargeted}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-zinc-950 leading-snug font-display">
                    {q.questionText}
                  </h3>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0">
                  <button
                    onClick={() => loadSampleAnswer(q.id, 'exceptional')}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 transition-colors cursor-pointer"
                  >
                    Strong
                  </button>
                  <button
                    onClick={() => loadSampleAnswer(q.id, 'poor')}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-zinc-50 hover:bg-zinc-100 text-zinc-500 border border-zinc-200 transition-colors cursor-pointer"
                  >
                    Weak
                  </button>
                </div>
              </div>

              <textarea
                value={answers[q.id] || ''}
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                placeholder="Candidate verbal or written response..."
                rows={3}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:border-zinc-400 focus:outline-none transition-all resize-none font-mono"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
