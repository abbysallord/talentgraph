'use client';

import React from 'react';
import { 
  Briefcase, 
  Network, 
  Scale, 
  HelpCircle, 
  CheckCircle2, 
  Database,
  Cpu
} from 'lucide-react';
import { Requisition } from '@/lib/types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  requisitions: Requisition[];
  selectedRequisition: Requisition;
  setSelectedRequisition: (req: Requisition) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  requisitions,
  selectedRequisition,
  setSelectedRequisition,
}) => {
  const navItems = [
    { id: 'intake', label: '1. Requisition Intake', icon: Briefcase },
    { id: 'evidence', label: '2. Evidence Graph', icon: Network },
    { id: 'scoring', label: '3. Reasoning Scorer', icon: Scale },
    { id: 'screening', label: '4. Adaptive Screening', icon: HelpCircle },
    { id: 'synthesis', label: '5. Recruiter Console', icon: CheckCircle2 },
    { id: 'memory', label: '6. Talent Memory', icon: Database },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Subtitle */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Cpu className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight text-white">TalentGraph</span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  MINT FDE Prototype #1
                </span>
              </div>
              <p className="text-xs text-slate-400">AI-Native Recruiting Engine & Candidate Evidence Graph</p>
            </div>
          </div>

          {/* Active Requisition Dropdown */}
          <div className="flex items-center space-x-3">
            <label className="text-xs font-medium text-slate-400">Active Role:</label>
            <select
              value={selectedRequisition.id}
              onChange={(e) => {
                const found = requisitions.find((r) => r.id === e.target.value);
                if (found) setSelectedRequisition(found);
              }}
              className="bg-slate-900 border border-slate-700 text-xs rounded-lg px-3 py-1.5 text-slate-200 focus:ring-1 focus:ring-emerald-500 outline-none max-w-xs truncate"
            >
              {requisitions.map((req) => (
                <option key={req.id} value={req.id}>
                  {req.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-900">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
