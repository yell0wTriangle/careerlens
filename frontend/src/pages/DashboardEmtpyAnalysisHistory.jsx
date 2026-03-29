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
  Mail,
  Phone,
  Github,
  Linkedin,
  GraduationCap,
  Globe,
  Award,
  FolderKanban,
  Zap,
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
} from "lucide-react";

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

const mockProfile = {
  name: "Alex Developer",
  location: "Bhubaneswar, India",
  role: "Software Engineer",
  experience: "3rd Year B.Tech",
  education: "B.Tech CSE, KIIT University",
  bio: "Passionate 3rd-year Computer Science student focused on full-stack web development and modern system architecture. Ready to optimize my professional trajectory with AI insights.",
  skills: ["React", "TypeScript", "Node.js", "Python", "C++", "TailwindCSS"],
  projects: [
    "CareerLens AI Platform",
    "Real-time Crypto Tracker",
    "E-Commerce Microservices",
  ],
  certifications: [
    "AWS Certified Cloud Practitioner",
    "Meta Front-End Developer",
  ],
  contact: {
    email: "alex.dev@kiit.edu",
    phone: "+91 98765 43210",
    github: "github.com/alexdev",
    linkedin: "linkedin.com/in/alexdev",
  },
  languages: ["English (Native)", "Hindi (Fluent)"],
};

