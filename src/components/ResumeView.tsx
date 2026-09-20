import React, { useState, useRef } from 'react';
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
  ShieldCheck, 
  MapPin, 
  Clock, 
  ExternalLink,
  UploadCloud,
  Download,
  FileCheck,
  Edit2,
  X,
  Languages as LanguagesIcon,
  FolderGit2,
  DollarSign,
  User,
  Phone,
  Mail,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { 
  MasterResume, 
  WorkExperience, 
  EducationItem, 
  LanguageSkill, 
  DetailedCertification, 
  PortfolioProject 
} from '../types';
import { ANKIT_SHARMA_MASTER_RESUME } from '../data/sampleData';
import { formatMasterResumeText, downloadFile } from '../utils/referenceExport';

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
  const [savedAlert, setSavedAlert] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'skills' | 'education' | 'certifications' | 'preferences'>('profile');

  // New item inputs
  const [newSkill, setNewSkill] = useState('');
  const [newTool, setNewTool] = useState('');
  const [newCompetency, setNewCompetency] = useState('');
  const [newLocation, setNewLocation] = useState('');
  
  // File upload ref & state
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const [showRawTextModal, setShowRawTextModal] = useState(false);
  const [rawTextContent, setRawTextContent] = useState('');

  // Editing Experience State
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [isAddingExp, setIsAddingExp] = useState(false);
  const [expForm, setExpForm] = useState<Partial<WorkExperience>>({
    company: '',
    role: '',
    period: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    employmentType: 'Full-time',
    location: '',
    achievements: [''],
    toolsUsed: []
  });

  // Editing Education State
  const [isAddingEdu, setIsAddingEdu] = useState(false);
  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [eduForm, setEduForm] = useState<Partial<EducationItem>>({
    degree: '',
    institution: '',
    specialization: '',
    year: '',
    courseType: 'Full-time',
    gradingSystem: 'CGPA',
    grade: ''
  });

  // Editing Certification State
  const [isAddingCert, setIsAddingCert] = useState(false);
  const [certForm, setCertForm] = useState<Partial<DetailedCertification>>({
    name: '',
    issuingOrg: '',
    issueYear: '',
    credentialId: ''
  });

  // Editing Language State
  const [isAddingLang, setIsAddingLang] = useState(false);
  const [langForm, setLangForm] = useState<Partial<LanguageSkill>>({
    language: '',
    proficiency: 'Fluent',
    read: true,
    write: true,
    speak: true
  });

  // Synchronize when masterResume prop updates
  React.useEffect(() => {
    setResume(masterResume);
  }, [masterResume]);

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

  const handleDownloadMasterResume = () => {
    const formatted = formatMasterResumeText(resume);
    const filename = `${resume.fullName.trim().replace(/\s+/g, '_')}_Master_Resume.txt`;
    downloadFile(filename, formatted);
  };

  // Handle Resume File Attachment
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeStr = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${Math.round(file.size / 1024)} KB`;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      
      const updatedAttachment = {
        fileName: file.name,
        fileSize: fileSizeStr,
        uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        fileType: file.type || 'document',
        parsedText: typeof content === 'string' ? content.slice(0, 10000) : ''
      };

      const updated = {
        ...resume,
        resumeAttachment: updatedAttachment
      };

      setResume(updated);
      onUpdateResume(updated);
      setUploadSuccessMsg(`"${file.name}" attached successfully! Ready for AI Auto-Fill & ATS tailoring.`);
      setTimeout(() => setUploadSuccessMsg(null), 4000);

      // If text file or readable string, prompt or trigger parsing
      if (file.type.includes('text') && typeof content === 'string' && content.length > 50) {
        onParseRawText(content);
      }
    };

    if (file.type.includes('text') || file.name.endsWith('.txt')) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  };

  // Add / Remove Skills & Competencies
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim() || resume.skills.includes(newSkill.trim())) return;
    const updated = { ...resume, skills: [...resume.skills, newSkill.trim()] };
    setResume(updated);
    setNewSkill('');
  };

  const handleRemoveSkill = (skill: string) => {
    const updated = { ...resume, skills: resume.skills.filter(s => s !== skill) };
    setResume(updated);
  };

  const handleAddTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTool.trim() || resume.toolsAndPlatforms.includes(newTool.trim())) return;
    const updated = { ...resume, toolsAndPlatforms: [...resume.toolsAndPlatforms, newTool.trim()] };
    setResume(updated);
    setNewTool('');
  };

  const handleRemoveTool = (tool: string) => {
    const updated = { ...resume, toolsAndPlatforms: resume.toolsAndPlatforms.filter(t => t !== tool) };
    setResume(updated);
  };

  const handleAddPreferredLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocation.trim()) return;
    const currentLocs = resume.preferredLocations || [];
    if (currentLocs.includes(newLocation.trim())) return;
    const updated = { ...resume, preferredLocations: [...currentLocs, newLocation.trim()] };
    setResume(updated);
    setNewLocation('');
  };

  const handleRemovePreferredLocation = (loc: string) => {
    const currentLocs = resume.preferredLocations || [];
    const updated = { ...resume, preferredLocations: currentLocs.filter(l => l !== loc) };
    setResume(updated);
  };

  // Experience handlers
  const handleSaveExperience = () => {
    if (!expForm.role || !expForm.company) return;

    const cleanedAchievements = (expForm.achievements || []).filter(a => a.trim().length > 0);
    const expItem: WorkExperience = {
      id: editingExpId || `exp-${Date.now()}`,
      company: expForm.company || '',
      role: expForm.role || '',
      period: expForm.period || (expForm.startDate ? `${expForm.startDate} - ${expForm.isCurrent ? 'Present' : expForm.endDate || ''}` : '2023 - Present'),
      startDate: expForm.startDate,
      endDate: expForm.endDate,
      isCurrent: expForm.isCurrent,
      employmentType: expForm.employmentType as any || 'Full-time',
      location: expForm.location || 'India',
      achievements: cleanedAchievements.length > 0 ? cleanedAchievements : ['Responsible for key operational milestones and team performance.'],
      toolsUsed: expForm.toolsUsed || []
    };

    let updatedExpList: WorkExperience[];
    if (editingExpId) {
      updatedExpList = resume.experience.map(e => e.id === editingExpId ? expItem : e);
    } else {
      updatedExpList = [expItem, ...resume.experience];
    }

    const updated = { ...resume, experience: updatedExpList };
    setResume(updated);
    onUpdateResume(updated);
    setIsAddingExp(false);
    setEditingExpId(null);
  };

  const handleDeleteExperience = (id: string) => {
    const updated = { ...resume, experience: resume.experience.filter(e => e.id !== id) };
    setResume(updated);
    onUpdateResume(updated);
  };

  const handleStartEditExp = (exp: WorkExperience) => {
    setEditingExpId(exp.id);
    setExpForm({ ...exp });
    setIsAddingExp(true);
  };

  // Education handlers
  const handleSaveEducation = () => {
    if (!eduForm.degree || !eduForm.institution) return;

    const eduItem: EducationItem = {
      id: editingEduId || `edu-${Date.now()}`,
      degree: eduForm.degree || '',
      institution: eduForm.institution || '',
      specialization: eduForm.specialization,
      year: eduForm.year || '2020 - 2024',
      courseType: eduForm.courseType as any || 'Full-time',
      gradingSystem: eduForm.gradingSystem as any || 'CGPA',
      grade: eduForm.grade
    };

    let updatedEduList: EducationItem[];
    if (editingEduId) {
      updatedEduList = resume.education.map(ed => ed.id === editingEduId ? eduItem : ed);
    } else {
      updatedEduList = [...resume.education, eduItem];
    }

    const updated = { ...resume, education: updatedEduList };
    setResume(updated);
    onUpdateResume(updated);
    setIsAddingEdu(false);
    setEditingEduId(null);
  };

  const handleDeleteEducation = (idx: number, id?: string) => {
    const updated = {
      ...resume,
      education: resume.education.filter((ed, i) => id ? ed.id !== id : i !== idx)
    };
    setResume(updated);
    onUpdateResume(updated);
  };

  // Certification handlers
  const handleSaveCertification = () => {
    if (!certForm.name) return;
    const certItem: DetailedCertification = {
      id: `cert-${Date.now()}`,
      name: certForm.name || '',
      issuingOrg: certForm.issuingOrg || 'Accredited Body',
      issueYear: certForm.issueYear || new Date().getFullYear().toString(),
      credentialId: certForm.credentialId
    };

    const currentList = resume.certificationsDetailed || [];
    const updated = {
      ...resume,
      certifications: [...resume.certifications, certItem.name],
      certificationsDetailed: [...currentList, certItem]
    };
    setResume(updated);
    onUpdateResume(updated);
    setIsAddingCert(false);
    setCertForm({ name: '', issuingOrg: '', issueYear: '', credentialId: '' });
  };

  const handleDeleteCertification = (certName: string, id?: string) => {
    const updated = {
      ...resume,
      certifications: resume.certifications.filter(c => c !== certName),
      certificationsDetailed: (resume.certificationsDetailed || []).filter(c => id ? c.id !== id : c.name !== certName)
    };
    setResume(updated);
    onUpdateResume(updated);
  };

  // Language handlers
  const handleSaveLanguage = () => {
    if (!langForm.language) return;
    const langItem: LanguageSkill = {
      language: langForm.language,
      proficiency: langForm.proficiency as any || 'Fluent',
      read: langForm.read ?? true,
      write: langForm.write ?? true,
      speak: langForm.speak ?? true
    };
    const currentLangs = resume.languages || [];
    const updated = {
      ...resume,
      languages: [...currentLangs, langItem]
    };
    setResume(updated);
    onUpdateResume(updated);
    setIsAddingLang(false);
    setLangForm({ language: '', proficiency: 'Fluent', read: true, write: true, speak: true });
  };

  const handleDeleteLanguage = (langName: string) => {
    const updated = {
      ...resume,
      languages: (resume.languages || []).filter(l => l.language !== langName)
    };
    setResume(updated);
    onUpdateResume(updated);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* Top Banner & Action Controls */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 backdrop-blur-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-cyan-400" />
                Candidate Master Profile & Portal CV
              </h1>
              <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-0.5 font-semibold flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> Portal Ready (Naukri & LinkedIn Verified)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Comprehensive profile synchronized with major job portal requirements. Upload your resume, download formatted versions, and manage full experience & skills manually.
            </p>
          </div>

          {/* Quick Action Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleDownloadMasterResume}
              className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40 hover:bg-cyan-900/50 px-3.5 py-2 text-xs font-semibold text-cyan-300 transition-all shadow-sm active:scale-95"
              title="Download full formatted Master Resume (.txt / .doc)"
            >
              <Download className="h-4 w-4" /> Download CV
            </button>

            <button
              onClick={handleResetToAnkitProfile}
              className="rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
              title="Reload Ankit Sharma baseline credentials"
            >
              Reload Ankit
            </button>
            
            <button
              id="btn-save-master-resume"
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md hover:shadow-indigo-500/25 transition-all active:scale-95"
            >
              {savedAlert ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {savedAlert ? 'Saved to System!' : 'Save All Updates'}
            </button>
          </div>
        </div>

        {/* Resume Attachment & Upload Bar */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                <span>Current Master Resume:</span>
                <span className="font-mono text-cyan-300">
                  {resume.resumeAttachment?.fileName || 'Ankit_Sharma_Chief_Manager_CV_2026.pdf'}
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
                  {resume.resumeAttachment?.fileSize || '184 KB'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Uploaded: {resume.resumeAttachment?.uploadedAt || 'Verified Active'} • Status: ATS Standard (High Parser Compatibility)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-3.5 py-2 text-xs font-semibold text-white transition-all shadow active:scale-95"
            >
              <UploadCloud className="h-4 w-4" /> Attach Updated Resume
            </button>

            <button
              onClick={() => setShowRawTextModal(true)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 transition-all"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" /> AI Auto-Fill
            </button>
          </div>
        </div>

        {uploadSuccessMsg && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-2 text-xs text-emerald-300 flex items-center gap-2">
            <Check className="h-4 w-4 shrink-0 text-emerald-400" />
            {uploadSuccessMsg}
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-1.5 border-b border-slate-800 pb-2 overflow-x-auto text-xs sm:text-sm scrollbar-thin">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
            activeTab === 'profile' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <User className="h-3.5 w-3.5" />
          Personal & Portal Fields
        </button>
        <button
          onClick={() => setActiveTab('experience')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
            activeTab === 'experience' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <Briefcase className="h-3.5 w-3.5" />
          Work Experience ({resume.experience.length})
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
            activeTab === 'skills' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          Skills, Tools & Languages
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
            activeTab === 'education' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <GraduationCap className="h-3.5 w-3.5" />
          Education ({resume.education.length})
        </button>
        <button
          onClick={() => setActiveTab('certifications')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
            activeTab === 'certifications' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <Award className="h-3.5 w-3.5" />
          Certifications & Projects
        </button>
        <button
          onClick={() => setActiveTab('preferences')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
            activeTab === 'preferences' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <Sliders className="h-3.5 w-3.5" />
          Target CTC & Portals
        </button>
      </div>

      {/* TAB 1: PERSONAL & MAJOR JOB PORTAL FIELDS */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <User className="h-4 w-4 text-indigo-400" />
                  Primary Candidate & Contact Credentials (As Asked by Naukri & LinkedIn)
                </h2>
                <p className="text-xs text-slate-400">Used for recruiter communication, ATS contact parsing, and automated application submissions.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Full Name *</label>
                <input
                  type="text"
                  value={resume.fullName}
                  onChange={(e) => handleFieldChange('fullName', e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Email Address *</label>
                <input
                  type="email"
                  value={resume.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Primary Mobile / WhatsApp *</label>
                <input
                  type="text"
                  value={resume.phone}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Alternate Phone</label>
                <input
                  type="text"
                  value={resume.alternatePhone || ''}
                  onChange={(e) => handleFieldChange('alternatePhone', e.target.value)}
                  placeholder="+91 98111 22334"
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Current City & State *</label>
                <input
                  type="text"
                  value={resume.location}
                  onChange={(e) => handleFieldChange('location', e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Pincode</label>
                <input
                  type="text"
                  value={resume.currentPincode || ''}
                  onChange={(e) => handleFieldChange('currentPincode', e.target.value)}
                  placeholder="500081"
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">LinkedIn Profile URL</label>
                <input
                  type="text"
                  value={resume.linkedin}
                  onChange={(e) => handleFieldChange('linkedin', e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Portfolio / Personal Site</label>
                <input
                  type="text"
                  value={resume.portfolio || ''}
                  onChange={(e) => handleFieldChange('portfolio', e.target.value)}
                  placeholder="ankitsharma-ops.in"
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">GitHub / Project Repo</label>
                <input
                  type="text"
                  value={resume.github || ''}
                  onChange={(e) => handleFieldChange('github', e.target.value)}
                  placeholder="github.com/ankit-sharma"
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Diversity & Portal Demographics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-slate-800">
              <div>
                <label className="text-xs font-semibold text-slate-300">Date of Birth</label>
                <input
                  type="date"
                  value={resume.dateOfBirth || ''}
                  onChange={(e) => handleFieldChange('dateOfBirth', e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Gender</label>
                <select
                  value={resume.gender || 'Male'}
                  onChange={(e) => handleFieldChange('gender', e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Marital Status</label>
                <select
                  value={resume.maritalStatus || 'Married'}
                  onChange={(e) => handleFieldChange('maritalStatus', e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Differently Abled</label>
                <select
                  value={resume.differentlyAbled || 'No'}
                  onChange={(e) => handleFieldChange('differentlyAbled', e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Current Employment & Compensation (Job Portal Requirements) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              Current Employment & Compensation Details (Mandatory on Naukri, Indeed & LinkedIn)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Current Designation</label>
                <input
                  type="text"
                  value={resume.currentRole}
                  onChange={(e) => handleFieldChange('currentRole', e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Current Employer / Company</label>
                <input
                  type="text"
                  value={resume.currentCompany}
                  onChange={(e) => handleFieldChange('currentCompany', e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Total Experience (Years)</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="number"
                    min={0}
                    max={50}
                    value={resume.experienceYears}
                    onChange={(e) => handleFieldChange('experienceYears', Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                  />
                  <span className="text-xs text-slate-400 shrink-0">Yrs</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Current Annual CTC</label>
                <input
                  type="text"
                  value={resume.currentCtc || '₹14,50,000 PA'}
                  onChange={(e) => handleFieldChange('currentCtc', e.target.value)}
                  placeholder="e.g. ₹14,50,000 PA"
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Expected CTC Range</label>
                <input
                  type="text"
                  value={resume.expectedCtc}
                  onChange={(e) => handleFieldChange('expectedCtc', e.target.value)}
                  placeholder="₹18,00,000 - ₹24,00,000 PA"
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white font-semibold text-emerald-400"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Notice Period</label>
                <select
                  value={resume.noticePeriod}
                  onChange={(e) => handleFieldChange('noticePeriod', e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                >
                  <option value="Serving Notice">Serving Notice</option>
                  <option value="15 Days">15 Days</option>
                  <option value="30 Days">30 Days</option>
                  <option value="45 Days">45 Days</option>
                  <option value="60 Days">60 Days</option>
                  <option value="90 Days">90 Days</option>
                  <option value="Immediate Joiner">Immediate Joiner</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Functional Area</label>
                <input
                  type="text"
                  value={resume.functionalArea || 'Operations, Customer Experience & Transformation'}
                  onChange={(e) => handleFieldChange('functionalArea', e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Industry / Domain</label>
                <input
                  type="text"
                  value={resume.industry || 'General Insurance / Banking & Financial Services (BFSI)'}
                  onChange={(e) => handleFieldChange('industry', e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                />
              </div>
            </div>

            {/* Preferred Work Locations */}
            <div>
              <label className="text-xs font-semibold text-slate-300">Preferred Work Locations</label>
              <form onSubmit={handleAddPreferredLocation} className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="Add preferred city (e.g. Hyderabad, Bengaluru, Remote)..."
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-3.5 py-2 text-xs font-semibold text-white"
                >
                  Add City
                </button>
              </form>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {(resume.preferredLocations || []).map(loc => (
                  <span key={loc} className="inline-flex items-center gap-1 rounded-lg bg-slate-800 border border-slate-700 px-2.5 py-1 text-xs text-cyan-300">
                    <MapPin className="h-3 w-3" />
                    {loc}
                    <button
                      type="button"
                      onClick={() => handleRemovePreferredLocation(loc)}
                      className="text-slate-500 hover:text-red-400 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Professional Headline & Summary */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              Executive Headline & Strategic Profile Summary
            </h2>

            <div>
              <label className="text-xs font-semibold text-slate-300">
                Profile Headline (Displayed on Search Result & Recruiter Inboxes)
              </label>
              <input
                type="text"
                value={resume.headline}
                onChange={(e) => handleFieldChange('headline', e.target.value)}
                className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Executive Summary (Curriculum Vitae Narrative)</label>
              <textarea
                rows={5}
                value={resume.summary}
                onChange={(e) => handleFieldChange('summary', e.target.value)}
                className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white leading-relaxed focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WORK EXPERIENCE (ADD, EDIT, DELETE) */}
      {activeTab === 'experience' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-indigo-400" />
                Employment History & Quantified Achievements ({resume.experience.length} Roles)
              </h2>
              <p className="text-xs text-slate-400">Add, edit, or remove roles. The Resume Agent uses these verified bullets for ATS keyword tailoring.</p>
            </div>

            {!isAddingExp && (
              <button
                onClick={() => {
                  setEditingExpId(null);
                  setExpForm({
                    company: '',
                    role: '',
                    period: '',
                    startDate: '',
                    endDate: '',
                    isCurrent: false,
                    employmentType: 'Full-time',
                    location: '',
                    achievements: [''],
                    toolsUsed: []
                  });
                  setIsAddingExp(true);
                }}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow transition-all"
              >
                <Plus className="h-4 w-4" /> Add Work Experience
              </button>
            )}
          </div>

          {/* Add / Edit Experience Form Card */}
          {isAddingExp && (
            <div className="rounded-2xl border border-indigo-500/40 bg-slate-900 p-6 space-y-4 shadow-lg shadow-indigo-950/20">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                  <Edit2 className="h-4 w-4" />
                  {editingExpId ? 'Edit Experience Record' : 'Add New Work Experience'}
                </h3>
                <button
                  onClick={() => {
                    setIsAddingExp(false);
                    setEditingExpId(null);
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Designation / Role *</label>
                  <input
                    type="text"
                    value={expForm.role || ''}
                    onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                    placeholder="e.g. Chief Manager – Operations"
                    className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">Company Name *</label>
                  <input
                    type="text"
                    value={expForm.company || ''}
                    onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                    placeholder="e.g. ICICI Lombard General Insurance"
                    className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Duration / Period (e.g. 2021 - Present) *</label>
                  <input
                    type="text"
                    value={expForm.period || ''}
                    onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                    placeholder="2021 - Present"
                    className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">Location</label>
                  <input
                    type="text"
                    value={expForm.location || ''}
                    onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                    placeholder="Hyderabad, India"
                    className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">Employment Type</label>
                  <select
                    value={expForm.employmentType || 'Full-time'}
                    onChange={(e) => setExpForm({ ...expForm, employmentType: e.target.value as any })}
                    className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
              </div>

              {/* Achievements Bullets */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    Quantified Achievements & Responsibilities (ATS Scored)
                  </label>
                  <button
                    type="button"
                    onClick={() => setExpForm({
                      ...expForm,
                      achievements: [...(expForm.achievements || []), '']
                    })}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" /> Add Bullet
                  </button>
                </div>

                {(expForm.achievements || ['']).map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-slate-500 font-mono text-xs pt-2">{idx + 1}.</span>
                    <textarea
                      rows={2}
                      value={bullet}
                      onChange={(e) => {
                        const newBullets = [...(expForm.achievements || [])];
                        newBullets[idx] = e.target.value;
                        setExpForm({ ...expForm, achievements: newBullets });
                      }}
                      placeholder="e.g. Spearheaded Straight-Through Processing (STP) initiatives boosting digital issuance by 42%..."
                      className="flex-1 rounded-xl border border-slate-700 bg-slate-950 p-2 text-xs text-white leading-relaxed"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newBullets = (expForm.achievements || []).filter((_, i) => i !== idx);
                        setExpForm({ ...expForm, achievements: newBullets.length ? newBullets : [''] });
                      }}
                      className="text-slate-500 hover:text-red-400 p-2"
                      title="Remove bullet"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingExp(false);
                    setEditingExpId(null);
                  }}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveExperience}
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2 text-xs font-semibold text-white shadow"
                >
                  Save Experience Record
                </button>
              </div>
            </div>
          )}

          {/* List of Experience Items */}
          <div className="space-y-4">
            {resume.experience.map((exp) => (
              <div key={exp.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3 hover:border-slate-700 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{exp.role}</h3>
                      <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
                        {exp.employmentType || 'Full-time'}
                      </span>
                    </div>
                    <div className="text-xs text-indigo-400 font-semibold">{exp.company} • {exp.location}</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md">
                      {exp.period}
                    </span>
                    <button
                      onClick={() => handleStartEditExp(exp)}
                      className="rounded-lg border border-slate-700 bg-slate-800/80 p-1.5 text-slate-300 hover:text-cyan-300 hover:bg-slate-700"
                      title="Edit Experience"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="rounded-lg border border-red-500/20 bg-red-950/20 p-1.5 text-red-400 hover:bg-red-900/40"
                      title="Delete Experience"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <span className="text-xs font-semibold text-slate-400">Key Quantified Achievements:</span>
                  <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-5">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="leading-relaxed">{ach}</li>
                    ))}
                  </ul>
                </div>

                {exp.toolsUsed && exp.toolsUsed.length > 0 && (
                  <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800/60 flex-wrap">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Tools:</span>
                    {exp.toolsUsed.map(t => (
                      <span key={t} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SKILLS, TOOLS & LANGUAGES */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          {/* Master Skill Bank */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">Master Operational Skills & Competencies ({resume.skills.length})</h3>
                <p className="text-xs text-slate-400">Scanned by ATS engines on Naukri and LinkedIn during recruiter keyword searches.</p>
              </div>
            </div>

            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input
                type="text"
                placeholder="Add operational skill (e.g. Lean Six Sigma, STP Automation, Grievance Governance)..."
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

            <div className="flex flex-wrap gap-2 pt-2">
              {resume.skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-1.5 text-xs font-medium text-slate-200"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-500 hover:text-red-400 ml-1 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Tools & Enterprise Platforms */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">Software Tools & Platforms ({resume.toolsAndPlatforms.length})</h3>
                <p className="text-xs text-slate-400">CRM, BI dashboards, programming languages, and industry platforms.</p>
              </div>
            </div>

            <form onSubmit={handleAddTool} className="flex gap-2">
              <input
                type="text"
                placeholder="Add tool/platform (e.g. Power BI, SQL, Muse, Salesforce)..."
                value={newTool}
                onChange={(e) => setNewTool(e.target.value)}
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="flex items-center gap-1 rounded-xl bg-cyan-600 hover:bg-cyan-500 px-4 py-2 text-xs font-semibold text-white"
              >
                <Plus className="h-4 w-4" /> Add Tool
              </button>
            </form>

            <div className="flex flex-wrap gap-2 pt-2">
              {resume.toolsAndPlatforms.map((tool) => (
                <span
                  key={tool}
                  className="flex items-center gap-1.5 rounded-lg border border-cyan-800/40 bg-cyan-950/40 px-3 py-1.5 text-xs font-mono text-cyan-300"
                >
                  {tool}
                  <button
                    onClick={() => handleRemoveTool(tool)}
                    className="text-cyan-600 hover:text-red-400 ml-1 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Languages Known (Portal Standard) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <LanguagesIcon className="h-4 w-4 text-indigo-400" />
                  Languages Known & Proficiency (Naukri Multi-Lingual Profile Requirement)
                </h3>
              </div>

              {!isAddingLang && (
                <button
                  onClick={() => setIsAddingLang(true)}
                  className="flex items-center gap-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white"
                >
                  <Plus className="h-3 w-3" /> Add Language
                </button>
              )}
            </div>

            {isAddingLang && (
              <div className="rounded-xl border border-slate-700 bg-slate-950 p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Language Name</label>
                    <input
                      type="text"
                      value={langForm.language || ''}
                      onChange={(e) => setLangForm({ ...langForm, language: e.target.value })}
                      placeholder="e.g. English, Telugu, Hindi..."
                      className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Proficiency Level</label>
                    <select
                      value={langForm.proficiency || 'Fluent'}
                      onChange={(e) => setLangForm({ ...langForm, proficiency: e.target.value as any })}
                      className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Conversational">Conversational</option>
                      <option value="Proficient">Proficient</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Native">Native</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-300">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={langForm.read}
                      onChange={(e) => setLangForm({ ...langForm, read: e.target.checked })}
                      className="rounded accent-indigo-500"
                    />
                    Can Read
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={langForm.write}
                      onChange={(e) => setLangForm({ ...langForm, write: e.target.checked })}
                      className="rounded accent-indigo-500"
                    />
                    Can Write
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={langForm.speak}
                      onChange={(e) => setLangForm({ ...langForm, speak: e.target.checked })}
                      className="rounded accent-indigo-500"
                    />
                    Can Speak
                  </label>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingLang(false)}
                    className="text-xs text-slate-400 hover:text-white px-3 py-1.5"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveLanguage}
                    className="rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white"
                  >
                    Save Language
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(resume.languages || []).map((lang) => (
                <div key={lang.language} className="rounded-xl border border-slate-800 bg-slate-950 p-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{lang.language}</div>
                    <div className="text-[10px] text-cyan-400 font-semibold">{lang.proficiency}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {lang.read && 'Read • '} {lang.write && 'Write • '} {lang.speak && 'Speak'}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteLanguage(lang.language)}
                    className="text-slate-500 hover:text-red-400 p-1"
                    title="Remove language"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EDUCATION & ACADEMICS (ADD, EDIT, DELETE) */}
      {activeTab === 'education' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-indigo-400" />
                Education & Academic Qualifications ({resume.education.length})
              </h2>
              <p className="text-xs text-slate-400">Academic degrees, specializations, universities, and graduation years.</p>
            </div>

            {!isAddingEdu && (
              <button
                onClick={() => {
                  setEditingEduId(null);
                  setEduForm({
                    degree: '',
                    institution: '',
                    specialization: '',
                    year: '',
                    courseType: 'Full-time',
                    gradingSystem: 'CGPA',
                    grade: ''
                  });
                  setIsAddingEdu(true);
                }}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow"
              >
                <Plus className="h-4 w-4" /> Add Degree / Qualification
              </button>
            )}
          </div>

          {/* Add Education Form */}
          {isAddingEdu && (
            <div className="rounded-2xl border border-indigo-500/40 bg-slate-900 p-6 space-y-4 shadow-lg shadow-indigo-950/20">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-cyan-300">
                  {editingEduId ? 'Edit Academic Qualification' : 'Add Degree / Qualification'}
                </h3>
                <button
                  onClick={() => {
                    setIsAddingEdu(false);
                    setEditingEduId(null);
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Degree / Qualification Name *</label>
                  <input
                    type="text"
                    value={eduForm.degree || ''}
                    onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                    placeholder="e.g. Master of Business Administration (MBA)"
                    className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">Institution / University *</label>
                  <input
                    type="text"
                    value={eduForm.institution || ''}
                    onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                    placeholder="e.g. Premier Management Institute, India"
                    className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Specialization / Major</label>
                  <input
                    type="text"
                    value={eduForm.specialization || ''}
                    onChange={(e) => setEduForm({ ...eduForm, specialization: e.target.value })}
                    placeholder="e.g. Operations & Finance"
                    className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">Passing Year / Period *</label>
                  <input
                    type="text"
                    value={eduForm.year || ''}
                    onChange={(e) => setEduForm({ ...eduForm, year: e.target.value })}
                    placeholder="2012 - 2014"
                    className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">Grade / CGPA / %</label>
                  <input
                    type="text"
                    value={eduForm.grade || ''}
                    onChange={(e) => setEduForm({ ...eduForm, grade: e.target.value })}
                    placeholder="8.6 CGPA or 78%"
                    className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddingEdu(false)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEducation}
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2 text-xs font-semibold text-white shadow"
                >
                  Save Qualification
                </button>
              </div>
            </div>
          )}

          {/* Education List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resume.education.map((ed, idx) => (
              <div key={ed.id || idx} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2 relative group hover:border-slate-700 transition-all">
                <div className="flex items-start justify-between">
                  <div className="pr-6">
                    <h3 className="text-sm font-bold text-white">{ed.degree}</h3>
                    <div className="text-xs text-cyan-300 font-semibold">{ed.institution}</div>
                    {ed.specialization && (
                      <div className="text-xs text-slate-400 mt-0.5">Specialization: {ed.specialization}</div>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteEducation(idx, ed.id)}
                    className="text-slate-500 hover:text-red-400 p-1"
                    title="Delete qualification"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <span>Batch: <strong className="text-slate-200">{ed.year}</strong></span>
                  {ed.grade && <span>Grade: <strong className="text-emerald-400">{ed.grade}</strong></span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CERTIFICATIONS & STRATEGIC PROJECTS */}
      {activeTab === 'certifications' && (
        <div className="space-y-6">
          {/* Detailed Certifications */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Award className="h-4 w-4 text-emerald-400" />
                  Certifications, Licenses & Accreditations
                </h3>
                <p className="text-xs text-slate-400">Verified licenses and professional accreditations recognized by recruiters.</p>
              </div>

              {!isAddingCert && (
                <button
                  onClick={() => setIsAddingCert(true)}
                  className="flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white"
                >
                  <Plus className="h-3 w-3" /> Add Certification
                </button>
              )}
            </div>

            {isAddingCert && (
              <div className="rounded-xl border border-slate-700 bg-slate-950 p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Certification Name *</label>
                    <input
                      type="text"
                      value={certForm.name || ''}
                      onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
                      placeholder="e.g. Lean Six Sigma Green Belt"
                      className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Issuing Body / Organization</label>
                    <input
                      type="text"
                      value={certForm.issuingOrg || ''}
                      onChange={(e) => setCertForm({ ...certForm, issuingOrg: e.target.value })}
                      placeholder="e.g. KPMG / Insurance Institute of India"
                      className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Issue Year</label>
                    <input
                      type="text"
                      value={certForm.issueYear || ''}
                      onChange={(e) => setCertForm({ ...certForm, issueYear: e.target.value })}
                      placeholder="2022"
                      className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Credential ID / License Number</label>
                    <input
                      type="text"
                      value={certForm.credentialId || ''}
                      onChange={(e) => setCertForm({ ...certForm, credentialId: e.target.value })}
                      placeholder="e.g. LSSGB-984210"
                      className="w-full mt-1 rounded-xl border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingCert(false)}
                    className="text-xs text-slate-400 hover:text-white px-3 py-1.5"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCertification}
                    className="rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white"
                  >
                    Save Certification
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(resume.certificationsDetailed && resume.certificationsDetailed.length > 0
                ? resume.certificationsDetailed
                : resume.certifications.map((c, i) => ({
                    id: `c-${i}`,
                    name: c,
                    issuingOrg: 'Accredited Authority',
                    issueYear: 'Verified',
                    credentialId: undefined as string | undefined
                  }))
              ).map((cert) => (
                <div key={cert.id || cert.name} className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 flex items-start justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{cert.name}</div>
                    <div className="text-[11px] text-cyan-400">{cert.issuingOrg} • {cert.issueYear}</div>
                    {cert.credentialId && (
                      <div className="text-[10px] font-mono text-slate-500 mt-1">ID: {cert.credentialId}</div>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteCertification(cert.name, cert.id)}
                    className="text-slate-500 hover:text-red-400 p-1"
                    title="Delete certification"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Projects */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <FolderGit2 className="h-4 w-4 text-cyan-400" />
              Strategic Initiatives & Project Portfolios
            </h3>

            <div className="space-y-3">
              {(resume.projects || []).map((proj) => (
                <div key={proj.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">{proj.title}</h4>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      {proj.duration}
                    </span>
                  </div>
                  <div className="text-[11px] text-cyan-300 font-semibold">{proj.role} {proj.client && `• ${proj.client}`}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                  <ul className="text-[11px] text-emerald-400 list-disc pl-4 space-y-0.5">
                    {proj.outcomes.map((o, idx) => (
                      <li key={idx}>{o}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: TARGET CTC & SEARCH POLICIES */}
      {activeTab === 'preferences' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> Minimum CTC Floor
              </span>
              <p className="text-xs text-slate-400">
                Current rule: <strong>₹{resume.preferences.minCtcLakhs} LPA</strong>. Roles with compensation below this threshold are automatically excluded.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-400" /> Scheduled Crawl Timers
              </span>
              <p className="text-xs text-slate-400">
                Autonomous briefings run at <strong>09:30 AM IST</strong> and <strong>09:30 PM IST</strong> across active job portals.
              </p>
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

      {/* Raw Text Import / AI Auto-Fill Modal */}
      {showRawTextModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">AI Resume Parser & Portal Auto-Fill</h3>
              </div>
              <button
                onClick={() => setShowRawTextModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Paste your raw CV text or resume details below. The Gemini AI engine will parse your experience, skills, contact info, and education, auto-populating all major job portal fields.
            </p>

            <textarea
              rows={10}
              value={rawTextContent}
              onChange={(e) => setRawTextContent(e.target.value)}
              placeholder="Paste CV text here (Summary, Work History, Core Skills, Education, CTC)..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs text-white leading-relaxed font-mono focus:border-indigo-500 focus:outline-none"
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRawTextModal(false)}
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isParsing || !rawTextContent.trim()}
                onClick={async () => {
                  const success = await onParseRawText(rawTextContent);
                  if (success) {
                    setShowRawTextModal(false);
                    setRawTextContent('');
                    setUploadSuccessMsg('Resume parsed and master profile auto-filled successfully!');
                    setTimeout(() => setUploadSuccessMsg(null), 4000);
                  }
                }}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-2 text-xs font-semibold text-white shadow disabled:opacity-50"
              >
                {isParsing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {isParsing ? 'Parsing with Gemini...' : 'Extract & Auto-Fill Profile'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
