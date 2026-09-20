import React, { useState } from 'react';
import { 
  Kanban, 
  Table, 
  Send, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  ExternalLink, 
  ChevronRight, 
  Building, 
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  Check,
  MapPin,
  Copy,
  Share2,
  FileCheck2
} from 'lucide-react';
import { JobPosting, JobStatus } from '../types';
import { formatShareableReferenceText } from '../utils/referenceExport';
import { DirectLinkMenu } from './DirectLinkMenu';

interface TrackerViewProps {
  jobs: JobPosting[];
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
  onUpdateJobStatus,
  onSelectJobForReview,
}) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
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

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Kanban className="h-6 w-6 text-emerald-400" />
              Verified Application & Submission Tracker
            </h1>
            <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-0.5 font-semibold">
              Live Proof Logging
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time pipeline tracking confirmed applications, submission proofs, direct portal URLs, and interview milestones for Ankit Sharma.
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
                className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-3 min-h-[500px]"
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

                      return (
                        <div
                          key={job.id}
                          className={`group rounded-xl border p-3.5 transition-all shadow-sm space-y-2.5 ${
                            isApplied 
                              ? 'border-emerald-500/40 bg-gradient-to-b from-slate-900 to-emerald-950/20' 
                              : 'border-slate-800 bg-slate-950/80 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span className="font-semibold text-indigo-400">{job.domain}</span>
                            <span className="text-[10px]">{job.platform}</span>
                          </div>

                          <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                            {job.title}
                          </h4>

                          <div className="text-[11px] text-slate-300">
                            <span className="font-semibold text-slate-200">{job.company}</span>
                            <div className="text-[10px] text-slate-500">{job.location}</div>
                          </div>

                          {/* Salary & Match */}
                          <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-900">
                            <span className="font-bold text-emerald-400">{job.salaryRange.split(' ')[0]}</span>
                            <span className="font-bold text-cyan-300">Match: {job.matchScore || 0}%</span>
                          </div>

                          {/* Application Status Badge */}
                          {isApplied && (
                            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              <CheckCircle2 className="h-3 w-3" /> Status: Applied
                            </div>
                          )}

                          {/* Application Reference Number Box */}
                          {job.confirmationId && (
                            <div className="rounded-lg bg-emerald-950/40 border border-emerald-500/30 p-1.5 space-y-1">
                              <div className="flex items-center justify-between text-[9px] text-slate-400 uppercase tracking-wider">
                                <span>Application Ref #:</span>
                                <button
                                  onClick={(e) => handleCopyRef(job, e)}
                                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5"
                                  title="Copy Reference"
                                >
                                  {copiedJobId === job.id ? <Check className="h-2.5 w-2.5" /> : <Copy className="h-2.5 w-2.5" />}
                                  {copiedJobId === job.id ? 'Copied' : 'Copy'}
                                </button>
                              </div>
                              <div className="text-[10px] font-mono font-bold text-emerald-300 truncate">
                                {job.confirmationId}
                              </div>
                            </div>
                          )}

                          {/* Quick Card Controls */}
                          <div className="flex items-center justify-between pt-1 text-xs gap-1">
                            <DirectLinkMenu job={job} size="sm" />

                            <button
                              onClick={() => onSelectJobForReview(job)}
                              className="text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 shrink-0"
                            >
                              <FileCheck2 className="h-2.5 w-2.5" />
                              {isApplied ? 'Modified Resume' : 'Inspect'}
                            </button>
                          </div>

                          {/* Share Reference Button if Applied */}
                          {isApplied && (
                            <button
                              onClick={(e) => handleShareRef(job, e)}
                              className="w-full text-center py-1 rounded-lg bg-indigo-950/40 text-indigo-300 hover:bg-indigo-900/50 border border-indigo-500/25 text-[10px] font-semibold flex items-center justify-center gap-1"
                            >
                              <Share2 className="h-2.5 w-2.5" />
                              {sharedJobId === job.id ? 'Slip Copied to Clipboard!' : 'Share Reference Slip'}
                            </button>
                          )}

                          {/* Quick Status advancement */}
                          {job.status === 'tailored' && (
                            <button
                              onClick={() => onUpdateJobStatus(job.id, 'applied')}
                              className="w-full text-center py-1 rounded-lg bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50 text-[10px] font-semibold"
                            >
                              Mark as Submitted
                            </button>
                          )}
                          {job.status === 'applied' && (
                            <button
                              onClick={() => onUpdateJobStatus(job.id, 'interview')}
                              className="w-full text-center py-1 rounded-lg bg-cyan-600/30 text-cyan-300 hover:bg-cyan-600/50 text-[10px] font-semibold"
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
                <th className="p-3.5">Domain</th>
                <th className="p-3.5">Location & CTC</th>
                <th className="p-3.5">ATS Match</th>
                <th className="p-3.5">Pipeline Status</th>
                <th className="p-3.5">Application Ref #</th>
                <th className="p-3.5 text-right">Actions & Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {jobs.map((job) => {
                const isApplied = job.status === 'applied';

                return (
                  <tr key={job.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-white">{job.title}</div>
                      <div className="text-[11px] text-cyan-400">{job.company}</div>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-400">{job.domain}</td>
                    <td className="p-3.5">
                      <div>{job.location}</div>
                      <div className="font-semibold text-emerald-400">{job.salaryRange}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-cyan-300">{job.matchScore || 0}%</span>
                      <div className="text-[10px] text-slate-500">{job.candidateRanking || 'Evaluated'}</div>
                    </td>
                    <td className="p-3.5">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        isApplied ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        job.status === 'tailored' ? 'bg-purple-500/20 text-purple-300' :
                        job.status === 'interview' ? 'bg-cyan-500/20 text-cyan-300' :
                        job.status === 'review_needed' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {isApplied ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            Applied
                          </>
                        ) : job.status}
                      </span>
                    </td>
                    <td className="p-3.5">
                      {job.confirmationId ? (
                        <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                          <span>{job.confirmationId}</span>
                          <button
                            onClick={(e) => handleCopyRef(job, e)}
                            className="text-slate-400 hover:text-emerald-300"
                            title="Copy Reference Number"
                          >
                            {copiedJobId === job.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-[10px]">Direct Portal Ready</span>
                      )}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <DirectLinkMenu job={job} size="sm" className="align-middle" />

                      {isApplied && (
                        <button
                          onClick={(e) => handleShareRef(job, e)}
                          className="inline-flex items-center gap-1 rounded-lg border border-indigo-500/30 bg-indigo-950/40 px-2 py-1 text-[11px] font-semibold text-indigo-300 hover:text-white"
                          title="Share Reference Slip"
                        >
                          <Share2 className="h-3 w-3" />
                          {sharedJobId === job.id ? 'Copied' : 'Share Ref'}
                        </button>
                      )}

                      <button
                        onClick={() => onSelectJobForReview(job)}
                        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-white ${
                          isApplied ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-500'
                        }`}
                      >
                        <FileCheck2 className="h-3 w-3" />
                        {isApplied ? 'Modified Resume' : 'Review'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
