import React from 'react';
import { Sparkles, CheckCircle2, RefreshCw, X, ShieldCheck, Send, Check } from 'lucide-react';
import { AgentExecutionStep } from '../types';

interface AutoApplyProgressModalProps {
  currentStep: number;
  totalSteps: number;
  statusMessage: string;
  subMessage: string;
  appliedCount: number;
  stepsHistory?: AgentExecutionStep[];
  onClose: () => void;
  isComplete: boolean;
}

const AGENT_PIPELINE = [
  { agent: "1. Job Hunter Agent", desc: "Crawling LinkedIn, Naukri, Indeed, IIMJobs & Direct Portals" },
  { agent: "2. Verification Agent", desc: "Checking active URLs, deduplicating IDs, and enforcing ₹14 LPA+" },
  { agent: "3. JD Analyzer Agent", desc: "Extracting STP, customer experience, and operational requirements" },
  { agent: "4. Match Engine Agent", desc: "Applying 80%+ Auto-Apply vs 40-79% Review thresholds" },
  { agent: "5. Resume Agent", desc: "Tailoring Ankit Sharma ICICI Lombard tenure without fabrication" },
  { agent: "6. Application Agent", desc: "Executing direct portal submissions and capturing proof IDs" },
  { agent: "7. Tracker Agent", desc: "Updating pipeline status and direct verification links" },
  { agent: "8. Notification Agent", desc: "Preparing 09:30 AM/PM IST scheduled briefing digest" }
];

export const AutoApplyProgressModal: React.FC<AutoApplyProgressModalProps> = ({
  currentStep,
  totalSteps,
  statusMessage,
  subMessage,
  appliedCount,
  stepsHistory = [],
  onClose,
  isComplete,
}) => {
  const percentage = Math.round((currentStep / Math.max(1, totalSteps)) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="w-full max-w-xl rounded-3xl border border-indigo-500/30 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isComplete ? '8-Agent Cycle Completed Successfully!' : 'Autonomous Agent Pipeline Executing'}
              </h3>
              <p className="text-xs text-slate-400">ANKIT JOB HUNTER AI • Live Orchestration</p>
            </div>
          </div>

          {isComplete && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-cyan-300">Phase {currentStep} of {totalSteps}</span>
            <span className="text-slate-400">{percentage}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-950 p-0.5 border border-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Active Stage Callout */}
        <div className="rounded-2xl border border-indigo-500/20 bg-slate-950/80 p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
            {isComplete ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <RefreshCw className="h-4 w-4 animate-spin text-cyan-400" />
            )}
            <span>{statusMessage}</span>
          </div>
          <p className="text-xs text-slate-400 pl-6 leading-relaxed">
            {subMessage}
          </p>
        </div>

        {/* 8-Agent Stepper List */}
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          {AGENT_PIPELINE.map((p, idx) => {
            const stepNum = idx + 1;
            const isDone = isComplete || currentStep > stepNum;
            const isCurrent = !isComplete && currentStep === stepNum;

            return (
              <div
                key={idx}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors ${
                  isCurrent
                    ? 'border border-cyan-500/30 bg-slate-800/80 text-white'
                    : isDone
                    ? 'bg-slate-950/50 text-slate-300'
                    : 'bg-slate-950/20 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    isDone ? 'bg-emerald-500/20 text-emerald-400' :
                    isCurrent ? 'bg-cyan-500/20 text-cyan-300' :
                    'bg-slate-800 text-slate-500'
                  }`}>
                    {isDone ? '✓' : stepNum}
                  </div>
                  <div>
                    <span className="font-semibold block">{p.agent}</span>
                    <span className="text-[10px] text-slate-400">{p.desc}</span>
                  </div>
                </div>

                {isCurrent && (
                  <span className="text-[10px] text-cyan-300 font-mono animate-pulse">Running...</span>
                )}
                {isDone && (
                  <span className="text-[10px] text-emerald-400 font-mono">Passed</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {isComplete ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="text-xs text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span><strong>{appliedCount}</strong> applications verified & logged in Tracker</span>
            </div>
            <button
              onClick={onClose}
              className="w-full sm:w-auto rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-all"
            >
              View Application Tracker
            </button>
          </div>
        ) : (
          <div className="text-center text-xs text-slate-500">
            Executing live checks: Never fabricating qualifications • Direct URLs required
          </div>
        )}

      </div>
    </div>
  );
};
