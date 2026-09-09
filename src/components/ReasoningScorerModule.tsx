'use client';

import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight,
  TrendingUp,
  Cpu,
  BarChart3,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { CandidateProfile, Requisition, EvaluationRationale } from '@/lib/types';

interface ReasoningScorerModuleProps {
  candidate: CandidateProfile;
  requisition: Requisition;
  onProceedToScreening: () => void;
}

export const ReasoningScorerModule: React.FC<ReasoningScorerModuleProps> = ({
  candidate,
  requisition,
  onProceedToScreening,
}) => {
  const [evaluation, setEvaluation] = useState<EvaluationRationale | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runEvaluation = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate, requisition }),
      });
      const data = await res.json();
      if (!data.error) {
        setEvaluation(data);
      }
    } catch (err) {
      console.error('Evaluation failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    runEvaluation();
  }, [candidate.id, requisition.id]);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20';
    if (score >= 70) return 'text-blue-400 border-blue-500/30 bg-blue-950/20';
    if (score >= 50) return 'text-amber-400 border-amber-500/30 bg-amber-950/20';
    return 'text-rose-400 border-rose-500/30 bg-rose-950/20';
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
              <Scale className="w-3.5 h-3.5" />
              <span>Module 3: Reasoning Engine with Written Rationale</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Multi-Dimensional Candidate Scoring & Evidence Evaluation
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Evaluates candidate evidence against role rubrics using deep multi-step LLM reasoning. Replaces opaque percentages with written analytical rationales and concrete proof citations.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={runEvaluation}
              disabled={isLoading}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              {isLoading ? 'Re-Evaluating...' : 'Re-Run Reasoning'}
            </button>
            <button
              onClick={onProceedToScreening}
              className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/10"
            >
              <span>Launch Adaptive Screening</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center">
          <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-sm font-bold text-white">Synthesizing Candidate Evidence Graph...</h3>
          <p className="text-xs text-slate-400 mt-1">Cross-referencing GitHub signals, architecture complexity, and role rubric</p>
        </div>
      ) : evaluation ? (
        <div className="space-y-6">
          {/* Top Score Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Overall Score Dial */}
            <div className={`md:col-span-2 rounded-2xl border p-6 flex flex-col justify-between ${getScoreColor(evaluation.overallFitScore)}`}>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider">Calibrated Fit Score</span>
                  <span className="text-xs font-mono">Role: {requisition.id}</span>
                </div>
                <div className="flex items-baseline space-x-2 mt-4">
                  <span className="text-5xl font-extrabold tracking-tight">{evaluation.overallFitScore}</span>
                  <span className="text-lg opacity-70">/ 100</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-current/20 text-xs">
                {evaluation.overallFitScore >= 80 
                  ? 'Strong positive alignment with core FDE competencies and proven shipping velocity.' 
                  : 'Candidate has notable gaps in either frontend UI execution or distributed architecture depth.'}
              </div>
            </div>

            {/* Dimension Breakdown Bars */}
            <div className="md:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span>Competency Dimension Scoring</span>
              </h3>

              <div className="space-y-3 pt-1">
                {[
                  { label: 'Core Technical Stack Fit', score: evaluation.dimensionScores.coreSkills, color: 'bg-emerald-500' },
                  { label: 'Architectural & Systems Depth', score: evaluation.dimensionScores.architecturalDepth, color: 'bg-blue-500' },
                  { label: 'Production Velocity & Shipped Work', score: evaluation.dimensionScores.productionVelocity, color: 'bg-amber-500' },
                  { label: 'Domain & Problem-Solving Mastery', score: evaluation.dimensionScores.domainProblemSolving, color: 'bg-purple-500' },
                ].map((dim, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">{dim.label}</span>
                      <span className="text-white font-mono font-bold">{dim.score}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full ${dim.color} transition-all duration-500`}
                        style={{ width: `${dim.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Written Analytical Rationale */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Analytical Written Rationale</span>
            </h3>
            <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800/80 text-sm text-slate-200 leading-relaxed">
              {evaluation.writtenRationale}
            </div>
          </div>

          {/* Tri-Column Insights: Strengths, Gaps, Interview Watchouts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Verified Strengths */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Strengths</span>
              </div>
              <ul className="space-y-2">
                {evaluation.verifiedStrengths.map((str, i) => (
                  <li key={i} className="text-xs text-slate-300 bg-slate-950/50 p-3 rounded-lg border border-slate-800/60 leading-normal">
                    {str}
                  </li>
                ))}
              </ul>
            </div>

            {/* Critical Gaps */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
                <AlertTriangle className="w-4 h-4" />
                <span>Identified Skill Gaps</span>
              </div>
              <ul className="space-y-2">
                {evaluation.criticalGaps.map((gap, i) => (
                  <li key={i} className="text-xs text-slate-300 bg-slate-950/50 p-3 rounded-lg border border-slate-800/60 leading-normal">
                    {gap}
                  </li>
                ))}
              </ul>
            </div>

            {/* Interview Watchouts */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-3">
                <AlertCircle className="w-4 h-4" />
                <span>Interview Watch-Outs</span>
              </div>
              <ul className="space-y-2">
                {evaluation.interviewWatchouts.map((watch, i) => (
                  <li key={i} className="text-xs text-slate-300 bg-slate-950/50 p-3 rounded-lg border border-slate-800/60 leading-normal">
                    {watch}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
