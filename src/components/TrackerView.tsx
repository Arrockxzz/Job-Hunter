import React, { useState } from 'react';
import { 
  Kanban, 
  Table, 
  CheckCircle2, 
  ExternalLink, 
  ChevronRight, 
  Building, 
  FileText,
  Clock,
  ShieldCheck, 
  Check, 
  MapPin, 
  Copy, 
  Share2, 
  FileCheck2,
  Download,
  Eye,
  X,
  Sparkles,
  Link as LinkIcon,
  Search,
  ArrowUpRight
} from 'lucide-react';
import { JobPosting, JobStatus, MasterResume } from '../types';
import { formatShareableReferenceText, formatModifiedResumeText, downloadFile } from '../utils/referenceExport';
import { DirectLinkMenu } from './DirectLinkMenu';

interface TrackerViewProps {
  jobs: JobPosting[];
  masterResume: MasterResume;
  onUpdateJobStatus: (jobId: string, newStatus: JobStatus) => void;
  onSelectJobForReview: (job: JobPosting) => void;
}

const COLUMNS: { status: JobStatus; title: string; color: string; badge: string }[] = [
  { status: 'discovered', title: 'Scouted & Verified', color: 'border-slate-700', badge: 'bg-slate-800 text-slate-300' },
  { status: 'tailored', title: 'Tailored & Ready', color: 'border-purple-500/40', badge: 'bg-purple-500/20 text-purple-300' },
  { status: 'review_needed', title: 'Review Needed (40-79%)', color: 'border-amber-500/40', badge: 'bg-amber-500/20 text-amber-300' },
  { status: 'applied', title: 'Applied (Proof Logged)', color: 'border-emerald-500/40', badge: 'bg-emerald-500/20 text-emerald-300' },
  { status: 'interview', title: 'Interviews & Offer', color: 'border-cyan-500/40', badge: 'bg-cyan-500/20 text-cyan-300' },
];

