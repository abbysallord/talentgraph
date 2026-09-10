'use client';

import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Cpu, 
  BarChart3, 
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { CandidateProfile, Requisition, EvaluationRationale } from '@/lib/types';
import { RadarChart } from './ui/RadarChart';

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
    if (score >= 85) return { color: 'text-zinc-900 bg-zinc-100 border-zinc-300', label: 'Strong Fit (Top 5%)' };
    if (score >= 70) return { color: 'text-zinc-800 bg-zinc-100 border-zinc-200', label: 'Qualified Candidate' };
    if (score >= 50) return { color: 'text-amber-800 bg-amber-50 border-amber-200', label: 'Partial Alignment' };
    return { color: 'text-rose-800 bg-rose-50 border-rose-200', label: 'Competency Gap' };
  };

  return (
    <div className="space-y-5">
      {/* Module Header */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-950 font-display">
                Multi-Dimensional Reasoning Scorer
              </h2>
              <span className="text-2xs font-mono text-zinc-500">
                Evaluating {candidate.name} against {requisition.title}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={runEvaluation}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200 transition-colors flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Running...' : 'Re-Run'}</span>
            </button>
            <button
              onClick={onProceedToScreening}
              className="bg-zinc-950 hover:bg-zinc-800 text-white font-semibold px-4 py-1.5 rounded-lg text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-xs"
            >
              <span>Next: Screening</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-12 text-center space-y-3 shadow-2xs">
          <div className="w-8 h-8 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="text-xs font-bold text-zinc-900 font-display">Synthesizing Evaluation...</div>
          <p className="text-2xs text-zinc-400 font-mono">
            Cross-referencing verified commits against calibrated rubric
          </p>
        </div>
      ) : evaluation ? (
        <div className="space-y-5">
          {/* Top Score Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Overall Score Dial */}
            <div className="lg:col-span-5 bg-white border border-zinc-200/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-2xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                    Deterministic Fit
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getScoreBadge(evaluation.overallFitScore).color}`}>
                    {getScoreBadge(evaluation.overallFitScore).label}
                  </span>
                </div>

                <div className="flex items-baseline space-x-2 pt-2">
                  <span className="text-5xl font-extrabold tracking-tight text-zinc-950 font-mono">
                    {evaluation.overallFitScore}
                  </span>
                  <span className="text-base text-zinc-400 font-mono font-bold">/ 100</span>
                </div>
              </div>

              <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200/80 text-xs text-zinc-700 leading-relaxed font-medium">
                {evaluation.overallFitScore >= 80 
                  ? 'Strong alignment with core competencies, verified shipping velocity, and architectural depth.' 
                  : 'Candidate exhibits partial alignment; requires verification during targeted screening probes.'}
              </div>
            </div>

            {/* Visual Competency Radar Chart */}
            <div className="lg:col-span-7 bg-white border border-zinc-200/80 rounded-2xl p-5 flex flex-col items-center justify-between shadow-2xs">
              <div className="w-full flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center space-x-2">
                  <BarChart3 className="w-3.5 h-3.5 text-zinc-600" />
                  <span>5-Dimension Competency Polygon</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                  Visual Signal
                </span>
              </div>

              {/* Radar Visualization */}
              <RadarChart
                data={[
                  { axis: 'Core Stack', value: evaluation.dimensionScores.coreSkills, benchmark: 75 },
                  { axis: 'Architecture', value: evaluation.dimensionScores.architecturalDepth, benchmark: 80 },
                  { axis: 'Concurrency', value: Math.round((evaluation.dimensionScores.architecturalDepth + evaluation.dimensionScores.coreSkills) / 2), benchmark: 70 },
                  { axis: 'Velocity', value: evaluation.dimensionScores.productionVelocity, benchmark: 75 },
                  { axis: 'Domain Mastery', value: evaluation.dimensionScores.domainProblemSolving, benchmark: 70 },
                ]}
                candidateName={candidate.name}
                size={270}
              />
            </div>
          </div>

          {/* Written Analytical Rationale */}
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 space-y-2.5 shadow-2xs">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-zinc-600" />
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-display">
                Analytical Justification
              </h3>
            </div>
            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200/80 text-xs text-zinc-700 leading-relaxed font-medium">
              {evaluation.writtenRationale}
            </div>
          </div>

          {/* Tri-Column Insights: Strengths, Gaps, Watchouts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Strengths */}
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center space-x-2 text-xs font-bold text-zinc-900 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Strengths</span>
              </div>
              <ul className="space-y-2">
                {evaluation.verifiedStrengths.map((str, i) => (
                  <li key={i} className="text-xs text-zinc-700 bg-zinc-50 p-2.5 rounded-lg border border-zinc-200/80 leading-relaxed font-medium">
                    {str}
                  </li>
                ))}
              </ul>
            </div>

            {/* Gaps */}
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center space-x-2 text-xs font-bold text-zinc-900 uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Competency Gaps</span>
              </div>
              <ul className="space-y-2">
                {evaluation.criticalGaps.map((gap, i) => (
                  <li key={i} className="text-xs text-zinc-700 bg-zinc-50 p-2.5 rounded-lg border border-zinc-200/80 leading-relaxed font-medium">
                    {gap}
                  </li>
                ))}
              </ul>
            </div>

            {/* Watchouts */}
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center space-x-2 text-xs font-bold text-zinc-900 uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5 text-zinc-600" />
                <span>Screening Probes</span>
              </div>
              <ul className="space-y-2">
                {evaluation.interviewWatchouts.map((watch, i) => (
                  <li key={i} className="text-xs text-zinc-700 bg-zinc-50 p-2.5 rounded-lg border border-zinc-200/80 leading-relaxed font-medium">
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
