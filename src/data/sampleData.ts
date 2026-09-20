import { MasterResume, JobPosting, ApplicationActivity, NotificationRecord, DailyStats } from '../types';

export const INITIAL_ANKIT_STATS: DailyStats = {
  jobsSearchedToday: 18,
  verifiedJobsToday: 14,
  highMatchJobsToday: 4,
  tailoredToday: 4,
  autoAppliedToday: 4,
  pendingReviewToday: 1,
  interviewsScheduled: 2,
  averageAtsMatch: 92
};

export const ANKIT_SHARMA_MASTER_RESUME: MasterResume = {
  fullName: "Ankit Sharma",
  email: "ankit.sharma.ops@gmail.com",
  phone: "+91 98765 43210",
  location: "Hyderabad, Telangana, India (Open to Remote / Hybrid)",
  linkedin: "linkedin.com/in/ankit-sharma-operations",
  portfolio: "ankitsharma-ops.in",
  currentRole: "Chief Manager – Operations",
  currentCompany: "ICICI Lombard General Insurance",
  experienceYears: 10,
  noticePeriod: "90 Days",
  expectedCtc: "₹14 LPA and above (Target: ₹16 - ₹24 LPA)",
  headline: "Chief Manager – Operations | Customer Experience, Process Transformation, STP Automation & Analytics Leader",
  summary: "Accomplished Operations and Customer Experience Leader with 10+ years of distinguished track record at ICICI Lombard General Insurance and leading BFSI institutions. Expertise in driving enterprise-scale operational excellence, Straight-Through Processing (STP) automation, omnichannel customer service transformation, analytics-driven claims/policy governance, and cross-functional team leadership across multi-location hubs.",
  skills: [
    "Operations Management", "Customer Experience (CX)", "Straight-Through Processing (STP)",
    "Process Excellence & Lean Six Sigma", "Process Re-engineering", "Turnaround Time (TAT) Optimization",
    "Power BI", "Advanced Excel (VBA/Macros)", "Tableau", "SQL", "Python (Pandas, NumPy)",
    "CRM & S CRM Systems", "UCV (Unified Customer View)", "Muse Architecture", "IVR & Omnichannel Routing",
    "General Insurance Operations", "Banking & Financial Services (BFSI)", "Telecom Operations",
    "Regulatory Compliance (IRDAI)", "Risk Governance & Audit", "Vendor & Partner Management",
    "Team Leadership (50+ Members)", "P&L / Cost Optimization", "Quality Assurance & SLA Management"
  ],
  coreCompetencies: [
    "Enterprise Operations Leadership",
    "Omnichannel Customer Experience & NPS Uplift",
    "Digital Operations & STP Workflow Automation",
    "Business Transformation & Change Governance",
    "Data-Driven Decision Making & Analytics Dashboards",
    "IRDAI Regulatory Compliance & Risk Controls",
    "Regional / Cluster Multi-Hub Administration",
    "Customer Escalation Resolution & Retention Strategies"
  ],
  toolsAndPlatforms: [
    "Power BI", "Tableau", "SQL (PostgreSQL / MSSQL)", "Python (Pandas, NumPy)",
    "Advanced Excel / VBA", "S CRM / Salesforce", "UCV (Unified Customer View)",
    "Muse Core Insurance Platform", "Genesys / Avaya IVR", "Jira / Confluence"
  ],
  targetDomains: [
    "General Insurance",
    "Insurance (Life / Health / General)",
    "Banking & Financial Services (BFSI)",
    "Telecom"
  ],
  targetRoles: [
    "Chief Manager – Operations",
    "Senior Manager – Operations",
    "Manager – Operations",
    "AVP – Operations",
    "Chief Manager – Customer Experience",
    "Senior Manager – Customer Experience",
    "Manager – Customer Experience",
    "AVP – Customer Experience",
    "Customer Service / Success Manager",
    "Operations Analytics Manager",
    "Process Excellence & Quality Lead",
    "Business Transformation Leader",
    "Automation & Digital Operations Lead",
    "Cluster / Regional Operations Manager"
  ],
  experience: [
    {
      id: "exp-icici-lombard",
      company: "ICICI Lombard General Insurance",
      role: "Chief Manager – Operations",
      period: "2021 - Present",
      location: "Hyderabad, India",
      achievements: [
        "Head operations for critical insurance policy issuance, endorsements, and customer query lifecycle, managing a high-performing unit of 65+ professionals.",
        "Pioneered Straight-Through Processing (STP) initiatives for retail and corporate insurance policies, boosting digital issuance rate by 42% and trimming TAT from 48 hours to under 2 hours.",
        "Deployed enterprise Power BI dashboards tracking real-time turnaround time (TAT), SLA adherence, customer complaints volume, and operational bottleneck indicators.",
        "Led integration of Unified Customer View (UCV) and Muse CRM across branch and digital channels, boosting First Contact Resolution (FCR) by 28% and Net Promoter Score (NPS) by 19 points.",
        "Ensured 100% adherence to IRDAI regulatory guidelines, audit protocols, and data protection requirements across all processing pipelines."
      ]
    },
    {
      id: "exp-prev-ops",
      company: "ICICI Lombard General Insurance",
      role: "Senior Manager – Operations & Process Excellence",
      period: "2017 - 2021",
      location: "Hyderabad, India",
      achievements: [
        "Directed operational quality and workflow re-engineering across general insurance underwriting support and policy servicing.",
        "Automated recurring validation workflows using Python (Pandas) and SQL data pipelines, slashing manual audit effort by 350+ person-hours monthly.",
        "Spearheaded multi-city customer support desk optimization, restructuring IVR queue routing logic to reduce customer call abandonment rate by 34%.",
        "Conducted monthly performance scorecards, Lean Six Sigma Kaizen sprints, and workforce training programs for 40+ operations analysts."
      ]
    },
    {
      id: "exp-early-ops",
      company: "Leading Financial & Insurance Services Provider",
      role: "Manager – Operations & Customer Experience",
      period: "2014 - 2017",
      location: "Hyderabad, India",
      achievements: [
        "Supervised day-to-day policy administration, customer onboarding documentation, and grievance redressal cells.",
        "Introduced structured escalation matrix and CRM ticketing governance, decreasing unresolved grievance backlog by 62%.",
        "Partnered with IT and Product engineering teams to build automated reconciliation tools in Advanced Excel and SQL."
      ]
    }
  ],
  education: [
    {
      degree: "Master of Business Administration (MBA) – Operations & Finance",
      institution: "Premier Management Institute, India",
      year: "2012 - 2014"
    },
    {
      degree: "Bachelor of Technology / Commerce (Honors)",
      institution: "State University",
      year: "2008 - 2012"
    }
  ],
  certifications: [
    "Lean Six Sigma Green Belt (Process Excellence & Operations)",
    "Licentiate / Associate in General Insurance (Insurance Institute of India)",
    "Microsoft Certified: Power BI Data Analyst Associate",
    "Python for Financial Analytics & Automation (Specialization)"
  ],
  preferences: {
    targetTitles: [
      "Chief Manager – Operations",
      "Senior Manager – Operations",
      "Manager – Operations",
      "AVP – Operations",
      "Chief Manager – Customer Experience",
      "Senior Manager – Customer Experience",
      "AVP – Customer Experience",
      "Customer Service / Success Manager",
      "Process Excellence Lead",
      "Cluster / Regional Operations Manager"
    ],
    targetDomains: ["General Insurance", "Insurance", "Banking", "Telecom"],
    primaryLocation: "Hyderabad",
    otherLocations: ["Remote", "Hybrid", "Bengaluru", "Pune", "Mumbai"],
    minCtcLakhs: 14,
    noticePeriodDays: 90,
    minMatchScoreToAutoApply: 80,
    reviewThresholdMin: 40,
    ignoreThresholdMax: 40,
    autoApplyMode: "auto_pilot",
    dailyScheduleTimes: ["09:30 AM IST", "09:30 PM IST"]
  }
};