export const TrackerView: React.FC<TrackerViewProps> = ({
  jobs,
  masterResume,
  onUpdateJobStatus,
  onSelectJobForReview,
}) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [copiedJobId, setCopiedJobId] = useState<string | null>(null);
  const [sharedJobId, setSharedJobId] = useState<string | null>(null);
  const [previewResumeJob, setPreviewResumeJob] = useState<JobPosting | null>(null);

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

  const handleDownloadModifiedResume = (job: JobPosting, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = formatModifiedResumeText(job, masterResume);
    const sanitizedCompany = job.company.replace(/[^a-zA-Z0-9]/g, '_');
    const sanitizedTitle = job.title.replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `${sanitizedCompany}_${sanitizedTitle}_Modified_Resume.txt`;
    downloadFile(filename, text);
  };

  // Get Primary Applied Status URL for direct checking
  const getApplicationStatusUrl = (job: JobPosting) => {
    return job.directCareerUrl || job.applyUrl || job.naukriUrl || job.linkedInUrl;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Kanban className="h-6 w-6 text-emerald-400" />
              Application Tracker & Modified Resumes
            </h1>
            <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-0.5 font-semibold">
              Real-Time Status & Proofs
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track confirmed applications, view and download modified resumes attached to each opening, and jump directly to portal application status pages.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center rounded-xl bg-slate-950 p-1 border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              viewMode === 'kanban'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Kanban className="h-3.5 w-3.5" />
            Board View
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              viewMode === 'table'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Table className="h-3.5 w-3.5" />
            Audit Table
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {COLUMNS.map((col) => {
            const colJobs = jobs.filter((j) => {
              if (col.status === 'interview') {
                return j.status === 'interview' || j.status === 'offer';
              }
              return j.status === col.status;
            });

            return (
              <div
                key={col.status}
                className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-3 min-h-[550px]"
              >
                {/* Column Header */}
                <div className={`flex items-center justify-between border-b pb-2 mb-3 ${col.color}`}>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    {col.title}
                  </h3>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${col.badge}`}>
                    {colJobs.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colJobs.length === 0 ? (
                    <div className="text-center py-8 text-[11px] text-slate-500">
                      No roles in this stage
                    </div>
                  ) : (
                    colJobs.map((job) => {
                      const isApplied = job.status === 'applied';
                      const statusUrl = getApplicationStatusUrl(job);

                      return (
                        <div
                          key={job.id}
                          className={`group rounded-xl border p-3.5 transition-all shadow-sm space-y-3 ${
                            isApplied 
                              ? 'border-emerald-500/40 bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/20 shadow-emerald-950/20' 
                              : 'border-slate-800 bg-slate-950/80 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span className="font-semibold text-indigo-400">{job.domain}</span>
                            <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">{job.platform}</span>
                          </div>

                          <div>
                            <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                              {job.title}
                            </h4>
                            <div className="text-[11px] text-slate-300 mt-0.5">
                              <span className="font-semibold text-slate-200">{job.company}</span>
                              <div className="text-[10px] text-slate-500">{job.location}</div>
                            </div>
                          </div>

                          {/* Salary & Match */}
                          <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-900">
                            <span className="font-bold text-emerald-400">{job.salaryRange.split(' ')[0]}</span>
                            <span className="font-bold text-cyan-300">ATS Match: {job.matchScore || 0}%</span>
                          </div>

                          {/* ---------------------------------------------------- */}
                          {/* MODIFIED RESUME ATTACHED SECTION */}
                          {/* ---------------------------------------------------- */}
                          <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/30 p-2.5 space-y-2">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="font-bold text-indigo-300 flex items-center gap-1">
                                <FileCheck2 className="h-3 w-3 text-cyan-400" />
                                Modified Resume Attached
                              </span>
                              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800/40">
                                {job.tailoredResume ? 'Tailored' : 'Master Ver.'}
                              </span>
                            </div>

                            <p className="text-[10px] text-slate-400 line-clamp-2 italic">
                              "{job.tailoredResume?.tailoredHeadline || job.title + ' | Operational STP Excellence'}"
                            </p>

                            <div className="grid grid-cols-2 gap-1.5 pt-1">
                              <button
                                onClick={(e) => handleDownloadModifiedResume(job, e)}
                                className="flex items-center justify-center gap-1 rounded-lg bg-indigo-600/60 hover:bg-indigo-600 px-2 py-1.5 text-[10px] font-semibold text-white transition-all"
                                title="Download the modified resume submitted for this application"
                              >
                                <Download className="h-3 w-3" /> Download CV
                              </button>

                              <button
                                onClick={() => setPreviewResumeJob(job)}
                                className="flex items-center justify-center gap-1 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 px-2 py-1.5 text-[10px] font-semibold text-slate-200 transition-all"
                                title="Preview submitted modified resume"
                              >
                                <Eye className="h-3 w-3 text-cyan-400" /> View CV
                              </button>
                            </div>
                          </div>

                          {/* ---------------------------------------------------- */}
                          {/* APPLICATION STATUS & APPLIED LINK */}
                          {/* ---------------------------------------------------- */}
                          {isApplied && (
                            <div className="space-y-2 pt-1 border-t border-slate-900">
                              <div className="flex items-center justify-between text-[10px]">
                                <span className="flex items-center gap-1 font-bold text-emerald-400">
                                  <CheckCircle2 className="h-3 w-3" /> Applied (Verified)
                                </span>
                                <span className="text-[9px] text-slate-400">{job.appliedAt || 'Today'}</span>
                              </div>

                              {/* Application Reference ID with Copy */}
                              {job.confirmationId && (
                                <div className="rounded-lg bg-emerald-950/50 border border-emerald-500/30 p-1.5 flex items-center justify-between text-[10px]">
                                  <div>
                                    <span className="text-[9px] text-slate-400 block uppercase">Ref ID:</span>
                                    <span className="font-mono font-bold text-emerald-300">{job.confirmationId}</span>
                                  </div>
                                  <button
                                    onClick={(e) => handleCopyRef(job, e)}
                                    className="text-emerald-400 hover:text-emerald-300 p-1"
                                    title="Copy reference number"
                                  >
                                    {copiedJobId === job.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                  </button>
                                </div>
                              )}

                              {/* Direct Link to Check Application Status */}
                              <a
                                href={statusUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold shadow-sm transition-all"
                              >
                                <ArrowUpRight className="h-3.5 w-3.5" /> Check Application Status
                              </a>
                            </div>
                          )}

                          {/* Quick Card Controls & Direct Link Menu */}
                          <div className="flex items-center justify-between pt-1 text-xs gap-1">
                            <DirectLinkMenu job={job} size="sm" />

                            <button
                              onClick={() => onSelectJobForReview(job)}
                              className="text-[10px] font-semibold text-slate-400 hover:text-indigo-300 flex items-center gap-1 shrink-0"
                            >
                              Details <ChevronRight className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Advance Status Controls */}
                          {job.status === 'tailored' && (
                            <button
                              onClick={() => onUpdateJobStatus(job.id, 'applied')}
                              className="w-full text-center py-1.5 rounded-lg bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50 text-[10px] font-semibold transition-all"
                            >
                              Mark as Submitted
                            </button>
                          )}
                          {job.status === 'applied' && (
                            <button
                              onClick={() => onUpdateJobStatus(job.id, 'interview')}
                              className="w-full text-center py-1.5 rounded-lg bg-cyan-600/30 text-cyan-300 hover:bg-cyan-600/50 text-[10px] font-semibold transition-all"
                            >
                              Schedule Interview
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Detailed Audit Table */
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3.5">Company & Role</th>
                <th className="p-3.5">Location & Domain</th>
                <th className="p-3.5">ATS Match</th>
                <th className="p-3.5">Attached Modified Resume</th>
                <th className="p-3.5">Application Status & Link</th>
                <th className="p-3.5 text-right">Portal Links</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {jobs.map((job) => {
                const isApplied = job.status === 'applied';
                const statusUrl = getApplicationStatusUrl(job);

                return (
                  <tr key={job.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-white">{job.title}</div>
                      <div className="text-[11px] text-cyan-400">{job.company}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{job.platform}</div>
                    </td>

                    <td className="p-3.5">
                      <div>{job.location}</div>
                      <div className="text-[11px] text-slate-400 font-semibold">{job.domain}</div>
                      <div className="font-semibold text-emerald-400 text-[11px]">{job.salaryRange}</div>
                    </td>

                    <td className="p-3.5">
                      <span className="font-bold text-cyan-300">{job.matchScore || 0}%</span>
                      <div className="text-[10px] text-slate-500">{job.candidateRanking || 'Evaluated'}</div>
                    </td>

                    {/* Attached Resume Column */}
                    <td className="p-3.5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-200">
                          <FileCheck2 className="h-3.5 w-3.5 text-indigo-400" />
                          <span className="truncate max-w-[180px]">
                            {job.company.replace(/\s+/g, '_')}_CV.txt
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => handleDownloadModifiedResume(job, e)}
                            className="inline-flex items-center gap-1 rounded-md bg-indigo-600 hover:bg-indigo-500 px-2 py-1 text-[10px] font-semibold text-white"
                          >
                            <Download className="h-2.5 w-2.5" /> Download
                          </button>
                          <button
                            onClick={() => setPreviewResumeJob(job)}
                            className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800 hover:bg-slate-700 px-2 py-1 text-[10px] text-slate-300"
                          >
                            <Eye className="h-2.5 w-2.5" /> View
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Application Status & Check Link Column */}
                    <td className="p-3.5">
                      <div className="space-y-1.5">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          isApplied ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          job.status === 'tailored' ? 'bg-purple-500/20 text-purple-300' :
                          job.status === 'interview' ? 'bg-cyan-500/20 text-cyan-300' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {isApplied && <Check className="h-3 w-3 text-emerald-400" />}
                          {isApplied ? 'Applied' : job.status}
                        </span>

                        {job.confirmationId && (
                          <div className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                            <span>{job.confirmationId}</span>
                            <button onClick={(e) => handleCopyRef(job, e)} className="text-slate-400 hover:text-white">
                              {copiedJobId === job.id ? <Check className="h-2.5 w-2.5" /> : <Copy className="h-2.5 w-2.5" />}
                            </button>
                          </div>
                        )}

                        <div>
                          <a
                            href={statusUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 hover:underline"
                          >
                            Check Status <ArrowUpRight className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 text-right space-x-2">
                      <DirectLinkMenu job={job} size="sm" className="align-middle" />

                      <button
                        onClick={() => onSelectJobForReview(job)}
                        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* PREVIEW MODIFIED RESUME MODAL */}
      {/* ------------------------------------------------------------------ */}
      {previewResumeJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4 shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <FileCheck2 className="h-5 w-5 text-indigo-400" />
                  <h3 className="text-base font-bold text-white">
                    Attached Modified Resume – {previewResumeJob.company}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Role: {previewResumeJob.title} • ATS Score: {previewResumeJob.matchScore || 90}%
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleDownloadModifiedResume(previewResumeJob, e)}
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white"
                >
                  <Download className="h-3.5 w-3.5" /> Download (.txt)
                </button>
                <button
                  onClick={() => setPreviewResumeJob(null)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Resume Content View */}
            <div className="flex-1 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900/90 p-4 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
              {formatModifiedResumeText(previewResumeJob, masterResume)}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
              <span>Candidate: <strong>{masterResume.fullName}</strong></span>
              <a
                href={getApplicationStatusUrl(previewResumeJob)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-bold text-emerald-400 hover:underline"
              >
                Check Application on Portal <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
