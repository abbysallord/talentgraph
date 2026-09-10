'use client';

import React from 'react';
import { 
  Cpu, 
  Briefcase, 
  Sparkles, 
  Play, 
  RotateCcw,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Requisition } from '@/lib/types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  requisitions: Requisition[];
  selectedRequisition: Requisition;
  setSelectedRequisition: (req: Requisition) => void;
  onRunDemoWalkthrough: () => void;
  isDemoRunning?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  requisitions,
  selectedRequisition,
  setSelectedRequisition,
  onRunDemoWalkthrough,
  isDemoRunning = false
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl sticky top-0 z-50 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 flex items-center justify-center shadow-xl shadow-emerald-500/20">
              <Cpu className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  TalentGraph
                </span>
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  AI Talent Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Autonomous Verification &amp; Evidence-Based Hiring
              </p>
            </div>
          </div>

          {/* Center / Right Quick Actions */}
          <div className="flex items-center space-x-4">
            {/* Active Requisition Switcher */}
            <div className="hidden lg:flex items-center space-x-2.5 bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              <div className="text-xs">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">
                  Target Requisition:
                </span>
                <select
                  value={selectedRequisition.id}
                  onChange={(e) => {
                    const found = requisitions.find((r) => r.id === e.target.value);
                    if (found) setSelectedRequisition(found);
                  }}
                  className="bg-transparent text-white font-semibold text-xs focus:outline-none cursor-pointer max-w-[200px] truncate"
                >
                  {requisitions.map((req) => (
                    <option key={req.id} value={req.id} className="bg-slate-900 text-white">
                      {req.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 1-Click Interactive Demo Button */}
            <button
              onClick={onRunDemoWalkthrough}
              disabled={isDemoRunning}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isDemoRunning ? 'Running Walkthrough...' : 'One-Click Demo Run'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
