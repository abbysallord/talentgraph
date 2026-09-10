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
  ShieldCheck,
  Zap,
  Database,
  Terminal,
  Sparkles
} from 'lucide-react';

interface EvidenceNodeItem {
  id: string;
  label: string;
  category: string;
  metric: string;
  detail: string;
  proofUrl: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  curveControlX: number;
  curveControlY: number;
}

interface ShowcaseProfile {
  id: string;
  name: string;
  shortName: string;
  role: string;
  fitScore: number;
  nodes: EvidenceNodeItem[];
}

const showcaseProfiles: ShowcaseProfile[] = [
  {
    id: 'dhanush',
    name: 'Dhanush Shenoy H',
    shortName: 'Dhanush S. H',
    role: 'Full-Stack & Systems Engineer',
    fitScore: 94,
    nodes: [
      {
        id: 'agronova',
        label: 'AgroNova Edge Vision',
        category: 'Edge AI Quantization',
        metric: 'Top 90 OpenAI • <1.2s Edge',
        detail: 'Engineered edge crop pathology classifier running quantized vision models in <1.2s on mobile browsers without server round-trip.',
        proofUrl: 'https://www.agronova.in',
        icon: Zap,
        x: 18,
        y: 26,
        curveControlX: 30,
        curveControlY: 34,
      },
      {
        id: 'oppy-sqlite',
        label: 'SQLite WAL Engine',
        category: 'Concurrent Storage',
        metric: 'Zero-Lock Contention',
        detail: 'Configured SQLite in WAL mode with multi-worker crawlers for concurrent reads and serialized atomic transactional writes.',
        proofUrl: 'https://github.com/abbysallord/oppy',
        icon: Database,
        x: 82,
        y: 24,
        curveControlX: 68,
        curveControlY: 32,
      },
      {
        id: 'fastapi-async',
        label: 'FastAPI Async Engine',
        category: 'Systems Architecture',
        metric: 'Sub-40ms P99 Latency',
        detail: 'Architected asynchronous microservice pipelines using AsyncIO lifespan contexts, Pydantic v2 schemas, and memory-resident pools.',
        proofUrl: 'https://github.com/abbysallord/talentgraph',
        icon: Terminal,
        x: 16,
        y: 74,
        curveControlX: 30,
        curveControlY: 62,
      },
      {
        id: 'tts-speech',
        label: 'KittenTTS Voice Pipeline',
        category: 'Speech Architecture',
        metric: 'In-Memory VAD Streaming',
        detail: 'Engineered sub-second audio synthesis daemon with Silero continuous VAD and peak-amplitude float audio normalization.',
        proofUrl: 'https://github.com/abbysallord',
        icon: Activity,
        x: 82,
        y: 74,
        curveControlX: 68,
        curveControlY: 62,
      },
      {
        id: 'groq-lpu',
        label: 'Groq LPU Scorer',
        category: 'Deterministic Inference',
        metric: '<480ms LPU Latency',
        detail: 'Multi-dimensional evaluation engine extracting architectural rubrics via Groq LPU inference with strict schema validation.',
        proofUrl: 'https://groq.com',
        icon: Cpu,
        x: 50,
        y: 88,
        curveControlX: 50,
        curveControlY: 68,
      },
    ],
  },
  {
    id: 'marcus',
    name: 'Marcus Vance',
    shortName: 'Marcus V.',
    role: 'Staff Distributed Systems Engineer',
    fitScore: 94,
    nodes: [
      {
        id: 'raft-cluster',
        label: 'Raft Consensus Core',
        category: 'Distributed Consensus',
        metric: '1.2M writes/s • p99 <2.4ms',
        detail: 'Engineered leader election and log compaction in Rust handling 1.2M writes/sec with p99 latency < 2.4ms under 15% simulated packet loss.',
        proofUrl: 'https://github.com/marcusvance/raft-core-rs',
        icon: GitBranch,
        x: 18,
        y: 26,
        curveControlX: 30,
        curveControlY: 34,
      },
      {
        id: 'paxos-mesh',
        label: 'Multi-Paxos Replicator',
        category: 'State Machine Replication',
        metric: 'Zero Split-Brain Quorum',
        detail: 'Implemented epoch-based leasing and vectorized commit logs across 5-node geo-replicated clusters.',
        proofUrl: 'https://github.com/marcusvance',
        icon: Layers,
        x: 82,
        y: 24,
        curveControlX: 68,
        curveControlY: 32,
      },
      {
        id: 'io-uring',
        label: 'Linux io_uring Socket',
        category: 'Kernel Networking',
        metric: 'Zero-Copy Syscalls',
        detail: 'Direct kernel ring buffer submission for non-blocking network socket polling across 100k concurrent TCP connections.',
        proofUrl: 'https://github.com/marcusvance',
        icon: Terminal,
        x: 16,
        y: 74,
        curveControlX: 30,
        curveControlY: 62,
      },
      {
        id: 'wal-compaction',
        label: 'LSM Tree Compactor',
        category: 'Storage Engines',
        metric: 'Leveled Compaction',
        detail: 'Custom write-ahead LSM tree engine in Rust with Bloom filters and concurrent background SSTable flushes.',
        proofUrl: 'https://github.com/marcusvance',
        icon: Database,
        x: 82,
        y: 74,
        curveControlX: 68,
        curveControlY: 62,
      },
      {
        id: 'chaos-testing',
        label: 'Jepsen Chaos Test Suite',
        category: 'Verification Suite',
        metric: 'Linearizability Proof',
        detail: 'Knossos linearizability model verification validating serializable isolation under simulated network partitions.',
        proofUrl: 'https://github.com/marcusvance',
        icon: ShieldCheck,
        x: 50,
        y: 88,
        curveControlX: 50,
        curveControlY: 68,
      },
    ],
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    shortName: 'Elena R.',
    role: 'Principal Low-Latency AI Engineer',
    fitScore: 91,
    nodes: [
      {
        id: 'triton-speculative',
        label: 'PagedAttention Triton',
        category: 'CUDA / Triton Kernels',
        metric: '-38% TTFT on 70B',
        detail: 'Custom Triton kernels for speculative decoding that slashed time-to-first-token by 38% across 70B parameter models.',
        proofUrl: 'https://github.com/erostova-ai/speculative-kernels',
        icon: Cpu,
        x: 18,
        y: 26,
        curveControlX: 30,
        curveControlY: 34,
      },
      {
        id: 'kv-cache',
        label: 'Quantized KV Cache',
        category: 'Memory Optimization',
        metric: 'FP8 Attention Tensors',
        detail: 'Implemented FP8 attention cache compression saving 52% GPU VRAM with negligible perplexity degradation.',
        proofUrl: 'https://github.com/erostova-ai',
        icon: Layers,
        x: 82,
        y: 24,
        curveControlX: 68,
        curveControlY: 32,
      },
      {
        id: 'cuda-graphs',
        label: 'CUDA Graph Dispatcher',
        category: 'Kernel Dispatch',
        metric: 'Zero CPU Kernel Launch Lag',
        detail: 'Captured static computational execution graphs into pre-recorded GPU sequences to eliminate CPU-to-GPU launch latency.',
        proofUrl: 'https://github.com/erostova-ai',
        icon: Zap,
        x: 16,
        y: 74,
        curveControlX: 30,
        curveControlY: 62,
      },
      {
        id: 'continuous-batching',
        label: 'Continuous Batch Scheduler',
        category: 'Throughput Architecture',
        metric: '4.2x Token Throughput',
        detail: 'Dynamic iteration-level batching with preemption handling 3,800 concurrent token streams per 8x H100 node.',
        proofUrl: 'https://github.com/erostova-ai',
        icon: Activity,
        x: 82,
        y: 74,
        curveControlX: 68,
        curveControlY: 62,
      },
      {
        id: 'groq-dispatch',
        label: 'LPU Model Decomposition',
        category: 'Hardware Calibration',
        metric: '<480ms Deterministic',
        detail: 'Deterministic tensor decomposition mapped to Groq LPUs for predictable ultra-low-latency response generation.',
        proofUrl: 'https://groq.com',
        icon: Terminal,
        x: 50,
        y: 88,
        curveControlX: 50,
        curveControlY: 68,
      },
    ],
  },
];