// Vault Data (5 items for perfect grid testing)
const initialResumes = [
  {
    id: "r1",
    name: "Alex_Dev_Resume_2026.pdf",
    date: "Oct 24, 2026",
    size: "1.2 MB",
    boxId: 1,
  },
  {
    id: "r2",
    name: "Frontend_Specific_v2.pdf",
    date: "Oct 15, 2026",
    size: "0.8 MB",
    boxId: 2,
  },
  {
    id: "r3",
    name: "Backend_Architecture.pdf",
    date: "Sep 28, 2026",
    size: "1.5 MB",
    boxId: 3,
  },
  {
    id: "r4",
    name: "Fullstack_General_OLD.pdf",
    date: "Aug 10, 2026",
    size: "2.1 MB",
    boxId: 4,
  },
  {
    id: "r5",
    name: "Internship_Application_2025.pdf",
    date: "Jul 22, 2025",
    size: "1.1 MB",
    boxId: 1,
  },
];

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
  const [resumes, setResumes] = useState(initialResumes);
  const [history, setHistory] = useState(initialHistory);

  // Modals & Inline interactions
  const [actionModal, setActionModal] = useState({ type: null, payload: null });
  const [renameInput, setRenameInput] = useState("");

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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    const newResume = {
      id: `r${Date.now()}`,
      name: file.name,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      size: `${sizeInMB === "0.0" ? "0.1" : sizeInMB} MB`,
      boxId: (resumes.length % 4) + 1,
    };

    setResumes((prev) => [newResume, ...prev]);
    e.target.value = null;
  };

  const confirmResumeDelete = () => {
    if (actionModal.payload) {
      setResumes((prev) => prev.filter((r) => r.id !== actionModal.payload));
      setActionModal({ type: null, payload: null });
    }
  };

  const confirmRename = () => {
    if (renameInput.trim() !== "" && actionModal.payload?.id) {
      setResumes((prev) =>
        prev.map((r) =>
          r.id === actionModal.payload.id
            ? {
                ...r,
                name: renameInput.endsWith(".pdf")
                  ? renameInput
                  : `${renameInput}.pdf`,
              }
            : r,
        ),
      );
      setActionModal({ type: null, payload: null });
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

      {/* --- GLOBAL UNIFIED NAVBAR --- */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-md transition-all duration-500 ${
          isNavOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsNavOpen(false)}
      />

      <div
        className={`fixed left-0 top-0 bottom-0 z-50 flex transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="relative z-10 w-20 md:w-24 h-full flex flex-col items-center justify-between py-8 md:py-10 bg-[var(--card-solid)] border-r border-[var(--border)] shadow-[4px_0_24px_rgba(0,0,0,0.1)]">
          <div className="flex flex-col items-center gap-6">
            <button
              type="button"
              onClick={onOpenLanding}
              className="w-12 h-12 md:w-14 md:h-14 bg-[var(--tertiary)] text-white flex items-center justify-center font-bold"
              style={{ borderRadius: "16px 16px 4px 16px" }}
            >
              <Sparkles size={24} />
            </button>
            <span className="text-sm md:text-base font-black tracking-[0.5em] text-[var(--foreground)] uppercase [writing-mode:vertical-rl] rotate-180 opacity-40 font-['Fira_Code',monospace]">
              CAREERLENS
            </span>
          </div>

          <div className="flex flex-col gap-4 items-center w-full px-4">
            <button
              type="button"
              onClick={() => setIsNavOpen(false)}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--primary)] border border-transparent text-white flex items-center justify-center transition-all duration-300 shadow-md shadow-[var(--primary)]/20 group"
              title="Dashboard"
            >
              <LayoutDashboard
                size={20}
                strokeWidth={2}
                className="group-hover:scale-110 transition-transform"
              />
            </button>
            <button
              type="button"
              onClick={() => {
                if (onOpenResumeAnalysis) onOpenResumeAnalysis();
                setIsNavOpen(false);
              }}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--background)] border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] text-[var(--foreground)] flex items-center justify-center transition-all duration-300 shadow-sm group"
              title="Resume Upload & Analysis"
            >
              <Upload
                size={20}
                strokeWidth={2}
                className="group-hover:scale-110 transition-transform"
              />
            </button>
            <button
              type="button"
              onClick={() => {
                if (onOpenMockInterview) onOpenMockInterview();
                setIsNavOpen(false);
              }}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--background)] border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] text-[var(--foreground)] flex items-center justify-center transition-all duration-300 shadow-sm group"
              title="Mock AI Interview"
            >
              <Bot
                size={20}
                strokeWidth={2}
                className="group-hover:scale-110 transition-transform"
              />
            </button>
            <button
              type="button"
              onClick={() => {
                if (onOpenProfile) onOpenProfile();
                setIsNavOpen(false);
              }}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--background)] border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] text-[var(--foreground)] flex items-center justify-center transition-all duration-300 shadow-sm group"
              title="Profile"
            >
              <UserIcon
                size={20}
                strokeWidth={2}
                className="group-hover:scale-110 transition-transform"
              />
            </button>

            <div className="w-8 h-[2px] bg-[var(--border)] rounded-full mx-auto my-3 opacity-50"></div>

            <button
              onClick={toggleTheme}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--background)] border border-[var(--border)] hover:border-[var(--border)] hover:bg-[var(--muted)] text-[var(--foreground)] flex items-center justify-center transition-all duration-300 shadow-sm group"
              title="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun
                  size={20}
                  strokeWidth={2}
                  className="group-hover:rotate-45 transition-transform"
                />
              ) : (
                <Moon
                  size={20}
                  strokeWidth={2}
                  className="group-hover:-rotate-12 transition-transform"
                />
              )}
            </button>
          </div>
        </nav>

        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="absolute -right-6 md:-right-7 top-1/2 -translate-y-1/2 w-6 md:w-7 h-24 bg-[var(--card-solid)] border-y border-r border-[var(--border)] border-l-0 flex items-center justify-end pr-1 text-[var(--foreground)] opacity-60 hover:opacity-100 hover:text-[var(--primary)] transition-colors shadow-[4px_0_12px_rgba(0,0,0,0.05)] cursor-pointer focus:outline-none z-0"
          style={{ borderRadius: "0 100% 100% 0 / 0 50% 50% 0" }}
        >
          <ChevronRight
            size={16}
            className={`transition-transform duration-500 shrink-0 ${isNavOpen ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      </div>

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
                  {actionModal.payload}
                </h3>
                <button
                  onClick={() => setActionModal({ type: null, payload: null })}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--muted)] text-[var(--foreground)]"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 bg-[var(--background)] rounded-[1.5rem] flex items-center justify-center border border-[var(--border)] relative overflow-hidden group">
                <div className="w-[70%] max-w-[500px] h-full bg-white shadow-xl mt-8 rounded-t-sm flex flex-col p-8 md:p-12 gap-6 opacity-70 border border-gray-200">
                  <div className="w-1/3 h-6 bg-gray-200 rounded-sm mb-4"></div>
                  <div className="w-full h-px bg-gray-200 mb-2"></div>
                  <div className="w-full h-3 bg-gray-100 rounded-sm"></div>
                  <div className="w-[90%] h-3 bg-gray-100 rounded-sm"></div>
                  <div className="w-[80%] h-3 bg-gray-100 rounded-sm mb-4"></div>
                  <div className="w-1/4 h-5 bg-gray-200 rounded-sm mb-2"></div>
                  <div className="w-full h-3 bg-gray-100 rounded-sm"></div>
                  <div className="w-[85%] h-3 bg-gray-100 rounded-sm"></div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5 backdrop-blur-sm pointer-events-none">
                  <div className="bg-[var(--card-solid)] border border-[var(--border)] px-6 py-4 rounded-full shadow-xl flex items-center gap-3">
                    <Eye size={20} className="text-[var(--tertiary)]" />
                    <span className="font-bold text-sm text-[var(--foreground)]">
                      Interactive Viewer Simulated
                    </span>
                  </div>
                </div>
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
                    {mockProfile.role}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-6 shrink-0">
                <div className="text-[var(--foreground)]/80 font-medium text-[13px] leading-relaxed border-b border-[var(--border)] pb-6">
                  {mockProfile.bio}
                </div>

                <div className="flex flex-col gap-3.5 border-b border-[var(--border)] pb-6">
                  <div className="flex items-center gap-3 text-[var(--foreground)]/80 font-medium text-sm">
                    <MapPin size={16} className="text-[var(--primary)]" />{" "}
                    {mockProfile.location}
                  </div>
                  <div className="flex items-center gap-3 text-[var(--foreground)]/80 font-medium text-sm">
                    <GraduationCap
                      size={16}
                      className="text-[var(--secondary)]"
                    />{" "}
                    {mockProfile.education}
                  </div>
                  <div className="flex items-center gap-3 text-[var(--foreground)]/80 font-medium text-sm">
                    <Briefcase size={16} className="text-[var(--tertiary)]" />{" "}
                    {mockProfile.experience}
                  </div>
                </div>

                <div className="flex flex-col gap-3.5 border-b border-[var(--border)] pb-6">
                  <div className="flex items-center gap-3 text-[var(--foreground)]/80 font-medium text-sm hover:text-[var(--primary)] cursor-pointer">
                    <Mail size={16} className="opacity-40" />{" "}
                    {mockProfile.contact.email}
                  </div>
                  <div className="flex items-center gap-3 text-[var(--foreground)]/80 font-medium text-sm hover:text-[var(--primary)] cursor-pointer">
                    <Phone size={16} className="opacity-40" />{" "}
                    {mockProfile.contact.phone}
                  </div>
                  <div className="flex items-center gap-3 text-[var(--foreground)]/80 font-medium text-sm hover:text-[var(--primary)] cursor-pointer">
                    <Github size={16} className="opacity-40" />{" "}
                    {mockProfile.contact.github}
                  </div>
                  <div className="flex items-center gap-3 text-[var(--foreground)]/80 font-medium text-sm hover:text-[var(--primary)] cursor-pointer">
                    <Linkedin size={16} className="opacity-40" />{" "}
                    {mockProfile.contact.linkedin}
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[var(--foreground)]/80 font-medium border-b border-[var(--border)] pb-6">
                  <Code size={18} className="text-[var(--accent)] mt-0.5" />
                  <div className="flex flex-wrap gap-2">
                    {mockProfile.skills.map((skill) => (
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
                        {proj}
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
                    {mockProfile.certifications.map((cert, idx) => (
                      <div
                        key={idx}
                        className="text-xs font-bold text-[var(--foreground)]/80 leading-snug"
                      >
                        {cert}
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
                          onClick={() =>
                            setActionModal({
                              type: "preview",
                              payload: resume.name,
                            })
                          }
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
                    const isDeleted = !resumes.find(
                      (r) => r.id === item.resumeId,
                    );
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
