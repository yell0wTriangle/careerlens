import React, { useState } from "react";
import {
  ArrowRight,
  Mail,
  Lock,
  User as UserIcon,
  Github,
  Sparkles,
  Sun,
  Moon,
  Chrome,
  X,
  Apple,
} from "lucide-react";

// --- Theme Configurations Strictly Aligned with Landing/Onboarding ---
const lightTheme = {
  "--card": "#FFFFFF",
  "--muted": "#EBE6DC",
  "--accent": "#FFD166",
  "--border": "#E4DDD0",
  "--radius": "3rem",
  "--input-radius": "1.75rem",
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
  "--ghost-shape": "rgba(0, 0, 0, 0.03)", // Added from Mock Interview
};

const darkTheme = {
  "--card": "#1C1917",
  "--muted": "#292524",
  "--accent": "#FFD166",
  "--border": "#36312E",
  "--radius": "3rem",
  "--input-radius": "1.75rem",
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
  "--ghost-shape": "rgba(255, 255, 255, 0.03)", // Added from Mock Interview
};

// Reusable Dot Cluster from your Bento design language
const DotCluster = ({ className = "" }) => (
  <div className={`grid grid-cols-3 gap-1.5 w-fit ${className}`}>
    <div className="w-2.5 h-2.5 rounded-full bg-current opacity-20"></div>
    <div className="w-2.5 h-2.5 rounded-full bg-current opacity-100"></div>
    <div className="w-2.5 h-2.5 rounded-full bg-current opacity-20"></div>
    <div className="w-2.5 h-2.5 rounded-full bg-current opacity-100"></div>
    <div className="w-2.5 h-2.5 rounded-full bg-current opacity-100 text-[var(--primary)]"></div>
  </div>
);