export const INITIAL_ANKIT_JOBS: JobPosting[] = [
  {
    id: "ANKIT-JOB-2026-001",
    title: "Chief Manager – Operations & Customer Experience",
    company: "Tata AIG General Insurance",
    platform: "LinkedIn",
    location: "Hyderabad, Telangana",
    remoteType: "Hyderabad (Primary)",
    salaryRange: "₹18,00,000 - ₹24,00,000 PA",
    salaryMinLakhs: 18,
    postedDate: "Today (2 hours ago)",
    postedTimestamp: new Date().toISOString(),
    experienceLevel: "Executive / Chief Manager",
    domain: "General Insurance",
    description: "Lead regional operations hub for retail non-life underwriting support, policy issuance, grievance governance, and customer experience SLAs. Manage 50+ operations analysts and drive STP initiatives, Power BI performance tracking, and IRDAI compliance.",
    requiredSkills: ["Operations Management", "Customer Experience (CX)", "Straight-Through Processing (STP)", "Power BI", "Team Leadership"],
    preferredSkills: ["Lean Six Sigma", "IRDAI Compliance", "Grievance Management"],
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Tata+AIG+Chief+Manager+Operations&location=Hyderabad%2C+Telangana%2C+India",
    directCareerUrl: "https://www.tataaig.com/careers",
    naukriUrl: "https://www.naukri.com/tata-aig-general-insurance-company-jobs-careers-109012",
    linkedInUrl: "https://www.linkedin.com/jobs/search/?keywords=Tata+AIG+Chief+Manager+Operations&location=Hyderabad%2C+Telangana%2C+India",
    availabilityStatus: "verified_active",
    lastAvailabilityCheck: "Live Verified Today",
    verification: {
      isVerified: true,
      activeUrl: true,
      domainMatchesCompany: true,
      notExpired: true,
      notAggregatorScam: true,
      verificationSource: "Tata AIG Official Careers + LinkedIn Complete Post",
      verifiedAt: "09:30 AM IST Today",
      duplicateHash: "tataaig_chiefmanager_hyd_9812"
    },
    matchScore: 94,
    matchTier: "Auto-Apply (>=80%)",
    candidateRanking: "Top 1% Candidate",
    matchingSkills: ["Operations Management", "Customer Experience (CX)", "Straight-Through Processing (STP)", "Power BI", "Team Leadership", "IRDAI Compliance"],
    missingSkills: [],
    matchSummary: "Exceptional alignment: Ankit's current role as Chief Manager - Operations at ICICI Lombard (10+ yrs exp, 65+ team size, STP 42% uplift) matches 100% of core responsibilities and exceeds the ₹14 LPA threshold.",
    status: "applied",
    userConfirmed: true,
    appliedAt: "09:34 AM IST Today",
    confirmationId: "TATAAIG-OPS-HYD-998241",
    applicationProofUrl: "https://www.tataaig.com/careers",
    submissionVerified: true,
    tailoredResume: {
      tailoredHeadline: "Chief Manager – Operations & Customer Experience | 10+ Yrs ICICI Lombard Leadership | STP Automation & TAT Optimization",
      tailoredSummary: "Accomplished Chief Manager – Operations with 10+ years at ICICI Lombard General Insurance, driving retail policy issuance, turnaround time (TAT) compression, and Straight-Through Processing (STP) to 42%. Proven leader of 65+ operations teams with expert deployment of Power BI dashboards, UCV CRM systems, and strict IRDAI compliance.",
      emphasizedSkills: ["Straight-Through Processing (STP)", "Operations Management", "Customer Experience (CX)", "Power BI", "Turnaround Time (TAT) Optimization", "Team Leadership"],
      optimizedExperience: [
        {
          company: "ICICI Lombard General Insurance",
          role: "Chief Manager – Operations",
          period: "2021 - Present",
          bullets: [
            "Lead regional operations handling policy issuance, endorsements, and customer query lifecycle with a 65+ member unit.",
            "Pioneered Straight-Through Processing (STP) initiatives, increasing issuance velocity by 42% and slashing policy turnaround time from 48 hrs to <2 hrs.",
            "Architected Power BI real-time operations dashboards tracking SLA adherence, error ratios, and customer grievance volume.",
            "Spearheaded CRM (UCV & Muse) integration, driving First Contact Resolution (FCR) up 28% and Net Promoter Score (NPS) by 19 points."
          ],
          highlightedKeywords: ["STP", "Power BI", "Turnaround Time", "Customer Experience", "IRDAI"]
        }
      ],
      atsScoreBefore: 88,
      atsScoreAfter: 96,
      candidateRanking: "Top 1% Candidate",
      keyAtsAdjustments: [
        "Aligned executive headline directly with Tata AIG's Chief Manager - Operations & CX requirements",
        "Highlighted 10+ years General Insurance tenure at ICICI Lombard without fabricating experience",
        "Quantified 65+ team leadership and 42% Straight-Through Processing achievements"
      ]
    },
    coverLetter: "Dear Hiring Team at Tata AIG General Insurance,\n\nI am writing to formally express my interest in the Chief Manager – Operations & Customer Experience position in Hyderabad. Having spent over a decade leading operations and customer service transformation at ICICI Lombard General Insurance, I have directed high-volume policy administration, Straight-Through Processing (STP) automation, and customer experience excellence for a 65+ member unit.\n\nAt ICICI Lombard, I drove our digital STP rate to 42% while compressing turnaround time (TAT) from 48 hours to under 2 hours. By deploying real-time Power BI telemetry and integrating Unified Customer View (UCV) systems, our unit lifted NPS by 19 points and First Contact Resolution by 28%, maintaining full IRDAI compliance across all audit cycles.\n\nTata AIG's emphasis on operational rigor, tech-enabled servicing, and customer centricity in Hyderabad aligns directly with my core competencies. Never fabricating experience, my decade-long tenure within top-tier general insurance operations provides immediate, turnkey leadership.\n\nThank you for your consideration. I look forward to discussing how my experience can contribute to Tata AIG's continued operational excellence.\n\nSincerely,\nAnkit Sharma\nChief Manager – Operations | ICICI Lombard\nHyderabad, India | +91 98765 43210"
  },
  {
    id: "ANKIT-JOB-2026-002",
    title: "AVP / Senior Manager – Digital Operations & Transformation",
    company: "HDFC ERGO General Insurance",
    platform: "Company Career Page",
    location: "Hyderabad / Hybrid",
    remoteType: "Hybrid",
    salaryRange: "₹20,00,000 - ₹26,00,000 PA",
    salaryMinLakhs: 20,
    postedDate: "Today (4 hours ago)",
    postedTimestamp: new Date().toISOString(),
    experienceLevel: "AVP / Senior Manager",
    domain: "General Insurance",
    description: "Seeking an accomplished General Insurance Operations leader to head digital operations, process automation, STP conversion, and customer journey optimization across Telugu states. Direct ownership of operational KPIs, Lean Six Sigma Kaizens, and cross-functional technology integrations.",
    requiredSkills: ["Operations Transformation", "Digital Operations", "Straight-Through Processing", "Power BI", "Lean Six Sigma"],
    preferredSkills: ["Python", "SQL", "Robotic Process Automation"],
    applyUrl: "https://www.hdfcergo.com/careers",
    directCareerUrl: "https://www.hdfcergo.com/careers",
    naukriUrl: "https://www.naukri.com/hdfc-ergo-general-insurance-jobs-careers-17367",
    linkedInUrl: "https://www.linkedin.com/jobs/search/?keywords=HDFC+ERGO+Digital+Operations&location=Hyderabad%2C+Telangana%2C+India",
    availabilityStatus: "verified_active",
    lastAvailabilityCheck: "Live Verified Today",
    verification: {
      isVerified: true,
      activeUrl: true,
      domainMatchesCompany: true,
      notExpired: true,
      notAggregatorScam: true,
      verificationSource: "HDFC ERGO Official Career Portal",
      verifiedAt: "09:30 AM IST Today",
      duplicateHash: "hdfcergo_avp_digitalops_hyd_4029"
    },
    matchScore: 91,
    matchTier: "Auto-Apply (>=80%)",
    candidateRanking: "Top 1% Candidate",
    matchingSkills: ["Operations Transformation", "Digital Operations", "Straight-Through Processing", "Power BI", "Lean Six Sigma", "SQL", "Python"],
    missingSkills: [],
    matchSummary: "Superb fit: Matches Ankit's exact experience leading digital operations and Lean Six Sigma automation at ICICI Lombard. Exceeds CTC requirement (₹20-26 LPA vs ₹14 LPA minimum).",
    status: "applied",
    userConfirmed: true,
    appliedAt: "09:35 AM IST Today",
    confirmationId: "HDFCERGO-OP-7731-SUBMITTED",
    applicationProofUrl: "https://www.hdfcergo.com/careers",
    submissionVerified: true,
    coverLetter: "Dear Leadership Team at HDFC ERGO General Insurance,\n\nI am pleased to present my application for the AVP / Senior Manager – Digital Operations & Transformation role in Hyderabad. With 10+ years of dedicated service in General Insurance operations at ICICI Lombard, I have continually delivered automation, Straight-Through Processing (STP) expansion, and Lean Six Sigma workflow improvements.\n\nMy focus on leveraging Power BI dashboards, Python data pipelines, and advanced CRM infrastructure will ensure HDFC ERGO's regional operational hubs achieve superior turnaround times and unmatched customer satisfaction.\n\nI look forward to discussing how my experience can benefit HDFC ERGO.\n\nSincerely,\nAnkit Sharma\nHyderabad, India | +91 98765 43210"
  },
  {
    id: "ANKIT-JOB-2026-003",
    title: "Senior Manager – Customer Experience (CX) & Operations",
    company: "Bajaj Allianz General Insurance",
    platform: "Naukri",
    location: "Hyderabad",
    remoteType: "Hyderabad (Primary)",
    salaryRange: "₹16,00,000 - ₹21,00,000 PA",
    salaryMinLakhs: 16,
    postedDate: "Yesterday",
    postedTimestamp: new Date().toISOString(),
    experienceLevel: "AVP / Senior Manager",
    domain: "General Insurance",
    description: "Manage Hyderabad regional service delivery operations, customer query lifecycle, NPS enhancement, escalation management, and customer experience quality audit. Collaborate with Underwriting and Claims to reduce end-to-end TAT.",
    requiredSkills: ["Customer Experience", "Operations Management", "NPS Improvement", "Escalation Management", "Power BI"],
    preferredSkills: ["Tableau", "Six Sigma", "Team Mentorship"],
    applyUrl: "https://www.naukri.com/bajaj-allianz-general-insurance-company-jobs-careers-18451",
    directCareerUrl: "https://www.bajajallianz.com/careers.html",
    naukriUrl: "https://www.naukri.com/bajaj-allianz-general-insurance-company-jobs-careers-18451",
    linkedInUrl: "https://www.linkedin.com/jobs/search/?keywords=Bajaj+Allianz+General+Insurance+Operations+Customer+Experience&location=Hyderabad%2C+Telangana%2C+India",
    availabilityStatus: "verified_active",
    lastAvailabilityCheck: "Live Verified Today",
    verification: {
      isVerified: true,
      activeUrl: true,
      domainMatchesCompany: true,
      notExpired: true,
      notAggregatorScam: true,
      verificationSource: "Bajaj Allianz Careers + Naukri Verified Recruiter Portal",
      verifiedAt: "09:30 AM IST Today",
      duplicateHash: "bajajallianz_cx_hyd"
    },
    matchScore: 89,
    matchTier: "Auto-Apply (>=80%)",
    candidateRanking: "Top 5% Candidate",
    matchingSkills: ["Customer Experience", "Operations Management", "NPS Improvement", "Escalation Management", "Power BI", "Tableau"],
    missingSkills: [],
    matchSummary: "Direct alignment with Ankit's NPS uplift (+19 pts) and First Contact Resolution (+28%) initiatives using UCV and CRM systems at ICICI Lombard. Exceeds ₹14 LPA threshold.",
    status: "applied",
    userConfirmed: true,
    appliedAt: "09:35 AM IST Today",
    confirmationId: "BAGIC-CX-HYD-5501",
    applicationProofUrl: "https://www.bajajallianz.com/careers.html",
    submissionVerified: true,
  },
  {
    id: "ANKIT-JOB-2026-004",
    title: "Chief Manager – Regional Operations & Service Delivery",
    company: "Axis Bank (Retail BFSI & Insurance Division)",
    platform: "IIMJobs",
    location: "Hyderabad",
    remoteType: "Hyderabad (Primary)",
    salaryRange: "₹18,00,000 - ₹23,00,000 PA",
    salaryMinLakhs: 18,
    postedDate: "Yesterday",
    postedTimestamp: new Date().toISOString(),
    experienceLevel: "Executive / Chief Manager",
    domain: "Banking",
    description: "Head regional operations across banking and third-party insurance distribution. Drive customer servicing operations, TAT compliance, operational risk controls, and automated reconciliation.",
    requiredSkills: ["Operations Management", "BFSI Operations", "Risk Governance", "Team Leadership", "Analytics"],
    preferredSkills: ["Bancassurance", "SQL", "Power BI"],
    applyUrl: "https://www.iimjobs.com/search?k=Axis+Bank+Operations+Chief+Manager&loc=Hyderabad",
    directCareerUrl: "https://www.axisbank.com/careers",
    naukriUrl: "https://www.naukri.com/axis-bank-jobs-careers-415",
    linkedInUrl: "https://www.linkedin.com/jobs/search/?keywords=Axis+Bank+Chief+Manager+Operations&location=Hyderabad%2C+Telangana%2C+India",
    availabilityStatus: "verified_active",
    lastAvailabilityCheck: "Live Verified Today",
    verification: {
      isVerified: true,
      activeUrl: true,
      domainMatchesCompany: true,
      notExpired: true,
      notAggregatorScam: true,
      verificationSource: "Axis Bank Official Careers & IIMJobs Verified Post",
      verifiedAt: "09:30 AM IST Today",
      duplicateHash: "axisbank_darwinbox_ops_hyd"
    },
    matchScore: 87,
    matchTier: "Auto-Apply (>=80%)",
    candidateRanking: "Top 5% Candidate",
    matchingSkills: ["Operations Management", "BFSI Operations", "Risk Governance", "Team Leadership", "Analytics", "Power BI", "SQL"],
    missingSkills: [],
    matchSummary: "Strong fit in BFSI / Banking domain. Ankit's 10+ yrs ICICI Lombard experience managing large-scale insurance & banking distribution operations fulfills all requirements. ₹18-23 LPA is above ₹14 LPA floor.",
    status: "applied",
    userConfirmed: true,
    appliedAt: "09:35 AM IST Today",
    confirmationId: "AXIS-DARWIN-OPS-4109",
    applicationProofUrl: "https://www.axisbank.com/careers",
    submissionVerified: true,
  },
  {
    id: "ANKIT-JOB-2026-005",
    title: "Manager / Senior Manager – Operational Excellence & Automation",
    company: "Bharti Airtel (Airtel Payments & Telecom Operations)",
    platform: "LinkedIn",
    location: "Hyderabad / Bengaluru (Hybrid)",
    remoteType: "Hybrid",
    salaryRange: "₹16,00,000 - ₹20,00,000 PA",
    salaryMinLakhs: 16,
    postedDate: "2 days ago",
    postedTimestamp: new Date().toISOString(),
    experienceLevel: "AVP / Senior Manager",
    domain: "Telecom",
    description: "Drive telecom operations workflows, IVR call routing automation, digital customer onboarding, and analytics-driven SLA governance. Candidates with 8-12 years in service operations and process re-engineering preferred.",
    requiredSkills: ["Process Re-engineering", "IVR Routing", "Operations Management", "Power BI", "Customer Experience"],
    preferredSkills: ["Python", "SQL"],
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Bharti+Airtel+Operations+Excellence&location=Hyderabad%2C+Telangana%2C+India",
    directCareerUrl: "https://www.airtel.in/careers/",
    naukriUrl: "https://www.naukri.com/bharti-airtel-jobs-careers-317",
    linkedInUrl: "https://www.linkedin.com/jobs/search/?keywords=Bharti+Airtel+Operations+Excellence&location=Hyderabad%2C+Telangana%2C+India",
    availabilityStatus: "verified_active",
    lastAvailabilityCheck: "Live Verified Today",
    verification: {
      isVerified: true,
      activeUrl: true,
      domainMatchesCompany: true,
      notExpired: true,
      notAggregatorScam: true,
      verificationSource: "Airtel Official Careers + LinkedIn Complete Post",
      verifiedAt: "09:30 AM IST Today",
      duplicateHash: "airtel_ops_excellence_hyd"
    },
    matchScore: 85,
    matchTier: "Auto-Apply (>=80%)",
    candidateRanking: "Top 5% Candidate",
    matchingSkills: ["Process Re-engineering", "IVR Routing", "Operations Management", "Power BI", "Customer Experience", "Python", "SQL"],
    missingSkills: [],
    matchSummary: "Matches target domain (Telecom) and Ankit's proven track record restructuring IVR routing (reducing call abandonment by 34%) and driving Python data pipelines.",
    status: "tailored",
    userConfirmed: false,
    tailoredResume: {
      tailoredHeadline: "Manager / Senior Manager – Operational Excellence & Automation | 10+ Yrs Operations & IVR Optimization",
      tailoredSummary: "Accomplished operations leader with 10+ years at ICICI Lombard General Insurance, driving IVR routing restructuring, turnaround time (TAT) compression, and Straight-Through Processing (STP). Expertise in deploying Python/SQL pipelines and Power BI dashboards to optimize multi-hub service delivery.",
      emphasizedSkills: ["Process Re-engineering", "IVR Routing", "Operations Management", "Power BI", "Customer Experience"],
      optimizedExperience: [],
      atsScoreBefore: 80,
      atsScoreAfter: 94,
      candidateRanking: "Top 5% Candidate",
      keyAtsAdjustments: ["Emphasized IVR optimization and Python data pipelines"]
    }
  },
  {
    id: "ANKIT-JOB-2026-006",
    title: "Senior Manager – Fraud Analytics & Claims Operations",
    company: "Star Health & Allied Insurance",
    platform: "Naukri",
    location: "Hyderabad",
    remoteType: "Hyderabad (Primary)",
    salaryRange: "₹15,00,000 - ₹19,00,000 PA",
    salaryMinLakhs: 15,
    postedDate: "2 days ago",
    postedTimestamp: new Date().toISOString(),
    experienceLevel: "AVP / Senior Manager",
    domain: "Insurance",
    description: "Manage health insurance claims investigation, fraud pattern detection, operations quality assurance, and provider network audits. Strong analytics background required.",
    requiredSkills: ["Operations Management", "Claims Analytics", "Risk Controls", "Power BI", "Audit Governance"],
    preferredSkills: ["Health Insurance", "Fraud Detection"],
    applyUrl: "https://www.naukri.com/star-health-allied-insurance-co-jobs-careers-19519",
    directCareerUrl: "https://www.starhealth.in/careers",
    naukriUrl: "https://www.naukri.com/star-health-allied-insurance-co-jobs-careers-19519",
    linkedInUrl: "https://www.linkedin.com/jobs/search/?keywords=Star+Health+Claims+Operations&location=Hyderabad%2C+Telangana%2C+India",
    availabilityStatus: "verified_active",
    lastAvailabilityCheck: "Live Verified Today",
    verification: {
      isVerified: true,
      activeUrl: true,
      domainMatchesCompany: true,
      notExpired: true,
      notAggregatorScam: true,
      verificationSource: "Star Health Official Career Portal + Naukri Recruiter",
      verifiedAt: "09:30 AM IST Today",
      duplicateHash: "starhealth_claims_ops_hyd"
    },
    matchScore: 68,
    matchTier: "Review Required (40-79%)",
    candidateRanking: "Strong Contender",
    matchingSkills: ["Operations Management", "Risk Controls", "Power BI", "Audit Governance"],
    missingSkills: ["Health Claims Medical Investigation"],
    matchSummary: "Falls into 40-79% Review Required Tier: Ankit has strong General Insurance operations and risk governance expertise, but specific medical health claims fraud investigation requires Ankit's review before application.",
    status: "review_needed",
    userConfirmed: false,
    agentNotes: ["40-79% Match Tier: Tagged for Ankit's review due to niche medical claims focus."]
  }
];

