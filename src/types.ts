export type PlatformName =
  | 'LinkedIn'
  | 'Naukri'
  | 'Indeed'
  | 'IIMJobs'
  | 'Company Career Page'
  | 'Glassdoor'
  | 'Foundit'
  | 'Google Jobs';

export type JobStatus =
  | 'discovered'
  | 'verified'
  | 'tailored'
  | 'review_needed'
  | 'confirmed'
  | 'applied'
  | 'interview'
  | 'rejected'
  | 'offer';

export type AgentName =
  | 'Job Hunter Agent'
  | 'Verification Agent'
  | 'JD Analyzer Agent'
  | 'Match Engine Agent'
  | 'Resume Agent'
  | 'Application Agent'
  | 'Tracker Agent'
  | 'Notification Agent';

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

export interface CandidatePreferences {
  targetTitles: string[];
  targetDomains: string[];
  primaryLocation: string;
  otherLocations: string[];
  minCtcLakhs: number; // in LPA, e.g. 14
  noticePeriodDays: number; // e.g. 90
  minMatchScoreToAutoApply: number; // >= 80%
  reviewThresholdMin: number; // 40% - 79%
  ignoreThresholdMax: number; // < 40%
  autoApplyMode: 'auto_pilot' | 'review' | 'manual_confirm';
  dailyScheduleTimes: string[]; // ["09:30 AM IST", "09:30 PM IST"]
}

export interface MasterResume {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github?: string;
  portfolio?: string;
  currentRole: string;
  currentCompany: string;
  experienceYears: number;
  noticePeriod: string;
  expectedCtc: string;
  headline: string;
  summary: string;
  skills: string[];
  coreCompetencies: string[];
  toolsAndPlatforms: string[];
  targetDomains: string[];
  targetRoles: string[];
  experience: WorkExperience[];
  education: EducationItem[];
  certifications: string[];
  preferences: CandidatePreferences;
}

export interface TailoredResume {
  tailoredHeadline: string;
  tailoredSummary: string;
  emphasizedSkills: string[];
  optimizedExperience: Array<{
    company: string;
    role: string;
    period: string;
    bullets: string[];
    highlightedKeywords: string[];
  }>;
  atsScoreBefore: number;
  atsScoreAfter: number;
  candidateRanking: 'Top 1% Candidate' | 'Top 5% Candidate' | 'Top 10% Candidate' | 'Strong Contender';
  keyAtsAdjustments: string[];
}

export interface VerificationDetails {
  isVerified: boolean;
  activeUrl: boolean;
  domainMatchesCompany: boolean;
  notExpired: boolean;
  notAggregatorScam: boolean;
  verificationSource: string;
  verifiedAt: string;
  duplicateHash?: string;
}

export interface JobPosting {
  id: string; // e.g. ANKIT-JOB-2026-001
  title: string;
  company: string;
  platform: PlatformName;
  location: string;
  remoteType: 'Hyderabad (Primary)' | 'Remote' | 'Hybrid' | 'On-site';
  salaryRange: string;
  salaryMinLakhs?: number; // to enforce ₹14 LPA rule
  postedDate: string;
  postedTimestamp?: string;
  experienceLevel: 'Executive / Chief Manager' | 'AVP / Senior Manager' | 'Manager' | 'Senior' | 'Lead';
  domain: 'General Insurance' | 'Insurance' | 'Banking' | 'Telecom' | 'Fintech' | 'Operations';
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  applyUrl: string; // exact direct application link
  directCareerUrl?: string;
  naukriUrl?: string; // Direct working Naukri portal link
  linkedInUrl?: string; // Complete redirectable LinkedIn post link
  availabilityStatus?: 'verified_active' | 'recheck_needed' | 'portal_active' | 'recently_updated';
  lastAvailabilityCheck?: string;
  
  // Agent Pipeline Fields
  verification: VerificationDetails;
  matchScore?: number; // 0 - 100
  matchTier?: 'Auto-Apply (>=80%)' | 'Review Required (40-79%)' | 'Ignored (<40%)';
  candidateRanking?: string;
  matchingSkills?: string[];
  missingSkills?: string[];
  matchSummary?: string;
  
  status: JobStatus;
  userConfirmed?: boolean;
  appliedAt?: string;
  confirmationId?: string;
  applicationProofUrl?: string;
  submissionVerified?: boolean;
  
  tailoredResume?: TailoredResume;
  coverLetter?: string;
  agentNotes?: string[];
}

export interface AgentExecutionStep {
  agent: AgentName;
  status: 'pending' | 'running' | 'success' | 'warning' | 'skipped';
  message: string;
  details?: string;
  timestamp: string;
}

export interface DailyStats {
  jobsSearchedToday: number;
  verifiedJobsToday: number;
  highMatchJobsToday: number; // >= 80%
  tailoredToday: number;
  autoAppliedToday: number;
  pendingReviewToday: number;
  interviewsScheduled: number;
  averageAtsMatch: number;
}

export interface ApplicationActivity {
  id: string;
  timestamp: string;
  type: 'search' | 'verify' | 'match' | 'tailor' | 'apply' | 'interview' | 'status_change' | 'notify';
  agent: AgentName;
  jobTitle: string;
  company: string;
  platform: PlatformName;
  message: string;
  badgeType: 'success' | 'info' | 'warning' | 'purple' | 'emerald';
}

export interface NotificationRecord {
  id: string;
  scheduledSlot: '09:30 AM IST' | '09:30 PM IST' | 'Ad-hoc';
  date: string;
  jobsFoundCount: number;
  verifiedCount: number;
  appliedCount: number;
  reviewNeededCount: number;
  summaryText: string;
  topOpportunities: Array<{
    title: string;
    company: string;
    score: number;
    applyUrl: string;
  }>;
}
