'use client';

import React, { useState } from 'react';
import { 
  Network, 
  Briefcase, 
  Play, 
  UserCheck, 
  LogOut, 
  Activity, 
  Layers,
  ChevronDown,
  Shield
} from 'lucide-react';
import { Requisition } from '@/lib/types';
import { AuthModal } from './AuthModal';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  requisitions: Requisition[];
  selectedRequisition: Requisition;
  setSelectedRequisition: (req: Requisition) => void;
  onRunDemoWalkthrough: () => void;
  isDemoRunning?: boolean;
  currentUser: any;
  setCurrentUser: (user: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  requisitions,
  selectedRequisition,
  setSelectedRequisition,
  onRunDemoWalkthrough,
  isDemoRunning = false,
  currentUser,
  setCurrentUser,
}) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setCurrentUser(null);
      setIsProfileDropdownOpen(false);
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  return (
    <>
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 text-slate-900 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Core Product Title */}
            <div className="flex items-center space-x-3.5">
              <div 
                onClick={() => setActiveTab('intake')}
                className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 cursor-pointer hover:bg-indigo-700 transition-colors"
              >
                <Network className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center space-x-2.5">
                  <span 
                    onClick={() => setActiveTab('intake')}
                    className="font-extrabold text-2xl tracking-tight text-slate-900 font-display cursor-pointer"
                  >
                    TalentGraph
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Enterprise AI
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Evidence-Driven Technical Recruiting Platform
                </p>
              </div>
            </div>

            {/* Center Navigation Switcher */}
            <div className="hidden md:flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                onClick={() => setActiveTab('intake')}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab !== 'cockpit'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Hiring Pipeline</span>
              </button>
              <button
                onClick={() => setActiveTab('cockpit')}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'cockpit'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Analytics Cockpit</span>
              </button>
            </div>

            {/* Right Quick Actions */}
            <div className="flex items-center space-x-3">
              {/* Active Requisition Switcher */}
              <div className="hidden xl:flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                <div className="text-xs">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider leading-none">
                    Target Role:
                  </span>
                  <select
                    value={selectedRequisition?.id}
                    onChange={(e) => {
                      const found = requisitions.find((r) => r.id === e.target.value);
                      if (found) setSelectedRequisition(found);
                    }}
                    className="bg-transparent text-slate-900 font-semibold text-xs focus:outline-none cursor-pointer max-w-[170px] truncate"
                  >
                    {requisitions.map((req) => (
                      <option key={req.id} value={req.id} className="bg-white text-slate-900">
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
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-2 shadow-md shadow-indigo-600/15 transition-all cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isDemoRunning ? 'Running Walkthrough...' : '1-Click AI Demo'}</span>
              </button>

              {/* Auth / Profile Area */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-xs font-semibold text-slate-800"
                  >
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-2xs">
                      {currentUser.name.charAt(0)}
                    </div>
                    <span className="max-w-[100px] truncate">{currentUser.name}</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in duration-150">
                      <div className="p-2 border-b border-slate-100 mb-1">
                        <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                        <div className="text-2xs text-slate-500 font-mono truncate">{currentUser.email}</div>
                        <div className="inline-block mt-1 text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                          {currentUser.role}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab('cockpit');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center space-x-2 transition-colors"
                      >
                        <Activity className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Recruiter Cockpit</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg flex items-center space-x-2 transition-colors mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(user) => setCurrentUser(user)}
      />
    </>
  );
};
