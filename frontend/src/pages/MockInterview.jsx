import React, { useState } from "react";
import {
  ArrowLeft,
  Bot,
  Sun,
  Moon,
  ArrowRight,
  CheckCircle2,
  User as UserIcon,
  LayoutDashboard,
  ChevronRight,
  Upload,
  Sparkles,
} from "lucide-react";
import OverlaySidebarNav from "../components/OverlaySidebarNav";

// --- CareerLens Brand Theme Configurations ---
const lightTheme = {
  "--background": "#F6F4EE",
  "--foreground": "#1C1917",
  "--card": "#FFFFFF",
  "--card-border": "#E4DDD0",
  "--muted": "#EBE6DC",
  "--accent-yellow": "#FFD166",
  "--accent-blue": "#424AE7",
  "--accent-coral": "#F95738",
  "--accent-pink": "#EE4266",
  "--radius": "2.5rem",
  "--input-radius": "9999px",
  "--primary-glow": "rgba(249, 87, 56, 0.12)",
  "--tertiary-glow": "rgba(66, 74, 231, 0.12)",
  "--secondary-glow": "rgba(238, 66, 102, 0.12)",
  "--ghost-shape": "rgba(0, 0, 0, 0.03)",
  "--header-bg": "rgba(255, 255, 255, 0.6)",
};

const darkTheme = {
  "--background": "#0C0A09",
  "--foreground": "#F6F4EE",
  "--card": "#161616",
  "--card-border": "#36312E",
  "--muted": "#292524",
  "--accent-yellow": "#FFD166",
  "--accent-blue": "#5C64FF",
  "--accent-coral": "#FF6B4A",
  "--accent-pink": "#FF5277",
  "--radius": "2.5rem",
  "--input-radius": "9999px",
  "--primary-glow": "rgba(255, 107, 74, 0.12)",
  "--tertiary-glow": "rgba(107, 114, 255, 0.12)",
  "--secondary-glow": "rgba(255, 82, 119, 0.12)",
  "--ghost-shape": "rgba(255, 255, 255, 0.03)",
  "--header-bg": "rgba(22, 22, 22, 0.6)",
};

