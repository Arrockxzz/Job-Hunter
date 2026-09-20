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
  ArrowRight,
  ExternalLink,
  Sparkles,
  Sliders,
  Check,
  TrendingUp,
  MapPin,
  Building,
  AlertCircle,
  Copy,
  Share2,
  FileCheck2
} from 'lucide-react';
import { JobPosting, ApplicationActivity, DailyStats, MasterResume, NotificationRecord } from '../types';
import { AgentWorkflowBar } from './AgentWorkflowBar';
import { formatShareableReferenceText } from '../utils/referenceExport';
import { DirectLinkMenu } from './DirectLinkMenu';

interface DashboardViewProps {
  stats: DailyStats;
  recentJobs: JobPosting[];
  activities: ApplicationActivity[];
  masterResume: MasterResume;
  notifications: NotificationRecord[];
  onSelectJobForReview: (job: JobPosting) => void;
  onNavigateTab: (tab: 'dashboard' | 'jobs' | 'resume' | 'tracker' | 'settings') => void;
  onTriggerDailyScan: () => void;
  isScanning: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  recentJobs,
  activities,
  masterResume,
  notifications,
  onSelectJobForReview,
  onNavigateTab,
  onTriggerDailyScan,
  isScanning,
}) => {
  const [copiedJobId, setCopiedJobId] = useState<string | null>(null);
  const [sharedJobId, setSharedJobId] = useState<string | null>(null);

  const handleCopyRef = (job: JobPosting, e: React.MouseEvent) => {
    e.stopPropagation();
    if (job.confirmationId) {
      navigator.clipboard.writeText(job.confirmationId);
      setCopiedJobId(job.id);
      setTimeout(() => setCopiedJobId(null), 2000);
    }
  };

  const handleShareRef = (job: JobPosting, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = formatShareableReferenceText(job);
    navigator.clipboard.writeText(text);
    setSharedJobId(job.id);
    setTimeout(() => setSharedJobId(null), 2500);
  };

  const highFitJobs = recentJobs.filter(
    (job) => (job.matchScore || 0) >= 80 || job.status === 'applied'
  ).slice(0, 5);

  const activeNotification = notifications[0];

  return (
    <div className="space-y-6">
      
      {/* Top Hero Banner - Autonomous Status & Quick Trigger */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-900 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Autonomous Multi-Platform Job Hunter Active • ₹14 LPA+ Verified
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Ankit Sharma's Autonomous Career Agent
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Targeting <span className="text-cyan-300 font-semibold">Chief Manager / Senior Manager / AVP Operations & CX</span> across 
              General Insurance, Banking & Telecom in <span className="text-emerald-300 font-semibold">Hyderabad & Remote</span>.
              Zero-fabrication tailoring grounded in 10+ years at ICICI Lombard.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3">
            <button
              id="dash-btn-run-pipeline"
              onClick={onTriggerDailyScan}
              disabled={isScanning}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg transition-all active:scale-95 disabled:opacity-60"
            >
              <Sparkles className={`h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} />
              {isScanning ? '8 Autonomous Agents Working...' : 'Run Autonomous Pipeline Now'}
            </button>
            <button
              id="dash-btn-view-pipeline"
              onClick={() => onNavigateTab('tracker')}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-all"
            >
              <Kanban className="h-4 w-4 text-emerald-400" />
              View Application Tracker ({stats.autoAppliedToday})
            </button>
          </div>
        </div>
      </div>

      {/* 8 Autonomous Agents Interactive Workflow Grid */}
      <AgentWorkflowBar 
        stats={stats} 
        isScanning={isScanning} 
        onTriggerDailyScan={onTriggerDailyScan}
        activities={activities}
      />

      {/* Daily Metrics Dashboard KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Scouted Today</div>
          <div className="text-2xl font-bold text-white mt-1">{stats.jobsSearchedToday}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Across 7 Platforms</div>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-slate-900/60 p-4">
          <div className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Verified Authenticated</div>
          <div className="text-2xl font-bold text-emerald-300 mt-1">{stats.verifiedJobsToday}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Direct Career URLs</div>
        </div>

        <div className="rounded-xl border border-indigo-500/20 bg-slate-900/60 p-4">
          <div className="text-xs font-medium text-indigo-400 uppercase tracking-wider">≥ 80% Fit (Auto-Apply)</div>
          <div className="text-2xl font-bold text-indigo-300 mt-1">{stats.highMatchJobsToday}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Top-Tier Matches</div>
        </div>

        <div className="rounded-xl border border-purple-500/20 bg-slate-900/60 p-4">
          <div className="text-xs font-medium text-purple-400 uppercase tracking-wider">Resumes Tailored</div>
          <div className="text-2xl font-bold text-purple-300 mt-1">{stats.tailoredToday}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Zero Fabrication</div>
        </div>

        <div className="rounded-xl border border-cyan-500/20 bg-slate-900/60 p-4">
          <div className="text-xs font-medium text-cyan-400 uppercase tracking-wider">Confirmed Submitted</div>
          <div className="text-2xl font-bold text-cyan-300 mt-1">{stats.autoAppliedToday}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Proof IDs Logged</div>
        </div>

        <div className="rounded-xl border border-amber-500/20 bg-slate-900/60 p-4">
          <div className="text-xs font-medium text-amber-400 uppercase tracking-wider">Review Needed (40-79%)</div>
          <div className="text-2xl font-bold text-amber-300 mt-1">{stats.pendingReviewToday}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Ankit Decision Queue</div>
        </div>
      </div>

      {/* Main 2-Column Split: High Fit Opportunities & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: High-Fit Jobs (≥80% & Applied) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                Priority Matches for Ankit Sharma (≥80% Fit & Auto-Applied)
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab('jobs')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              View Full Feed <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {highFitJobs.map((job) => {
              const isApplied = job.status === 'applied';

              return (
                <div
                  key={job.id}
                  className={`group rounded-2xl border p-5 backdrop-blur-sm transition-all shadow-sm ${
                    isApplied 
                      ? 'border-emerald-500/40 bg-gradient-to-r from-slate-900 to-emerald-950/20' 
                      : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {isApplied ? (
                          <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Status: Applied
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                            {job.domain}
                          </span>
                        )}

                        <span className="text-xs text-slate-400">• {job.platform}</span>
                        <span className="text-xs text-slate-500">• {job.postedDate}</span>
                        {job.salaryMinLakhs && (
                          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            {job.salaryRange}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {job.title}
                      </h3>

                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <Building className="h-3.5 w-3.5 text-slate-400" />
                        <span className="font-semibold text-white">{job.company}</span>
                        <span>•</span>
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span>{job.location}</span>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {job.description}
                      </p>

                      {/* Verification & Match Pill */}
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <ShieldCheck className="h-3 w-3" /> Verified Link
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                          ATS Match: {job.matchScore}% ({job.candidateRanking})
                        </span>
                      </div>

                      {/* Application Reference Number Box if Applied */}
                      {isApplied && job.confirmationId && (
                        <div className="mt-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 p-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-300 font-medium text-[11px]">Application Ref #:</span>
                            <span className="font-mono font-bold text-emerald-300 bg-emerald-900/50 border border-emerald-500/30 px-2 py-0.5 rounded text-xs">
                              {job.confirmationId}
                            </span>
                            <button
                              onClick={(e) => handleCopyRef(job, e)}
                              className="text-emerald-400 hover:text-emerald-300 text-[11px] flex items-center gap-0.5 font-semibold"
                            >
                              {copiedJobId === job.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                              {copiedJobId === job.id ? 'Copied' : 'Copy'}
                            </button>
                          </div>

                          <button
                            onClick={(e) => handleShareRef(job, e)}
                            className="text-indigo-300 hover:text-white bg-indigo-950/50 border border-indigo-500/30 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1"
                          >
                            <Share2 className="h-3 w-3" />
                            {sharedJobId === job.id ? 'Slip Copied!' : 'Share Ref'}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 pt-2 sm:pt-0">
                      <DirectLinkMenu job={job} size="sm" />

                      <button
                        onClick={() => onSelectJobForReview(job)}
                        className={`flex items-center gap-1 rounded-xl px-3.5 py-1.5 text-xs font-semibold text-white shadow transition-all ${
                          isApplied ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-500'
                        }`}
                      >
                        <FileCheck2 className="h-3.5 w-3.5" />
                        {isApplied ? 'Modified Resume & Ref' : 'Inspect & Tailor'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Scheduled Notifications & Live Agent Activity Log */}
        <div className="space-y-6">
          
          {/* 09:30 AM / PM Notification Digest Box */}
          <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 to-cyan-950/30 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <Bell className="h-4 w-4" /> Scheduled Briefing
              </span>
              <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 border border-cyan-500/20">
                {activeNotification ? activeNotification.scheduledSlot : '09:30 AM IST'}
              </span>
            </div>

            <h3 className="text-sm font-bold text-white mb-1.5">
              Daily Executive Job Hunter Summary
            </h3>
            
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {activeNotification ? activeNotification.summaryText : 
                `Today's automated scan scouted verified roles for Ankit Sharma matching ₹14 LPA+ and Hyderabad / Remote requirements with direct application links.`}
            </p>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 space-y-2 mb-3">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Top Verified Openings:</div>
              {(activeNotification ? activeNotification.topOpportunities : highFitJobs.slice(0, 3)).map((top, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-900 last:border-none">
                  <div className="truncate mr-2">
                    <span className="font-bold text-white">{top.title}</span>
                    <span className="text-slate-500 text-[11px]"> • {top.company}</span>
                  </div>
                  <a
                    href={top.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 shrink-0 font-semibold text-[11px]"
                  >
                    Direct <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Next Run: Today at 09:30 PM IST</span>
              <button 
                onClick={() => onNavigateTab('settings')}
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                Schedule Settings
              </button>
            </div>
          </div>

          {/* Real-time Agent Execution Log */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Clock className="h-4 w-4 text-indigo-400" />
                Live Agent Execution Feed
              </span>
              <span className="text-[10px] text-slate-500">Autonomous</span>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {activities.length === 0 ? (
                <div className="text-xs text-slate-500 text-center py-6">No recent agent actions</div>
              ) : (
                activities.slice(0, 8).map((act) => (
                  <div key={act.id} className="text-xs border-l-2 border-indigo-500/40 pl-3 py-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">{act.agent}</span>
                      <span className="text-[10px] text-slate-500">{act.timestamp}</span>
                    </div>
                    <div className="text-[11px] text-cyan-400 font-medium">
                      {act.company ? `${act.company} — ${act.jobTitle}` : act.jobTitle}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {act.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
