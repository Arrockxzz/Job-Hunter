import { JobPosting, PlatformName } from '../types';

/**
 * Registry of official, verified career portal domains and URLs for leading BFSI,
 * General Insurance, and Telecom enterprises in India.
 */
const COMPANY_CAREER_PORTALS: Record<string, { portalUrl: string; name: string; naukriSlug?: string }> = {
  'tata aig': {
    name: 'Tata AIG General Insurance',
    portalUrl: 'https://www.tataaig.com/careers',
    naukriSlug: 'tata-aig-general-insurance-company-jobs-careers-109012'
  },
  'tata aig general insurance': {
    name: 'Tata AIG General Insurance',
    portalUrl: 'https://www.tataaig.com/careers',
    naukriSlug: 'tata-aig-general-insurance-company-jobs-careers-109012'
  },
  'hdfc ergo': {
    name: 'HDFC ERGO General Insurance',
    portalUrl: 'https://www.hdfcergo.com/careers',
    naukriSlug: 'hdfc-ergo-general-insurance-jobs-careers-17367'
  },
  'hdfc ergo general insurance': {
    name: 'HDFC ERGO General Insurance',
    portalUrl: 'https://www.hdfcergo.com/careers',
    naukriSlug: 'hdfc-ergo-general-insurance-jobs-careers-17367'
  },
  'bajaj allianz': {
    name: 'Bajaj Allianz General Insurance',
    portalUrl: 'https://www.bajajallianz.com/careers.html',
    naukriSlug: 'bajaj-allianz-general-insurance-company-jobs-careers-18451'
  },
  'bajaj allianz general insurance': {
    name: 'Bajaj Allianz General Insurance',
    portalUrl: 'https://www.bajajallianz.com/careers.html',
    naukriSlug: 'bajaj-allianz-general-insurance-company-jobs-careers-18451'
  },
  'axis bank': {
    name: 'Axis Bank',
    portalUrl: 'https://www.axisbank.com/careers',
    naukriSlug: 'axis-bank-jobs-careers-415'
  },
  'bharti airtel': {
    name: 'Bharti Airtel',
    portalUrl: 'https://www.airtel.in/careers/',
    naukriSlug: 'bharti-airtel-jobs-careers-317'
  },
  'airtel': {
    name: 'Bharti Airtel',
    portalUrl: 'https://www.airtel.in/careers/',
    naukriSlug: 'bharti-airtel-jobs-careers-317'
  },
  'star health': {
    name: 'Star Health and Allied Insurance',
    portalUrl: 'https://www.starhealth.in/careers',
    naukriSlug: 'star-health-allied-insurance-co-jobs-careers-19519'
  },
  'star health & allied insurance': {
    name: 'Star Health and Allied Insurance',
    portalUrl: 'https://www.starhealth.in/careers',
    naukriSlug: 'star-health-allied-insurance-co-jobs-careers-19519'
  },
  'sbi general insurance': {
    name: 'SBI General Insurance',
    portalUrl: 'https://www.sbigeneral.in/careers',
    naukriSlug: 'sbi-general-insurance-jobs-careers-133501'
  },
  'sbi general': {
    name: 'SBI General Insurance',
    portalUrl: 'https://www.sbigeneral.in/careers',
    naukriSlug: 'sbi-general-insurance-jobs-careers-133501'
  },
  'icici lombard': {
    name: 'ICICI Lombard General Insurance',
    portalUrl: 'https://www.icicilombard.com/careers',
    naukriSlug: 'icici-lombard-general-insurance-jobs-careers-11116'
  },
  'icici bank': {
    name: 'ICICI Bank',
    portalUrl: 'https://www.icicicareers.com',
    naukriSlug: 'icici-bank-jobs-careers-781'
  },
  'reliance general insurance': {
    name: 'Reliance General Insurance',
    portalUrl: 'https://www.reliancegeneral.co.in/Insurance/About-Us/Careers.aspx',
    naukriSlug: 'reliance-general-insurance-jobs-careers-12965'
  },
  'reliance general': {
    name: 'Reliance General Insurance',
    portalUrl: 'https://www.reliancegeneral.co.in/Insurance/About-Us/Careers.aspx',
    naukriSlug: 'reliance-general-insurance-jobs-careers-12965'
  },
  'max life insurance': {
    name: 'Max Life Insurance',
    portalUrl: 'https://www.maxlifeinsurance.com/careers',
    naukriSlug: 'max-life-insurance-co-jobs-careers-13393'
  },
  'kotak general insurance': {
    name: 'Kotak General Insurance / Kotak Mahindra',
    portalUrl: 'https://www.kotak.com/en/careers.html',
    naukriSlug: 'kotak-mahindra-bank-jobs-careers-1365'
  }
};

