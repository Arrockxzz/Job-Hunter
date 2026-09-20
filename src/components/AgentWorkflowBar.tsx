import React, { useState } from 'react';
import { 
  Bot, 
  Search, 
  ShieldCheck, 
  FileCode, 
  Calculator, 
  FileText, 
  Send, 
  Kanban, 
  Bell, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Sliders,
  AlertTriangle,
  Play
} from 'lucide-react';
import { AgentName, DailyStats, ApplicationActivity } from '../types';

interface AgentWorkflowBarProps {
  stats: DailyStats;
  isScanning: boolean;
  onTriggerDailyScan: () => void;
  activities: ApplicationActivity[];
}

interface AgentItem {
  id: number;
  name: AgentName;
  icon: any;
  role: string;
  status: 'active' | 'standby' | 'processing';
  metric: string;
  metricLabel: string;
}

export const AgentWorkflowBar: React.FC<AgentWorkflowBarProps> = ({
  stats,
  isScanning,
  onTriggerDailyScan,
  activities,
}) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentName | null>(null);

  const AGENTS: AgentItem[] = [
    {
      id: 1,
      name: 'Job Hunter Agent',
      icon: Search,
      role: 'Multi-platform crawler across LinkedIn, Naukri, Indeed, IIMJobs & Company Career Portals.',
      status: isScanning ? 'processing' : 'active',
      metric: `${stats.jobsSearchedToday}`,
      metricLabel: 'Roles Found Today'
    },
    {
      id: 2,
      name: 'Verification Agent',
      icon: ShieldCheck,
      role: 'Deduplication (Job ID, URL, JD hash), active link confirmation, and ₹14 LPA+ filter enforcement.',
      status: isScanning ? 'processing' : 'active',
      metric: `${stats.verifiedJobsToday}`,
      metricLabel: 'Verified Legitimate'
    },
    {
      id: 3,
      name: 'JD Analyzer Agent',
      icon: FileCode,
      role: 'Extracts core competencies, STP automation needs, customer experience metrics, and reporting structure.',
      status: 'active',
      metric: '100%',
      metricLabel: 'Deep JD Parsed'
    },
    {
      id: 4,
      name: 'Match Engine Agent',
      icon: Calculator,
      role: 'Applies 80%+ Auto-Apply, 40-79% Review, and <40% Ignore threshold logic against Ankit Sharma profile.',
      status: 'active',
      metric: `${stats.highMatchJobsToday}`,
      metricLabel: 'Roles >= 80% Fit'
    },
    {
      id: 5,
      name: 'Resume Agent',
      icon: FileText,
      role: 'Tailors executive headline, summary, and experience bullets using 10+ yrs ICICI Lombard experience without fabrication.',
      status: isScanning ? 'processing' : 'active',
      metric: `${stats.tailoredToday}`,
      metricLabel: 'Resumes Tailored'
    },
    {
      id: 6,
      name: 'Application Agent',
      icon: Send,
      role: 'Direct portal submission, confirmation receipt capture, tracking ID generation, and human handoff for CAPTCHA/OTP.',
      status: 'active',
      metric: `${stats.autoAppliedToday}`,
      metricLabel: 'Submitted & Proofed'
    },
    {
      id: 7,
      name: 'Tracker Agent',
      icon: Kanban,
      role: 'Maintains real-time database of application states, direct URLs, verification proofs, and follow-ups.',
      status: 'active',
      metric: `${stats.autoAppliedToday + stats.pendingReviewToday}`,
      metricLabel: 'Active Pipeline'
    },
    {
      id: 8,
      name: 'Notification Agent',
      icon: Bell,
      role: 'Automated 09:30 AM & 09:30 PM IST briefing dispatch with exact links and status summaries.',
      status: 'active',
      metric: '09:30 AM/PM',
      metricLabel: 'Scheduled Briefing'
    }
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-md shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Bot className="h-5 w-5 text-cyan-400" />
              8 Autonomous Specialized AI Agents
            </h2>
            <span className="rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 text-xs font-semibold">
              Orchestrated Pipeline
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dedicated end-to-end agentic workflow executing Ankit Sharma's job discovery, verification, tailoring, and application rules.
          </p>
        </div>

        <button
          onClick={onTriggerDailyScan}
          disabled={isScanning}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-md hover:from-indigo-500 hover:to-cyan-400 transition-all active:scale-95 disabled:opacity-75 self-start md:self-auto"
        >
          <Play className={`h-3.5 w-3.5 ${isScanning ? 'animate-spin' : ''}`} />
          {isScanning ? 'Agents Executing Live Cycle...' : 'Run Full Agent Cycle Now'}
        </button>
      </div>

      {/* Agents 8-Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {AGENTS.map((agent) => {
          const IconComponent = agent.icon;
          const isSelected = selectedAgent === agent.name;

          return (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(isSelected ? null : agent.name)}
              className={`group flex flex-col justify-between rounded-xl p-3 text-left transition-all border ${
                isSelected 
                  ? 'border-cyan-400 bg-slate-800 shadow-md ring-1 ring-cyan-400/50' 
                  : 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-300 group-hover:text-cyan-400'}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">#{agent.id}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200 line-clamp-1 group-hover:text-white">
                  {agent.name.replace(' Agent', '')}
                </h4>
                <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-tight">
                  {agent.role}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-end justify-between">
                <div>
                  <div className="text-xs font-extrabold text-cyan-300">{agent.metric}</div>
                  <div className="text-[9px] text-slate-400 uppercase tracking-tighter">{agent.metricLabel}</div>
                </div>
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400"></div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Agent Deep Dive Drawer */}
      {selectedAgent && (
        <div className="mt-4 rounded-xl border border-cyan-500/30 bg-slate-950/90 p-4 text-xs space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between text-cyan-300 font-bold">
            <span className="flex items-center gap-2">
              <Bot className="h-4 w-4" /> {selectedAgent} — Operating Rules & Policy
            </span>
            <button 
              onClick={() => setSelectedAgent(null)}
              className="text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>
          <p className="text-slate-300">
            {AGENTS.find(a => a.name === selectedAgent)?.role}
          </p>
          <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
            <span className="font-semibold text-slate-300">Active Strict Rules:</span> Never fabricate credentials • Mandatory Direct Application URL • Strict ₹14 LPA CTC Threshold • Anti-duplicate hash check across LinkedIn, Naukri, Indeed & Company Portals.
          </div>
        </div>
      )}
    </div>
  );
};
