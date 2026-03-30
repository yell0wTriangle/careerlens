import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Sparkles,
  Sun,
  Moon,
  TrendingUp,
  Target,
  FileText,
  User as UserIcon,
  MapPin,
  Briefcase,
  Code,
  Edit2,
  Plus,
  Github,
  Linkedin,
  GraduationCap,
  Globe,
  Award,
  FolderKanban,
  Clock,
  Search,
  Inbox,
  Trash2,
  Eye,
  X,
  AlertCircle,
  Check,
  ChevronRight,
  LayoutDashboard,
  Upload,
  Bot,
  MessageSquare,
} from "lucide-react";
import OverlaySidebarNav from "../components/OverlaySidebarNav";
import { onboardingApi, resumesApi } from "../api";

// --- Theme Configurations ---
const lightTheme = {
  "--card": "#FFFFFF",
  "--muted": "#EBE6DC",
  "--accent": "#FFD166",
  "--border": "#E4DDD0",
  "--radius": "2.5rem",
  "--input-radius": "1.5rem",
  "--primary": "#F95738",
  "--secondary": "#EE4266",
  "--tertiary": "#424AE7",
  "--background": "#F6F4EE",
  "--foreground": "#1C1917",
  "--primary-foreground": "#FFFFFF",
  "--card-solid": "#FFFFFF",
  "--primary-glow": "rgba(249, 87, 56, 0.15)",
  "--secondary-glow": "rgba(238, 66, 102, 0.15)",
  "--tertiary-glow": "rgba(66, 74, 231, 0.12)",
  "--color-box1-bg": "#FFFFFF",
  "--color-box1-border": "#E4DDD0",
  "--color-box1-text": "#1C1917",
  "--color-box1-muted": "rgba(28, 25, 23, 0.5)",
  "--color-box1-icon-bg": "rgba(66, 74, 231, 0.1)",
  "--color-box1-icon": "#424AE7",
  "--color-box2-bg": "#EE4266",
  "--color-box2-border": "#EE4266",
  "--color-box2-text": "#FFFFFF",
  "--color-box2-muted": "rgba(255, 255, 255, 0.8)",
  "--color-box2-icon-bg": "#FFFFFF",
  "--color-box2-icon": "#EE4266",
  "--color-box3-bg": "#424AE7",
  "--color-box3-border": "#424AE7",
  "--color-box3-text": "#FFFFFF",
  "--color-box3-muted": "rgba(255, 255, 255, 0.8)",
  "--color-box3-icon-bg": "#FFFFFF",
  "--color-box3-icon": "#424AE7",
  "--color-box4-bg": "#F95738",
  "--color-box4-border": "#F95738",
  "--color-box4-text": "#FFFFFF",
  "--color-box4-muted": "rgba(255, 255, 255, 0.8)",
  "--color-box4-icon-bg": "#FFFFFF",
  "--color-box4-icon": "#F95738",
};

const darkTheme = {
  "--card": "#1C1917",
  "--muted": "#292524",
  "--accent": "#FFD166",
  "--border": "#36312E",
  "--radius": "2.5rem",
  "--input-radius": "1.5rem",
  "--primary": "#FF6B4A",
  "--secondary": "#FF5277",
  "--tertiary": "#6B72FF",
  "--background": "#0C0A09",
  "--foreground": "#F6F4EE",
  "--primary-foreground": "#FFFFFF",
  "--card-solid": "#1C1917",
  "--primary-glow": "rgba(255, 107, 74, 0.12)",
  "--secondary-glow": "rgba(255, 82, 119, 0.12)",
  "--tertiary-glow": "rgba(107, 114, 255, 0.12)",
  "--color-box1-bg": "#18181B",
  "--color-box1-border": "#3F3F46",
  "--color-box1-text": "#F6F4EE",
  "--color-box1-muted": "rgba(246, 244, 238, 0.5)",
  "--color-box1-icon-bg": "rgba(107, 114, 255, 0.15)",
  "--color-box1-icon": "#6B72FF",
  "--color-box2-bg": "#18181B",
  "--color-box2-border": "#3F3F46",
  "--color-box2-text": "#F6F4EE",
  "--color-box2-muted": "rgba(246, 244, 238, 0.5)",
  "--color-box2-icon-bg": "rgba(255, 82, 119, 0.15)",
  "--color-box2-icon": "#FF5277",
  "--color-box3-bg": "#18181B",
  "--color-box3-border": "#3F3F46",
  "--color-box3-text": "#F6F4EE",
  "--color-box3-muted": "rgba(246, 244, 238, 0.5)",
  "--color-box3-icon-bg": "rgba(107, 114, 255, 0.15)",
  "--color-box3-icon": "#6B72FF",
  "--color-box4-bg": "#18181B",
  "--color-box4-border": "#3F3F46",
  "--color-box4-text": "#F6F4EE",
  "--color-box4-muted": "rgba(246, 244, 238, 0.5)",
  "--color-box4-icon-bg": "rgba(255, 209, 102, 0.15)",
  "--color-box4-icon": "#FF6B4A",
};

