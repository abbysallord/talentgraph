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
  ChevronDown
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
      <header className="border-b border-zinc-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-40 text-zinc-900 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Brand Logo & Core Product Title */}
            <div className="flex items-center space-x-3">
              <div 
                onClick={() => setActiveTab('intake')}
                className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center text-white shadow-sm cursor-pointer hover:bg-zinc-800 transition-colors"
              >
                <Network className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span 
                    onClick={() => setActiveTab('intake')}
                    className="font-bold text-xl tracking-tight text-zinc-950 font-display cursor-pointer"
                  >
                    TalentGraph
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200">
                    Console
                  </span>
                </div>
              </div>
            </div>

            {/* Center Navigation Switcher */}
            <div className="hidden md:flex items-center p-1 rounded-xl bg-zinc-100 border border-zinc-200">
              <button
                onClick={() => setActiveTab('intake')}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab !== 'cockpit'
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Hiring Pipeline</span>
              </button>
              <button
                onClick={() => setActiveTab('cockpit')}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'cockpit'
                    ? 'bg-white text-zinc-950 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Analytics Cockpit</span>
              </button>
            </div>

            {/* Right Quick Actions */}
            <div className="flex items-center space-x-3">
              {/* Active Requisition Switcher */}
              {/* Active Requisition Switcher */}
              <div className="hidden xl:flex items-center space-x-2 bg-zinc-50 border border-zinc-200 rounded-full px-3 py-1.5 text-xs">
                <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                <select
                  value={selectedRequisition?.id}
                  onChange={(e) => {
                    const found = requisitions.find((r) => r.id === e.target.value);
                    if (found) setSelectedRequisition(found);
                  }}
                  className="bg-transparent text-zinc-900 font-semibold text-xs focus:outline-none cursor-pointer max-w-[200px] truncate"
                >
                  {requisitions.map((req) => (
                    <option key={req.id} value={req.id} className="bg-white text-zinc-900">
                      {req.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* 1-Click Interactive Demo Button */}
              <button
                onClick={onRunDemoWalkthrough}
                disabled={isDemoRunning}
                className="bg-zinc-950 hover:bg-zinc-800 text-white font-semibold px-3.5 py-1.5 rounded-full text-xs flex items-center space-x-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isDemoRunning ? 'Running...' : '1-Click AI Demo'}</span>
              </button>

              {/* Auth / Profile Area */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 transition-colors text-xs font-semibold text-zinc-800"
                  >
                    <div className="w-5 h-5 rounded-full bg-zinc-200 text-zinc-800 flex items-center justify-center font-bold text-2xs">
                      {currentUser.name.charAt(0)}
                    </div>
                    <span className="max-w-[100px] truncate">{currentUser.name}</span>
                    <ChevronDown className="w-3 h-3 text-zinc-400" />
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-zinc-200 shadow-xl p-2 z-50 animate-in fade-in duration-150">
                      <div className="p-2 border-b border-zinc-100 mb-1">
                        <div className="text-xs font-bold text-zinc-900">{currentUser.name}</div>
                        <div className="text-2xs text-zinc-500 font-mono truncate">{currentUser.email}</div>
                        <div className="inline-block mt-1 text-[10px] uppercase font-bold text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded">
                          {currentUser.role}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab('cockpit');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 rounded-lg flex items-center space-x-2 transition-colors"
                      >
                        <Activity className="w-3.5 h-3.5 text-zinc-600" />
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
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-xs font-semibold text-zinc-700 transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5 text-zinc-600" />
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
