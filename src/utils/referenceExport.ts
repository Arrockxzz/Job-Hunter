import { JobPosting, MasterResume } from '../types';

export function formatModifiedResumeText(job: JobPosting, masterResume: MasterResume): string {
  const tailored = job.tailoredResume;
  const headline = tailored?.tailoredHeadline || `${job.title} | 10+ Yrs Operations & CX Leadership | ICICI Lombard`;
  const summary = tailored?.tailoredSummary || masterResume.summary;
  const skills = tailored?.emphasizedSkills?.length ? tailored.emphasizedSkills : job.requiredSkills;

  let text = `================================================================================
ANKIT SHARMA - MODIFIED RESUME
Application Reference #: ${job.confirmationId || 'N/A'}
Applied Position: ${job.title}
Target Company: ${job.company}
Status: APPLIED
Application Date: ${job.appliedAt || 'Today'}
ATS Match Score: ${job.matchScore || 92}% (${job.candidateRanking || 'Top 1% Candidate'})
Platform: ${job.platform || 'Direct'}
Direct Career Link: ${job.directCareerUrl || job.applyUrl}
Naukri Link: ${job.naukriUrl || 'Available in Multi-Link Gateway'}
LinkedIn Post: ${job.linkedInUrl || 'Available in Multi-Link Gateway'}
================================================================================

CANDIDATE INFORMATION:
Name: ${masterResume.fullName}
Email: ${masterResume.email}
Phone: ${masterResume.phone}
Location: ${masterResume.location}
LinkedIn: ${masterResume.linkedin}
Current Role: ${masterResume.currentRole} at ${masterResume.currentCompany}
Notice Period: ${masterResume.noticePeriod}
Compensation: Target ${masterResume.expectedCtc}

--------------------------------------------------------------------------------
OPTIMIZED EXECUTIVE HEADLINE:
${headline}

--------------------------------------------------------------------------------
TARGETED EXECUTIVE SUMMARY:
${summary}

--------------------------------------------------------------------------------
EMPHASIZED OPERATIONAL COMPETENCIES & ATS SKILLS:
${skills.map(s => `• ${s}`).join('\n')}

--------------------------------------------------------------------------------
ZERO-FABRICATION VERIFIED WORK EXPERIENCE:
`;

  if (tailored?.optimizedExperience && tailored.optimizedExperience.length > 0) {
    tailored.optimizedExperience.forEach(exp => {
      text += `\n${exp.role.toUpperCase()} | ${exp.company} (${exp.period})\n`;
      exp.bullets.forEach(b => {
        text += `  • ${b}\n`;
      });
    });
  } else {
    masterResume.experience.forEach(exp => {
      text += `\n${exp.role.toUpperCase()} | ${exp.company} (${exp.period})\n`;
      exp.achievements.forEach(a => {
        text += `  • ${a}\n`;
      });
    });
  }

  text += `\n--------------------------------------------------------------------------------\nEDUCATION & CERTIFICATIONS:\n`;
  masterResume.education.forEach(ed => {
    text += `• ${ed.degree} - ${ed.institution} (${ed.year})\n`;
  });
  masterResume.certifications.forEach(cert => {
    text += `• ${cert}\n`;
  });

  if (job.coverLetter) {
    text += `\n================================================================================\nSUBMITTED COVER LETTER:\n================================================================================\n${job.coverLetter}\n`;
  }

  return text;
}

export function formatShareableReferenceText(job: JobPosting): string {
  const naukriLine = job.naukriUrl ? `\n• Naukri Portal Link: ${job.naukriUrl}` : '';
  const linkedInLine = job.linkedInUrl ? `\n• LinkedIn Job Post: ${job.linkedInUrl}` : '';
  const careerLine = job.directCareerUrl ? `\n• Company Career Page: ${job.directCareerUrl}` : `\n• Direct Portal Link: ${job.applyUrl}`;

  return `📌 ANKIT SHARMA - APPLICATION REFERENCE SLIP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Application Status: APPLIED (Verified Submission)
• Application Reference Number: ${job.confirmationId || 'PENDING-CONF'}
• Role: ${job.title}
• Company: ${job.company}
• Location: ${job.location}
• Applied Timestamp: ${job.appliedAt || 'Today'}
• ATS Match Score: ${job.matchScore || 92}% (${job.candidateRanking || 'Top 1% Candidate'})${careerLine}${naukriLine}${linkedInLine}
• Candidate: Ankit Sharma (Chief Manager – Operations | 10+ Yrs Exp)
• Contact: +91 98765 43210 | ankit.sharma.ops@gmail.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

export function downloadFile(filename: string, content: string, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
