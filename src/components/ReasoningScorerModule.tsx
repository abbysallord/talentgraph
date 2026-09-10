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
  AlertCircle,
  RotateCcw
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

  const getScoreBadge = (score: number) => {
    if (score >= 85) return { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30', label: 'Strong Fit (Top 5%)' };
    if (score >= 70) return { color: 'text-teal-400 bg-teal-500/10 border-teal-500/30', label: 'Qualified Candidate' };
    if (score >= 50) return { color: 'text-amber-400 bg-amber-500/10 border-amber-500/30', label: 'Partial Alignment' };
    return { color: 'text-rose-400 bg-rose-500/10 border-rose-500/30', label: 'Significant Competency Gap' };
  };

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-3">
              <Scale className="w-3.5 h-3.5" />
              <span>Transparent AI Evaluation</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Explainable Reasoning Engine for {candidate.name}
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
              No black-box scores. Groq cross-evaluates candidate code evidence against the role rubric, writing an analytical technical justification citing verified project artifacts.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={runEvaluation}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-950 hover:bg-slate-850 text-slate-200 border border-slate-800 transition-colors flex items-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Synthesizing...' : 'Re-Run Reasoning'}</span>
            </button>
            <button
              onClick={onProceedToScreening}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-2xl text-xs flex items-center space-x-2 transition-all shadow-xl shadow-emerald-500/20 cursor-pointer"
            >
              <span>Next Step: Launch Adaptive Screening</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-20 text-center space-y-4">
          <div className="w-12 h-12 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h3 className="text-base font-bold text-white">Synthesizing Analytical Evaluation...</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Cross-referencing verified repository commits, system architecture patterns, and calibrated rubric weights.
          </p>
        </div>
      ) : evaluation ? (
        <div className="space-y-8">
          {/* Top Score Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Overall Score Dial */}
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800/80 rounded-3xl p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Calibrated Fit Score
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border ${getScoreBadge(evaluation.overallFitScore).color}`}>
                    {getScoreBadge(evaluation.overallFitScore).label}
                  </span>
                </div>

                <div className="flex items-baseline space-x-3 mt-6">
                  <span className="text-6xl font-extrabold tracking-tight text-white">
                    {evaluation.overallFitScore}
                  </span>
                  <span className="text-xl text-slate-500 font-semibold">/ 100</span>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 text-xs text-slate-300 leading-relaxed">
                {evaluation.overallFitScore >= 80 
                  ? 'Strong positive alignment with core systems competencies, rapid execution speed, and proven shipping velocity.' 
                  : 'Candidate has notable gaps in either frontend UI execution, systems architecture, or production evidence.'}
              </div>
            </div>

            {/* Dimension Breakdown Bars */}
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800/80 rounded-3xl p-8 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span>Competency Dimension Breakdown</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-500">Evaluated by LLM Reasoning</span>
              </div>

              <div className="space-y-4 pt-1">
                {[
                  { label: 'Core Technical Stack Fit', score: evaluation.dimensionScores.coreSkills, color: 'bg-emerald-500' },
                  { label: 'Architectural & Systems Depth', score: evaluation.dimensionScores.architecturalDepth, color: 'bg-teal-500' },
                  { label: 'Production Velocity & Shipped Work', score: evaluation.dimensionScores.productionVelocity, color: 'bg-indigo-500' },
                  { label: 'Domain & Problem-Solving Mastery', score: evaluation.dimensionScores.domainProblemSolving, color: 'bg-purple-500' },
                ].map((dim, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">{dim.label}</span>
                      <span className="text-white font-mono font-bold">{dim.score}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full ${dim.color} transition-all duration-700`}
                        style={{ width: `${dim.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Written Analytical Rationale */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Analytical Written Rationale
              </h3>
            </div>
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 text-sm text-slate-200 leading-relaxed">
              {evaluation.writtenRationale}
            </div>
          </div>

          {/* Tri-Column Insights: Strengths, Gaps, Interview Watchouts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Verified Strengths */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Strengths</span>
              </div>
              <ul className="space-y-2.5">
                {evaluation.verifiedStrengths.map((str, i) => (
                  <li key={i} className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed">
                    {str}
                  </li>
                ))}
              </ul>
            </div>

            {/* Identified Gaps */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Identified Skill Gaps</span>
              </div>
              <ul className="space-y-2.5">
                {evaluation.criticalGaps.map((gap, i) => (
                  <li key={i} className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed">
                    {gap}
                  </li>
                ))}
              </ul>
            </div>

            {/* Interview Watchouts */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>Interview Watch-Outs</span>
              </div>
              <ul className="space-y-2.5">
                {evaluation.interviewWatchouts.map((watch, i) => (
                  <li key={i} className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed">
                    {watch}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Progression Bar */}
          <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Evaluation complete. Ready to synthesize adaptive technical screening questions.
            </span>
            <button
              onClick={onProceedToScreening}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-2xl text-xs flex items-center space-x-2 transition-all shadow-xl shadow-emerald-500/20 cursor-pointer"
            >
              <span>Next Step: Launch Adaptive Screening</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
