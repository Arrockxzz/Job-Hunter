import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Save, 
  Check, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  DollarSign, 
  Bot, 
  AlertCircle,
  Bell,
  RefreshCw,
  Plus,
  Trash2,
  Sliders,
  User,
  Mail,
  LogIn,
  LogOut,
  Sparkles,
  Download,
  Upload,
  Briefcase,
  Layers,
  ChevronRight,
  Shield,
  CheckCircle2
} from 'lucide-react';
import { CandidatePreferences, UserProfileAccount, MasterResume } from '../types';
import { downloadFile } from '../utils/referenceExport';

interface SettingsViewProps {
  preferences: CandidatePreferences;
  onUpdatePreferences: (prefs: CandidatePreferences) => void;
  userAccount: UserProfileAccount;
  onUpdateUserAccount: (account: UserProfileAccount) => void;
  masterResume?: MasterResume;
  onUpdateMasterResume?: (updated: MasterResume) => void;
}

const PRESET_TEMPLATES: {
  id: string;
  name: string;
  role: string;
  expYears: number;
  domain: string;
  titles: string[];
  domains: string[];
  minCtc: number;
  notice: number;
}[] = [
  {
    id: 'ops-bfsi',
    name: 'Ankit Sharma (Operations & BFSI Leadership)',
    role: 'Chief Manager – Operations',
    expYears: 10,
    domain: 'General Insurance / BFSI',
    titles: [
      'Chief Manager – Operations',
      'Senior Manager – Operations',
      'Manager – Operations',
      'AVP – Operations',
      'Chief Manager – Customer Experience',
      'Senior Manager – Customer Experience',
      'Process Excellence Lead'
    ],
    domains: ['General Insurance', 'Insurance', 'Banking', 'Telecom'],
    minCtc: 14,
    notice: 90
  },
  {
    id: 'tech-lead',
    name: 'Senior Engineering & Tech Lead',
    role: 'Lead Full-Stack Engineer / Technical Architect',
    expYears: 8,
    domain: 'Software & Technology',
    titles: [
      'Engineering Manager',
      'Lead Full Stack Engineer',
      'Principal Software Engineer',
      'Staff Software Engineer',
      'Technical Architect'
    ],
    domains: ['Technology / SaaS', 'Fintech', 'E-Commerce'],
    minCtc: 24,
    notice: 60
  },
  {
    id: 'product-mgr',
    name: 'Product & Project Management',
    role: 'Senior Product Manager',
    expYears: 7,
    domain: 'Digital Products / Consumer Tech',
    titles: [
      'Senior Product Manager',
      'Director of Product',
      'Product Lead',
      'Head of Product'
    ],
    domains: ['Fintech', 'Insurtech', 'B2B SaaS', 'Consumer Tech'],
    minCtc: 20,
    notice: 45
  },
  {
    id: 'custom-blank',
    name: 'New Custom Candidate Profile',
    role: 'Professional / Specialist',
    expYears: 5,
    domain: 'Industry of Choice',
    titles: ['Team Lead', 'Senior Specialist', 'Manager'],
    domains: ['Operations', 'Technology', 'Consulting'],
    minCtc: 12,
    notice: 30
  }
];

