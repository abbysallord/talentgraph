'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Network, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Play, 
  Layers, 
  Zap, 
  Activity, 
  Database, 
  Users, 
  Scale, 
  HelpCircle, 
  Award,
  GitBranch,
  ExternalLink,
  Lock,
  ChevronRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { DotBackground } from '@/components/ui/DotBackground';
import { CountUp } from '@/components/ui/CountUp';
import { ShinyText } from '@/components/ui/ShinyText';
import { GlowingCard } from '@/components/ui/GlowingCard';
import { RadarChart, RadarDimension } from '@/components/ui/RadarChart';
import { ExpandableCard } from '@/components/ui/ExpandableCard';
import { AuthModal } from '@/components/AuthModal';

const showcaseCandidates = [
  {
    name: 'Marcus Vance',
    role: 'Staff Distributed Systems Engineer',
    fitScore: 94,
    recommendation: 'STRONG_HIRE',
    verifiedProject: 'Raft Consensus Cluster Engine',
    proofUrl: 'https://github.com/marcusvance/raft-core-rs',
    detail: 'Implemented leader election and log compaction handling 1.2M writes/sec with p99 latency < 2.4ms under simulated 15% packet loss.',
    radar: [
      { axis: 'Core Stack', value: 96, benchmark: 75 },
      { axis: 'Architecture', value: 98, benchmark: 80 },
      { axis: 'Concurrency', value: 95, benchmark: 70 },
      { axis: 'Velocity', value: 91, benchmark: 75 },
      { axis: 'Domain Mastery', value: 93, benchmark: 70 },
    ],
  },
  {
    name: 'Dhanush Shenoy H',
    role: 'Full-Stack & Systems Engineer',
    fitScore: 94,
    recommendation: 'STRONG_HIRE',
    verifiedProject: 'AgroNova & Oppy CLI Engine',
    proofUrl: 'https://www.agronova.in',
    detail: 'Top 90 National Finalist at OpenAI Buildathon for <1.2s edge crop pathology classification. Engineered Oppy with SQLite WAL concurrency and ATS fuzzy matching.',
    radar: [
      { axis: 'Core Stack', value: 95, benchmark: 75 },
      { axis: 'Architecture', value: 94, benchmark: 80 },
      { axis: 'Concurrency', value: 92, benchmark: 70 },
      { axis: 'Velocity', value: 97, benchmark: 75 },
      { axis: 'Domain Mastery', value: 91, benchmark: 70 },
    ],
  },
  {
    name: 'Elena Rostova',
    role: 'Principal AI & Low-Latency Engineer',
    fitScore: 91,
    recommendation: 'STRONG_HIRE',
    verifiedProject: 'PagedAttention Triton Kernels',
    proofUrl: 'https://github.com/erostova-ai/speculative-kernels',
    detail: 'Engineered custom Triton kernels for speculative decoding that slashed time-to-first-token by 38% across 70B parameter models.',
    radar: [
      { axis: 'Core Stack', value: 97, benchmark: 75 },
      { axis: 'Architecture', value: 91, benchmark: 80 },
      { axis: 'Concurrency', value: 96, benchmark: 70 },
      { axis: 'Velocity', value: 89, benchmark: 75 },
      { axis: 'Domain Mastery', value: 96, benchmark: 70 },
    ],
  },
];

