import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Sparkles, 
  Save, 
  Check, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Sliders, 
  Building,
  ShieldAlert,
  ShieldCheck,
  MapPin,
  Clock,
  ExternalLink
} from 'lucide-react';
import { MasterResume, WorkExperience } from '../types';
import { ANKIT_SHARMA_MASTER_RESUME } from '../data/sampleData';

interface ResumeViewProps {
  masterResume: MasterResume;
  onUpdateResume: (updated: MasterResume) => void;
  onParseRawText: (text: string) => Promise<boolean>;
  isParsing: boolean;
}

export const ResumeView: React.FC<ResumeViewProps> = ({
  masterResume,
  onUpdateResume,
  onParseRawText,
  isParsing,
}) => {
  const [resume, setResume] = useState<MasterResume>(masterResume);
  const [newSkill, setNewSkill] = useState('');
  const [savedAlert, setSavedAlert] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'skills' | 'preferences'>('profile');

  const handleFieldChange = (field: keyof MasterResume, value: any) => {
    const updated = { ...resume, [field]: value };
    setResume(updated);
  };

  const handleSave = () => {
    onUpdateResume(resume);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handleResetToAnkitProfile = () => {
    setResume(ANKIT_SHARMA_MASTER_RESUME);
    onUpdateResume(ANKIT_SHARMA_MASTER_RESUME);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (resume.skills.includes(newSkill.trim())) return;
    const updated = {
      ...resume,
      skills: [...resume.skills, newSkill.trim()]
    };
    setResume(updated);
    onUpdateResume(updated);
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = {
      ...resume,
      skills: resume.skills.filter(s => s !== skillToRemove)
    };
    setResume(updated);
    onUpdateResume(updated);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header with Ankit Profile Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="h-6 w-6 text-indigo-400" />
              Candidate Master Profile: Ankit Sharma
            </h1>
            <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-0.5 font-semibold">
              Truth Verified (Zero Fabrication)
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Chief Manager – Operations at ICICI Lombard General Insurance (10+ Years Tenure, Hyderabad).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetToAnkitProfile}
            className="rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-all"
            title="Reset to default Ankit Sharma Master Profile"
          >
            Reload Ankit Baseline
          </button>
          
          <button
            id="btn-save-master-resume"
            onClick={handleSave}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow transition-all active:scale-95"
          >
            {savedAlert ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {savedAlert ? 'Saved to System!' : 'Save Profile Updates'}
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 text-xs sm:text-sm">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            activeTab === 'profile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Executive Summary & Contact
        </button>
        <button
          onClick={() => setActiveTab('experience')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            activeTab === 'experience' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          ICICI Lombard & Leadership (10+ Yrs)
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            activeTab === 'skills' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Skill Bank & Core Tech ({resume.skills.length})
        </button>
        <button
          onClick={() => setActiveTab('preferences')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            activeTab === 'preferences' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Target Preferences & CTC Rule
        </button>
      </div>

      {/* Tab 1: Profile & Contact */}
      {activeTab === 'profile' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <input
                type="text"
                value={resume.fullName}
                onChange={(e) => handleFieldChange('fullName', e.target.value)}
                className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <input
                type="email"
                value={resume.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300">Phone</label>
              <input
                type="text"
                value={resume.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300">Current Role & Company</label>
              <input
                type="text"
                value={`${resume.currentRole} at ${resume.currentCompany}`}
                disabled
                className="w-full mt-1 rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs text-cyan-300 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300">Executive Headline</label>
            <input
              type="text"
              value={resume.headline}
              onChange={(e) => handleFieldChange('headline', e.target.value)}
              className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300">Executive Summary</label>
            <textarea
              rows={4}
              value={resume.summary}
              onChange={(e) => handleFieldChange('summary', e.target.value)}
              className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800 text-xs">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-500 uppercase tracking-tighter text-[10px] block">Location Priority</span>
              <span className="font-semibold text-white">{resume.location}</span>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-500 uppercase tracking-tighter text-[10px] block">Expected CTC</span>
              <span className="font-semibold text-emerald-400">{resume.expectedCtc}</span>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-500 uppercase tracking-tighter text-[10px] block">Notice Period</span>
              <span className="font-semibold text-cyan-300">{resume.noticePeriod}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Work Experience */}
      {activeTab === 'experience' && (
        <div className="space-y-4">
          {resume.experience.map((exp) => (
            <div key={exp.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">{exp.role}</h3>
                  <div className="text-xs text-cyan-300 font-semibold">{exp.company} • {exp.location}</div>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md self-start sm:self-auto">
                  {exp.period}
                </span>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-slate-400">Key Quantified Achievements:</span>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-5">
                  {exp.achievements.map((ach, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {ach}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Skills Bank */}
      {activeTab === 'skills' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
          <form onSubmit={handleAddSkill} className="flex gap-2">
            <input
              type="text"
              placeholder="Add skill (e.g., Lean Six Sigma, Claims Governance, Muse)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-semibold text-white"
            >
              <Plus className="h-4 w-4" /> Add Skill
            </button>
          </form>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Master Skill Bank & Operational Competencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-500 hover:text-red-400 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Key Technologies & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {resume.toolsAndPlatforms.map(tool => (
                <span key={tool} className="text-xs font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-800/40 px-2.5 py-1 rounded">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Target Preferences */}
      {activeTab === 'preferences' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> Minimum CTC Floor
              </span>
              <p className="text-xs text-slate-400">
                Current rule: <strong>₹{resume.preferences.minCtcLakhs} LPA</strong>. Roles with compensation below this ceiling are automatically ignored.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-400" /> Scheduled Briefings
              </span>
              <p className="text-xs text-slate-400">
                Automated briefings trigger at <strong>09:30 AM IST</strong> and <strong>09:30 PM IST</strong> every day.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Target Domains
            </h4>
            <div className="flex flex-wrap gap-2">
              {resume.preferences.targetDomains.map(dom => (
                <span key={dom} className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full font-medium">
                  {dom}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Target Operational Roles
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {resume.preferences.targetTitles.map(title => (
                <span key={title} className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-lg">
                  {title}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