export const InteractiveEvidenceCanvas: React.FC = () => {
  const [selectedProfileIdx, setSelectedProfileIdx] = useState(0);
  const [activeNodeId, setActiveNodeId] = useState<string>('agronova');

  const currentProfile = showcaseProfiles[selectedProfileIdx];
  const activeNode = 
    currentProfile.nodes.find((n) => n.id === activeNodeId) || currentProfile.nodes[0];

  const handleSelectProfile = (idx: number) => {
    setSelectedProfileIdx(idx);
    setActiveNodeId(showcaseProfiles[idx].nodes[0].id);
  };

  return (
    <div className="relative w-full rounded-2xl bg-zinc-950 text-white p-5 sm:p-7 overflow-hidden shadow-2xl border border-zinc-800/80">
      {/* Subtle Dot Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 [background-size:24px_24px] [background-image:radial-gradient(#52525b_1px,transparent_1px)]"
      />

      {/* Dynamic Ambient Glow Behind Active Node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[320px] bg-gradient-to-tr from-sky-600/10 via-blue-600/10 to-teal-500/10 blur-[90px] rounded-full pointer-events-none" />

      {/* Top Header: Candidate Switcher & Mesh Telemetry */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3.5 mb-4">
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">
            Live Evidence Mesh
          </span>
        </div>

        {/* Candidate Profile Switcher Pills */}
        <div className="flex p-0.5 rounded-lg bg-zinc-900 border border-zinc-800 self-start sm:self-auto">
          {showcaseProfiles.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => handleSelectProfile(idx)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                selectedProfileIdx === idx
                  ? 'bg-zinc-800 text-white shadow-2xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span>{p.shortName}</span>
              <span className="ml-1.5 font-mono text-[10px] text-sky-400 font-bold">
                {p.fitScore}%
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Canvas Surface */}
      <div className="relative z-10 h-[380px] sm:h-[410px] w-full flex items-center justify-center">
        {/* SVG Curved Bezier Lines with Flowing Data Pulses */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="lineGradInactive" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#52525b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#27272a" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {currentProfile.nodes.map((node) => {
            const isActive = node.id === activeNode.id;
            const pathD = `M 50 46 Q ${node.curveControlX} ${node.curveControlY} ${node.x} ${node.y}`;
            return (
              <g key={`path-group-${node.id}`}>
                {/* Bezier Connecting Curve */}
                <path
                  id={`path-${node.id}`}
                  d={pathD}
                  fill="none"
                  stroke={isActive ? 'url(#lineGradActive)' : 'url(#lineGradInactive)'}
                  strokeWidth={isActive ? 0.7 : 0.35}
                  strokeDasharray={isActive ? '1.5 0.8' : '0.8 1.2'}
                  className="transition-all duration-300"
                />

                {/* Animated Data Packet Pulse Moving Along Path */}
                {isActive && (
                  <circle r="0.8" fill="#38bdf8" filter="drop-shadow(0 0 2px #38bdf8)">
                    <animateMotion
                      dur="2.5s"
                      repeatCount="indefinite"
                      path={pathD}
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* Central Core Evaluation Node (Preserving the Favored Font Styling with Concentric Orbital Rings) */}
        <div className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          {/* Outer Dashed Orbital Ring 1 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-dashed border-sky-500/25 animate-[spin_30s_linear_infinite] pointer-events-none" />

          {/* Inner Orbital Ring 2 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-26 sm:h-26 rounded-full border border-zinc-800/80 pointer-events-none" />

          {/* Core Sphere */}
          <div className="relative p-1 rounded-full bg-gradient-to-tr from-blue-600 via-sky-400 to-emerald-400 shadow-[0_0_35px_rgba(56,189,248,0.4)]">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-zinc-950 flex flex-col items-center justify-center text-center border border-zinc-700/80 shadow-inner">
              <span className="text-2xs font-mono text-zinc-400 uppercase tracking-widest leading-none">
                FIT
              </span>
              <span className="text-base sm:text-lg font-extrabold text-white font-mono mt-0.5 leading-tight">
                {currentProfile.fitScore}%
              </span>
            </div>
          </div>

          {/* Candidate Identifier Pill with Verified Shield */}
          <div className="mt-2.5 flex items-center space-x-1.5 text-2xs font-mono font-bold text-zinc-200 bg-zinc-900/95 px-2.5 py-1 rounded-full border border-zinc-800 shadow-sm">
            <ShieldCheck className="w-3 h-3 text-sky-400" />
            <span>{currentProfile.name}</span>
          </div>
        </div>

        {/* Satellite Nodes with Icons & Direct Metric Visibility */}
        {currentProfile.nodes.map((node) => {
          const isActive = node.id === activeNode.id;
          const Icon = node.icon;
          return (
            <div
              key={node.id}
              onClick={() => setActiveNodeId(node.id)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className={`absolute z-20 cursor-pointer transition-all duration-200 ${
                isActive ? 'scale-105 z-30' : 'hover:scale-102 opacity-85 hover:opacity-100'
              }`}
            >
              <div 
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border backdrop-blur-md transition-all ${
                  isActive
                    ? 'bg-zinc-900 text-white border-sky-400 shadow-[0_0_24px_rgba(56,189,248,0.3)] ring-1 ring-sky-400/40'
                    : 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-zinc-700 shadow-sm'
                }`}
              >
                <div 
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-sky-500/20 text-sky-300' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                </div>

                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-semibold tracking-tight whitespace-nowrap">
                    {node.label}
                  </span>
                  <span className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-sky-400/15 text-sky-300' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {node.metric.split('•')[0].trim()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Micro-Inspector Dossier (High Readability, Zero Cramp) */}
      <div className="relative z-10 mt-2 bg-zinc-900/90 border border-zinc-800 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-start sm:items-center space-x-3 min-w-0">
          <div className="h-8 w-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sky-400 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-white tracking-tight font-display">
                {activeNode.label}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-sky-300 border border-zinc-700">
                {activeNode.metric}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-750">
                {activeNode.category}
              </span>
            </div>
            <p className="text-xs text-zinc-300 mt-1 line-clamp-2 sm:line-clamp-1 font-body leading-relaxed">
              {activeNode.detail}
            </p>
          </div>
        </div>

        <a
          href={activeNode.proofUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-zinc-700 transition-colors shrink-0"
        >
          <span>View GitHub Artifact</span>
          <ExternalLink className="w-3 h-3 text-zinc-400" />
        </a>
      </div>
    </div>
  );
};
