import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  CircleDashed,
  Loader2,
  Sparkles,
  Sun,
  Moon,
  FileSearch,
  Cpu,
} from "lucide-react";

// --- Theme Configurations (Synced with Landing/Form) ---
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

// Simulated processing steps matching the video flow
const PROCESSING_STEPS = [
  "Initializing secure connection...",
  "Loading and extracting PDF text...",
  "Parsing resume structure...",
  "Identifying core sections (Experience, Education)...",
  "Evaluating bullet points and impact metrics...",
  "Calculating ATS compatibility score...",
  "Cross-referencing with target role...",
];

export default function Loading({
  onComplete,
  isDarkMode: controlledIsDarkMode,
  onToggleTheme,
}) {
  const [internalDarkMode, setInternalDarkMode] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

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

  // Simulate the processing progress
  useEffect(() => {
    if (currentStep < PROCESSING_STEPS.length) {
      // Randomize step duration between 1s and 2.5s for realism
      const stepDuration = Math.random() * 1500 + 1000;

      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, stepDuration);

      return () => clearTimeout(timer);
    } else if (currentStep === PROCESSING_STEPS.length && !isComplete) {
      // Small delay before showing the final "Preparing review" state
      const timer = setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isComplete, onComplete]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fira+Code:wght@400;500;700&display=swap');
        
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
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(249, 87, 56, 0.4); }
          50% { box-shadow: 0 0 25px 8px rgba(249, 87, 56, 0.15); }
        }
        .animate-pulse-glow { animation: pulse-glow 2s infinite; }

        .delay-75 { animation-delay: 75ms; }
        .delay-150 { animation-delay: 150ms; }
        .animate-float { animation: floatSlow 8s ease-in-out infinite; }
        .animate-float-reverse { animation: floatReverse 10s ease-in-out infinite; }
      `,
        }}
      />

      <div
        style={currentTheme}
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[var(--background)] font-['Plus_Jakarta_Sans',sans-serif] text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)] transition-colors duration-500 p-4 sm:p-8"
      >
        {/* Ambient Background Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,var(--primary-glow)_0%,transparent_60%)] pointer-events-none z-0 transition-colors duration-500"></div>
        <div className="absolute top-[0%] right-[-10%] w-[50%] h-[70%] bg-[radial-gradient(circle_at_center,var(--tertiary-glow)_0%,transparent_60%)] pointer-events-none z-0 transition-colors duration-500"></div>
        <div className="absolute bottom-[-20%] left-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,var(--secondary-glow)_0%,transparent_60%)] pointer-events-none z-0 transition-colors duration-500"></div>

        {/* Bubbly Abstract Floating Shapes */}
        <div className="absolute top-[15%] left-[10%] md:left-[20%] flex gap-2 opacity-30 pointer-events-none animate-float z-0">
          <div className="w-20 h-20 bg-[var(--primary)] rounded-[2rem] backdrop-blur-md flex items-center justify-center shadow-2xl">
            <Cpu size={28} className="text-white -rotate-12" />
          </div>
        </div>
        <div className="absolute bottom-[20%] right-[10%] md:right-[20%] flex gap-2 opacity-20 pointer-events-none animate-float-reverse z-0">
          <div className="w-28 h-28 bg-[var(--tertiary)] rounded-full backdrop-blur-md shadow-2xl"></div>
        </div>
        <div className="absolute top-1/4 right-[15%] w-12 h-12 bg-[var(--accent)] rounded-2xl opacity-20 pointer-events-none animate-float z-0"></div>

        {/* Main Processing Card - Aligned with form layout */}
        <div className="relative z-10 w-full max-w-[750px] bg-[var(--card-glass)] backdrop-blur-3xl border border-[var(--border-glass)] shadow-[0_30px_80px_rgba(0,0,0,0.08)] rounded-[var(--radius)] flex flex-col overflow-hidden animate-fade-in-up">
          {/* Card Header */}
          <div className="h-16 border-b border-[var(--border)]/50 bg-[var(--header-glass)] flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#EE4266]/80 shadow-sm"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[#FFD166]/80 shadow-sm"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[#82D093]/80 shadow-sm"></div>
            </div>
            <div className="hidden sm:block font-['Fira_Code',monospace] font-bold text-[var(--foreground)]/40 text-xs tracking-widest uppercase">
              engine.careerlens.app
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-[var(--input-glass)] hover:scale-110 text-[var(--foreground)]/60 transition-all active:scale-95"
                title="Toggle Theme"
              >
                {isDarkMode ? (
                  <Sun size={18} strokeWidth={2.5} />
                ) : (
                  <Moon size={18} strokeWidth={2.5} />
                )}
              </button>
            </div>
          </div>

          <div className="px-6 py-10 sm:px-12 flex flex-col items-center relative overflow-y-auto max-h-[85vh] min-h-[550px]">
            {/* Visual Icon Header - Match Form's squircle shape */}
            <div
              className={`w-20 h-20 bg-[var(--card-solid)] border border-[var(--border)] flex items-center justify-center rounded-[2rem] shadow-xl mb-6 transition-all duration-700 animate-fade-in-up ${isComplete ? "text-[var(--tertiary)] rotate-0 scale-105" : "text-[var(--primary)] rotate-3 animate-pulse-glow"}`}
            >
              {isComplete ? (
                <Sparkles size={36} strokeWidth={2} />
              ) : (
                <FileSearch size={36} strokeWidth={2} />
              )}
            </div>

            {/* Dynamic Title - Match Form's typography */}
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-[var(--foreground)] text-center mb-3 transition-opacity duration-300 animate-fade-in-up delay-75">
              {isComplete ? "Preparing your review..." : "Analyzing Resume"}
            </h1>

            {/* Subtitle - Match Form's max-width text block */}
            <p className="text-[var(--foreground)]/60 font-medium text-center text-base max-w-md animate-fade-in-up delay-75 mb-8">
              {isComplete
                ? "Finalizing metrics and assembling your personalized career dashboard."
                : "Please wait while our AI engine evaluates your document against the target role requirements."}
            </p>

            {/* Processing Checklist Area - Contained matching Form's inputs */}
            <div className="w-full flex flex-col gap-3 animate-fade-in-up delay-150">
              <label className="text-xs font-bold text-[var(--foreground)]/50 uppercase tracking-[0.2em] font-['Fira_Code',monospace] ml-4">
                03 // Analysis Engine
              </label>

              <div className="w-full bg-[var(--input-glass)] border border-[var(--border)] rounded-[2.5rem] p-6 sm:p-8 flex flex-col gap-5 relative overflow-hidden shadow-sm transition-all duration-300">
                {/* Embedded Progress Bar at the top of the container */}
                {!isComplete && (
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-[var(--border)]/50">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] transition-all duration-[1500ms] ease-out"
                      style={{
                        width: `${(currentStep / PROCESSING_STEPS.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                )}

                {!isComplete ? (
                  PROCESSING_STEPS.map((step, index) => {
                    const isActive = index === currentStep;
                    const isPassed = index < currentStep;
                    const isPending = index > currentStep;

                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isPending ? "opacity-30 translate-y-2" : "opacity-100 translate-y-0"} ${isActive ? "scale-105 ml-3" : "scale-100"}`}
                      >
                        <div className="shrink-0 flex items-center justify-center w-6 h-6">
                          {isPassed && (
                            <CheckCircle2 className="text-[var(--tertiary)] w-6 h-6 animate-fade-in-up" />
                          )}
                          {isActive && (
                            <Loader2 className="text-[var(--primary)] w-6 h-6 animate-spin" />
                          )}
                          {isPending && (
                            <CircleDashed className="text-[var(--foreground)]/40 w-6 h-6" />
                          )}
                        </div>
                        <span
                          className={`text-[15px] sm:text-base font-bold transition-colors duration-300 ${isActive ? "text-[var(--foreground)]" : isPassed ? "text-[var(--foreground)]/70" : "text-[var(--foreground)]/40"}`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  // Final State
                  <div className="flex flex-col items-center justify-center py-10 animate-fade-in-up">
                    <div className="w-16 h-16 rounded-full bg-[var(--tertiary)]/10 flex items-center justify-center mb-6">
                      <Loader2 className="text-[var(--tertiary)] w-8 h-8 animate-spin" />
                    </div>
                    <p className="text-[var(--foreground)]/60 font-medium text-center text-lg font-['Fira_Code',monospace]">
                      Generating insights, just a second...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
