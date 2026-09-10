'use client';

import React, { useState } from 'react';
import { 
  GitBranch, 
  Layers, 
  CheckCircle2, 
  Activity, 
  Cpu, 
  ExternalLink,
  Code2,
  ShieldCheck
} from 'lucide-react';

interface EvidenceNodeItem {
  id: string;
  label: string;
  category: 'architecture' | 'benchmark' | 'kernel' | 'storage' | 'ai';
  metric: string;
  detail: string;
  proofUrl: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

const defaultNodes: EvidenceNodeItem[] = [
  {
    id: 'raft',
    label: 'Raft Cluster Engine',
    category: 'architecture',
    metric: '1.2M writes/s • p99 <2.4ms',
    detail: 'Distributed consensus with log compaction under 15% simulated packet loss.',
    proofUrl: 'https://github.com/marcusvance/raft-core-rs',
    x: 18,
    y: 28,
  },
  {
    id: 'agronova',
    label: 'AgroNova Edge Vision',
    category: 'ai',
    metric: 'Top 90 OpenAI • <1.2s edge',
    detail: 'Autonomous crop leaf pathology classifier with edge quantization.',
    proofUrl: 'https://www.agronova.in',
    x: 82,
    y: 26,
  },
  {
    id: 'triton',
    label: 'PagedAttention Triton',
    category: 'kernel',
    metric: '-38% TTFT on 70B',
    detail: 'Speculative decoding kernels written in Triton for low-latency batching.',
    proofUrl: 'https://github.com/erostova-ai/speculative-kernels',
    x: 16,
    y: 74,
  },
  {
    id: 'sqlite',
    label: 'SQLite WAL Concurrency',
    category: 'storage',
    metric: 'Zero-Lock Contention',
    detail: 'Multi-writer transactional isolation with tokenized recovery pipelines.',
    proofUrl: 'https://github.com/dhanush-shenoy/oppy-engine',
    x: 80,
    y: 76,
  },
  {
    id: 'groq',
    label: 'Llama-3.3 Reasoning',
    category: 'ai',
    metric: '<480ms LPU Inference',
    detail: 'Transparent multi-dimensional score synthesis with deterministic rationale.',
    proofUrl: 'https://groq.com',
    x: 50,
    y: 88,
  },
];

export const InteractiveEvidenceCanvas: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('raft');

  const activeNode = defaultNodes.find((n) => n.id === activeNodeId) || defaultNodes[0];

  return (
    <div className="relative w-full rounded-2xl bg-zinc-950 text-white p-6 sm:p-8 overflow-hidden shadow-2xl border border-zinc-800/80">
      {/* Subtle Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 [background-size:24px_24px] [background-image:radial-gradient(#52525b_1px,transparent_1px)]"
      />

      {/* Top Header Pill */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-4 mb-6">
        <div className="flex items-center space-x-2.5">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">
            Real-Time Candidate Evidence Mesh
          </span>
        </div>
        <div className="flex items-center space-x-2 text-2xs font-mono text-zinc-400">
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">5 Verified Nodes</span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">100% Deterministic</span>
        </div>
      </div>

      {/* Interactive Canvas Surface */}
      <div className="relative z-10 h-[380px] sm:h-[420px] w-full flex items-center justify-center">
        {/* SVG Connecting Bezier Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="lineGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="lineGradInactive" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#71717a" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3f3f46" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {defaultNodes.map((node) => {
            const isActive = node.id === activeNodeId;
            return (
              <line
                key={`line-${node.id}`}
                x1="50%"
                y1="46%"
                x2={`${node.x}%`}
                y2={`${node.y}%`}
                stroke={isActive ? 'url(#lineGradActive)' : 'url(#lineGradInactive)'}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? '4 2' : 'none'}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Central Core Evaluation Node */}
        <div className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <div className="relative p-1 rounded-full bg-gradient-to-tr from-blue-600 via-sky-400 to-emerald-400 shadow-[0_0_30px_rgba(56,189,248,0.35)]">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-zinc-950 flex flex-col items-center justify-center text-center border border-zinc-700">
              <span className="text-2xs font-mono text-zinc-400 uppercase tracking-widest">FIT</span>
              <span className="text-base sm:text-lg font-extrabold text-white font-mono">94%</span>
            </div>
          </div>
          <span className="mt-2 text-2xs font-mono font-bold text-zinc-300 bg-zinc-900/90 px-2 py-0.5 rounded border border-zinc-800">
            Dhanush S. H
          </span>
        </div>

        {/* Satellite Nodes */}
        {defaultNodes.map((node) => {
          const isActive = node.id === activeNodeId;
          return (
            <div
              key={node.id}
              onClick={() => setActiveNodeId(node.id)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className={`absolute z-20 cursor-pointer transition-all duration-200 group ${
                isActive ? 'scale-105' : 'hover:scale-102 opacity-85 hover:opacity-100'
              }`}
            >
              <div 
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border backdrop-blur-md transition-all ${
                  isActive
                    ? 'bg-zinc-900 text-white border-sky-500/80 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                    : 'bg-zinc-900/70 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div 
                  className={`h-2 w-2 rounded-full ${
                    isActive ? 'bg-sky-400 shadow-[0_0_8px_#38bdf8]' : 'bg-zinc-500'
                  }`} 
                />
                <span className="text-xs font-semibold tracking-tight whitespace-nowrap">
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Micro-Inspector Dossier (Minimal Text, High-Impact Data) */}
      <div className="relative z-10 mt-2 bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sky-400 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-white tracking-tight">{activeNode.label}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-sky-300 border border-zinc-700">
                {activeNode.metric}
              </span>
            </div>
            <p className="text-2xs text-zinc-400 mt-0.5 line-clamp-1 font-mono">
              {activeNode.detail}
            </p>
          </div>
        </div>

        <a
          href={activeNode.proofUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 border border-zinc-700 transition-colors shrink-0"
        >
          <span>View GitHub Artifact</span>
          <ExternalLink className="w-3 h-3 text-zinc-400" />
        </a>
      </div>
    </div>
  );
};
