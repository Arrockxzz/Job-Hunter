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
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  employmentType?: 'Full-time' | 'Contract' | 'Part-time' | 'Freelance';
  location: string;
  achievements: string[];
  toolsUsed?: string[];
}

export interface EducationItem {
  id?: string;
  degree: string;
  institution: string;
  specialization?: string;
  year: string;
  startYear?: string;
  endYear?: string;
  courseType?: 'Full-time' | 'Part-time' | 'Correspondence / Distance';
  gradingSystem?: 'Percentage' | 'CGPA';
  grade?: string;
}

export interface LanguageSkill {
  language: string;
  proficiency: 'Beginner' | 'Conversational' | 'Proficient' | 'Fluent' | 'Native';
  read: boolean;
  write: boolean;
  speak: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client?: string;
  duration: string;
  role: string;
  description: string;
  outcomes: string[];
}

export interface DetailedCertification {
  id: string;
  name: string;
  issuingOrg: string;
  issueYear: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface ResumeAttachment {
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  fileType: string;
  dataUrl?: string;
  parsedText?: string;
}

export interface UserProfileAccount {
  email: string;
  name: string;
  avatarUrl?: string;
  provider: 'google';
  lastLogin: string;
  isSavedToCloud: boolean;
}

export interface CandidatePreferences {
  candidateName?: string;
  candidateCurrentRole?: string;
  experienceYears?: number;
  policyPresetName?: string;
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
  preferredEmploymentTypes?: string[];
  workModel?: 'Hybrid' | 'Remote' | 'On-site' | 'Any';
}

export interface MasterResume {
  fullName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  location: string;
  currentCity?: string;
  currentPincode?: string;
  preferredLocations?: string[];
  willingToRelocate?: boolean;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  maritalStatus?: 'Single' | 'Married' | 'Other';
  differentlyAbled?: 'No' | 'Yes';
  linkedin: string;
  github?: string;
  portfolio?: string;
  currentRole: string;
  currentCompany: string;
  experienceYears: number;
  totalExperienceMonths?: number;
  functionalArea?: string;
  industry?: string;
  noticePeriod: string;
  lastWorkingDay?: string;
  currentCtc?: string;
  expectedCtc: string;
  expectedCtcMin?: number;
  expectedCtcMax?: number;
  headline: string;
  summary: string;
  skills: string[];
  coreCompetencies: string[];
  toolsAndPlatforms: string[];
  languages?: LanguageSkill[];
  targetDomains: string[];
  targetRoles: string[];
  experience: WorkExperience[];
  education: EducationItem[];
  certifications: string[];
  certificationsDetailed?: DetailedCertification[];
  projects?: PortfolioProject[];
  resumeAttachment?: ResumeAttachment;
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
