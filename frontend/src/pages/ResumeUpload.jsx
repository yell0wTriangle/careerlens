import React, { useState, useRef } from "react";
import {
  ArrowLeft,
  UploadCloud,
  FileText,
  X,
  Sparkles,
  Sun,
  Moon,
  Briefcase,
  AlignLeft,
  LayoutDashboard,
  Upload,
  ArrowRight,
  Search,
  ChevronRight,
  User,
  Bot,
} from "lucide-react";

// --- Theme Configurations (Synced with Landing) ---
const lightTheme = {
  "--card": "#FFFFFF",
  "--muted": "#EBE6DC",
  "--accent": "#FFD166",
  "--border": "#E4DDD0",
  "--radius": "3rem",
  "--input-radius": "9999px",
  "--primary": "#F95738",
  "--secondary": "#EE4266",
  "--tertiary": "#424AE7",
  "--background": "#F6F4EE",
  "--foreground": "#1C1917",
  "--primary-foreground": "#FFFFFF",

  "--card-glass": "rgba(255, 255, 255, 0.85)",
  "--header-glass": "rgba(255, 255, 255, 0.4)",
  "--input-glass": "rgba(255, 255, 255, 0.5)",
  "--border-glass": "rgba(255, 255, 255, 0.6)",
  "--card-solid": "#FFFFFF",

  "--primary-glow": "rgba(249, 87, 56, 0.15)",
  "--secondary-glow": "rgba(238, 66, 102, 0.15)",
  "--tertiary-glow": "rgba(66, 74, 231, 0.12)",
};

const darkTheme = {
  "--card": "#1C1917",
  "--muted": "#292524",
  "--accent": "#FFD166",
  "--border": "#36312E",
  "--radius": "3rem",
  "--input-radius": "9999px",
  "--primary": "#FF6B4A",
  "--secondary": "#FF5277",
  "--tertiary": "#6B72FF",
  "--background": "#0C0A09",
  "--foreground": "#F6F4EE",
  "--primary-foreground": "#FFFFFF",

  "--card-glass": "rgba(28, 25, 23, 0.85)",
  "--header-glass": "rgba(41, 37, 36, 0.5)",
  "--input-glass": "rgba(41, 37, 36, 0.5)",
  "--border-glass": "rgba(255, 255, 255, 0.12)",
  "--card-solid": "#1C1917",

  "--primary-glow": "rgba(255, 107, 74, 0.12)",
  "--secondary-glow": "rgba(255, 82, 119, 0.12)",
  "--tertiary-glow": "rgba(107, 114, 255, 0.12)",
};

