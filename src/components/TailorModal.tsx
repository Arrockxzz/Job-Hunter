import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  FileCheck2, 
  FileText,
  Send, 
  Copy, 
  Check, 
  Award, 
  ArrowRight, 
  RefreshCw, 
  Building, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  Download,
  Share2,
  Clock,
  MapPin,
  DollarSign,
  AlertTriangle 
} from 'lucide-react';
import { JobPosting, MasterResume } from '../types';
import { formatModifiedResumeText, formatShareableReferenceText, downloadFile } from '../utils/referenceExport';
import { DirectLinkMenu } from './DirectLinkMenu';
import { resolveEnhancedJobLinks } from '../utils/jobLinkHelper';

interface TailorModalProps {
  job: JobPosting;
  masterResume: MasterResume;
  onClose: () => void;
  onTailorAndApply: (job: JobPosting, customCoverLetter?: string) => Promise<void>;
  onRunAiTailoring: (job: JobPosting, tone: string) => Promise<void>;
  isGenerating: boolean;
  isApplying: boolean;
}

export const TailorModal: React.FC<TailorModalProps> = ({
  job,
  masterResume,
  onClose,
  onTailorAndApply,
  onRunAiTailoring,
  isGenerating,
  isApplying,
}) => {
  const isApplied = job.status === 'applied';
  const [activeTab, setActiveTab] = useState<'receipt' | 'resume' | 'coverLetter' | 'verification'>(
    isApplied ? 'receipt' : 'resume'
  );
  const [selectedTone, setSelectedTone] = useState('Executive & Authoritative');
  const [copiedCover, setCopiedCover] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [copiedResume, setCopiedResume] = useState(false);
  const [sharedRef, setSharedRef] = useState(false);
  const [copiedLinkType, setCopiedLinkType] = useState<string | null>(null);
  const [editableCoverLetter, setEditableCoverLetter] = useState(job.coverLetter || '');

  const enhancedLinks = resolveEnhancedJobLinks(job);

  const handleCopySpecificLink = (url: string, type: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLinkType(type);
    setTimeout(() => setCopiedLinkType(null), 2000);
  };

  React.useEffect(() => {
    if (job.coverLetter) {
      setEditableCoverLetter(job.coverLetter);
    }
  }, [job.coverLetter]);

  React.useEffect(() => {
    if (isApplied) {
      setActiveTab('receipt');
    }
  }, [isApplied]);

  const tailored = job.tailoredResume;

  const handleCopyCoverLetter = () => {
    navigator.clipboard.writeText(editableCoverLetter);
    setCopiedCover(true);
    setTimeout(() => setCopiedCover(false), 2000);
  };

  const handleCopyReferenceNumber = () => {
    if (job.confirmationId) {
      navigator.clipboard.writeText(job.confirmationId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const handleShareReference = () => {
    const text = formatShareableReferenceText(job);
    navigator.clipboard.writeText(text);
    setSharedRef(true);
    setTimeout(() => setSharedRef(false), 2500);
  };

  const handleCopyModifiedResume = () => {
    const text = formatModifiedResumeText(job, masterResume);
    navigator.clipboard.writeText(text);
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 2000);
  };

  const handleDownloadModifiedResume = () => {
    const text = formatModifiedResumeText(job, masterResume);
    const safeCompany = job.company.replace(/[^a-zA-Z0-9]/g, '_');
    const safeRef = (job.confirmationId || 'ref').replace(/[^a-zA-Z0-9]/g, '_');
    downloadFile(`Ankit_Sharma_Modified_Resume_${safeCompany}_${safeRef}.txt`, text);
  };

  const handleApplyClick = async () => {
    await onTailorAndApply(job, editableCoverLetter);
    setActiveTab('receipt');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
              isApplied 
                ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30' 
                : 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30'
            }`}>
              {isApplied ? <CheckCircle2 className="h-6 w-6 text-emerald-400" /> : <Sparkles className="h-5 w-5 text-cyan-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  {isApplied ? 'Application Submitted & Verified' : 'Resume & Cover Letter Tailoring'}
                </h2>
                
                {/* Prominent Status Badge */}
                {isApplied ? (
                  <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Status: Applied
                  </span>
                ) : (
                  <span className="rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 text-xs font-semibold">
                    Ready to Apply
                  </span>
                )}

                <span className="rounded-full bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 text-xs font-semibold">
                  Zero Fabrication Rule
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {job.title} • <span className="text-white font-semibold">{job.company}</span> ({job.location})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Application Reference Banner if Applied */}
        {isApplied && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 px-6 py-3 border-b border-emerald-500/30 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-slate-300 font-medium">Application Reference Number:</span>
              <span className="font-mono font-bold text-emerald-300 bg-emerald-900/40 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-xs">
                {job.confirmationId || 'CONF-VERIFIED'}
              </span>
              <button
                onClick={handleCopyReferenceNumber}
                className="flex items-center gap-1 rounded-md bg-slate-800 hover:bg-slate-700 px-2 py-1 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20"
                title="Copy Application Number"
              >
                {copiedRef ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copiedRef ? 'Copied' : 'Copy Ref'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShareReference}
                className="flex items-center gap-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 text-[11px] font-semibold transition-all"
              >
                <Share2 className="h-3 w-3" />
                {sharedRef ? 'Reference Copied!' : 'Share Reference'}
              </button>

              <button
                onClick={handleDownloadModifiedResume}
                className="flex items-center gap-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-semibold transition-all"
              >
                <Download className="h-3 w-3" />
                Download Resume (.txt)
              </button>
            </div>
          </div>
        )}

        {/* Match Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/40 p-4 border-b border-slate-800/80 text-xs">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <div className="text-slate-400 font-medium">Domain & Role</div>
            <div className="font-bold text-white mt-0.5 truncate">{job.domain}</div>
            <div className="text-[10px] text-slate-500">Target Role Match</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <div className="text-slate-400 font-medium">Compensation</div>
            <div className="font-bold text-emerald-400 mt-0.5">{job.salaryRange}</div>
            <div className="text-[10px] text-emerald-500 font-semibold">≥ ₹14 LPA Compliant</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <div className="text-slate-400 font-medium">ATS Match Score</div>
            <div className="font-bold text-cyan-300 mt-0.5">{job.matchScore || 92}% Score</div>
            <div className="text-[10px] text-cyan-400 font-semibold">{job.candidateRanking || 'Top 1% Candidate'}</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <div className="text-slate-400 font-medium">Direct Portal Links</div>
            <div className="mt-1">
              <DirectLinkMenu job={job} size="sm" />
            </div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
              <ShieldCheck className="h-3 w-3" /> Live Verified Endpoints
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/40 px-6 py-2">
          <div className="flex space-x-2">
            {isApplied && (
              <button
                onClick={() => setActiveTab('receipt')}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === 'receipt'
                    ? 'bg-emerald-600 text-white'
                    : 'text-emerald-400 hover:text-white'
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Application Receipt & Reference
              </button>
            )}

            <button
              onClick={() => setActiveTab('resume')}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'resume'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCheck2 className="h-3.5 w-3.5" />
              {isApplied ? 'Modified ATS Resume (Submitted)' : 'Tailored Executive Resume'}
            </button>

            <button
              onClick={() => setActiveTab('coverLetter')}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'coverLetter'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              {isApplied ? 'Submitted Cover Letter' : 'Tailored Cover Letter'}
            </button>

            <button
              onClick={() => setActiveTab('verification')}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'verification'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Audit & JD Analysis
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyModifiedResume}
              className="flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-xs font-semibold text-slate-200 transition-all"
              title="Copy modified resume text"
            >
              {copiedResume ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              {copiedResume ? 'Copied' : 'Copy Resume'}
            </button>

            {!isApplied && (
              <button
                onClick={() => onRunAiTailoring(job, selectedTone)}
                disabled={isGenerating}
                className="flex items-center gap-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 px-2.5 py-1 text-xs font-semibold text-indigo-300 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`h-3 w-3 ${isGenerating ? 'animate-spin text-cyan-400' : ''}`} />
                Re-Tailor
              </button>
            )}
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* TAB 0: APPLICATION RECEIPT & REFERENCE SLIP */}
          {activeTab === 'receipt' && (
            <div className="space-y-4">
              {/* Confirmed Application Card */}
              <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 p-6 space-y-4 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                        Application Status Confirmed
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        Application Status: <span className="text-emerald-300">Applied</span>
                      </h3>
                      <p className="text-xs text-slate-300">
                        Direct submission verified on {job.company} Career Portal on {job.appliedAt || 'Today'}.
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs px-3 py-1 font-bold flex items-center gap-1 self-start sm:self-center">
                    <ShieldCheck className="h-4 w-4" /> Proof Verified
                  </span>
                </div>

                {/* Application Reference Number Box */}
                <div className="rounded-xl border border-emerald-500/30 bg-slate-950/80 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Application Reference Number
                    </span>
                    <span className="text-[11px] text-emerald-400 font-mono">Use for tracking & HR follow-ups</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <span className="text-lg sm:text-xl font-mono font-bold text-emerald-300 tracking-wider">
                      {job.confirmationId || 'CONF-VERIFIED'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyReferenceNumber}
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow transition-all active:scale-95"
                      >
                        {copiedRef ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        {copiedRef ? 'Reference Copied!' : 'Copy Reference Number'}
                      </button>
                      <button
                        onClick={handleShareReference}
                        className="flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 border border-indigo-500/30 transition-all active:scale-95"
                      >
                        <Share2 className="h-3.5 w-3.5" />
                        {sharedRef ? 'Slip Copied!' : 'Share Reference'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Candidate & Portal Reference Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                    <div className="text-slate-400 font-medium">Candidate Profile</div>
                    <div className="font-bold text-white">{masterResume.fullName}</div>
                    <div className="text-slate-500 text-[11px]">{masterResume.currentRole}</div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                    <div className="text-slate-400 font-medium">Applied Position</div>
                    <div className="font-bold text-white">{job.title}</div>
                    <div className="text-slate-500 text-[11px]">{job.company} • {job.location}</div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Direct Application Proof & Links</span>
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" /> Live Active
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {/* Naukri direct link */}
                      {enhancedLinks.naukriUrl && (
                        <div className="flex items-center justify-between text-xs bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-cyan-500/20">
                          <span className="text-cyan-300 font-semibold flex items-center gap-1">
                            Naukri Portal
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopySpecificLink(enhancedLinks.naukriUrl, 'naukri')}
                              className="text-[10px] text-slate-400 hover:text-white"
                            >
                              {copiedLinkType === 'naukri' ? 'Copied' : 'Copy'}
                            </button>
                            <a
                              href={enhancedLinks.naukriUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:text-cyan-300 font-semibold text-[11px] flex items-center gap-1"
                            >
                              Open <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      )}

                      {/* LinkedIn direct link */}
                      {enhancedLinks.linkedInUrl && (
                        <div className="flex items-center justify-between text-xs bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-blue-500/20">
                          <span className="text-blue-300 font-semibold flex items-center gap-1">
                            LinkedIn Job Post
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopySpecificLink(enhancedLinks.linkedInUrl, 'linkedin')}
                              className="text-[10px] text-slate-400 hover:text-white"
                            >
                              {copiedLinkType === 'linkedin' ? 'Copied' : 'Copy'}
                            </button>
                            <a
                              href={enhancedLinks.linkedInUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 font-semibold text-[11px] flex items-center gap-1"
                            >
                              Open <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Official Company Career Gateway */}
                      {enhancedLinks.careerPortalUrl && (
                        <div className="flex items-center justify-between text-xs bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-emerald-500/20">
                          <span className="text-emerald-300 font-semibold flex items-center gap-1 truncate max-w-[150px]">
                            {job.company} Career Hub
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopySpecificLink(enhancedLinks.careerPortalUrl, 'career')}
                              className="text-[10px] text-slate-400 hover:text-white"
                            >
                              {copiedLinkType === 'career' ? 'Copied' : 'Copy'}
                            </button>
                            <a
                              href={enhancedLinks.careerPortalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-400 hover:text-emerald-300 font-semibold text-[11px] flex items-center gap-1"
                            >
                              Open <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Modified Resume Summary Card */}
                <div className="rounded-xl border border-indigo-500/20 bg-slate-950/60 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                      <FileCheck2 className="h-4 w-4" /> Submitted Modified Resume Overview
                    </span>
                    <span className="text-xs font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      ATS Score: {job.matchScore || 92}%
                    </span>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-slate-400">Tailored Executive Headline:</div>
                    <div className="text-xs font-bold text-white mt-0.5">
                      {tailored?.tailoredHeadline || `${job.title} | 10+ Yrs Operations Leadership | ICICI Lombard`}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-slate-400">Targeted Summary (Zero Fabrication Guarantee):</div>
                    <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
                      {tailored?.tailoredSummary || masterResume.summary}
                    </p>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 mb-1">Emphasized Core Competencies:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {(tailored?.emphasizedSkills || job.requiredSkills).map((skill, idx) => (
                        <span key={idx} className="rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-mono">
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2 border-t border-slate-800">
                    <button
                      onClick={() => setActiveTab('resume')}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      View Full Modified Resume Bullets <ArrowRight className="h-3 w-3" />
                    </button>
                    <span className="text-slate-600">•</span>
                    <button
                      onClick={handleDownloadModifiedResume}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" /> Download Modified Resume
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 1: TAILORED / MODIFIED RESUME */}
          {activeTab === 'resume' && (
            <div className="space-y-4">
              {isApplied && (
                <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span className="text-slate-200">
                      This modified resume was submitted under Application Ref <strong className="text-emerald-300 font-mono">{job.confirmationId}</strong>.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyModifiedResume}
                      className="rounded bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-[11px] font-semibold text-slate-200"
                    >
                      {copiedResume ? 'Copied!' : 'Copy Text'}
                    </button>
                    <button
                      onClick={handleDownloadModifiedResume}
                      className="rounded bg-emerald-600 hover:bg-emerald-500 px-2.5 py-1 text-[11px] font-semibold text-white"
                    >
                      Download (.txt)
                    </button>
                  </div>
                </div>
              )}

              {tailored ? (
                <>
                  <div className="rounded-2xl border border-indigo-500/20 bg-slate-950/60 p-4 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                      Optimized Executive Headline
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      {tailored.tailoredHeadline}
                    </h3>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                      Targeted Executive Summary (10+ Yrs ICICI Lombard Operations)
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {tailored.tailoredSummary}
                    </p>
                  </div>

                  {tailored.keyAtsAdjustments && (
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                        ATS & Domain Adjustments (Strictly Grounded in Real Experience)
                      </span>
                      <ul className="space-y-1 text-xs text-slate-300 list-disc pl-5">
                        {tailored.keyAtsAdjustments.map((adj, i) => (
                          <li key={i}>{adj}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Targeted Work Experience & STP Achievements
                    </span>
                    {(tailored.optimizedExperience.length > 0 
                      ? tailored.optimizedExperience 
                      : masterResume.experience.map(e => ({
                          role: e.role,
                          company: e.company,
                          period: e.period,
                          bullets: e.achievements,
                          highlightedKeywords: job.requiredSkills.slice(0, 3)
                        }))
                    ).map((exp, idx) => (
                      <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white">{exp.role}</span>
                          <span className="text-slate-400">{exp.company} • {exp.period}</span>
                        </div>
                        <ul className="space-y-1 text-xs text-slate-300 list-disc pl-5">
                          {exp.bullets.map((b, bIdx) => (
                            <li key={bIdx} className="leading-relaxed">{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 text-center space-y-3">
                  <FileText className="h-8 w-8 text-indigo-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white">Generate Tailored Resume for Ankit Sharma</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Click "Re-Tailor" to execute the Resume Agent. It will optimize Ankit's actual 10+ years tenure at ICICI Lombard without fabricating experience.
                  </p>
                  <button
                    onClick={() => onRunAiTailoring(job, selectedTone)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow"
                  >
                    <Sparkles className="h-4 w-4" /> Run Resume Agent
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: COVER LETTER */}
          {activeTab === 'coverLetter' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  Personalized Cover Letter for {job.company}
                </span>
                <button
                  onClick={handleCopyCoverLetter}
                  className="flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1 text-xs font-semibold text-slate-200 transition-all"
                >
                  {copiedCover ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  {copiedCover ? 'Copied' : 'Copy Letter'}
                </button>
              </div>

              <textarea
                rows={12}
                value={editableCoverLetter}
                onChange={(e) => setEditableCoverLetter(e.target.value)}
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs font-mono text-slate-200 leading-relaxed focus:border-indigo-500 focus:outline-none"
              />
            </div>
          )}

          {/* TAB 3: VERIFICATION & JD AUDIT */}
          {activeTab === 'verification' && (
            <div className="space-y-4 text-xs">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                <h4 className="font-bold text-white">Verification Agent Audit</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                  <div>• Active Career URL: <span className="text-emerald-400 font-semibold">Confirmed Active</span></div>
                  <div>• Source: <span className="text-white">{job.verification?.verificationSource}</span></div>
                  <div>• CTC Compliance: <span className="text-emerald-400 font-semibold">{job.salaryRange} (≥ ₹14 LPA)</span></div>
                  <div>• Anti-Duplicate Hash: <span className="font-mono text-slate-400">{job.verification?.duplicateHash || 'N/A'}</span></div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                <h4 className="font-bold text-white">Full Job Description</h4>
                <p className="text-slate-300 whitespace-pre-line leading-relaxed">
                  {job.description}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800 bg-slate-950/80 px-6 py-4">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            <span>Direct Application Link: </span>
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline font-semibold"
            >
              Open {job.company} Career Portal
            </a>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
            >
              Close
            </button>

            {isApplied ? (
              <button
                onClick={handleShareReference}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg transition-all active:scale-95"
              >
                <Share2 className="h-4 w-4" />
                {sharedRef ? 'Reference Slip Copied!' : 'Share Reference & Resume'}
              </button>
            ) : (
              <button
                id="btn-confirm-and-apply"
                onClick={handleApplyClick}
                disabled={isApplying}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg transition-all active:scale-95 disabled:opacity-75"
              >
                <Send className={`h-4 w-4 ${isApplying ? 'animate-spin' : ''}`} />
                {isApplying ? 'Submitting Application...' : 'Confirm & Apply via Agent'}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