const DEFAULT_PROFILE = {
  name: "Alex Developer",
  techDomain: "Web Development",
  improvementArea:
    "Working on mastering System Design and backend architecture using Node.js.",
  location: "Bhubaneswar, India",
  educationLevel: "B.Tech CSE, KIIT University",
  yearsOfExperience: 3,
  expectedSalary: "12,00,000",
  noticePeriod: "1 Month",
  workPreference: "Hybrid",
  targetRoles: ["Frontend Developer", "Software Engineer"],
  techSkills: ["React", "TypeScript", "Node.js", "Python", "C++", "TailwindCSS"],
  softSkills: ["Communication", "Agile", "Problem Solving"],
  github: "github.com/alexdev",
  linkedin: "linkedin.com/in/alexdev",
  portfolio: "alexdev.tech",
  work: [
    {
      name: "Tech Corp",
      position: "Frontend Developer",
      startDate: "Jan 2022",
      endDate: "Present",
    },
  ],
  projects: [
    { name: "CareerLens AI Platform" },
    { name: "Real-time Crypto Tracker" },
    { name: "E-Commerce Microservices" },
  ],
  certificates: [
    { name: "AWS Certified Cloud Practitioner" },
    { name: "Meta Front-End Developer" },
  ],
  languages: ["English", "Hindi", "Odia"],
};

const mergeProfileData = (data) => ({
  ...DEFAULT_PROFILE,
  ...(data || {}),
  targetRoles: Array.isArray(data?.targetRoles) ? data.targetRoles : DEFAULT_PROFILE.targetRoles,
  techSkills: Array.isArray(data?.techSkills) ? data.techSkills : DEFAULT_PROFILE.techSkills,
  softSkills: Array.isArray(data?.softSkills) ? data.softSkills : DEFAULT_PROFILE.softSkills,
  work: Array.isArray(data?.work) ? data.work : DEFAULT_PROFILE.work,
  projects: Array.isArray(data?.projects) ? data.projects : DEFAULT_PROFILE.projects,
  certificates: Array.isArray(data?.certificates) ? data.certificates : DEFAULT_PROFILE.certificates,
  languages: Array.isArray(data?.languages) ? data.languages : DEFAULT_PROFILE.languages,
});

const formatResumeSize = (sizeBytes) => {
  const mb = sizeBytes / (1024 * 1024);
  return `${(mb < 0.1 ? 0.1 : mb).toFixed(1)} MB`;
};

const formatResumeDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const mapResumesForUi = (resumes) =>
  (Array.isArray(resumes) ? resumes : []).map((resume, index) => ({
    id: resume.id,
    name: resume.displayName || resume.originalName || "Untitled Resume",
    date: formatResumeDate(resume.createdAt || new Date().toISOString()),
    size: formatResumeSize(Number(resume.sizeBytes || 0)),
    boxId: (index % 4) + 1,
  }));

const initialHistory = [];

