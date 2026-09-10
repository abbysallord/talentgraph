'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Network, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Cpu, 
  Play, 
  Layers, 
  Zap, 
  Activity, 
  Database, 
  Scale, 
  HelpCircle, 
  ExternalLink,
  Lock,
  ChevronRight,
  ShieldCheck,
  Code2
} from 'lucide-react';
import { CountUp } from '@/components/ui/CountUp';
import { InteractiveEvidenceCanvas } from '@/components/ui/InteractiveEvidenceCanvas';
import { AuthModal } from '@/components/AuthModal';

export default function LandingPage() {
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

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 flex flex-col font-body selection:bg-zinc-900 selection:text-white">
      {/* Floating Island Navigation */}
      <div className="sticky top-4 z-40 px-4 sm:px-6 w-full flex justify-center pointer-events-none">
        <header className="pointer-events-auto w-full max-w-5xl rounded-full border border-zinc-200/80 bg-white/80 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-zinc-950 flex items-center justify-center text-white shadow-sm">
              <Network className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base tracking-tight text-zinc-950 font-display">
                TalentGraph
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200 font-semibold">
                Enterprise AI
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-7 text-xs font-semibold text-zinc-600">
            <a href="#evidence" className="hover:text-zinc-950 transition-colors">
              Evidence Mesh
            </a>
            <a href="#comparison" className="hover:text-zinc-950 transition-colors">
              Paradigm
            </a>
            <a href="#pipeline" className="hover:text-zinc-950 transition-colors">
              6 Stages
            </a>
            <a href="#telemetry" className="hover:text-zinc-950 transition-colors">
              Persistence
            </a>
          </nav>

          <div className="flex items-center space-x-2.5">
            {currentUser ? (
              <Link
                href="/console"
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{currentUser.name}</span>
              </Link>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border border-zinc-200 bg-white text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                <Lock className="w-3 h-3 text-zinc-500" />
                <span>Sign In</span>
              </button>
            )}

            <Link
              href="/console"
              className="island-btn !py-1.5 !px-3.5 !text-xs"
            >
              <span>Console</span>
              <div className="island-btn-icon !w-4 !h-4">
                <ArrowRight className="w-2.5 h-2.5" />
              </div>
            </Link>
          </div>
        </header>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 sm:pt-28 sm:pb-28 overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            {/* Micro Eyebrow Tag */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-700">
                Autonomous Technical Recruiting Engine
              </span>
            </div>

            {/* Concise Bold Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-zinc-950 tracking-tight leading-[1.05] font-display">
              Hire for proof.<br />
              <span className="text-zinc-400">Not resume claims.</span>
            </h1>

            {/* 1-Line Punchy Subhead */}
            <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto font-normal leading-relaxed">
              Construct objective candidate evidence graphs from verified git commits, PR architectures, and LPU inference.
            </p>

            {/* Minimal CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Link
                href="/console"
                className="island-btn group !px-6 !py-3"
              >
                <span>Enter Recruiter Console</span>
                <div className="island-btn-icon">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link
                href="/console?action=demo"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-semibold text-zinc-700 transition-colors shadow-2xs"
              >
                <Play className="w-3.5 h-3.5 text-zinc-900 fill-current" />
                <span>One-Click AI Demo</span>
              </Link>
            </div>
          </div>

          {/* Interactive Evidence Canvas (Double-Bezel Architecture) */}
          <div id="evidence" className="mt-14 max-w-5xl mx-auto">
            <div className="double-bezel-outer">
              <div className="double-bezel-inner overflow-hidden">
                <InteractiveEvidenceCanvas />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quantitative Metrics Bar (Zero Prose, Maximum Visual Proof) */}
      <section className="py-14 border-y border-zinc-200/70 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-950 font-mono">
                <CountUp to={78} suffix="%" />
              </div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Keyword Rejection Rate
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 font-mono">
                &lt;<CountUp to={480} suffix="ms" />
              </div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Groq LPU Latency
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-950 font-mono">
                <CountUp to={100} suffix="%" />
              </div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Verified Code Backing
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-mono">
                <CountUp to={0} prefix="Exact " />
              </div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Black-Box Decisions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparative Paradigm Grid (Double-Bezel, High-Density Visual Contrast) */}
      <section id="comparison" className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-2xs font-mono font-bold uppercase tracking-widest text-zinc-400">
            PARADIGM SHIFT
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-display">
            Keyword Matching vs. Cryptographic Proof
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Legacy ATS Card */}
          <div className="double-bezel-outer">
            <div className="double-bezel-inner p-6 sm:p-7 space-y-4">
              <div className="flex items-center space-x-2 text-rose-600">
                <XCircle className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Legacy Keyword ATS</span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 font-display">
                Resumes &amp; Buzzword Density
              </h3>
              <ul className="space-y-2.5 text-xs text-zinc-600">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                  <span>Screens for keyword occurrences, ignoring codebase quality.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                  <span>Rewards prompt-engineered resumes over verified public commits.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                  <span>Black-box numeric score with zero audit trail or rationale.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* TalentGraph Card */}
          <div className="double-bezel-outer">
            <div className="double-bezel-inner p-6 sm:p-7 space-y-4">
              <div className="flex items-center space-x-2 text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">TalentGraph Engine</span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 font-display">
                Verified Codebase Signals
              </h3>
              <ul className="space-y-2.5 text-xs text-zinc-600">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Decomposes commits, PR architectures, and systems tradeoffs.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Generates explainable multi-dimensional written justifications.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Human recruiters retain sovereign veto on every hiring step.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Stage Autonomous Pipeline (Bento Architecture) */}
      <section id="pipeline" className="py-24 bg-zinc-100/60 border-y border-zinc-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-2xs font-mono font-bold uppercase tracking-widest text-zinc-500">
              PIPELINE ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-display">
              Six Stages. Deterministic Intelligence.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                step: '01',
                title: 'Requisition Intake',
                desc: 'Conversational agent extracts calibrated competencies and rubric weights.',
                icon: Layers,
                tag: 'Input',
              },
              {
                step: '02',
                title: 'Evidence Graph',
                desc: 'Scans repositories and commits into an objective proof-of-work mesh.',
                icon: Network,
                tag: 'Extraction',
              },
              {
                step: '03',
                title: 'Reasoning Engine',
                desc: 'Multi-dimensional fit evaluation backed by comprehensive written rationale.',
                icon: Scale,
                tag: 'Inference',
              },
              {
                step: '04',
                title: 'Adaptive Screening',
                desc: 'Synthesizes targeted technical probes tailored to candidate codebase choices.',
                icon: HelpCircle,
                tag: 'Screening',
              },
              {
                step: '05',
                title: 'Executive Dossier',
                desc: 'Synthesizes evaluation report with sovereign recruiter sign-off.',
                icon: CheckCircle2,
                tag: 'Gating',
              },
              {
                step: '06',
                title: 'Talent Memory',
                desc: 'Cross-opening memory re-surfaces top technical builders as roles open.',
                icon: Database,
                tag: 'Vault',
              },
            ].map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div key={idx} className="double-bezel-outer">
                  <div className="double-bezel-inner p-6 flex flex-col justify-between h-full space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200">
                          {stage.tag}
                        </span>
                        <span className="text-xs font-mono font-extrabold text-zinc-400">
                          {stage.step}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4 text-zinc-700" />
                        <h3 className="text-base font-bold text-zinc-950 font-display">
                          {stage.title}
                        </h3>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        {stage.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-2xs font-semibold text-zinc-700">
                      <span>Interactive Stage</span>
                      <ChevronRight className="w-3 h-3 text-zinc-400" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Production Persistence & Audit Section */}
      <section id="telemetry" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="double-bezel-outer">
          <div className="double-bezel-inner p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 text-2xs font-mono font-bold uppercase tracking-wider border border-zinc-200">
                <Database className="w-3 h-3 text-zinc-600" />
                <span>Persistence &amp; Audit</span>
              </div>
              <h2 className="text-2xl font-bold text-zinc-950 font-display">
                SQLite WAL &amp; Immutable Audit Logs
              </h2>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Transactional writes with zero lock contention. Candidate views, score rationale, and sovereign approvals are permanently audited.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-2xs font-semibold text-zinc-600">
                <span className="px-2 py-1 rounded bg-zinc-50 border border-zinc-200">Prisma 6 ORM</span>
                <span className="px-2 py-1 rounded bg-zinc-50 border border-zinc-200">JWT HTTP-Only Session</span>
                <span className="px-2 py-1 rounded bg-zinc-50 border border-zinc-200">SOC2 Audit Compatibility</span>
              </div>
            </div>

            <Link
              href="/console"
              className="island-btn shrink-0"
            >
              <span>Open Cockpit</span>
              <div className="island-btn-icon">
                <Activity className="w-3 h-3" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Sleek Dark CTA Footer */}
      <footer className="mt-auto bg-zinc-950 text-white border-t border-zinc-900 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center space-x-2.5">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Network className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white font-display">TalentGraph</span>
            <span>&bull;</span>
            <span className="font-mono text-zinc-400">Autonomous Technical Recruiting Intelligence</span>
          </div>

          <div className="flex items-center space-x-4 font-mono text-2xs">
            <Link href="/console" className="hover:text-white transition-colors">
              Hiring Console
            </Link>
            <span>&bull;</span>
            <span className="text-zinc-400 font-semibold">
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
