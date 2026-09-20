import React from 'react';
import { 
  Sparkles, 
  LayoutDashboard, 
  Search, 
  FileText, 
  Kanban, 
  Sliders, 
  Play, 
  CheckCircle2, 
  Clock, 
  RefreshCw,
  ShieldCheck,
  Bot
} from 'lucide-react';

import { UserProfileAccount } from '../types';

interface NavbarProps {
  activeTab: 'dashboard' | 'jobs' | 'resume' | 'tracker' | 'settings';
  onSelectTab: (tab: 'dashboard' | 'jobs' | 'resume' | 'tracker' | 'settings') => void;
  candidateName: string;
  targetRole: string;
  appliedCount: number;
  userAccount?: UserProfileAccount;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  candidateName,
  targetRole,
  appliedCount,
  userAccount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo & Agent Status */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/25">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <Bot className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white">
                  Ankit Job Hunter <span className="text-cyan-400">AI</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  8 Agents Active
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Chief Manager – Operations • ICICI Lombard • ₹14 LPA+ Verified
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 rounded-xl border border-slate-800 bg-slate-900/60 p-1">
            <button
              id="nav-tab-dashboard"
              onClick={() => onSelectTab('dashboard')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              Agent Hub
            </button>

            <button
              id="nav-tab-jobs"
              onClick={() => onSelectTab('jobs')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'jobs'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Search className="h-3.5 w-3.5" />
              Verified Feed
            </button>

            <button
              id="nav-tab-resume"
              onClick={() => onSelectTab('resume')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'resume'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              Master Profile
            </button>

            <button
              id="nav-tab-tracker"
              onClick={() => onSelectTab('tracker')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'tracker'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Kanban className="h-3.5 w-3.5" />
              Tracker
              {appliedCount > 0 && (
                <span className="ml-1 rounded-full bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 text-[10px] font-semibold">
                  {appliedCount}
                </span>
              )}
            </button>

            <button
              id="nav-tab-settings"
              onClick={() => onSelectTab('settings')}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
              title="Agent Rules & Settings"
            >
              <Sliders className="h-3.5 w-3.5" />
            </button>
          </nav>

          {/* Candidate Profile Pill with Gmail Login */}
          <button
            onClick={() => onSelectTab('settings')}
            className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 p-1.5 hover:border-slate-700 transition-all text-left group"
            title="Manage Gmail ID Login and Policies"
          >
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                {candidateName}
              </span>
              <span className="text-[10px] text-cyan-400 font-mono truncate max-w-[150px]">
                {userAccount?.email || 'Gmail Synced'}
              </span>
            </div>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/40 flex items-center justify-center text-xs font-extrabold text-cyan-300 shadow">
              {candidateName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'AS'}
            </div>
          </button>

        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-around border-t border-slate-800/60 py-2 text-xs">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`flex flex-col items-center gap-0.5 ${activeTab === 'dashboard' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Hub</span>
          </button>
          <button
            onClick={() => onSelectTab('jobs')}
            className={`flex flex-col items-center gap-0.5 ${activeTab === 'jobs' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
          >
            <Search className="h-4 w-4" />
            <span>Feed</span>
          </button>
          <button
            onClick={() => onSelectTab('resume')}
            className={`flex flex-col items-center gap-0.5 ${activeTab === 'resume' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
          >
            <FileText className="h-4 w-4" />
            <span>Profile</span>
          </button>
          <button
            onClick={() => onSelectTab('tracker')}
            className={`flex flex-col items-center gap-0.5 ${activeTab === 'tracker' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
          >
            <Kanban className="h-4 w-4" />
            <span>Tracker ({appliedCount})</span>
          </button>
          <button
            onClick={() => onSelectTab('settings')}
            className={`flex flex-col items-center gap-0.5 ${activeTab === 'settings' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
          >
            <Sliders className="h-4 w-4" />
            <span>Rules</span>
          </button>
        </div>
      </div>
    </header>
  );
};
