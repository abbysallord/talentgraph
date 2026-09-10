'use client';

import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  TrendingUp, 
  Cpu, 
  BarChart3, 
  ShieldCheck, 
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { CandidateProfile, Requisition, EvaluationRationale } from '@/lib/types';
import { RadarChart, RadarDimension } from './ui/RadarChart';

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
    if (score >= 85) return { color: 'text-emerald-800 bg-emerald-50 border-emerald-200', label: 'Strong Fit (Top 5%)' };
    if (score >= 70) return { color: 'text-indigo-800 bg-indigo-50 border-indigo-200', label: 'Qualified Candidate' };
    if (score >= 50) return { color: 'text-amber-800 bg-amber-50 border-amber-200', label: 'Partial Alignment' };
    return { color: 'text-rose-800 bg-rose-50 border-rose-200', label: 'Significant Competency Gap' };
  };

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 mb-3">
              <Scale className="w-3.5 h-3.5" />
              <span>Transparent AI Evaluation</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Explainable Reasoning Engine for {candidate.name}
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              No black-box scores. The AI engine cross-evaluates candidate code evidence against the role rubric, generating an analytical justification citing verified project artifacts.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0 self-start md:self-auto">
            <button
              onClick={runEvaluation}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors flex items-center space-x-2 cursor-pointer disabled:opacity-50 shadow-2xs"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-indigo-600' : ''}`} />
              <span>{isLoading ? 'Synthesizing...' : 'Re-Run Reasoning'}</span>
            </button>
            <button
              onClick={onProceedToScreening}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-md shadow-indigo-600/15 cursor-pointer"
            >
              <span>Next: Launch Adaptive Screening</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-4 shadow-xs">
          <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h3 className="text-base font-bold text-slate-900 font-display">Synthesizing Analytical Evaluation...</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Cross-referencing verified repository commits, system architecture patterns, and calibrated rubric weights.
          </p>
        </div>
      ) : evaluation ? (
        <div className="space-y-8">
          {/* Top Score Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Overall Score Dial */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 shadow-xs">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Calibrated Fit Score
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border ${getScoreBadge(evaluation.overallFitScore).color}`}>
                    {getScoreBadge(evaluation.overallFitScore).label}
                  </span>
                </div>

                <div className="flex items-baseline space-x-3 mt-6">
                  <span className="text-6xl font-extrabold tracking-tight text-slate-900 font-display">
                    {evaluation.overallFitScore}
                  </span>
                  <span className="text-xl text-slate-400 font-bold">/ 100</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                {evaluation.overallFitScore >= 80 
                  ? 'Strong positive alignment with core systems competencies, rapid execution speed, and proven shipping velocity.' 
                  : 'Candidate has notable gaps in either frontend UI execution, systems architecture, or production evidence.'}
              </div>
            </div>

            {/* Visual Competency Radar Chart */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-between shadow-xs">
              <div className="w-full flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-indigo-600" />
                  <span>5-Dimension Competency Radar Polygon</span>
                </h3>
                <span className="text-[11px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 font-bold">
                  Bklit Signal
                </span>
              </div>

              {/* Live Radar Visualization */}
              <RadarChart
                data={[
                  { axis: 'Core Stack', value: evaluation.dimensionScores.coreSkills, benchmark: 75 },
                  { axis: 'Architecture', value: evaluation.dimensionScores.architecturalDepth, benchmark: 80 },
                  { axis: 'Concurrency', value: Math.round((evaluation.dimensionScores.architecturalDepth + evaluation.dimensionScores.coreSkills) / 2), benchmark: 70 },
                  { axis: 'Velocity', value: evaluation.dimensionScores.productionVelocity, benchmark: 75 },
                  { axis: 'Domain Mastery', value: evaluation.dimensionScores.domainProblemSolving, benchmark: 70 },
                ]}
                candidateName={candidate.name}
                size={300}
              />
            </div>
          </div>

          {/* Written Analytical Rationale */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-4 shadow-xs">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display">
                Analytical Written Rationale
              </h3>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-sm text-slate-800 leading-relaxed font-medium">
              {evaluation.writtenRationale}
            </div>
          </div>

          {/* Tri-Column Insights: Strengths, Gaps, Interview Watchouts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Verified Strengths */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-xs">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Strengths</span>
              </div>
              <ul className="space-y-2.5">
                {evaluation.verifiedStrengths.map((str, i) => (
                  <li key={i} className="text-xs text-slate-700 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100 leading-relaxed font-medium">
                    {str}
                  </li>
                ))}
              </ul>
            </div>

            {/* Identified Gaps */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-xs">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Identified Skill Gaps</span>
              </div>
              <ul className="space-y-2.5">
                {evaluation.criticalGaps.map((gap, i) => (
                  <li key={i} className="text-xs text-slate-700 bg-amber-50/50 p-3.5 rounded-xl border border-amber-100 leading-relaxed font-medium">
                    {gap}
                  </li>
                ))}
              </ul>
            </div>

            {/* Interview Watchouts */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-xs">
              <div className="flex items-center space-x-2 text-xs font-bold text-rose-800 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Interview Watch-Outs</span>
              </div>
              <ul className="space-y-2.5">
                {evaluation.interviewWatchouts.map((watch, i) => (
                  <li key={i} className="text-xs text-slate-700 bg-rose-50/50 p-3.5 rounded-xl border border-rose-100 leading-relaxed font-medium">
                    {watch}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Progression Bar */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs text-slate-500 font-medium">
              Evaluation complete. Ready to synthesize adaptive technical screening questions.
            </span>
            <button
              onClick={onProceedToScreening}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-md shadow-indigo-600/15 cursor-pointer self-end sm:self-auto"
            >
              <span>Proceed to Step 4: Adaptive Screening</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