export default function AuthLogin({ onAuthSuccess }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [notification, setNotification] = useState(null);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotification({
      title: "ACCESS REQUESTED",
      message: `Syncing with CareerLens Engine for ${authMode === "login" ? "returning member" : "new user"}.`,
    });
    setTimeout(() => {
      setNotification(null);
      if (onAuthSuccess) onAuthSuccess();
    }, 1500);
  };

  const inputBaseClass =
    "w-full px-7 py-5 bg-[var(--input-glass)] border border-[var(--border)] rounded-[var(--input-radius)] text-lg font-medium text-[var(--foreground)] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)]/50 transition-all placeholder:text-[var(--foreground)]/30 shadow-sm relative z-10";

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fira+Code:wght@400;500;700&display=swap');
        
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }

        body { background-color: ${currentTheme["--background"]}; margin: 0; transition: background-color 0.5s ease; }
        ::-webkit-scrollbar { display: none; }
        
        /* Ghost Shape Class from Mock Interview Page */
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
      `,
        }}
      />

      <div
        style={currentTheme}
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)] transition-colors duration-700 p-4 sm:p-12 bg-[var(--background)]"
      >
        {/* Warm Ambient Glows from Landing */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,var(--primary-glow)_0%,transparent_60%)] pointer-events-none z-0"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(107,114,255,0.08)_0%,transparent_60%)] pointer-events-none z-0"></div>

        {/* Custom Notification Toast */}
        {notification && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md animate-fade-in-up">
            <div className="bg-[var(--card)] border-2 border-[var(--primary)] shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] p-6 flex items-center gap-5 backdrop-blur-2xl">
              <div className="bg-[var(--primary)] text-white p-3 rounded-2xl">
                <Sparkles size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-[10px] font-black text-[var(--primary)] tracking-widest uppercase mb-1">
                  {notification.title}
                </h3>
                <p className="text-sm font-bold text-[var(--foreground)]">
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="p-2 hover:bg-[var(--muted)] rounded-full transition-colors relative z-10"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Auth Card Contextualized with Landing Bento Language */}
        <div className="relative z-10 w-full max-w-[580px] bg-[var(--card-glass)] backdrop-blur-3xl border border-[var(--border-glass)] shadow-[0_40px_100px_rgba(0,0,0,0.15)] rounded-[var(--radius)] flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header Bar */}
          <div className="h-16 border-b border-[var(--border)]/50 bg-[var(--header-glass)] flex items-center justify-between px-10 shrink-0 relative z-20">
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] shadow-sm"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] shadow-sm"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] shadow-sm"></div>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden sm:block font-['Fira_Code',monospace] font-bold text-[var(--foreground)]/20 text-[10px] tracking-[0.2em] uppercase">
                auth.careerlens.app
              </div>
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-full hover:bg-[var(--input-glass)] text-[var(--foreground)]/60 transition-colors"
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

          <div className="px-8 py-10 sm:px-16 flex flex-col items-center relative">
            {/* The Background Ghost Shape matching the Mock Interview Card */}
            <div className="ghost-shape"></div>

            {/* Logo Section */}
            <div className="flex flex-col items-center gap-4 mb-10 relative z-10">
              <div className="relative">
                <div
                  className="w-16 h-16 bg-[var(--tertiary)] text-white flex items-center justify-center shadow-xl"
                  style={{ borderRadius: "18px 18px 0 18px" }}
                >
                  <Sparkles size={32} />
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-[var(--secondary)] rounded-full border-[3px] border-[var(--card)]"></div>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-[var(--primary)] tracking-[0.25em] uppercase mb-1.5 block font-['Fira_Code',monospace]">
                  Setup Phase 01
                </p>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-[var(--foreground)]">
                  CareerLens
                </h1>
              </div>
            </div>

            {/* Jelly Switcher with Boundary Guard */}
            <div className="relative z-10 flex w-full bg-[var(--input-glass)] p-2 rounded-full border border-[var(--border)] mb-10 overflow-hidden">
              <div className="absolute inset-y-2 left-2 right-2 pointer-events-none overflow-hidden rounded-full">
                <div
                  className={`h-full rounded-full transition-transform duration-[600ms] ${isDarkMode ? "bg-[var(--foreground)]" : "bg-[var(--primary)]"} shadow-md`}
                  style={{
                    width: "50%",
                    transform: `translateX(${authMode === "login" ? "0%" : "100%"})`,
                    transitionTimingFunction:
                      "cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                />
              </div>
              <button
                onClick={() => setAuthMode("login")}
                className={`relative z-10 flex-1 py-3.5 text-xs font-black tracking-widest uppercase transition-colors duration-500 ${authMode === "login" ? (isDarkMode ? "text-[var(--background)]" : "text-white") : "text-[var(--foreground)]/40"}`}
              >
                Log In
              </button>
              <button
                onClick={() => setAuthMode("signup")}
                className={`relative z-10 flex-1 py-3.5 text-xs font-black tracking-widest uppercase transition-colors duration-500 ${authMode === "signup" ? (isDarkMode ? "text-[var(--background)]" : "text-white") : "text-[var(--foreground)]/40"}`}
              >
                Sign Up
              </button>
            </div>

            {/* Bento-style Social Grid */}
            <div className="w-full relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fade-in-up delay-100">
              <button className="flex flex-col items-center justify-center gap-3 w-full py-6 rounded-[2rem] font-bold text-xs transition-all duration-300 bg-[var(--input-glass)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--card-solid)] hover:-translate-y-1 shadow-sm relative z-10">
                <Chrome size={20} className="text-[var(--primary)]" />
                Google
              </button>
              <button className="flex flex-col items-center justify-center gap-3 w-full py-6 rounded-[2rem] font-bold text-xs transition-all duration-300 bg-[var(--input-glass)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--card-solid)] hover:-translate-y-1 shadow-sm relative z-10">
                <Github size={20} className="text-[var(--tertiary)]" />
                GitHub
              </button>
              <button className="flex flex-col items-center justify-center gap-3 w-full py-6 rounded-[2rem] font-bold text-xs transition-all duration-300 bg-[var(--input-glass)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--card-solid)] hover:-translate-y-1 shadow-sm relative z-10">
                <Apple size={20} className="text-[var(--secondary)]" />
                Apple
              </button>
            </div>

            {/* Separator Line */}
            <div className="w-full relative z-10 flex items-center gap-5 my-10 animate-fade-in-up delay-200">
              <div className="h-px bg-[var(--border)] flex-1"></div>
              <span className="text-[9px] font-black text-[var(--foreground)]/20 uppercase tracking-[0.4em] font-['Fira_Code',monospace]">
                Or Manual
              </span>
              <div className="h-px bg-[var(--border)] flex-1"></div>
            </div>

            {/* Login/Signup Form */}
            <form
              onSubmit={handleSubmit}
              className="w-full relative z-10 flex flex-col gap-5 animate-fade-in-up delay-300"
            >
              {authMode === "signup" && (
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--foreground)]/20 group-focus-within:text-[var(--primary)] transition-colors duration-300 z-20">
                    <UserIcon size={20} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Display Name"
                    className={`${inputBaseClass} pl-16`}
                  />
                </div>
              )}

              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--foreground)]/20 group-focus-within:text-[var(--primary)] transition-colors duration-300 z-20">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Work Email"
                  className={`${inputBaseClass} pl-16`}
                />
              </div>

              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--foreground)]/20 group-focus-within:text-[var(--primary)] transition-colors duration-300 z-20">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  required
                  placeholder="Access Key"
                  className={`${inputBaseClass} pl-16`}
                />
              </div>

              <button
                type="submit"
                className={`mt-3 flex items-center justify-center gap-3 w-full py-5 rounded-full font-black text-base tracking-widest uppercase transition-all duration-500 shadow-lg hover:shadow-[var(--primary)]/20 hover:scale-[1.02] active:scale-[0.98] bg-[var(--primary)] text-white relative z-10`}
              >
                {authMode === "login" ? "Confirm Entry" : "Establish Path"}
                <ArrowRight size={20} strokeWidth={3} />
              </button>
            </form>

            {/* Footer Elements */}
            <div className="mt-12 relative z-10 flex flex-col items-center gap-5">
              <p className="text-[10px] font-bold text-[var(--foreground)]/20 text-center leading-loose tracking-widest uppercase px-12 relative z-10">
                Authorized access only. Compliance with{" "}
                <a
                  href="#"
                  className="text-[var(--primary)] hover:underline relative z-10"
                >
                  CareerLens Protocols
                </a>{" "}
                required.
              </p>
              <DotCluster className="opacity-10 scale-75" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