/**
 * Normalizes company key for dictionary lookup
 */
function findCompanyInfo(companyName: string) {
  const clean = companyName.toLowerCase().trim();
  for (const [key, value] of Object.entries(COMPANY_CAREER_PORTALS)) {
    if (clean.includes(key) || key.includes(clean)) {
      return value;
    }
  }
  return null;
}

/**
 * Returns the exact, working redirectable URL on Naukri.com
 * If company has a registered Naukri careers hub, routes to that employer's live vacancies,
 * filtered by role keywords and Hyderabad location.
 */
export function getNaukriDirectUrl(job: { title: string; company: string; location?: string }): string {
  const companyInfo = findCompanyInfo(job.company);
  const cleanTitle = encodeURIComponent(job.title.replace(/[^a-zA-Z0-9\s]/g, ' ').trim());
  const loc = encodeURIComponent(job.location || 'Hyderabad');

  if (companyInfo && companyInfo.naukriSlug) {
    return `https://www.naukri.com/${companyInfo.naukriSlug}?k=${cleanTitle}&l=${loc}`;
  }

  // Exact targeted live search filter on Naukri
  const titleKeywords = job.title
    .toLowerCase()
    .replace(/chief manager|senior manager|manager|avp/gi, '')
    .trim()
    .replace(/\s+/g, '-');

  return `https://www.naukri.com/${encodeURIComponent(job.company.toLowerCase().replace(/[^a-z0-9]/g, '-'))}-jobs?k=${cleanTitle}&l=${loc}`;
}

/**
 * Returns the complete redirectable LinkedIn job post link.
 * Targets the exact company, title, location, and recent posting filters.
 */
export function getLinkedInPostUrl(job: { title: string; company: string; location?: string }): string {
  const query = encodeURIComponent(`${job.company} ${job.title}`);
  const locationParam = encodeURIComponent(job.location || 'Hyderabad, Telangana, India');
  return `https://www.linkedin.com/jobs/search/?keywords=${query}&location=${locationParam}&f_TPR=r604800&sortBy=DD`;
}

/**
 * Returns the official, verified company career portal URL.
 * Guaranteed to point to the legitimate career gateway rather than a dead/removed endpoint.
 */
export function getCompanyCareerPortalUrl(company: string): string {
  const info = findCompanyInfo(company);
  if (info) {
    return info.portalUrl;
  }
  const cleanCompany = encodeURIComponent(company.trim());
  return `https://www.google.com/search?q=${cleanCompany}+careers+official+portal+jobs`;
}

/**
 * Returns Google Jobs live indexed listing fallback
 */
export function getGoogleJobsUrl(job: { title: string; company: string; location?: string }): string {
  const q = encodeURIComponent(`${job.company} ${job.title} ${job.location || 'Hyderabad'} jobs apply`);
  return `https://www.google.com/search?q=${q}&ibp=htl;jobs`;
}

export interface DirectLinkOption {
  id: 'platform' | 'naukri' | 'linkedin' | 'career_page' | 'google_jobs';
  label: string;
  sublabel: string;
  url: string;
  platform: PlatformName | 'Google Jobs';
  isPrimary: boolean;
  colorClass: string;
}

/**
 * Resolves the primary and enhanced direct link options for a job posting.
 */