export default function LandingPage() {
  const [selectedCandidateIdx, setSelectedCandidateIdx] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.user) setCurrentUser(data.user);
      } catch {}
    }
    checkAuth();
  }, []);

  const activeCandidate = showcaseCandidates[selectedCandidateIdx];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-body selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Floating Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
              <Network className="w-5 h-5 stroke-[2.3]" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 font-display">
                TalentGraph
              </span>
              <span className="ml-2 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                Enterprise AI
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-xs font-bold text-slate-600">
            <a href="#evidence-engine" className="hover:text-indigo-600 transition-colors">
              Evidence Engine
            </a>
            <a href="#why-ats-fails" className="hover:text-indigo-600 transition-colors">
              Why ATS Fails
            </a>
            <a href="#pipeline" className="hover:text-indigo-600 transition-colors">
              6-Stage Pipeline
            </a>
            <a href="#telemetry" className="hover:text-indigo-600 transition-colors">
              Audit Telemetry
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            {currentUser ? (
              <Link
                href="/console"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xs font-extrabold">
                  {currentUser.name.charAt(0)}
                </div>
                <span>{currentUser.name}</span>
              </Link>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <Lock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Recruiter Sign In</span>
              </button>
            )}

            <Link
              href="/console"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 shadow-md shadow-indigo-600/20 transition-all"
            >
              <span>Launch Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <DotBackground className="pt-16 pb-24 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Shimmering Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50/90 border border-indigo-200/80 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-indigo-600" />
              <ShinyText className="text-xs font-bold">
                Autonomous Technical Recruiting Engine &bull; Sub-500ms Groq Inference
              </ShinyText>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08] font-display">
              Hire for What They Built.<br />
              <span className="text-indigo-600">Not What They Claim.</span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Traditional ATS filters discard up to 78% of top technical builders because resumes lack exact keywords. TalentGraph constructs an objective candidate evidence graph from verified repositories, commit architectures, and explainable AI reasoning.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/console"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-7 py-3.5 rounded-2xl text-sm flex items-center space-x-2.5 shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02]"
              >
                <span>Enter Recruiter Console</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/console?action=demo"
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold px-7 py-3.5 rounded-2xl text-sm flex items-center space-x-2 transition-colors shadow-xs"
              >
                <Play className="w-4 h-4 text-indigo-600 fill-current" />
                <span>One-Click AI Demo Walkthrough</span>
              </Link>
            </div>
          </div>

          {/* Hero Interactive Showcase Widget */}
          <div id="evidence-engine" className="mt-16 max-w-5xl mx-auto">
            <GlowingCard className="p-6 md:p-10 shadow-xl border-slate-200/90">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Left: Candidate Profile & Proof Point */}
                <div className="w-full lg:w-1/2 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Live Candidate Evidence Graph
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      {activeCandidate.fitScore}% Fit Score
                    </span>
                  </div>

                  {/* Candidate Selector Tabs */}
                  <div className="flex p-1 rounded-xl bg-slate-100 border border-slate-200">
                    {showcaseCandidates.map((cand, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedCandidateIdx(idx)}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          selectedCandidateIdx === idx
                            ? 'bg-white text-indigo-600 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {cand.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 font-display">
                      {activeCandidate.name}
                    </h3>
                    <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                      {activeCandidate.role}
                    </p>
                  </div>

                  {/* Verified Project Highlight */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Verified Project Artifact
                      </span>
                      <a
                        href={activeCandidate.proofUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                      >
                        <span>GitHub Artifact</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      {activeCandidate.verifiedProject}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {activeCandidate.detail}
                    </p>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Evaluation Model:</span>
                    <span className="font-mono font-bold text-slate-800">
                      Groq Llama-3.3-70b-versatile
                    </span>
                  </div>
                </div>

                {/* Right: Bklit Radar Chart */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80">
                  <div className="w-full flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      5-Dimension Competency Radar
                    </span>
                    <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      Visual Assessment
                    </span>
                  </div>
                  <RadarChart
                    data={activeCandidate.radar}
                    candidateName={activeCandidate.name}
                    size={290}
                  />
                </div>
              </div>
            </GlowingCard>
          </div>
        </div>
      </DotBackground>

      {/* Metrics Counter Section (ReactBits CountUp) */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-extrabold text-indigo-600 font-display">
                <CountUp to={78} suffix="%" />
              </div>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Keyword Rejection Rate
              </p>
              <p className="text-2xs text-slate-500">
                Top engineers rejected by traditional keyword ATS filters
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-display">
                &lt;<CountUp to={500} suffix="ms" />
              </div>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Inference Latency
              </p>
              <p className="text-2xs text-slate-500">
                Full evidence decomposition powered by Groq LPU
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-600 font-display">
                <CountUp to={100} suffix="%" />
              </div>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Verified Code Backing
              </p>
              <p className="text-2xs text-slate-500">
                Every candidate rating is backed by public commit proof
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-extrabold text-purple-600 font-display">
                <CountUp to={0} prefix="Exact " />
              </div>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Black-Box Decisions
              </p>
              <p className="text-2xs text-slate-500">
                Transparent written justification across all 5 dimensions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* "Why Traditional ATS Fails vs What TalentGraph Proves" (Comparative Grid) */}
      <section id="why-ats-fails" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            <span>The Hiring Paradigm Shift</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Why Traditional ATS Fails Technical Teams
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Legacy recruitment software was built for HR keyword filtering, not software engineering verification. Here is why the modern technical hiring stack demands an evidence graph.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-red-200/80 p-8 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 text-rose-700 text-xs font-bold uppercase tracking-wider">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Traditional Keyword ATS</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Keyword Matching &amp; Resume Optimization
            </h3>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <li className="flex items-start space-x-2">
                <span className="text-rose-500 font-bold">&bull;</span>
                <span>Screens for exact word hits rather than actual system architecture competence.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-rose-500 font-bold">&bull;</span>
                <span>Rewarding candidates who game SEO-optimized resumes over builders with real GitHub proof.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-rose-500 font-bold">&bull;</span>
                <span>Produces black-box score numbers with zero explainable written rationale.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl border border-indigo-200 p-8 shadow-xs space-y-4 ring-1 ring-indigo-100">
            <div className="flex items-center space-x-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>TalentGraph Evidence Engine</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Cryptographic Proof-of-Work &amp; Reasoning
            </h3>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <li className="flex items-start space-x-2">
                <span className="text-indigo-600 font-bold">&bull;</span>
                <span>Extracts objective proof nodes from public git commits, PRs, and system architectures.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-indigo-600 font-bold">&bull;</span>
                <span>Writes comprehensive multi-dimensional justifications citing real codebase trade-offs.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-indigo-600 font-bold">&bull;</span>
                <span>Empowers human recruiters with ultimate sovereign gating and permanent talent memory.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* The 6-Stage Autonomous Pipeline Architecture (Bento Grid) */}
      <section id="pipeline" className="py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>End-to-End Pipeline Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Six Autonomous Stages. Zero Hallucination.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              From the initial plain-English role intake to the executive decision dossier, AI powers each evaluation step while keeping engineering managers in complete control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Conversational Requisition Intake',
                desc: 'Describe the engineering role in natural language. Groq parses unstructured requirements into architectural competencies, verified code criteria, and calibrated weights.',
                badge: 'Stage 1',
              },
              {
                step: '02',
                title: 'Candidate Evidence Graph',
                desc: 'Scans repositories, git commits, and live deployments to construct an objective proof-of-work graph with confidence scores and verification links.',
                badge: 'Stage 2',
              },
              {
                step: '03',
                title: 'Multi-Dimensional Reasoning Scorer',
                desc: 'Cross-evaluates candidate code evidence against the role rubric. Delivers transparent scores with comprehensive analytical written rationale.',
                badge: 'Stage 3',
              },
              {
                step: '04',
                title: 'Adaptive Technical Screening',
                desc: 'Synthesizes targeted interview probes tailored specifically to candidate code choices, architecture decisions, and potential knowledge gaps.',
                badge: 'Stage 4',
              },
              {
                step: '05',
                title: 'Executive Synthesis & Gating',
                desc: 'Synthesizes technical responses into an executive dossier while human recruiters maintain sovereign sign-off over final offers and next steps.',
                badge: 'Stage 5',
              },
              {
                step: '06',
                title: 'Longitudinal Talent Memory',
                desc: 'Retains candidate intelligence across openings, automatically re-surfacing top technical builders as new engineering requisitions emerge.',
                badge: 'Stage 6',
              },
            ].map((stage, idx) => (
              <GlowingCard key={idx} className="p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xs font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {stage.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {stage.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-display leading-snug">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-2xs font-bold text-indigo-600">
                  <span>Interactive in Console</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </GlowingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Telemetry & Database Reliability */}
      <section id="telemetry" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
              <Database className="w-3.5 h-3.5" />
              <span>Production Persistence</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 font-display">
              Backed by SQLite WAL &amp; Immutable Audit Logs
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every candidate view, score synthesis, stage transition, and recruiter sign-off is committed to SQLite with Write-Ahead Logging (WAL) for maximum concurrency, zero data loss, and complete SOC2-style hiring compliance.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Prisma 6 ORM</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>JWT Secure Cookie Session</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Token Password Recovery</span>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <Link
              href="/console"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-2xl text-xs flex items-center space-x-2 shadow-md transition-colors"
            >
              <Activity className="w-4 h-4 text-indigo-400" />
              <span>Open Telemetry Cockpit</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Ready to Verify Top Builders for Your Engineering Teams?
          </h2>
          <p className="text-sm sm:text-base text-indigo-200 leading-relaxed max-w-2xl mx-auto">
            Experience the automated pipeline in action or test-drive custom engineering requisitions with real candidate proof.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/console"
              className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold px-8 py-3.5 rounded-2xl text-sm shadow-xl transition-all"
            >
              Launch Recruiter Console Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-900 font-display">TalentGraph</span>
            <span>&bull;</span>
            <span>Autonomous Technical Recruiting Intelligence &amp; Evidence Graph</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/console" className="hover:text-indigo-600 font-semibold transition-colors">
              Hiring Console
            </Link>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-slate-600 font-semibold">
              Engineered by Dhanush Shenoy H
            </span>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(user) => setCurrentUser(user)}
      />
    </div>
  );
}