export default function MockInterview({
  onOpenDashboard,
  onOpenResumeAnalysis,
  onOpenProfile,
  onOpenLanding,
  onReturnToLanding,
  isDarkMode: controlledIsDarkMode,
  onToggleTheme,
}) {
  const [internalDarkMode, setInternalDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

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

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }, 800);
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fira+Code:wght@400;500;700&display=swap');
        
        body { margin: 0; font-family: 'Plus Jakarta Sans', sans-serif; background: var(--background); color: var(--foreground); transition: background 0.5s ease, color 0.5s ease; }
        
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        @keyframes floatSlow { 
          0%, 100% { transform: translateY(0) rotate(3deg); } 
          50% { transform: translateY(-10px) rotate(0deg); } 
        }

        .animate-fade-in-up { animation: fadeInUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        
        @keyframes soundwave {
          0% { height: 12px; }
          50% { height: 42px; }
          100% { height: 12px; }
        }
        .wave-bar { animation: soundwave 1.2s ease-in-out infinite; width: 6px; border-radius: 10px; background-color: var(--accent-blue); }
        .wave-bar:nth-child(1) { animation-delay: 0.0s; background-color: var(--accent-blue); }
        .wave-bar:nth-child(2) { animation-delay: 0.1s; background-color: var(--accent-coral); }
        .wave-bar:nth-child(3) { animation-delay: 0.2s; background-color: var(--accent-yellow); }
        .wave-bar:nth-child(4) { animation-delay: 0.3s; background-color: var(--accent-pink); }
        .wave-bar:nth-child(5) { animation-delay: 0.4s; background-color: var(--accent-blue); }
        .wave-bar:nth-child(6) { animation-delay: 0.3s; background-color: var(--accent-coral); }
        .wave-bar:nth-child(7) { animation-delay: 0.2s; background-color: var(--accent-yellow); }
        .wave-bar:nth-child(8) { animation-delay: 0.1s; background-color: var(--accent-pink); }
        .wave-bar:nth-child(9) { animation-delay: 0.0s; background-color: var(--accent-blue); }

        .delay-75 { animation-delay: 75ms; }
        .delay-150 { animation-delay: 150ms; }
        .delay-200 { animation-delay: 200ms; }
        
        .dot { width: 14px; height: 14px; border-radius: 9999px; }
        
        .ghost-shape {
          position: absolute;
          bottom: -20%;
          right: -10%;
          width: 380px;
          height: 380px;
          background: var(--ghost-shape);
          border-radius: 4rem;
          transform: rotate(-12deg);
          pointer-events: none;
          z-index: 0;
        }

        .input-shadow { box-shadow: inset 0 2px 8px 0 rgba(0, 0, 0, 0.04); }
      `,
        }}
      />

      <div
        style={currentTheme}
        className="relative w-full min-h-screen font-['Plus_Jakarta_Sans',sans-serif] text-[var(--foreground)] bg-[var(--background)] transition-colors duration-700 overflow-x-hidden flex"
      >
        <OverlaySidebarNav
          isOpen={isNavOpen}
          setIsOpen={setIsNavOpen}
          activeItem="mock"
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          onOpenLanding={onOpenLanding}
          onOpenDashboard={onOpenDashboard}
          onOpenResumeAnalysis={onOpenResumeAnalysis}
          onOpenMockInterview={undefined}
          onOpenProfile={onOpenProfile}
          backdropZClass="z-[8000]"
          navZClass="z-[9000]"
          navBgClass="bg-[var(--card)]"
          navBorderClass="border-[var(--card-border)]"
          logoBgClass="bg-[var(--accent-blue)]"
          inactiveButtonClass="bg-[var(--card)] border border-[var(--card-border)] hover:border-[var(--accent-coral)] hover:bg-[var(--accent-coral)] hover:text-white text-[var(--foreground)] shadow-sm"
          activeButtonClass="bg-[var(--accent-coral)] border border-transparent text-white shadow-md shadow-[var(--accent-coral)]/20"
          themeButtonClass="bg-[var(--card)] border border-[var(--card-border)] hover:bg-[var(--background)] text-[var(--foreground)] shadow-sm"
          dividerClass="bg-[var(--card-border)]"
          triggerBgClass="bg-[var(--card)]"
          triggerBorderClass="border-[var(--card-border)]"
          triggerTextClass="text-[var(--foreground)] opacity-60 hover:opacity-100 hover:text-[var(--accent-coral)]"
        />

        {/* --- 3. MAIN CONTENT AREA --- */}
        <main className="flex-1 flex items-center justify-center relative p-4 sm:p-12 w-full h-full min-h-screen">
          {/* Success Toast */}
          {showToast && (
            <div className="fixed top-8 right-8 z-[100] animate-fade-in-up">
              <div className="bg-[var(--card)] border border-[var(--card-border)] shadow-2xl rounded-2xl p-4 flex items-center gap-3">
                <div className="bg-[#10B981] p-1.5 rounded-full text-white">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm text-[var(--foreground)]">
                    Success!
                  </p>
                  <p className="text-xs text-[var(--foreground)] opacity-70">
                    You're now on the early access list.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Ambient Background Glows */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,var(--tertiary-glow)_0%,transparent_60%)] pointer-events-none z-0"></div>
          <div className="absolute top-[0%] right-[-10%] w-[50%] h-[70%] bg-[radial-gradient(circle_at_center,var(--primary-glow)_0%,transparent_60%)] pointer-events-none z-0"></div>
          <div className="absolute bottom-[-20%] left-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,var(--secondary-glow)_0%,transparent_60%)] pointer-events-none z-0"></div>

          {/* Main Centered Card */}
          <div className="relative z-10 w-full max-w-[680px] bg-[var(--card)] border border-[var(--card-border)] shadow-2xl rounded-[var(--radius)] flex flex-col overflow-hidden animate-fade-in-up transition-colors duration-500">
            {/* Card Header (Kept Mac-style dots but removed theme toggle) */}
            <div className="h-16 border-b border-[var(--card-border)] bg-[var(--header-bg)] backdrop-blur-md flex items-center justify-between px-8 shrink-0 relative z-20">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[var(--accent-pink)] opacity-80 shadow-sm"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[var(--accent-yellow)] opacity-80 shadow-sm"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#82D093] opacity-80 shadow-sm"></div>
              </div>
              <div className="flex items-center gap-6">
                <div className="font-['Fira_Code',monospace] font-bold text-[var(--foreground)] opacity-40 text-[10px] tracking-[0.2em] uppercase">
                  interview.careerlens.app
                </div>
              </div>
            </div>

            <div className="px-8 py-12 sm:px-14 flex flex-col items-center relative overflow-hidden">
              {/* Bento-style Ghost Shape inside the card */}
              <div className="ghost-shape"></div>

              {/* Corner Decorative Dots (CareerLens Style) */}
              <div className="absolute top-10 right-10 flex gap-2 opacity-100 pointer-events-none">
                <div className="dot bg-[var(--foreground)] opacity-5"></div>
                <div className="dot bg-[var(--foreground)] opacity-10"></div>
              </div>

              {/* Visualizer & Icon Area */}
              <div className="relative flex flex-col items-center justify-center mb-8 w-full z-10">
                <div className="absolute flex items-center justify-center gap-2 w-full h-full opacity-30 pointer-events-none">
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                </div>

                <div className="w-28 h-28 bg-[var(--accent-blue)] text-white flex items-center justify-center rounded-[2rem] shadow-2xl shadow-[var(--accent-blue)]/20 relative z-10 rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-default">
                  <Bot size={56} strokeWidth={1.5} />
                </div>
              </div>

              {/* CareerLens Style Badge */}
              <div className="mb-6 z-10 inline-flex animate-fade-in-up delay-75">
                <span className="font-['Fira_Code'] text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--accent-coral)] bg-[var(--accent-coral)]/10 border border-[var(--accent-coral)]/20 px-4 py-1.5 rounded-full shadow-sm">
                  Status: In Development
                </span>
              </div>

              {/* Typography updated to CareerLens Extra Bold / Tight Tracking */}
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-[var(--foreground)] text-center mb-4 leading-[0.9] animate-fade-in-up delay-75 relative z-10">
                Voice AI Engine.
              </h1>
              <p className="text-[var(--foreground)] opacity-60 font-medium text-center text-lg max-w-md animate-fade-in-up delay-150 mb-10 relative z-10">
                Real-time conversational mock interviews tailored to your target
                role. Experience lifelike technical and behavioral rounds.
              </p>

              {/* Redesigned Notification Form (Nested Button Style) */}
              <form
                onSubmit={handleNotifySubmit}
                className="w-full max-w-[480px] flex flex-col gap-3 animate-fade-in-up delay-200 mb-10 group relative z-10"
              >
                <div className="relative flex items-center w-full bg-[var(--background)] border-2 border-transparent focus-within:border-[var(--accent-coral)]/30 rounded-[var(--input-radius)] p-1.5 input-shadow transition-all group/input">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address..."
                    className="flex-1 min-w-0 bg-transparent pl-5 pr-2 py-3.5 text-lg font-bold text-[var(--foreground)] focus:outline-none placeholder:text-[var(--foreground)] placeholder:opacity-40"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="shrink-0 px-6 py-3.5 bg-[var(--accent-coral)] text-white rounded-[var(--input-radius)] font-extrabold text-base flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[var(--accent-coral)]/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      "..."
                    ) : (
                      <>
                        <span className="hidden sm:inline">Notify Me</span>
                        <span className="sm:hidden">Notify</span>
                        <ArrowRight size={18} strokeWidth={3} />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-center font-['Fira_Code'] font-medium text-[var(--foreground)] opacity-40 mt-1 uppercase tracking-wider">
                  Join 1.2k on the waitlist
                </p>
              </form>

              <div className="w-full h-px bg-[var(--card-border)] mb-8 animate-fade-in-up delay-200 relative z-10"></div>

              {/* Back Button */}
              <button
                onClick={onReturnToLanding}
                className="relative z-10 flex items-center justify-center gap-3 px-8 py-4 rounded-full font-extrabold text-base transition-all duration-300 bg-[var(--background)] text-[var(--foreground)] border border-[var(--card-border)] hover:bg-[var(--card-border)] shadow-sm hover:shadow-md active:scale-[0.98] animate-fade-in-up delay-200 group"
              >
                <ArrowLeft
                  size={18}
                  strokeWidth={2.5}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Return to Landing Page
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