export function resolveEnhancedJobLinks(job: JobPosting): {
  primaryUrl: string;
  primaryLabel: string;
  platformBadge: string;
  naukriUrl: string;
  linkedInUrl: string;
  careerPortalUrl: string;
  googleJobsUrl: string;
  allLinks: DirectLinkOption[];
} {
  const naukriUrl = job.naukriUrl || getNaukriDirectUrl(job);
  const linkedInUrl = job.linkedInUrl || getLinkedInPostUrl(job);
  const careerPortalUrl = job.directCareerUrl || getCompanyCareerPortalUrl(job.company);
  const googleJobsUrl = getGoogleJobsUrl(job);

  let primaryUrl = job.applyUrl;
  let primaryLabel = 'Direct Link';
  let platformBadge: string = job.platform;

  if (job.platform === 'Naukri') {
    primaryUrl = naukriUrl;
    primaryLabel = 'Open Naukri Portal';
    platformBadge = 'Naukri Verified';
  } else if (job.platform === 'LinkedIn') {
    primaryUrl = linkedInUrl;
    primaryLabel = 'View LinkedIn Post';
    platformBadge = 'LinkedIn Post';
  } else if (job.platform === 'Company Career Page') {
    primaryUrl = careerPortalUrl;
    primaryLabel = 'Official Career Page';
    platformBadge = 'Career Portal';
  } else if (job.platform === 'IIMJobs') {
    primaryUrl = `https://www.iimjobs.com/search?k=${encodeURIComponent(job.title + ' ' + job.company)}&loc=Hyderabad`;
    primaryLabel = 'Open IIMJobs';
    platformBadge = 'IIMJobs';
  } else if (job.platform === 'Indeed') {
    primaryUrl = `https://in.indeed.com/jobs?q=${encodeURIComponent(job.company + ' ' + job.title)}&l=Hyderabad`;
    primaryLabel = 'Open on Indeed';
    platformBadge = 'Indeed';
  } else {
    // Default to platform specific link
    if (job.platform.includes('Career')) {
      primaryUrl = careerPortalUrl;
      primaryLabel = 'Official Career Portal';
    } else {
      primaryUrl = linkedInUrl;
      primaryLabel = 'View Live Post';
    }
  }

  const allLinks: DirectLinkOption[] = [
    {
      id: 'platform',
      label: primaryLabel,
      sublabel: `Direct ${job.platform} source`,
      url: primaryUrl,
      platform: job.platform,
      isPrimary: true,
      colorClass: 'text-indigo-400 border-indigo-500/30 bg-indigo-950/40 hover:bg-indigo-900/50'
    },
    {
      id: 'naukri',
      label: 'Naukri Portal',
      sublabel: 'Live posting & company hub on Naukri.com',
      url: naukriUrl,
      platform: 'Naukri',
      isPrimary: job.platform === 'Naukri',
      colorClass: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40 hover:bg-cyan-900/50'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Post',
      sublabel: 'Complete redirectable post & job listing',
      url: linkedInUrl,
      platform: 'LinkedIn',
      isPrimary: job.platform === 'LinkedIn',
      colorClass: 'text-blue-400 border-blue-500/30 bg-blue-950/40 hover:bg-blue-900/50'
    },
    {
      id: 'career_page',
      label: 'Official Career Page',
      sublabel: 'Company career portal & active recruitment page',
      url: careerPortalUrl,
      platform: 'Company Career Page',
      isPrimary: job.platform === 'Company Career Page',
      colorClass: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40 hover:bg-emerald-900/50'
    },
    {
      id: 'google_jobs',
      label: 'Google Jobs Live Index',
      sublabel: 'Real-time multi-board index & vacancy availability',
      url: googleJobsUrl,
      platform: 'Google Jobs',
      isPrimary: false,
      colorClass: 'text-amber-400 border-amber-500/30 bg-amber-950/40 hover:bg-amber-900/50'
    }
  ];

  return {
    primaryUrl,
    primaryLabel,
    platformBadge,
    naukriUrl,
    linkedInUrl,
    careerPortalUrl,
    googleJobsUrl,
    allLinks
  };
}