export const INITIAL_ANKIT_ACTIVITIES: ApplicationActivity[] = [
  {
    id: "act-ankit-1",
    timestamp: "09:30 AM IST Today",
    type: "search",
    agent: "Job Hunter Agent",
    jobTitle: "Scheduled Morning Scan",
    company: "Multi-Platform Hunter",
    platform: "LinkedIn",
    message: "Discovered 18 postings across LinkedIn, Naukri, Indeed, IIMJobs & Direct Career Portals matching Target Roles (Chief Manager / Operations / CX in Hyderabad, General Insurance/BFSI/Telecom, ₹14LPA+).",
    badgeType: "info"
  },
  {
    id: "act-ankit-2",
    timestamp: "09:31 AM IST Today",
    type: "verify",
    agent: "Verification Agent",
    jobTitle: "Deduplication & Authenticity Audit",
    company: "Verification Engine",
    platform: "Company Career Page",
    message: "Verified 14 active career URLs. Filtered out 3 duplicate aggregator reposts and 1 posting below ₹14 LPA threshold.",
    badgeType: "emerald"
  },
  {
    id: "act-ankit-3",
    timestamp: "09:32 AM IST Today",
    type: "match",
    agent: "Match Engine Agent",
    jobTitle: "Chief Manager – Operations",
    company: "Tata AIG General Insurance",
    platform: "LinkedIn",
    message: "Computed 94% ATS Match Score (Top 1% Candidate). Categorized into 'Auto-Apply' tier (>=80%). Direct career portal link validated.",
    badgeType: "purple"
  },
  {
    id: "act-ankit-4",
    timestamp: "09:33 AM IST Today",
    type: "tailor",
    agent: "Resume Agent",
    jobTitle: "Chief Manager – Operations",
    company: "Tata AIG General Insurance",
    platform: "LinkedIn",
    message: "Tailored Ankit's Master Resume: Highlighted 10+ yrs ICICI Lombard experience, STP automation metrics, and drafted personalized Tata AIG cover letter.",
    badgeType: "purple"
  },
  {
    id: "act-ankit-5",
    timestamp: "09:34 AM IST Today",
    type: "apply",
    agent: "Application Agent",
    jobTitle: "Chief Manager – Operations",
    company: "Tata AIG General Insurance",
    platform: "LinkedIn",
    message: "Direct application submitted to Tata AIG Workday Portal. Confirmation Receipt Proof ID: TATAAIG-OPS-HYD-998241 captured and stored.",
    badgeType: "success"
  },
  {
    id: "act-ankit-6",
    timestamp: "09:35 AM IST Today",
    type: "apply",
    agent: "Application Agent",
    jobTitle: "AVP / Senior Manager – Digital Operations",
    company: "HDFC ERGO General Insurance",
    platform: "Company Career Page",
    message: "Application submitted and proof logged: HDFCERGO-OP-7731-SUBMITTED. Tracker updated.",
    badgeType: "success"
  },
  {
    id: "act-ankit-7",
    timestamp: "09:36 AM IST Today",
    type: "notify",
    agent: "Notification Agent",
    jobTitle: "Daily Morning Digest (09:30 AM IST)",
    company: "Notification Dispatcher",
    platform: "LinkedIn",
    message: "09:30 AM IST scheduled briefing compiled: 4 applications submitted, 3 tailored ready, 1 pending manual review.",
    badgeType: "info"
  }
];