export default function Dashboard({
  onOpenProfile,
  onOpenResumeAnalysis,
  onOpenMockInterview,
  onOpenLanding,
  isDarkMode: controlledIsDarkMode,
  onToggleTheme,
}) {
  const [internalDarkMode, setInternalDarkMode] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [history, setHistory] = useState(initialHistory);
  const [mockProfile, setMockProfile] = useState(DEFAULT_PROFILE);

  // Modals & Inline interactions
  const [actionModal, setActionModal] = useState({ type: null, payload: null });
  const [renameInput, setRenameInput] = useState("");
  const [isVaultBusy, setIsVaultBusy] = useState(false);

  const fileInputRef = useRef(null);

  const isDarkMode =
    typeof controlledIsDarkMode === "boolean"
      ? controlledIsDarkMode
      : internalDarkMode;
  const toggleTheme = () => {
    if (onToggleTheme) {
      onToggleTheme();
      return;
    }
    setInternalDarkMode((prev) => !prev);
  };
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(currentTheme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [currentTheme]);

  useEffect(() => {
    let isActive = true;

    const loadProfile = async () => {
      try {
        const response = await onboardingApi.get();
        if (!isActive) return;
        setMockProfile(mergeProfileData(response?.data));
      } catch {
        if (!isActive) return;
        setMockProfile(DEFAULT_PROFILE);
      }
    };

    loadProfile();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadResumes = async () => {
      try {
        const response = await resumesApi.list();
        if (!isActive) return;
        setResumes(mapResumesForUi(response?.data));
      } catch {
        if (!isActive) return;
        setResumes([]);
      }
    };

    loadResumes();

    return () => {
      isActive = false;
    };
  }, []);

  // Prevent background scrolling when global modal is open
  useEffect(() => {
    if (actionModal.type) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [actionModal.type]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsVaultBusy(true);
      await resumesApi.upload(file);
      const response = await resumesApi.list();
      setResumes(mapResumesForUi(response?.data));
    } catch (error) {
      alert(error?.message || "Failed to upload resume.");
    } finally {
      setIsVaultBusy(false);
    }
    e.target.value = null;
  };

  const confirmResumeDelete = async () => {
    if (actionModal.payload) {
      try {
        setIsVaultBusy(true);
        await resumesApi.remove(actionModal.payload);
        setResumes((prev) => prev.filter((r) => r.id !== actionModal.payload));
      } catch (error) {
        alert(error?.message || "Failed to delete resume.");
      } finally {
        setIsVaultBusy(false);
      }
      setActionModal({ type: null, payload: null });
    }
  };

  const confirmRename = async () => {
    if (renameInput.trim() !== "" && actionModal.payload?.id) {
      try {
        setIsVaultBusy(true);
        const response = await resumesApi.rename(actionModal.payload.id, renameInput.trim());
        const updatedName =
          response?.data?.displayName || renameInput.trim();
        setResumes((prev) =>
          prev.map((r) =>
            r.id === actionModal.payload.id
              ? {
                  ...r,
                  name: updatedName,
                }
              : r,
          ),
        );
        setActionModal({ type: null, payload: null });
      } catch (error) {
        alert(error?.message || "Failed to rename resume.");
      } finally {
        setIsVaultBusy(false);
      }
    }
  };

  const openResumePreview = async (resume) => {
    try {
      setIsVaultBusy(true);
      const response = await resumesApi.getViewUrl(resume.id);
      const signedUrl = response?.data?.signedUrl;
      if (!signedUrl) {
        alert("Unable to generate resume preview link.");
        return;
      }
      setActionModal({
        type: "preview",
        payload: {
          name: resume.name,
          url: signedUrl,
        },
      });
    } catch (error) {
      alert(error?.message || "Failed to open resume preview.");
    } finally {
      setIsVaultBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] font-['Plus_Jakarta_Sans',sans-serif] text-[var(--foreground)] transition-colors duration-500 selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fira+Code:wght@400;500;700&display=swap');
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-75 { animation-delay: 75ms; }
        .delay-150 { animation-delay: 150ms; }
        .delay-200 { animation-delay: 200ms; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
      `}</style>

      <OverlaySidebarNav
        isOpen={isNavOpen}
        setIsOpen={setIsNavOpen}
        activeItem="dashboard"
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onOpenLanding={onOpenLanding}
        onOpenDashboard={undefined}
        onOpenResumeAnalysis={onOpenResumeAnalysis}
        onOpenMockInterview={onOpenMockInterview}
        onOpenProfile={onOpenProfile}
        backdropZClass="z-40"
        navZClass="z-50"
      />

      {/* --- GLOBAL MODALS --- */}
      {actionModal.type && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in-up">
          {actionModal.type === "delete" && (
            <div className="bg-[var(--card-solid)] border border-[var(--border)] rounded-[2rem] p-8 max-w-md w-full shadow-2xl animate-scale-in">
              <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-6">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-2xl font-extrabold mb-2">Delete Resume?</h3>
              <p className="text-[var(--foreground)]/70 font-medium mb-8">
                Are you sure you want to delete this file? Any history using
                this resume will become disabled.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setActionModal({ type: null, payload: null })}
                  className="flex-1 py-3.5 rounded-xl font-bold bg-[var(--background)] border border-[var(--border)]"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmResumeDelete}
                  disabled={isVaultBusy}
                  className="flex-1 py-3.5 rounded-xl font-bold text-white bg-red-500 shadow-lg shadow-red-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
          {actionModal.type === "rename" && (
            <div className="bg-[var(--card-solid)] border border-[var(--border)] rounded-[2rem] p-8 max-w-md w-full shadow-2xl animate-scale-in">
              <h3 className="text-2xl font-extrabold mb-6">Rename Resume</h3>
              <input
                autoFocus
                value={renameInput}
                onChange={(e) => setRenameInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && confirmRename()}
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-5 py-4 mb-8 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 text-[var(--foreground)] font-medium"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setActionModal({ type: null, payload: null })}
                  className="flex-1 py-3.5 rounded-xl font-bold bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)]"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRename}
                  disabled={isVaultBusy}
                  className="flex-1 py-3.5 rounded-xl font-bold text-white bg-[var(--primary)] shadow-lg shadow-[var(--primary)]/20"
                >
                  Save
                </button>
              </div>
            </div>
          )}
          {actionModal.type === "preview" && (
            <div className="bg-[var(--card-solid)] border border-[var(--border)] rounded-[2rem] p-8 max-w-4xl w-full h-[80vh] shadow-2xl animate-scale-in flex flex-col">
              <div className="flex justify-between items-center mb-6 border-b border-[var(--border)] pb-4">
                <h3 className="text-xl font-extrabold pr-4 truncate flex items-center gap-3 text-[var(--foreground)]">
                  <div className="p-2 bg-[var(--tertiary)]/10 text-[var(--tertiary)] rounded-lg">
                    <FileText size={20} />
                  </div>
                  {actionModal.payload?.name}
                </h3>
                <button
                  onClick={() => setActionModal({ type: null, payload: null })}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--muted)] text-[var(--foreground)]"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 bg-[var(--background)] rounded-[1.5rem] border border-[var(--border)] overflow-hidden">
                {actionModal.payload?.url ? (
                  <iframe
                    title={actionModal.payload?.name || "Resume Preview"}
                    src={actionModal.payload.url}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-sm font-medium text-[var(--foreground)]/60">
                    Preview is unavailable right now.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,var(--primary-glow)_0%,transparent_60%)] opacity-40"></div>
        <div className="absolute top-[0%] right-[-10%] w-[50%] h-[70%] bg-[radial-gradient(circle_at_center,var(--tertiary-glow)_0%,transparent_60%)] opacity-40"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1500px] mx-auto flex flex-col lg:flex-row items-start min-h-screen">
        {/* === COLUMN 1: SIDEBAR === */}
        <aside className="w-full lg:w-[340px] xl:w-[380px] lg:sticky lg:top-0 lg:h-screen p-4 lg:p-5 z-30 flex flex-col animate-fade-in-up delay-75 shrink-0">
          <div className="bg-[var(--card-solid)] border border-[var(--border)] rounded-[2rem] shadow-sm flex flex-col h-[calc(100vh-40px)] overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[var(--card-solid)] to-transparent z-20 pointer-events-none"></div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-10 flex flex-col relative z-10">
              <div className="flex items-center gap-4 mb-6 shrink-0">
                <div className="w-16 h-16 rounded-[1.2rem] bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)] flex items-center justify-center shadow-md shrink-0 text-white">
                  <UserIcon size={28} strokeWidth={2.5} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl font-extrabold tracking-tight truncate text-[var(--foreground)]">
                    {mockProfile.name}
                  </h2>
                  <p className="text-[var(--foreground)]/60 font-bold uppercase text-[10px] tracking-wider truncate mt-0.5">
                    {mockProfile.techDomain}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-6 shrink-0">
                <div className="text-[var(--foreground)]/80 font-medium text-[13px] leading-relaxed border-b border-[var(--border)] pb-6">
                  {mockProfile.improvementArea}
                </div>

                <div className="flex flex-col gap-3.5 border-b border-[var(--border)] pb-6">
                  <div className="flex items-center gap-3 text-[var(--foreground)]/80 font-medium text-sm">
                    <MapPin
                      size={16}
                      className="text-[var(--primary)] shrink-0"
                    />{" "}
                    <span className="truncate">{mockProfile.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--foreground)]/80 font-medium text-sm">
                    <GraduationCap
                      size={16}
                      className="text-[var(--secondary)] shrink-0"
                    />{" "}
                    <span className="truncate">{mockProfile.educationLevel}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--foreground)]/80 font-medium text-sm">
                    <Briefcase
                      size={16}
                      className="text-[var(--tertiary)] shrink-0"
                    />{" "}
                    <span className="truncate">
                      {mockProfile.yearsOfExperience} Years Experience
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3.5 border-b border-[var(--border)] pb-6">
                  <div className="flex items-center gap-3 text-[var(--foreground)]/80 font-medium text-sm hover:text-[var(--primary)] cursor-pointer">
                    <Globe size={16} className="opacity-40 shrink-0" />{" "}
                    <span className="truncate">{mockProfile.portfolio}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--foreground)]/80 font-medium text-sm hover:text-[var(--primary)] cursor-pointer">
                    <Github size={16} className="opacity-40 shrink-0" />{" "}
                    <span className="truncate">{mockProfile.github}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--foreground)]/80 font-medium text-sm hover:text-[var(--primary)] cursor-pointer">
                    <Linkedin size={16} className="opacity-40 shrink-0" />{" "}
                    <span className="truncate">{mockProfile.linkedin}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3.5 border-b border-[var(--border)] pb-6">
                  <div className="flex items-start gap-3 text-[var(--foreground)]/80 font-medium text-sm">
                    <Target
                      size={16}
                      className="text-[var(--primary)] shrink-0 mt-0.5"
                    />
                    <div className="flex flex-col gap-1.5 w-full">
                      <span className="text-xs font-bold text-[var(--foreground)]/80 leading-snug">
                        {mockProfile.targetRoles.join(", ")}
                      </span>
                      <span className="text-[10px] font-bold text-[var(--foreground)]/40 uppercase tracking-wider">
                        ₹{mockProfile.expectedSalary} •{" "}
                        {mockProfile.workPreference} • {mockProfile.noticePeriod}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[var(--foreground)]/80 font-medium border-b border-[var(--border)] pb-6">
                  <Code
                    size={18}
                    className="text-[var(--accent)] mt-0.5 shrink-0"
                  />
                  <div className="flex flex-wrap gap-2">
                    {mockProfile.techSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1.5 rounded-md bg-[var(--background)] border border-[var(--border)] text-[11px] font-bold text-[var(--foreground)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[var(--foreground)]/80 font-medium border-b border-[var(--border)] pb-6">
                  <MessageSquare
                    size={18}
                    className="text-[var(--secondary)] mt-0.5 shrink-0"
                  />
                  <div className="flex flex-wrap gap-2">
                    {mockProfile.softSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1.5 rounded-md bg-[var(--background)] border border-[var(--border)] text-[11px] font-bold text-[var(--foreground)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {mockProfile.work.length > 0 && (
                  <div className="flex items-start gap-3 text-[var(--foreground)]/80 font-medium border-b border-[var(--border)] pb-6">
                    <Briefcase
                      size={18}
                      className="text-[var(--tertiary)] mt-0.5 shrink-0"
                    />
                    <div className="flex flex-col gap-3 w-full">
                      {mockProfile.work.map((w, idx) => (
                        <div key={idx} className="flex flex-col">
                          <span className="text-xs font-bold text-[var(--foreground)]/80">
                            {w.position}
                          </span>
                          <span className="text-[10px] font-bold text-[var(--foreground)]/50 uppercase tracking-wide mt-0.5">
                            {w.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 text-[var(--foreground)]/80 font-medium border-b border-[var(--border)] pb-6">
                  <FolderKanban
                    size={18}
                    className="text-[var(--primary)] mt-0.5 shrink-0"
                  />
                  <div className="flex flex-col gap-2.5 w-full">
                    {mockProfile.projects.map((proj, idx) => (
                      <div
                        key={idx}
                        className="text-xs font-bold text-[var(--foreground)]/80"
                      >
                        {proj.name}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[var(--foreground)]/80 font-medium border-b border-[var(--border)] pb-6">
                  <Award
                    size={18}
                    className="text-[var(--secondary)] mt-0.5 shrink-0"
                  />
                  <div className="flex flex-col gap-2.5 w-full">
                    {mockProfile.certificates.map((cert, idx) => (
                      <div
                        key={idx}
                        className="text-xs font-bold text-[var(--foreground)]/80 leading-snug"
                      >
                        {cert.name}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[var(--foreground)]/80 font-medium mb-4">
                  <Globe
                    size={18}
                    className="text-[var(--tertiary)] mt-0.5 shrink-0"
                  />
                  <div className="flex flex-col gap-2 w-full">
                    {mockProfile.languages.map((lang) => (
                      <div
                        key={lang}
                        className="text-xs font-bold text-[var(--foreground)]/70"
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 bg-[var(--card-solid)] border-t border-[var(--border)] z-20">
              <button
                type="button"
                onClick={onOpenProfile}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all flex items-center justify-center gap-2"
              >
                <Edit2 size={16} /> Edit Profile Data
              </button>
            </div>
          </div>
        </aside>

        {/* === COLUMN 2: MAIN === */}
        <main className="flex-1 w-full flex flex-col min-h-screen px-4 lg:px-6">
          <header className="w-full py-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-[var(--tertiary)]" />
              <span className="text-xl font-extrabold tracking-tighter text-[var(--foreground)]">
                CareerLens
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)] flex items-center justify-center text-white font-bold text-sm shadow-md">
                A
              </div>
            </div>
          </header>

          <div className="flex flex-col gap-8 pb-12 w-full">
            <section className="animate-fade-in-up delay-150">
              <h2 className="text-2xl font-extrabold tracking-tighter mb-4 text-[var(--foreground)]">
                Resume Vault
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-[3px] border-dashed border-[var(--primary)] bg-[var(--card-solid)] rounded-[2rem] p-5 shadow-sm hover:-translate-y-1 hover:bg-[var(--primary)]/5 transition-all group flex flex-col items-center justify-center text-center cursor-pointer min-h-[160px]"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[var(--background)] border border-[var(--primary)]/30 mb-3 text-[var(--primary)] group-hover:scale-110 transition-transform">
                    <Plus size={28} strokeWidth={2.5} />
                  </div>
                  <h4 className="font-extrabold text-base text-[var(--foreground)]">
                    Upload New Resume
                  </h4>
                  <p className="text-[11px] font-bold mt-1 text-[var(--foreground)]/50">
                    PDF, DOCX up to 5MB
                  </p>
                </div>

                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="border rounded-[2rem] p-5 shadow-sm hover:-translate-y-1 transition-all group flex flex-col cursor-default"
                    style={{
                      backgroundColor: `var(--color-box${resume.boxId}-bg)`,
                      borderColor: `var(--color-box${resume.boxId}-border)`,
                      color: `var(--color-box${resume.boxId}-text)`,
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-[1rem] flex items-center justify-center shadow-sm"
                        style={{
                          backgroundColor: `var(--color-box${resume.boxId}-icon-bg)`,
                          color: `var(--color-box${resume.boxId}-icon)`,
                        }}
                      >
                        <FileText size={22} />
                      </div>
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                        <button
                          onClick={() => openResumePreview(resume)}
                          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 dark:bg-black/20 hover:scale-110 shadow-sm"
                          style={{
                            color: `var(--color-box${resume.boxId}-text)`,
                          }}
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => {
                            setActionModal({ type: "rename", payload: resume });
                            setRenameInput(resume.name);
                          }}
                          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 dark:bg-black/20 hover:scale-110 shadow-sm"
                          style={{
                            color: `var(--color-box${resume.boxId}-text)`,
                          }}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() =>
                            setActionModal({
                              type: "delete",
                              payload: resume.id,
                            })
                          }
                          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 dark:bg-black/20 hover:scale-110 hover:text-red-500 shadow-sm"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <h4 className="font-extrabold text-base truncate mb-1">
                      {resume.name}
                    </h4>
                    <div
                      className="flex justify-between items-center text-[11px] font-bold mt-auto pt-2"
                      style={{ color: `var(--color-box${resume.boxId}-muted)` }}
                    >
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} /> {resume.date}
                      </span>
                      <span>{resume.size}</span>
                    </div>
                  </div>
                ))}

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
              </div>
            </section>

            <section className="animate-fade-in-up delay-200">
              <h2 className="text-2xl font-extrabold tracking-tighter mb-4 text-[var(--foreground)]">
                Analysis History
              </h2>
              <div className="bg-[var(--card-solid)] border border-[var(--border)] rounded-[2rem] overflow-hidden shadow-sm flex flex-col min-h-[300px]">
                <div className="hidden sm:grid grid-cols-12 gap-3 p-5 border-b border-[var(--border)] text-[10px] font-black text-[var(--foreground)]/50 uppercase tracking-[0.2em] font-['Fira_Code',monospace] bg-[var(--background)]">
                  <div className="col-span-3">Date</div>
                  <div className="col-span-5">Target Role</div>
                  <div className="col-span-3 text-center">ATS Score</div>
                  <div className="col-span-1"></div>
                </div>

                {history.length > 0 ? (
                  <div className="flex flex-col">
                  {history.map((item) => {
                    const shouldCheckDeletion =
                      typeof item.resumeId === "string" && item.resumeId.length === 24;
                    const isDeleted = shouldCheckDeletion
                      ? !resumes.find((r) => r.id === item.resumeId)
                      : false;
                    const scoreColor =
                      item.score >= 80
                        ? "text-[var(--tertiary)] bg-[var(--tertiary)]/10 border-[var(--tertiary)]/20"
                        : item.score >= 60
                          ? "text-[var(--accent)] bg-[var(--accent)]/10 border-[var(--accent)]/20"
                          : "text-[var(--primary)] bg-[var(--primary)]/10 border-[var(--primary)]/20";

                      return (
                        <div
                          key={item.id}
                          className={`group flex flex-col sm:grid sm:grid-cols-12 gap-3 p-5 border-b border-[var(--border)] last:border-b-0 items-start sm:items-center transition-all duration-300 ${isDeleted ? "opacity-50 bg-[var(--background)]/30 cursor-not-allowed" : "hover:bg-[var(--background)] cursor-pointer"}`}
                        >
                        <div className="col-span-3 flex items-center gap-2 text-sm font-bold text-[var(--foreground)]/70">
                          <Clock
                            size={14}
                            className="text-[var(--foreground)]/40"
                          />{" "}
                          {item.date}
                        </div>

                        <div className="col-span-5 flex items-center gap-3 w-full">
                          <div className="w-8 h-8 rounded-lg bg-[var(--background)] border border-[var(--border)] shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Target
                              size={14}
                              className="text-[var(--foreground)]/60"
                            />
                          </div>
                          <span className="font-extrabold text-[var(--foreground)] truncate text-sm">
                            {item.targetRole}
                          </span>
                          {isDeleted && (
                            <div className="group/warn relative">
                              <AlertCircle
                                size={16}
                                className="text-[var(--primary)] shrink-0"
                              />
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover/warn:opacity-100 transition-opacity whitespace-nowrap z-50">
                                Source resume deleted
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="col-span-3 flex justify-start sm:justify-center w-full mt-2 sm:mt-0">
                          <span
                            className={`px-3 py-1.5 rounded-full text-xs font-extrabold border ${scoreColor} flex items-center gap-1.5 shadow-sm group-hover:scale-105 transition-transform`}
                          >
                            <TrendingUp size={12} /> {item.score} / 100
                          </span>
                        </div>

                        <div className="col-span-1 hidden sm:flex justify-end text-[var(--foreground)]/30 group-hover:text-[var(--foreground)] transition-all group-hover:translate-x-1 duration-300">
                          <ArrowRight
                            size={18}
                            className={isDeleted ? "invisible" : ""}
                          />
                        </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center mb-4">
                      <Clock size={28} className="opacity-20" />
                    </div>
                    <h3 className="text-lg font-extrabold mb-1">No history found</h3>
                    <p className="text-sm font-medium text-[var(--foreground)]/40 max-w-xs">
                      Your analysis entries will appear here after you run your first resume scan.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
