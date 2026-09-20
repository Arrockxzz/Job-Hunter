import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Save, 
  Check, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  DollarSign, 
  Key, 
  Bot, 
  AlertCircle,
  Bell,
  RefreshCw
} from 'lucide-react';
import { CandidatePreferences } from '../types';

interface SettingsViewProps {
  preferences: CandidatePreferences;
  onUpdatePreferences: (prefs: CandidatePreferences) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  preferences,
  onUpdatePreferences,
}) => {
  const [form, setForm] = useState<CandidatePreferences>(preferences);
  const [saved, setSaved] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePreferences(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddTitle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    if (form.targetTitles.includes(newTitle.trim())) return;
    setForm({
      ...form,
      targetTitles: [...form.targetTitles, newTitle.trim()]
    });
    setNewTitle('');
  };

  const handleRemoveTitle = (title: string) => {
    setForm({
      ...form,
      targetTitles: form.targetTitles.filter(t => t !== title)
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <SettingsIcon className="h-6 w-6 text-indigo-400" />
              Agent Configuration & Decision Policies
            </h1>
            <span className="rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs px-2.5 py-0.5 font-semibold">
              Ankit Sharma Automation
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fine-tune CTC minimums, notification schedules, matching thresholds, and target domains.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow transition-all active:scale-95"
        >
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? 'Rules Saved' : 'Save Policies'}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Salary & Match Thresholds */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-emerald-400" />
            Compensation & Match Threshold Rules
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300">
                Minimum CTC Floor (₹ Lakhs Per Annum)
              </label>
              <div className="relative mt-1">
                <input
                  type="number"
                  min={10}
                  max={50}
                  value={form.minCtcLakhs}
                  onChange={(e) => setForm({ ...form, minCtcLakhs: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                />
                <span className="absolute right-3 top-2.5 text-xs font-semibold text-emerald-400">LPA</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Roles below ₹{form.minCtcLakhs} LPA will be automatically excluded by the Verification Agent.
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">
                Notice Period Handshake
              </label>
              <input
                type="text"
                value={form.noticePeriodDays ? `${form.noticePeriodDays} Days` : '90 Days'}
                disabled
                className="w-full mt-1 rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-slate-400"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Embedded directly into cover letters and portal application forms.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-800">
            <div>
              <label className="text-xs font-semibold text-slate-300">
                Auto-Apply Threshold (Default: ≥ 80%)
              </label>
              <div className="flex items-center gap-3 mt-1">
                <input
                  type="range"
                  min={70}
                  max={95}
                  value={form.minMatchScoreToAutoApply}
                  onChange={(e) => setForm({ ...form, minMatchScoreToAutoApply: Number(e.target.value) })}
                  className="flex-1 accent-indigo-500"
                />
                <span className="text-xs font-bold text-cyan-300 font-mono w-10">
                  {form.minMatchScoreToAutoApply}%
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">
                Review Required Floor (Default: 40%)
              </label>
              <div className="flex items-center gap-3 mt-1">
                <input
                  type="range"
                  min={20}
                  max={60}
                  value={form.reviewThresholdMin}
                  onChange={(e) => setForm({ ...form, reviewThresholdMin: Number(e.target.value) })}
                  className="flex-1 accent-amber-500"
                />
                <span className="text-xs font-bold text-amber-300 font-mono w-10">
                  {form.reviewThresholdMin}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scheduled Briefing Hours */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="h-4 w-4 text-cyan-400" />
            Scheduled Agent Execution & Notification Timers
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
              <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                <Bell className="h-3.5 w-3.5" /> Morning Briefing Slot
              </span>
              <div className="text-sm font-bold text-white">09:30 AM IST</div>
              <p className="text-[11px] text-slate-400">
                Executes morning crawl across LinkedIn, Naukri, and insurance portals.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
              <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                <Bell className="h-3.5 w-3.5" /> Evening Briefing Slot
              </span>
              <div className="text-sm font-bold text-white">09:30 PM IST</div>
              <p className="text-[11px] text-slate-400">
                Daily application reconciliation, submission proofs audit, and tracker updates.
              </p>
            </div>
          </div>
        </div>

        {/* Target Titles */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Bot className="h-4 w-4 text-indigo-400" />
            Target Operational Roles for Discovery
          </h3>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add target role (e.g. Cluster Operations Manager)..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
            />
            <button
              onClick={handleAddTitle}
              className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-semibold text-white"
            >
              Add Role
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {form.targetTitles.map((t) => (
              <span
                key={t}
                className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200"
              >
                {t}
                <button
                  type="button"
                  onClick={() => handleRemoveTitle(t)}
                  className="text-slate-500 hover:text-red-400 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

      </form>

    </div>
  );
};