export const ANKIT_SCHEDULED_NOTIFICATIONS: NotificationRecord[] = [
  {
    id: "notif-slot-morning-today",
    scheduledSlot: "09:30 AM IST",
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    jobsFoundCount: 18,
    verifiedCount: 14,
    appliedCount: 4,
    reviewNeededCount: 1,
    summaryText: "Morning 09:30 AM IST run completed for Ankit Sharma. 4 top-tier roles (Tata AIG, HDFC ERGO, Bajaj Allianz, Axis Bank) submitted with direct confirmation IDs. 3 jobs tailored and ready for one-click submission. 1 fraud analytics role tagged for manual review.",
    topOpportunities: [
      {
        title: "Chief Manager – Operations & Customer Experience",
        company: "Tata AIG General Insurance",
        score: 94,
        applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Tata+AIG+Chief+Manager+Operations&location=Hyderabad%2C+Telangana%2C+India"
      },
      {
        title: "AVP / Senior Manager – Digital Operations & Transformation",
        company: "HDFC ERGO General Insurance",
        score: 91,
        applyUrl: "https://www.hdfcergo.com/careers"
      },
      {
        title: "Senior Manager – Customer Experience (CX) & Operations",
        company: "Bajaj Allianz General Insurance",
        score: 89,
        applyUrl: "https://www.naukri.com/bajaj-allianz-general-insurance-company-jobs-careers-18451"
      }
    ]
  }
];
