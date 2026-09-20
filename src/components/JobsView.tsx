import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  Send, 
  FileCheck2, 
  SlidersHorizontal,
  ChevronDown,
  Globe,
  Zap,
  ShieldCheck,
  Building,
  Check,
  Copy,
  Share2,
  Download,
  AlertTriangle
} from 'lucide-react';
import { JobPosting, PlatformName, MasterResume } from '../types';
import { formatShareableReferenceText, formatModifiedResumeText, downloadFile } from '../utils/referenceExport';
import { DirectLinkMenu } from './DirectLinkMenu';

interface JobsViewProps {
  jobs: JobPosting[];
  masterResume: MasterResume;
  onSelectJobForReview: (job: JobPosting) => void;
  onQuickAutoApply: (job: JobPosting) => void;
  onSearchMoreJobs: () => void;
  isSearchingMore: boolean;
}

const ALL_PLATFORMS: (PlatformName | 'All')[] = [
  'All',
  'LinkedIn',
  'Naukri',
  'Indeed',
  'IIMJobs',
  'Company Career Page',
  'Glassdoor',
  'Foundit',
  'Google Jobs'
];

export const JobsView: React.FC<JobsViewProps> = ({
  jobs,
  masterResume,
  onSelectJobForReview,
  onQuickAutoApply,
  onSearchMoreJobs,
  isSearchingMore,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformName | 'All'>('All');
  const [selectedTier, setSelectedTier] = useState<'all' | 'high' | 'review' | 'ignored'>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [minSalaryFilter, setMinSalaryFilter] = useState(true); // default true: enforce >= ₹14 LPA
  const [copiedJobId, setCopiedJobId] = useState<string | null>(null);
  const [sharedJobId, setSharedJobId] = useState<string | null>(null);

  const domains = ['All', 'General Insurance', 'Insurance', 'Banking', 'Telecom'];

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

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.requiredSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesPlatform = selectedPlatform === 'All' || job.platform === selectedPlatform;
    const matchesDomain = selectedDomain === 'All' || job.domain === selectedDomain;
    
    const matchesTier = 
      selectedTier === 'all' ? true :
      selectedTier === 'high' ? (job.matchScore || 0) >= 80 :
      selectedTier === 'review' ? ((job.matchScore || 0) >= 40 && (job.matchScore || 0) < 80) :
      (job.matchScore || 0) < 40;

    const matchesSalary = !minSalaryFilter || (job.salaryMinLakhs ? job.salaryMinLakhs >= 14 : true);

    return matchesSearch && matchesPlatform && matchesDomain && matchesTier && matchesSalary;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Globe className="h-6 w-6 text-cyan-400" />
                Verified Multi-Platform Job Feed
              </h1>
              <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-0.5 font-semibold">
                Direct Career Portal Links
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Aggregated from LinkedIn, Naukri, Indeed, IIMJobs & Direct Career Portals • Auto-filtered for ₹14 LPA+ and Hyderabad / Remote priority.
            </p>
          </div>

          <button
            onClick={onSearchMoreJobs}
            disabled={isSearchingMore}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow transition-all active:scale-95 disabled:opacity-50"
          >
            <Sparkles className={`h-4 w-4 ${isSearchingMore ? 'animate-spin' : ''}`} />
            {isSearchingMore ? 'Job Hunter Scouting...' : 'Scout More Openings'}
          </button>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-800">
          
          {/* Keyword Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search title, skills (STP, Power BI)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Platform Filter */}
          <div className="relative">
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value as PlatformName | 'All')}
              className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-300 focus:border-indigo-500 focus:outline-none"
            >
              {ALL_PLATFORMS.map((platform) => (
                <option key={platform} value={platform}>
                  Platform: {platform}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-500" />
          </div>

          {/* Domain Filter */}
          <div className="relative">
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-300 focus:border-indigo-500 focus:outline-none"
            >
              {domains.map((dom) => (
                <option key={dom} value={dom}>
                  Domain: {dom}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-500" />
          </div>

          {/* Match Tier Filter */}
          <div className="relative">
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value as any)}
              className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-300 focus:border-indigo-500 focus:outline-none"
            >
              <option value="all">All Match Scores</option>
              <option value="high">Auto-Apply (≥80% Score)</option>
              <option value="review">Review Required (40-79%)</option>
              <option value="ignored">Ignored (&lt;40%)</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-500" />
          </div>

        </div>

        {/* CTC Floor Toggle Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-white">{filteredJobs.length}</strong> verified opportunities</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Candidate: Ankit Sharma (10+ Yrs Exp)</span>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={minSalaryFilter}
              onChange={(e) => setMinSalaryFilter(e.target.checked)}
              className="rounded accent-emerald-500"
            />
            <span className="text-emerald-400 font-semibold">
              Enforce ≥ ₹14 LPA Minimum Floor
            </span>
          </label>
        </div>
      </div>

      {/* Job Card List */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-slate-800 bg-slate-900/40 p-8 space-y-3">
            <Briefcase className="h-10 w-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No roles match the active filters</h3>
            <p className="text-xs text-slate-400">Try broadening your search term or trigger the Job Hunter Agent to scout more roles.</p>
          </div>
        ) : (
          filteredJobs.map((job) => {
            const isApplied = job.status === 'applied';
            const isHighFit = (job.matchScore || 0) >= 80;
            const isReview = (job.matchScore || 0) >= 40 && (job.matchScore || 0) < 80;

            return (
              <div
                key={job.id}
                className={`rounded-2xl border p-5 backdrop-blur-sm transition-all ${
                  isApplied
                    ? 'border-emerald-500/40 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/20 shadow-md'
                    : isHighFit 
                    ? 'border-indigo-500/30 bg-slate-900/80 shadow-md' 
                    : isReview 
                    ? 'border-amber-500/30 bg-slate-900/60' 
                    : 'border-slate-800/80 bg-slate-950/40 opacity-70'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  
                  {/* Left: Job Header & Metadata */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {isApplied ? (
                        <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Status: Applied
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                          {job.domain}
                        </span>
                      )}

                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${
                        job.platform === 'Naukri'
                          ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30'
                          : job.platform === 'LinkedIn'
                          ? 'bg-blue-950/60 text-blue-300 border-blue-500/30'
                          : job.platform === 'Company Career Page'
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {job.platform}
                      </span>
                      <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" /> Live Active
                      </span>
                      <span className="text-xs text-slate-500">• {job.postedDate}</span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                        {job.salaryRange}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                      <span className="flex items-center gap-1 font-semibold text-white">
                        <Building className="h-3.5 w-3.5 text-slate-400" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {job.location} ({job.remoteType})
                      </span>
                      <span>• Experience: {job.experienceLevel}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {job.description}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] text-slate-400 font-semibold mr-1">Skills:</span>
                      {job.requiredSkills.map(skill => {
                        const candidateHasSkill = masterResume.skills.some(
                          ms => ms.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(ms.toLowerCase())
                        );
                        return (
                          <span
                            key={skill}
                            className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${
                              candidateHasSkill 
                                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {candidateHasSkill ? '✓ ' : ''}{skill}
                          </span>
                        );
                      })}
                    </div>

                    {/* Verification Status & Reference Strip */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px]">
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <ShieldCheck className="h-3 w-3" /> Verified Direct Link
                      </span>
                      <span className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full border ${
                        isHighFit ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' :
                        isReview ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' :
                        'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        Match: {job.matchScore || 0}% • {job.candidateRanking || 'Evaluated'}
                      </span>
                    </div>

                    {/* Prominent Application Reference Number Box if Applied */}
                    {isApplied && job.confirmationId && (
                      <div className="mt-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-300 font-medium">Application Ref Number:</span>
                          <span className="font-mono font-bold text-emerald-300 bg-emerald-900/50 border border-emerald-500/30 px-2 py-0.5 rounded">
                            {job.confirmationId}
                          </span>
                          <button
                            onClick={(e) => handleCopyRef(job, e)}
                            className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 ml-1"
                            title="Copy Application Number"
                          >
                            {copiedJobId === job.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                            {copiedJobId === job.id ? 'Copied!' : 'Copy Ref'}
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => handleShareRef(job, e)}
                            className="flex items-center gap-1 text-[11px] font-semibold text-indigo-300 hover:text-indigo-200 bg-indigo-950/40 border border-indigo-500/30 px-2 py-0.5 rounded"
                          >
                            <Share2 className="h-3 w-3" />
                            {sharedJobId === job.id ? 'Reference Slip Copied!' : 'Share Ref Slip'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Actions */}
                  <div className="flex lg:flex-col items-center lg:items-end gap-2.5 shrink-0 pt-2 lg:pt-0">
                    <DirectLinkMenu job={job} size="md" />

                    {isApplied ? (
                      <button
                        onClick={() => onSelectJobForReview(job)}
                        className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-md transition-all active:scale-95"
                      >
                        <FileCheck2 className="h-3.5 w-3.5" />
                        View Modified Resume & Ref
                      </button>
                    ) : (
                      <button
                        onClick={() => onSelectJobForReview(job)}
                        className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-md transition-all active:scale-95"
                      >
                        Inspect & Tailor Resume
                      </button>
                    )}

                    {!isApplied && isHighFit && (
                      <button
                        onClick={() => onQuickAutoApply(job)}
                        className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow transition-all active:scale-95"
                      >
                        <Send className="h-3.5 w-3.5" /> Auto-Apply
                      </button>
                    )}
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