export const SettingsView: React.FC<SettingsViewProps> = ({
  preferences,
  onUpdatePreferences,
  userAccount,
  onUpdateUserAccount,
  masterResume,
  onUpdateMasterResume
}) => {
  const [form, setForm] = useState<CandidatePreferences>(preferences);
  const [saved, setSaved] = useState(false);
  const [savedCloudAlert, setSavedCloudAlert] = useState(false);
  
  // Tag input states
  const [newTitle, setNewTitle] = useState('');
  const [newDomain, setNewDomain] = useState('');
  const [newLocation, setNewLocation] = useState('');

  // Gmail Login / Switch Account Modal
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState(userAccount.email);
  const [loginName, setLoginName] = useState(userAccount.name);

  // Sync state when preferences prop changes
  React.useEffect(() => {
    setForm(preferences);
  }, [preferences]);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onUpdatePreferences(form);

    // If masterResume exists, keep candidate fields in sync
    if (masterResume && onUpdateMasterResume) {
      const updated = {
        ...masterResume,
        fullName: form.candidateName || masterResume.fullName,
        currentRole: form.candidateCurrentRole || masterResume.currentRole,
        experienceYears: form.experienceYears || masterResume.experienceYears,
        preferences: form
      };
      onUpdateMasterResume(updated);
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleApplyPreset = (presetId: string) => {
    const preset = PRESET_TEMPLATES.find(p => p.id === presetId);
    if (!preset) return;

    const updated: CandidatePreferences = {
      ...form,
      policyPresetName: preset.name,
      candidateCurrentRole: preset.role,
      experienceYears: preset.expYears,
      targetTitles: preset.titles,
      targetDomains: preset.domains,
      minCtcLakhs: preset.minCtc,
      noticePeriodDays: preset.notice
    };

    setForm(updated);
    onUpdatePreferences(updated);

    if (masterResume && onUpdateMasterResume) {
      const updatedMaster: MasterResume = {
        ...masterResume,
        currentRole: preset.role,
        experienceYears: preset.expYears,
        preferences: updated
      };
      onUpdateMasterResume(updatedMaster);
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Add / Remove Tag Helpers
  const handleAddTitle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || form.targetTitles.includes(newTitle.trim())) return;
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

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain.trim() || form.targetDomains.includes(newDomain.trim())) return;
    setForm({
      ...form,
      targetDomains: [...form.targetDomains, newDomain.trim()]
    });
    setNewDomain('');
  };

  const handleRemoveDomain = (domain: string) => {
    setForm({
      ...form,
      targetDomains: form.targetDomains.filter(d => d !== domain)
    });
  };

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocation.trim() || form.otherLocations.includes(newLocation.trim())) return;
    setForm({
      ...form,
      otherLocations: [...form.otherLocations, newLocation.trim()]
    });
    setNewLocation('');
  };

  const handleRemoveLocation = (loc: string) => {
    setForm({
      ...form,
      otherLocations: form.otherLocations.filter(l => l !== loc)
    });
  };

  // Gmail Login Confirmation
  const handleConfirmLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;

    const updatedAccount: UserProfileAccount = {
      email: loginEmail.trim().toLowerCase(),
      name: loginName.trim() || loginEmail.split('@')[0],
      provider: 'google',
      lastLogin: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      isSavedToCloud: true
    };

    onUpdateUserAccount(updatedAccount);
    setShowLoginModal(false);
    setSavedCloudAlert(true);
    setTimeout(() => setSavedCloudAlert(false), 4000);
  };

  const handleSaveProfileToGmail = () => {
    const updatedAccount: UserProfileAccount = {
      ...userAccount,
      lastLogin: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      isSavedToCloud: true
    };
    onUpdateUserAccount(updatedAccount);
    handleSave();
    setSavedCloudAlert(true);
    setTimeout(() => setSavedCloudAlert(false), 4000);
  };

  const handleExportBackupJson = () => {
    const backupData = {
      userAccount,
      preferences: form,
      masterResume,
      exportedAt: new Date().toISOString(),
      appVersion: 'JobHunterAI-2026.1'
    };
    downloadFile(
      `${userAccount.email.split('@')[0]}_JobHunter_Profile_Backup.json`,
      JSON.stringify(backupData, null, 2),
      'application/json'
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Header & Global Save */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <SettingsIcon className="h-6 w-6 text-indigo-400" />
              Agent Configuration & Decision Policies
            </h1>
            <span className="rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs px-2.5 py-0.5 font-semibold">
              Dynamic Multi-User Ready
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fully customizable decision logic, candidate preferences, ATS thresholds, and Google Account profile synchronization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg transition-all active:scale-95"
          >
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saved ? 'Policies Updated!' : 'Save All Settings'}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* GMAIL USER LOGIN & ACCOUNT PERSISTENCE CARD */}
      {/* ------------------------------------------------------------------ */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            {/* Google G Brand Icon */}
            <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shadow-md shrink-0">
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.33 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{userAccount.name}</span>
                <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Signed in via Gmail
                </span>
              </div>
              <div className="text-xs font-mono text-cyan-300 mt-0.5">{userAccount.email}</div>
              <div className="text-[11px] text-slate-400">
                Status: Cloud Synchronized • Last session save: {userAccount.lastLogin}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            <button
              onClick={handleSaveProfileToGmail}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-semibold text-white shadow transition-all active:scale-95"
            >
              <Save className="h-4 w-4" /> Save Profile to Gmail
            </button>

            <button
              onClick={() => {
                setLoginEmail(userAccount.email);
                setLoginName(userAccount.name);
                setShowLoginModal(true);
              }}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-200 transition-all"
            >
              <LogIn className="h-4 w-4" /> Switch / New Gmail ID
            </button>

            <button
              onClick={handleExportBackupJson}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-700 px-2.5 py-2 text-xs text-slate-300 transition-all"
              title="Export complete profile & policy JSON backup"
            >
              <Download className="h-3.5 w-3.5" /> Backup JSON
            </button>
          </div>
        </div>

        {savedCloudAlert && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 text-xs text-emerald-300 flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>
              Profile, candidate preferences, and tracked applications successfully synchronized and saved under <strong>{userAccount.email}</strong>!
            </span>
          </div>
        )}

        <p className="text-xs text-slate-400">
          Your master resume, custom job titles, minimum CTC floor, and application proofs are securely stored under your Gmail identity. Any new candidate can sign in with their own Gmail ID to personalize this workspace.
        </p>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* QUICK PRESET SELECTOR (FOR ANY NEW USER) */}
      {/* ------------------------------------------------------------------ */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              Candidate Role & Industry Presets (One-Click Setup for New Users)
            </h3>
            <p className="text-xs text-slate-400">
              Select a pre-built archetype or customize your candidate profile fields below.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_TEMPLATES.map((preset) => {
            const isCurrent = form.policyPresetName === preset.name || (!form.policyPresetName && preset.id === 'ops-bfsi');

            return (
              <div
                key={preset.id}
                onClick={() => handleApplyPreset(preset.id)}
                className={`rounded-xl border p-3.5 cursor-pointer transition-all text-left space-y-1.5 ${
                  isCurrent
                    ? 'border-indigo-500 bg-indigo-950/40 shadow-sm shadow-indigo-950/50'
                    : 'border-slate-800 bg-slate-950/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    isCurrent ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isCurrent ? 'Active Preset' : 'Preset'}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-400">Min ₹{preset.minCtc} LPA</span>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-1">{preset.name}</h4>
                <div className="text-[11px] text-slate-400 line-clamp-1">{preset.role}</div>
                <div className="text-[10px] text-slate-500">{preset.expYears}+ Yrs • {preset.domain}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* CANDIDATE IDENTITY & BASELINE PARAMETERS */}
      {/* ------------------------------------------------------------------ */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="h-4 w-4 text-indigo-400" />
          Active Candidate Identity & Baseline Experience
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300">Candidate Full Name</label>
            <input
              type="text"
              value={form.candidateName || userAccount.name}
              onChange={(e) => setForm({ ...form, candidateName: e.target.value })}
              className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300">Current Designation / Role</label>
            <input
              type="text"
              value={form.candidateCurrentRole || 'Chief Manager – Operations'}
              onChange={(e) => setForm({ ...form, candidateCurrentRole: e.target.value })}
              className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300">Total Experience (Years)</label>
            <input
              type="number"
              min={0}
              max={45}
              value={form.experienceYears || 10}
              onChange={(e) => setForm({ ...form, experienceYears: Number(e.target.value) })}
              className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
            />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* TARGET JOB ROLES & INDUSTRY DOMAINS */}
      {/* ------------------------------------------------------------------ */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Briefcase className="h-4 w-4 text-indigo-400" />
            Target Job Titles for Multi-Platform Crawling
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Jobs matching any of these exact or fuzzy titles across Naukri, LinkedIn, and Career Portals will be scouted.
          </p>
        </div>

        <form onSubmit={handleAddTitle} className="flex gap-2">
          <input
            type="text"
            placeholder="Add title (e.g. Chief Manager – Operations, AVP Operations)..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center gap-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-semibold text-white"
          >
            <Plus className="h-4 w-4" /> Add Role
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {form.targetTitles.map((title) => (
            <span
              key={title}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-1.5 text-xs font-medium text-slate-200"
            >
              {title}
              <button
                onClick={() => handleRemoveTitle(title)}
                className="text-slate-500 hover:text-red-400 ml-1 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Target Domains */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <label className="text-xs font-bold text-white uppercase tracking-wider">
            Target Industry Domains
          </label>
          <form onSubmit={handleAddDomain} className="flex gap-2">
            <input
              type="text"
              placeholder="Add industry (e.g. General Insurance, BFSI, Telecom)..."
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              className="flex-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white placeholder-slate-500"
            />
            <button
              type="submit"
              className="rounded-xl bg-cyan-600 hover:bg-cyan-500 px-4 py-2 text-xs font-semibold text-white"
            >
              <Plus className="h-4 w-4" /> Add Domain
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            {form.targetDomains.map((domain) => (
              <span
                key={domain}
                className="flex items-center gap-1.5 rounded-lg border border-cyan-800/40 bg-cyan-950/40 px-3 py-1.5 text-xs text-cyan-300"
              >
                {domain}
                <button
                  onClick={() => handleRemoveDomain(domain)}
                  className="text-cyan-600 hover:text-red-400 ml-1 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* COMPENSATION FLOOR & ATS DECISION THRESHOLDS */}
      {/* ------------------------------------------------------------------ */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <DollarSign className="h-4 w-4 text-emerald-400" />
          Compensation Rules & Decision Policies
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-300">Minimum CTC Floor</label>
              <span className="font-bold text-emerald-400 text-xs">₹{form.minCtcLakhs} LPA</span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              step={1}
              value={form.minCtcLakhs}
              onChange={(e) => setForm({ ...form, minCtcLakhs: Number(e.target.value) })}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Strict filter: roles offering below ₹{form.minCtcLakhs} LPA are filtered out.
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-300">Auto-Apply Threshold</label>
              <span className="font-bold text-cyan-300 text-xs">≥ {form.minMatchScoreToAutoApply}%</span>
            </div>
            <input
              type="range"
              min={60}
              max={95}
              step={5}
              value={form.minMatchScoreToAutoApply}
              onChange={(e) => setForm({ ...form, minMatchScoreToAutoApply: Number(e.target.value) })}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Applications scoring {form.minMatchScoreToAutoApply}% or higher trigger automated submission.
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-300">Notice Period</label>
              <span className="font-bold text-slate-200 text-xs">{form.noticePeriodDays} Days</span>
            </div>
            <input
              type="range"
              min={0}
              max={120}
              step={15}
              value={form.noticePeriodDays}
              onChange={(e) => setForm({ ...form, noticePeriodDays: Number(e.target.value) })}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Filters out jobs requiring shorter notice unless buyout allowed.
            </p>
          </div>
        </div>

        {/* Operating Mode Selector */}
        <div className="pt-4 border-t border-slate-800">
          <label className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
            Autonomous Execution Policy
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'auto_pilot',
                title: 'Autonomous Pilot',
                desc: 'Applies automatically for all roles matching ≥ 80% ATS score.'
              },
              {
                id: 'review',
                title: 'Human-in-the-Loop',
                desc: 'Prepares tailored CVs and queues for one-click approval before submission.'
              },
              {
                id: 'manual_confirm',
                title: 'Scout & Notify Only',
                desc: 'Discovers verified openings and presents direct portal links.'
              }
            ].map((mode) => (
              <div
                key={mode.id}
                onClick={() => setForm({ ...form, autoApplyMode: mode.id as any })}
                className={`rounded-xl border p-3.5 cursor-pointer transition-all ${
                  form.autoApplyMode === mode.id
                    ? 'border-indigo-500 bg-indigo-950/40'
                    : 'border-slate-800 bg-slate-950/80 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-white mb-1">{mode.title}</div>
                <div className="text-[11px] text-slate-400 leading-relaxed">{mode.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* GMAIL LOGIN / ACCOUNT SWITCH MODAL */}
      {/* ------------------------------------------------------------------ */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <LogIn className="h-5 w-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Google Workspace / Gmail Login</h3>
              </div>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Enter your Google or Gmail ID to save, isolate, and persist your profile, job tracker, and tailored resumes.
            </p>

            <form onSubmit={handleConfirmLogin} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Candidate Name</label>
                <input
                  type="text"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  placeholder="e.g. Ankit Sharma"
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Gmail ID / Google Account Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="e.g. ankitsharma.airteldth@gmail.com"
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-xs text-white"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2 text-xs font-semibold text-white shadow"
                >
                  Sign In & Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