export default function ResumeUpload({
  onLaunchAnalysis,
  onReturnToLanding,
  onOpenDashboard,
  onOpenProfile,
  onOpenMockInterview,
  isDarkMode: controlledIsDarkMode,
  onToggleTheme,
}) {
  const [internalDarkMode, setInternalDarkMode] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Form State
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [targetMode, setTargetMode] = useState("title"); // "title" | "description"
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Dropdown State & Data
  const [showTitleDropdown, setShowTitleDropdown] = useState(false);
  const commonJobTitles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Software Engineer",
    "React Developer",
    "Angular Developer",
    "Vue Developer",
    "Data Scientist",
    "Data Analyst",
    "Machine Learning Engineer",
    "Product Manager",
    "Project Manager",
    "UI/UX Designer",
    "DevOps Engineer",
    "Cloud Architect",
    "Mobile App Developer",
    "iOS Developer",
    "Android Developer",
  ];

  const filteredTitles = commonJobTitles.filter((title) =>
    title.toLowerCase().includes(jobTitle.toLowerCase()),
  );

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

  // Drag and Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (selectedFile) => {
    if (
      selectedFile &&
      (selectedFile.type === "application/pdf" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      if (onLaunchAnalysis) onLaunchAnalysis();
    }, 2500);
  };

  const inputBaseClass =
    "w-full px-6 py-4 bg-[var(--input-glass)] border border-[var(--border)] rounded-full text-lg font-medium text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:bg-[var(--card-solid)] transition-all placeholder:text-[var(--foreground)]/40 shadow-sm";

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fira+Code:wght@400;500;700&display=swap');
        
        body { 
          background-color: ${currentTheme["--background"]}; 
          color: ${currentTheme["--foreground"]};
          transition: background-color 0.5s ease, color 0.5s ease;
          margin: 0;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        @keyframes floatSlow { 
          0%, 100% { transform: translateY(0) rotate(12deg); } 
          50% { transform: translateY(-20px) rotate(16deg); } 
        }
        @keyframes floatReverse { 
          0%, 100% { transform: translateY(0) rotate(-12deg); } 
          50% { transform: translateY(-25px) rotate(-8deg); } 
        }
        
        .animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        
        .delay-75 { animation-delay: 75ms; }
        .delay-150 { animation-delay: 150ms; }
        .delay-200 { animation-delay: 200ms; }
        .animate-float { animation: floatSlow 8s ease-in-out infinite; }
        .animate-float-reverse { animation: floatReverse 10s ease-in-out infinite; }
      `,
        }}
      />

      <div
        style={currentTheme}
        className="relative w-full min-h-screen flex items-center justify-center overflow-x-hidden bg-[var(--background)] font-['Plus_Jakarta_Sans',sans-serif] text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)] transition-colors duration-500 p-4 sm:p-8"
      >
        {/* Backdrop for blurring the main content */}
        <div
          className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-md transition-all duration-500 ${
            isNavOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsNavOpen(false)}
        />

        {/* Overlay Sidebar Navbar */}
        <div
          className={`fixed left-0 top-0 bottom-0 z-50 flex transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="relative z-10 w-20 md:w-24 h-full flex flex-col items-center justify-between py-8 md:py-10 bg-[var(--card-solid)] border-r border-[var(--border)] shadow-[4px_0_24px_rgba(0,0,0,0.1)]">
            {/* Top Logo */}
            <div className="flex flex-col items-center gap-6">
              <button
                type="button"
                onClick={onReturnToLanding}
                className="w-12 h-12 md:w-14 md:h-14 bg-[var(--tertiary)] text-white flex items-center justify-center font-bold"
                style={{ borderRadius: "16px 16px 4px 16px" }}
              >
                <Sparkles size={24} />
              </button>
              <span className="text-sm md:text-base font-black tracking-[0.5em] text-[var(--foreground)] uppercase [writing-mode:vertical-rl] rotate-180 opacity-40 font-['Fira_Code',monospace]">
                CAREERLENS
              </span>
            </div>

            {/* Nav Actions */}
            <div className="flex flex-col gap-4 items-center w-full px-4">
              <button
                type="button"
                onClick={() => {
                  if (onOpenDashboard) onOpenDashboard();
                  setIsNavOpen(false);
                }}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--input-glass)] border border-transparent hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] text-[var(--foreground)] flex items-center justify-center transition-all duration-300 shadow-sm group"
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
                onClick={() => setIsNavOpen(false)}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--primary)] border border-transparent text-white flex items-center justify-center transition-all duration-300 shadow-md shadow-[var(--primary)]/20 group"
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
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--input-glass)] border border-transparent hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] text-[var(--foreground)] flex items-center justify-center transition-all duration-300 shadow-sm group"
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
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--input-glass)] border border-transparent hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] text-[var(--foreground)] flex items-center justify-center transition-all duration-300 shadow-sm group"
                title="Profile"
              >
                <User
                  size={20}
                  strokeWidth={2}
                  className="group-hover:scale-110 transition-transform"
                />
              </button>

              <div className="w-8 h-[2px] bg-[var(--border)] rounded-full mx-auto my-3 opacity-50"></div>

              <button
                onClick={toggleTheme}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--input-glass)] border border-transparent hover:border-[var(--border)] hover:bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center transition-all duration-300 shadow-sm group"
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

          {/* The Arrow/Bump Trigger - Always Visible */}
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

        {/* Ambient Background Glows (Cleaned of duplicates) */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,var(--primary-glow)_0%,transparent_60%)] pointer-events-none z-0 transition-colors duration-500"></div>
        <div className="absolute top-[0%] right-[-10%] w-[50%] h-[70%] bg-[radial-gradient(circle_at_center,var(--tertiary-glow)_0%,transparent_60%)] pointer-events-none z-0 transition-colors duration-500"></div>
        <div className="absolute bottom-[-20%] left-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,var(--secondary-glow)_0%,transparent_60%)] pointer-events-none z-0 transition-colors duration-500"></div>

        {/* Floating Shapes (Cleaned of duplicates) */}
        <div className="absolute top-[15%] left-[10%] md:left-[20%] flex gap-2 opacity-30 pointer-events-none animate-float">
          <div className="w-20 h-20 bg-[var(--primary)] rounded-[2rem] backdrop-blur-md flex items-center justify-center shadow-2xl">
            <FileText size={28} className="text-white -rotate-12" />
          </div>
        </div>
        <div className="absolute bottom-[20%] right-[10%] md:right-[20%] flex gap-2 opacity-20 pointer-events-none animate-float-reverse">
          <div className="w-28 h-28 bg-[var(--accent)] rounded-full backdrop-blur-md shadow-2xl"></div>
        </div>

        {/* Loyal Original Card Layout */}
        <div className="relative z-10 w-full max-w-[750px] bg-[var(--card-glass)] backdrop-blur-3xl border border-[var(--border-glass)] shadow-[0_30px_80px_rgba(0,0,0,0.08)] rounded-[var(--radius)] flex flex-col overflow-hidden animate-fade-in-up">
          {/* Card Header - Cleaned up without the Dark Mode Toggle */}
          <div className="h-16 border-b border-[var(--border)]/50 bg-[var(--header-glass)] flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#EE4266]/80 shadow-sm"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[#FFD166]/80 shadow-sm"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[#82D093]/80 shadow-sm"></div>
            </div>
            <div className="hidden sm:block font-['Fira_Code',monospace] font-bold text-[var(--foreground)]/40 text-xs tracking-widest uppercase">
              resume.careerlens.app
            </div>
            <div className="w-20 hidden sm:block">
              {/* Spacer to perfectly center the URL on larger screens */}
            </div>
          </div>

          <div className="px-6 py-10 sm:px-12 flex flex-col items-center relative overflow-y-auto max-h-[85vh]">
            {/* Hero Section */}
            <div className="w-20 h-20 bg-[var(--card-solid)] border border-[var(--border)] text-[var(--primary)] flex items-center justify-center rounded-[2rem] shadow-xl mb-6 rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-default animate-fade-in-up">
              <Sparkles size={36} strokeWidth={2} />
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-[var(--foreground)] text-center mb-3 animate-fade-in-up delay-75">
              Resume Analysis
            </h1>
            <p className="text-[var(--foreground)]/60 font-medium text-center text-base max-w-md animate-fade-in-up delay-75 mb-8">
              Upload your resume and provide a target role. We'll give you an
              ATS score, identify missing keywords, and suggest formatting
              fixes.
            </p>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-8 animate-fade-in-up delay-150"
            >
              {/* 1. Resume Upload Zone */}
              <div className="w-full flex flex-col gap-3">
                <label className="text-xs font-bold text-[var(--foreground)]/50 uppercase tracking-[0.2em] font-['Fira_Code',monospace] ml-4">
                  01 // Source Document
                </label>

                <div
                  className={`relative w-full border-2 border-dashed rounded-[2.5rem] transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
                    ${isDragging ? "border-[var(--primary)] bg-[var(--primary)]/5 scale-[1.02]" : "border-[var(--border)] bg-[var(--input-glass)] hover:bg-[var(--card-solid)] hover:border-[var(--primary)]/50"}
                    ${file ? "p-6" : "p-10"} hover:shadow-sm`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e.target.files[0])}
                  />

                  {file ? (
                    <div className="flex items-center justify-between w-full bg-[var(--card-solid)] border border-[var(--border)] rounded-full p-4 shadow-sm animate-fade-in-up">
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                          <FileText size={24} />
                        </div>
                        <div className="flex flex-col truncate pr-4">
                          <span className="font-bold text-[var(--foreground)] truncate">
                            {file.name}
                          </span>
                          <span className="text-xs font-medium text-[var(--foreground)]/50 uppercase tracking-wider">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--foreground)]/40 hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 hover:shadow-md hover:scale-105 active:scale-95 transition-all shrink-0"
                      >
                        <X size={20} strokeWidth={2.5} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center cursor-pointer pointer-events-none">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-[var(--card-solid)] shadow-md flex items-center justify-center text-[var(--foreground)]/40 mb-4 border border-[var(--border)] rotate-3">
                        <UploadCloud
                          size={28}
                          strokeWidth={2}
                          className="-rotate-3"
                        />
                      </div>
                      <span className="text-lg font-bold text-[var(--foreground)] mb-1">
                        Click or drag & drop to upload
                      </span>
                      <span className="text-sm font-medium text-[var(--foreground)]/50">
                        PDF or DOCX (Max 5MB)
                      </span>
                    </div>
                  )}

                  {!file && (
                    <div
                      className="absolute inset-0 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    />
                  )}
                </div>
              </div>

              {/* 2. Target Role Section */}
              <div className="w-full flex flex-col gap-4 relative z-20">
                <div className="flex items-center justify-between ml-4">
                  <label className="text-xs font-bold text-[var(--foreground)]/50 uppercase tracking-[0.2em] font-['Fira_Code',monospace]">
                    02 // Target Role
                  </label>
                </div>

                {/* Fixed Jelly Segmented Toggle with Strict Padding Wall */}
                <div className="relative flex w-full bg-[var(--input-glass)] p-2 rounded-full border border-[var(--border)] shadow-sm backdrop-blur-sm">
                  {/* The clipping mask ensures the spring overshoot never bleeds past the 8px inner padding */}
                  <div className="absolute inset-2 rounded-full overflow-hidden pointer-events-none z-0">
                    <div
                      className="h-full rounded-full bg-[var(--primary)] shadow-md transition-transform duration-[600ms]"
                      style={{
                        width: "50%",
                        transform: `translateX(${targetMode === "title" ? "0%" : "100%"})`,
                        transitionTimingFunction:
                          "cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setTargetMode("title")}
                    className={`relative z-10 flex-1 py-3 text-sm sm:text-base font-bold transition-colors duration-300 flex items-center justify-center gap-2 ${targetMode === "title" ? "text-[var(--primary-foreground)]" : "text-[var(--foreground)]/70 hover:text-[var(--foreground)]"}`}
                  >
                    <Briefcase size={18} strokeWidth={2.5} />
                    Job Title
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetMode("description")}
                    className={`relative z-10 flex-1 py-3 text-sm sm:text-base font-bold transition-colors duration-300 flex items-center justify-center gap-2 ${targetMode === "description" ? "text-[var(--primary-foreground)]" : "text-[var(--foreground)]/70 hover:text-[var(--foreground)]"}`}
                  >
                    <AlignLeft size={18} strokeWidth={2.5} />
                    Job Description
                  </button>
                </div>

                <div className="w-full transition-all duration-300">
                  {targetMode === "title" ? (
                    <div className="relative w-full animate-fade-in-up">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--primary)] pointer-events-none z-10">
                        <Search size={20} strokeWidth={2.5} />
                      </div>
                      <input
                        type="text"
                        required
                        value={jobTitle}
                        onChange={(e) => {
                          setJobTitle(e.target.value);
                          setShowTitleDropdown(true);
                        }}
                        onFocus={() => setShowTitleDropdown(true)}
                        onBlur={() =>
                          setTimeout(() => setShowTitleDropdown(false), 200)
                        }
                        placeholder="Search role... e.g. React Developer"
                        className={`${inputBaseClass} pl-14 relative z-10`}
                      />

                      {/* Search Dropdown Selector (Opaque & Elevated) - Adjusted shadow for light mode */}
                      {showTitleDropdown && (
                        <div className="absolute top-[calc(100%+0.5rem)] left-0 right-0 bg-[var(--card-solid)] border border-[var(--border)] rounded-2xl shadow-2xl z-[100] max-h-60 overflow-y-auto">
                          {filteredTitles.length > 0 ? (
                            filteredTitles.map((title) => (
                              <div
                                key={title}
                                onClick={() => {
                                  setJobTitle(title);
                                  setShowTitleDropdown(false);
                                }}
                                className="px-6 py-4 hover:bg-[var(--muted)] hover:text-[var(--primary)] font-bold text-[var(--foreground)] cursor-pointer transition-colors border-b border-[var(--border)]/50 last:border-b-0"
                              >
                                {title}
                              </div>
                            ))
                          ) : (
                            <div className="px-6 py-4 text-[var(--foreground)]/50 font-medium italic">
                              Press enter to use "{jobTitle}" as custom role.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative w-full animate-fade-in-up">
                      <textarea
                        required
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the full job description here..."
                        rows={6}
                        className={`${inputBaseClass} !rounded-[2rem] resize-none py-5`}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Unified Footer Actions */}
              <div className="w-full flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-4 pt-8 border-t border-[var(--border)]/50 relative z-10">
                {/* Secondary Action */}
                <button
                  type="button"
                  onClick={onReturnToLanding}
                  className="flex items-center justify-center gap-2 px-8 py-4 w-full sm:flex-1 rounded-full font-bold text-base tracking-wide transition-all duration-300 bg-[var(--input-glass)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--primary)]/50 hover:bg-[var(--card-solid)] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <LayoutDashboard size={20} strokeWidth={2.5} />
                  Return to Landing
                </button>

                {/* Primary Action */}
                <button
                  type="submit"
                  disabled={!file || isAnalyzing}
                  className={`flex items-center justify-center gap-3 px-10 py-4 w-full sm:flex-1 rounded-full font-bold text-lg tracking-wide transition-all duration-300 shadow-xl border border-transparent 
                    ${!file ? "opacity-50 cursor-not-allowed bg-[var(--foreground)]/20 text-[var(--foreground)]/50" : "bg-[var(--foreground)] text-[var(--background)] hover:scale-[1.02] active:scale-[0.98] hover:border-[var(--border)] shadow-black/10"}`}
                >
                  {isAnalyzing ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-[var(--background)]/30 border-t-[var(--background)] rounded-full animate-spin"></div>
                      <span className="font-['Fira_Code',monospace] uppercase text-sm tracking-widest">
                        Analyzing...
                      </span>
                    </div>
                  ) : (
                    <>
                      <Sparkles
                        size={20}
                        className={
                          file ? "text-[var(--primary)]" : "text-inherit"
                        }
                      />
                      Launch Analysis
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
